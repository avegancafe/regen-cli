var gulp = require("gulp")
var eslint = require("gulp-eslint")
var through2 = require('through2')
var execSync = require('child_process').execSync

function lint() {
  return gulp
    .src("./bin/index.js")
    .pipe(eslint())
    .pipe(eslint.format())
}

gulp.task('lint', lint);

gulp.task('watch', ['default'], function() {
  gulp.watch('./bin/**/*.js', ['lint'])
})

gulp.task('default', ['lint'])
