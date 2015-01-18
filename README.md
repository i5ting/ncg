# ncg

nodejs + coffeescript  + gulp

## Step

	npm init
	express .


// task
gulp.task('compile-coffee', function () {
    gulp.src('./CoffeeScript/one.coffee') // path to your file
    .pipe(coffee())
    .pipe(gulp.dest('path/to/destination'));
});


src/

build

start 

supervisor build/bin/www