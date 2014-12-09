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
  var alchemist = require('alchemist-js')
  alchemist.use(alchemist.common())
  var color = alchemize.rgb(255,255,255)
```

If you are not using alchemist.common you can instead use this library directly

```js
  var alchemist = require('alchemist-js')
  var rgb = require('alchemist-rgb')
  alchemist.use(rgb())
```

### Web

[coming soon]

Special Thanks
--------------

Special thanks to Bruce Lindbloom not only for his color formulas
but for his color converter as well, both of which played a major
role in this module.

You can find his site here:
http://www.brucelindbloom.com/

Other than Bruce, many people and projects inspired alchemist as a whole. They
are listed here:

- [chroma.js](https://github.com/gka/chroma.js)
- [color-convert](https://github.com/harthur/color-convert)
- [colormine](https://github.com/colormine/colormine)
- [d3.js](https://github.com/mbostock/d3/wiki/Colors)
- and many more...

Thanks to all of you!
