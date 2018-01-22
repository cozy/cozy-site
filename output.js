base = require('./base.js');
var browserSync = require('metalsmith-browser-sync');

// Parse command line arguments.
var argv = require('minimist')(process.argv.slice(2));

metalsmith = base.getMetalsmith('en');
metalsmith = base.getMetalsmith('fr');
metalsmith = base.getMetalsmith('es');

if(argv.dev) {
  metalsmith.use(browserSync({
    server : "build",
    files  : ["src/**/*.*"],
    open: false
  }))
}

metalsmith.build(function(err) {
  if (err) throw err;
});
