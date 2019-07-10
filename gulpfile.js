const gulp = require("gulp");
const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const del = require("del");

/*
--- TOP LEVEL FUNCTIONS ---
  gulp.task - Define tasks
  gulp.src - Point to file to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for change
*/

// gulp.task("message", async function(){
//   return console.log("Gulp is running...");
// });

gulp.task("copyHtml", function(){
  return gulp.src("src/*.html")
    .pipe(gulp.dest("dist"));
});

gulp.task("sassToCss", function(){
  return gulp.src("./src/sass/**/*.scss") //** - wszsytkie pliki z podfolderow sass z rozszerzenie .scss
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("optimizeImages", function(){
  return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
})

gulp.task("cleanDistDir", function(){
  return del("./dist/**");
})

gulp.task("build", gulp.series("cleanDistDir", gulp.parallel("copyHtml", "sassToCss", "optimizeImages")));

gulp.task("watch", function(){
  gulp.watch("src/images/*", gulp.series("optimizeImages"));
  gulp.watch("./src/sass/**/*.scss", gulp.series("sassToCss"));
  gulp.watch("src/*.html", gulp.series("copyHtml"));
  //gulp.watch("./dist/**", gulp.series("cleanDistDir"));
});
