base = require('./base.js');
var browserSync = require('metalsmith-browser-sync');

// Parse command line arguments.
var argv = require('minimist')(process.argv.slice(2));

metalsmith = base.getMetalsmith('fr');

if(argv.dev) {
  metalsmith.use(browserSync({
    server : "build",
    files  : ["src/**/*.html", "src/layouts/*.html", "src/styles/*.styl"]
  }))
}

metalsmith.build(function(err) {
  if (err) throw err;
});

