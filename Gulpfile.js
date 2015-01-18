var gulp = require('gulp'),
   jshint = require('gulp-jshint'),
   uglify = require('gulp-uglify'),
	 browserSync = require('browser-sync'),
   concat = require('gulp-concat');

var gutil = require('gutil');
	 
gulp.task('js', function () {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function () {
   gulp.watch('templates/*.tmpl.html', ['build']);
});

gulp.task('browser-sync', function () {
  var files = [
    'app/**/*.html',
    'app/assets/css/**/*.css',
    'app/assets/imgs/**/*.png',
    'app/assets/js/**/*.js'
  ];

  browserSync.init(files, {
    server: {
      baseDir: './app'
    }
  });
});

var coffee = require('gulp-coffee');
var coffeelint = require('gulp-coffeelint');

gulp.task('coffee', function() {
  gulp.src('./src/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./build/'))
});

gulp.task('lint', function () {
    gulp.src('./src/*.coffee')
        .pipe(coffeelint())
        .pipe(coffeelint.reporter())
});

gulp.task('default',['coffee'], function () {
   // Your default task
});