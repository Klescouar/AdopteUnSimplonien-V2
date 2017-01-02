const gulp = require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
// const browserSync = require('browser-sync');
const rename = require("gulp-rename");
const gulpCopy = require('gulp-copy');
const inject = require('gulp-inject');
const nodemon = require('gulp-nodemon');
const bs = require("browser-sync").create();

gulp.task('sass', function() {
    gulp.src('src/app/scss/style.scss').pipe(inject(gulp.src(['**/*.scss'], {
        read: false,
        cwd: 'src/app/scss'
    }), {
        starttag: '/* IMPORTS */',
        endtag: '/* Fin des IMPORTS */',
        transform: function(filepath) {
            const res = '@import \'' + filepath + '\';';
            console.log(res);
            return res;
        }
    })).pipe(sass({outputStyle: 'compressed'})). //
    pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR', 'ie 11')).pipe(plumber()).pipe(gulp.dest('dist/app/css'));
});

/**
 *
 * BrowserSync.io
 * - Watch CSS, JS & HTML for changes
 * - View project at: localhost:6868
 *
 **/
gulp.task('browser-sync', ['nodemon'], function() {
  // browserSync.init({
  //     // server:'./dist',
  //     proxy: 6868
  // });
    bs.init([
        'dist/**/css/*.css', 'dist/**/*.js', 'src/**.html'
    ], {
        proxy: "http://localhost:6868",
        // server: {
        //     baseDir: './dist'
        // }
    });
});

gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('copy', function() {
    gulp.src('src/app/index.html').pipe(gulp.dest('dist/app'));
    gulp.src('src/assets/images/*').pipe(gulp.dest('dist/assets/images'));
    gulp.src('src/app/views/**/*.html').pipe(gulp.dest('dist/app/views'));
    gulp.src('src/assets/lib/**/*').pipe(gulp.dest('dist/assets/lib'));
    gulp.src('src/app/js/**/*.js').pipe(gulp.dest('dist/app/js'));
    gulp.src('src/app/*.js').pipe(gulp.dest('dist/app/'));
});

gulp.task('default', [
    'sass', 'copy', 'browser-sync'
], function() {
    gulp.watch('src/app/scss/*.scss', ['sass']);
    gulp.watch('src/app/index.html', ['copy']);
    gulp.watch('src/app/views/**/*.html', ['copy']);
    gulp.watch('src/app/js/**/*.js', ['copy']);
    gulp.watch('src/app/*.js', ['copy']);
});
