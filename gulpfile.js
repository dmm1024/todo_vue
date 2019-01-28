const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
// const watch = require('gulp-watch');

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: 'dev'
        },
        notify: false
    })
});

gulp.task('styles', () => {
    return gulp.src('dev/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dev/'))
})

gulp.task('watch', ['browser-sync'], () => {
    gulp.watch('dev/**/*.scss', ['styles']).on('change', browserSync.reload);
    gulp.watch('dev/**/*.html').on('change', browserSync.reload);
	 gulp.watch('dev/**/*.js').on('change', browserSync.reload);
})

gulp.task('default', ['watch']);