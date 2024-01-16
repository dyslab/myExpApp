## MyExpApp = _My Experimental Apps for node.js_

![myExpApp Badge](./public/images/app-badge.svg)

_`Initilized on 22 Nov 2018 & Last Modified on 17 Jan 2024.`_

This is my first shot for learning Node.js framework. It's a demostration for testing Node.js, Express, Pug template phaser and some awesome package came from npm and somewhere on internet.

Running this demo by CLI `npm start` or [PM2](https://pm2.keymetrics.io/) configured script `npm run pm2` in terminal/bash window, then input the link `http://localhost:8001/` on browser.

__Compiling Notes__: 

Since this application imported a module [node-canvas](https://github.com/Automattic/node-canvas). Its library files vary from the different OS system with regards to your development environment. So you might rebuild the node-canvas with **node-pre-gyp** by `npm install canvas --save` on your own OS system firstly. If you cannot compile this package successfully, please check out [compiling section](https://www.npmjs.com/package/canvas#compiling) on this page.

In case you cannot successfully install the module [node-canvas](https://github.com/Automattic/node-canvas) due to the restristion of GFW in China mainland. You are suppose to install a [cnpm](https://github.com/cnpm/cnpm) at first, then try again by the following command lines.

```bash
# Install cnpm globally by using npm
npm i cnpm -g

# Install node-canvas by using cnpm
cnpm i canvas

# Rebuild the application again
cnpm rebuild

# Take a try to start the app
cnpm start # or npm start

# Good luck
```

__Development environment__:

- Platform OS: Ubuntu 18.10 ~ 19.10 / Deepin 15.11 ~ 20.9

- Coding tool: VS Code

- Experimental Framework: Node.js + Express + Pug + JQuery

- VCS / repository: git / Github