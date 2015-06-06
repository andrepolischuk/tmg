(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

'use strict';

var tmg = require('tmg');

var cyear = document.querySelector('#cyear');
var nyear = document.querySelector('#nyear');
var page = document.querySelector('#page');

var year = (new Date()).getFullYear();

tmg(new Date(year, 0, 1))
  .format('{d} days {h}:{m}:{s}')
  .start(function() {
    cyear.innerHTML = this.str();
  });

tmg(new Date(year + 1, 0, 1))
  .format('{d} days {h}:{m}:{s}')
  .start(function() {
    nyear.innerHTML = this.str();
  });

tmg().start(function() {
  page.innerHTML = this.str();
});

function digits2(val) {
  return val < 10 ? '0' + val : val;
}

},{"tmg":2}],2:[function(require,module,exports){

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

var format = '{h}:{m}:{s}';

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
    if (str.indexOf('{' + prop + '}') > -1) {
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
    val = /(h|m|s)/.test(prop) && val < 10 ? '0' + val : val;
    time = time.replace(new RegExp('{' + prop + '}', 'g'), val);
  });

  return time;
};

},{"component-type":3,"ea":4,"type":3}],3:[function(require,module,exports){
/**
 * toString ref.
 */

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

module.exports = function(val){
  switch (toString.call(val)) {
    case '[object Date]': return 'date';
    case '[object RegExp]': return 'regexp';
    case '[object Arguments]': return 'arguments';
    case '[object Array]': return 'array';
    case '[object Error]': return 'error';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val !== val) return 'nan';
  if (val && val.nodeType === 1) return 'element';

  val = val.valueOf
    ? val.valueOf()
    : Object.prototype.valueOf.apply(val)

  return typeof val;
};

},{}],4:[function(require,module,exports){

'use strict';

/**
 * Module dependencies
 */

try {
  var type = require('type');
} catch (err) {
  var type = require('component-type');
}

/**
 * Has own property
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Expose direct iterate
 */

module.exports = each;

/**
 * Expose reverse iterate
 *
 * @param {Object|Array} obj
 * @param {Function} fn
 * @return {Function}
 * @api public
 */

module.exports.reverse = function(obj, fn) {
  return each(obj, fn, 'reverse');
};

/**
 * Iteration router
 *
 * @param {Object|Array} obj
 * @param {Function} fn
 * @return {Function}
 * @api public
 */

function each(obj, fn, direction) {
  if (typeof fn === 'function') {
    switch (type(obj)) {
      case 'array':
        return (array[direction] || array)(obj, fn);
      case 'object':
        if (type(obj.length) === 'number') {
          return (array[direction] || array)(obj, fn);
        }
        return (object[direction] || object)(obj, fn);
      case 'string':
        return (string[direction] || string)(obj, fn);
    }
  }
}

/**
 * Iterate array
 *
 * @param {Array} obj
 * @param {Function} fn
 * @api private
 */

function array(obj, fn) {
  for (var i = 0; i < obj.length; i++) {
    fn(obj[i], i);
  }
}

/**
 * Iterate array in reverse order
 *
 * @param {Array} obj
 * @param {Function} fn
 * @api private
 */

array.reverse = function(obj, fn) {
  for (var i = obj.length - 1; i >= 0; i--) {
    fn(obj[i], i);
  }
};

/**
 * Iterate object
 *
 * @param {Object} obj
 * @param {Function} fn
 * @api private
 */

function object(obj, fn) {
  for (var i in obj) {
    if (has.call(obj, i)) {
      fn(obj[i], i);
    }
  }
}

/**
 * Iterate object in reverse order
 *
 * @param {Object} obj
 * @param {Function} fn
 * @api private
 */

object.reverse = function(obj, fn) {
  var keys = [];
  for (var k in obj) {
    if (has.call(obj, k)) {
      keys.push(k);
    }
  }
  for (var i = keys.length - 1; i >= 0; i--) {
    fn(obj[keys[i]], keys[i]);
  }
};

/**
 * Iterate string
 *
 * @param {Array} obj
 * @param {Function} fn
 * @api private
 */

function string(obj, fn) {
  for (var i = 0; i < obj.length; i++) {
    fn(obj.charAt(i), i);
  }
}

/**
 * Iterate string in reverse order
 *
 * @param {Array} obj
 * @param {Function} fn
 * @api private
 */

string.reverse = function(obj, fn) {
  for (var i = obj.length - 1; i >= 0; i--) {
    fn(obj.charAt(i), i);
  }
};

},{"component-type":3,"type":3}]},{},[1]);
