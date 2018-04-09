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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var El = function El(id) {
    _classCallCheck(this, El);

    this.id = id;
    this.node = document.getElementById(this.id);
};

var Pager = function (_El) {
    _inherits(Pager, _El);

    function Pager(id) {
        _classCallCheck(this, Pager);

        var _this = _possibleConstructorReturn(this, (Pager.__proto__ || Object.getPrototypeOf(Pager)).apply(this, arguments));

        _this.pages = document.getElementsByClassName("page");

        _this.scroller = document.getElementById("survey-scroller");

        _this.prev = _this.node.getElementsByClassName("prev")[0];
        _this.prev.addEventListener("click", _this.prevPage.bind(_this));
        _this.next = _this.node.getElementsByClassName("next")[0];
        _this.next.addEventListener("click", _this.nextPage.bind(_this));

        _this.submit = document.getElementById("survey-submitter");

        _this.setPage(0);
        return _this;
    }

    _createClass(Pager, [{
        key: "setPage",
        value: function setPage(index) {
            if (this.index == index) return;
            if (this.index != undefined) {
                this.pages[this.index].classList.remove("showing");
            }

            this.index = index;

            this.pages[this.index].classList.add("showing");

            this.prev.style.display = null;
            this.next.style.display = null;
            this.submit.style.display = "none";
            this.prev.innerHTML = "Prev Section";
            this.next.innerHTML = "Next Section";
            if (this.index === 0) {
                this.prev.style.display = "none";
                this.next.innerHTML = "Start the Survey";
            } else if (this.index === this.pages.length - 1) {
                this.next.style.display = "none";
                this.submit.style.display = null;
            }

            // scroll the form back to the top
            this.scroller.scrollTop = 0;
        }
    }, {
        key: "nextPage",
        value: function nextPage() {
            if (this.index === this.pages.length - 1) return;
            this.setPage(this.index + 1);
        }
    }, {
        key: "prevPage",
        value: function prevPage() {
            if (this.index === 0) return;
            this.setPage(this.index - 1);
        }
    }]);

    return Pager;
}(El);

var Form = function (_El2) {
    _inherits(Form, _El2);

    function Form(id, questions, setPage) {
        _classCallCheck(this, Form);

        var _this2 = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));

        _this2.id = id;
        _this2.questions = questions;
        _this2.setPage = setPage;
        return _this2;
    }

    _createClass(Form, [{
        key: "submit",
        value: function submit() {
            var validities = this.questions.map(function (q) {
                return q.showAdvice();
            });
            var allValid = validities.every(function (x) {
                return x == true;
            });
            if (!allValid) {
                var index = Math.floor(validities.indexOf(false) / 2) + 1;
                console.log("setting page to index", index, validities);
                this.setPage(index);
            } else {
                console.log("All is well");
            }
        }
    }]);

    return Form;
}(El);

var Question = function (_El3) {
    _inherits(Question, _El3);

    function Question(id, text) {
        _classCallCheck(this, Question);

        var _this3 = _possibleConstructorReturn(this, (Question.__proto__ || Object.getPrototypeOf(Question)).apply(this, arguments));

        _this3.node.classList.add("form-group");

        var label = document.createElement("label");
        label.innerHTML = text;
        _this3.node.appendChild(label);

        _this3.adviceEl = document.createElement("div");
        _this3.adviceEl.className = "advice alert-danger p-2 mb-2 rounded";
        _this3.node.appendChild(_this3.adviceEl);

        _this3.answerEl = document.createElement("div");
        _this3.answerEl.className = "answer";
        _this3.node.appendChild(_this3.answerEl);
        return _this3;
    }

    _createClass(Question, [{
        key: "showAdvice",
        value: function showAdvice() {
            var isValid = this.isValid;
            if (isValid) {
                this.adviceEl.classList.remove("showing");
                this.adviceEl.innerHTML = "";
            } else {
                this.adviceEl.classList.add("showing");
                this.adviceEl.innerHTML = this.advice;
            }
            return isValid;
        }
    }, {
        key: "answer",
        get: function get() {
            return undefined;
        }
    }, {
        key: "isValid",
        get: function get() {
            return true;
        }
    }, {
        key: "advice",
        get: function get() {
            return "";
        }
    }]);

    return Question;
}(El);

var Integer = function (_Question) {
    _inherits(Integer, _Question);

    function Integer(id, text, max, min) {
        _classCallCheck(this, Integer);

        var _this4 = _possibleConstructorReturn(this, (Integer.__proto__ || Object.getPrototypeOf(Integer)).apply(this, arguments));

        _this4.min = min ? min : 1;
        _this4.max = max ? max : 100;

        var input = document.createElement("input");
        input.className = "form-control";
        input.type = "number";
        input.max = _this4.max;
        input.min = _this4.min;
        input.placeholder = "Enter a number from " + _this4.min + " to " + _this4.max + ".";
        _this4.inputEl = input;

        _this4.answerEl.appendChild(_this4.inputEl);
        return _this4;
    }

    _createClass(Integer, [{
        key: "answer",
        get: function get() {
            return parseInt(this.inputEl.value);
        }
    }, {
        key: "isValid",
        get: function get() {
            var answer = this.answer;
            if (isNaN(answer)) return false;
            return answer <= this.max && answer >= this.min;
        }
    }, {
        key: "advice",
        get: function get() {
            return "Make sure you've entered a number between " + this.min + " and " + this.max;
        }
    }]);

    return Integer;
}(Question);

var Checklist = function (_Question2) {
    _inherits(Checklist, _Question2);

    function Checklist(id, text, inputs, radio, unmodifiable) {
        _classCallCheck(this, Checklist);

        var _this5 = _possibleConstructorReturn(this, (Checklist.__proto__ || Object.getPrototypeOf(Checklist)).apply(this, arguments));

        _this5.type = radio ? "radio" : "checkbox";

        // If radio mode is set, use same name for all boxes
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = inputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var input = _step.value;

                var name = input[0];
                var text = input[1];
                var c = _this5.createCheckbox(name, text);
                _this5.answerEl.appendChild(c);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        if (unmodifiable !== true) {
            var addButton = document.createElement("div");
            addButton.innerHTML = "Don't see your option? Click to add another.";
            addButton.className = "btn btn-themed btn-sm mt-2 w-100 border-0";
            addButton.addEventListener("click", _this5.newCustomInput.bind(_this5));
            _this5.addButton = addButton;
            _this5.answerEl.appendChild(addButton);
        }
        return _this5;
    }

    _createClass(Checklist, [{
        key: "extractCustomValue",
        value: function extractCustomValue(el) {
            var i = el.getElementsByTagName("input")[0];
            return i.value;
        }
    }, {
        key: "extractCheckboxValue",
        value: function extractCheckboxValue(el) {
            var i = el.getElementsByTagName("input")[0];
            if (i.checked) return i.name;
        }
    }, {
        key: "removeChild",
        value: function removeChild(child) {
            this.answerEl.removeChild(child);
        }
    }, {
        key: "createCheckbox",
        value: function createCheckbox(name, text, checkbox, textNode) {
            var container = document.createElement("div");
            container.className = "checklist-item form-check btn btn-light";

            if (textNode == undefined && checkbox == undefined) {
                checkbox = document.createElement("input");
                if (this.type === "radio") {
                    checkbox.name = this.id;
                    checkbox.value = name;
                } else {
                    checkbox.name = name;
                }
                checkbox.type = this.type;
                checkbox.checked = false;

                container.addEventListener("click", function () {
                    checkbox.checked = !checkbox.checked;
                });

                textNode = document.createTextNode(" " + text);
            }

            container.appendChild(checkbox);
            container.appendChild(textNode);
            return container;
        }
    }, {
        key: "newCustomInput",
        value: function newCustomInput() {
            var remove = document.createElement("div");
            remove.className = "remove btn btn-outline-danger";
            remove.innerHTML = "&times;";
            remove.style.paddingLeft = "1px";

            var input = document.createElement("input");
            input.type = "text";
            input.className = "form-control form-control-sm";
            input.placeholder = "Enter new option here...";

            var container = this.createCheckbox("", "", remove, input);
            container.classList.add("checklist-custom", "d-flex", "align-items-center");
            remove.addEventListener("click", this.removeChild.bind(this, container));

            this.answerEl.insertBefore(container, this.addButton);

            input.focus();
        }
    }, {
        key: "answer",
        get: function get() {
            var customItems = this.node.getElementsByClassName("checklist-custom");
            customItems = [].concat(_toConsumableArray(customItems));
            var customValues = customItems.map(this.extractCustomValue, this);

            var checkboxItems = this.node.getElementsByClassName("checklist-item");
            checkboxItems = [].concat(_toConsumableArray(checkboxItems));
            var checkboxValues = checkboxItems.map(this.extractCheckboxValue, this);
            checkboxValues = checkboxValues.filter(function (v) {
                return v != undefined;
            });

            var values = customValues.concat(checkboxValues);
            return values.join("\n");
        }
    }, {
        key: "advice",
        get: function get() {
            return "Make sure to check at least one box, or add at least one custom value";
        }
    }, {
        key: "isValid",
        get: function get() {
            return this.answer !== "";
        }
    }]);

    return Checklist;
}(Question);

window.pager = new Pager("survey-body");

window.form = new Form("survey", [new Integer("simultaneous-applications", "When searching for a job, roughly how many separate job applications do you tend to manage at any one time?"), new Checklist("how-tracking", "How do you normally keep track of your applications and their documents as you apply to them?", [["docs", "Word Documents / Typed Up Files (.doc, .txt, .etc)"], ["spread", "Spreadsheets (Excel, Gnumeric, etc.)"], ["paper", "Pen and Paper (Notebook, Post-Its, etc.)"]]), new Checklist("extra-documents", "What documents have been requested from you in past applications, aside from CVs?", [["cover", "Cover Letter"], ["reference", "Letter of Reference / Recommendation"], ["philosophy", "Work Philosophy"]]), new Checklist("document-creation-softwares", "What programs or softwares do you use to create documents for applications?", [["word", "Word / Google Docs / Other Office Suite Software"], ["latex", "LaTeX"], ["indesign", "InDesign / GIMP / Other Design and Artwork Software"]]), new Integer("different-cvs", "How many different CVs do you generally maintain at a given time?"), new Checklist("update-frequency", "How often do you update or change your CV's contents or layout?<br/><small class='text-muted text-normal'>(Pick the first that applies.)</small>", [["job", "For every job application"], ["skill", "Every time I acquire a new skill"], [">1pmo", "More than once a month"], [">3pmo", "More than once every 3 months"], [">1pyr", "More than once a year"], ["<1pyr", "Less than once a year"]], true, true)], pager.setPage.bind(pager));

/***/ }),

/***/ 0:
/*!***********************!*\
  !*** multi ./main.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./main.js */"./main.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyJdLCJuYW1lcyI6WyJFbCIsImlkIiwibm9kZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJQYWdlciIsImFyZ3VtZW50cyIsInBhZ2VzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInNjcm9sbGVyIiwicHJldiIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcmV2UGFnZSIsImJpbmQiLCJuZXh0IiwibmV4dFBhZ2UiLCJzdWJtaXQiLCJzZXRQYWdlIiwiaW5kZXgiLCJ1bmRlZmluZWQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJzdHlsZSIsImRpc3BsYXkiLCJpbm5lckhUTUwiLCJsZW5ndGgiLCJzY3JvbGxUb3AiLCJGb3JtIiwicXVlc3Rpb25zIiwidmFsaWRpdGllcyIsIm1hcCIsInEiLCJzaG93QWR2aWNlIiwiYWxsVmFsaWQiLCJldmVyeSIsIngiLCJNYXRoIiwiZmxvb3IiLCJpbmRleE9mIiwiY29uc29sZSIsImxvZyIsIlF1ZXN0aW9uIiwidGV4dCIsImxhYmVsIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiYWR2aWNlRWwiLCJjbGFzc05hbWUiLCJhbnN3ZXJFbCIsImlzVmFsaWQiLCJhZHZpY2UiLCJJbnRlZ2VyIiwibWF4IiwibWluIiwiaW5wdXQiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJpbnB1dEVsIiwicGFyc2VJbnQiLCJ2YWx1ZSIsImFuc3dlciIsImlzTmFOIiwiQ2hlY2tsaXN0IiwiaW5wdXRzIiwicmFkaW8iLCJ1bm1vZGlmaWFibGUiLCJuYW1lIiwiYyIsImNyZWF0ZUNoZWNrYm94IiwiYWRkQnV0dG9uIiwibmV3Q3VzdG9tSW5wdXQiLCJlbCIsImkiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImNoZWNrZWQiLCJjaGlsZCIsInJlbW92ZUNoaWxkIiwiY2hlY2tib3giLCJ0ZXh0Tm9kZSIsImNvbnRhaW5lciIsImNyZWF0ZVRleHROb2RlIiwicGFkZGluZ0xlZnQiLCJpbnNlcnRCZWZvcmUiLCJmb2N1cyIsImN1c3RvbUl0ZW1zIiwiY3VzdG9tVmFsdWVzIiwiZXh0cmFjdEN1c3RvbVZhbHVlIiwiY2hlY2tib3hJdGVtcyIsImNoZWNrYm94VmFsdWVzIiwiZXh0cmFjdENoZWNrYm94VmFsdWUiLCJmaWx0ZXIiLCJ2IiwidmFsdWVzIiwiY29uY2F0Iiwiam9pbiIsIndpbmRvdyIsInBhZ2VyIiwiZm9ybSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNuRU1BLEUsR0FDRixZQUFhQyxFQUFiLEVBQWlCO0FBQUE7O0FBQ2IsU0FBS0EsRUFBTCxHQUFVQSxFQUFWO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQyxTQUFTQyxjQUFULENBQXdCLEtBQUtILEVBQTdCLENBQVo7QUFDSCxDOztJQUdDSSxLOzs7QUFDRixtQkFBYUosRUFBYixFQUFpQjtBQUFBOztBQUFBLG1IQUNKSyxTQURJOztBQUViLGNBQUtDLEtBQUwsR0FBYUosU0FBU0ssc0JBQVQsQ0FBZ0MsTUFBaEMsQ0FBYjs7QUFFQSxjQUFLQyxRQUFMLEdBQWdCTixTQUFTQyxjQUFULENBQXdCLGlCQUF4QixDQUFoQjs7QUFF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RUFXNUIsSUFBSUEsU0FBSixDQUFjLGlCQUFkLEVBQ2MsbUZBRGQsRUFFYyxDQUFDLENBQUMsT0FBRCxFQUFVLGNBQVYsQ0FBRCxFQUNDLENBQUMsV0FBRCxFQUFjLHNDQUFkLENBREQsRUFFQyxDQUFDLFlBQUQsRUFBZSxpQkFBZixDQUZELENBRmQsQ0FYNEIsRUFrQjVCLElBQUlBLFNBQUosQ0FBYyw2QkFBZCxFQUNjLDZFQURkLEVBRWMsQ0FBQyxDQUFDLE1BQUQsRUFBUyxrREFBVCxDQUFELEVBQ0MsQ0FBQyxPQUFELEVBQVUsT0FBVixDQURELEVBRUMsQ0FBQyxVQUFELEVBQWEscURBQWIsQ0FGRCxDQUZkLENBbEI0QixFQXlCNUIsSUFBTVgsT0FBTixDQUFjLGVBQWQsRUFDYyxtRUFEZCxDQXpCNEIsRUE0QjVCLElBQUlXLFNBQUosQ0FBYyxrQkFBZCxFQUNjLGtKQURkLEVBRWMsQ0FBQyxDQUFDLEtBQUQsRUFBUSwyQkFBUixDQUFELEVBQ0MsQ0FBQyxPQUFELEVBQVUsa0NBQVYsQ0FERCxFQUVDLENBQUMsT0FBRCxFQUFVLHdCQUFWLENBRkQsRUFHQyxDQUFDLE9BQUQsRUFBVSwrQkFBVixDQUhELEVBSUMsQ0FBQyxPQUFELEVBQVUsdUJBQVYsQ0FKRCxFQUtDLENBQUMsT0FBRCxFQUFVLHVCQUFWLENBTEQsQ0FGZCxFQVNjLElBVGQsRUFTbUIsSUFUbkIsQ0E1QjRCLENBQW5CLEVBc0NQa0MsTUFBTWhGLE9BQU4sQ0FBY0osSUFBZCxDQUFtQm9GLEtBQW5CLENBdENPLENBQWQsQyIsImZpbGUiOiJzdXJ2ZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiY2xhc3MgRWwge1xuICAgIGNvbnN0cnVjdG9yIChpZCkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMubm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpO1xuICAgIH1cbn1cblxuY2xhc3MgUGFnZXIgZXh0ZW5kcyBFbCB7XG4gICAgY29uc3RydWN0b3IgKGlkKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMucGFnZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicGFnZVwiKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2Nyb2xsZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1cnZleS1zY3JvbGxlclwiKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucHJldiA9IHRoaXMubm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicHJldlwiKVswXTtcbiAgICAgICAgdGhpcy5wcmV2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnByZXZQYWdlLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLm5leHQgPSB0aGlzLm5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm5leHRcIilbMF07XG4gICAgICAgIHRoaXMubmV4dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5uZXh0UGFnZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLnN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VydmV5LXN1Ym1pdHRlclwiKTtcblxuICAgICAgICB0aGlzLnNldFBhZ2UoMCk7XG4gICAgfVxuXG4gICAgc2V0UGFnZSAoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5kZXggPT0gaW5kZXgpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuaW5kZXggIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2VzW3RoaXMuaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93aW5nXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuXG4gICAgICAgIHRoaXMucGFnZXNbdGhpcy5pbmRleF0uY2xhc3NMaXN0LmFkZChcInNob3dpbmdcIik7XG5cbiAgICAgICAgdGhpcy5wcmV2LnN0eWxlLmRpc3BsYXkgPSBudWxsO1xuICAgICAgICB0aGlzLm5leHQuc3R5bGUuZGlzcGxheSA9IG51bGw7XG4gICAgICAgIHRoaXMuc3VibWl0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5wcmV2LmlubmVySFRNTCA9IFwiUHJldiBTZWN0aW9uXCI7XG4gICAgICAgIHRoaXMubmV4dC5pbm5lckhUTUwgPSBcIk5leHQgU2VjdGlvblwiO1xuICAgICAgICBpZiAodGhpcy5pbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5wcmV2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIHRoaXMubmV4dC5pbm5lckhUTUwgPSBcIlN0YXJ0IHRoZSBTdXJ2ZXlcIjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLnBhZ2VzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdC5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gc2Nyb2xsIHRoZSBmb3JtIGJhY2sgdG8gdGhlIHRvcFxuICAgICAgICB0aGlzLnNjcm9sbGVyLnNjcm9sbFRvcCA9IDA7XG4gICAgfVxuXG4gICAgbmV4dFBhZ2UgKCkge1xuICAgICAgICBpZiAodGhpcy5pbmRleCA9PT0gdGhpcy5wYWdlcy5sZW5ndGggLSAxKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLmluZGV4ICsgMSk7XG4gICAgfVxuICAgIHByZXZQYWdlICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5kZXggPT09IDApIHJldHVybjtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHRoaXMuaW5kZXggLSAxKTtcbiAgICB9XG59XG5cbmNsYXNzIEZvcm0gZXh0ZW5kcyBFbCB7XG4gICAgY29uc3RydWN0b3IgKGlkLCBxdWVzdGlvbnMsIHNldFBhZ2UpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLnF1ZXN0aW9ucyA9IHF1ZXN0aW9ucztcbiAgICAgICAgdGhpcy5zZXRQYWdlID0gc2V0UGFnZTtcbiAgICB9XG5cbiAgICBzdWJtaXQgKCkge1xuICAgICAgICB2YXIgdmFsaWRpdGllcyA9IHRoaXMucXVlc3Rpb25zLm1hcChxID0+IHEuc2hvd0FkdmljZSgpKTtcbiAgICAgICAgdmFyIGFsbFZhbGlkID0gdmFsaWRpdGllcy5ldmVyeSh4ID0+IHggPT0gdHJ1ZSk7XG4gICAgICAgIGlmICghYWxsVmFsaWQpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IE1hdGguZmxvb3IodmFsaWRpdGllcy5pbmRleE9mKGZhbHNlKSAvIDIpICsgMTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2V0dGluZyBwYWdlIHRvIGluZGV4XCIsIGluZGV4LCB2YWxpZGl0aWVzKTtcbiAgICAgICAgICAgIHRoaXMuc2V0UGFnZShpbmRleCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFsbCBpcyB3ZWxsXCIpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBRdWVzdGlvbiBleHRlbmRzIEVsIHtcbiAgICBjb25zdHJ1Y3RvciAoaWQsIHRleHQpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5ub2RlLmNsYXNzTGlzdC5hZGQoXCJmb3JtLWdyb3VwXCIpO1xuICAgICAgICBcbiAgICAgICAgdmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICBsYWJlbC5pbm5lckhUTUwgPSB0ZXh0O1xuICAgICAgICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQobGFiZWwpO1xuXG4gICAgICAgIHRoaXMuYWR2aWNlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGlzLmFkdmljZUVsLmNsYXNzTmFtZSA9IFwiYWR2aWNlIGFsZXJ0LWRhbmdlciBwLTIgbWItMiByb3VuZGVkXCI7XG4gICAgICAgIHRoaXMubm9kZS5hcHBlbmRDaGlsZCh0aGlzLmFkdmljZUVsKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYW5zd2VyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGlzLmFuc3dlckVsLmNsYXNzTmFtZSA9IFwiYW5zd2VyXCI7XG4gICAgICAgIHRoaXMubm9kZS5hcHBlbmRDaGlsZCh0aGlzLmFuc3dlckVsKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGFuc3dlciAoKSB7IFxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkOyBcbiAgICB9XG4gICAgZ2V0IGlzVmFsaWQgKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZ2V0IGFkdmljZSAoKSB7IHJldHVybiBcIlwiOyB9XG5cbiAgICBzaG93QWR2aWNlICgpIHtcbiAgICAgICAgdmFyIGlzVmFsaWQgPSB0aGlzLmlzVmFsaWQ7XG4gICAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgICAgICB0aGlzLmFkdmljZUVsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93aW5nXCIpO1xuICAgICAgICAgICAgdGhpcy5hZHZpY2VFbC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZHZpY2VFbC5jbGFzc0xpc3QuYWRkKFwic2hvd2luZ1wiKTtcbiAgICAgICAgICAgIHRoaXMuYWR2aWNlRWwuaW5uZXJIVE1MID0gdGhpcy5hZHZpY2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzVmFsaWQ7XG4gICAgfVxufVxuXG5jbGFzcyBJbnRlZ2VyIGV4dGVuZHMgUXVlc3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yIChpZCwgdGV4dCwgbWF4LCBtaW4pIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcblxuICAgICAgICB0aGlzLm1pbiA9IG1pbiA/IG1pbiA6IDE7XG4gICAgICAgIHRoaXMubWF4ID0gbWF4ID8gbWF4IDogMTAwO1xuXG4gICAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgaW5wdXQuY2xhc3NOYW1lID0gXCJmb3JtLWNvbnRyb2xcIjtcbiAgICAgICAgaW5wdXQudHlwZSA9IFwibnVtYmVyXCI7XG4gICAgICAgIGlucHV0Lm1heCA9IHRoaXMubWF4O1xuICAgICAgICBpbnB1dC5taW4gPSB0aGlzLm1pbjtcbiAgICAgICAgaW5wdXQucGxhY2Vob2xkZXIgPSBcIkVudGVyIGEgbnVtYmVyIGZyb20gXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgdGhpcy5taW4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCIgdG8gXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgdGhpcy5tYXggXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCIuXCI7XG4gICAgICAgIHRoaXMuaW5wdXRFbCA9IGlucHV0O1xuXG4gICAgICAgIHRoaXMuYW5zd2VyRWwuYXBwZW5kQ2hpbGQodGhpcy5pbnB1dEVsKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGFuc3dlciAoKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLmlucHV0RWwudmFsdWUpO1xuICAgIH1cbiAgICBnZXQgaXNWYWxpZCAoKSB7XG4gICAgICAgIHZhciBhbnN3ZXIgPSB0aGlzLmFuc3dlcjtcbiAgICAgICAgaWYgKGlzTmFOKGFuc3dlcikpIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGFuc3dlciA8PSB0aGlzLm1heCAmJiBhbnN3ZXIgPj0gdGhpcy5taW47XG4gICAgfVxuICAgIGdldCBhZHZpY2UgKCkge1xuICAgICAgICByZXR1cm4gXCJNYWtlIHN1cmUgeW91J3ZlIGVudGVyZWQgYSBudW1iZXIgYmV0d2VlbiBcIiBcbiAgICAgICAgICAgICAgICsgdGhpcy5taW4gXG4gICAgICAgICAgICAgICArIFwiIGFuZCBcIiBcbiAgICAgICAgICAgICAgICsgdGhpcy5tYXg7XG4gICAgfVxufVxuXG5jbGFzcyBDaGVja2xpc3QgZXh0ZW5kcyBRdWVzdGlvbiB7XG4gICAgY29uc3RydWN0b3IgKGlkLCB0ZXh0LCBpbnB1dHMsIHJhZGlvLCB1bm1vZGlmaWFibGUpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy50eXBlID0gcmFkaW8gPyBcInJhZGlvXCIgOiBcImNoZWNrYm94XCI7XG5cbiAgICAgICAgLy8gSWYgcmFkaW8gbW9kZSBpcyBzZXQsIHVzZSBzYW1lIG5hbWUgZm9yIGFsbCBib3hlc1xuICAgICAgICBmb3IgKHZhciBpbnB1dCBvZiBpbnB1dHMpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gaW5wdXRbMF07IFxuICAgICAgICAgICAgdmFyIHRleHQgPSBpbnB1dFsxXTtcbiAgICAgICAgICAgIHZhciBjID0gdGhpcy5jcmVhdGVDaGVja2JveChuYW1lLCB0ZXh0KTtcbiAgICAgICAgICAgIHRoaXMuYW5zd2VyRWwuYXBwZW5kQ2hpbGQoYyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodW5tb2RpZmlhYmxlICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB2YXIgYWRkQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGFkZEJ1dHRvbi5pbm5lckhUTUwgPSBcIkRvbid0IHNlZSB5b3VyIG9wdGlvbj8gQ2xpY2sgdG8gYWRkIGFub3RoZXIuXCI7XG4gICAgICAgICAgICBhZGRCdXR0b24uY2xhc3NOYW1lID0gXCJidG4gYnRuLXRoZW1lZCBidG4tc20gbXQtMiB3LTEwMCBib3JkZXItMFwiO1xuICAgICAgICAgICAgYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm5ld0N1c3RvbUlucHV0LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5hZGRCdXR0b24gPSBhZGRCdXR0b247XG4gICAgICAgICAgICB0aGlzLmFuc3dlckVsLmFwcGVuZENoaWxkKGFkZEJ1dHRvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHRyYWN0Q3VzdG9tVmFsdWUgKGVsKSB7XG4gICAgICAgIHZhciBpID0gZWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbnB1dFwiKVswXTtcbiAgICAgICAgcmV0dXJuIGkudmFsdWU7XG4gICAgfVxuXG4gICAgZXh0cmFjdENoZWNrYm94VmFsdWUgKGVsKSB7XG4gICAgICAgIHZhciBpID0gZWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbnB1dFwiKVswXTtcbiAgICAgICAgaWYgKGkuY2hlY2tlZCkgcmV0dXJuIGkubmFtZTtcbiAgICB9XG5cbiAgICBnZXQgYW5zd2VyICgpIHtcbiAgICAgICAgdmFyIGN1c3RvbUl0ZW1zID0gdGhpcy5ub2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjaGVja2xpc3QtY3VzdG9tXCIpO1xuICAgICAgICBjdXN0b21JdGVtcyA9IFsuLi5jdXN0b21JdGVtc107XG4gICAgICAgIHZhciBjdXN0b21WYWx1ZXMgPSBjdXN0b21JdGVtcy5tYXAodGhpcy5leHRyYWN0Q3VzdG9tVmFsdWUsIHRoaXMpO1xuXG4gICAgICAgIHZhciBjaGVja2JveEl0ZW1zID0gdGhpcy5ub2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjaGVja2xpc3QtaXRlbVwiKTtcbiAgICAgICAgY2hlY2tib3hJdGVtcyA9IFsuLi5jaGVja2JveEl0ZW1zXTtcbiAgICAgICAgdmFyIGNoZWNrYm94VmFsdWVzID0gY2hlY2tib3hJdGVtcy5tYXAodGhpcy5leHRyYWN0Q2hlY2tib3hWYWx1ZSwgdGhpcyk7XG4gICAgICAgIGNoZWNrYm94VmFsdWVzID0gY2hlY2tib3hWYWx1ZXMuZmlsdGVyKHYgPT4gdiAhPSB1bmRlZmluZWQpO1xuXG4gICAgICAgIHZhciB2YWx1ZXMgPSBjdXN0b21WYWx1ZXMuY29uY2F0KGNoZWNrYm94VmFsdWVzKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlcy5qb2luKFwiXFxuXCIpO1xuICAgIH1cblxuICAgIGdldCBhZHZpY2UgKCkge1xuICAgICAgICByZXR1cm4gXCJNYWtlIHN1cmUgdG8gY2hlY2sgYXQgbGVhc3Qgb25lIGJveCwgb3IgYWRkIGF0IGxlYXN0IG9uZSBjdXN0b20gdmFsdWVcIjtcbiAgICB9XG4gICAgZ2V0IGlzVmFsaWQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hbnN3ZXIgIT09IFwiXCI7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ2hpbGQgKGNoaWxkKSB7XG4gICAgICAgIHRoaXMuYW5zd2VyRWwucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgIH1cbiAgICBjcmVhdGVDaGVja2JveCAobmFtZSwgdGV4dCwgY2hlY2tib3gsIHRleHROb2RlKSB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJjaGVja2xpc3QtaXRlbSBmb3JtLWNoZWNrIGJ0biBidG4tbGlnaHRcIjtcblxuICAgICAgICBpZiAodGV4dE5vZGUgPT0gdW5kZWZpbmVkICYmIGNoZWNrYm94ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSBcInJhZGlvXCIpIHtcbiAgICAgICAgICAgICAgICBjaGVja2JveC5uYW1lID0gdGhpcy5pZDtcbiAgICAgICAgICAgICAgICBjaGVja2JveC52YWx1ZSA9IG5hbWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNoZWNrYm94Lm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2hlY2tib3gudHlwZSA9IHRoaXMudHlwZTtcbiAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9ICFjaGVja2JveC5jaGVja2VkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCIgXCIgKyB0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG4gICAgbmV3Q3VzdG9tSW5wdXQgKCkge1xuICAgICAgICB2YXIgcmVtb3ZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcmVtb3ZlLmNsYXNzTmFtZSA9IFwicmVtb3ZlIGJ0biBidG4tb3V0bGluZS1kYW5nZXJcIjtcbiAgICAgICAgcmVtb3ZlLmlubmVySFRNTCA9IFwiJnRpbWVzO1wiO1xuICAgICAgICByZW1vdmUuc3R5bGUucGFkZGluZ0xlZnQgPSBcIjFweFwiO1xuXG4gICAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgaW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICAgICAgICBpbnB1dC5jbGFzc05hbWUgPSBcImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc21cIjtcbiAgICAgICAgaW5wdXQucGxhY2Vob2xkZXIgPSBcIkVudGVyIG5ldyBvcHRpb24gaGVyZS4uLlwiO1xuXG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNyZWF0ZUNoZWNrYm94KFwiXCIsIFwiXCIsIHJlbW92ZSwgaW5wdXQpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNoZWNrbGlzdC1jdXN0b21cIiwgXCJkLWZsZXhcIiwgXCJhbGlnbi1pdGVtcy1jZW50ZXJcIik7XG4gICAgICAgIHJlbW92ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5yZW1vdmVDaGlsZC5iaW5kKHRoaXMsIGNvbnRhaW5lcikpO1xuXG4gICAgICAgIHRoaXMuYW5zd2VyRWwuaW5zZXJ0QmVmb3JlKGNvbnRhaW5lciwgdGhpcy5hZGRCdXR0b24pO1xuXG4gICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgfVxufVxuXG53aW5kb3cucGFnZXIgPSBuZXcgUGFnZXIoXCJzdXJ2ZXktYm9keVwiKTtcblxud2luZG93LmZvcm0gPSBuZXcgRm9ybShcInN1cnZleVwiLCBbXG4gICAgIG5ldyAgIEludGVnZXIoXCJzaW11bHRhbmVvdXMtYXBwbGljYXRpb25zXCJcbiAgICAgICAgICAgICAgICAgICxcIldoZW4gc2VhcmNoaW5nIGZvciBhIGpvYiwgcm91Z2hseSBob3cgbWFueSBzZXBhcmF0ZSBqb2IgYXBwbGljYXRpb25zIGRvIHlvdSB0ZW5kIHRvIG1hbmFnZSBhdCBhbnkgb25lIHRpbWU/XCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAsbmV3IENoZWNrbGlzdChcImhvdy10cmFja2luZ1wiXG4gICAgICAgICAgICAgICAgICAsXCJIb3cgZG8geW91IG5vcm1hbGx5IGtlZXAgdHJhY2sgb2YgeW91ciBhcHBsaWNhdGlvbnMgYW5kIHRoZWlyIGRvY3VtZW50cyBhcyB5b3UgYXBwbHkgdG8gdGhlbT9cIlxuICAgICAgICAgICAgICAgICAgLFtbXCJkb2NzXCIsIFwiV29yZCBEb2N1bWVudHMgLyBUeXBlZCBVcCBGaWxlcyAoLmRvYywgLnR4dCwgLmV0YylcIl1cbiAgICAgICAgICAgICAgICAgICAsW1wic3ByZWFkXCIsIFwiU3ByZWFkc2hlZXRzIChFeGNlbCwgR251bWVyaWMsIGV0Yy4pXCJdXG4gICAgICAgICAgICAgICAgICAgLFtcInBhcGVyXCIsIFwiUGVuIGFuZCBQYXBlciAoTm90ZWJvb2ssIFBvc3QtSXRzLCBldGMuKVwiXVxuICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAsbmV3IENoZWNrbGlzdChcImV4dHJhLWRvY3VtZW50c1wiXG4gICAgICAgICAgICAgICAgICAsXCJXaGF0IGRvY3VtZW50cyBoYXZlIGJlZW4gcmVxdWVzdGVkIGZyb20geW91IGluIHBhc3QgYXBwbGljYXRpb25zLCBhc2lkZSBmcm9tIENWcz9cIlxuICAgICAgICAgICAgICAgICAgLFtbXCJjb3ZlclwiLCBcIkNvdmVyIExldHRlclwiXVxuICAgICAgICAgICAgICAgICAgICxbXCJyZWZlcmVuY2VcIiwgXCJMZXR0ZXIgb2YgUmVmZXJlbmNlIC8gUmVjb21tZW5kYXRpb25cIl1cbiAgICAgICAgICAgICAgICAgICAsW1wicGhpbG9zb3BoeVwiLCBcIldvcmsgUGhpbG9zb3BoeVwiXVxuICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAsbmV3IENoZWNrbGlzdChcImRvY3VtZW50LWNyZWF0aW9uLXNvZnR3YXJlc1wiXG4gICAgICAgICAgICAgICAgICAsXCJXaGF0IHByb2dyYW1zIG9yIHNvZnR3YXJlcyBkbyB5b3UgdXNlIHRvIGNyZWF0ZSBkb2N1bWVudHMgZm9yIGFwcGxpY2F0aW9ucz9cIlxuICAgICAgICAgICAgICAgICAgLFtbXCJ3b3JkXCIsIFwiV29yZCAvIEdvb2dsZSBEb2NzIC8gT3RoZXIgT2ZmaWNlIFN1aXRlIFNvZnR3YXJlXCJdXG4gICAgICAgICAgICAgICAgICAgLFtcImxhdGV4XCIsIFwiTGFUZVhcIl1cbiAgICAgICAgICAgICAgICAgICAsW1wiaW5kZXNpZ25cIiwgXCJJbkRlc2lnbiAvIEdJTVAgLyBPdGhlciBEZXNpZ24gYW5kIEFydHdvcmsgU29mdHdhcmVcIl1cbiAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApXG4gICAgLG5ldyAgIEludGVnZXIoXCJkaWZmZXJlbnQtY3ZzXCJcbiAgICAgICAgICAgICAgICAgICxcIkhvdyBtYW55IGRpZmZlcmVudCBDVnMgZG8geW91IGdlbmVyYWxseSBtYWludGFpbiBhdCBhIGdpdmVuIHRpbWU/XCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAsbmV3IENoZWNrbGlzdChcInVwZGF0ZS1mcmVxdWVuY3lcIlxuICAgICAgICAgICAgICAgICAgLFwiSG93IG9mdGVuIGRvIHlvdSB1cGRhdGUgb3IgY2hhbmdlIHlvdXIgQ1YncyBjb250ZW50cyBvciBsYXlvdXQ/PGJyLz48c21hbGwgY2xhc3M9J3RleHQtbXV0ZWQgdGV4dC1ub3JtYWwnPihQaWNrIHRoZSBmaXJzdCB0aGF0IGFwcGxpZXMuKTwvc21hbGw+XCJcbiAgICAgICAgICAgICAgICAgICxbW1wiam9iXCIsIFwiRm9yIGV2ZXJ5IGpvYiBhcHBsaWNhdGlvblwiXVxuICAgICAgICAgICAgICAgICAgICxbXCJza2lsbFwiLCBcIkV2ZXJ5IHRpbWUgSSBhY3F1aXJlIGEgbmV3IHNraWxsXCJdXG4gICAgICAgICAgICAgICAgICAgLFtcIj4xcG1vXCIsIFwiTW9yZSB0aGFuIG9uY2UgYSBtb250aFwiXVxuICAgICAgICAgICAgICAgICAgICxbXCI+M3Btb1wiLCBcIk1vcmUgdGhhbiBvbmNlIGV2ZXJ5IDMgbW9udGhzXCJdXG4gICAgICAgICAgICAgICAgICAgLFtcIj4xcHlyXCIsIFwiTW9yZSB0aGFuIG9uY2UgYSB5ZWFyXCJdXG4gICAgICAgICAgICAgICAgICAgLFtcIjwxcHlyXCIsIFwiTGVzcyB0aGFuIG9uY2UgYSB5ZWFyXCJdXG4gICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgLHRydWUsdHJ1ZSlcbiAgICBdLCBwYWdlci5zZXRQYWdlLmJpbmQocGFnZXIpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=