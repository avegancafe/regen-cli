var gulp = require("gulp");
var eslint = require("gulp-eslint");
var through2 = require('through2');
var execSync = require('child_process').execSync;

gulp.task('lint', function() {
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

gulp.task('default', ['lint'], function() {
  gulp.watch('bin/index.js', [ 'lint' ])
})
