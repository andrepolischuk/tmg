'use strict';

var tmg = require('./');
var assert = require('assert');
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

describe('.format(str)', function() {
  it('should set format string', function() {
    timer.format('hh:mm:ss');
    assert(timer._format === 'hh:mm:ss');
  });
});

describe('.start(fn)', function() {
  it('should set timer interval', function(done) {
    var seconds = 0;

    tmg().start(function() {
      seconds = this.obj().s;
      if (seconds === 1) this.end();
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

    tmg().start(function() {
      seconds = this.obj().s;
      if (seconds === 1) this.end();
    });

    setTimeout(function() {
      assert(seconds === 1);
      done();
    }, 2500);
  });
});

describe('.obj()', function() {
  it('should return object', function() {
    var obj = timer.obj();
    assert(typeof obj === 'object');
    assert('h' in obj);
    assert('m' in obj);
    assert('s' in obj);
  });
});

describe('.arr()', function() {
  it('should return array', function() {
    var arr = timer.arr();
    assert(typeof arr === 'object');
    assert(arr.length === 3);
  });
});

describe('.str()', function() {
  it('should return string', function() {
    var str = timer.str();
    assert(typeof str === 'string');
    assert(/^\d{2}:\d{2}:\d{2}$/.test(str));
  });

  it('should return string with escaped', function() {
    var str = timer.str('s [seconds]');
    assert(typeof str === 'string');
    assert(/^\d\sseconds$/.test(str));
  });
});
