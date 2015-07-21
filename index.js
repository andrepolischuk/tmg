'use strict';

var each = require('ea');
var eachReverse = require('each-reverse');
var msToMoment = require('ms-to-moment');
var type = require('component-type');
var format = 'hh:mm:ss';
var keysRegExp = /(^|\]|\b)([D]|[hms]+)($|\[|\b)/gm;
var escapedRegExp = /\[([^\[\]]+)\]/gm;
var map = {};
map.s = 1000;
map.m = map.s * 60;
map.h = map.m * 60;
map.D = map.h * 24;

module.exports = Timer;

function Timer(date) {
  if (!(this instanceof Timer)) return new Timer(date);
  if (type(date) !== 'date') date = new Date();
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
    fn(self);
    setTimeout(next, 1000);
  }

  next();
  return this;
};

Timer.prototype.end = function() {
  this._running = false;
  return this;
};

Timer.prototype.toObject = function(str) {
  str = str || this._format;
  var cur = msToMoment(this._date);
  var keys = str.match(keysRegExp);
  var time = {};

  each(keys, function(val, i) {
    keys[i] = val.charAt(0);
  });

  eachReverse(map, function(mult, prop) {
    if (keys.indexOf(prop) > -1) {
      time[prop] = Math.floor(cur / mult);
      cur -= time[prop] * mult;
    }
  });

  return time;
};

Timer.prototype.toArray = function(str) {
  var cur = this.toObject(str);
  var time = [];

  each(cur, function(val) {
    time.push(val);
  });

  return time;
};

Timer.prototype.toString = function(str) {
  var cur = this.toObject(str);
  var time = str || this._format;

  each(cur, function(val, prop) {
    time = time.replace(keysRegExp, function(match) {
      if (match.charAt(0) !== prop) return match;
      return /([hms]{2})/.test(match) && val < 10 ? '0' + val : val;
    });
  });

  return time.replace(escapedRegExp, '$1');
};
