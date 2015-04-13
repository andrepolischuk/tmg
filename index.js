
'use strict';

var tmg = require('andrepolischuk/tmg@0.2.0');

var cyear = document.querySelector('#cyear');
var nyear = document.querySelector('#nyear');
var page = document.querySelector('#page');

var year = (new Date()).getFullYear();

tmg(new Date(year, 0, 1))
  .format('d h:m:s')
  .start(function() {
    var time = this.obj();
    cyear.innerHTML = time.d + ' ' + (time.d > 1 ? 'days' : 'day') +
      ' ' + digits2(time.h) + ':' + digits2(time.m) + ':' + digits2(time.s);
  });

tmg(new Date(year + 1, 0, 1))
  .format('d h:m:s')
  .start(function() {
    var time = this.obj();
    nyear.innerHTML = time.d + ' ' + (time.d > 1 ? 'days' : 'day') +
      ' ' + digits2(time.h) + ':' + digits2(time.m) + ':' + digits2(time.s);
  });

tmg().start(function() {
  page.innerHTML = this.str();
});

function digits2(val) {
  return val < 10 ? '0' + val : val;
}
