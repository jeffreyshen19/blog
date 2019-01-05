var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify');

gulp.task('sass', function () {
  return gulp.src('assets/src/SCSS/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('assets/dist/CSS'));
});

gulp.task('compress', function() {
  return gulp.src('assets/src/JS/*.js')
    .pipe(minify({}))
    .pipe(gulp.dest('assets/dist/JS'));
});

gulp.task('default', gulp.series(gulp.series('sass', 'compress'), function a() {
  gulp.watch('assets/src/SCSS/*.scss', gulp.series('sass'));
  gulp.watch('assets/src/JS/*.js', gulp.series('compress'));
}));
