# Cozy Website sources

## Hack

*setup*

Clone this repository then install dependencies:

```bash
npm i
```

*build*

To run the build properly you will need at least Node.js v4.0. 

```bash
npm run build
npm run build --fr
```

The result will be stored in a folder named `build`.

*How to start the development server*

```bash
npm run dev
```

This command will run:

* a web server that serves your static built files on the 3000 port.
* a watcher that will rebuild your files and update your locale keys eacht time you change something.


## Locales


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

* The build engine of the website is based on [Metalsmith](http://metalsmith.io/) (a static-website generator). 
* The templates are written with [Handlebars](http://handlebarsjs.com/). 
* Stylesheets are written with [Stylus](http://stylus-lang.com/)

## TODO

* French translations


## What is Cozy?

![Cozy
Logo](https://raw.github.com/cozy/cozy-setup/gh-pages/assets/images/happycloud.png)

[Cozy](http://cozy.io) is a platform that brings all your web services in the
same private space.  With it, your web apps and your devices can share data
easily, providing you with a new experience. You can install Cozy on your own
hardware where no one profiles you.

## Community

You can reach the Cozy Community by:

* Chatting with us on IRC #cozycloud on irc.freenode.net
* Posting on our [Forum](https://forum.cozy.io/)
* Posting issues on the [Github repos](https://github.com/cozy/)
* Mentioning us on [Twitter](http://twitter.com/mycozycloud)

