# Generator Zooid
Zooids are small [React](https://facebook.github.io/react/index.html) components used to build applications of any size. This generator will allow you to create a new Zooid, Zooid application, or a basic React component.

## Install
To run this generator, you will need to install [Yeoman](http://yeoman.io/) and the generator itself...
```
npm install --global yo
npm install --global generator-zooid
```

## Generators

### Zooid
Create a new Zooid component to be published on [npm](http://npmjs.com/)

##### Usage
```
yo zooid
```

##### Features
- Uses [Webpack](https://webpack.github.io/)
- [CodeClimate](https://codeclimate.com/) coverage
- Uses [Babel ES2015](https://babeljs.io/docs/learn-es2015/)
- [Travis](https://docs.travis-ci.com/user/deployment) deployment
- Uses [ESLint](http://eslint.org/)
- Co-located CSS
- Includes test files
- Includes a [storybook](https://github.com/kadirahq/react-storybook)

##### Commands
- Start
- Test
- Build
- Storybook
- Lint
- Clean
- Coverage

### Zooid Application
Create a microsite or application that will work well with Zooids

##### Usage
```
yo zooid:application
```

##### Features
- Uses [React Router](https://github.com/reactjs/react-router)
- Routes pre-configured
- Uses [Babel ES2015](https://babeljs.io/docs/learn-es2015/)
- [CodeClimate](https://codeclimate.com/) coverage
- Uses [ESLint](http://eslint.org/)
- [Travis](https://docs.travis-ci.com/user/deployment) deployment
- Uses [Webpack](https://webpack.github.io/)
- Co-located CSS
- Includes test files

##### Commands
- Start
- Test
- Build
- Clean
- Lint

### React Component
Quickly create a React component to be used in a Zooid or Zooid application

##### Usage
```
yo zooid:component
```

##### Features
- Stateful or Stateless components
- Co-located CSS
- Includes test file
