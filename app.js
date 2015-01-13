var express = require('express' ),
    CONFIG = require('config'),
    app = express(),
    domain = require('./middleware/mid-domain' ),
    cookies = require('cookie-parser'),
    useragent = require('express-useragent');

function _configureApp() {
    /**
     * Middleware
     */
    app.use(useragent.express());
// need cookieParser middleware before we can do anything with cookies
    app.use( cookies() );
    app.use(domain.log);
    app.use(domain.autoRedirect);
    app.use(express.static(__dirname + CONFIG.web.staticDir, { maxAge: CONFIG.web.staticCacheable })); // allow static content to be cached for a week


    //app.use(express.compress);
//    app.use(express.cookieParser());
    // not required for body params
    //app.use(express.bodyParser());

    // if there is a post then log data

    // this creates an issue as we have loads of sessions! Should only set that long age if they actually login
/*
    app.use(express.session({
        secret: 'UkAI7VNg2UTWb-p-5gOg',
        store: new MongoStore({
            db: db,
            auto_reconnect: true
        }),
        cookie: { httpOnly:false, maxAge: 7 * 24 * 3600 * 1000 }
    }));
*/

/*
  // view helpers
    app.use(function(req, res, next) {
        app.locals({
            session: req.session,
            currentUser: req.user,
            rootURL: CONFIG.web.rootURL
        });
        next();
    });

    // dispatch to route
    app.use(app.router);

    // auth
//    app.get('/login', auth.login);
//    app.post('/login', auth.login);
*/
}


_configureApp();
console.log( 'started on ',CONFIG.web.port );
app.listen(CONFIG.web.port);
