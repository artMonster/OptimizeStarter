var syntax        		= 'sass', // Syntax: sass or scss;
	gulpversion   		= '4'; // Gulp version: 3 or 4

	var gulp          	= require('gulp'),
		gutil         	= require('gulp-util' ),
		sass          	= require('gulp-sass'),
		webp 			= require('gulp-webp'),
		browserSync   	= require('browser-sync'),
		concat        	= require('gulp-concat'),
		uglify        	= require('gulp-uglify'),
		cleancss      	= require('gulp-clean-css'),
		rename        	= require('gulp-rename'),
		del            	= require('del'),
		cache          	= require('gulp-cache'),
		autoprefixer  		= require('gulp-autoprefixer'),
		notify        		= require('gulp-notify'),
		imagemin      		= require('imagemin'),
		imageminWebp 		= require('imagemin-webp'),
		responsive 			= require('gulp-responsive'),
		imageminJpegtran 	= require('imagemin-jpegtran'),
		imageminJpegoptim 	= require('imagemin-jpegoptim'),
		imageminPngquant 	= require('imagemin-pngquant'),
		fileinclude    		= require('gulp-file-include'),
		gulpRemoveHtml 		= require('gulp-remove-html'),
		bourbon       		= require('node-bourbon'),
		ftp           		= require('vinyl-ftp'),
		gulpIf 				= require('gulp-if'),
		rsync         		= require('gulp-rsync');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		notify: false,
	})
});

gulp.task('headersass', function() {
	return gulp.src('app/header.sass')
		.pipe(sass({
			includePaths: bourbon.includePaths
		}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
		.pipe(gulp.dest('app/'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('buildhtmlwatch', function() {
	return gulp.src('app/*.html')
	    .pipe(fileinclude({
	      prefix: '@@'
	    }))
	    .pipe(gulpRemoveHtml())
	    .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));
});

gulp.task('imagen', function() {
	return gulp.src('app/img/**/*')
	.pipe(gulp.dest('dist/img'));
});


gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.stream())
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/lazysizes.min.js',
		'app/libs/bootstrap/popper.min.js',
		'app/libs/bootstrap/bootstrap.min.js',
		'app/libs/magnific-popup/jquery.magnific-popup.min.js',
		'app/libs/intlTelInput/intlTelInput.js',
		'app/libs/YTPlayer/jquery.mb.YTPlayer.min.js',
		'app/js/common.js',
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function() {
	return gulp.src('app/*.*')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('buildhtmlwatch', function() {
	return gulp.src('app/*.html')
	    .pipe(fileinclude({
	      prefix: '@@'
	    }))
	    .pipe(gulpRemoveHtml())
	    .pipe(gulp.dest('dist'));
});

gulp.task('webpImages', function () {
	(async () => {
		const webp = await imagemin(['app/img/*.{jpg,png}'], 'app/img', {
			use: [
				imageminWebp({quality: 70})
			]
		});
	})();
});

gulp.task('watch', function() {
	gulp.watch('app/header.sass', gulp.parallel('headersass'));
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
	gulp.watch('app/*.*', gulp.parallel('code'));
	gulp.watch('app/*.*', gulp.parallel('buildhtmlwatch'));
	//gulp.watch('app/img/**/*', gulp.parallel('imagesminWebp'));
});



gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', gulp.parallel('clearcache', 'webpImages', 'imagen', 'fonts', 'styles', 'scripts', 'browser-sync', 'watch'));

