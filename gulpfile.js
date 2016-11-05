var gulp = require('gulp'),
    clean = require('gulp-clean'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    prefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    filter = require("gulp-filter"),
    concat = require("gulp-concat"),
    sourcemaps = require("gulp-sourcemaps"),
    imagemin = require("gulp-imagemin"),
    imageminPngquant = require('imagemin-pngquant'),
    imageminOptipng = require('imagemin-optipng'),
    imageminMozjpeg = require('imagemin-mozjpeg');

// Clean
gulp.task('clean', function() {
    return gulp.src(['dist/css', 'dist/js', 'dist/images'], {
            read: false
        })
        .pipe(clean());
});

// Task to compress images
gulp.task('images', function() {
    return gulp.src('src/images/**/*.{png,jpg}')
        .pipe(imagemin([
            imageminOptipng(),
            imageminMozjpeg({
                quality: 50,
            })
        ], {
            verbose: true,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))
        .pipe(gulp.dest('dist/images'));
});

// Task to compile SASS files
gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        })).on('error', sass.logError)
        .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))
        .pipe(sourcemaps.write('.', {
            sourceMappingURL: function(file) {
                return file.relative + '.map';
            }
        }))
        .pipe(gulp.dest('dist/css'));
});

// Task to run BrowserSync - localhost:3000
gulp.task('browser-sync', function() {
    browserSync.init(['dist/css/*.css', 'dist/js/**/*.js'], {
        server: {
            baseDir: "./"
        },
        port: 3010
            // proxy: {
            //     target: 'http://localhost:8888/'
            // }
    });

    gulp.watch('./**/*.html').on('change', browserSync.reload);
});

// Task to compess and source map js files
gulp.task('js', function() {
    var jsFilter = filter('**/*.js', {
        restore: true
    });
    return gulp.src(['src/js/**/*.js'])
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.', {
            sourceMappingURL: function(file) {
                return file.relative + '.map';
            }
        }))
        .pipe(jsFilter)
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(jsFilter.restore)
        .pipe(gulp.dest('dist/js'));
});


// Task to concatenate and uglify js files
gulp.task('js-combine', function() {
    return gulp.src(['src/js/**/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js'));
});


// Default Task
gulp.task('default', ['sass', 'browser-sync', 'js', 'images'], function() {
    gulp.watch(['src/js/**/*.js'], ['js']);
    gulp.watch(['src/scss/**/*.scss'], ['sass']);
    gulp.watch('src/images/**', ['images']);
});
