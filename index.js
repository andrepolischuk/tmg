'use strict';

var each = require('ea');
var eachReverse = require('each-reverse');
var type = require('component-type');
var format = '{h}:{m}:{s}';

var map = {};
map.s = 1000;
map.m = map.s * 60;
map.h = map.m * 60;
map.d = map.h * 24;

module.exports = Timer;

function Timer(date) {
  if (!(this instanceof Timer)) return new Timer(date);
  if (type(date) !== 'date') return new Timer(new Date());
  this._date = date;
  this._format = format;
  this._running = false;
}

Timer.prototype.format = function(str) {
  this._format = str;
  return this;
};

Timer.prototype.start = function(fn) {
  if (this._running) return this;
  this._running = true;
  var self = this;

  function next() {
    if (!self._running) return;
    fn.call(self);
    setTimeout(next, 1000);
  }

  next();
  return this;
};

Timer.prototype.end = function() {
  this._running = false;
  return this;
};

Timer.prototype.obj = function(str) {
  str = str || this._format;
  var cur = Math.abs((new Date()).valueOf() - this._date.valueOf());
  var time = {};

  eachReverse(map, function(mult, prop) {
    if (str.indexOf('{' + prop + '}') > -1) {
      time[prop] = Math.floor(cur / mult);
      cur -= time[prop] * mult;
    }
  });

  return time;
};

Timer.prototype.arr = function(str) {
  var cur = this.obj(str);
  var time = [];

  each(cur, function(val) {
    time.push(val);
  });

  return time;
};

Timer.prototype.str = function(str) {
  var cur = this.obj(str);
  var time = str || this._format;

  each(cur, function(val, prop) {
    val = /(h|m|s)/.test(prop) && val < 10 ? '0' + val : val;
    time = time.replace(new RegExp('{' + prop + '}', 'g'), val);
  });

  return time;
};
