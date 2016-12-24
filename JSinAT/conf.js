/**
 * Created by Ruzaliia_Yakunina on 12/24/2016.
 */
exports.config = {
    capabilities: { 'browserName': 'chrome' },
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./src/test/lego/LegoShopTest.js'],

    framework: 'jasmine2',
    onPrepare: function () {
        var AllureReporter = require('jasmine-allure-reporter');
        jasmine.getEnv().addReporter(
            new AllureReporter({
                allureReport : {
                    resultsDir : 'allure-results'
                }
            })
        );

        jasmine.getEnv().afterEach(function(done) {
            browser.takeScreenshot().then(function(png) {
                allure.createAttachment('Screenshot', function() {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
                done();
            })
        });
    }

};