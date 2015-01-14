// default config values
var config = {
    web: {
        hostname: 'start.me',
        port: 9000,
        staticDir: '/public', // this is what gets exposed
        loginPage: '/login.html',
//        startPage: '/start.html', not needed can specify target etc in login page
        staticCacheable: 0
    }
};

// export
module.exports = config;
