'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    notify = require('gulp-notify'),
    del = require('del'),
    cleanCss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    runSequence = require('run-sequence'),
    concat = require('gulp-concat');

var config = {
    jsPath: './resources/assets/js',
    lessPath: './resources/assets/less',
    nodePath: './node_modules',
    tempPath: './temp_dir',
    public: {
        fontPath: './public/fonts',
        cssPath: './public/css',
        jsPath: './public/js'
    }
};

var cssFiles = [
    '/bootstrap/dist/css/bootstrap.min.css',
    '/datatables-bootstrap3-plugin/media/css/datatables-bootstrap3.min.css',
    '/font-awesome/css/font-awesome.min.css',
    '/bootstrap-social/bootstrap-social.css',
    '/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
    '/dropify/dist/css/dropify.min.css'
];
cssFiles = cssFiles.map(function (el) {
    return config.nodePath + el;
});

var javaScripts = [
    '/jquery/dist/jquery.min.js',
    '/bootstrap/dist/js/bootstrap.min.js',
    '/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js',
    '/datatables/media/js/jquery.dataTables.min.js',
    '/datatables-bootstrap3-plugin/media/js/datatables-bootstrap3.min.js',
    '/social-share-js/dist/jquery.socialshare.min.js',
    '/dropify/dist/js/dropify.min.js'
];
javaScripts = javaScripts.map(function (el) {
    return config.nodePath + el;
});


gulp.task('build-fonts', function () {
    return gulp.src([
        config.nodePath + '/font-awesome/fonts/**.*',
        config.nodePath + '/bootstrap/fonts/**.*',
        config.nodePath + '/dropify/dist/fonts/**.*'
    ])
        .on('error', notify.onError(function (error) {
                return 'Error: ' + error.message;
            })
        )
        .pipe(gulp.dest(config.public.fontPath));
});

gulp.task('vendor-js', function () {
    return gulp.src(javaScripts)
        .on('error', notify.onError(function (error) {
                return 'Error: ' + error.message;
            })
        )
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(config.tempPath));
});

gulp.task('app-js', function () {
    return gulp.src(config.jsPath + '/**/*.js')
        .on('error', notify.onError(function (error) {
                return 'Error: ' + error.message;
            })
        )
        .pipe(concat('app-specific.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.tempPath));
});

gulp.task('merge-scripts', function () {
    return gulp.src([
        config.tempPath + '/vendor.min.js',
        config.tempPath + '/app-specific.min.js'
    ]) //To make sure they are set in order we give paths, so not wildcards
        .pipe(concat('app.min.js'))
        .on('error', notify.onError(function (error) {
                return 'Error: ' + error.message;
            })
        )
        .pipe(gulp.dest(config.public.jsPath));
});

gulp.task('build-scripts', function () {
    return runSequence('vendor-js', 'app-js', 'merge-scripts');
});

gulp.task('vendor-css', function () {
    return gulp.src(cssFiles)
        .on('error', notify.onError(function (error) {
                return 'Error: ' + error.message;
            })
        )
        .pipe(concat('vendor.min.css'))
        .pipe(cleanCss({compatibility: 'ie8'})) //because bootstrap-tagsinput css is not minified
        .pipe(gulp.dest(config.tempPath));
});

gulp.task('app-css', function () {
    return gulp.src(config.lessPath + '/**/*.less')
        .on('error', notify.onError(function (error) {
                return 'Error: ' + error.message;
            })
        )
        .pipe(less({
            strictMath: true,
            compress: false,
            yuicompress: false,
            optimization: 0
        }))
        .pipe(concat('app-specific.min.css'))
        .pipe(cleanCss({
            advanced: false,
            compatibility: 'ie8',
            keepSpecialComments: 0,
            processImport: false,
            shorthandCompacting: true
        }))
        .pipe(gulp.dest(config.tempPath));
});

gulp.task('merge-css', function () {
    return gulp.src([config.tempPath + '/vendor.min.css', config.tempPath + '/app-specific.min.css'])
        .on('error', notify.onError(function (error) {
                return 'Error: ' + error.message;
            })
        )
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(config.public.cssPath));
});

gulp.task('build-css', function () {
    return runSequence('vendor-css', 'app-css', 'merge-css');
});

gulp.task('watch', function () {
    gulp.watch(config.lessPath + '/**/*.less', ['build-css']);
    gulp.watch(config.jsPath + '/**/*.js', ['build-scripts']);
});

gulp.task('clean', function (cb) {
    del([
            config.public.cssPath + '/*', config.public.jsPath + '/*',
            config.public.fontPath + '/*', config.tempPath + '/'
        ], cb
    );
});

gulp.task('default', function () {
    return runSequence(['clean', 'build-fonts', 'build-css', 'build-scripts']);
});