// change directory when run from crontab
var init = _changeDir (process.env['NODE_HOME']), 
    express = require('express' ),
    CONFIG = require('config'),
    app = express(),
    domain = require('./middleware/mid-domain' ),
    cookies = require('cookie-parser'),
    useragent = require('express-useragent');

function _changeDir(home) {
  if (home) {
    console.log('Starting directory: ' + process.cwd());
    try {
      process.chdir(home);
      console.log('New directory: ' + process.cwd());
    }  catch (err) {
     console.log('chdir: ' + err);
    }
  }
}

function _configureApp() {
    /**
     * Middleware
     */
    app.use(useragent.express());
    app.use( cookies() );
    app.use(domain.log);
    app.use(domain.autoRedirect);
    app.use(express.static(__dirname + CONFIG.web.staticDir, { maxAge: CONFIG.web.staticCacheable })); // allow static content to be cached for a week


}


_configureApp();
console.log( 'started on ',CONFIG.web.port );
app.listen(CONFIG.web.port);
