var Metalsmith   = require('metalsmith'),
    filenames    = require("metalsmith-filenames"),
    date         = require('metalsmith-build-date'),
    layouts      = require('metalsmith-layouts'),
    i18n         = require('metalsmith-i18n'),
    mapsite      = require('metalsmith-mapsite'),
    permalinks   = require('metalsmith-permalinks'),
    ignore       = require('metalsmith-ignore'),
    rename       = require('metalsmith-rename'),
    fingerprint  = require('metalsmith-fingerprint'),
    inPlace      = require('metalsmith-in-place'),
    imagemin     = require('metalsmith-imagemin'),
    uglify       = require('metalsmith-uglify'),
    stylus       = require('metalsmith-stylus'),
    autoprefixer = require('metalsmith-autoprefixer'),
    assets       = require('metalsmith-assets');


module.exports = {
  getMetalsmith: function (locale) {

    var destination = 'build/' + locale

    var metalsmith = new Metalsmith(__dirname)

      // Config
      .use(filenames)
      .use(ignore([
        "layouts/*",
        "locales/*",
        "partials/*",
        "styles/mixins/*",
        "styles/_*",
      ]))
      .use(date)

      // Images
      .use(imagemin({
        optimizationLevel: 3,
        svgoPlugins: [{ removeViewBox: false }]
      }))

       //Javascript
      .use(uglify({
        filter: ['js/**/*.js'],
        removeOriginal: true,
        sourceMap: true,
        order: ['js/vendors/**/*.js', 'js/*.js'],
        concat: 'js/main.min.js'
      }))

      // Styles
      .use(stylus())
      .use(autoprefixer({
        browsers : ['last 2 versions'],
        cascade  : false
      }))
      .use(fingerprint({
        pattern: 'styles/main.css'
      }))

      // Translation
      .use(i18n({
        default: locale,
        locales: ['en', 'fr'],
        directory: 'src/locales'
      }))

      // HTML
      .use(layouts({
        engine: 'handlebars',
        directory: 'src/layouts',
        partials: "src/partials"
      }))
      .use(inPlace({
        engine: 'handlebars',
        directory: 'src'
      }))

      // Misc
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
