var gulp = require('gulp');
var gutil = require('gutil');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');
var coffeelint = require('gulp-coffeelint');
var cache = require('gulp-cached');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var compass = require('gulp-compass');
var minify_css = require('gulp-minify-css');
var jade = require('gulp-jade');
require('shelljs/global');

var config = require('./package.json')
var path = {
  scripts: ['./src/**/*.coffee'],
	scripts_dest: config.build,
  images: 'client/img/**/*'
};
 
// stop server 
gulp.task('stop_server', function(){
	// Run external tool synchronously
	exec("ps -ef|grep src|awk '{print $2}'|xargs kill -9", {async:true});
});

// start server 
gulp.task('start_server', ['stop_server'], function(){
	setTimeout(function(){
		exec('npm start', {async:true})
	},2000);
});


// for coffeescript
gulp.task('compile_coffee', ['coffeelint'], function() {
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

//////////////////// Test ////////////////////

gulp.task('test', ['compile_coffee'],function (cb) {
  gulp.src(['src/test/**/*.js'])
    .pipe(istanbul()) // Covering files
    .on('finish', function () {
      gulp.src(['src/test/*.js'])
        .pipe(mocha({
					ui : 'bdd',
					reporter: 'spec'
				}))
        .pipe(istanbul.writeReports()) // Creating the reports after tests runned
        .on('end', cb);
    });
});

//////////////////// Clean ////////////////////
gulp.task('clean', function(){
  rm('-Rf','build/test')
});


gulp.task('watch', ['watch_coffee', 'watch_bin', 'watch_public', 'watch_views', 'watch_package_json']);
gulp.task('copy', ['watch_coffee']);

gulp.task('watch_coffee', function(){
  gulp.watch(path.scripts, ['coffee']);
});

gulp.task('watch_bin', function(){
  return cp(['src/bin/**/*'],'./src/bin/')
});

gulp.task('watch_public', function(){
	return cp(['src/public/**/*'],'./src/public/')
});

gulp.task('watch_views', function(){
  return cp(['src/views/**/*'],'./src/views/')
});

gulp.task('watch_package_json', function(){
  gulp.watch('./package.json',[] ,function(){
		console.log('package package package')
		// Run external tool synchronously
		// if (exec('npm install').code !== 0) {
		//   echo('Error: npm install failed');
		//   exit(1);
		// }
  });
});

// watch 之前需要先copy一次的,这样才能同步
function cp(sources,dest){
	gulp.src(sources).pipe(gulp.dest(dest));
	
	return gulp.watch(sources, [] ,function(){
	 	return gulp.src(sources)
	    .pipe(gulp.dest(dest));
	});
}

gulp.task('default', [  'compile_coffee'], function () {
   // Your default task
});