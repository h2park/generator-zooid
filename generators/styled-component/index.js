var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({

  prompting: function () {
    var self = this;
    var prompts = [
      {
        type: 'input',
        name: 'componentName',
        message: 'What is your styled components\'s name?',
        default: 'Example Component'
      },
    ];
    return this.prompt(prompts).then(function (answers) {
      var camelCased = _.camelCase(answers.componentName);
      self.componentName = camelCased.charAt(0).toUpperCase() + camelCased.slice(1);
      self.componentNameKebab = _.kebabCase(self.componentName);
    });
  },
  writing: function() {
    this.copy('component/_index.js', this.componentNameKebab + '/index.js');
  }
});
