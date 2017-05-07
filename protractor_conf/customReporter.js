var ioClient = require('socket.io-client');

function CustomReporter(opt) {
    var socket = ioClient.connect('http://localhost:4000');

    this.jasmineStarted = function(suiteInfo) {
        console.log('R: Runnning suite with ' + suiteInfo.totalSpecsDefined);
        socket.emit('event', suiteInfo);
    };

    this.suiteStarted = function(result) {
        console.log('R: Suite started: ' + result.description + ' whose full description is: ' + result.fullName);
    };

    this.specStarted = function(result) {
        console.log('R: Spec started: ' + result.description + ' whose full description is: ' + result.fullName);
    };

    this.specDone = function(result) {
        console.log('R: Spec: ' + result.description + ' was ' + result.status);
        for(var i = 0; i < result.failedExpectations.length; i++) {
            console.log('R: Failure: ' + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }
        console.log(result.passedExpectations.length);
        socket.emit('event', result);
    };

    this.suiteDone = function(result) {
        console.log('R: Suite: ' + result.description + ' was ' + result.status);
        for(var i = 0; i < result.failedExpectations.length; i++) {
            console.log('R: AfterAll ' + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }
        // socket.emit('event', result);
    };

    this.jasmineDone = function(result) {
        console.log('R: Finished suite' + result);
         socket.emit('event', result);
    }
}

module.exports = CustomReporter;