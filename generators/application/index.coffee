htmlWiring = require 'html-wiring'
_          = require 'lodash'
path       = require 'path'
url        = require 'url'
util       = require 'util'
yeoman     = require 'yeoman-generator'

helpers    = require '../helpers'

class ZooidApplicationGenerator extends yeoman.Base
  constructor: (args, options, config) ->
    super
    @cwd = @destinationRoot()
    @pkg = @_readFileAsJSON 'package.json'

  initializing: =>
    console.log 'initializing...'
    @appname = _.kebabCase @appname

  prompting: =>
    console.log 'prompting...'

    prompts = [
      {
        type: 'input',
        name: 'appname',
        message: 'What\'s the project\'s name?',
        default: @appname
      },
      {
        type: 'input'
        name: 'author'
        message: 'Who is the author?'
        default: 'Octoblu Inc'
      },
      {
        type: 'input'
        name: 'githubUser'
        message: 'What\'s your GitHub username?'
        default: 'octoblu'
      }
    ]

    @prompt(prompts).then (answers) =>
      console.log 'Answers', answers

      { @author, @githubUser, @appname } = answers
      @githubUrl = "https://github.com/#{@githubUser}"

      @appnameTitleCased = helpers.titleCase @appname
      @appname = _.kebabCase @appname

      return

  configuring: =>
    console.log 'Configuring...'

  writing: =>
    console.log 'Writting...'

    console.log 'args...', {
      @appnameTitleCased
      @appname
      @author
      @githubUrl
      @githubUser
    }

    context = {
      appName: @appnameTitleCased
      appNameKebab: @appname
      @author
      @githubUrl
      @githubUser
    }

    @_updatePkgJSON context

    @template '_README.md', 'README.md', context
    @template '_package.json', 'package.json', context
    @template '_index.html', 'index.html', context
    @template '_babelrc', '.babelrc', context
    @template '_eslintrc', '.eslintrc', context
    @template '_eslintignore', '.eslintignore', context
    @template 'src/components/NotFound/_index.js', 'src/components/NotFound/index.js', context
    @template 'src/components/NotFound/_index.spec.js', 'src/components/NotFound/index.spec.js', context
    @template 'src/components/NotFound/_styles.css', 'src/components/NotFound/styles.css', context
    @template 'src/config/_routes.js', 'src/config/routes.js', context
    @template 'src/containers/_app.js', 'src/containers/app.js', context
    @template 'src/containers/_home.js', 'src/containers/home.js', context
    @template 'src/_index.js', 'src/index.js', context
    @template 'test/_setup.js', 'test/.setup.js', context
    @template 'test/_mocha.opts', 'test/mocha.opts', context
    @template '_travis.yml', '.travis.yml', context
    @template '_codeclimate.yml', '.codeclimate.yml', context

    @copy 'src/_favicon.ico', 'src/favicon.ico'
    @copy '_gitignore', '.gitignore'
    @copy '_webpack.config.dev.js', 'webpack.config.dev.js'
    @copy '_webpack.config.prod.js', 'webpack.config.prod.js'
    @copy '_webpack.config.test.js', 'webpack.config.test.js'

    @copy 'scripts/build.js', 'scripts/build.js'
    @copy 'scripts/start.js', 'scripts/start.js'
    @copy 'scripts/run-nginx.sh', 'scripts/run-nginx.sh'

    @copy 'src/ducks/_store.js', 'src/ducks/store.js'
    @copy 'src/ducks/example-duck/_index.js', 'src/ducks/example-duck/index.js'
    @copy 'src/ducks/example-duck/_index.spec.js', 'src/ducks/example-duck/index.spec.js'

  _updatePkgJSON: (context) =>
    unless @pkg?
      @template '_package.json', 'package.json', context
      return

    { githubSlug } = context
    templatePkg    = @_readTemplateAsJSON '_update_package.json'
    newPackage     = helpers.mergeJSON({ input: @pkg, overwriteWith: templatePkg })

    newPackage.name = @fullAppName
    newPackage.meshbluConnector ?= {}
    newPackage.meshbluConnector.githubSlug ?= githubSlug

    return @_writeFileAsJSON(newPackage, 'package.json')

  _readFile: (relativePath) =>
    fullPath = path.join @cwd, relativePath
    try
      return require fullPath
    catch
      return null

  _readTemplateAsJSON: (relativePath) =>
    fullPath = path.join __dirname, 'templates', relativePath
    try
      return JSON.parse htmlWiring.readFileAsString fullPath
    catch
      return null

  _readFileAsJSON: (relativePath) =>
    fullPath = path.join @cwd, relativePath
    try
      return JSON.parse htmlWiring.readFileAsString fullPath
    catch
      return null

  _writeFileAsJSON: (jsonObj, relativePath) =>
    fullPath = path.join @cwd, relativePath
    try
      return @write fullPath, JSON.stringify(jsonObj, null, 2)
    catch error
      console.error error

  install: =>
    return if @skipInstall

    @installDependencies npm: true, bower: false

  end: =>
    return if @skipInstall

module.exports = ZooidApplicationGenerator
