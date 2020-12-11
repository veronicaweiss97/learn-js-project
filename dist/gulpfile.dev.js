"use strict";

var gulp = require('gulp');

var browserSync = require('browser-sync');

var sass = require('gulp-sass');

var cleanCSS = require('gulp-clean-css');

var autoprefixer = require('gulp-autoprefixer');

var rename = require("gulp-rename");

gulp.task('server', function () {
  browserSync({
    server: {
      baseDir: "src",
      index: "index.html"
    }
  });
  gulp.watch("src/*.html").on('change', browserSync.reload);
});
gulp.task('styles', function () {
  return gulp.src("src/sass/**/*.+(scss|sass)").pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError)).pipe(rename({
    suffix: '.min',
    prefix: ''
  })).pipe(autoprefixer({
    overrideBrowserslist: ['last 2 versions'],
    cascade: false
  })).pipe(cleanCSS({
    compatibility: 'ie8'
  })).pipe(gulp.dest("src/css")).pipe(browserSync.stream());
});
gulp.task('watch', function () {
  gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
});
gulp.task('default', gulp.parallel('watch', 'server', 'styles'));