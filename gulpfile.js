const gulp = require('gulp');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');

function concatLinter() {
  return new Promise(function (res,rej){
    gulp.src('./js/*.js')
    .pipe(jshint({
      esversion: 8
    }))
    .pipe(jshint.reporter('default',{verbose: true}))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./'))
    res();
  })
}

gulp.task('concat-linter', concatLinter);

gulp.task('default', gulp.series('concat-linter',function() { 
  return new Promise(function (res,rej){
    gulp.watch('js/*.js', concatLinter); 
    console.log('Watcher iniciado');
    res();
  });
}));