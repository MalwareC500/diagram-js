import inherits from 'inherits';

import RuleProvider from 'lib/features/rules/RuleProvider';

export default function CreateRules(injector) {
  injector.invoke(RuleProvider, this);
}

CreateRules.$inject = [ 'injector' ];

inherits(CreateRules, RuleProvider);


CreateRules.prototype.init = function() {

  this.addRule('shape.attach', function(context) {
    var target = context.target;

    if (target && /ignore/.test(target.id)) {
      return null;
    }

    if (/host/.test(target.id)) {
      return 'attach';
    }

    return false;
  });


  this.addRule('connection.create', function(context) {
    var source = context.source,
        target = context.target,
        hints = context.hints;

    expect(source.parent).to.exist;
    expect(target.parent).not.to.exist;

    expect(hints).to.have.keys([
      'targetParent',
      'targetAttach'
    ]);

    return /parent|child/.test(source.id);
  });


  this.addRule('shape.create', function(context) {
    var target = context.target;

    if (/ignore/.test(target.id)) {
      return null;
    }

    return /parent|root/.test(target.id);
  });


  this.addRule('elements.create', function(context) {
    var target = context.target;

    if (/ignore/.test(target.id)) {
      return null;
    }

    return /parent|root/.test(target.id);
  });

};
