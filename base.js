var Metalsmith = require('metalsmith');
var filenames = require("metalsmith-filenames");
var asset = require('metalsmith-static');
var date = require('metalsmith-build-date');
var layouts = require('metalsmith-layouts');
var stylus = require('metalsmith-stylus');
var i18n = require('metalsmith-i18n');
var mapsite = require('metalsmith-mapsite');
var permalinks = require('metalsmith-permalinks');
var ignore = require('metalsmith-ignore');
var rename = require('metalsmith-rename');
var fingerprint = require('metalsmith-fingerprint');
var inPlace = require('metalsmith-in-place');


module.exports = {
  getMetalsmith: function (locale) {
    if (locale === 'en') {
      var destination = 'build'
    }
    else {
      var destination = 'build/' + locale
    }

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
      .use(i18n({
        default: locale,
        directory: 'src/locales'
      }))
      .use(layouts({
        engine: 'handlebars',
        directory: 'src/layouts'
      }))
      .use(inPlace({
        engine: 'handlebars',
        directory: 'src'
      }))
      .use(mapsite({
        hostname: "http://cozy.io"
      }))
      .use(permalinks({
        pattern: ':title',
        relative: false
      }))
      .destination(destination);

    return metalsmith;
  }
}
