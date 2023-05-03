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

We use JSON key-value files to store all the locales, and Transifex to translate the website.
These files are located inside the `src/locales` folder. To prevent conflicts, please avoid updating this
files directly, but prefer to edit them on Transifex.

* To translate the Website, go to [Transifex](https://www.transifex.com/cozy/cozy-site/);
* To test your translations, install the [Transifex client](http://docs.transifex.com/client/) and run `tx pull` inside the root directory, the rebuild the site.

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

