/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Main", function() { return Main; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__importer__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__repository__ = __webpack_require__(2);


var Main = /** @class */ (function () {
    function Main() {
    }
    Main.prototype.makeCupBerechnung = function () {
        var importer = new __WEBPACK_IMPORTED_MODULE_0__importer__["a" /* CSVErgebnisImporter */]();
        var repository = __WEBPACK_IMPORTED_MODULE_1__repository__["a" /* RepositoryFactory */].makeRepository('json');
        var wettkaempfe = repository.getWettkaempfe();
        console.log(wettkaempfe);
    };
    return Main;
}());

var main = new Main();
main.makeCupBerechnung();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CSVErgebnisImporter; });
var CSVErgebnisImporter = /** @class */ (function () {
    function CSVErgebnisImporter() {
    }
    CSVErgebnisImporter.prototype.import = function (source) {
        // create all the elements from csv
    };
    return CSVErgebnisImporter;
}());



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RepositoryFactory; });
/* unused harmony export JSONRepository */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wettkampf__ = __webpack_require__(3);

var RepositoryFactory = /** @class */ (function () {
    function RepositoryFactory() {
    }
    RepositoryFactory.makeRepository = function (storageType) {
        if (storageType == 'json') {
            return new JSONRepository();
        }
    };
    return RepositoryFactory;
}());

var JSONRepository = /** @class */ (function () {
    function JSONRepository() {
    }
    JSONRepository.prototype.getWettkaempfe = function () {
        var jsonWettkaempfe = [
            {
                "name": "Güstrower Triathlon",
                "landesmeisterschaft": false,
                "jahr": 2017
            },
            {
                "name": "Warener Triathlon",
                "landesmeisterschaft": false,
                "jahr": 2017
            },
            {
                "name": "Rostocker Triathlon",
                "landesmeisterschaft": true,
                "jahr": 2017
            }
        ];
        var wettkaempfe = [];
        for (var i = 0; i < jsonWettkaempfe.length; i++) {
            console.log(i);
            var wettkampf = new __WEBPACK_IMPORTED_MODULE_0__wettkampf__["a" /* KonkreterWettkampf */](jsonWettkaempfe[i].name, jsonWettkaempfe[i].landesmeisterschaft, jsonWettkaempfe[i].jahr);
            wettkaempfe.push(wettkampf);
        }
        return wettkaempfe;
    };
    return JSONRepository;
}());



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KonkreterWettkampf; });
var KonkreterWettkampf = /** @class */ (function () {
    function KonkreterWettkampf(name, landesmeisterschaft, jahr) {
        this.name = name;
        this.landesmeisterschaft = landesmeisterschaft;
        this.jahr = jahr;
        this.ergebnis = null;
    }
    KonkreterWettkampf.prototype.setName = function (name) {
        this.name = name;
    };
    KonkreterWettkampf.prototype.setLandesmeisterschaft = function (landesmeisterschaft) {
        this.landesmeisterschaft = landesmeisterschaft;
    };
    KonkreterWettkampf.prototype.setJahr = function (jahr) {
        this.jahr = jahr;
    };
    KonkreterWettkampf.prototype.setErgebnis = function (ergebnis) {
        this.ergebnis = ergebnis;
    };
    KonkreterWettkampf.prototype.getName = function () {
        return this.name;
    };
    KonkreterWettkampf.prototype.getLandesmeisterschaft = function () {
        return this.landesmeisterschaft;
    };
    KonkreterWettkampf.prototype.getJahr = function () {
        return this.jahr;
    };
    KonkreterWettkampf.prototype.getErgebnis = function () {
        return this.ergebnis;
    };
    return KonkreterWettkampf;
}());



/***/ })
/******/ ]);