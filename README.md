# tmg [![Build Status][travis-image]][travis-url]

> Timer generator

[tmg-cli][tmg-cli] - CLI for this module

## Install

```sh
npm install --save tmg
```

## Usage

```js
var tmg = require('tmg');
var date = new Date(2018, 05, 01, 12, 0, 0);

tmg(date)
  .format('h:mm:ss')
  .start(function(t) {
    t.toString();
  });
```

## API

### tmg([date])

Return timer, default `new Date()`

```js
var timer = tmg();
var countdown = tmg(new Date(2018, 05, 01, 12, 0, 0));
```

### .format(str)

Set format string

```js
tmg().format('D [days] h:mm:ss'); // 4 days 2:00:15
```

Can be used:

* `D` - days
* `h`, `hh` - hours
* `m`, `mm` - minutes
* `s`, `ss` - seconds
* `[escaped]` - escaped text

### .start(fn)

Start timer interval

```js
timer.start(function(t) {
  t.toString(); // '12:00:10'
});
```

### .end()

Clear timer interval

### .toObject([str])

Return object with current timer value with local format `str`

```js
timer.toObject(); // {h: 12, m: 0, s: 10}
timer.toObject('m:s'); // {m: 720, s: 10}
```

### .toArray([str])

Return object with current timer value with local format `str`

```js
timer.toArray(); // [12, 0, 10]
timer.toArray('m:s'); // [720, 10]
```

### .toString([str])

Return string with current timer value with local format `str`

```js
timer.toString(); // '12:00:10'
timer.toString('mm:ss'); // '720:10'
```

## License

MIT

[travis-url]: https://travis-ci.org/andrepolischuk/tmg
[travis-image]: https://travis-ci.org/andrepolischuk/tmg.svg?branch=master

[tmg-cli]: https://github.com/andrepolischuk/tmg-cli
