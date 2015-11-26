var Metalsmith = require('metalsmith'),
    filenames = require("metalsmith-filenames"),
    assets = require('metalsmith-static'),
    date = require('metalsmith-build-date'),
    layouts = require('metalsmith-layouts'),
    stylus = require('metalsmith-stylus'),
    i18n = require('metalsmith-i18n'),
    mapsite = require('metalsmith-mapsite'),
    permalinks = require('metalsmith-permalinks'),
    ignore = require('metalsmith-ignore'),
    rename = require('metalsmith-rename'),
    fingerprint = require('metalsmith-fingerprint'),
    inPlace = require('metalsmith-in-place'),
    autoprefixer = require('metalsmith-autoprefixer');


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
        "locales/*",
        "partials/*",
        "styles/mixins/*",
        "styles/_*",
      ]))
      .use(date)
      .use(assets({
        src: 'images'
      }))
      .use(stylus())
      .use(autoprefixer({
        browsers : ['last 2 versions'],
        cascade  : false
      }))
      .use(fingerprint({
        pattern: 'styles/main.css'
      }))
      .use(i18n({
        default: locale,
        directory: 'src/locales'
      }))
      .use(layouts({
        engine: 'handlebars',
        directory: 'src/layouts',
        partials: "src/partials"
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
