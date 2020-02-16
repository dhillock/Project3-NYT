// Not that this file does not bring over the fonts, the index.html, and perhaps other items,
// that will be required for deploying

const gulp = require("gulp");

const terser = require("gulp-terser"),
  rename = require("gulp-rename"),
  sass = require("gulp-sass"),
  cssnano = require("gulp-cssnano"),
  autoprefixer = require("gulp-autoprefixer"),
  browserSync = require("browser-sync");

gulp.task("scripts", function(done) {
  return gulp
    .src("./js/*.js") ////////////////////// Input files for gulp to minify
    .pipe(terser()) //////////////////////// Calls the terser function on these files
    .pipe(rename({ extname: ".min.js" })) // Rename minified file
    .pipe(gulp.dest("./build/js")) ///////// Creates a build folder and places min files in there
    .pipe(browserSync.stream()); /////////// Creates a link between your code changes and the browser
});

//This is for SASS, check your file-paths
gulp.task("sass", function() {
  return gulp
    .src("./sass/style.scss") ///////////// Locate scss files
    .pipe(sass()) ///////////////////////// Convert sass files to css files
    .pipe(autoprefixer()) ///////////////// Adds prefixes for compatability
    .pipe(gulp.dest("./build/css")) /////// Adds css to build directory
    .pipe(cssnano()) ////////////////////// Minifies our css file
    .pipe(rename("style.min.css")) //////// Renames our css file
    .pipe(gulp.dest("./build/css")) /////// Adds our final output to the build directory
    .pipe(browserSync.stream()); ////////// Sync browser whenever a change is made and saved
});

gulp.task("watch", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("./js/*.js", gulp.series(["scripts"]));
  gulp.watch("./sass/*.scss", gulp.series(["sass"]));
  gulp.watch("./*.html").on("change", browserSync.reload);
  // gulp.watch("./sass/*.scss").on("change", browserSync.reload); // Fix: This line shoud not be necessary...Update: This is working now.
});

gulp.task("default", gulp.series("watch")); // If Gulp is run without a parameter
