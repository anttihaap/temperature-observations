var config = {
    dev: {
        database: {
            host: 'mongodb://localhost/temperatures'
        },
        serverPort: 8080,
        jwtSecret: 'DEVSECRET'
    },
    test: {
        database: {
            host: 'mongodb://localhost/test'
        },
        serverPort: 8080,
        jwtSecret: 'TESTSECRET'
    },
    prod: {
        database: {
            host: 'mongodb://mongodb/temperatures'
        },
        serverPort: 8080,
        jwtSecret: 'PRODSECRET'
    }
};

module.exports = config;
