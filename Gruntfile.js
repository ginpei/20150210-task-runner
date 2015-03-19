module.exports = function(grunt) {
	grunt.initConfig({
		// ファイル削除
		clean: {
			public: 'public',
			tmp: 'tmp'
		},

		// CoffeeScript
		coffee: {
			main: {
				files: {
					'public/js/main.js': ['src/coffee/**/*.coffee']
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

		// Sass
		sass: {
			main: {
				options: {
					style: 'compressed'
				},
				files: {
					'public/css/main.css': 'src/scss/main.scss'
				}
			}
		},

		// 画像のスプライト化
		sprite: {
			img1: {
				src: 'src/img/sprite1/**/*.png',
				dest: 'public/img/sprite1.png',
				destCss: 'tmp/css/sprite1.css',
				imgPath: '../img/sprite1.png'
			}
		},

		// ファイル監視
		watch: {
			css: {
				files: 'src/scss/**/*.scss',
				tasks: ['sass'],
				options: {
					livereload: true
				}
			},
			js: {
				files: 'src/coffee/**/*.coffee',
				tasks: ['coffee'],
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

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-spritesmith');

	grunt.registerTask('build', [
		'clean:public',
		'concat:libs',
		'copy:html',
		'coffee',
		'sprite',
		'sass',
		'copy:css'
	]);

	grunt.registerTask('default', [
		'build',
		'connect',
		'watch'
	]);
};
