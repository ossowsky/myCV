const gulp = require("gulp");

/*
--- TOP LEVEL FUNCTIONS ---
  gulp.task - Define tasks
  gulp.src - Point to file to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for change
*/

gulp.task("message", async function(){
  return console.log("Gulp is running...");
});