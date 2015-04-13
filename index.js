
'use strict';

var tmg = require('andrepolischuk/tmg@0.2.0');
var h1 = document.querySelector('h1');
var time;

tmg(new Date(2016, 0, 1))
  .format('d h:m:s')
  .start(function() {
    time = this.obj();
    h1.innerHTML = time.d + ' ' + (time.d > 1 ? 'days' : 'day') +
      ' ' + time.h + ':' + time.m + ':' + time.s;
  });
