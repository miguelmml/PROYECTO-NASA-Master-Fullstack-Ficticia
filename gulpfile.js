const gulp = require('gulp'),
      jshint = require('gulp-jshint'),
      concat = require('gulp-concat'),
      minify = require('gulp-minify');

function concatLinterMin() {
  return new Promise(function (res,rej){
    gulp.src('./js/*.js')
    .pipe(jshint({
      esversion: 8
    }))
    .pipe(jshint.reporter('default',{verbose: true}))
    .pipe(concat('all.js'))
    .pipe(minify())
    .pipe(gulp.dest('./dist'))
    res();
  })
}

gulp.task('concat-linter-min', concatLinterMin);

gulp.task('default', gulp.series('concat-linter-min',function() { 
  return new Promise(function (res,rej){
    gulp.watch('js/*.js', concatLinterMin); 
    res();
  });
}));