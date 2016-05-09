var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  askFor: function() {
    var self = this;
    var done = this.async();
    var prompts = [
      {
        name: 'zooidname',
        message: 'What would you like your zooid to be called? (if you want zooid-spinner, enter \"Spinner\")',
        'default': 'Zooid'
      },
      {
        name: 'author',
        message: 'Who is the author?',
        'default': 'Octoblu Inc'
      },
      {
        name: 'githubUser',
        message: 'What is your github username?',
        'default': 'octoblu'
      }
    ];

    this.prompt(prompts, function(props) {
      self.zooidname = props.zooidname;
      self.author = props.author;
      self.githubUrl = "https://github.com/" + props.githubUser;
      return done();
    })
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
