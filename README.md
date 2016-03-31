
# Chi-roru


[![Build Status](https://travis-ci.org/udondokodoon/chi-roru.svg?branch=master)](https://travis-ci.org/udondokodoon/chi-roru)

## SEUTP

```
$ sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++
$ npm install
```
[参考](https://github.com/Automattic/node-canvas)


## Usage

```
$ tsc app.ts
$ node app.js
```

## Debug

```
$ sudo npm install -g node-inspector
$ node --debug app.js & 
$ node-inspector --web-port=8000
```
chromeで http://192.168.33.10:8000/?port=5858を開く

