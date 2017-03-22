const Namespaceit = require('../../namespaceit');

describe('A static method on Namespaceit to get a function\'s body', function() {
  it('should get the function body', function() {
    const fnBody = Namespaceit.getFunctionBody(
      function() {
        console.log('d');
      }
    );
    expect(fnBody).toBe("console.log('d');");
  });
});

describe('Create and delete namespace functions', function() {
  var namespaceit;
  beforeEach(function() {
    namespaceit = new Namespaceit('A', function() {
     const a = 1;
   });
   namespaceit.applyNamespace();
  });

  it('should create the namespace object', function() {
    expect(A).not.toBeUndefined();
  });

  it('namespace object should be a typeof object', function() {
    expect(typeof A).toBe('object');
  });

  it('should delete namespace object', function() {
    namespaceit.clearNamespace();
    expect( function(){ A } ).toThrow(new ReferenceError('A is not defined'));
  });
});

describe('Check properties of namespace object', function() {
  var namespaceit;

  beforeEach(function() {
    namespaceit = new Namespaceit('A', someFunction);
    namespaceit.applyNamespace();

    function someFunction() {
      const number = 1;
      const string = 'string';
      const array = [1,2];
      const object = {
        hey: 'you',
        fn: function() {
          return 1;
        }
      };
      function functionStatement() {
        return 'I\'m a function statement';
      };
      const functionExpression = function() {
        return 'I\'m a function expression';
      };
    }
  });

  afterEach(function() {
    namespaceit.clearNamespace();
  });

  it('namespace object should have correct numeric property', function() {
    expect(A.number).toBe(1);
  });

  it('namespace object should have correct string property', function() {
    expect(A.string).toBe('string');
  });

  it('namespace object should have correct array property', function() {
    const expected = [1,2];
    A.array.forEach((el, idx) => {
      expect(el).toBe(expected[idx]);
    });
  });

  it('namespace object should have correct object basic property', function() {
    expect(A.object.hey).toBe('you');
  });

  it('namespace object should have correct object function property', function() {
    expect(A.object.fn()).toBe(1);
  });

  it('namespace object should have correct function statement property', function() {
    expect(A.functionStatement()).toBe('I\'m a function statement');
  });

  it('namespace object should have correct function expression property', function() {
    expect(A.functionExpression()).toBe('I\'m a function expression');
  });
});

describe('Check properties of namespace object from imported file', function() {
  var namespaceit;

  beforeEach(function() {
    namespaceit = new Namespaceit('A', 'test.js');
    namespaceit.applyNamespace();
  });

  afterEach(function() {
    namespaceit.clearNamespace();
  });

  it('namespace object should have correct numeric property', function() {
    expect(A.number).toBe(1);
  });

  it('namespace object should have correct string property', function() {
    expect(A.string).toBe('string');
  });

  it('namespace object should have correct array property', function() {
    const expected = [1,2];
    A.array.forEach((el, idx) => {
      expect(el).toBe(expected[idx]);
    });
  });

  it('namespace object should have correct object basic property', function() {
    expect(A.object.hey).toBe('you');
  });

  it('namespace object should have correct object function property', function() {
    expect(A.object.fn()).toBe(1);
  });

  it('namespace object should have correct function statement property', function() {
    expect(A.functionStatement()).toBe('I\'m a function statement');
  });

  it('namespace object should have correct function expression property', function() {
    expect(A.functionExpression()).toBe('I\'m a function expression');
  });
});
