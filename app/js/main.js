requirejs.config({
  paths: {
    backbone: "../lib/backbone",
    jquery: "../lib/jquery",
    tpl: "../lib/tpl",
    underscore: "../lib/underscore",
  },
});

requirejs(["app"]);
