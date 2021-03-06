module.exports = function(grunt) {
	grunt.initConfig({
		// ベンダー接頭辞追加
		// （ファイルは最終的にcopy:cssで移動。）
		autoprefixer: {
			main: {
				src: 'tmp/css/main.css',
				dest: 'tmp/css/main.css'
			},
			options: {
				map: true
			}
		},

		// ファイル削除
		clean: {
			public: 'public',
			tmp: 'tmp'
		},

		// CoffeeScript
		coffee: {
			main: {
				files: {
					'tmp/js/main.js': ['src/coffee/**/*.coffee']
				},
				options: {
					sourceMap: true
				}
			}
		},

		// ファイル結合
		concat: {
			libs: {
				files: {
					'public/css/libs.css': [
						'bower_components/bootstrap/dist/css/bootstrap.min.css'
					],
					'public/js/libs.js': [
						'bower_components/jquery/dist/jquery.min.js',
						'bower_components/bootstrap/dist/js/bootstrap.min.js'
					]
				}
			}
		},

		// 簡易サーバー
		connect: {
			main: {
				options: {
					base: 'public',
					port: 3000
				}
			}
		},

		// ファイル複製
		copy: {
			css: {
				files: [
					{
						expand: true,
						cwd: 'tmp/css',
						src: '**/*.css',
						dest: 'public/css'
					},
					{  // source map
						expand: true,
						cwd: 'tmp/css',
						src: '**/*.css.map',
						dest: 'public/css'
					},
					{  // source mapから参照する元ファイル
						expand: true,
						src: 'src/scss/**/*.scss',
						dest: 'public/css'
					}
				]
			},
			js: {
				files: [
					{
						expand: true,
						cwd: 'tmp/js',
						src: '**/*.js',
						dest: 'public/js'
					},
					{  // source map
						expand: true,
						cwd: 'tmp/js',
						src: '**/*.js.map',
						dest: 'public/js'
					},
					{  // source mapから参照する元ファイル
						expand: true,
						cwd: 'tmp/js',
						src: '**/*.coffee',
						dest: 'public/js'
					}
				]
			},
			html: {
				files: [
					{
						expand: true,
						cwd: 'src/html',
						src: '**/*.html',
						dest: 'public'
					}
				]
			}
		},

		// CSS min
		cssmin: {
			main: {
				files: {
					'tmp/css/main.css': 'tmp/css/main.css'
				},
				options: {
					sourceMap: true
				}
			}
		},

		// Sass
		// （ファイルは最終的にcopy:cssで移動。）
		sass: {
			main: {
				options: {
					sourcemap: 'inline'
					// CSS minの代わりにこの指定↓でもOK
					// style: 'compressed'
				},
				files: {
					'tmp/css/main.css': 'src/scss/main.scss'
				}
			}
		},

		// 画像のスプライト化
		// （CSSファイルは最終的にcopy:cssで移動。）
		sprite: {
			img1: {
				src: 'src/img/sprite1/**/*.png',
				dest: 'public/img/sprite1.png',
				destCss: 'tmp/css/sprite1.css',
				imgPath: '../img/sprite1.png'
			}
		},

		// JS min
		// （UglifyJSという名前のツールでJSを縮小する。）
		uglify: {
			main: {
				files: {
					'tmp/js/main.js': 'tmp/js/main.js'
				},
				options: {
					sourceMap: true,
					sourceMapIncludeSources: true,
					sourceMapIn: 'tmp/js/main.js.map'
				}
			}
		},

		// ファイル監視
		// （ちなみに……実行タスクをregisterTaskでそれぞれまとめておくと、
		//   こことdefaultタスクと両方を更新する必要がなくなるので便利。）
		watch: {
			css: {
				files: 'src/scss/**/*.scss',
				tasks: [
					'sprite',
					'sass',
					'autoprefixer',
					'cssmin',
					'copy:css'
				],
				options: {
					livereload: true
				}
			},
			js: {
				files: 'src/coffee/**/*.coffee',
				tasks: [
					'coffee',
					'uglify',
					'copy:js'
				],
				options: {
					livereload: true
				}
			},
			html: {
				files: 'src/html/**/*.html',
				tasks: ['copy:html'],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-spritesmith');

	grunt.registerTask('default', [
		// 初期化
		'clean:public',
		'clean:tmp',
		'concat:libs',
		// HTML
		'copy:html',
		// JS
		'coffee',
		'uglify',
		'copy:js',
		// CSS
		'sprite',
		'sass',
		'autoprefixer',
		'cssmin',
		'copy:css',
		// 簡易サーバー起動
		'connect',
		// ファイル監視開始
		'watch'
	]);
};
