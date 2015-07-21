'use strict';

var tmg = require('./');
var assert = require('assert');
var timer = tmg();
var sec = timer.toObject().s;

describe('tmg()', function() {
  it('should be a timer', function(done) {
    setTimeout(function() {
      assert(timer.toObject().s > sec);
      done();
    }, 1000);
  });
});

describe('.format(str)', function() {
  it('should set format string', function() {
    timer.format('hh:mm:ss');
    assert(timer._format === 'hh:mm:ss');
  });
});

describe('.start(fn)', function() {
  it('should set timer interval', function(done) {
    var seconds = 0;

    tmg().start(function(t) {
      seconds = t.toObject().s;
      if (seconds === 1) t.end();
    });

    setTimeout(function() {
      assert(seconds === 1);
      done();
    }, 1500);
  });
});

describe('.end()', function() {
  it('should clear timer interval', function(done) {
    this.timeout(3000);
    var seconds = 0;

    tmg().start(function(t) {
      seconds = t.toObject().s;
      if (seconds === 1) t.end();
    });

    setTimeout(function() {
      assert(seconds === 1);
      done();
    }, 2500);
  });
});

describe('.toObject()', function() {
  it('should return object', function() {
    var obj = timer.toObject();
    assert(typeof obj === 'object');
    assert('h' in obj);
    assert('m' in obj);
    assert('s' in obj);
  });
});

describe('.toArray()', function() {
  it('should return array', function() {
    var arr = timer.toArray();
    assert(typeof arr === 'object');
    assert(arr.length === 3);
  });
});

describe('.toString()', function() {
  it('should return string', function() {
    var str = timer.toString();
    assert(typeof str === 'string');
    assert(/^\d{2}:\d{2}:\d{2}$/.test(str));
  });

  it('should return string with escaped', function() {
    var str = timer.toString('s [seconds]');
    assert(typeof str === 'string');
    assert(/^\d\sseconds$/.test(str));
  });
});
