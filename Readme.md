RGB
===

The official RGB color-space plugin for alchemist.js.

Usage
-----

### Node

By default alchemist-rgb is included in alchemist-common and consequently also
included in the bundled version of alchemist.js.

```js
  var alchemist = require('alchemist-js')
  alchemist.use(alchemist.common())
  var color = alchemize.rgb(255,255,255)
```

If you are not using alchemist.common you can instead use this library directly

```js
  var alchemist = require('alchemist-js')
  var rgb = require('alchemist-rgb')
  alchemist.use(rgb)
```

### Web

[coming soon]
