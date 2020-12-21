# shell-argument-escape

# Use
```js
var escape = require('shell-argument-escape').escape

var argument = escape('test ~!@#$%^&*()_+')

console.log(argument)//test\ ~\!\@\#\$\%^&\*\(\)_+
```