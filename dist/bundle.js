/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Dashboard {
  constructor() {
    this.travelerOBJ = {};
    this.userID = 0;
    this.userName = "";
    this.userType = "";
    this.destinationID = [];
    this.travelers = [];
    this.date = [];
    this.duration = [];
    this.status = [];
    this.suggestedActivities = [];
    this.destination = [];
    this.estimatedLodgingCostPerDay = [];
    this.estimatedFlightCostPerPerson = [];
    this.image = [];
    this.alt = [];
    this.approvedTrips = []
    this.pendingTrips = []
  }

  loadUser(inUserID, inObj) {
    const result = inObj.travelers.filter((traveler) => {
      if (traveler.id == inUserID) {
        this.userID = inUserID;
        this.userName = traveler.name;
        this.userType = traveler.travelerType;
      }
    });
    return result;
  }

  loadUserTest(inUserID, inObj) {
    const result = inObj.travelers.filter((traveler) => {
      return traveler.id == inUserID;
    });

    if (result.length > 0) {
      this.userID = inUserID;
      this.userName = result[0].name;
      this.userType = result[0].travelerType;
    }

    return result;
  }

  sortTripsByDate() {
    const today = new Date().toISOString().split('T')[0].replace("-","/").replace("-","/");
    this.pastDates = this.approvedTrips.filter(date => date < today)
    .sort((a,b) => new Date(b) - new Date(a))
    
    this.futureDates =this.approvedTrips.filter(date => date > today || date === today)
    .sort((a,b) => new Date(a) - new Date(b))
    // console.log(today)
  }

  sortTripsByStatus(){
    const result = this.date.forEach((date,i) => {
        if(this.status[i] === "approved"){
            this.approvedTrips.push(date)
        }else if(this.status[i] === "pending") {
            this.pendingTrips.push(date)
        } else {
            console.log(`Approval Check Error on customer date:${i}`)
        }
    }) 
    this.status
  }
    
  loadUserTrips(inObj) {
    const result = inObj.trips.forEach((trip) => {
      //console.log(trip.userID === this.userID)
      if (trip.userID === this.userID) {
        this.destinationID.push(trip.destinationID);
        this.travelers.push(trip.travelers);
        this.date.push(trip.date);
        this.duration.push(trip.duration);
        this.status.push(trip.status);
        this.suggestedActivities.push(trip.suggestedActivities);
      }
    });
    return result;
  }

  loadUserTripsTest(tripsData) {
    const userTrips = tripsData.trips.filter((trip) => trip.userID === this.userId);

      this.destinationID = userTrips.map((trip) => trip.destinationID);
      this.travelers = userTrips.map((trip) => trip.travelers);
      this.date = userTrips.map((trip) => trip.date);
      this.duration = userTrips.map((trip) => trip.duration);
      this.status = userTrips.map((trip) => trip.status);
      this.suggestedActivities = userTrips.map((trip) => trip.suggestedActivities);
  }

  loadUserDestinations(inObj) {
    const result0 = this.destinationID.forEach((destinationID) => {
      const result1 = inObj.destinations.forEach((destination) => {
        //console.log(destination.id === destinationID)
        if (destination.id === destinationID) {
          this.destination.push(destination.destination);
          this.estimatedLodgingCostPerDay.push(destination.estimatedLodgingCostPerDay);
          this.estimatedFlightCostPerPerson.push(destination.estimatedFlightCostPerPerson);
          this.image.push(destination.image);
          this.alt.push(destination.alt);
        }
      });
    });
  }

  loadUserDestinationsTest(inObj) {
    this.destination = [];
    this.estimatedLodgingCostPerDay = [];
    this.estimatedFlightCostPerPerson = [];
    this.image = [];
    this.alt = [];
    this.destinationID.forEach((destinationID) => {
      const destination = inObj.destinations.find(dest => dest.id === destinationID);
      if (destination) {
        this.destination.push(destination.destination);
        this.estimatedLodgingCostPerDay.push(destination.estimatedLodgingCostPerDay);
        this.estimatedFlightCostPerPerson.push(destination.estimatedFlightCostPerPerson);
        this.image.push(destination.image);
        this.alt.push(destination.alt);
      }
    });
  }
  
    makeDateTable() {
        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = '<th>Destination|</th><th>Past Dates|</th><th>Upcoming Dates|</th><th>Pending Dates|</th>';
        table.appendChild(headerRow);
        // Loop through each date and create a row with the corresponding name
        this.date.forEach((date, i) => {
          const name = this.destination[i].split(",")[0] ? this.destination[i].split(",")[0]  : '';
          const pastDate = this.pastDates.includes(date) ? date : '';
          const presentDate = this.futureDates.includes(date) ? date : '';
          const futureDate = this.pendingTrips.includes(date) ? date : '';
          const row = document.createElement('tr');
          row.innerHTML = `<td>${name}</td><td>${pastDate}</td><td>${presentDate}</td><td>${futureDate}</td>`;
          table.appendChild(row);
      });
        document.getElementById('date-table').appendChild(table);
    }

    calculateTotalSpent() {
        this.totalCosts = this.travelers.map((num, index) => (num * this.estimatedFlightCostPerPerson[index]) + (this.estimatedLodgingCostPerDay[index] * this.duration[index]))
        .reduce((acc, val)=> acc + val,0)
        this.agentFees = this.totalCosts * 0.10;
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dashboard);

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Booking{
    constructor() {
        this.userID = 0;
        this.destinationID = [];
        this.destination = [];
        this.estimatedLodgingCostPerDay = [];
        this.estimatedFlightCostPerPerson = [];
        this.image = [];
        this.alt = [];
    }

    loadData(userID,inObj1,inObj2){
        this.userID = userID;
        inObj1.destinations.forEach(dest => {
            this.destinationID.push(dest.id); 
            this.destination.push(dest.destination);
            this.estimatedLodgingCostPerDay.push(dest.estimatedLodgingCostPerDay); 
            this.estimatedFlightCostPerPerson.push(dest.estimatedFlightCostPerPerson); 
            this.image.push(dest.image); 
            this.alt.push(dest.alt); 
        });
            this.numOfTrips = inObj2.trips.length
    }

    createBookingObj(userID, destinationID, travelers, date, duration) {
        const bookingObj = {
            'id': this.numOfTrips + 1,
            'userID': userID,
            'destinationID': destinationID, 
            'travelers': travelers,
            'date': date,
            'duration': duration,
            'status': 'pending',
            'suggestedActivities': []
        }
        this.showAlert
        return bookingObj     
    }
}
    
    

//date, duration, number of travelers and choose from a list of destinations
//User Input :date , duration, travelers,Destination
//User Sees:
//3 Input Selection Boxes to input the desired trip schedule with a selectable list of Destinations and a submit button  

// test for all for selection items to contain data with .contains  

//After making these selections, I should see an estimated cost (with a 10% travel agent fee) for the trip.

// upon clicking book button you will see a Popup message alert to signify the booking was processed only if the server responds according if not it will say try again later

//Once I submit the trip request, it will show on my dashboard as “pending” so that the travel agency can approve or deny it.

//
/*
{
    id: <number>,
    userID: <number>,
    destinationID: <number>,
    travelers: <number>,
    date: <string 'YYYY/MM/DD'>,
    duration: <number>,
    status: <string 'approved' or 'pending'>,
    suggestedActivities: <array of strings>
}
*/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Booking);

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Api {
    //Create a reference to the API class
    //Set the Base Url from the argument
    constructor(inUrl) {
        this.url = inUrl;
    }
    //Retrieve Data from a given endpoint
   
    fetchData = (url) => {
        return fetch(url)
        .then(response => response.json())
        };
     
    fetchAll = () => {
        return Promise.all([
        this.fetchData('http://localhost:3001/api/v1/travelers'),
        this.fetchData('http://localhost:3001/api/v1/trips'),
        this.fetchData('http://localhost:3001/api/v1/destinations'),
        ]);
    } 
  
    //Post an JSON Object to the Base URL using the given Endpoint and OBJ 
    /*  const data = { name: 'John Doe', email: 'johndoe@example.com' };
        postObj('travelers', data)
        .then(result => console.log(result))
        .catch(error => console.error(error));
    */
    
    postObj(endpoint, data){
        console.log(this.url + endpoint)
        fetch(this.url + endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
            
            }).then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error(error));

        };

    //Delete Trip By ID 
    deleteTrip(tripID){
        postResult = (endpoint, data) => {
            return fetch(this.url + trips, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              
            })
              .then(response => response.json())
              .then(data => console.log(data))
              .catch(error => console.error(error));
          };
        return postResult;
    }
    
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Api);


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()((_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1___default()), options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1___default().locals) || {});

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 6 */
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/css-loader/dist/cjs.js):\nError: Can't resolve '/dist/images/resizedmain.jpg' in '/Users/joshuamartin/turing_work/2mod/TravelTracker/JoshTravelTracker/src/css'\n    at finishWithoutResolve (/Users/joshuamartin/turing_work/2mod/TravelTracker/JoshTravelTracker/node_modules/enhanced-resolve/lib/Resolver.js:293:18)\n    at /Users/joshuamartin/turing_work/2mod/TravelTracker/JoshTravelTracker/node_modules/enhanced-resolve/lib/Resolver.js:362:15\n    at /Users/joshuamartin/turing_work/2mod/TravelTracker/JoshTravelTracker/node_modules/enhanced-resolve/lib/Resolver.js:410:5\n    at eval (eval at create (/Users/joshuamartin/turing_work/2mod/TravelTracker/JoshTravelTracker/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)\n    at /Users/joshuamartin/turing_work/2mod/TravelTracker/JoshTravelTracker/node_modules/enhanced-resolve/lib/Resolver.js:410:5\n    at eval (eval at create (/Users/joshuamartin/turing_work/2mod/TravelTracker/JoshTravelTracker/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:27:1)\n    at /Users/joshuamartin/turing_work/2mod/TravelTracker/JoshTravelTracker/node_modules/enhanced-resolve/lib/DescriptionFilePlugin.js:87:43\n    at /Users/joshuamartin/turing_work/2mod/TravelTracker/JoshTravelTracker/node_modules/enhanced-resolve/lib/Resolver.js:410:5\n    at eval (eval at create (/Users/joshuamartin/turing_work/2mod/TravelTracker/JoshTravelTracker/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)\n    at /Users/joshuamartin/turing_work/2mod/TravelTracker/JoshTravelTracker/node_modules/enhanced-resolve/lib/Resolver.js:410:5");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/turing-logo.png");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/AdobeStock_571093886.jpg");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/login-button.png");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/AdobeStock_wide.png");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/AdobeStock_tall.png");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/AdobeStock_430930840.png");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/resizedmain.jpg");

/***/ })
/******/ 	]);
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dashBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _booking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _images_turing_logo_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _images_AdobeStock_571093886_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _images_login_button_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9);
/* harmony import */ var _images_AdobeStock_wide_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(10);
/* harmony import */ var _images_AdobeStock_tall_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(11);
/* harmony import */ var _images_AdobeStock_430930840_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(12);
/* harmony import */ var _images_resizedmain_jpg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(13);
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

let destinations
let travelers
let trips 

// An example of how you tell webpack to use a CSS (SCSS) file


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
;












const api = new _apiCalls__WEBPACK_IMPORTED_MODULE_2__.default("http://localhost:3001/api/v1/");
const dashboard = new _dashBoard__WEBPACK_IMPORTED_MODULE_0__.default();
const booking = new _booking__WEBPACK_IMPORTED_MODULE_1__.default();


const destinationInput = document.getElementById('destination')
const submitButton = document.getElementById("submit");


  function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    if (username === "traveler50" && password === "travel" ) {
        document.cookie = "sessionId=1; path=/";
      document.getElementById("login-form").style.display = "none";
      document.getElementById("content").style.display = "block";
    } else {
      document.cookie = "sessionId=0; path=/";
      alert("Invalid username or password");
    }
    console.log(document.cookie)
  }

window.addEventListener('load', () => {
    document.querySelector("#login-form form").addEventListener("submit", function(event) {
        event.preventDefault();
        login();
        
    });
    if (document.cookie==="sessionId=1"){
        //document.cookie = `sessionId=1 , userId=${username} ; path=/`;
        document.getElementById("login-form").style.display = "none";
        document.getElementById("content").style.display = "block";
    }
    console.log(document.cookie==="sessionId=1")
    api.fetchAll(/* User ID on It.4 */).then(data => {
    travelers = data[0];
    trips = data[1];
    destinations = data[2];
    parseDashboardData();
    writeDashboardDisplay();
    parseBookingPageData();
    loadDestinationsDropBar();
    checkInput();
  })
})

function parseDashboardData(){
    const randomUser = Math.floor(Math.random() * travelers.travelers.length);
    dashboard.loadUser(50,travelers);
    dashboard.loadUserTrips(trips);
    dashboard.loadUserDestinations(destinations);
    console.log(dashboard);
    dashboard.sortTripsByStatus();
    dashboard.sortTripsByDate();  
}

function writeDashboardDisplay(){
    dashboard.makeDateTable();
    dashboard.calculateTotalSpent(); 
    document.getElementById('agentFees').innerHTML = `$${dashboard.agentFees}`;
    document.getElementById('totalSpent').innerHTML = `$${dashboard.totalCosts + dashboard.agentFees}`;
}

function parseBookingPageData(){
    booking.loadData(dashboard.userID,destinations,trips)
    
    console.log(booking)
}

function loadDestinationsDropBar() {
    const option = document.createElement('option');
    destinations.destinations.forEach(element => {
    const option = document.createElement('option');
        option.value = element.destination;
        option.text = element.destination;
        destinationInput.appendChild(option);
   });

   submitButton.addEventListener('click', function(event) {
    event.preventDefault(); 
    const destinationSelection = document.getElementById('destination').value
    const dateInput = document.getElementById('date').value;
    const durationInput = document.getElementById('duration').value;
    const travelersInput = document.getElementById('travelers').value;
    let destinationIDSelection = 0;
    destinations.destinations.filter((destination) => {
        if(destination.destination == destinationSelection){
           destinationIDSelection = destination.id;
        }
    })
    console.log(booking.createBookingObj(dashboard.userID, destinationIDSelection, travelersInput, dateInput.replace("-","/").replace("-","/"), durationInput))

    api.postObj("trips", booking.createBookingObj(dashboard.userID, destinationIDSelection, travelersInput, dateInput.replace("-","/").replace("-","/"), durationInput))

    location.href = location.href;
    alert("Trip Submitted");

    });
  }

function checkInput(){
    let inputSum = [0,0,0]; 
    let calculateReady = false;
    const destinationInCheck = document.getElementById('destination')
    destinationInCheck.addEventListener('input', function() {
     if (destinationInCheck.value.length > 0){
         inputSum[0]=1;
         calculateReady= inputSum.every((num) => num ===1)
         if(calculateReady){calculateBooking()}
     }else{
         inputSum[0]=0;
        }
    });

     const travelersInCheck = document.getElementById('travelers')
     travelersInCheck.addEventListener('input', function() {
     if (travelersInCheck.value.length > 0){
         inputSum[1]=1;
         calculateReady = inputSum.every((num) => num ===1)
         if(calculateReady){calculateBooking()}
     }else{
         inputSum[1]=0;
        }
    });

    const durationInCheck = document.getElementById('duration')
    durationInCheck.addEventListener('input', function() {
     if (durationInCheck.value.length > 0){
         inputSum[2]=1;
         calculateReady = inputSum.every((num) => num ===1)
         if(calculateReady){calculateBooking()}
     }else{
         inputSum[2]=0;
        }
    });

    function calculateBooking(){
        let estimatedLodgingCostPerDay = 0
        let estimatedFlightCostPerPerson = 0
        destinations.destinations.filter((destination) => {
        if(destination.destination == destinationInCheck.value){
            estimatedFlightCostPerPerson = destination.estimatedFlightCostPerPerson
            estimatedLodgingCostPerDay = destination.estimatedLodgingCostPerDay
          }
        })
        const tripTotal = (estimatedLodgingCostPerDay * durationInCheck.value) + (estimatedFlightCostPerPerson * travelersInCheck.value)
        tripTotal + (tripTotal * 0.10) 
        document.getElementById('tripTotal').innerHTML = `$${tripTotal}`
     }    
 }
 








})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map