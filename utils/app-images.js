var fs = require('fs');
var path = require('path');
var request = require('request-json-light');
var async = require('async');
var log = require('printit')();

var client = request.newClient("https://api.github.com/");
var clientFile = request.newClient("https://raw.githubusercontent.com/");
var homeIconsFolder = "cozy/cozy-home/master/client/app/assets/";


// Extract the icon path from the Cozy Registry then download the icon
// from the Cozy Home repository.
var downloadIcon = (entry, next) => {

  var path = `cozy/cozy-registry/master/apps/${entry.name}`;

  log.info(`Retrieve app metadata for ${entry.name}...`);
  clientFile.get(path, (req, res, app) => {
    log.info(`App metadata for ${app.slug} retrieved.`);

    log.info(`Download image for ${app.slug}...`);
    var imageUrl = homeIconsFolder + app.icon;
    var targetPath = `../src/images/apps/${app.slug}.svg`;
    clientFile.saveFile(imageUrl, targetPath, function(err, res, body) {
      log.info(`Download for ${app.slug} complete.`);

      next();
    });
  });
};


// It downloads the app list by listing all files listed in the Cozy Registry.
// Then it retrieves the icon sequentally for each of these apps.
log.info(`Retrieve app list...`);
client.get("repos/cozy/cozy-registry/contents/apps", (req, res, body) => {
  log.info(`App list retrieved.`);

  async.eachSeries(body, downloadIcon, (err) => {
    log.info('All icons are downloaded.');
  });
});

