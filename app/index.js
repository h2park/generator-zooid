var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

  prompting: function () {
    var self = this;
    var done = this.async();
    return this.prompt(
      {
        type: 'input',
        name: 'zooidname',
        message: 'What would you like your zooid to be called? (if you want zooid-ui-spinner, enter \"Spinner\")',
        'default': 'Zooid'
      },
      {
        type : 'input',
        name: 'author',
        message: 'Who is the author?',
        'default': 'Octoblu Inc'
      },{
        type: 'input',
        name: 'githubUser',
        message: 'What is your github username?',
        'default': 'octoblu'
      }
    ).then(function (answers) {
      self.zooidname = answers.zooidname;
      self.zooidnamekebab = 'zooid-ui-' + answers.zooidname.toLowerCase();
      self.author = answers.author;
      self.githubUrl = "https://github.com/" + answers.githubUser;
      return done();
    }.bind(this));
  },
  projectFiles: function() {
    this.template('src/_zooid.css', 'src/' + self.zooidname + '.css');
    this.template('src/_zooid.js', 'src/' + self.zooidname + '.js');
    this.template('src/_zooid.spec.js', 'src/' + self.zooidname + '.spec.js');
    this.template('src/_index.js', 'src/index.js');
    this.template('test/_setup.js', 'test/.setup.js');
    this.template('test/_mocha.opts', 'test/mocha.opts');
    this.template('_package.json', 'package.json');
    this.template('_babelrc', '.babelrc');
    this.template('_webpack.config.js', 'webpack.config.js');
    return this.template('_gitignore', '.gitignore');
  }
});
