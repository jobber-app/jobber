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

    function Form(id, submitId, questions, setPage) {
        _classCallCheck(this, Form);

        var _this2 = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));

        _this2.id = id;
        _this2.questions = questions;
        _this2.setPage = setPage;

        var submitEl = document.getElementById(submitId);
        submitEl.addEventListener("click", _this2.submit.bind(_this2));
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
                console.log("Submitting form:");
                this.node.submit();
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
        label.appendChild(document.createTextNode(text));
        _this3.node.appendChild(label);

        // this.output store the final output 
        _this3.output = document.createElement("textarea");
        _this3.output.name = "response[" + id + "]";
        _this3.output.hidden = true;
        _this3.output.style.display = "none";
        _this3.node.appendChild(_this3.output);

        _this3.adviceEl = document.createElement("div");
        _this3.adviceEl.className = "advice alert-danger p-2 mb-2 rounded";
        _this3.node.appendChild(_this3.adviceEl);

        _this3.userInputs = document.createElement("div");
        _this3.userInputs.className = "answer";
        _this3.node.appendChild(_this3.userInputs);
        return _this3;
    }

    _createClass(Question, [{
        key: "writeAnswer",
        value: function writeAnswer() {
            var answer = this.answer;
            var sanitizedAnswer = document.createTextNode(answer);
            this.output.innerHTML = "";
            this.output.appendChild(sanitizedAnswer);
            return answer;
        }
    }, {
        key: "showAdvice",
        value: function showAdvice() {
            var isValid = this.isValid;
            if (isValid) {
                this.adviceEl.classList.remove("showing");
                this.adviceEl.innerHTML = "";
            } else {
                this.adviceEl.classList.add("showing");
                this.adviceEl.innerHTML = "";
                this.adviceEl.appendChild(document.createTextNode(this.advice));
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

        _this4.userInputs.appendChild(_this4.inputEl);
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
            var answer = this.writeAnswer();
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
                _this5.userInputs.appendChild(c);
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

        if (_this5.type !== "radio" && unmodifiable !== true) {
            var addButton = document.createElement("div");
            addButton.innerHTML = "Don't see your option? Click to add another.";
            addButton.className = "btn btn-themed btn-sm mt-2 w-100 border-0";
            addButton.addEventListener("click", _this5.newCustomInput.bind(_this5));
            _this5.addButton = addButton;
            _this5.userInputs.appendChild(addButton);
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
            if (i.checked) {
                if (this.type === "radio") return i.value;else return i.id;
            }
        }
    }, {
        key: "removeChild",
        value: function removeChild(child) {
            this.userInputs.removeChild(child);
        }
    }, {
        key: "createCheckbox",
        value: function createCheckbox(name, text, checkbox, textNode) {
            var container = document.createElement("div");
            container.className = "checklist-item form-check btn btn-light";

            if (textNode == undefined && checkbox == undefined) {
                checkbox = document.createElement("input");
                if (this.type === "radio") {
                    checkbox.id = this.id;
                    checkbox.name = this.id;
                    checkbox.value = name;
                } else {
                    checkbox.id = name;
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

            this.userInputs.insertBefore(container, this.addButton);

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
            var answer = values.join("\n");
            return answer;
        }
    }, {
        key: "advice",
        get: function get() {
            return "Make sure to check at least one box, or add at least one custom value";
        }
    }, {
        key: "isValid",
        get: function get() {
            return this.writeAnswer() !== "";
        }
    }]);

    return Checklist;
}(Question);

window.pager = new Pager("survey-body");

window.form = new Form("survey", "survey-submitter", [new Integer("count_simultaneous_applications", "When searching for a job, roughly how many separate job applications do you tend to manage at any one time?"), new Checklist("how_tracking", "How do you normally keep track of your applications and their documents as you apply to them?", [["docs", "Word Documents / Typed Up Files (.doc, .txt, .etc)"], ["spread", "Spreadsheets (Excel, Gnumeric, etc.)"], ["paper", "Pen and Paper (Notebook, Post-Its, etc.)"]]), new Checklist("what_extra_documents", "What documents have been requested from you in past applications, aside from CVs?", [["cover", "Cover Letter"], ["reference", "Letter of Reference / Recommendation"], ["philosophy", "Work Philosophy"]]), new Checklist("what_document_creation_softwares", "What programs or softwares do you use to create documents for applications?", [["word", "Word / Google Docs / Other Office Suite Software"], ["latex", "LaTeX"], ["indesign", "InDesign / GIMP / Other Design and Artwork Software"]]), new Integer("count_different_cvs", "How many different CVs do you generally maintain at a given time?"), new Checklist("what_update_frequency", "How often do you update or change your CV's contents or layout?", [["job", "For every job application"], ["skill", "Every time I acquire a new skill"], [">1pmo", "More than once a month"], [">3pmo", "More than once every 3 months"], [">1pyr", "More than once a year"], ["<1pyr", "Less than once a year"]], true, true)], pager.setPage.bind(pager));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyJdLCJuYW1lcyI6WyJFbCIsImlkIiwibm9kZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJQYWdlciIsImFyZ3VtZW50cyIsInBhZ2VzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInNjcm9sbGVyIiwicHJldiIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcmV2UGFnZSIsImJpbmQiLCJuZXh0IiwibmV4dFBhZ2UiLCJzdWJtaXQiLCJzZXRQYWdlIiwiaW5kZXgiLCJ1bmRlZmluZWQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJzdHlsZSIsImRpc3BsYXkiLCJpbm5lckhUTUwiLCJsZW5ndGgiLCJzY3JvbGxUb3AiLCJGb3JtIiwic3VibWl0SWQiLCJxdWVzdGlvbnMiLCJzdWJtaXRFbCIsInZhbGlkaXRpZXMiLCJtYXAiLCJxIiwic2hvd0FkdmljZSIsImFsbFZhbGlkIiwiZXZlcnkiLCJ4IiwiTWF0aCIsImZsb29yIiwiaW5kZXhPZiIsImNvbnNvbGUiLCJsb2ciLCJRdWVzdGlvbiIsInRleHQiLCJsYWJlbCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVRleHROb2RlIiwib3V0cHV0IiwibmFtZSIsImhpZGRlbiIsImFkdmljZUVsIiwiY2xhc3NOYW1lIiwidXNlcklucHV0cyIsImFuc3dlciIsInNhbml0aXplZEFuc3dlciIsImlzVmFsaWQiLCJhZHZpY2UiLCJJbnRlZ2VyIiwibWF4IiwibWluIiwiaW5wdXQiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJpbnB1dEVsIiwicGFyc2VJbnQiLCJ2YWx1ZSIsIndyaXRlQW5zd2VyIiwiaXNOYU4iLCJDaGVja2xpc3QiLCJpbnB1dHMiLCJyYWRpbyIsInVubW9kaWZpYWJsZSIsImMiLCJjcmVhdGVDaGVja2JveCIsImFkZEJ1dHRvbiIsIm5ld0N1c3RvbUlucHV0IiwiZWwiLCJpIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJjaGVja2VkIiwiY2hpbGQiLCJyZW1vdmVDaGlsZCIsImNoZWNrYm94IiwidGV4dE5vZGUiLCJjb250YWluZXIiLCJwYWRkaW5nTGVmdCIsImluc2VydEJlZm9yZSIsImZvY3VzIiwiY3VzdG9tSXRlbXMiLCJjdXN0b21WYWx1ZXMiLCJleHRyYWN0Q3VzdG9tVmFsdWUiLCJjaGVja2JveEl0ZW1zIiwiY2hlY2tib3hWYWx1ZXMiLCJleHRyYWN0Q2hlY2tib3hWYWx1ZSIsImZpbHRlciIsInYiLCJ2YWx1ZXMiLCJjb25jYXQiLCJqb2luIiwid2luZG93IiwicGFnZXIiLCJmb3JtIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ25FQTs7Ozs7Ozs7Ozs7O0lBQ01BLEUsR0FDRixZQUFhQyxFQUFiLEVBQWlCO0FBQUE7O0FBQ2IsU0FBS0EsRUFBTCxHQUFVQSxFQUFWO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQyxTQUFTQyxjQUFULENBQXdCLEtBQUtILEVBQTdCLENBQVo7QUFDSCxDOztJQUdDSSxLOzs7QUFDRixtQkFBYUosRUFBYixFQUFpQjtBQUFBOztBQUFBLG1IQUNKSyxTQURJOztBQUViLGNBQUtDLEtBQUwsR0FBYUosU0FBU0ssc0JB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QUFULENBQUQsRUFDQyxDQUFDLFFBQUQsRUFBVyxzQ0FBWCxDQURELEVBRUMsQ0FBQyxPQUFELEVBQVUsMENBQVYsQ0FGRCxDQUZkLENBSmdELEVBV2hELElBQUlBLFNBQUosQ0FBYyxzQkFBZCxFQUNjLG1GQURkLEVBRWMsQ0FBQyxDQUFDLE9BQUQsRUFBVSxjQUFWLENBQUQsRUFDQyxDQUFDLFdBQUQsRUFBYyxzQ0FBZCxDQURELEVBRUMsQ0FBQyxZQUFELEVBQWUsaUJBQWYsQ0FGRCxDQUZkLENBWGdELEVBa0JoRCxJQUFJQSxTQUFKLENBQWMsa0NBQWQsRUFDYyw2RUFEZCxFQUVjLENBQUMsQ0FBQyxNQUFELEVBQVMsa0RBQVQsQ0FBRCxFQUNDLENBQUMsT0FBRCxFQUFVLE9BQVYsQ0FERCxFQUVDLENBQUMsVUFBRCxFQUFhLHFEQUFiLENBRkQsQ0FGZCxDQWxCZ0QsRUF5QmhELElBQU1YLE9BQU4sQ0FBYyxxQkFBZCxFQUNjLG1FQURkLENBekJnRCxFQTRCaEQsSUFBSVcsU0FBSixDQUFjLHVCQUFkLEVBQ2MsaUVBRGQsRUFFYyxDQUFDLENBQUMsS0FBRCxFQUFRLDJCQUFSLENBQUQsRUFDQyxDQUFDLE9BQUQsRUFBVSxrQ0FBVixDQURELEVBRUMsQ0FBQyxPQUFELEVBQVUsd0JBQVYsQ0FGRCxFQUdDLENBQUMsT0FBRCxFQUFVLCtCQUFWLENBSEQsRUFJQyxDQUFDLE9BQUQsRUFBVSx1QkFBVixDQUpELEVBS0MsQ0FBQyxPQUFELEVBQVUsdUJBQVYsQ0FMRCxDQUZkLEVBU2MsSUFUZCxFQVNtQixJQVRuQixDQTVCZ0QsQ0FBdkMsRUFzQ1BnQyxNQUFNdEYsT0FBTixDQUFjSixJQUFkLENBQW1CMEYsS0FBbkIsQ0F0Q08sQ0FBZCxDIiwiZmlsZSI6InN1cnZleS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCIndXNlIHN0cmljdCc7XG5jbGFzcyBFbCB7XG4gICAgY29uc3RydWN0b3IgKGlkKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5ub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZCk7XG4gICAgfVxufVxuXG5jbGFzcyBQYWdlciBleHRlbmRzIEVsIHtcbiAgICBjb25zdHJ1Y3RvciAoaWQpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5wYWdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwYWdlXCIpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zY3JvbGxlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VydmV5LXNjcm9sbGVyXCIpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wcmV2ID0gdGhpcy5ub2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwcmV2XCIpWzBdO1xuICAgICAgICB0aGlzLnByZXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucHJldlBhZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMubmV4dCA9IHRoaXMubm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibmV4dFwiKVswXTtcbiAgICAgICAgdGhpcy5uZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm5leHRQYWdlLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdXJ2ZXktc3VibWl0dGVyXCIpO1xuXG4gICAgICAgIHRoaXMuc2V0UGFnZSgwKTtcbiAgICB9XG5cbiAgICBzZXRQYWdlIChpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5pbmRleCA9PSBpbmRleCkgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5pbmRleCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZXNbdGhpcy5pbmRleF0uY2xhc3NMaXN0LnJlbW92ZShcInNob3dpbmdcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG5cbiAgICAgICAgdGhpcy5wYWdlc1t0aGlzLmluZGV4XS5jbGFzc0xpc3QuYWRkKFwic2hvd2luZ1wiKTtcblxuICAgICAgICB0aGlzLnByZXYuc3R5bGUuZGlzcGxheSA9IG51bGw7XG4gICAgICAgIHRoaXMubmV4dC5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdWJtaXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLnByZXYuaW5uZXJIVE1MID0gXCJQcmV2IFNlY3Rpb25cIjtcbiAgICAgICAgdGhpcy5uZXh0LmlubmVySFRNTCA9IFwiTmV4dCBTZWN0aW9uXCI7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByZXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgdGhpcy5uZXh0LmlubmVySFRNTCA9IFwiU3RhcnQgdGhlIFN1cnZleVwiO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaW5kZXggPT09IHRoaXMucGFnZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5uZXh0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIHRoaXMuc3VibWl0LnN0eWxlLmRpc3BsYXkgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBzY3JvbGwgdGhlIGZvcm0gYmFjayB0byB0aGUgdG9wXG4gICAgICAgIHRoaXMuc2Nyb2xsZXIuc2Nyb2xsVG9wID0gMDtcbiAgICB9XG5cbiAgICBuZXh0UGFnZSAoKSB7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLnBhZ2VzLmxlbmd0aCAtIDEpIHJldHVybjtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHRoaXMuaW5kZXggKyAxKTtcbiAgICB9XG4gICAgcHJldlBhZ2UgKCkge1xuICAgICAgICBpZiAodGhpcy5pbmRleCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5pbmRleCAtIDEpO1xuICAgIH1cbn1cblxuY2xhc3MgRm9ybSBleHRlbmRzIEVsIHtcbiAgICBjb25zdHJ1Y3RvciAoaWQsIHN1Ym1pdElkLCBxdWVzdGlvbnMsIHNldFBhZ2UpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcblxuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMucXVlc3Rpb25zID0gcXVlc3Rpb25zO1xuICAgICAgICB0aGlzLnNldFBhZ2UgPSBzZXRQYWdlO1xuXG4gICAgICAgIHZhciBzdWJtaXRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHN1Ym1pdElkKTtcbiAgICAgICAgc3VibWl0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc3VibWl0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHN1Ym1pdCAoKSB7XG4gICAgICAgIHZhciB2YWxpZGl0aWVzID0gdGhpcy5xdWVzdGlvbnMubWFwKHEgPT4gcS5zaG93QWR2aWNlKCkpO1xuICAgICAgICB2YXIgYWxsVmFsaWQgPSB2YWxpZGl0aWVzLmV2ZXJ5KHggPT4geCA9PSB0cnVlKTtcbiAgICAgICAgaWYgKCFhbGxWYWxpZCkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gTWF0aC5mbG9vcih2YWxpZGl0aWVzLmluZGV4T2YoZmFsc2UpIC8gMikgKyAxO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZXR0aW5nIHBhZ2UgdG8gaW5kZXhcIiwgaW5kZXgsIHZhbGlkaXRpZXMpO1xuICAgICAgICAgICAgdGhpcy5zZXRQYWdlKGluZGV4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VibWl0dGluZyBmb3JtOlwiKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zdWJtaXQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgUXVlc3Rpb24gZXh0ZW5kcyBFbCB7XG4gICAgY29uc3RydWN0b3IgKGlkLCB0ZXh0KSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMubm9kZS5jbGFzc0xpc3QuYWRkKFwiZm9ybS1ncm91cFwiKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCkpO1xuICAgICAgICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQobGFiZWwpO1xuXG4gICAgICAgIC8vIHRoaXMub3V0cHV0IHN0b3JlIHRoZSBmaW5hbCBvdXRwdXQgXG4gICAgICAgIHRoaXMub3V0cHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xuICAgICAgICB0aGlzLm91dHB1dC5uYW1lID0gXCJyZXNwb25zZVtcIiArIGlkICsgXCJdXCI7XG4gICAgICAgIHRoaXMub3V0cHV0LmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMub3V0cHV0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5ub2RlLmFwcGVuZENoaWxkKHRoaXMub3V0cHV0KTtcblxuICAgICAgICB0aGlzLmFkdmljZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGhpcy5hZHZpY2VFbC5jbGFzc05hbWUgPSBcImFkdmljZSBhbGVydC1kYW5nZXIgcC0yIG1iLTIgcm91bmRlZFwiO1xuICAgICAgICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQodGhpcy5hZHZpY2VFbCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnVzZXJJbnB1dHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGlzLnVzZXJJbnB1dHMuY2xhc3NOYW1lID0gXCJhbnN3ZXJcIjtcbiAgICAgICAgdGhpcy5ub2RlLmFwcGVuZENoaWxkKHRoaXMudXNlcklucHV0cyk7XG4gICAgfVxuICAgIFxuICAgIGdldCBhbnN3ZXIgKCkgeyBcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDsgXG4gICAgfVxuICAgIGdldCBpc1ZhbGlkICgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGdldCBhZHZpY2UgKCkgeyByZXR1cm4gXCJcIjsgfVxuICAgIHdyaXRlQW5zd2VyICgpIHtcbiAgICAgICAgdmFyIGFuc3dlciA9IHRoaXMuYW5zd2VyO1xuICAgICAgICB2YXIgc2FuaXRpemVkQW5zd2VyID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYW5zd2VyKTtcbiAgICAgICAgdGhpcy5vdXRwdXQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgdGhpcy5vdXRwdXQuYXBwZW5kQ2hpbGQoc2FuaXRpemVkQW5zd2VyKTtcbiAgICAgICAgcmV0dXJuIGFuc3dlcjtcbiAgICB9XG5cbiAgICBzaG93QWR2aWNlICgpIHtcbiAgICAgICAgdmFyIGlzVmFsaWQgPSB0aGlzLmlzVmFsaWQ7XG4gICAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgICAgICB0aGlzLmFkdmljZUVsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93aW5nXCIpO1xuICAgICAgICAgICAgdGhpcy5hZHZpY2VFbC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZHZpY2VFbC5jbGFzc0xpc3QuYWRkKFwic2hvd2luZ1wiKTtcbiAgICAgICAgICAgIHRoaXMuYWR2aWNlRWwuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgIHRoaXMuYWR2aWNlRWwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5hZHZpY2UpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNWYWxpZDtcbiAgICB9XG59XG5cbmNsYXNzIEludGVnZXIgZXh0ZW5kcyBRdWVzdGlvbiB7XG4gICAgY29uc3RydWN0b3IgKGlkLCB0ZXh0LCBtYXgsIG1pbikge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuXG4gICAgICAgIHRoaXMubWluID0gbWluID8gbWluIDogMTtcbiAgICAgICAgdGhpcy5tYXggPSBtYXggPyBtYXggOiAxMDA7XG5cbiAgICAgICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICBpbnB1dC5jbGFzc05hbWUgPSBcImZvcm0tY29udHJvbFwiO1xuICAgICAgICBpbnB1dC50eXBlID0gXCJudW1iZXJcIjtcbiAgICAgICAgaW5wdXQubWF4ID0gdGhpcy5tYXg7XG4gICAgICAgIGlucHV0Lm1pbiA9IHRoaXMubWluO1xuICAgICAgICBpbnB1dC5wbGFjZWhvbGRlciA9IFwiRW50ZXIgYSBudW1iZXIgZnJvbSBcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyB0aGlzLm1pbiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiB0byBcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyB0aGlzLm1heCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIi5cIjtcbiAgICAgICAgdGhpcy5pbnB1dEVsID0gaW5wdXQ7XG5cbiAgICAgICAgdGhpcy51c2VySW5wdXRzLmFwcGVuZENoaWxkKHRoaXMuaW5wdXRFbCk7XG4gICAgfVxuICAgIFxuICAgIGdldCBhbnN3ZXIgKCkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5pbnB1dEVsLnZhbHVlKTtcbiAgICB9XG4gICAgZ2V0IGlzVmFsaWQgKCkge1xuICAgICAgICB2YXIgYW5zd2VyID0gdGhpcy53cml0ZUFuc3dlcigpO1xuICAgICAgICBpZiAoaXNOYU4oYW5zd2VyKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gYW5zd2VyIDw9IHRoaXMubWF4ICYmIGFuc3dlciA+PSB0aGlzLm1pbjtcbiAgICB9XG4gICAgZ2V0IGFkdmljZSAoKSB7XG4gICAgICAgIHJldHVybiBcIk1ha2Ugc3VyZSB5b3UndmUgZW50ZXJlZCBhIG51bWJlciBiZXR3ZWVuIFwiIFxuICAgICAgICAgICAgICAgKyB0aGlzLm1pbiBcbiAgICAgICAgICAgICAgICsgXCIgYW5kIFwiIFxuICAgICAgICAgICAgICAgKyB0aGlzLm1heDtcbiAgICB9XG59XG5cbmNsYXNzIENoZWNrbGlzdCBleHRlbmRzIFF1ZXN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvciAoaWQsIHRleHQsIGlucHV0cywgcmFkaW8sIHVubW9kaWZpYWJsZSkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLnR5cGUgPSByYWRpbyA/IFwicmFkaW9cIiA6IFwiY2hlY2tib3hcIjtcblxuICAgICAgICAvLyBJZiByYWRpbyBtb2RlIGlzIHNldCwgdXNlIHNhbWUgbmFtZSBmb3IgYWxsIGJveGVzXG4gICAgICAgIGZvciAodmFyIGlucHV0IG9mIGlucHV0cykge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBpbnB1dFswXTsgXG4gICAgICAgICAgICB2YXIgdGV4dCA9IGlucHV0WzFdO1xuICAgICAgICAgICAgdmFyIGMgPSB0aGlzLmNyZWF0ZUNoZWNrYm94KG5hbWUsIHRleHQpO1xuICAgICAgICAgICAgdGhpcy51c2VySW5wdXRzLmFwcGVuZENoaWxkKGMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPT0gXCJyYWRpb1wiICYmIHVubW9kaWZpYWJsZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFyIGFkZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBhZGRCdXR0b24uaW5uZXJIVE1MID0gXCJEb24ndCBzZWUgeW91ciBvcHRpb24/IENsaWNrIHRvIGFkZCBhbm90aGVyLlwiO1xuICAgICAgICAgICAgYWRkQnV0dG9uLmNsYXNzTmFtZSA9IFwiYnRuIGJ0bi10aGVtZWQgYnRuLXNtIG10LTIgdy0xMDAgYm9yZGVyLTBcIjtcbiAgICAgICAgICAgIGFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5uZXdDdXN0b21JbnB1dC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQnV0dG9uID0gYWRkQnV0dG9uO1xuICAgICAgICAgICAgdGhpcy51c2VySW5wdXRzLmFwcGVuZENoaWxkKGFkZEJ1dHRvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHRyYWN0Q3VzdG9tVmFsdWUgKGVsKSB7XG4gICAgICAgIHZhciBpID0gZWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbnB1dFwiKVswXTtcbiAgICAgICAgcmV0dXJuIGkudmFsdWU7XG4gICAgfVxuXG4gICAgZXh0cmFjdENoZWNrYm94VmFsdWUgKGVsKSB7XG4gICAgICAgIHZhciBpID0gZWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbnB1dFwiKVswXTtcbiAgICAgICAgaWYgKGkuY2hlY2tlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gXCJyYWRpb1wiKSByZXR1cm4gaS52YWx1ZTtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIGkuaWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgYW5zd2VyICgpIHtcbiAgICAgICAgdmFyIGN1c3RvbUl0ZW1zID0gdGhpcy5ub2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjaGVja2xpc3QtY3VzdG9tXCIpO1xuICAgICAgICBjdXN0b21JdGVtcyA9IFsuLi5jdXN0b21JdGVtc107XG4gICAgICAgIHZhciBjdXN0b21WYWx1ZXMgPSBjdXN0b21JdGVtcy5tYXAodGhpcy5leHRyYWN0Q3VzdG9tVmFsdWUsIHRoaXMpO1xuXG4gICAgICAgIHZhciBjaGVja2JveEl0ZW1zID0gdGhpcy5ub2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjaGVja2xpc3QtaXRlbVwiKTtcbiAgICAgICAgY2hlY2tib3hJdGVtcyA9IFsuLi5jaGVja2JveEl0ZW1zXTtcbiAgICAgICAgdmFyIGNoZWNrYm94VmFsdWVzID0gY2hlY2tib3hJdGVtcy5tYXAodGhpcy5leHRyYWN0Q2hlY2tib3hWYWx1ZSwgdGhpcyk7XG4gICAgICAgIGNoZWNrYm94VmFsdWVzID0gY2hlY2tib3hWYWx1ZXMuZmlsdGVyKHYgPT4gdiAhPSB1bmRlZmluZWQpO1xuXG4gICAgICAgIHZhciB2YWx1ZXMgPSBjdXN0b21WYWx1ZXMuY29uY2F0KGNoZWNrYm94VmFsdWVzKTtcbiAgICAgICAgdmFyIGFuc3dlciA9IHZhbHVlcy5qb2luKFwiXFxuXCIpO1xuICAgICAgICByZXR1cm4gYW5zd2VyO1xuICAgIH1cblxuICAgIGdldCBhZHZpY2UgKCkge1xuICAgICAgICByZXR1cm4gXCJNYWtlIHN1cmUgdG8gY2hlY2sgYXQgbGVhc3Qgb25lIGJveCwgb3IgYWRkIGF0IGxlYXN0IG9uZSBjdXN0b20gdmFsdWVcIjtcbiAgICB9XG4gICAgZ2V0IGlzVmFsaWQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53cml0ZUFuc3dlcigpICE9PSBcIlwiO1xuICAgIH1cblxuICAgIHJlbW92ZUNoaWxkIChjaGlsZCkge1xuICAgICAgICB0aGlzLnVzZXJJbnB1dHMucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgIH1cbiAgICBjcmVhdGVDaGVja2JveCAobmFtZSwgdGV4dCwgY2hlY2tib3gsIHRleHROb2RlKSB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJjaGVja2xpc3QtaXRlbSBmb3JtLWNoZWNrIGJ0biBidG4tbGlnaHRcIjtcblxuICAgICAgICBpZiAodGV4dE5vZGUgPT0gdW5kZWZpbmVkICYmIGNoZWNrYm94ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSBcInJhZGlvXCIpIHtcbiAgICAgICAgICAgICAgICBjaGVja2JveC5pZCA9IHRoaXMuaWQ7XG4gICAgICAgICAgICAgICAgY2hlY2tib3gubmFtZSA9IHRoaXMuaWQ7XG4gICAgICAgICAgICAgICAgY2hlY2tib3gudmFsdWUgPSBuYW1lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjaGVja2JveC5pZCA9IG5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGVja2JveC50eXBlID0gdGhpcy50eXBlO1xuICAgICAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gIWNoZWNrYm94LmNoZWNrZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIiBcIiArIHRleHQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbiAgICBuZXdDdXN0b21JbnB1dCAoKSB7XG4gICAgICAgIHZhciByZW1vdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICByZW1vdmUuY2xhc3NOYW1lID0gXCJyZW1vdmUgYnRuIGJ0bi1vdXRsaW5lLWRhbmdlclwiO1xuICAgICAgICByZW1vdmUuaW5uZXJIVE1MID0gXCImdGltZXM7XCI7XG4gICAgICAgIHJlbW92ZS5zdHlsZS5wYWRkaW5nTGVmdCA9IFwiMXB4XCI7XG5cbiAgICAgICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICBpbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgIGlucHV0LmNsYXNzTmFtZSA9IFwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbVwiO1xuICAgICAgICBpbnB1dC5wbGFjZWhvbGRlciA9IFwiRW50ZXIgbmV3IG9wdGlvbiBoZXJlLi4uXCI7XG5cbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY3JlYXRlQ2hlY2tib3goXCJcIiwgXCJcIiwgcmVtb3ZlLCBpbnB1dCk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY2hlY2tsaXN0LWN1c3RvbVwiLCBcImQtZmxleFwiLCBcImFsaWduLWl0ZW1zLWNlbnRlclwiKTtcbiAgICAgICAgcmVtb3ZlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnJlbW92ZUNoaWxkLmJpbmQodGhpcywgY29udGFpbmVyKSk7XG5cbiAgICAgICAgdGhpcy51c2VySW5wdXRzLmluc2VydEJlZm9yZShjb250YWluZXIsIHRoaXMuYWRkQnV0dG9uKTtcblxuICAgICAgICBpbnB1dC5mb2N1cygpO1xuICAgIH1cbn1cblxud2luZG93LnBhZ2VyID0gbmV3IFBhZ2VyKFwic3VydmV5LWJvZHlcIik7XG5cbndpbmRvdy5mb3JtID0gbmV3IEZvcm0oXCJzdXJ2ZXlcIiwgXCJzdXJ2ZXktc3VibWl0dGVyXCIsIFtcbiAgICAgbmV3ICAgSW50ZWdlcihcImNvdW50X3NpbXVsdGFuZW91c19hcHBsaWNhdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgLFwiV2hlbiBzZWFyY2hpbmcgZm9yIGEgam9iLCByb3VnaGx5IGhvdyBtYW55IHNlcGFyYXRlIGpvYiBhcHBsaWNhdGlvbnMgZG8geW91IHRlbmQgdG8gbWFuYWdlIGF0IGFueSBvbmUgdGltZT9cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICxuZXcgQ2hlY2tsaXN0KFwiaG93X3RyYWNraW5nXCJcbiAgICAgICAgICAgICAgICAgICxcIkhvdyBkbyB5b3Ugbm9ybWFsbHkga2VlcCB0cmFjayBvZiB5b3VyIGFwcGxpY2F0aW9ucyBhbmQgdGhlaXIgZG9jdW1lbnRzIGFzIHlvdSBhcHBseSB0byB0aGVtP1wiXG4gICAgICAgICAgICAgICAgICAsW1tcImRvY3NcIiwgXCJXb3JkIERvY3VtZW50cyAvIFR5cGVkIFVwIEZpbGVzICguZG9jLCAudHh0LCAuZXRjKVwiXVxuICAgICAgICAgICAgICAgICAgICxbXCJzcHJlYWRcIiwgXCJTcHJlYWRzaGVldHMgKEV4Y2VsLCBHbnVtZXJpYywgZXRjLilcIl1cbiAgICAgICAgICAgICAgICAgICAsW1wicGFwZXJcIiwgXCJQZW4gYW5kIFBhcGVyIChOb3RlYm9vaywgUG9zdC1JdHMsIGV0Yy4pXCJdXG4gICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICxuZXcgQ2hlY2tsaXN0KFwid2hhdF9leHRyYV9kb2N1bWVudHNcIlxuICAgICAgICAgICAgICAgICAgLFwiV2hhdCBkb2N1bWVudHMgaGF2ZSBiZWVuIHJlcXVlc3RlZCBmcm9tIHlvdSBpbiBwYXN0IGFwcGxpY2F0aW9ucywgYXNpZGUgZnJvbSBDVnM/XCJcbiAgICAgICAgICAgICAgICAgICxbW1wiY292ZXJcIiwgXCJDb3ZlciBMZXR0ZXJcIl1cbiAgICAgICAgICAgICAgICAgICAsW1wicmVmZXJlbmNlXCIsIFwiTGV0dGVyIG9mIFJlZmVyZW5jZSAvIFJlY29tbWVuZGF0aW9uXCJdXG4gICAgICAgICAgICAgICAgICAgLFtcInBoaWxvc29waHlcIiwgXCJXb3JrIFBoaWxvc29waHlcIl1cbiAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApXG4gICAgLG5ldyBDaGVja2xpc3QoXCJ3aGF0X2RvY3VtZW50X2NyZWF0aW9uX3NvZnR3YXJlc1wiXG4gICAgICAgICAgICAgICAgICAsXCJXaGF0IHByb2dyYW1zIG9yIHNvZnR3YXJlcyBkbyB5b3UgdXNlIHRvIGNyZWF0ZSBkb2N1bWVudHMgZm9yIGFwcGxpY2F0aW9ucz9cIlxuICAgICAgICAgICAgICAgICAgLFtbXCJ3b3JkXCIsIFwiV29yZCAvIEdvb2dsZSBEb2NzIC8gT3RoZXIgT2ZmaWNlIFN1aXRlIFNvZnR3YXJlXCJdXG4gICAgICAgICAgICAgICAgICAgLFtcImxhdGV4XCIsIFwiTGFUZVhcIl1cbiAgICAgICAgICAgICAgICAgICAsW1wiaW5kZXNpZ25cIiwgXCJJbkRlc2lnbiAvIEdJTVAgLyBPdGhlciBEZXNpZ24gYW5kIEFydHdvcmsgU29mdHdhcmVcIl1cbiAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApXG4gICAgLG5ldyAgIEludGVnZXIoXCJjb3VudF9kaWZmZXJlbnRfY3ZzXCJcbiAgICAgICAgICAgICAgICAgICxcIkhvdyBtYW55IGRpZmZlcmVudCBDVnMgZG8geW91IGdlbmVyYWxseSBtYWludGFpbiBhdCBhIGdpdmVuIHRpbWU/XCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAsbmV3IENoZWNrbGlzdChcIndoYXRfdXBkYXRlX2ZyZXF1ZW5jeVwiXG4gICAgICAgICAgICAgICAgICAsXCJIb3cgb2Z0ZW4gZG8geW91IHVwZGF0ZSBvciBjaGFuZ2UgeW91ciBDVidzIGNvbnRlbnRzIG9yIGxheW91dD9cIlxuICAgICAgICAgICAgICAgICAgLFtbXCJqb2JcIiwgXCJGb3IgZXZlcnkgam9iIGFwcGxpY2F0aW9uXCJdXG4gICAgICAgICAgICAgICAgICAgLFtcInNraWxsXCIsIFwiRXZlcnkgdGltZSBJIGFjcXVpcmUgYSBuZXcgc2tpbGxcIl1cbiAgICAgICAgICAgICAgICAgICAsW1wiPjFwbW9cIiwgXCJNb3JlIHRoYW4gb25jZSBhIG1vbnRoXCJdXG4gICAgICAgICAgICAgICAgICAgLFtcIj4zcG1vXCIsIFwiTW9yZSB0aGFuIG9uY2UgZXZlcnkgMyBtb250aHNcIl1cbiAgICAgICAgICAgICAgICAgICAsW1wiPjFweXJcIiwgXCJNb3JlIHRoYW4gb25jZSBhIHllYXJcIl1cbiAgICAgICAgICAgICAgICAgICAsW1wiPDFweXJcIiwgXCJMZXNzIHRoYW4gb25jZSBhIHllYXJcIl1cbiAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAsdHJ1ZSx0cnVlKVxuICAgIF0sIHBhZ2VyLnNldFBhZ2UuYmluZChwYWdlcikpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==