# Namespace-It - Apply a namespace to any block of code contained inside a function, or in a javascript file.

## Overview of full workflow
Grab the scope variables of a function or a file.

<p>
  <img src="https://raw.githubusercontent.com/Nikhil22/namespace-it/blob/master/images/full-workflow.png">
</p>

## Usage - Step by Step
### Require the namespaceit module
```javascript
const NamespaceIt = require('namespaceit');
```

### Pick any function in your code block. For example...
```javascript
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
```
### Initialize a new namespaceit object
```javascript
const namespaceIt = new NamespaceIt('A', someFunction);
```

### Call applyNamespace method
```javascript
namespaceIt.applyNamespace();
```

### See the magic happen
```javascript
A.object.fn(); //1
A.array; //[1,2]
```

### Clear the namespace if you want
```javascript
namespaceIt.clearNamespace();
//A is no longer defined!
```

## Limitations
<ul>
  <li>Does not currently support arrow function syntax</li>
  <li>Code must be properly linted with semi colons after each line</li>
  <li>Functions with arguments are not yet supported</li>
  <li>Variable declared as a reference to another variable in scope is not yet supported</li>
</ul>

## Improvements
All points under <strong>Limitations</strong> are being worked on until they are no longer limitations. If this project excites you, feel free to submit a pull request.

## External Modules/libraries used
<ul>
  <li><strong>esprima</strong>: npm module for parsing</li>
  <li><strong>Jasmine</strong>: javascript framework for unit testing</li>
</ul>

### Author
Nikhil Bhaskar
