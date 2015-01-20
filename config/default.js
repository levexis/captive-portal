// default config values
var config = {
    web: {
        hostname: 'start.me',
        port: 9000,
        staticDir: '/public', // this is what gets exposed
        ios: {
            loginPage : '/login.html?ios'
        },
        osx: {
            loginPage : '/login.html?osx'
        },
        android: {
            loginPage : '/login.html?android'
        },
//        startPage: '/start.html', not needed can specify target etc in login page
        staticCacheable: 0
    }
};

// export
module.exports = config;
