'use strict';

const fs = require('fs');
const esprima = require('esprima');

class Namespaceit {
  constructor(namespace, arg) {
    this.namespace = namespace;
    this.arg = arg;
  }

  applyNamespace() {
    let body;
    const arg = this.arg,
          namespace = this.namespace;

    if (typeof arg === 'string') {
      const fileContents = fs.readFileSync(arg, "utf8");
      body = Namespaceit.getCodeBody(fileContents);
    }else {
      Namespaceit.validateFunctionAsArgument(arg, true);
      body = Namespaceit.getFunctionBody(arg);
    }

    const nn = global[namespace] = {};
    const bodyArr = body
      .split(';')
      .filter(el => !!el);

    bodyArr.forEach(el => {
      const tokens = esprima.tokenize(el);
      const identifier = tokens[1].value;
      let value;

      if (el.startsWith('function')) {
        const _body = Namespaceit.getFunctionBody(el);
        const params = esprima
          .parse(el)
          .body[0]
          .params;

        value = this.applyToConstructor(Function, params.concat([_body]));
      }else {
        value = tokens.splice(3).reduce((prev, curr) => {
          return prev + ' ' + curr.value;
        },'');
      }
      nn[identifier] = new Function('return ' + value)();
    });
  }

  static getFunctionBody(fn) {
    Namespaceit.validateFunctionAsArgument(fn);
    return Namespaceit.getCodeBody(
      fn
        .toString()
        .match(/function[^{]+\{([\s\S]*)\}$/)[1]
    );
  }

  static getCodeBody(arg) {
    return (
      arg
        .replace(/(\r\n|\n|\r|\s{2,})/g, '')
        .replace(/(function[^{]+{[^;]+);(\s*})/g,"$1$2")
    );
  }

  static validateFunctionAsArgument(fn, checkType) {
    if (!fn || checkType && typeof fn !== 'function') {
      throw new Error('Must provide a function!');
    }

    if (fn.toString().includes('=>')) {
      throw new Error('Use regular function syntax!');
    }
  }

  static couldBeReference(arg) {
    return (
      typeof arg !== 'string'
      && typeof arg !== 'number'
    );
  }

  applyToConstructor(constructor, argArray) {
      const args = [null].concat(argArray);
      const factoryFunction = constructor.bind.apply(constructor, args);
      return new factoryFunction();
  }

  clearNamespace() {
    delete global[this.namespace];
  }
}

module.exports = Namespaceit;
