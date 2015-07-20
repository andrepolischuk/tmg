# tmg [![Build Status](https://travis-ci.org/andrepolischuk/tmg.svg?branch=master)](https://travis-ci.org/andrepolischuk/tmg)

  > Timer generator

## Install

```sh
npm install --save tmg
```

## API

### tmg([date])

  Return timer

```js
var timer = tmg();
var timer = tmg(new Date(2018, 05, 01, 12, 0, 0));
```

### .format(str)

  Set format string

```js
var timer = tmg().format('{h}:{m}:{s}');
```

  Can be used:

  * `d` - days
  * `h` - hours
  * `m` - minutes
  * `s` - seconds

### .start(fn)

  Start timer interval

```js
timer.start(function() {
  this.str(); // '12:00:10'
})
```

### .end()

  Clear timer interval

### .obj([str])

  Return object with current timer value

```js
timer.obj(); // {h: 12, m: 0, s: 10}
```

### .arr([str])

  Return object with current timer value

```js
timer.arr(); // [12, 0, 10]
```

### .str([str])

  Return string with current timer value

```js
timer.str(); // '12:00:10'
```

## License

  MIT
