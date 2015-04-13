(function umd(require){
  if ('object' == typeof exports) {
    module.exports = require('1');
  } else if ('function' == typeof define && (define.amd || define.cmd)) {
    define(function(){ return require('1'); });
  } else {
    this['tmg'] = require('1');
  }
})((function outer(modules, cache, entries){

  /**
   * Global
   */

  var global = (function(){ return this; })();

  /**
   * Require `name`.
   *
   * @param {String} name
   * @param {Boolean} jumped
   * @api public
   */

  function require(name, jumped){
    if (cache[name]) return cache[name].exports;
    if (modules[name]) return call(name, require);
    throw new Error('cannot find module "' + name + '"');
  }

  /**
   * Call module `id` and cache it.
   *
   * @param {Number} id
   * @param {Function} require
   * @return {Function}
   * @api private
   */

  function call(id, require){
    var m = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];

    fn.call(m.exports, function(req){
      var dep = modules[id][1][req];
      return require(dep || req);
    }, m, m.exports, outer, modules, cache, entries);

    // store to cache after successful resolve
    cache[id] = m;

    // expose as `name`.
    if (name) cache[name] = cache[id];

    return cache[id].exports;
  }

  /**
   * Require all entries exposing them on global if needed.
   */

  for (var id in entries) {
    if (entries[id]) {
      global[entries[id]] = require(id);
    } else {
      require(id);
    }
  }

  /**
   * Duo flag.
   */

  require.duo = true;

  /**
   * Expose cache.
   */

  require.cache = cache;

  /**
   * Expose modules
   */

  require.modules = modules;

  /**
   * Return newest require.
   */

   return require;
})({
1: [function(require, module, exports) {

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
    setTimeout(function() {
      if (!self._running) return;
      fn.call(self);
      next();
    }, 1000);
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

}, {"ea":2,"type":3,"component-type":3}],
2: [function(require, module, exports) {

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
 * @param {Array} obj
 * @param {Function} fn
 * @api private
 */

array.reverse = function(obj, fn) {
  for (var i = obj.length - 1; i >= 0 ; i--) {
    fn(obj[i], i);
  }
};

/**
 * Iterate object
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
 * @param {Array} obj
 * @param {Function} fn
 * @api private
 */

string.reverse = function(obj, fn) {
  for (var i = obj.length - 1; i >= 0 ; i--) {
    fn(obj.charAt(i), i);
  }
};

}, {"type":3,"component-type":3}],
3: [function(require, module, exports) {
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

}, {}]}, {}, {"1":""}));