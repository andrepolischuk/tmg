# Tmg

  Timer generator

  [![Build Status](https://travis-ci.org/andrepolischuk/tmg.svg?branch=master)](https://travis-ci.org/andrepolischuk/tmg)

## Instalation

  Component(1):

```sh
$ component install andrepolischuk/tmg
```

  Npm:

```sh
$ npm install tmg
```

  Umd:

```html
<script src="https://cdn.rawgit.com/andrepolischuk/tmg/0.2.0/tmg.min.js"></script>
```

## API

### tmg([date])

  Return [Timer](#timer)

```js
var timer = tmg()
var timer = tmg(new Date(2018, 05, 01, 12, 0, 0))
```

### Timer

#### Timer#format(str)

  Set format string

```js
var timer = tmg().format('h:m:s')
```

  Can be used:

  * `d` - days
  * `h` - hours
  * `m` - minutes
  * `s` - seconds

#### Timer.start(fn)

  Start timer interval

```js
timer.start(function() {
  this.str()
  // '12:00:10'
})
```

#### Timer.end()

  Clear timer interval

#### Timer.obj([str])

  Return object with current timer value

```js
timer.obj()
// {h: 12, m: 0, s: 10}
```

#### Timer.arr([str])

  Return object with current timer value

```js
timer.arr()
// [12, 0, 10]
```

#### Timer.str([str])

  Return string with current timer value

```js
timer.str()
// '12:00:10'
```

## Use

```sh
Usage: tmg [date] [time]

Options:

  -h, --help     output usage information
  -V, --version  output the version number  

Examples:

  # start timer with current time
  $ tmg

  # start timer with specified time
  $ tmg 12:15

  # start timer with specified date and time
  $ tmg 2015.02.11 12:00:00
```

## License

  MIT
