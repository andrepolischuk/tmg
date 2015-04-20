
'use strict';

var tmg = require('andrepolischuk/tmg@0.3.0');

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
