/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../src/libs/api-gateway.ts":
/*!****************************************!*\
  !*** ../../../src/libs/api-gateway.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatJSONResponse": () => (/* binding */ formatJSONResponse)
/* harmony export */ });
const formatJSONResponse = (response) => {
    return {
        statusCode: 200,
        body: JSON.stringify(response)
    };
};


/***/ }),

/***/ "../../../src/libs/lambda.ts":
/*!***********************************!*\
  !*** ../../../src/libs/lambda.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "middyfy": () => (/* binding */ middyfy)
/* harmony export */ });
/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @middy/core */ "../../@middy/core/index.js");
/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_middy_core__WEBPACK_IMPORTED_MODULE_0__);

const middyfy = (handler) => {
    return _middy_core__WEBPACK_IMPORTED_MODULE_0___default()(handler);
};


/***/ }),

/***/ "../../../src/model/index.ts":
/*!***********************************!*\
  !*** ../../../src/model/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-sdk */ "aws-sdk");
/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_0__);

const dynamoDBClient = () => {
    if (process.env.IS_OFFLINE) {
        return new aws_sdk__WEBPACK_IMPORTED_MODULE_0__.DynamoDB.DocumentClient({
            region: process.env.dynamodbRegion,
            endpoint: process.env.dynamodbEndpoint,
        });
    }
    return new aws_sdk__WEBPACK_IMPORTED_MODULE_0__.DynamoDB.DocumentClient();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dynamoDBClient);


/***/ }),

/***/ "../../../src/services/badgesService.ts":
/*!**********************************************!*\
  !*** ../../../src/services/badgesService.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ badgesService)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class badgesService {
    constructor(docClient) {
        this.docClient = docClient;
        this.Tablename = "BadgesTable";
    }
    getAllBadges() {
        return __awaiter(this, void 0, void 0, function* () {
            const badges = yield this.docClient.scan({
                TableName: this.Tablename,
            }).promise();
            return badges.Items;
        });
    }
    createBadges(badges) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.docClient.put({
                TableName: this.Tablename,
                Item: badges
            }).promise();
            return badges;
        });
    }
    getBadges(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const badges = yield this.docClient.get({
                TableName: this.Tablename,
                Key: {
                    badgesId: id
                }
            }).promise();
            if (!badges.Item) {
                throw new Error("Id does not exit");
            }
            return badges.Item;
        });
    }
    updateBadges(id, badges) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield this.docClient
                .update({
                TableName: this.Tablename,
                Key: { badgesId: id },
                UpdateExpression: "set badgeTitle = :bt, badgeImage = :bi, badgeStatus = :bs, isAdmin: :iA",
                ExpressionAttributeValues: {
                    ":bt": badges.badgeTitle,
                    ":bi": badges.badgeImage,
                    ":bs": badges.badgeStatus,
                    ":iA": badges.isAdmin
                },
                ReturnValues: "ALL_NEW",
            })
                .promise();
            return updated.Attributes;
        });
    }
    deleteBadges(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.docClient.delete({
                TableName: this.Tablename,
                Key: {
                    BadgesId: id
                }
            }).promise();
        });
    }
}


/***/ }),

/***/ "../../../src/services/index.ts":
/*!**************************************!*\
  !*** ../../../src/services/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model */ "../../../src/model/index.ts");
/* harmony import */ var _badgesService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./badgesService */ "../../../src/services/badgesService.ts");


const badgesService = new _badgesService__WEBPACK_IMPORTED_MODULE_1__["default"]((0,_model__WEBPACK_IMPORTED_MODULE_0__["default"])());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (badgesService);


/***/ }),

/***/ "../../uuid/dist/esm-node/regex.js":
/*!*****************************************!*\
  !*** ../../uuid/dist/esm-node/regex.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "../../uuid/dist/esm-node/rng.js":
/*!***************************************!*\
  !*** ../../uuid/dist/esm-node/rng.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    crypto__WEBPACK_IMPORTED_MODULE_0___default().randomFillSync(rnds8Pool);
    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

/***/ }),

/***/ "../../uuid/dist/esm-node/stringify.js":
/*!*********************************************!*\
  !*** ../../uuid/dist/esm-node/stringify.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "../../uuid/dist/esm-node/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "../../uuid/dist/esm-node/v4.js":
/*!**************************************!*\
  !*** ../../uuid/dist/esm-node/v4.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "../../uuid/dist/esm-node/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "../../uuid/dist/esm-node/stringify.js");



function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "../../uuid/dist/esm-node/validate.js":
/*!********************************************!*\
  !*** ../../uuid/dist/esm-node/validate.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "../../uuid/dist/esm-node/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("aws-sdk");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "../../@middy/core/index.js":
/*!**********************************!*\
  !*** ../../@middy/core/index.js ***!
  \**********************************/
/***/ ((module) => {



const middy = (baseHandler = () => {}, plugin) => {
  var _plugin$beforePrefetc;

  plugin === null || plugin === void 0 ? void 0 : (_plugin$beforePrefetc = plugin.beforePrefetch) === null || _plugin$beforePrefetc === void 0 ? void 0 : _plugin$beforePrefetc.call(plugin);
  const beforeMiddlewares = [];
  const afterMiddlewares = [];
  const onErrorMiddlewares = [];

  const instance = (event = {}, context = {}) => {
    var _plugin$requestStart;

    plugin === null || plugin === void 0 ? void 0 : (_plugin$requestStart = plugin.requestStart) === null || _plugin$requestStart === void 0 ? void 0 : _plugin$requestStart.call(plugin);
    const request = {
      event,
      context,
      response: undefined,
      error: undefined,
      internal: {}
    };
    return runRequest(request, [...beforeMiddlewares], baseHandler, [...afterMiddlewares], [...onErrorMiddlewares], plugin);
  };

  instance.use = middlewares => {
    if (Array.isArray(middlewares)) {
      for (const middleware of middlewares) {
        instance.applyMiddleware(middleware);
      }

      return instance;
    }

    return instance.applyMiddleware(middlewares);
  };

  instance.applyMiddleware = middleware => {
    const {
      before,
      after,
      onError
    } = middleware;

    if (!before && !after && !onError) {
      throw new Error('Middleware must be an object containing at least one key among "before", "after", "onError"');
    }

    if (before) instance.before(before);
    if (after) instance.after(after);
    if (onError) instance.onError(onError);
    return instance;
  }; // Inline Middlewares


  instance.before = beforeMiddleware => {
    beforeMiddlewares.push(beforeMiddleware);
    return instance;
  };

  instance.after = afterMiddleware => {
    afterMiddlewares.unshift(afterMiddleware);
    return instance;
  };

  instance.onError = onErrorMiddleware => {
    onErrorMiddlewares.push(onErrorMiddleware);
    return instance;
  };

  instance.__middlewares = {
    before: beforeMiddlewares,
    after: afterMiddlewares,
    onError: onErrorMiddlewares
  };
  return instance;
};

const runRequest = async (request, beforeMiddlewares, baseHandler, afterMiddlewares, onErrorMiddlewares, plugin) => {
  try {
    await runMiddlewares(request, beforeMiddlewares, plugin); // Check if before stack hasn't exit early

    if (request.response === undefined) {
      var _plugin$beforeHandler, _plugin$afterHandler;

      plugin === null || plugin === void 0 ? void 0 : (_plugin$beforeHandler = plugin.beforeHandler) === null || _plugin$beforeHandler === void 0 ? void 0 : _plugin$beforeHandler.call(plugin);
      request.response = await baseHandler(request.event, request.context);
      plugin === null || plugin === void 0 ? void 0 : (_plugin$afterHandler = plugin.afterHandler) === null || _plugin$afterHandler === void 0 ? void 0 : _plugin$afterHandler.call(plugin);
      await runMiddlewares(request, afterMiddlewares, plugin);
    }
  } catch (e) {
    // Reset response changes made by after stack before error thrown
    request.response = undefined;
    request.error = e;

    try {
      await runMiddlewares(request, onErrorMiddlewares, plugin);
    } catch (e) {
      // Save error that wasn't handled
      e.originalError = request.error;
      request.error = e;
      throw request.error;
    } // Catch if onError stack hasn't handled the error


    if (request.response === undefined) throw request.error;
  } finally {
    var _plugin$requestEnd;

    await (plugin === null || plugin === void 0 ? void 0 : (_plugin$requestEnd = plugin.requestEnd) === null || _plugin$requestEnd === void 0 ? void 0 : _plugin$requestEnd.call(plugin, request));
  }

  return request.response;
};

const runMiddlewares = async (request, middlewares, plugin) => {
  for (const nextMiddleware of middlewares) {
    var _plugin$beforeMiddlew, _plugin$afterMiddlewa;

    plugin === null || plugin === void 0 ? void 0 : (_plugin$beforeMiddlew = plugin.beforeMiddleware) === null || _plugin$beforeMiddlew === void 0 ? void 0 : _plugin$beforeMiddlew.call(plugin, nextMiddleware === null || nextMiddleware === void 0 ? void 0 : nextMiddleware.name);
    const res = await (nextMiddleware === null || nextMiddleware === void 0 ? void 0 : nextMiddleware(request));
    plugin === null || plugin === void 0 ? void 0 : (_plugin$afterMiddlewa = plugin.afterMiddleware) === null || _plugin$afterMiddlewa === void 0 ? void 0 : _plugin$afterMiddlewa.call(plugin, nextMiddleware === null || nextMiddleware === void 0 ? void 0 : nextMiddleware.name); // short circuit chaining and respond early

    if (res !== undefined) {
      request.response = res;
      return;
    }
  }
};

module.exports = middy;


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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************************************!*\
  !*** ../../../src/functions/badges/handler.ts ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAllBadges": () => (/* binding */ getAllBadges),
/* harmony export */   "createBadges": () => (/* binding */ createBadges),
/* harmony export */   "getBadges": () => (/* binding */ getBadges),
/* harmony export */   "updateBadges": () => (/* binding */ updateBadges),
/* harmony export */   "deleteBadges": () => (/* binding */ deleteBadges)
/* harmony export */ });
/* harmony import */ var _libs_api_gateway__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @libs/api-gateway */ "../../../src/libs/api-gateway.ts");
/* harmony import */ var _libs_lambda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @libs/lambda */ "../../../src/libs/lambda.ts");
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/index */ "../../../src/services/index.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "../../uuid/dist/esm-node/v4.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




const getAllBadges = (0,_libs_lambda__WEBPACK_IMPORTED_MODULE_1__.middyfy)(() => __awaiter(void 0, void 0, void 0, function* () {
    const badges = yield _services_index__WEBPACK_IMPORTED_MODULE_2__["default"].getAllBadges();
    return (0,_libs_api_gateway__WEBPACK_IMPORTED_MODULE_0__.formatJSONResponse)({
        badges
    });
}));
const createBadges = (0,_libs_lambda__WEBPACK_IMPORTED_MODULE_1__.middyfy)((event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0,uuid__WEBPACK_IMPORTED_MODULE_3__["default"])();
        const parsedBody = JSON.parse(event.body);
        const badges = yield _services_index__WEBPACK_IMPORTED_MODULE_2__["default"].createBadges({
            badgesId: id,
            badgeTitle: parsedBody === null || parsedBody === void 0 ? void 0 : parsedBody.title,
            badgeImage: parsedBody === null || parsedBody === void 0 ? void 0 : parsedBody.image,
            badgeStatus: parsedBody === null || parsedBody === void 0 ? void 0 : parsedBody.status,
            isAdmin: true
        });
        return (0,_libs_api_gateway__WEBPACK_IMPORTED_MODULE_0__.formatJSONResponse)({
            badges
        });
    }
    catch (e) {
        return (0,_libs_api_gateway__WEBPACK_IMPORTED_MODULE_0__.formatJSONResponse)({
            status: 500,
            message: e
        });
    }
}));
const getBadges = (0,_libs_lambda__WEBPACK_IMPORTED_MODULE_1__.middyfy)((event) => __awaiter(void 0, void 0, void 0, function* () {
    const id = event.pathParameters.id;
    try {
        const badges = yield _services_index__WEBPACK_IMPORTED_MODULE_2__["default"].getBadges(id);
        return (0,_libs_api_gateway__WEBPACK_IMPORTED_MODULE_0__.formatJSONResponse)({
            badges, id
        });
    }
    catch (e) {
        return (0,_libs_api_gateway__WEBPACK_IMPORTED_MODULE_0__.formatJSONResponse)({
            status: 500,
            message: e
        });
    }
}));
const updateBadges = (0,_libs_lambda__WEBPACK_IMPORTED_MODULE_1__.middyfy)((event) => __awaiter(void 0, void 0, void 0, function* () {
    const id = event.pathParameters.id;
    const parsedBody = JSON.parse(event.body || '');
    try {
        const badges = yield _services_index__WEBPACK_IMPORTED_MODULE_2__["default"].updateBadges(id, {
            badgeTitle: parsedBody === null || parsedBody === void 0 ? void 0 : parsedBody.title,
            badgeImage: parsedBody === null || parsedBody === void 0 ? void 0 : parsedBody.image,
            badgeStatus: parsedBody === null || parsedBody === void 0 ? void 0 : parsedBody.status,
            isAdmin: true
        });
        return (0,_libs_api_gateway__WEBPACK_IMPORTED_MODULE_0__.formatJSONResponse)({
            badges, id
        });
    }
    catch (e) {
        return (0,_libs_api_gateway__WEBPACK_IMPORTED_MODULE_0__.formatJSONResponse)({
            status: 500,
            message: e
        });
    }
}));
const deleteBadges = (0,_libs_lambda__WEBPACK_IMPORTED_MODULE_1__.middyfy)((event) => __awaiter(void 0, void 0, void 0, function* () {
    const id = event.pathParameters.id;
    try {
        const badges = yield _services_index__WEBPACK_IMPORTED_MODULE_2__["default"].deleteBadges(id);
        return (0,_libs_api_gateway__WEBPACK_IMPORTED_MODULE_0__.formatJSONResponse)({
            badges, id
        });
    }
    catch (e) {
        return (0,_libs_api_gateway__WEBPACK_IMPORTED_MODULE_0__.formatJSONResponse)({
            status: 500,
            message: e
        });
    }
}));

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=handler.js.map