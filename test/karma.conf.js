// Karma configuration
// Generated on Mon Nov 23 2015 14:09:27 GMT-0700 (MST)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath   : '',

        // frameworks to use
        frameworks : ['mocha', 'chai'],

        // list of files / patterns to load in the browser
        files: [

            // *** external libraries *** //
            'https://code.jquery.com/jquery-2.1.4.min.js',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js',
            'http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular-route.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular-mocks.js',

            // *** Source *** //
            // '../src/**/*.js',
            // '../src/client/angular-routes.js',
            '../src/client/app.module.js',
            '../src/client/app/components/test-directive/test-directive.module.js',
            '../src/client/app/components/test-directive/test-directive.js',

            // *** Tests *** //
            '../test/client/client.spec.js',

            // *** Partials *** //
            // '../src/client/app/partials/home.html',
            // '*.html.ext',
            '../src/client/**/*.html'
        ],

        preprocessors: {
            '../src/clent/**/*.html': 'ng-html2js'
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/client/',
            moduleName : 'dir-templates'
        },

        // test results reporter to use
        reporters   : ['progress'],

        // web server port
        port        : 8192,

        // enable / disable colors in the output (reporters and logs)
        colors      : true,

        // level of logging
        logLevel    : config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch   : false,

        // start these browsers
        browsers    : ['Chrome'],

        // Continuous Integration mode
        singleRun   : false,

        // Concurrency level
        // how many browser should be started simultanous
        concurrency : Infinity,

        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-ng-html2js-preprocessor',
            'karma-chrome-launcher',
        ]
    })
}
