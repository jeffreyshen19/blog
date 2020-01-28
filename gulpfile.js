var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var child = require('child_process');
var gutil = require('gulp-util');
var babel = require('gulp-babel');

gulp.task('babel', function() {
  return gulp.src('assets/src/JS/components/line_chart.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('assets/dist/JS'))
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

// gulp.task('default', gulp.parallel(gulp.parallel('babel', 'jekyll'), function a() {
//   gulp.watch('assets/src/JS/components/*.js', gulp.series('babel'));
// }));
gulp.task('default', gulp.parallel('babel', function a() {
  gulp.watch('assets/src/JS/components/*.js', gulp.series('babel'));
}));
