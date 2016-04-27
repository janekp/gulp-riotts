const PLUGIN = 'gulp-riotts';

const jsesc = require('jsesc');
const riot = require('riot');
const path = require('path');
const through = require('through2');
const util = require('gulp-util');

module.exports = function(options) {
	if(!options) {
		options = { };
	}
	
	var transform = function(file, encoding, callback) {
		var generatedJS;
		
		if(file.isNull()) {
			return callback(null, file);
		}
		
		if(file.isStream()) {
			return callback(new util.PluginError(PLUGIN, 'Streams are not supported'));
		}
		
		if(options.parsers != null) {
			Object.keys(options.parsers).forEach(function(x) {
				return Object.keys(options.parsers[x]).forEach(function(y) {
					return riot.parsers[x][y] = options.parsers[x][y];
				});
			});
			
			delete options.parsers;
		}
		
		try {
			var tag = riot.compile(file.contents.toString(), Object.assign({ entities: true }, options))[0];
			var key = (options.indexByTagName) ? tag.tagName :
				path.relative(path.resolve((options.rootDir) ? options.rootDir : __dirname), file.path);
			
			generatedJS = `
				Riot.precompiledTags['${key}'] = {
					tagName: '${jsesc(tag.tagName)}',
					html: '${jsesc(tag.html)}',
					css: '${jsesc(tag.css)}',
					attribs: '${jsesc(tag.attribs)}'
				};`;
		} catch(e) {
			return callback(new util.PluginError(PLUGIN, file.path + ': Compiler Error: ' + e));
		}
		
		if(options.modular) {
			generatedJS = `(function(tagger) {
				if(typeof define === 'function' && define.amd) {
					define(['Riot'], function(Riot) { tagger(Riot); });
				} else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
					tagger(require('Riot'));
				} else {
					tagger(window.Riot);
				}
			})(function(Riot) { ${generatedJS} });`;
		}
		
		file.contents = new Buffer(generatedJS);
		file.path = file.path + '.js';
		
		return callback(null, file);
	}

	return through.obj(transform);
};