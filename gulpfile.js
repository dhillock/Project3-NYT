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
    .pipe(gulp.dest("./build/js")) // creates a build folder and places min files in trhere
    .pipe(browserSync.stream());
});

//This is for SASS, check your file-paths
gulp.task("sass", function() {
  return (
    gulp
      // locates scss files
      .src("./css/style.scss")
      // convedrrds sass to css
      .pipe(sass())
      // adds pcrefixes for compatability
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
      .pipe(browserSync.stream())
  );
});

gulp.task("watch", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("js/*.js", gulp.series(["scripts"]));
  gulp.watch("./html").on("change", browserSync.reload);
});

gulp.task("default", gulp.series("watch"));
