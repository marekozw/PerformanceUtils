PerformanceUtils
================
by: marek.ozw@gmail.com

  This module is for measureing function performance.

  Usage:

  1. Create your simple watcher:
  
  var simpleWatcher = new PerformanceUtils.SimplePerformanceWatcher();

  If you do not want to see warnings about anonymous functions
  registration, pass configurations object with 'silent' property set to true:

  var simpleWatcher = new PerformanceUtils.SimplePerformanceWatcher({
    silent: true
  });

  Silent parameter is equal to false by default;

  2. Register a function to be measured:
  
  simpleWatcher.register(doSomething); // as a function
  simpleWatcher.register(myObject.doSomething); // as a method

  It is better to register non-anonymous functions so that your performance 
  output will contain function's name. If you need to use anonymous functions
  just pass an alias parameter:

  simpleWatcher.register(doSomething, 'My DoSometing() Method');

  In case you register non-anonymous function and pass an alias
  parameter anyway, alias always got bigger priority.

  3. Run your registered function:

  simpleWatcher.run();

  You can also pass an exact context, so that "this" inside registered
  function will point the myObject you want:

  simpleWatcher.register(myObject.doSomething);
  simpleWatcher.run(myObject);

  You can also pass an array of parameters of registered function
  as a second parameter of .run() function:

  simpleWatcher.register(myObject.doSomething);
  simpleWatcher.run(myObject, [parameter1, parameter2, ...]);

