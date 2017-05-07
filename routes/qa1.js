var express = require('express');
var router = express.Router();
var path = require('path');
var q = require('q');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  var configfile = path.resolve(__dirname, '../protractor_conf/qa1/conf.js');
  console.log(configfile);
  var exec = require('child_process').exec;
  exec('protractor ' + configfile, function(err, stdout, stderr) {
    if (err) {
      console.log('Error Happen......');
    } else {
      console.log(stdout);
    }
    // console.log(err);
    // console.log(stderr);
    // console.log(stdout);
  });

  res.render('index', { title: 'Express' });

  
});

module.exports = router;
