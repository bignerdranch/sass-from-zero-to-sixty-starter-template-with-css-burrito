var browserSync = require('browser-sync');
var gulp = require('gulp');
var prefix = require('gulp-autoprefixer');
var cssmin = require('gulp-minify-css');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

var sassPath = 'assets/stylesheets/';

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
    port: 4000
  });
});

gulp.task('reload', function () {
  browserSync.reload();
});

gulp.task('styles', function() {
  var onError = function(err) {
    notify.onError({
      title: "Gulp",
      subtitle: "Failure!",
      message: "Error: <%= error.message %>",
      sound: "Beep"
    })(err);
    this.emit('end');
  };

  return gulp.src(sassPath + '**/*.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass())
    .pipe(prefix())
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(sassPath));
});

gulp.task('watch', function() {
  gulp.watch(sassPath + '**/*.scss', ['styles', 'reload']);
});

gulp.task('default', ['browser-sync', 'watch']);
