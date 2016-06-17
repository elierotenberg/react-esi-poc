const babel = require('gulp-babel');
const gulp = require('gulp');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');

gulp.task('babel', () => gulp.src('src/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist'))
);

gulp.task('bundle', ['babel'], () => gulp.src('dist/client.js')
  .pipe(webpack({ devtool: 'cheap-module-inline-source-map' }))
  .pipe(rename('c.js'))
  .pipe(gulp.dest('dist'))
);

gulp.task('watch', () => gulp.watch('src/**/*', ['babel', 'bundle']));

gulp.task('default', ['babel', 'bundle']);
