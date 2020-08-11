requirejs.config({
  paths: {
    jquery: "../lib/jquery",
    underscore: "../lib/underscore",
    backbone: "../lib/backbone",
  },
});

requirejs(["app"]);
