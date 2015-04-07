var gulp = require('gulp'),
plumber = require('gulp-plumber'),
less = require('gulp-less'),
notify = require("gulp-notify"),
changed = require('gulp-changed'),
debug = require('gulp-debug');


gulp.task('less', function () {

  var onError = function(err) {
      notify.onError({
          title:    "Error compiling less file in ",
          subtitle: "<%= error.filename.replace(/^.*[\\\/]/, '') %>",
          message:  "Error: <%= error.message %>",
          sound:    "Beep"
        })(err);
      this.emit('end')
    };

  return gulp.src('less/**/*.less')
    .pipe(changed( 'css', {extension: '.css'}))
    .pipe(plumber({errorHandler: onError}))
    .pipe(less({
      paths: [ './less/' ]
    }))
    .pipe(debug({title: 'Succesfully compiled: '}))
    .pipe(notify("Succesfully compiled <%= file.relative %>!"))
    .pipe(gulp.dest('./css'));
});


gulp.task('watch', function() {
  gulp.watch("less/**/*.less", ["less"]);
});

gulp.task('default', ['watch']);

