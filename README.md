# MyExpApp = _My Experimental Apps for node.js_

![myExpApp Badge](./public/images/app-badge.svg)

My initial attempt to learn the Node.js framework, serving as both a demonstration and a memorization tool for my journey with Node.js, Express, Pug, and other exciting technologies.

## Installation

```bash
# We have to install 'node-gyp' globally firstly.
# In order to install 'node-canvas' which this project needs.
npm install -g node-gyp
npm install
```

### NOTE: 💬
> 
> - [node-canvas](https://github.com/Automattic/node-canvas) is a module for Node.js, which provides a 2D drawing API. It is based on the [Canvas](https://html.spec.whatwg.org/multipage/canvas.html) API, and is used to generate images in a Node.js environment.
>
> - [node-gyp](https://github.com/nodejs/node-gyp) is a cross-platform command-line tool written in Node.js that is used to build native addon modules for Node.js. It is used to compile native C++ code into a binary module that can be loaded into Node.js.

## Getting Started

```bash
npm start
# or, 
npm run dev     # For development, Install nodemon via 'npm install nodemon -g' first
# or, 
npm run pm2     # Install PM2 via 'npm install pm2 -g' first

# Then, open link 'http://localhost:8001/' in browser window
```

### NOTE: 💬
>
> - [PM2](https://pm2.keymetrics.io/): Advanced, production process manager for Node.JS. PM2 is a daemon process manager that will help you manage and keep your application online 24/7.
>
> - [nodemon](https://nodemon.io/): Monitor for any changes in your source and automatically restart your server. Perfect for development.

## Important Notes About Installation

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

## Development Environment

- **OS Platform**: Deepin OS v15.11 ~ v23 / Windows 11

- **Coding tool**: VS Code

- **Experimental Framework**: Node.js + Express + Pug + JQuery

- **VCS / Remote Repository**: git / Github

## Changelog

- Last Modified Date: 25 Oct 2025

- Initilized Date: 22 Nov 2018

🔹🔹🔹 🏁🏁🏁 🔹🔹🔹 🏁🏁🏁 🔹🔹🔹 🏁🏁🏁 🔹🔹🔹
