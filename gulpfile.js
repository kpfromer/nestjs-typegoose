const gulp = require('gulp');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

const build = () =>
    gulp.src('src/**/*.ts').pipe(tsProject()).pipe(gulp.dest('dist'));

module.exports = {build}