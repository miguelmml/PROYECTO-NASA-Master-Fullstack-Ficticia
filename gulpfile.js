const gulp = require('gulp');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const minify = require('gulp-minify');

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
    console.log('Watcher iniciado');
    res();
  });
}));