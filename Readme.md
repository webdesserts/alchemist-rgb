RGB
===

The official RGB color-space plugin for alchemist.js.

This RGB implementation uses sRGB companding. There are other forms
such as L\* and Gamma companding. If you would like to see these
implemented, post an issue on github and I'll try to work it in.

Usage
-----

### Node

By default alchemist-rgb is included in `alchemist.common`.

```js
  var alchemist = require('alchemist-js').create()
  alchemist.use(alchemist.common())
  var color = alchemize.rgb(255,255,255)
```

If you are not using alchemist.common you can instead use this library directly

```js
  var alchemist = require('alchemist-js').create()
  var rgb = require('alchemist-rgb')
  alchemist.use(rgb())
```

### Web

[coming soon]
