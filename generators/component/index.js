var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({

  prompting: function () {
    if (this.options.argv.remain[0]) {
      this.componentPathName = "src/" + this.options.argv.remain[0]
      this.componentName = this.options.argv.remain[0]
      this.stateful = false
      return
    }

    var self = this;
    var prompts = [
      {
        type: 'input',
        name: 'componentName',
        message: 'What is your component\'s name?',
        default: 'reactComponent'
      },{
        type: 'confirm',
        name: 'stateful',
        message: 'Would you like this component to be stateful?'
      }
    ];
    return this.prompt(prompts).then(function (answers) {
      var camelCased = _.camelCase(answers.componentName);
      self.componentName = camelCased.charAt(0).toUpperCase() + camelCased.slice(1);
      self.componentPathName = self.componentName;
      self.stateful = answers.stateful;
    });
  },
  writing: function() {
    var context = {
      componentName: this.componentName
    }
    if (this.stateful) {
      this.template('component/_index-stateful.js', this.componentPathName + '/index.js', context);
    } else {
      this.template('component/_index-stateless.js', this.componentPathName + '/index.js', context);
    }
    this.template('component/_index.spec.js', this.componentPathName + '/index.spec.js', context);
    this.template('component/_styles.css', this.componentPathName + '/styles.css', context);
  }
});
