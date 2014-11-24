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

var inverseCompand = function inverseCompand (companded) {
  return (companded <= 0.04045) ? (companded / 12.92) : Math.pow((companded + 0.055) / 1.055, 2.4)
}

var compand = function compand (linear) {
  return (linear <= 0.0031308) ? (linear * 12.92) : (1.055 * Math.pow(linear, 1.0 / 2.4) - 0.055)
}

module.exports = function rgb () {
  return {
    name: 'rgb',
    to: { 'xyz': function (R, G, B) {
      var r = inverseCompand(R / 255)
      var g = inverseCompand(G / 255)
      var b = inverseCompand(B / 255)
      var X = r * 0.4124564 + g * 0.3575761 + b * 0.1804375
      var Y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750
      var Z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041
      return [X, Y, Z]
    } },
    from: { 'xyz': function (X, Y, Z) {
      var R = compand(X *  3.2404542 + Y * -1.5371385 + Z * -0.4985314) * 255
      var G = compand(X * -0.9692660 + Y *  1.8760108 + Z * 0.0415560) * 255
      var B = compand(X *  0.0556434 + Y * -0.2040259 + Z * 1.0572252) * 255
      return [R, G, B]
    } }
  }
}


/***/ }
/******/ ])
});