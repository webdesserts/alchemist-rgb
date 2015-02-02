(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["alchemist_rgb"] = factory();
	else
		root["alchemist_rgb"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

/*
 * Alchemist-rgb
 *
 * Author: Michael C. Mullins
 * License: MIT
 *
 * This RGB implementation uses sRGB companding. There are other forms
 * such as L* and Gamma companding. If you would like to see these
 * implemented, post an issue on github and I'll try to work it in.
 *
 * Special thanks to Bruce Lindbloom not only for his color formulas
 * but for his color converter as well, both of which played a major
 * role in this module.
 *
 * You can find his site here:
 * http://www.brucelindbloom.com/
 *
 */

module.exports = function rgb () {
  return function initializer (alchemist) {
    var inverseCompand = function inverseCompand (companded) {
      return (companded <= 0.04045) ? (companded / 12.92) : Math.pow((companded + 0.055) / 1.055, 2.4)
    }

    var compand = function compand (linear) {
      return (linear <= 0.0031308) ? (linear * 12.92) : (1.055 * Math.pow(linear, 1.0 / 2.4) - 0.055)
    }

    var determinant3x3 = function determinant3x3 (m) {
      var left_product, right_product, lr, lc, rr, rc;
      var size = 3
      var left_diags = 0
      var right_diags = 0

      for (var col = 0; col < size; col++) {
        left_product = 1;
        right_product = 1;
        for (var row = 0; row < size; row++) {
          lr = row
          rr = size - row - 1
          c = col + row
          if (c >= size) c -= size;
          left_product *= m[lr][c]
          right_product *= m[rr][c]
        }
        left_diags += left_product
        right_diags -= right_product
      }

      return left_diags + right_diags
    }

    var invert3x3 = function invert3x3 (m) {
      var im = [[], [], []]
      var scale = 1 / determinant3x3(m);

      im[0][0] =  scale * (m[2][2] * m[1][1] - m[2][1] * m[1][2]);
      im[0][1] = -scale * (m[2][2] * m[0][1] - m[2][1] * m[0][2]);
      im[0][2] =  scale * (m[1][2] * m[0][1] - m[1][1] * m[0][2]);

      im[1][0] = -scale * (m[2][2] * m[1][0] - m[2][0] * m[1][2]);
      im[1][1] =  scale * (m[2][2] * m[0][0] - m[2][0] * m[0][2]);
      im[1][2] = -scale * (m[1][2] * m[0][0] - m[1][0] * m[0][2]);

      im[2][0] =  scale * (m[2][1] * m[1][0] - m[2][0] * m[1][1]);
      im[2][1] = -scale * (m[2][1] * m[0][0] - m[2][0] * m[0][1]);
      im[2][2] =  scale * (m[1][1] * m[0][0] - m[1][0] * m[0][1]);

      return im
    }

    var transformationMatrix = function computeMatrix (r, g, b, white) {
      var m = [
        [r.x / r.y, g.x / g.y, b.x / b.y],
        [1.0, 1.0, 1.0],
        [(1 - r.x - r.y) / r.y, (1 - g.x - g.y) / g.y, (1 - b.x - b.y) / b.y]
      ]
      var mi = invert3x3(m)

      var sr = white.X * mi[0][0] + white.Y * mi[0][1] + white.Z * mi[0][2];
      var sg = white.X * mi[1][0] + white.Y * mi[1][1] + white.Z * mi[1][2];
      var sb = white.X * mi[2][0] + white.Y * mi[2][1] + white.Z * mi[2][2];

      m[0][0] *= sr;
      m[0][1] *= sg;
      m[0][2] *= sb;

      m[1][0] *= sr;
      m[1][1] *= sg;
      m[1][2] *= sb;

      m[2][0] *= sr;
      m[2][1] *= sg;
      m[2][2] *= sb;

      return m
    }

    // chromacity cooridinates
    var rc = { x: 0.64, y: 0.33 }
    var gc = { x: 0.30, y: 0.60 }
    var bc = { x: 0.15, y: 0.06 }

    var m = transformationMatrix(rc, gc, bc, alchemist.white)
    var im = invert3x3(m)

    return {
      name: 'rgb',
      limits: {
        max: [255, 255, 255],
        min: [0, 0, 0]
      },
      to: { 'xyz': function (R, G, B) {
        var r = inverseCompand(R / 255)
        var g = inverseCompand(G / 255)
        var b = inverseCompand(B / 255)
        var X = r * m[0][0] + g * m[0][1] + b * m[0][2]
        var Y = r * m[1][0] + g * m[1][1] + b * m[1][2]
        var Z = r * m[2][0] + g * m[2][1] + b * m[2][2]
        return [X, Y, Z]
      } },
      from: { 'xyz': function (X, Y, Z) {
        var R = compand(X * im[0][0] + Y * im[0][1] + Z * im[0][2]) * 255
        var G = compand(X * im[1][0] + Y * im[1][1] + Z * im[1][2]) * 255
        var B = compand(X * im[2][0] + Y * im[2][1] + Z * im[2][2]) * 255
        return [R, G, B]
      } }
    }
  }
}


/***/ }
/******/ ])
});
