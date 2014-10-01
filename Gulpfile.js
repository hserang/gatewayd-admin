var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    lrserver = require('tiny-lr')();

//server
var express = require('express'),
    refresh = require('gulp-livereload'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 3000;

var server = express();
server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(req, res) {
  res.sendfile('index.html', { root: 'dist' });
});

// JSHint task
gulp.task('lint', function() {
  gulp.src('./app/js/*.js')
  .pipe(jshint())
  // You can look into pretty reporters as well, but that's another story
  .pipe(jshint.reporter('default'));
});

// Dev task
gulp.task('dev', ['clean', 'views', 'styles', 'lint', 'browserify'], function() { });

// Clean task
gulp.task('clean', function() {
  gulp.src('./dist/views', { read: false }) // much faster
  .pipe(rimraf({force: true}));
});

// Browserify task
gulp.task('browserify', function() {
  return browserify('./app/js/app.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watch', ['lint'], function() {

  // Start webserver
  server.listen(serverport);

  // Start live reload
  refresh.listen(livereloadport);

  // Watch our js
  gulp.watch(['app/js/*.js', 'app/js/**/*.js'],[
    'lint',
    'browserify'
  ]);

  gulp.watch(['app/**/*.html'], [
    'views'
  ]);

  // Watch our sass files
  gulp.watch(['app/styles/**/*.scss'], [
    'styles'
  ]);

  gulp.watch('./dist/**').on('change', refresh.changed);
});

// Styles task
gulp.task('styles', function() {
  gulp.src('./app/styles/*.scss')
  // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
  .pipe(sass({
    onError: function(e) { console.log(e); },
    includePaths: require('node-neat').includePaths
  }))
  .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
  .pipe(gulp.dest('dist/css/'))
  .pipe(refresh(lrserver));
});

// Views task
gulp.task('views', function() {
  // Get our index.html
  gulp.src('app/index.html')
  // And put it in the dist folder
  .pipe(gulp.dest('dist/'));

  // Any other view files from app/views
  gulp.src('/app/views/**/*')
  // Will be put in the dist/views folder
  .pipe(gulp.dest('dist/views/'))
  .pipe(refresh(lrserver));
});

gulp.task('default', ['dev', 'watch']);
