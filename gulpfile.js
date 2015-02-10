var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var del = require('del');
var sass = require('gulp-ruby-sass');
var sprite = require('gulp.spritesmith');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');

gulp.task('coffee', function() {
	return gulp.src('src/coffee/**/*.coffee')
		.pipe(coffee())
		.pipe(concat('main.js'))
		.pipe(gulp.dest('public/js/'))
});

gulp.task('copy-html', function() {
	console.log('copy html');
});

gulp.task('csslibs', function() {
	return gulp.src([
		'bower_components/bootstrap/dist/css/bootstrap.min.css'
	])
		.pipe(concat('libs.css'))
		.pipe(gulp.dest('public/css/'))
});

gulp.task('jslibs', function() {
	return gulp.src([
		'bower_components/jquery/dist/jquery.min.js',
		'bower_components/bootstrap/dist/js/bootstrap.min.js'
	])
		.pipe(concat('libs.js'))
		.pipe(gulp.dest('public/js/'))
});

// エラーが出る場合、package.jsonでgulp-ruby-sassのバージョンがalphaでない確認する
// ✔ "gulp-ruby-sass": "^0.7.1",
// ✘ "gulp-ruby-sass": "^1.0.0-alpha.3",
gulp.task('sass', function () {
	return gulp.src('src/scss/main.scss')
		.pipe(sass({ style:'compressed' }))
		.pipe(gulp.dest('public/css'));
});

gulp.task('sprite', function() {
	return gulp.src('src/img/*')
		.pipe(sprite({
			imgName:'img/sprite-img1.png',
			cssName:'css/sprite-img1.css'
		}))
		.pipe(gulp.dest('public'));
});

gulp.task('watch', function () {
		// CSS
    watch('src/scss/main.scss', function() {
        gulp.start(['sass']);
    });
		// JS
    watch('src/coffee/**/*.coffee', function() {
        gulp.start(['coffee']);
    });
		// HTML
    watch('src/html/**/*.html', function() {
        gulp.start(['copy-html']);
    });
});

gulp.task('build', [
	'clean:public',
	'concat:libs',
	'copy:html',
	'coffee',
	'sprite',
	'sass',
	'copy:css'
]);

gulp.task('default', [
	'build',
	'webserver',
	'watch'
]);
