var request = require('request-json-light');
var async = require('async');
var fs = require('fs');
var pathUtils = require('path');
var log = require('printit')();

var colorPicker = require('./color');

client = request.newClient("https://api.github.com/");
clientFile = request.newClient("https://raw.githubusercontent.com/");

var html = `---
layout: base.html

metaTitle: apps title
metaDescription: apps introduction
annexe: true

locale:
pathTo: ..
from: apps
---

{{> header }}
  <header class="introduction contrast apps">
    <div class="container">
      <div class="row row-justify-center">
        <div class="col-xs-22 col-lg-14">
          <h1 class="introduction-title">{{__ 'apps title'}}</h1>
        </div>
      </div>
      <div class="row row-justify-center">
        <div class="col-xs-22 col-lg-16">
          <p class="introduction-content-alt">
            {{__ 'apps introduction'}}
          </p>
        </div>
      </div>
    </div>
  </header>

  <div class="container">
    <div class="row row-justify-center">
`

log.info('Retrieving app list...');
client.get("repos/cozy/cozy-registry/contents/apps", (req, res, body) => {
  log.info('App list retrieved.');

  var buildAppMarkup = (entry, next) => {

    log.info(`Retrieving data for ${entry.name}...`);
    var path = "cozy/cozy-registry/master/apps/" + entry.name;
    clientFile.get(path, (req, res, app) => {
      log.info(`Data for ${entry.name} retrieved.`);
      repoInfos = app.git.split('/');
      authorSlug = repoInfos[3];
      repoSlug = repoInfos[4].split('.')[0];

      var color = colorPicker.getColor(app.slug, 'cozy');

      html += `
    <div class="col-xs-24 col-lg-12 app">
      <div>
        <img src="../images/spinner.svg"
             data-src="../images/apps/${app.slug}.svg"
             style="background: ${color}"/>
      </div>
      <div>
        <h3 class="app-title">${app.displayName}</h3>
        <p class="app-type">{{__ 'apps built by'}}
          <a href="${app.author.url}">${app.author.name}</a>
        </p>
        <p class="app-description">
          {{__ 'apps ${app.slug} description'}}
          <br />
          <iframe src="https://ghbtns.com/github-btn.html?user=${authorSlug}&repo=${repoSlug}&type=star&count=true"
                  frameborder="0" scrolling="0" width="170px" height="20px">
          </iframe>
        </p>
      </div>

    </div>`
      log.info(`Markup built for ${entry.name}.`);

      next();
    });

  };

  async.eachSeries(body, buildAppMarkup, (err) => {
    html += `</div>
  </div>
{{> footer }}`;
    fs.writeFileSync(pathUtils.join(__dirname, '../src/apps.html'), html);
    log.info('Generation or src/apps.html is done.');
  });
});

