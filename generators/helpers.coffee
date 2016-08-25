GitHubApi  = require 'github'
_          = require 'lodash'
url        = require 'url'

class Helpers
  # extractMeshbluConnectorName: (appName) =>
  #   _.kebabCase appName

  titleCase: (str) =>
    "#{_.upperFirst(_.camelCase str)}"

  githubUserInfo: (user, callback) =>
    console.log('github user', user)
    github = new GitHubApi version: '3.0.0'

    console.log('process.env.GITHUB_TOKEN', process.env.GITHUB_TOKEN)
    unless _.isEmpty process.env.GITHUB_TOKEN
      github.authenticate
        type: 'oauth'
        token: process.env.GITHUB_TOKEN

    github.user.getFrom {user}, callback

  githubSlug: (githubUrl, appname) =>
    parsedGithub = url.parse githubUrl
    parts = parsedGithub.pathname.split '/'
    return "#{parts[1]}/#{appname}"

  mergeJSON: ({ input, overwriteWith }) =>
    returnObj = _.cloneDeep(input)
    _.each overwriteWith, (value, key) =>
      if _.isPlainObject(value)
        returnObj[key] = _.assign(returnObj[key], value)
      return value
    return returnObj

module.exports = new Helpers
