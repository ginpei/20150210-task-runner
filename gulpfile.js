var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var del = require('del');
var livereload = require('gulp-livereload');
var sass = require('gulp-ruby-sass');
var sprite = require('gulp.spritesmith');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');

gulp.task('clean-public', function() {
	return del('public');
});

gulp.task('coffee', function() {
	return gulp.src('src/coffee/**/*.coffee')
		.pipe(coffee())
		.pipe(concat('main.js'))
		.pipe(gulp.dest('public/js/'))
		.pipe(livereload());
});

gulp.task('copy-html', function() {
	return gulp.src('src/html/**/*.html')
		.pipe(gulp.dest('public'))
		.pipe(livereload());
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
		.pipe(gulp.dest('public/css'))
		.pipe(livereload());
});

gulp.task('sprite1', function() {
	return gulp.src('src/img/**/*.png')
		.pipe(sprite({
			imgName:'img/sprite1.png',
			cssName:'css/sprite1.css'
		}))
		.pipe(gulp.dest('public'));
});

gulp.task('watch', function () {
	livereload.listen();
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

gulp.task('webserver', function() {
	return gulp.src('public')
		.pipe(webserver({
			host: '0.0.0.0',
			port: 3000
		}));
});

gulp.task('build', [
	'clean-public',
	'jslibs',
	'csslibs',
	'copy-html',
	'coffee',
	'sprite1',
	'sass'
]);

gulp.task('default', [
	'build',
	'webserver',
	'watch'
]);
