
<h3 align="center">
<b>News Aggregator</b></h3>

News Aggregator is a simple app that aggregate the response of to different News Apis 
"Reddit & NewsApi", It handle the pagination conflict between the two APIS since Reddit is cursor based and NewsApi is a Page/perPage pagination and cache request to reduce query time,<br> It's also has authentication module to make sure that the user is login and have the permissions to call the endpoint. <br>
The app is build over a modified version of a node  <a href="https://github.com/SherifElfadaly/Node-Api-Skeleton">skeleton</a> to fit the task.

## 📝 Table of Contents

- [Getting Started](#getting_started)
- [Code Structure](#code_structure)
- [Tests](#tests)
- [API Docs](https://documenter.getpostman.com/view/8160912/SzS8sQV5?version=latest)


### Prerequisites

What things you need to install the software and how to install them.

- [Docker](https://www.docker.com/) for running app containers
- [docker-compose](https://docs.docker.com/compose/) for running app containers
- [redis](https://redis.io/)  - caching server TO run integration tests
- [npm](https://www.npmjs.com/) - Package manager



## 🏁 Getting Started <a name = "getting_started"></a>
 After cloning the app navigate to the app directory and run ```npm run generate-env ``` it will generate a .env file with your inputs
 ```
 npm run generate-env

> node@1.0.0 generate-env /home/daviid/Projects/newsAggregator
> node app/console/env-generator.js


*** press: Enter for default or enter new values *** 

 NODE_ENV [default:development] 
 Database root password [default:toor] 
 Admin email for login [default:Admin@NewsAggregator.com] 
 Admin password for login [default:1] 
 JWT token expiring time [default:2880] 
 TimeZone [default:UTC] 
 NewsApi Key [default:stored key] 

 ```

After initializing the environment we are ready to start our containers.

The app consists of three container 
  - Database Container to  store the users and permissions.
  - In Memory Database Container to cache the apis response and handle pagination paradox.
  - Node container that our app lives on.
```
Note: this implementation of the Database container is not recommended it's only for the sake of testing 
```  
The three container runs on ports 5000, 5001, 5002 make sure that those ports are free of change them in the docker-compose file.

### To start the containers make sure you initialized the env file and run 
```
docker-compose --compatibility up --build
```
And wait for it to start.

#### If and only if there was a database connection error run this command to start the mysql engine
```
docker exec -it news_aggregator_database bash /etc/init.d/mysql start
```

### Testing that every thing is alright 
```
 curl -d '{"email":"wrong@email.com", "password":"wrongPassword"}' -H "Content-Type: application/json" -X POST localhost:5000/api/users/login     

{"errors":["Wrong credentials"]}
```

The  ```Postman``` collection and environment are located on a folder named postman.



## 🚀 Code Structure <a name = "code_structure"></a>

Most of the task logic are based on ``` app/modules/news``` , The  request life cycle starts from the ``` inner Router --> controller  --> repository --> factory```  which query the Apis classes in ```app/modules/news/source```.<br>

The ```factory``` responsibility  is to decide the number of articles needed from each of the dynamically loaded sources class, sort results and cache them to speed up the request time, the cache are stored in redis in memory database and expired after 5 min.<br>

Each of the ```source classes``` have 3 main methods 
  - ```query() -->``` That construct the the query String 
  - ```getArticles() -->``` That send the request to the external api 
  - ```articleMapper() -->``` That map the response and return it as desired 

To Make the reddit cursor base pagination fits with the NewsApi page/perPage pagination we store the page/perPage binded with after&before values in redis to be able to navigate throw between pages with consistence data



## 🔧 Running the tests <a name = "tests"></a>

To test the code functionality there are 2 test directories, One for the unitTests and the other for integrationTests.

By default the ``` npm test``` script run both the 2 types of tests 
<b>BUT</b> the REDIS_TEST_HOST & REDIS_TEST_PORT should be edit on env file with valid redis server in order to pass the <b>integrationTest</b>

To run each type of tests on it's own  
```
  - npm run integration-test
  - npm run unit-test
```

```
 Unit Test newsApi model 
    ✓ should return array of 1 with property headline, link, source and publishAt 
    ✓ should return array of 1 with property with sample title 
    ✓ should return array of 1 with link with sample url 

  Unit Test reddit model 
    ✓ should return array of 1 with property headline, link, source and publishAt 
    ✓ should return array of 1 with property with sample title 
    ✓ should return array of 1 with link with sample url 


  6 passing (58ms)

```
#### Note: before you run and test make sure that you install all the dependance ```npm install```
