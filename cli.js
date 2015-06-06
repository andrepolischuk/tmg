#!/usr/bin/env node

/**
 * Module dependencies
 */

var program = require('commander');
var moment = require('moment');
var tmg = require('./');

/**
 * Program
 */

program
  .version(require('../package').version)
  .usage('[date] [time]');

/**
 * Examples
 */

program.on('--help', function() {
  console.log('  Examples:');
  console.log();
  console.log('    # start timer with current time');
  console.log('    tmg');
  console.log();
  console.log('    # start timer with specified time');
  console.log('    tmg 12:15');
  console.log();
  console.log('    # start timer with specified date and time');
  console.log('    tmg 2015.02.11 12:00:00');
  console.log();
});

/**
 * Parse argv
 */

program.parse(process.argv);

/**
 * Whitespaces
 */

console.log();

process.on('exit', function(){
  console.log();
});

/**
 * Date
 */

var args = program.args;
var date;
var time;

if (args.length === 0) date = moment();
if (args.length === 2) date = moment(args.join(' '));

if (args.length === 1) {
  time = args[0].split(':');
  time.push(0);

  date = moment()
    .hours(time[0])
    .minutes(time[1])
    .seconds(time[2]);
}

/**
 * Timer
 */

var timer = tmg(date.toDate()).format('{h}:{m}:{s}');

/**
 * Print
 */

print(0);

function print(len) {
  var str = timer.str();
  process.stdout.write('\x1b[' + len + 'D' + str);

  setTimeout(function() {
    print(str.length);
  }, 1000);
}
