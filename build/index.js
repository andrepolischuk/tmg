(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _tmg = require('tmg');

var _tmg2 = _interopRequireDefault(_tmg);

var cyear = document.querySelector('#cyear');
var nyear = document.querySelector('#nyear');
var page = document.querySelector('#page');
var year = new Date().getFullYear();

(0, _tmg2['default'])(new Date(year, 0, 1)).format('D [days] hh:mm:ss').start(function (t) {
  cyear.innerHTML = t.toString();
});

(0, _tmg2['default'])(new Date(year + 1, 0, 1)).format('D [days] hh:mm:ss').start(function (t) {
  nyear.innerHTML = t.toString();
});

(0, _tmg2['default'])().start(function (t) {
  page.innerHTML = t.toString();
});

},{"tmg":6}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
'use strict';

try {
  var type = require('type');
} catch (err) {
  var type = require('component-type');
}

module.exports = function(obj, fn) {
  if (type(fn) !== 'function') return;

  switch (type(obj)) {
    case 'array':
      return array(obj, fn);
    case 'object':
      if (type(obj.length) === 'number') return array(obj, fn);
      return object(obj, fn);
    case 'string':
      return string(obj, fn);
  }
};

function array(obj, fn) {
  for (var i = 0, len = obj.length; i < len; i++) {
    fn(obj[i], i);
  }
}

function object(obj, fn) {
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      fn(obj[i], i);
    }
  }
}

function string(obj, fn) {
  for (var i = 0, len = obj.length; i < len; i++) {
    fn(obj.charAt(i), i);
  }
}

},{"component-type":2,"type":2}],4:[function(require,module,exports){
'use strict';

try {
  var type = require('type');
} catch (err) {
  var type = require('component-type');
}

module.exports = function(obj, fn) {
  if (type(fn) !== 'function') return;

  switch (type(obj)) {
    case 'array':
      return array(obj, fn);
    case 'object':
      if (type(obj.length) === 'number') return array(obj, fn);
      return object(obj, fn);
    case 'string':
      return string(obj, fn);
  }
};

function array(obj, fn) {
  for (var i = obj.length - 1; i >= 0; i--) {
    fn(obj[i], i);
  }
}

function object(obj, fn) {
  var keys = [];

  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      keys.push(k);
    }
  }

  for (var i = keys.length - 1; i >= 0; i--) {
    fn(obj[keys[i]], keys[i]);
  }
}

function string(obj, fn) {
  for (var i = obj.length - 1; i >= 0; i--) {
    fn(obj.charAt(i), i);
  }
}

},{"component-type":2,"type":2}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (date) {
  return Math.abs(new Date().valueOf() - date.valueOf());
};

module.exports = exports["default"];


},{}],6:[function(require,module,exports){
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

},{"component-type":2,"ea":3,"each-reverse":4,"ms-to-moment":5}]},{},[1]);
