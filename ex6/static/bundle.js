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

/***/ "./ts/request.ts":
/*!***********************!*\
  !*** ./ts/request.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ reqDirs)\n/* harmony export */ });\n//reqDirs получает с сервера поддиректории и файлы root, отсортированные в порядке sortType\nfunction reqDirs(path, sortType, handler) {\n    let request = new XMLHttpRequest();\n    request.open('GET', `/subdirs?root=${path}&sort=${sortType}`);\n    request.onloadstart = () => {\n        let divDirs = document.getElementById(\"dirs\");\n        if (divDirs != null) {\n            divDirs.innerHTML = \"загрузка...\";\n        }\n    };\n    request.onload = () => {\n        if (request.status !== 200) {\n            return;\n        }\n        let response;\n        response = JSON.parse(request.response);\n        if (response.Status == 1) {\n            let divDirs = document.getElementById(\"dirs\");\n            if (divDirs != null) {\n                divDirs.innerHTML = response.ErrorText;\n            }\n            return;\n        }\n        handler(response);\n    };\n    request.onerror = () => {\n        alert(\"error\");\n    };\n    request.send();\n}\n\n\n//# sourceURL=webpack://ex6/./ts/request.ts?");

/***/ }),

/***/ "./ts/script.ts":
/*!**********************!*\
  !*** ./ts/script.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request */ \"./ts/request.ts\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ \"./ts/view.ts\");\n\n\nlet sort = \"asc\";\nlet root = \"/\";\n(0,_request__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(root, sort, _view__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\n\n//# sourceURL=webpack://ex6/./ts/script.ts?");

/***/ }),

/***/ "./ts/view.ts":
/*!********************!*\
  !*** ./ts/view.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ showDirs)\n/* harmony export */ });\n/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request */ \"./ts/request.ts\");\n\nlet root = \"/\";\nlet sort = \"asc\";\n//showDirs выводит директории и файлы из response\nfunction showDirs(response) {\n    let divDirs = document.getElementById(\"dirs\");\n    showHeader();\n    if (response.Dirs.length == 0) {\n        if (divDirs != null) {\n            divDirs.innerHTML = \"пусто\";\n        }\n        buttonCheck();\n        return;\n    }\n    if (divDirs != null) {\n        divDirs.innerHTML = \"\";\n        for (let dir of response.Dirs) {\n            let dirElem = document.createElement(\"button\");\n            dirElem.setAttribute(\"id\", `${dir.Path}/${dir.Name}`);\n            dirElem.setAttribute(\"class\", dir.Type);\n            let dirText = document.createTextNode(` ${dir.Name} | ${dir.Size.toFixed(3)} мб`);\n            dirElem.appendChild(dirText);\n            divDirs.appendChild(dirElem);\n            let br = document.createElement(\"br\");\n            divDirs.appendChild(br);\n        }\n        let timeElem = document.createElement(\"p\");\n        timeElem.setAttribute(\"id\", \"timetext\");\n        timeElem.appendChild(document.createTextNode(\"время подсчета: \" + response.Time));\n        divDirs.appendChild(timeElem);\n    }\n    buttonCheck();\n}\n//showHeader выводит кнопки возврата и сортировки\nfunction showHeader() {\n    let divHead = document.getElementById(\"header\");\n    if (divHead != null) {\n        divHead.innerHTML = \"\";\n        let backButton = document.createElement(\"button\");\n        backButton.setAttribute(\"id\", \"back\");\n        backButton.appendChild(document.createTextNode(\"назад\"));\n        divHead.appendChild(backButton);\n        let sortButton = document.createElement(\"button\");\n        sortButton.setAttribute(\"id\", \"sort\");\n        divHead.appendChild(sortButton);\n        let rootText = document.createElement(\"button\");\n        rootText.appendChild(document.createTextNode(root));\n        rootText.setAttribute(\"id\", \"roottext\");\n        divHead.appendChild(rootText);\n    }\n}\n//buttonCheck считывает нажатия на директории и кнопки возврата назад и сортировки\nfunction buttonCheck() {\n    let buttons = document.getElementsByClassName(\"dir\");\n    for (let i = 0; i < buttons.length; i++) {\n        let button = buttons[i];\n        button.addEventListener(\"click\", () => {\n            root = button.id;\n            (0,_request__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(root, sort, showDirs);\n        });\n    }\n    let backButton = document.getElementById(\"back\");\n    if (backButton != null) {\n        backButton.addEventListener(\"click\", () => {\n            if (root != \"/\") {\n                root = root.substring(0, root.lastIndexOf(\"/\"));\n                (0,_request__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(root, sort, showDirs);\n            }\n        });\n    }\n    let sortButton = document.getElementById(\"sort\");\n    if (sortButton != null) {\n        sortButton.addEventListener(\"click\", () => {\n            if (sort == \"asc\") {\n                sort = \"desc\";\n            }\n            else if (sort == \"desc\") {\n                sort = \"asc\";\n            }\n            (0,_request__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(root, sort, showDirs);\n        });\n    }\n}\n\n\n//# sourceURL=webpack://ex6/./ts/view.ts?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ts/script.ts");
/******/ 	
/******/ })()
;