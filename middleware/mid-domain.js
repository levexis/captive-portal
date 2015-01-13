/* checks the domain matches what is in CONFIG.web.hostname & web.protocol and if not then redirects them */

var CONFIG = require('config');
var lastRequest = {};
exports = module.exports = {
    /**
     * If not on the domain and protocol (secure) in the config then redirect
     * this ensures auth cookies are set on the correct domain
     * because nodejitsu routes based on domain may need to add specific redirects for specific redirects
     * for specific domains
     */
    autoRedirect : function (req, res, next) {

        //express newbie, not sure why hostname, port and protocol are missing, [1] = host [2] = port:
        var hostPort = /([^:]*)(.*)/.exec(req.headers.host);
        var message;
        if ( hostPort[1] !== CONFIG.web.hostname ) { // req.protocol !== CONFIG.web.protocol, need to look at this!
            var url = '//' + CONFIG.web.hostname + ( hostPort[2] ? hostPort[2] : '') + req.originalUrl;
            res.header('Location', url);
            res.status(302);
            res.end();
            message = 'redirecting request ' + req.headers.host + req.originalUrl + ' to ' + url;
        }
        return next(message);
    },
    log : function (req, res, next) {
        var clientIP = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress,
            isHostIp = /^(\d+)\.(\d+).(\d+).(\d+)/.exec(req.headers.host) ? true : false,
            hostPort = /([^:]*)(.*)/.exec(req.headers.host ),
            isHostApp = (hostPort[1] !== CONFIG.web.hostname),
            lastRequestTime = lastRequest[clientIP] ? new Date().getTime() - lastRequest[clientIP] : 0 ;
        // add captivePortal flag
        req.useragent.isCaptive = /CaptiveNetworkSupport/.test( req.useragent.source );
        //console.log( 'domain middleware' ,isHostApp, req.headers.host , req.originalUrl, hostPort, clientIP,isHostIp);
        //console.log( 'user agent' , req.useragent.isCaptive);
        //console.log( 'lastrequest' , lastRequestTime );
        console.log( req.useragent.isCaptive,  lastRequestTime, req.originalUrl, clientIP, isHostIp )

        lastRequest[clientIP] = new Date().getTime();
        req.isHostIp = isHostIp;
        req.isAppHost = isHostIp;
        return next();
    }
    // if isCaptive and not "logged in" then return redirect to /login.html
    // else return 200 with "success"
};
