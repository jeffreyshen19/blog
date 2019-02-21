var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var child = require('child_process');
var gutil = require('gulp-util');

gulp.task('sass', function () {
  return gulp.src('assets/_src/SCSS/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('assets/dist/CSS'));
});

gulp.task('compress', function() {
  return gulp.src('assets/_src/JS/*.js')
    .pipe(minify({}))
    .pipe(gulp.dest('assets/dist/JS'));
});

gulp.task('jekyll', function() {
  var jekyll = child.spawn('jekyll', ['serve',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  var jekyllLogger = function(buffer){
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('default', gulp.parallel(gulp.parallel('sass', 'compress', 'jekyll'), function a() {
  gulp.watch('assets/_src/SCSS/*.scss', gulp.series('sass'));
  gulp.watch('assets/_src/JS/*.js', gulp.series('compress'));
}));
