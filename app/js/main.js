requirejs.config({
  paths: {
    backbone: "../lib/backbone",
    jquery: "../lib/jquery",
    localStorage: "../lib/backbone.localStorage",
    underscore: "../lib/underscore",
  },
});

requirejs(["app"]);
