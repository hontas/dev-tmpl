dev-tmpl
========

Get developin' in no time!
Use as-is or fork it and build your own tmpl-x on top.

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

### Fork it!
```sh
git remote add origin https://github.com/<userName>/<repoName>.git
git remote add upstream https://github.com/hontas/dev-tmpl.git
```

#### Configure
##### Dependencies
Specify what npm & bower packages you wish to install in `utils/dependancy.js`

```js
module.exports = {
	npm: [],
	bower: []
};
```
##### Defaults
Take a look in `utils/defaults.js` to change default prompt values

## Test it!

```sh
npm test
```

## To Do

- add verbose flag
