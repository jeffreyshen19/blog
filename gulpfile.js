var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var child = require('child_process');
var gutil = require('gulp-util');
var babel = require('gulp-babel');

gulp.task('babel', function(done) {
  return gulp.src(['./src/JS/components/*.js', './src/JS/components/**/*.js'])
    .pipe(babel({
        presets: [['minify', {
          builtIns: false,
        }]],
        plugins: ['transform-react-jsx']
    }))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('./dist/JS/components/'));
});

gulp.task('watch', function() {
  gulp.watch('./src/JS/components/*.js', ['babel']);
});

gulp.task("default", ["babel", "watch"]);
