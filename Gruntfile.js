module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    clean: ["dist"],

    run: {
      react_build: {
        exec: "cd ui && yarn install && yarn test && yarn build",
      },
      core_build: {
        exec: "cd core && yarn install && yarn test && yarn build",
      },
    },

    copy: {
      main: {
        files: [
          {
            src: ["app/**"],
            dest: "dist/",
          },
          {
            src: ["ui/public/bundle.js"],
            dest: "dist/ui/public/bundle.js",
          },
          {
            src: ["core/dist/*"],
            dest: "dist/",
          },
        ],
      },
    },

    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: "dist/app/css",
            src: ["*.css"],
            dest: "dist/app/css",
            ext: ".css",
          },
        ],
      },
    },

    babel: {
      options: {
        sourceMap: true,
        presets: ["@babel/preset-env"],
        plugins: [
          [
            "@babel/plugin-transform-runtime",
            {
              regenerator: true,
            },
          ],
        ],
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: "dist/app/js",
            src: ["**/*.js"],
            dest: "dist/app/js",
            ext: ".js",
          },
        ],
      },
    },

    uglify: {
      all: {
        files: [
          {
            expand: true,
            cwd: "dist/app/js/",
            src: ["*.js"],
            dest: "dist/app/js/",
            ext: ".js",
          },
        ],
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-run");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.registerTask("default", [
    "clean",
    // "run:react_build",
    // "run:core_build",
    "copy",
    "cssmin",
    "babel",
    // "uglify",
  ]);
};
