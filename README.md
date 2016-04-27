A gulp plugin for RiotTS

# Usage

This plugin allows to precompile [riot](https://github.com/muut/riotjs) tags that are compatible with [RiotTS](https://github.com/nippur72/RiotTS).

## Example

```js
	var gulp = require('gulp');
	var riotts = require('gulp-riotts');
	
	gulp.task('some-task', function() {
    	return gulp.src('*.html')
    		.pipe(riotts())
    		.pipe(gulp.dest('tags.js'));
	});
```

## Compile options

This plugin supports riot's compile options.

```js
	g.pipe(riotts({ compact: true }));
```

### Available options

* indexByTagName: `Boolean`
	* If set to `true` will index compiled tags by tag name rather than file path.
* rootDir: `String`
	* Allows to override the root directory of file names if `indexByTagName` is not `true`
* compact: `Boolean`
	* Minify `</p> <p>` to `</p><p>`
* whitespace: `Boolean`
	* Escape `\n` to `\\n`
* expr: `Boolean`
	* Run expressions through parser defined with `--type`
* type: `String, coffeescript | typescript | cs | es6 | livescript | none`
	* JavaScript parser
* template: `String, jade`
	* Template parser
	* See more: https://muut.com/riotjs/compiler.html
* modular: `Boolean`
	* For AMD and CommonJS option
	* See more: http://riotjs.com/guide/compiler/#pre-compilation
* parsers: `Object`
	* Define custom parsers
	* css: `Function`
		* See more: http://riotjs.com/api/compiler/#css-parser
	* js: `Function`
		* See more: http://riotjs.com/api/compiler/#js-parser
	* html: `Function`
		* See more: http://riotjs.com/api/compiler/#html-parser

# Installation

```sh
% npm install gulp-riotts
```

# Requirements

* Node.js
* gulp
