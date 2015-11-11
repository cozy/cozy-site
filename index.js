var Metalsmith = require('metalsmith');
var filenames = require("metalsmith-filenames");
var asset = require('metalsmith-static');
var date = require('metalsmith-build-date');
var layouts = require('metalsmith-layouts');
var stylus = require('metalsmith-stylus');
var i18n = require('metalsmith-i18n');
var mapsite = require('metalsmith-mapsite');
var permalinks = require('metalsmith-permalinks');
var browserSync = require('metalsmith-browser-sync');
var ignore = require('metalsmith-ignore');
var rename = require('metalsmith-rename');
var fingerprint = require('metalsmith-fingerprint');


// Parse command line arguments.
var argv = require('minimist')(process.argv.slice(2));


var metalsmith = new Metalsmith(__dirname)
  .use(filenames)
  .use(ignore([
    "layouts/*",
    "locales/*"
  ]))
  .use(date)
  .use(asset({
    src: 'assets'
  }))
  .use(stylus())
  .use(fingerprint({
    pattern: 'styles/main.css'
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: 'src/layouts'
  }))
  //.use(i18n({
    //default: 'en',
    //locales: ['en', 'fr'],
    //directory: 'src/locales'
  //}))
  .use(mapsite({
    hostname: "http://cozy.io"
  }))
  .use(permalinks({
    pattern: ':title',
    relative: false
  }))


if(argv.dev) {
  metalsmith.use(browserSync({
    server : "build",
    files  : ["src/**/*.html", "src/layouts/*.html", "src/styles/*.styl"]
  }))
}


metalsmith.build((err) => {
  if (err) throw err
});

