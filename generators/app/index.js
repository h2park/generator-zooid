var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({

  prompting: function () {
    var self = this;
    var prompts = [
      {
        type: 'input',
        name: 'zooidname',
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
      var camelCased = _.camelCase(answers.zooidname);
      self.zooidname = camelCased.charAt(0).toUpperCase() + camelCased.slice(1);
      self.zooidnamekebab = 'zooid-ui-' + _.kebabCase(self.zooidname);
      self.author = answers.author;
      self.githubUrl = "https://github.com/" + answers.githubUser;
    });
  },
  writing: function() {
    var context = {
      zooidname: this.zooidname,
      zooidnamekebab: this.zooidnamekebab,
      author: this.author,
      githubUrl: this.githubUrl
    }
    this.template('src/_zooid.css', this.zooidname + '/src/' + this.zooidname + '.css', context);
    this.template('src/_zooid.js', this.zooidname + '/src/' + this.zooidname + '.js', context);
    this.template('src/_zooid.spec.js', this.zooidname + '/src/' + this.zooidname + '.spec.js', context);
    this.template('src/_index.js', this.zooidname + '/src/index.js', context);
    this.template('test/_setup.js', this.zooidname + '/test/.setup.js', context);
    this.template('test/_mocha.opts', this.zooidname + '/test/mocha.opts', context);
    this.template('_package.json', this.zooidname + '/package.json', context);
    this.template('_babelrc', this.zooidname + '/.babelrc', context);
    this.template('_webpack.config.js', this.zooidname + '/webpack.config.js', context);
    this.template('_gitignore', this.zooidname + '/.gitignore', context);
    this.template('.storybook/_config.js', this.zooidname + '/.storybook/config.js', context);
    this.template('.storybook/_webpack.config.js', this.zooidname + '/.storybook/webpack.config.js', context);
    this.template('stories/_index.js', this.zooidname + '/stories/index.js', context);
  }
});
