dev-tmpl
========

Get developin' in no time!
Use it the as-is or fork and create your own starting template.

## Get it!

```sh
git clone https://github.com/hontas/dev-tmpl.git
```

## Use it!

Rename the folder from `dev-tmpl` to that of your choosing and `cd` into it.

```sh
npm install
npm start
```
## Fork it!

Create your own custom template!

### Configure

#### Freshly installed dependencies
Specify what npm & bower packages you wish to install in `utils/dependancy.js`

```js
module.exports = {
	npm: [],
	bower: []
};
```

#### Default values
Take a look in `utils/defaults.js` to change default prompt values

## Test it!

```sh
npm test
```

## To Do

- add verbose flag
