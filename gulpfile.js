(function() {

  'use strict'


	var gulp         = require('gulp'),
		autoprefixer = require('gulp-autoprefixer'),
		notify 		 = require("gulp-notify"),
		cssmin 		 = require('gulp-cssmin'),
		rename 		 = require('gulp-rename'),
		gcmq 		 = require('gulp-group-css-media-queries'),
		sass         = require('gulp-sass'),
	    sourceMap 	 = require('gulp-sourcemaps'),
		browserSync  = require('browser-sync').create(),
		rigger       = require('gulp-rigger');
	   
	   
	gulp.task('browser-sync', function() {
		browserSync.init({
			server: {
				baseDir: "./app"
			},
			notify: false
		});
	});

	//npm i -D gulp-rigger

	gulp.task('rigger_js', function () {
		'use strict';
		gulp.src('app/pre_js/common.js')
			.pipe(rigger())
			.pipe(gulp.dest('app/js/'));
			//.pipe(reload({stream: true}))
	});

	gulp.task('sass', function() {
		return gulp.src('app/sass/*.sass')
		  .pipe(sourceMap.init())
		  .pipe(sass({
		    outputStyle: 'compact'
		  }))
		  .on('error', notify.onError({
		    title: 'Error compiling Sass',
		    message: 'Check the console for info'
		  }))
		  .on('error', sass.logError)
		  .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		  .pipe(gcmq())
		  .pipe(sourceMap.write('.'))
		  .pipe(gulp.dest('app/css'));
		  /*.pipe(cssmin())
		  .pipe(rename({suffix: '.min'}))
		  .pipe(gulp.dest('app/css'));*/
	});


	/* смотрители */
	gulp.task('bsync:watch', ['browser-sync'], function () {
		gulp.watch('app/sass/*.sass', ['sass'] );
		gulp.watch('app/pre_js/*.js', ['rigger_js'] );
		gulp.watch('app/css/*.css').on("change", browserSync.reload);
		gulp.watch('app/js/*.js').on("change", browserSync.reload);
		gulp.watch('app/*.html').on('change', browserSync.reload);
	});

	gulp.task('sass:watch', function () {
		gulp.watch('app/sass/*.sass', ['sass'] );
	});

	gulp.task('js:watch', function () {
		gulp.watch('app/pre_js/*.js', ['rigger_js'] );
	});
	/* end смотрители */
	 
	 
	gulp.task('default', function() {
		console.log("Приятной работы!");
		gulp.watch('app/sass/*.sass', ['sass'] );
		gulp.watch('app/pre_js/*.js', ['rigger_js'] );
	});

})();