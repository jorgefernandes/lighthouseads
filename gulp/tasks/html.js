'use strict';

var gulp = require("gulp");
var config = require('../config');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var path = require('path');
var fs = require('fs');
var prettify = require('gulp-html-prettify');
var handleErrors = require('../utils/handleErrors');
var browserSync = require("browser-sync");
var minifyHTML = require('gulp-minify-html');
var gulpif = require('gulp-if');



function htmlNunjucksRun(watch, minify) {
	// Configura o ambiente do nunjucks
	nunjucksRender.nunjucks.configure([config.html.baseRender], { watch: watch });

	return gulp.src(config.html.src)
		.pipe(nunjucksRender().on('error', handleErrors))
		.pipe( gulpif(!minify, prettify({
			indent_char: '	',
			indent_size: 1
		})) )
		.pipe( gulpif( minify, minifyHTML() ) )
		.pipe(gulp.dest(config.html.dst))
		.pipe(browserSync.reload({stream: true}));
}


gulp.task('html-nunjucks', function() {
	return htmlNunjucksRun(false, false);
});


gulp.task('html-nunjucks-watch', function() {
	return htmlNunjucksRun(true, false);
});


gulp.task('html-build-nunjucks', function() {
	return htmlNunjucksRun(false, config.html.minifyDistHtml);
});
