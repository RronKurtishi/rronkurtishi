const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

// Logs message
gulp.task('message', async () => console.log("Gulp is running..."));

// Copy all html files
gulp.task('copyHtml', async() => {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

// Optimize Images
gulp.task('imageMin', async() => {
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
})

// Compile Sass
gulp.task('sass', async() => {
  gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
})

// Scripts 
gulp.task('scripts', async() => {
  gulp.src('src/ts/*.ts')
    .pipe(concat('main.ts'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
})

// Build
gulp.task('build', gulp.series('message', 'copyHtml', 'imageMin', 'sass', 'scripts'));

//
gulp.task('watch', async() => {
  gulp.watch('src/ts/*.ts', gulp.series('scripts'));
  gulp.watch('src/images/*', gulp.series('imageMin'));
  gulp.watch('src/sass/*.scss', gulp.series('sass'));
  gulp.watch('src/*.html', gulp.series('copyHtml'));
})