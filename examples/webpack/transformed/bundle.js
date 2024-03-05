/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/decorators.ts":
/*!***************************!*\
  !*** ./src/decorators.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Inject = exports.Service = void 0;\nfunction Service(params) {\n    return function (target) { };\n}\nexports.Service = Service;\nfunction Inject(params) {\n    return function (target, propertyKey, parameterIndex) { };\n}\nexports.Inject = Inject;\n\n\n//# sourceURL=webpack:///./src/decorators.ts?");

/***/ }),

/***/ "./src/source.ts":
/*!***********************!*\
  !*** ./src/source.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst decorators_1 = __webpack_require__(/*! ./decorators */ \"./src/decorators.ts\");\nlet MyOtherService = class MyOtherService {\n    constructor(myService) {\n        this.myService = myService;\n    }\n};\nMyOtherService = __decorate([\n    (0, decorators_1.Service)(),\n    __param(0, (0, decorators_1.Inject)())\n], MyOtherService);\nlet MyThirdServiceWithWrongInjectType = class MyThirdServiceWithWrongInjectType {\n    constructor(myService) {\n        this.myService = myService;\n    }\n};\nMyThirdServiceWithWrongInjectType = __decorate([\n    (0, decorators_1.Service)(),\n    __param(0, (0, decorators_1.Inject)({ name: \"MyService\" }))\n], MyThirdServiceWithWrongInjectType);\n\n\n//# sourceURL=webpack:///./src/source.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/source.ts");
/******/ 	
/******/ })()
;