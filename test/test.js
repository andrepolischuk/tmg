
var tmg = require('..');
var assert = require('assert');

describe('tmg', function() {
  it('should return function', function() {
    assert(typeof tmg === 'function');
  });
});

var timer = tmg().format('m:s');
var sec = timer.obj().s;

describe('tmg()', function() {
  it('should be a timer', function(done) {
    setTimeout(function() {
      assert(timer.obj().s > sec);
      done();
    }, 1000);
  });
});

describe('Timer#format(str)', function() {
  it('should set format string', function() {
    timer.format('h:m:s');
    assert(timer._format === 'h:m:s');
  });
});

describe('Timer#obj()', function() {
  it('should return object', function() {
    var obj = timer.obj();
    assert(typeof obj === 'object');
    assert('h' in obj);
    assert('m' in obj);
    assert('s' in obj);
  });
});

describe('Timer#arr()', function() {
  it('should return array', function() {
    var arr = timer.arr();
    assert(typeof arr === 'object');
    assert(arr.length === 3);
  });
});

describe('Timer#str()', function() {
  it('should return string', function() {
    var str = timer.str();
    assert(typeof str === 'string');
    assert(/^\d{2}:\d{2}:\d{2}$/.test(str));
  });
});
