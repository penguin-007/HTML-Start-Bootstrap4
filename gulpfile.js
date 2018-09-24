(function() {

  'use strict'

	var gulp         	= require('gulp'),
		autoprefixer 	= require('gulp-autoprefixer'),
		notify 		 	= require("gulp-notify"),
		cssmin 		 	= require('gulp-cssmin'),
		rename 		 	= require('gulp-rename'),
		gcmq 		 	= require('gulp-group-css-media-queries'),
		sass         	= require('gulp-sass'),
		sourceMap 	 	= require('gulp-sourcemaps'),
		browserSync  	= require('browser-sync'),
        reload 			= browserSync.reload,
		cleanCSS     	= require('gulp-clean-css'),
		rigger       	= require('gulp-rigger'),
		uglify 		 	= require('gulp-uglify'),
		imagemin     	= require('gulp-imagemin'),
		pngquant        = require('imagemin-pngquant'),
        watch 			= require('gulp-watch'),
        rimraf          = require('rimraf'),
        plumber         = require('gulp-plumber'),
        gutil           = require('gulp-util');


    var path = {
        build: { //Тут мы укажем куда складывать готовые после сборки файлы
            html: 'build/',
            js: 'build/js/',
            css: 'build/css/',
            img: 'build/img/',
            fonts: 'build/fonts/',
            libs: 'build/libs/'
        },
        src: { //Пути откуда брать исходники
            html: 'app/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
            js: 'app/js/common.js',//В стилях и скриптах нам понадобятся только main файлы
            style: 'app/sass/style.sass',
            img: 'app/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
            fonts: 'app/fonts/**/*.*',
            libs: 'app/libs/**/*.*'
        },
        watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
            html: 'app/**/*.html',
            js: 'app/js/**/*.js',
            style: 'app/sass/**/*.sass',
            img: 'app/img/**/*.*',
            fonts: 'app/fonts/**/*.*'
        },
        clean: './build'
    };

    var config = {
        server: {
            baseDir: "./build"
        },
        tunnel: true,
        host: 'localhost',
        port: 9000,
        logPrefix: "Frontend"
    };

    gulp.task('html:build', function () {
        gulp.src(path.src.html) //Выберем файлы по нужному пути
            /*.pipe(plumber())*/
            .pipe(rigger().on('error', gutil.log)) //Прогоним через rigger
            .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
            .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
    });

    gulp.task('js:build', function () {
        gulp.src(path.src.js) //Найдем наш main файл
            /*.pipe(rigger()) //Прогоним через rigger*!/
            .pipe(sourceMap.init()) //Инициализируем sourcemap
            .pipe(uglify()) //Сожмем наш js
            .pipe(sourceMap.write()) //Пропишем карты*/
            .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
            .pipe(reload({stream: true})); //И перезагрузим сервер
    });

    gulp.task('style:build', function () {
        gulp.src(path.src.style) //Выберем наш main.scss
            .pipe(sourceMap.init()) //То же самое что и с js
            .pipe(sass({
                outputStyle: 'compact'
            })) //Скомпилируем
            .on('error', notify.onError({
                title: 'Error compiling Sass',
                message: 'Check the console for info'
            }))
            .on('error', sass.logError)
            .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) //Добавим вендорные префиксы
            .pipe(gcmq())
            .pipe(cleanCSS({format: 'keep-breaks'})) //Сожмем
            .pipe(sourceMap.write())
            .pipe(gulp.dest(path.build.css)) //И в build
            .pipe(reload({stream: true}));
    });

    gulp.task('image:build', function () {
        gulp.src(path.src.img) //Выберем наши картинки
            .pipe(imagemin({ //Сожмем их
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()],
                interlaced: true
            }))
            .pipe(gulp.dest(path.build.img)) //И бросим в build
            .pipe(reload({stream: true}));
    });

    gulp.task('fonts:build', function() {
        gulp.src(path.src.fonts)
            .pipe(gulp.dest(path.build.fonts))
    });

    gulp.task('libs:build', function() {
        gulp.src(path.src.libs)
            .pipe(gulp.dest(path.build.libs))
    });

    gulp.task('build', [
        'html:build',
        'js:build',
        'style:build',
        'fonts:build',
        'image:build',
        'libs:build'
    ]);

    gulp.task('webserver', function () {
        browserSync(config);
    });

	/* смотрители */
    gulp.task('watch', function(){
        watch([path.watch.html], function(event, cb) {
            gulp.start('html:build');
        });
        watch([path.watch.style], function(event, cb) {
            gulp.start('style:build');
        });
        watch([path.watch.js], function(event, cb) {
            gulp.start('js:build');
        });
        watch([path.watch.img], function(event, cb) {
            gulp.start('image:build');
        });
        watch([path.watch.fonts], function(event, cb) {
            gulp.start('fonts:build');
        });
    });
    /* end смотрители */

    gulp.task('clean', function (cb) {
        rimraf(path.clean, cb);
    });

    gulp.task('default', ['build', 'webserver', 'watch']);

})();