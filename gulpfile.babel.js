import path from 'path';
import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import webpackInit from './server.js';
import sass from 'gulp-sass';

gulp.task('server', () => {
  nodemon({
    script: 'server/index.js',
    ext: 'js'
  });
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./static'));
});

// gulp.task('sass:watch', function () {
//   gulp.watch('.src/sass/**/*.scss', ['sass']);
// });

gulp.task('set-vars', () => {
  process.env.APP_NAME = 'CV Share';
  process.env.PROTOCOL = 'http';
  process.env.UI_HOSTNAME = 'localhost';
  process.env.UI_PORT = '3000';

  process.env.API_HOSTNAME = 'localhost';
  process.env.API_PORT = '3014';
});

gulp.task('set-dev', () => {
  process.env.ENV_VAR = 'develop';
});

gulp.task('set-prod', () => {
  process.env.ENV_VAR = 'production';
});

gulp.task('dev', ['set-dev', 'set-vars', 'server', 'sass'], () => {
  webpackInit();
});
