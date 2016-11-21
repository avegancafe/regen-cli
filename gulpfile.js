let gulp = require("gulp");
let eslint = require("gulp-eslint");
let through2 = require('through2');
let execSync = require('child_process').execSync;

gulp.task('install', function() {
  return gulp
    .src("bin/index.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(through2.obj(function(file, enc, cb) {
      execSync("npm i -g .")
      this.push(file)
      cb()
    }));
})

gulp.task('default', ['install'], function() {
  gulp.watch('bin/index.js', [ 'install' ])
})
