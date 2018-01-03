"use strict";

const gulp = require('gulp');
const pug = require('gulp-pug2');
const sass = require('gulp-sass');
const debug = require('gulp-debug');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const ftp = require('vinyl-ftp');

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == "development";
//

gulp.task('default', function(callback) {
  return console.log('Hello, gulp!');
    });
gulp.task('styles', function() {
  return gulp.src('./scss/**')
    .pipe(gulpif(isDev,sourcemaps.init()))
    .pipe(sass({ style: 'expanded' }))
    .pipe(gulpif(isDev, sourcemaps.write()))
    .pipe(gulp.dest('dist/css'));
});
gulp.task('pug2html', function() {
  return gulp.src('./pug/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist'));
});
gulp.task('clean',function() {
    return del('dist');
});
gulp.task('assets',function() {
    gulp.src('fonts/**')
      .pipe(gulp.dest('dist/fonts/'));
    return gulp.src('img/**/*', {since: gulp.lastRun('assets')})
    .pipe(debug({title:'assets'}))
    .pipe(gulp.dest('dist/img/'));
});
gulp.task('build', gulp.parallel('styles', 'pug2html', 'assets'));
gulp.task('watch', function() {
    gulp.watch('./pug/**/*.pug', gulp.series('pug2html'));
    gulp.watch('./scss/**/*.scss', gulp.series('styles'));
    gulp.watch('./img/**', gulp.series('assets'));
});
gulp.task('dev', gulp.series('build', 'watch'));

gulp.task( 'deploy', function () {

  var conn = ftp.create( {
    host:     'vh100.hoster.by',
    user:     'poledeluxe@brandlab.by',
    password: 'F?2A756z}rze',
    parallel: 10
  } );

  var globs = [
    'dist/**'
  ];

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance

  return gulp.src( globs, { base: 'dist', buffer: false } )
    .pipe( conn.newer( '/' ) ) // only upload newer files
    .pipe( conn.dest( '/' ) );

} );