var gulp   = require('gulp');
var less   = require('gulp-less');
var path   = require('path');
var notify = require('gulp-notify');
var gutil  = require('gulp-util');

/* PARAMS */
var target = './less/freshlaundry.less';

// Specify what your default tasks are... i.e what should run when you run 'gulp' in CL
// Our tasks here are 'less' and 'watch'
gulp.task('default', ['less','watch']);

    // Set up watch task
    gulp.task('watch', function() {

        // Watch the less folder, and upon updates run the less task
        gulp.watch('less/*.less', ['less']);
    }
);

/* TASKS */
gulp.task('less', function () {
  gulp.src(target)
    .pipe(less({compress: false}).on('error', gutil.log))
    .pipe(gulp.dest('css/'))
    .pipe(notify('Less Compiled'));
});



