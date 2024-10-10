# MyExpApp = _My Experimental Apps for node.js_

![myExpApp Badge](./public/images/app-badge.svg)

My initial attempt to learn the Node.js framework, serving as both a demonstration and a memorization tool for my journey with Node.js, Express, Pug, and other exciting technologies.

## Getting Started

```bash
npm start

npm run dev     # For development, Install nodemon via 'npm install nodemon -g' first

npm run pm2     # Install PM2 via 'npm install pm2 -g' first

# Then, open link 'http://localhost:8001/' in browser window
```

> NOTES 💬
>
> - [PM2](https://pm2.keymetrics.io/): Advanced, production process manager for Node.JS. PM2 is a daemon process manager that will help you manage and keep your application online 24/7.
>
> - [nodemon](https://nodemon.io/): Monitor for any changes in your source and automatically restart your server. Perfect for development.
>

## Important Notes About Installation

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

## Development Environment

- **OS Platform**: Deepin OS v15.11 ~ v23

- **Coding tool**: VS Code

- **Experimental Framework**: Node.js + Express + Pug + JQuery

- **VCS / Remote Repository**: git / Github

## Changelog

- Last Modified Date: 11 Oct 2024

- Initilized Date: 22 Nov 2018

🔹🔹🔹 🏁🏁🏁 🔹🔹🔹 🏁🏁🏁 🔹🔹🔹 🏁🏁🏁 🔹🔹🔹
