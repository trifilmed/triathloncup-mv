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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__berechner__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__importer__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__repository__ = __webpack_require__(3);



var Main = /** @class */ (function () {
    function Main() {
    }
    Main.prototype.makeCupBerechnung = function () {
        var importer = new __WEBPACK_IMPORTED_MODULE_1__importer__["a" /* CSVErgebnisImporter */]();
        var repository = __WEBPACK_IMPORTED_MODULE_2__repository__["a" /* RepositoryFactory */].makeRepository('json');
        var wettkaempfe = repository.getWettkaempfe();
        // importiere ergebnisse falls noch nicht vorhanden
        for (var i = 0; i < wettkaempfe.length; i++) {
            var wettkampfErgebnis = void 0;
            var importer_1 = new __WEBPACK_IMPORTED_MODULE_1__importer__["a" /* CSVErgebnisImporter */]();
            if (!wettkaempfe[i].getErgebnis()) {
                var pfadZumCsvErgebnis = wettkaempfe[i].getName().toLocaleLowerCase().replace(' ', '_') + '.csv';
                wettkampfErgebnis = importer_1.import(pfadZumCsvErgebnis);
                wettkaempfe[i].setErgebnis(wettkampfErgebnis);
            }
        }
        var berechner = __WEBPACK_IMPORTED_MODULE_0__berechner__["a" /* BerechnerFactory */].makeBerechner(2017);
        var cupErgebnis = berechner.berechne(wettkaempfe);
    };
    return Main;
}());

var main = new Main();
main.makeCupBerechnung();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BerechnerFactory; });
/* unused harmony export Berechner2017 */
var BerechnerFactory = /** @class */ (function () {
    function BerechnerFactory() {
    }
    BerechnerFactory.makeBerechner = function (jahr) {
        if (jahr == 2017) {
            return new Berechner2017();
        }
        else {
            throw Error;
        }
    };
    return BerechnerFactory;
}());

var Berechner2017 = /** @class */ (function () {
    function Berechner2017() {
        this.punkteListe = [50, 40, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2];
        // private wettkampfpunkte()
    }
    Berechner2017.prototype.berechne = function (wettkaempfe) {
        for (var i = 0; i < wettkaempfe.length; i++) {
            var wettkampf = wettkaempfe[i];
            var ergebnis = wettkaempfe[i].getErgebnis();
            for (var _i = 0, ergebnis_1 = ergebnis; _i < ergebnis_1.length; _i++) {
                var ergebniseZeile = ergebnis_1[_i];
                var athlet = ergebniseZeile.getAthlet();
                var platzierung = ergebniseZeile.getAkPlatzierung();
                console.log(this.anzahlAthletenEinerAk(athlet.getAltersklasse(), wettkaempfe[i]));
            }
        }
    };
    Berechner2017.prototype.anzahlAthletenEinerAk = function (ak, wettkampf) {
        var athletenEinerAk = [];
        var ergebnis = wettkampf.getErgebnis();
        var anzahl = 0;
        for (var _i = 0, ergebnis_2 = ergebnis; _i < ergebnis_2.length; _i++) {
            var ergebniseZeile = ergebnis_2[_i];
            var athlet = ergebniseZeile.getAthlet();
            if (athlet.getAltersklasse() == ak) {
                anzahl++;
            }
        }
        return anzahl;
    };
    return Berechner2017;
}());



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CSVErgebnisImporter; });
var CSVErgebnisImporter = /** @class */ (function () {
    function CSVErgebnisImporter() {
    }
    CSVErgebnisImporter.prototype.import = function (source) {
    };
    return CSVErgebnisImporter;
}());



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RepositoryFactory; });
/* unused harmony export JSONRepository */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wettkampf__ = __webpack_require__(4);

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
            var wettkampf = new __WEBPACK_IMPORTED_MODULE_0__wettkampf__["a" /* KonkreterWettkampf */](jsonWettkaempfe[i].name, jsonWettkaempfe[i].landesmeisterschaft, jsonWettkaempfe[i].jahr);
            wettkaempfe.push(wettkampf);
        }
        return wettkaempfe;
    };
    return JSONRepository;
}());



/***/ }),
/* 4 */
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