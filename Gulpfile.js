var gulp = require('gulp'),
   jshint = require('gulp-jshint'),
   uglify = require('gulp-uglify'),
	 browserSync = require('browser-sync'),
   concat = require('gulp-concat');

var gutil = require('gutil');
var del = require('del');
var coffee = require('gulp-coffee');
var coffeelint = require('gulp-coffeelint');
var cache = require('gulp-cached');
var newer = require('gulp-newer');

require('shelljs/global')



var path = {
  scripts: ['./src/**/*.coffee'],
	scripts_dest: './build/',
  images: 'client/img/**/*'
};

//
//
// gulp.task('js', function () {
//   return gulp.src('js/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'))
//     .pipe(uglify())
//     .pipe(concat('app.js'))
//     .pipe(gulp.dest('build'));
// });
//
//
// gulp.task('browser-sync', function () {
//   var files = [
//     'app/**/*.html',
//     'app/assets/css/**/*.css',
//     'app/assets/imgs/**/*.png',
//     'app/assets/js/**/*.js'
//   ];
//
//   browserSync.init(files, {
//     server: {
//       baseDir: './app'
//     }
//   });
// });
//
// gulp.task('clean', function(cb) {
//   // You can use multiple globbing patterns as you would with `gulp.src`
//   del(['build'], cb);
// });


// start server 
gulp.task('start_server', function(){
	return;
	// Run external tool synchronously
	if (exec('npm start').code !== 0) {
	  echo('Error: npm start failed');
	  exit(1);
	}
});


// for coffeescript
gulp.task('coffee', ['coffeelint'], function() {
  gulp.src(path.scripts)
		.pipe(cache('coffee'))
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest(path.scripts_dest))
});

gulp.task('coffeelint', function () {
    gulp.src(path.scripts)
        .pipe(coffeelint())
        .pipe(coffeelint.reporter())
});

gulp.task('watch', ['watch_coffee', 'watch_bin', 'watch_public', 'watch_views', 'watch_package_json']);
gulp.task('copy', ['watch_coffee']);

gulp.task('watch_coffee', function(){
  gulp.watch(path.scripts, ['coffee']);
});
// gulp.task('watch_bin', function(){
//   return cp(['src/bin/**'],'./build/bin/')
// });
//
// gulp.task('watch_public', function(){
// 	return cp(['src/public/**'],'./build/public/')
// });
//
// gulp.task('watch_views', function(){
//   return cp(['src/views/**.*'],'./build/views/')
// });

gulp.task('watch_bin', function(){
  return cp(['src/bin/**/*'],'./build/bin/')
});

gulp.task('watch_public', function(){
	return cp(['src/public/**/*'],'./build/public/')
});

gulp.task('watch_views', function(){
  return cp(['src/views/**/*'],'./build/views/')
});

gulp.task('watch_package_json', function(){
  gulp.watch('./package.json',[] ,function(){
		console.log('  package package package')
		// Run external tool synchronously
		// if (exec('npm install').code !== 0) {
		//   echo('Error: npm install failed');
		//   exit(1);
		// }
  });
});

function cp(sources,dest){
	return gulp.watch(sources, [] ,function(){
	 	return gulp.src(sources)
	    .pipe(gulp.dest(dest));
	});
}

gulp.task('default', ['watch', 'coffee', 'start_server'], function () {
   // Your default task
});