var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var child = require('child_process');
var gutil = require('gulp-util');
var babel = require('gulp-babel');

gulp.task('babel', function() {
  return gulp.src('./src/JS/components/*.js')
    .pipe(babel({
        presets: ['@babel/env', "minify"],
        plugins: ['transform-react-jsx']
    }))
    .pipe(gulp.dest('./dist/JS/components'))
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

gulp.task('default', gulp.parallel(gulp.parallel('babel', 'jekyll'), function a() {
  gulp.watch('/src/JS/components/*.js', gulp.series('babel'));
}));
