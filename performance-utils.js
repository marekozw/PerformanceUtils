(function (window, undefined) {
  var PerformanceUtils = window.PerformanceUtils || {};

  var errors = (function () {
    var NotAFunctionError = function (message) {
      this.name = "Not A Function Error"
      this.message = message;
    };
    var FunctionNotRegisteredError = function (message) {
      this.name = "Function Not Registered"
      this.message = message;
    };
    NotAFunctionError.prototype = new Error();
    FunctionNotRegisteredError.prototype = new Error();

    return {
      NotAFunctionError: NotAFunctionError,
      FunctionNotRegisteredError: FunctionNotRegisteredError
    };
  })();

  var assets = {
    ANONYMOUS_FUNCTION_WARN: 'Make sure to register non-anonymous function or add an alias for celarer performance output.',
    ANONYMOUS_FUNCTION_TRACE: 'Registered function is anonymous.',
    FUNCTION_NOT_REGISTERED: 'Use .register() method before using .run()'
  };

  PerformanceUtils.SimplePerformanceWatcher = function (options) {
    var MODULE_NAME = 'PerformanceUtils.SimplePerformanceWatcher';

    var _options = options || {},
      _silent = _options.silent || false,
      _fn = null,
      _alias = null;

    var measureFunctionPerformance = function (fn, context, args) {
      var startTime = new Date().getTime();
      fn.apply(context, args);
      return new Date().getTime() - startTime;
    };
    var registerFunction = function (fn, alias) {
      if (typeof fn !== 'function') {
        throw new errors.NotAFunctionError(fn + ' must be a function');
      }
      if (!_silent && !fn.name && !alias) {
        console.warn(MODULE_NAME, '\n' + assets.ANONYMOUS_FUNCTION_WARN);
        console.trace(MODULE_NAME, '\n' + assets.ANONYMOUS_FUNCTION_TRACE);
      }
      _fn = fn;
      _alias = alias;
    }

    var runFunction = function (context, args) {
      if (!_fn) {
        throw new errors.FunctionNotRegisteredError(assets.FUNCTION_NOT_REGISTERED);
      }
      var functionName = _alias || _fn.name || '[anonymous]',
        context = context || null,
        time = measureFunctionPerformance(_fn, context, args);
      console.log('function ' + functionName + ': ' + time + 'ms');
    }

    return {
      register: registerFunction,
      run: runFunction
    };
  }

  window.PerformanceUtils = PerformanceUtils;
})(window);
