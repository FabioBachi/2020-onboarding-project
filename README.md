# 2020 Onboarding Project

This application was built with the intent to get used with 2020's tech specifications. It integrates with [The Movie Database API](https://developers.themoviedb.org/4/getting-started/authorization) to suggest movies to users based on their favorite genres. It also saves their preferences in local storage for convenience.
Technologies used in this project:

- ReactJS
- Typescript
- BackboneJS
- Webpack
- Grunt
- Jest
- Enzyme
- SASS

# BackboneJS Application / Base App

The entry point for the whole application is the BackboneJS app.

#### Development

To run in development mode, first build the Core Application and the React component (as explicited below), install `http-server` globally and then run in the `app/` folder:

```sh
yarn global add http-server
cd app
http-server
```

# Core Application

This applications contains all API and Local Storage logic. It's built with Typescript, so you must build it before using it in the Backbone Application.

```sh
$ cd core
$ yarn install
$ yarn build
```

#### Testing

When you need to run Jest automated tests, simply run:

```sh
$ cd core
$ yarn test
```

# React Application

First of all, install all dependencies

```sh
$ cd ui
$ yarn install
```

#### Development

In order to run the React component in development node, run the following command:

```sh
$ cd ui
$ yarn dev
```

#### Testing

When you need to run Jest automated tests, simply run:

```sh
$ cd ui
$ yarn test
```

#### Building for production

When testing the Backbone application, you will first need to build the React component as an AMD module. To do that, simply run:

```sh
$ cd ui
$ yarn build
```

This will generate a custom HTML element for further use in the Backbone app in the `ui/public/bundle.js` file.
