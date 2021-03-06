var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var del = require('del');
var livereload = require('gulp-livereload');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var sprite = require('gulp.spritesmith');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');

// ファイル削除
gulp.task('clean', function() {
	del('public');
	del('tmp');
});

// CSS
// ※エラーが発生した場合、package.jsonのバージョンを確認。（最新版だと駄目。）
// ✔ "gulp-ruby-sass": "~0.7.1",
// ✘ "gulp-ruby-sass": "~1.0.0-alpha.3",
// ✔ "gulp-autoprefixer": "~1.0.1"
// ✘ "gulp-autoprefixer": "~2.0.0"
// インストール時にバージョンを指定する。
// $ npm install -S gulp-ruby-sass@0.7.1 gulp-autoprefixer@1.0.1
gulp.task('css', function() {
	return gulp.src('src/scss/main.scss')
		.pipe(sass())
		.pipe(autoprefixer())  // 1系はsource mapに未対応、2系はsassと組み合わせでエラー
		.pipe(cssmin())
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
		.pipe(sourcemaps.init())
		.pipe(coffee())
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
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
