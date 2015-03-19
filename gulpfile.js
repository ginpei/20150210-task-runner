var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var del = require('del');
var livereload = require('gulp-livereload');
var sass = require('gulp-ruby-sass');
var sprite = require('gulp.spritesmith');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');

// ファイル削除
gulp.task('clean', function() {
	del('public');
	del('tmp');
});

// CSS
// ※エラーが発生した場合、package.jsonで
// gulp-ruby-sassのバージョンがalphaでない事を確認。
// ✔ "gulp-ruby-sass": "^0.7.1",
// ✘ "gulp-ruby-sass": "^1.0.0-alpha.3",
// （書籍本文を参照。）
gulp.task('css', function() {
	return gulp.src('src/scss/main.scss')
		.pipe(sass({ style:'compressed' }))
		.pipe(gulp.dest('public/css'))
		.pipe(livereload());
});

// CSSライブラリー
// （watchからの実行タスクから分ける。）
gulp.task('csslibs', function() {
	return gulp.src([
		'bower_components/bootstrap/dist/css/bootstrap.min.css'
	])
		.pipe(concat('libs.css'))
		.pipe(gulp.dest('public/css/'))
});

// HTML
gulp.task('html', function() {
	return gulp.src('src/html/**/*.html')
		.pipe(gulp.dest('public'))
		.pipe(livereload());
});

// JS
gulp.task('js', function() {
	return gulp.src('src/coffee/**/*.coffee')
		.pipe(coffee())
		.pipe(concat('main.js'))
		.pipe(gulp.dest('public/js/'))
		.pipe(livereload());
});

// JSライブラリー
// （watchからの実行タスクから分ける。）
gulp.task('jslibs', function() {
	return gulp.src([
		'bower_components/jquery/dist/jquery.min.js',
		'bower_components/bootstrap/dist/js/bootstrap.min.js'
	])
		.pipe(concat('libs.js'))
		.pipe(gulp.dest('public/js/'))
});

// CSSスプライト
gulp.task('sprite1', function() {
	return gulp.src('src/img/**/*.png')
		.pipe(sprite({
			imgName:'img/sprite1.png',
			cssName:'css/sprite1.css'
		}))
		.pipe(gulp.dest('public'));
});

// ファイル監視
gulp.task('watch', function () {
	// ブラウザー自動更新の準備
	livereload.listen();

	// CSS
	watch('src/scss/main.scss', function() {
			gulp.start(['css']);
	});
	// JS
	watch('src/coffee/**/*.coffee', function() {
			gulp.start(['js']);
	});
	// HTML
	watch('src/html/**/*.html', function() {
			gulp.start(['html']);
	});
});

// 簡易サーバー
// （起動前に諸々のファイル生成を完了させておく。）
gulp.task('webserver', [
	'css',
	'csslibs',
	'html',
	'js',
	'jslibs',
	'sprite1'
], function() {
	return gulp.src('public')
		.pipe(webserver({
			host: '0.0.0.0',
			port: 3000
		}));
});

// デフォルトタスク
// （cleanは含めていないので、必要な場合は
//   `gulp clean; gulp`
//   のように別途実行後にデフォルトタスクを実行する。）
gulp.task('default', [
	'watch',
	'webserver'
]);
