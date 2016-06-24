var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({

  prompting: function () {
    var self = this;
    var prompts = [
      {
        type: 'input',
        name: 'zooidName',
        message: 'What is your Zooid\'s name?',
        default: 'Sample Zooid'
      },{
        type : 'input',
        name: 'author',
        message: 'Who is the author?',
        default: 'Octoblu Inc'
      },{
        type: 'input',
        name: 'githubUser',
        message: 'What is your github username?',
        default: 'octoblu'
      }
    ];
    return this.prompt(prompts).then(function (answers) {
      var camelCased = _.camelCase(answers.zooidName);
      self.zooidName = camelCased.charAt(0).toUpperCase() + camelCased.slice(1);
      self.zooidNameKebab = 'zooid-' + _.kebabCase(self.zooidName);
      self.author = answers.author;
      self.githubUser = answers.githubUser;
      self.githubUrl = "https://github.com/" + answers.githubUser;
    });
  },
  writing: function() {
    this.composeWith('zooid:component', {
      args: [this.zooidName]
    },
    {
      local: require.resolve('../component')
    });
    var context = {
      zooidName: this.zooidName,
      zooidNameKebab: this.zooidNameKebab,
      author: this.author,
      githubUrl: this.githubUrl,
      githubUser: this.githubUser
    }
    this.template('src/_index.js', 'src/index.js', context);
    this.template('test/_setup.js', 'test/.setup.js', context);
    this.template('test/_mocha.opts', 'test/mocha.opts', context);
    this.template('_README.md', 'README.md', context);
    this.template('_package.json', 'package.json', context);
    this.template('_babelrc', '.babelrc', context);
    this.template('_webpack.config.js', 'webpack.config.js', context);
    this.template('_gitignore', '.gitignore', context);
    this.template('.storybook/_config.js', '.storybook/config.js', context);
    this.template('.storybook/_webpack.config.js', '.storybook/webpack.config.js', context);
    this.template('stories/_index.js', 'stories/index.js', context);
    this.template('_stylelintrc', '.stylelintrc', context);
    this.template('_eslintrc', '.eslintrc', context);
    this.template('_eslintignore', '.eslintignore', context);
    this.template('_codeclimate.yml', '.codeclimate.yml', context);
    this.template('_travis.yml', '.travis.yml', context);
  }
});
