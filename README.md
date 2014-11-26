dev-tmpl
========

[![Build Status](https://travis-ci.org/hontas/dev-tmpl.svg?branch=master)](https://travis-ci.org/hontas/dev-tmpl)
[![Dependency Status](https://david-dm.org/hontas/dev-tmpl.svg)](https://david-dm.org/hontas/dev-tmpl)

Answer a few questions and dev-tmpl will

* Setup `package.json` & `bower.json`
* Setup git (if you want) and perform the first commit
* Open a browser and take you to the *create new repo* page @ github

Use it as-is or fork it and build your own tmpl-x on top.

## Get it!

```sh
git clone https://github.com/hontas/dev-tmpl.git
```
Rename the folder from `dev-tmpl` to that of your choosing and `cd` into it.

### Use it!
```sh
npm install
npm start
```

## Roll your own

### Fork it!

**Get it!**™, then

```sh
git remote add origin https://github.com/{yourUserName}/{yourRepoName}.git
git remote add upstream https://github.com/hontas/dev-tmpl.git
```

Keep it in sync
```sh
git fetch upstream
git checkout master
git merge upstream/master
```

#### Configurables
##### NPM & Bower Dependencies
Specified in `utils/dependancy.js`

```js
module.exports = {
	npm: ['gulp', 'gulp-concat'],
	bower: ['font-awesome']
};
```
##### Default answers
Specified in `utils/defaults.js`
