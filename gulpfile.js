const gulp = require("gulp");
const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const del = require("del");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require('gulp-sourcemaps');

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

// PREFIXES

// gulp.task('addPrefixes', function(){
//   return gulp.src('./src/sass/**/*.scss')
//         .pipe(autoprefixer(
//           {
//             browsers: ['last 2 versions'],
//             cascade: false
//         }
//         ))
//         .pipe(gulp.dest('./dist/css'))
// });

gulp.task("copyHtml", function(){
  return gulp.src("src/*.html")
    .pipe(gulp.dest("dist"));
});

gulp.task("sassToCss", function(){
  return gulp.src("./src/sass/**/*.scss") //** - wszsytkie pliki z podfolderow sass z rozszerzenie .scss
    .pipe(sass({ outputStyle: "compact" })) //compressed
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(
      {
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write())
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
