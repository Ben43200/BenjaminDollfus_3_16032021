'use strict';

const autoprefixer    = require('gulp-autoprefixer');
const browserSync     = require("browser-sync").create();
const concat          = require('gulp-concat');
const ejs             = require("gulp-ejs");
const gulp            = require('gulp');
const sass            = require('gulp-sass');

sass.compiler = require('node-sass');

function makeCss() {
  return gulp.src(["./src/base.scss",'./src/**/*.scss'])
    .pipe(concat("style.css"))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
			cascade: false
		}))
    .pipe(gulp.dest('./www/css'));
}

function makePage() {

  return gulp.src("./src/pages/*.html")
    .pipe(ejs())
    .pipe(gulp.dest("./www"))

}

function watch() {
  browserSync.init({
    server: "./www"
  });

  gulp.watch("./src/**/*.scss", makeCss);
  gulp.watch("./src/**/*.html", makePage);
  gulp.watch("./www/").on('change', browserSync.reload);
}
module.exports.makeCss    = makeCss;
module.exports.makePage   = makePage;
module.exports.watch      = watch;
