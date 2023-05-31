# Cozy Website sources

## Develop

⚠️ Currently, you need to use Node 8.

*setup*

Clone this repository then install dependencies:

```bash
yarn install
```

*build*

To run the build properly you will need at least Node.js v4.0.

```bash
yarn build
yarn build:fr
```

The result will be stored in a folder named `build`.

*How to start the development server*

```bash
yarn dev
yarn dev:fr
yarn dev:es
```

This command will run:

* a web server that serves your static built files on the 3000 port.
* a watcher that will rebuild your files and update your locale keys eacht time you change something.

Check http://localhost:3000/en/ to start browsing!


## Locales

Localization and translations are handled by [Transifex][tx], which is used by all Cozy's apps.

As a _translator_, you can login to [Transifex][tx-signin] (using your Github account) and claim an access to the [app repository][tx-app]. Transifex will then create pull request on the repository, and the locales are merged after validating the pull request.

As a _developer_, you just have to modify json in `/src/locales`. New locales will be automatically added to Transifex. If you need to pull or push manually locales, you can use [Transifex CLI](tx-cli). If you were using a [transifex-client](tx-client), you must move to [Transifex CLI](tx-cli) to be compatible with the v3 API.

## Application page

The application is automatically generated. It's done via two scripts located
in the `utils` folder. Here is the script to download icons from the app
registry and build the app page from the Cozy registry information:

```bash
cd utils
node app-images.js
node app.js
```

## Extra information

* The build engine of the website is based on [Metalsmith](http://metalsmith.io/) (a static website generator).
* The templates are written with [Handlebars](http://handlebarsjs.com/).
* Stylesheets are written with [Stylus](http://stylus-lang.com/)


## What is Cozy?

![Cozy
Logo](https://raw.github.com/cozy/cozy-setup/gh-pages/assets/images/happycloud.png)

[Cozy](http://cozy.io) is a platform that brings all your web services in the
same private space.  With it, your web apps and your devices can share data
easily, providing you with a new experience. You can install Cozy on your own
hardware where no one profiles you.

## Community

You can reach the Cozy Community by:

* Chatting with us on IRC #cozycloud on irc.libera.chat
* Posting on our [Forum](https://forum.cozy.io/)
* Posting issues on the [Github repos](https://github.com/cozy/)
* Mentioning us on [Twitter](http://twitter.com/cozycloud)

[tx]: https://www.transifex.com/cozy/
[tx-signin]: https://www.transifex.com/signin/
[tx-app]: https://www.transifex.com/cozy/cozy-site/dashboard/
[tx-cli]: https://developers.transifex.com/docs/cli
[tx-client]: https://github.com/transifex/transifex-client
