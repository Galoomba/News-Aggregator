const fs = require('fs').promises;
const fsS = require('fs');
const readline = require('readline');
const envPath = `${__dirname}/../../.env`
const composePath = `${__dirname}/../../docker-compose.yml`

/**
 * ReadLine interface
 */
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});
const question = (str) => new Promise(resolve => rl.question(str, resolve));

/**
 * default values
 */
const envObject = {
    NODE_ENV: 'development', //changable
    PORT: '3000',
    DB_HOST: 'db',
    DB_PORT: '3306',
    DB_DRIVER: 'mysql',
    DB_USER: 'root',
    DB_PASSWORD: 'toor', //changable
    DB_NAME: 'news_aggregator',
    AUTH_STRATEGY: 'local',
    ADMIN_USER_EMAIL: 'Admin@NewsAggregator.com', //changable
    ADMIN_USER_PASSWORD: '1', //changable
    ADMIN_USER_NATIONALID: '1',
    ADMIN_USER_NAME: 'Admin',
    APP_SECRET: '', // generated
    TOKEN_EXPIRES_IN: '2880', //changable
    TIME_ZONE: 'UTC', //changable
    REDDIT_BASE: 'https://api.reddit.com/r/news/top?sort=top',
    NEWSAPI_BASE: 'http://newsapi.org/v2/top-headlines?category=general',
    REDDIT_SEARCH: 'https://api.reddit.com/search/?sort=top',
    NEWSAPI_SEARCH: 'http://newsapi.org/v2/everything?sortBy=popularity',
    NEWSAPI_KEY: 'f1ab80932c06481bb990281016aaa6f7', //changable
    REDIS_HOST: 'redis',
    REDIS_PORT: '6379',
};



/**
 * Exit with a wrong choice message
 * 
 */
const errorHandler = (err) => {
    console.log(err);
    rl.close();
    process.exit()
};

/**
 * Write to env file 
 */
const writeEnv = async () => {
    /**
     * Map the env object
     */
    let content = '';
    Object.keys(envObject).forEach((key) => {
        content += `${key}=${envObject[key]}\n`;
    });
    try {
        /**
         * Delete env file if exist 
         */
        if (fsS.existsSync(envPath)) fsS.unlinkSync(envPath);

        /**
         * Modify compose file 
         */
        await modifyCompose();

        /**
           * Store the new .env config.
           */
        const err = await fs.writeFile(envPath, content);
        if (err) return console.log(err);
        rl.close();
        process.exit();
    }
    catch (err) {
        errorHandler(err);
    }

}

/**
 * Change dockercompose root password
 */
const modifyCompose = async () => {
    /**
     * Read compose file.
     */
    const data = await fs.readFile(composePath, 'utf8');

    /**
     * find the root password line and change it with new one 
     */
    const index = data.indexOf('MYSQL_ROOT_PASSWORD:');
    const preData = data.substring(0, index);
    const buffer = data.substring(index, data.length);
    const avData = buffer.substring(buffer.indexOf('\n'), buffer.length);
    const passwordLine = `MYSQL_ROOT_PASSWORD: '${envObject['DB_PASSWORD']}'`;
    const newCompose = preData + passwordLine + avData;
    /**
     * Delete env file if exist 
     */
    if (fsS.existsSync(composePath)) fsS.unlinkSync(composePath);
    /**
     * Store the new compose config.
     */
    const err = await fs.writeFile(composePath, newCompose, 'utf8');
    if (err) errorHandler(err);
}

/**
 * Cli registration config 
 */
(async () => {
    console.log('\n*** press: Enter for default or enter new values *** \n');
    try {
        let reader = await question(' NODE_ENV [default:development] ');
        if (reader != '') envObject['NODE_ENV'] = reader;

        reader = await question(' Database root password [default:toor] ');
        if (reader != '') envObject['DB_PASSWORD'] = reader;

        reader = await question(' Admin email for login [default:Admin@NewsAggregator.com] ');
        if (reader != '') envObject['ADMIN_USER_EMAIL'] = reader;

        reader = await question(' Admin password for login [default:1] ');
        if (reader != '') envObject['ADMIN_USER_PASSWORD'] = reader;

        reader = await question(' JWT token expiring time [default:2880] ');
        if (reader != '' && !Number.isInteger(reader)) throw new Error('wrong input');
        if (reader != '') envObject['TOKEN_EXPIRES_IN'] = reader;

        reader = await question(' TimeZone [default:UTC] ');
        if (reader != '') envObject['TIME_ZONE'] = reader;

        reader = await question(' NewsApi Key [default:stored key] ');
        if (reader != '') envObject['NEWSAPI_KEY'] = reader;

        envObject['APP_SECRET'] = await require('../helpers/secret-generator').generateSecret();

        writeEnv();
    }
    catch (err) {
        errorHandler(err);
    }
})()

