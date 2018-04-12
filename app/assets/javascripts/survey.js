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
                console.log("All is well");
                console.log(this.node);
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
        label.innerHTML = text;
        _this3.node.appendChild(label);

        // this.output store the final output 
        _this3.output = document.createElement("input");
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
            this.output.value = answer;
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

        if (unmodifiable !== true) {
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
            return this.writeAnswer() !== "";
        }
    }]);

    return Checklist;
}(Question);

window.pager = new Pager("survey-body");

window.form = new Form("survey", "survey-submitter", [new Integer("count_simultaneous_applications", "When searching for a job, roughly how many separate job applications do you tend to manage at any one time?"), new Checklist("how_tracking", "How do you normally keep track of your applications and their documents as you apply to them?", [["docs", "Word Documents / Typed Up Files (.doc, .txt, .etc)"], ["spread", "Spreadsheets (Excel, Gnumeric, etc.)"], ["paper", "Pen and Paper (Notebook, Post-Its, etc.)"]]), new Checklist("what_extra_documents", "What documents have been requested from you in past applications, aside from CVs?", [["cover", "Cover Letter"], ["reference", "Letter of Reference / Recommendation"], ["philosophy", "Work Philosophy"]]), new Checklist("what_document_creation_softwares", "What programs or softwares do you use to create documents for applications?", [["word", "Word / Google Docs / Other Office Suite Software"], ["latex", "LaTeX"], ["indesign", "InDesign / GIMP / Other Design and Artwork Software"]]), new Integer("count_different_cvs", "How many different CVs do you generally maintain at a given time?"), new Checklist("what_update_frequency", "How often do you update or change your CV's contents or layout?<br/><small class='text-muted text-normal'>(Pick the first that applies.)</small>", [["job", "For every job application"], ["skill", "Every time I acquire a new skill"], [">1pmo", "More than once a month"], [">3pmo", "More than once every 3 months"], [">1pyr", "More than once a year"], ["<1pyr", "Less than once a year"]], true, true)], pager.setPage.bind(pager));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyJdLCJuYW1lcyI6WyJFbCIsImlkIiwibm9kZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJQYWdlciIsImFyZ3VtZW50cyIsInBhZ2VzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInNjcm9sbGVyIiwicHJldiIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcmV2UGFnZSIsImJpbmQiLCJuZXh0IiwibmV4dFBhZ2UiLCJzdWJtaXQiLCJzZXRQYWdlIiwiaW5kZXgiLCJ1bmRlZmluZWQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJzdHlsZSIsImRpc3BsYXkiLCJpbm5lckhUTUwiLCJsZW5ndGgiLCJzY3JvbGxUb3AiLCJGb3JtIiwic3VibWl0SWQiLCJxdWVzdGlvbnMiLCJzdWJtaXRFbCIsInZhbGlkaXRpZXMiLCJtYXAiLCJxIiwic2hvd0FkdmljZSIsImFsbFZhbGlkIiwiZXZlcnkiLCJ4IiwiTWF0aCIsImZsb29yIiwiaW5kZXhPZiIsImNvbnNvbGUiLCJsb2ciLCJRdWVzdGlvbiIsInRleHQiLCJsYWJlbCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsIm91dHB1dCIsIm5hbWUiLCJoaWRkZW4iLCJhZHZpY2VFbCIsImNsYXNzTmFtZSIsInVzZXJJbnB1dHMiLCJhbnN3ZXIiLCJ2YWx1ZSIsImlzVmFsaWQiLCJhZHZpY2UiLCJJbnRlZ2VyIiwibWF4IiwibWluIiwiaW5wdXQiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJpbnB1dEVsIiwicGFyc2VJbnQiLCJ3cml0ZUFuc3dlciIsImlzTmFOIiwiQ2hlY2tsaXN0IiwiaW5wdXRzIiwicmFkaW8iLCJ1bm1vZGlmaWFibGUiLCJjIiwiY3JlYXRlQ2hlY2tib3giLCJhZGRCdXR0b24iLCJuZXdDdXN0b21JbnB1dCIsImVsIiwiaSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY2hlY2tlZCIsImNoaWxkIiwicmVtb3ZlQ2hpbGQiLCJjaGVja2JveCIsInRleHROb2RlIiwiY29udGFpbmVyIiwiY3JlYXRlVGV4dE5vZGUiLCJwYWRkaW5nTGVmdCIsImluc2VydEJlZm9yZSIsImZvY3VzIiwiY3VzdG9tSXRlbXMiLCJjdXN0b21WYWx1ZXMiLCJleHRyYWN0Q3VzdG9tVmFsdWUiLCJjaGVja2JveEl0ZW1zIiwiY2hlY2tib3hWYWx1ZXMiLCJleHRyYWN0Q2hlY2tib3hWYWx1ZSIsImZpbHRlciIsInYiLCJ2YWx1ZXMiLCJjb25jYXQiLCJqb2luIiwid2luZG93IiwicGFnZXIiLCJmb3JtIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ25FTUEsRSxHQUNGLFlBQWFDLEVBQWIsRUFBaUI7QUFBQTs7QUFDYixTQUFLQSxFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLQyxJQUFMLEdBQVlDLFNBQVNDLGNBQVQsQ0FBd0IsS0FBS0gsRUFBN0IsQ0FBWjtBQUNILEM7O0lBR0NJLEs7OztBQUNGLG1CQUFhSixFQUFiLEVBQWlCO0FBQUE7O0FBQUEsbUhBQ0pLLFNBREk7O0FBRWIsY0FBS0MsS0FBTCxHQUFhSixTQUFTSyxzQkFBVCxDQUFnQyxNQUFoQyxDQUFiOztB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NkVBRGQsRUFFYyxDQUFDLENBQUMsTUFBRCxFQUFTLGtEQUFULENBQUQsRUFDQyxDQUFDLE9BQUQsRUFBVSxPQUFWLENBREQsRUFFQyxDQUFDLFVBQUQsRUFBYSxxREFBYixDQUZELENBRmQsQ0FsQmdELEVBeUJoRCxJQUFNVixPQUFOLENBQWMscUJBQWQsRUFDYyxtRUFEZCxDQXpCZ0QsRUE0QmhELElBQUlVLFNBQUosQ0FBYyx1QkFBZCxFQUNjLGtKQURkLEVBRWMsQ0FBQyxDQUFDLEtBQUQsRUFBUSwyQkFBUixDQUFELEVBQ0MsQ0FBQyxPQUFELEVBQVUsa0NBQVYsQ0FERCxFQUVDLENBQUMsT0FBRCxFQUFVLHdCQUFWLENBRkQsRUFHQyxDQUFDLE9BQUQsRUFBVSwrQkFBVixDQUhELEVBSUMsQ0FBQyxPQUFELEVBQVUsdUJBQVYsQ0FKRCxFQUtDLENBQUMsT0FBRCxFQUFVLHVCQUFWLENBTEQsQ0FGZCxFQVNjLElBVGQsRUFTbUIsSUFUbkIsQ0E1QmdELENBQXZDLEVBc0NQaUMsTUFBTXJGLE9BQU4sQ0FBY0osSUFBZCxDQUFtQnlGLEtBQW5CLENBdENPLENBQWQsQyIsImZpbGUiOiJzdXJ2ZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiY2xhc3MgRWwge1xuICAgIGNvbnN0cnVjdG9yIChpZCkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMubm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpO1xuICAgIH1cbn1cblxuY2xhc3MgUGFnZXIgZXh0ZW5kcyBFbCB7XG4gICAgY29uc3RydWN0b3IgKGlkKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMucGFnZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicGFnZVwiKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2Nyb2xsZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1cnZleS1zY3JvbGxlclwiKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucHJldiA9IHRoaXMubm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicHJldlwiKVswXTtcbiAgICAgICAgdGhpcy5wcmV2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnByZXZQYWdlLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLm5leHQgPSB0aGlzLm5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm5leHRcIilbMF07XG4gICAgICAgIHRoaXMubmV4dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5uZXh0UGFnZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLnN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VydmV5LXN1Ym1pdHRlclwiKTtcblxuICAgICAgICB0aGlzLnNldFBhZ2UoMCk7XG4gICAgfVxuXG4gICAgc2V0UGFnZSAoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5kZXggPT0gaW5kZXgpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuaW5kZXggIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2VzW3RoaXMuaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93aW5nXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuXG4gICAgICAgIHRoaXMucGFnZXNbdGhpcy5pbmRleF0uY2xhc3NMaXN0LmFkZChcInNob3dpbmdcIik7XG5cbiAgICAgICAgdGhpcy5wcmV2LnN0eWxlLmRpc3BsYXkgPSBudWxsO1xuICAgICAgICB0aGlzLm5leHQuc3R5bGUuZGlzcGxheSA9IG51bGw7XG4gICAgICAgIHRoaXMuc3VibWl0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5wcmV2LmlubmVySFRNTCA9IFwiUHJldiBTZWN0aW9uXCI7XG4gICAgICAgIHRoaXMubmV4dC5pbm5lckhUTUwgPSBcIk5leHQgU2VjdGlvblwiO1xuICAgICAgICBpZiAodGhpcy5pbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5wcmV2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIHRoaXMubmV4dC5pbm5lckhUTUwgPSBcIlN0YXJ0IHRoZSBTdXJ2ZXlcIjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLnBhZ2VzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdC5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gc2Nyb2xsIHRoZSBmb3JtIGJhY2sgdG8gdGhlIHRvcFxuICAgICAgICB0aGlzLnNjcm9sbGVyLnNjcm9sbFRvcCA9IDA7XG4gICAgfVxuXG4gICAgbmV4dFBhZ2UgKCkge1xuICAgICAgICBpZiAodGhpcy5pbmRleCA9PT0gdGhpcy5wYWdlcy5sZW5ndGggLSAxKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLmluZGV4ICsgMSk7XG4gICAgfVxuICAgIHByZXZQYWdlICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5kZXggPT09IDApIHJldHVybjtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHRoaXMuaW5kZXggLSAxKTtcbiAgICB9XG59XG5cbmNsYXNzIEZvcm0gZXh0ZW5kcyBFbCB7XG4gICAgY29uc3RydWN0b3IgKGlkLCBzdWJtaXRJZCwgcXVlc3Rpb25zLCBzZXRQYWdlKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG5cbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLnF1ZXN0aW9ucyA9IHF1ZXN0aW9ucztcbiAgICAgICAgdGhpcy5zZXRQYWdlID0gc2V0UGFnZTtcblxuICAgICAgICB2YXIgc3VibWl0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzdWJtaXRJZCk7XG4gICAgICAgIHN1Ym1pdEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnN1Ym1pdC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBzdWJtaXQgKCkge1xuICAgICAgICB2YXIgdmFsaWRpdGllcyA9IHRoaXMucXVlc3Rpb25zLm1hcChxID0+IHEuc2hvd0FkdmljZSgpKTtcbiAgICAgICAgdmFyIGFsbFZhbGlkID0gdmFsaWRpdGllcy5ldmVyeSh4ID0+IHggPT0gdHJ1ZSk7XG4gICAgICAgIGlmICghYWxsVmFsaWQpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IE1hdGguZmxvb3IodmFsaWRpdGllcy5pbmRleE9mKGZhbHNlKSAvIDIpICsgMTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2V0dGluZyBwYWdlIHRvIGluZGV4XCIsIGluZGV4LCB2YWxpZGl0aWVzKTtcbiAgICAgICAgICAgIHRoaXMuc2V0UGFnZShpbmRleCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFsbCBpcyB3ZWxsXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5ub2RlKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zdWJtaXQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgUXVlc3Rpb24gZXh0ZW5kcyBFbCB7XG4gICAgY29uc3RydWN0b3IgKGlkLCB0ZXh0KSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMubm9kZS5jbGFzc0xpc3QuYWRkKFwiZm9ybS1ncm91cFwiKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgbGFiZWwuaW5uZXJIVE1MID0gdGV4dDtcbiAgICAgICAgdGhpcy5ub2RlLmFwcGVuZENoaWxkKGxhYmVsKTtcblxuICAgICAgICAvLyB0aGlzLm91dHB1dCBzdG9yZSB0aGUgZmluYWwgb3V0cHV0IFxuICAgICAgICB0aGlzLm91dHB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgdGhpcy5vdXRwdXQubmFtZSA9IFwicmVzcG9uc2VbXCIgKyBpZCArIFwiXVwiO1xuICAgICAgICB0aGlzLm91dHB1dC5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLm91dHB1dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMubm9kZS5hcHBlbmRDaGlsZCh0aGlzLm91dHB1dCk7XG5cbiAgICAgICAgdGhpcy5hZHZpY2VFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMuYWR2aWNlRWwuY2xhc3NOYW1lID0gXCJhZHZpY2UgYWxlcnQtZGFuZ2VyIHAtMiBtYi0yIHJvdW5kZWRcIjtcbiAgICAgICAgdGhpcy5ub2RlLmFwcGVuZENoaWxkKHRoaXMuYWR2aWNlRWwpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy51c2VySW5wdXRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGhpcy51c2VySW5wdXRzLmNsYXNzTmFtZSA9IFwiYW5zd2VyXCI7XG4gICAgICAgIHRoaXMubm9kZS5hcHBlbmRDaGlsZCh0aGlzLnVzZXJJbnB1dHMpO1xuICAgIH1cbiAgICBcbiAgICBnZXQgYW5zd2VyICgpIHsgXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7IFxuICAgIH1cbiAgICBnZXQgaXNWYWxpZCAoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBnZXQgYWR2aWNlICgpIHsgcmV0dXJuIFwiXCI7IH1cbiAgICB3cml0ZUFuc3dlciAoKSB7XG4gICAgICAgIHZhciBhbnN3ZXIgPSB0aGlzLmFuc3dlcjtcbiAgICAgICAgdGhpcy5vdXRwdXQudmFsdWUgPSBhbnN3ZXI7XG4gICAgICAgIHJldHVybiBhbnN3ZXI7XG4gICAgfVxuXG4gICAgc2hvd0FkdmljZSAoKSB7XG4gICAgICAgIHZhciBpc1ZhbGlkID0gdGhpcy5pc1ZhbGlkO1xuICAgICAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICAgICAgdGhpcy5hZHZpY2VFbC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd2luZ1wiKTtcbiAgICAgICAgICAgIHRoaXMuYWR2aWNlRWwuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWR2aWNlRWwuY2xhc3NMaXN0LmFkZChcInNob3dpbmdcIik7XG4gICAgICAgICAgICB0aGlzLmFkdmljZUVsLmlubmVySFRNTCA9IHRoaXMuYWR2aWNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xuICAgIH1cbn1cblxuY2xhc3MgSW50ZWdlciBleHRlbmRzIFF1ZXN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvciAoaWQsIHRleHQsIG1heCwgbWluKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG5cbiAgICAgICAgdGhpcy5taW4gPSBtaW4gPyBtaW4gOiAxO1xuICAgICAgICB0aGlzLm1heCA9IG1heCA/IG1heCA6IDEwMDtcblxuICAgICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGlucHV0LmNsYXNzTmFtZSA9IFwiZm9ybS1jb250cm9sXCI7XG4gICAgICAgIGlucHV0LnR5cGUgPSBcIm51bWJlclwiO1xuICAgICAgICBpbnB1dC5tYXggPSB0aGlzLm1heDtcbiAgICAgICAgaW5wdXQubWluID0gdGhpcy5taW47XG4gICAgICAgIGlucHV0LnBsYWNlaG9sZGVyID0gXCJFbnRlciBhIG51bWJlciBmcm9tIFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICArIHRoaXMubWluIFxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiIHRvIFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICArIHRoaXMubWF4IFxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiLlwiO1xuICAgICAgICB0aGlzLmlucHV0RWwgPSBpbnB1dDtcblxuICAgICAgICB0aGlzLnVzZXJJbnB1dHMuYXBwZW5kQ2hpbGQodGhpcy5pbnB1dEVsKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGFuc3dlciAoKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLmlucHV0RWwudmFsdWUpO1xuICAgIH1cbiAgICBnZXQgaXNWYWxpZCAoKSB7XG4gICAgICAgIHZhciBhbnN3ZXIgPSB0aGlzLndyaXRlQW5zd2VyKCk7XG4gICAgICAgIGlmIChpc05hTihhbnN3ZXIpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBhbnN3ZXIgPD0gdGhpcy5tYXggJiYgYW5zd2VyID49IHRoaXMubWluO1xuICAgIH1cbiAgICBnZXQgYWR2aWNlICgpIHtcbiAgICAgICAgcmV0dXJuIFwiTWFrZSBzdXJlIHlvdSd2ZSBlbnRlcmVkIGEgbnVtYmVyIGJldHdlZW4gXCIgXG4gICAgICAgICAgICAgICArIHRoaXMubWluIFxuICAgICAgICAgICAgICAgKyBcIiBhbmQgXCIgXG4gICAgICAgICAgICAgICArIHRoaXMubWF4O1xuICAgIH1cbn1cblxuY2xhc3MgQ2hlY2tsaXN0IGV4dGVuZHMgUXVlc3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yIChpZCwgdGV4dCwgaW5wdXRzLCByYWRpbywgdW5tb2RpZmlhYmxlKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMudHlwZSA9IHJhZGlvID8gXCJyYWRpb1wiIDogXCJjaGVja2JveFwiO1xuXG4gICAgICAgIC8vIElmIHJhZGlvIG1vZGUgaXMgc2V0LCB1c2Ugc2FtZSBuYW1lIGZvciBhbGwgYm94ZXNcbiAgICAgICAgZm9yICh2YXIgaW5wdXQgb2YgaW5wdXRzKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IGlucHV0WzBdOyBcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gaW5wdXRbMV07XG4gICAgICAgICAgICB2YXIgYyA9IHRoaXMuY3JlYXRlQ2hlY2tib3gobmFtZSwgdGV4dCk7XG4gICAgICAgICAgICB0aGlzLnVzZXJJbnB1dHMuYXBwZW5kQ2hpbGQoYyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodW5tb2RpZmlhYmxlICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB2YXIgYWRkQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGFkZEJ1dHRvbi5pbm5lckhUTUwgPSBcIkRvbid0IHNlZSB5b3VyIG9wdGlvbj8gQ2xpY2sgdG8gYWRkIGFub3RoZXIuXCI7XG4gICAgICAgICAgICBhZGRCdXR0b24uY2xhc3NOYW1lID0gXCJidG4gYnRuLXRoZW1lZCBidG4tc20gbXQtMiB3LTEwMCBib3JkZXItMFwiO1xuICAgICAgICAgICAgYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm5ld0N1c3RvbUlucHV0LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5hZGRCdXR0b24gPSBhZGRCdXR0b247XG4gICAgICAgICAgICB0aGlzLnVzZXJJbnB1dHMuYXBwZW5kQ2hpbGQoYWRkQnV0dG9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4dHJhY3RDdXN0b21WYWx1ZSAoZWwpIHtcbiAgICAgICAgdmFyIGkgPSBlbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpWzBdO1xuICAgICAgICByZXR1cm4gaS52YWx1ZTtcbiAgICB9XG5cbiAgICBleHRyYWN0Q2hlY2tib3hWYWx1ZSAoZWwpIHtcbiAgICAgICAgdmFyIGkgPSBlbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpWzBdO1xuICAgICAgICBpZiAoaS5jaGVja2VkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSBcInJhZGlvXCIpIHJldHVybiBpLnZhbHVlO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gaS5pZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBhbnN3ZXIgKCkge1xuICAgICAgICB2YXIgY3VzdG9tSXRlbXMgPSB0aGlzLm5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNoZWNrbGlzdC1jdXN0b21cIik7XG4gICAgICAgIGN1c3RvbUl0ZW1zID0gWy4uLmN1c3RvbUl0ZW1zXTtcbiAgICAgICAgdmFyIGN1c3RvbVZhbHVlcyA9IGN1c3RvbUl0ZW1zLm1hcCh0aGlzLmV4dHJhY3RDdXN0b21WYWx1ZSwgdGhpcyk7XG5cbiAgICAgICAgdmFyIGNoZWNrYm94SXRlbXMgPSB0aGlzLm5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNoZWNrbGlzdC1pdGVtXCIpO1xuICAgICAgICBjaGVja2JveEl0ZW1zID0gWy4uLmNoZWNrYm94SXRlbXNdO1xuICAgICAgICB2YXIgY2hlY2tib3hWYWx1ZXMgPSBjaGVja2JveEl0ZW1zLm1hcCh0aGlzLmV4dHJhY3RDaGVja2JveFZhbHVlLCB0aGlzKTtcbiAgICAgICAgY2hlY2tib3hWYWx1ZXMgPSBjaGVja2JveFZhbHVlcy5maWx0ZXIodiA9PiB2ICE9IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgdmFyIHZhbHVlcyA9IGN1c3RvbVZhbHVlcy5jb25jYXQoY2hlY2tib3hWYWx1ZXMpO1xuICAgICAgICByZXR1cm4gdmFsdWVzLmpvaW4oXCJcXG5cIik7XG4gICAgfVxuXG4gICAgZ2V0IGFkdmljZSAoKSB7XG4gICAgICAgIHJldHVybiBcIk1ha2Ugc3VyZSB0byBjaGVjayBhdCBsZWFzdCBvbmUgYm94LCBvciBhZGQgYXQgbGVhc3Qgb25lIGN1c3RvbSB2YWx1ZVwiO1xuICAgIH1cbiAgICBnZXQgaXNWYWxpZCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndyaXRlQW5zd2VyKCkgIT09IFwiXCI7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ2hpbGQgKGNoaWxkKSB7XG4gICAgICAgIHRoaXMudXNlcklucHV0cy5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgfVxuICAgIGNyZWF0ZUNoZWNrYm94IChuYW1lLCB0ZXh0LCBjaGVja2JveCwgdGV4dE5vZGUpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcImNoZWNrbGlzdC1pdGVtIGZvcm0tY2hlY2sgYnRuIGJ0bi1saWdodFwiO1xuXG4gICAgICAgIGlmICh0ZXh0Tm9kZSA9PSB1bmRlZmluZWQgJiYgY2hlY2tib3ggPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09IFwicmFkaW9cIikge1xuICAgICAgICAgICAgICAgIGNoZWNrYm94LmlkID0gdGhpcy5pZDtcbiAgICAgICAgICAgICAgICBjaGVja2JveC52YWx1ZSA9IG5hbWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNoZWNrYm94LmlkID0gbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoZWNrYm94LnR5cGUgPSB0aGlzLnR5cGU7XG4gICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSAhY2hlY2tib3guY2hlY2tlZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiIFwiICsgdGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuICAgIG5ld0N1c3RvbUlucHV0ICgpIHtcbiAgICAgICAgdmFyIHJlbW92ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHJlbW92ZS5jbGFzc05hbWUgPSBcInJlbW92ZSBidG4gYnRuLW91dGxpbmUtZGFuZ2VyXCI7XG4gICAgICAgIHJlbW92ZS5pbm5lckhUTUwgPSBcIiZ0aW1lcztcIjtcbiAgICAgICAgcmVtb3ZlLnN0eWxlLnBhZGRpbmdMZWZ0ID0gXCIxcHhcIjtcblxuICAgICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGlucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgICAgICAgaW5wdXQuY2xhc3NOYW1lID0gXCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtXCI7XG4gICAgICAgIGlucHV0LnBsYWNlaG9sZGVyID0gXCJFbnRlciBuZXcgb3B0aW9uIGhlcmUuLi5cIjtcblxuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jcmVhdGVDaGVja2JveChcIlwiLCBcIlwiLCByZW1vdmUsIGlucHV0KTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjaGVja2xpc3QtY3VzdG9tXCIsIFwiZC1mbGV4XCIsIFwiYWxpZ24taXRlbXMtY2VudGVyXCIpO1xuICAgICAgICByZW1vdmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucmVtb3ZlQ2hpbGQuYmluZCh0aGlzLCBjb250YWluZXIpKTtcblxuICAgICAgICB0aGlzLnVzZXJJbnB1dHMuaW5zZXJ0QmVmb3JlKGNvbnRhaW5lciwgdGhpcy5hZGRCdXR0b24pO1xuXG4gICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgfVxufVxuXG53aW5kb3cucGFnZXIgPSBuZXcgUGFnZXIoXCJzdXJ2ZXktYm9keVwiKTtcblxud2luZG93LmZvcm0gPSBuZXcgRm9ybShcInN1cnZleVwiLCBcInN1cnZleS1zdWJtaXR0ZXJcIiwgW1xuICAgICBuZXcgICBJbnRlZ2VyKFwiY291bnRfc2ltdWx0YW5lb3VzX2FwcGxpY2F0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAsXCJXaGVuIHNlYXJjaGluZyBmb3IgYSBqb2IsIHJvdWdobHkgaG93IG1hbnkgc2VwYXJhdGUgam9iIGFwcGxpY2F0aW9ucyBkbyB5b3UgdGVuZCB0byBtYW5hZ2UgYXQgYW55IG9uZSB0aW1lP1wiXG4gICAgICAgICAgICAgICAgICApXG4gICAgLG5ldyBDaGVja2xpc3QoXCJob3dfdHJhY2tpbmdcIlxuICAgICAgICAgICAgICAgICAgLFwiSG93IGRvIHlvdSBub3JtYWxseSBrZWVwIHRyYWNrIG9mIHlvdXIgYXBwbGljYXRpb25zIGFuZCB0aGVpciBkb2N1bWVudHMgYXMgeW91IGFwcGx5IHRvIHRoZW0/XCJcbiAgICAgICAgICAgICAgICAgICxbW1wiZG9jc1wiLCBcIldvcmQgRG9jdW1lbnRzIC8gVHlwZWQgVXAgRmlsZXMgKC5kb2MsIC50eHQsIC5ldGMpXCJdXG4gICAgICAgICAgICAgICAgICAgLFtcInNwcmVhZFwiLCBcIlNwcmVhZHNoZWV0cyAoRXhjZWwsIEdudW1lcmljLCBldGMuKVwiXVxuICAgICAgICAgICAgICAgICAgICxbXCJwYXBlclwiLCBcIlBlbiBhbmQgUGFwZXIgKE5vdGVib29rLCBQb3N0LUl0cywgZXRjLilcIl1cbiAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApXG4gICAgLG5ldyBDaGVja2xpc3QoXCJ3aGF0X2V4dHJhX2RvY3VtZW50c1wiXG4gICAgICAgICAgICAgICAgICAsXCJXaGF0IGRvY3VtZW50cyBoYXZlIGJlZW4gcmVxdWVzdGVkIGZyb20geW91IGluIHBhc3QgYXBwbGljYXRpb25zLCBhc2lkZSBmcm9tIENWcz9cIlxuICAgICAgICAgICAgICAgICAgLFtbXCJjb3ZlclwiLCBcIkNvdmVyIExldHRlclwiXVxuICAgICAgICAgICAgICAgICAgICxbXCJyZWZlcmVuY2VcIiwgXCJMZXR0ZXIgb2YgUmVmZXJlbmNlIC8gUmVjb21tZW5kYXRpb25cIl1cbiAgICAgICAgICAgICAgICAgICAsW1wicGhpbG9zb3BoeVwiLCBcIldvcmsgUGhpbG9zb3BoeVwiXVxuICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAsbmV3IENoZWNrbGlzdChcIndoYXRfZG9jdW1lbnRfY3JlYXRpb25fc29mdHdhcmVzXCJcbiAgICAgICAgICAgICAgICAgICxcIldoYXQgcHJvZ3JhbXMgb3Igc29mdHdhcmVzIGRvIHlvdSB1c2UgdG8gY3JlYXRlIGRvY3VtZW50cyBmb3IgYXBwbGljYXRpb25zP1wiXG4gICAgICAgICAgICAgICAgICAsW1tcIndvcmRcIiwgXCJXb3JkIC8gR29vZ2xlIERvY3MgLyBPdGhlciBPZmZpY2UgU3VpdGUgU29mdHdhcmVcIl1cbiAgICAgICAgICAgICAgICAgICAsW1wibGF0ZXhcIiwgXCJMYVRlWFwiXVxuICAgICAgICAgICAgICAgICAgICxbXCJpbmRlc2lnblwiLCBcIkluRGVzaWduIC8gR0lNUCAvIE90aGVyIERlc2lnbiBhbmQgQXJ0d29yayBTb2Z0d2FyZVwiXVxuICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAsbmV3ICAgSW50ZWdlcihcImNvdW50X2RpZmZlcmVudF9jdnNcIlxuICAgICAgICAgICAgICAgICAgLFwiSG93IG1hbnkgZGlmZmVyZW50IENWcyBkbyB5b3UgZ2VuZXJhbGx5IG1haW50YWluIGF0IGEgZ2l2ZW4gdGltZT9cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICxuZXcgQ2hlY2tsaXN0KFwid2hhdF91cGRhdGVfZnJlcXVlbmN5XCJcbiAgICAgICAgICAgICAgICAgICxcIkhvdyBvZnRlbiBkbyB5b3UgdXBkYXRlIG9yIGNoYW5nZSB5b3VyIENWJ3MgY29udGVudHMgb3IgbGF5b3V0Pzxici8+PHNtYWxsIGNsYXNzPSd0ZXh0LW11dGVkIHRleHQtbm9ybWFsJz4oUGljayB0aGUgZmlyc3QgdGhhdCBhcHBsaWVzLik8L3NtYWxsPlwiXG4gICAgICAgICAgICAgICAgICAsW1tcImpvYlwiLCBcIkZvciBldmVyeSBqb2IgYXBwbGljYXRpb25cIl1cbiAgICAgICAgICAgICAgICAgICAsW1wic2tpbGxcIiwgXCJFdmVyeSB0aW1lIEkgYWNxdWlyZSBhIG5ldyBza2lsbFwiXVxuICAgICAgICAgICAgICAgICAgICxbXCI+MXBtb1wiLCBcIk1vcmUgdGhhbiBvbmNlIGEgbW9udGhcIl1cbiAgICAgICAgICAgICAgICAgICAsW1wiPjNwbW9cIiwgXCJNb3JlIHRoYW4gb25jZSBldmVyeSAzIG1vbnRoc1wiXVxuICAgICAgICAgICAgICAgICAgICxbXCI+MXB5clwiLCBcIk1vcmUgdGhhbiBvbmNlIGEgeWVhclwiXVxuICAgICAgICAgICAgICAgICAgICxbXCI8MXB5clwiLCBcIkxlc3MgdGhhbiBvbmNlIGEgeWVhclwiXVxuICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICx0cnVlLHRydWUpXG4gICAgXSwgcGFnZXIuc2V0UGFnZS5iaW5kKHBhZ2VyKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9