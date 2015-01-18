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


var cache = require('gulp-cached');

gulp.task('lint', function(){
  // return gulp.src('files/*.js')
  //   .pipe(cache('coffee'))
  //   .pipe(jshint())
  //   .pipe(jshint.reporter())
});


// for coffeescript
gulp.task('coffee', ['coffeelint'], function() {
  gulp.src('./src/**/*.coffee')
		.pipe(cache('coffee'))
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./build/'))
});

gulp.task('watch_coffee', function(){
  gulp.watch('src/**/*.coffee', ['coffee']);
});

gulp.task('coffeelint', function () {
    gulp.src('./src/**/*.coffee')
        .pipe(coffeelint())
        .pipe(coffeelint.reporter())
});

gulp.task('watch', ['watch_coffee']);
gulp.task('copy', ['watch_coffee']);

gulp.task('default', ['watch', 'coffee'], function () {
   // Your default task
});