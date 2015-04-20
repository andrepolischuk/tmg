
'use strict';

/**
 * Module dependencies
 */

var each = require('ea');

try {
  var type = require('type');
} catch (err) {
  var type = require('component-type');
}

/**
 * Math ref
 */

var abs = Math.abs;
var floor = Math.floor;

/**
 * Def fmt string
 */

var format = 'h:m:s';

/**
 * Time props map
 */

var map = {};
map.s = 1000;
map.m = map.s * 60;
map.h = map.m * 60;
map.d = map.h * 24;

/**
 * Expose Timer
 */

module.exports = Timer;

/**
 * Timer
 *
 * @param {Date} date
 * @return {Object}
 * @api public
 */

function Timer(date) {
  if (!(this instanceof Timer)) return new Timer(date);
  if (type(date) !== 'date') return new Timer(new Date());
  this._date = date;
  this._format = format;
  this._running = false;
}

/**
 * Set format string
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

Timer.prototype.format = function(str) {
  this._format = str;
  return this;
};

/**
 * Start timer interval
 *
 * @param  {Function} fn
 * @return {Object}
 * @api public
 */

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

/**
 * Clear timer interval
 *
 * @return {Object}
 * @api public
 */

Timer.prototype.end = function() {
  this._running = false;
  return this;
};

/**
 * Current time object
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

Timer.prototype.obj = function(str) {
  str = str || this._format;
  var cur = abs((new Date()).valueOf() - this._date.valueOf());
  var time = {};

  each.reverse(map, function(mult, prop) {
    if (str.indexOf(prop) > -1) {
      time[prop] = floor(cur / mult);
      cur -= time[prop] * mult;
    }
  });

  return time;
};

/**
 * Current time array
 *
 * @param {String} str
 * @return {Array}
 * @api public
 */

Timer.prototype.arr = function(str) {
  var cur = this.obj(str);
  var time = [];

  each(cur, function(val) {
    time.push(val);
  });

  return time;
};

/**
 * Current time string
 *
 * @param {String} str
 * @return {String}
 * @api public
 */

Timer.prototype.str = function(str) {
  var cur = this.obj(str);
  var time = str || this._format;

  each(cur, function(val, prop) {
    val += '';
    if (/(h|m|s)/.test(prop)) val = (val.length < 2 ? '0' : '') + val;
    time = time.replace(new RegExp('(' + prop + ')', 'g'), val);
  });

  return time;
};
