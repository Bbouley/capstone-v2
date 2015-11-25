##Basic Angular Boilerplate

This is a basic MEAN boilerplate set up to include Karma as a test runner and using Mocha and Chai. Currently set up to test directives as well as server side code. Can be used to test out controllers and services.

1. clone down repo
2. cd into project directory and run ```npm install```
3. You can now run ```gulp unit``` from your command line and it should show 3 of 3 passed. This command runs all the spec files in test/client/
4. You can run ```npm test``` to run all spec files in test/server/.

When adding new directives or controllers, the path to these files have to be included in the karma.conf file. Th
