requirejs.config({
  paths: {
    backbone: "../lib/backbone",
    jquery: "../lib/jquery",
    localStorage: "../lib/backbone.localStorage",
    moment: "../lib/moment",
    tpl: "../lib/tpl",
    underscore: "../lib/underscore",
  },
});

requirejs(["app"]);
