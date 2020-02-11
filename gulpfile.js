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
    .src("./js/*.js") //input files fore gulp to minify
    .pipe(terser()) // calls the terser functrion on these files
    .pipe(rename({ extname: ".min.js" })) // rename minified file
    .pipe(gulp.dest("./build/js")) // creates a build folder and places min files in there
    .pipe(browserSync.stream()); // creates a link between your code changes and the browser
});

//This is for SASS, check your file-paths
gulp.task("sass", function() {
  return (
    gulp
      // locates scss files
      .src("./sass/style.scss")
      // converts sass files to css
      .pipe(sass())
      // adds prefixes for compatability
      .pipe(autoprefixer())
      // adds css to build dir
      .pipe(gulp.dest("./build/css"))
      //minifies our css
      .pipe(cssnano())
      //renames our css files
      .pipe(rename("style.min.css"))
      //adds our final output to build dir
      .pipe(gulp.dest("./build/css"))
      //syncs browser whenever a change is made and saved
      .pipe(browserSync.stream()) // This line should sync sass changes, but it's not working, ergo tghew line below
  );
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
  gulp.watch("./sass/*.scss").on("change", browserSync.reload); // This line shoud not be necessary
});

gulp.task("default", gulp.series("watch"));
