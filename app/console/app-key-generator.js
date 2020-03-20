const envFile = process.argv[2];

require('../helpers/secret-generator').generateAppSecret(envFile);

