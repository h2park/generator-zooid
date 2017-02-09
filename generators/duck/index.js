var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({

  prompting: function () {
    var self = this;
    var prompts = [
      {
        type: 'input',
        name: 'duckName',
        message: 'What is your Duck\'s name?',
        default: 'Example Duck'
      },
    ];
    return this.prompt(prompts).then(function (answers) {
      var camelCased = _.camelCase(answers.duckName);
      self.duckName = camelCased.charAt(0).toUpperCase() + camelCased.slice(1);
      self.duckNameKebab = _.kebabCase(self.duckName);
    });
  },
  writing: function() {
    this.copy('duck/_index.js', this.duckNameKebab + '/index.js');
    this.copy('duck/_index.spec.js', this.duckNameKebab + '/index.spec.js');
  }
});
