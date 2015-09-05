import tmg from 'tmg';
var cyear = document.querySelector('#cyear');
var nyear = document.querySelector('#nyear');
var page = document.querySelector('#page');
var year = (new Date()).getFullYear();

tmg(new Date(year, 0, 1))
  .format('D [days] hh:mm:ss')
  .start(t => {
    cyear.innerHTML = t.toString();
  });

tmg(new Date(year + 1, 0, 1))
  .format('D [days] hh:mm:ss')
  .start(t => {
    nyear.innerHTML = t.toString();
  });

tmg()
  .start(t => {
    page.innerHTML = t.toString();
  });
