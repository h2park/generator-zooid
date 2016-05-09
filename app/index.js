var generators = require('yeoman-generator');
var kebabCase = require('kebab-case');

module.exports = generators.Base.extend({

  prompting: function () {
    var self = this;
    var prompts = [
      {
        type: 'input',
        name: 'zooidname',
        message: 'What would you like your zooid to be called? (if you want zooid-ui-page-header, enter \"PageHeader\")',
        default: 'Zooid'
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
      self.zooidname = answers.zooidname;
      self.zooidnamekebab = 'zooid-ui' + kebabCase(answers.zooidname);
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
    this.template('src/_zooid.css', 'src/' + this.zooidname + '.css', context);
    this.template('src/_zooid.js', 'src/' + this.zooidname + '.js', context);
    this.template('src/_zooid.spec.js', 'src/' + this.zooidname + '.spec.js', context);
    this.template('src/_index.js', 'src/index.js', context);
    this.template('test/_setup.js', 'test/.setup.js', context);
    this.template('test/_mocha.opts', 'test/mocha.opts', context);
    this.template('_package.json', 'package.json', context);
    this.template('_babelrc', '.babelrc', context);
    this.template('_webpack.config.js', 'webpack.config.js', context);
    this.template('_gitignore', '.gitignore', context);
  }
});
