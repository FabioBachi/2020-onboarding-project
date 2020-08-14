# 2020 Onboarding Project

This application was built with the intent to get used with 2020's tech specifications. It integrates with [The Movie Database API](https://developers.themoviedb.org/4/getting-started/authorization) to suggest movies to users based on their favorite genres. It also saves their preferences in local storage for convenience.
Technologies used in this project:

- ReactJS
- Typescript
- BackboneJS
- Webpack
- Grunt

## React Application

First of all, inst all alldependencies

```sh
$ cd ui
$ yarn install
```

#### Development

In order to run the React component in development node, run the following commands:

```sh
$ yarn dev
```

#### Testing

When you need to run Jest automated tests, simply run:

```sh
$ yarn test
```

#### Building for production

When testing the Backbone application, you will need to first build the React component as an AMD module. For that, simply run:

```sh
$ yarn build
```

This will generate a custom HTML element for further use in the Backbone app in the `ui/public/bundle.js` file.

## BackboneJS Application / Base App

The entry point for the whole application is the BackboneJS app.
To run in development mode, first build the React component (as explicited above) and then install `http-server` globally and run the `app/` folder:

```sh
yarn global add http-server
cd app
http-server
```
