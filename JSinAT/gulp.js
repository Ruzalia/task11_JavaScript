/**
 * Created by Ruzaliia_Yakunina on 12/24/2016.
 */
const gulp = require('gulp'),
    jasmine = require('gulp-jasmine'),
    protractor = require("gulp-protractor").protractor,
    del = require('del');

gulp.task('test', () =>
gulp.src('./src/test/lego/LegoShopTest.js')
    .pipe(protractor({
        configFile: "./conf.js"
    }))
);

gulp.task("clean", () => {
    del("allure-report");
return del("allure-results");
});