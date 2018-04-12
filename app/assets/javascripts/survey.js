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
        label.appendChild(document.createTextNode(text));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyJdLCJuYW1lcyI6WyJFbCIsImlkIiwibm9kZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJQYWdlciIsImFyZ3VtZW50cyIsInBhZ2VzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInNjcm9sbGVyIiwicHJldiIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcmV2UGFnZSIsImJpbmQiLCJuZXh0IiwibmV4dFBhZ2UiLCJzdWJtaXQiLCJzZXRQYWdlIiwiaW5kZXgiLCJ1bmRlZmluZWQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJzdHlsZSIsImRpc3BsYXkiLCJpbm5lckhUTUwiLCJsZW5ndGgiLCJzY3JvbGxUb3AiLCJGb3JtIiwic3VibWl0SWQiLCJxdWVzdGlvbnMiLCJzdWJtaXRFbCIsInZhbGlkaXRpZXMiLCJtYXAiLCJxIiwic2hvd0FkdmljZSIsImFsbFZhbGlkIiwiZXZlcnkiLCJ4IiwiTWF0aCIsImZsb29yIiwiaW5kZXhPZiIsImNvbnNvbGUiLCJsb2ciLCJRdWVzdGlvbiIsInRleHQiLCJsYWJlbCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVRleHROb2RlIiwib3V0cHV0IiwibmFtZSIsImhpZGRlbiIsImFkdmljZUVsIiwiY2xhc3NOYW1lIiwidXNlcklucHV0cyIsImFuc3dlciIsInZhbHVlIiwiaXNWYWxpZCIsImFkdmljZSIsIkludGVnZXIiLCJtYXgiLCJtaW4iLCJpbnB1dCIsInR5cGUiLCJwbGFjZWhvbGRlciIsImlucHV0RWwiLCJwYXJzZUludCIsIndyaXRlQW5zd2VyIiwiaXNOYU4iLCJDaGVja2xpc3QiLCJpbnB1dHMiLCJyYWRpbyIsInVubW9kaWZpYWJsZSIsImMiLCJjcmVhdGVDaGVja2JveCIsImFkZEJ1dHRvbiIsIm5ld0N1c3RvbUlucHV0IiwiZWwiLCJpIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJjaGVja2VkIiwiY2hpbGQiLCJyZW1vdmVDaGlsZCIsImNoZWNrYm94IiwidGV4dE5vZGUiLCJjb250YWluZXIiLCJwYWRkaW5nTGVmdCIsImluc2VydEJlZm9yZSIsImZvY3VzIiwiY3VzdG9tSXRlbXMiLCJjdXN0b21WYWx1ZXMiLCJleHRyYWN0Q3VzdG9tVmFsdWUiLCJjaGVja2JveEl0ZW1zIiwiY2hlY2tib3hWYWx1ZXMiLCJleHRyYWN0Q2hlY2tib3hWYWx1ZSIsImZpbHRlciIsInYiLCJ2YWx1ZXMiLCJjb25jYXQiLCJqb2luIiwid2luZG93IiwicGFnZXIiLCJmb3JtIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ25FTUEsRSxHQUNGLFlBQWFDLEVBQWIsRUFBaUI7QUFBQTs7QUFDYixTQUFLQSxFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLQyxJQUFMLEdBQVlDLFNBQVNDLGNBQVQsQ0FBd0IsS0FBS0gsRUFBN0IsQ0FBWjtBQUNILEM7O0lBR0NJLEs7OztBQUNGLG1CQUFhSixFQUFiLEVBQWlCO0FBQUE7O0FBQUEsbUhBQ0pLLFNBREk7O0FBRWIsY0FBS0MsS0FBTCxHQUFhSixTQUFTSyxzQkFBVCxDQUFnQyxNQUFoQyxDQUFiOztB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Q0FGRCxDQUZkLENBWGdELEVBa0JoRCxJQUFJQSxTQUFKLENBQWMsa0NBQWQsRUFDYyw2RUFEZCxFQUVjLENBQUMsQ0FBQyxNQUFELEVBQVMsa0RBQVQsQ0FBRCxFQUNDLENBQUMsT0FBRCxFQUFVLE9BQVYsQ0FERCxFQUVDLENBQUMsVUFBRCxFQUFhLHFEQUFiLENBRkQsQ0FGZCxDQWxCZ0QsRUF5QmhELElBQU1WLE9BQU4sQ0FBYyxxQkFBZCxFQUNjLG1FQURkLENBekJnRCxFQTRCaEQsSUFBSVUsU0FBSixDQUFjLHVCQUFkLEVBQ2Msa0pBRGQsRUFFYyxDQUFDLENBQUMsS0FBRCxFQUFRLDJCQUFSLENBQUQsRUFDQyxDQUFDLE9BQUQsRUFBVSxrQ0FBVixDQURELEVBRUMsQ0FBQyxPQUFELEVBQVUsd0JBQVYsQ0FGRCxFQUdDLENBQUMsT0FBRCxFQUFVLCtCQUFWLENBSEQsRUFJQyxDQUFDLE9BQUQsRUFBVSx1QkFBVixDQUpELEVBS0MsQ0FBQyxPQUFELEVBQVUsdUJBQVYsQ0FMRCxDQUZkLEVBU2MsSUFUZCxFQVNtQixJQVRuQixDQTVCZ0QsQ0FBdkMsRUFzQ1BnQyxNQUFNckYsT0FBTixDQUFjSixJQUFkLENBQW1CeUYsS0FBbkIsQ0F0Q08sQ0FBZCxDIiwiZmlsZSI6InN1cnZleS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJjbGFzcyBFbCB7XG4gICAgY29uc3RydWN0b3IgKGlkKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5ub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZCk7XG4gICAgfVxufVxuXG5jbGFzcyBQYWdlciBleHRlbmRzIEVsIHtcbiAgICBjb25zdHJ1Y3RvciAoaWQpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5wYWdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwYWdlXCIpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zY3JvbGxlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VydmV5LXNjcm9sbGVyXCIpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wcmV2ID0gdGhpcy5ub2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwcmV2XCIpWzBdO1xuICAgICAgICB0aGlzLnByZXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucHJldlBhZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMubmV4dCA9IHRoaXMubm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibmV4dFwiKVswXTtcbiAgICAgICAgdGhpcy5uZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm5leHRQYWdlLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdXJ2ZXktc3VibWl0dGVyXCIpO1xuXG4gICAgICAgIHRoaXMuc2V0UGFnZSgwKTtcbiAgICB9XG5cbiAgICBzZXRQYWdlIChpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5pbmRleCA9PSBpbmRleCkgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5pbmRleCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZXNbdGhpcy5pbmRleF0uY2xhc3NMaXN0LnJlbW92ZShcInNob3dpbmdcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG5cbiAgICAgICAgdGhpcy5wYWdlc1t0aGlzLmluZGV4XS5jbGFzc0xpc3QuYWRkKFwic2hvd2luZ1wiKTtcblxuICAgICAgICB0aGlzLnByZXYuc3R5bGUuZGlzcGxheSA9IG51bGw7XG4gICAgICAgIHRoaXMubmV4dC5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdWJtaXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLnByZXYuaW5uZXJIVE1MID0gXCJQcmV2IFNlY3Rpb25cIjtcbiAgICAgICAgdGhpcy5uZXh0LmlubmVySFRNTCA9IFwiTmV4dCBTZWN0aW9uXCI7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByZXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgdGhpcy5uZXh0LmlubmVySFRNTCA9IFwiU3RhcnQgdGhlIFN1cnZleVwiO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaW5kZXggPT09IHRoaXMucGFnZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5uZXh0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIHRoaXMuc3VibWl0LnN0eWxlLmRpc3BsYXkgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBzY3JvbGwgdGhlIGZvcm0gYmFjayB0byB0aGUgdG9wXG4gICAgICAgIHRoaXMuc2Nyb2xsZXIuc2Nyb2xsVG9wID0gMDtcbiAgICB9XG5cbiAgICBuZXh0UGFnZSAoKSB7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLnBhZ2VzLmxlbmd0aCAtIDEpIHJldHVybjtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHRoaXMuaW5kZXggKyAxKTtcbiAgICB9XG4gICAgcHJldlBhZ2UgKCkge1xuICAgICAgICBpZiAodGhpcy5pbmRleCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5pbmRleCAtIDEpO1xuICAgIH1cbn1cblxuY2xhc3MgRm9ybSBleHRlbmRzIEVsIHtcbiAgICBjb25zdHJ1Y3RvciAoaWQsIHN1Ym1pdElkLCBxdWVzdGlvbnMsIHNldFBhZ2UpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcblxuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMucXVlc3Rpb25zID0gcXVlc3Rpb25zO1xuICAgICAgICB0aGlzLnNldFBhZ2UgPSBzZXRQYWdlO1xuXG4gICAgICAgIHZhciBzdWJtaXRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHN1Ym1pdElkKTtcbiAgICAgICAgc3VibWl0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc3VibWl0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHN1Ym1pdCAoKSB7XG4gICAgICAgIHZhciB2YWxpZGl0aWVzID0gdGhpcy5xdWVzdGlvbnMubWFwKHEgPT4gcS5zaG93QWR2aWNlKCkpO1xuICAgICAgICB2YXIgYWxsVmFsaWQgPSB2YWxpZGl0aWVzLmV2ZXJ5KHggPT4geCA9PSB0cnVlKTtcbiAgICAgICAgaWYgKCFhbGxWYWxpZCkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gTWF0aC5mbG9vcih2YWxpZGl0aWVzLmluZGV4T2YoZmFsc2UpIC8gMikgKyAxO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZXR0aW5nIHBhZ2UgdG8gaW5kZXhcIiwgaW5kZXgsIHZhbGlkaXRpZXMpO1xuICAgICAgICAgICAgdGhpcy5zZXRQYWdlKGluZGV4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWxsIGlzIHdlbGxcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5vZGUpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnN1Ym1pdCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBRdWVzdGlvbiBleHRlbmRzIEVsIHtcbiAgICBjb25zdHJ1Y3RvciAoaWQsIHRleHQpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5ub2RlLmNsYXNzTGlzdC5hZGQoXCJmb3JtLWdyb3VwXCIpO1xuICAgICAgICBcbiAgICAgICAgdmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICBsYWJlbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KSk7XG4gICAgICAgIHRoaXMubm9kZS5hcHBlbmRDaGlsZChsYWJlbCk7XG5cbiAgICAgICAgLy8gdGhpcy5vdXRwdXQgc3RvcmUgdGhlIGZpbmFsIG91dHB1dCBcbiAgICAgICAgdGhpcy5vdXRwdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIHRoaXMub3V0cHV0Lm5hbWUgPSBcInJlc3BvbnNlW1wiICsgaWQgKyBcIl1cIjtcbiAgICAgICAgdGhpcy5vdXRwdXQuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vdXRwdXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQodGhpcy5vdXRwdXQpO1xuXG4gICAgICAgIHRoaXMuYWR2aWNlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGlzLmFkdmljZUVsLmNsYXNzTmFtZSA9IFwiYWR2aWNlIGFsZXJ0LWRhbmdlciBwLTIgbWItMiByb3VuZGVkXCI7XG4gICAgICAgIHRoaXMubm9kZS5hcHBlbmRDaGlsZCh0aGlzLmFkdmljZUVsKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudXNlcklucHV0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMudXNlcklucHV0cy5jbGFzc05hbWUgPSBcImFuc3dlclwiO1xuICAgICAgICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQodGhpcy51c2VySW5wdXRzKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGFuc3dlciAoKSB7IFxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkOyBcbiAgICB9XG4gICAgZ2V0IGlzVmFsaWQgKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZ2V0IGFkdmljZSAoKSB7IHJldHVybiBcIlwiOyB9XG4gICAgd3JpdGVBbnN3ZXIgKCkge1xuICAgICAgICB2YXIgYW5zd2VyID0gdGhpcy5hbnN3ZXI7XG4gICAgICAgIHRoaXMub3V0cHV0LnZhbHVlID0gYW5zd2VyO1xuICAgICAgICByZXR1cm4gYW5zd2VyO1xuICAgIH1cblxuICAgIHNob3dBZHZpY2UgKCkge1xuICAgICAgICB2YXIgaXNWYWxpZCA9IHRoaXMuaXNWYWxpZDtcbiAgICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWR2aWNlRWwuY2xhc3NMaXN0LnJlbW92ZShcInNob3dpbmdcIik7XG4gICAgICAgICAgICB0aGlzLmFkdmljZUVsLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkdmljZUVsLmNsYXNzTGlzdC5hZGQoXCJzaG93aW5nXCIpO1xuICAgICAgICAgICAgdGhpcy5hZHZpY2VFbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLmFkdmljZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xuICAgIH1cbn1cblxuY2xhc3MgSW50ZWdlciBleHRlbmRzIFF1ZXN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvciAoaWQsIHRleHQsIG1heCwgbWluKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG5cbiAgICAgICAgdGhpcy5taW4gPSBtaW4gPyBtaW4gOiAxO1xuICAgICAgICB0aGlzLm1heCA9IG1heCA/IG1heCA6IDEwMDtcblxuICAgICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGlucHV0LmNsYXNzTmFtZSA9IFwiZm9ybS1jb250cm9sXCI7XG4gICAgICAgIGlucHV0LnR5cGUgPSBcIm51bWJlclwiO1xuICAgICAgICBpbnB1dC5tYXggPSB0aGlzLm1heDtcbiAgICAgICAgaW5wdXQubWluID0gdGhpcy5taW47XG4gICAgICAgIGlucHV0LnBsYWNlaG9sZGVyID0gXCJFbnRlciBhIG51bWJlciBmcm9tIFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICArIHRoaXMubWluIFxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiIHRvIFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICArIHRoaXMubWF4IFxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiLlwiO1xuICAgICAgICB0aGlzLmlucHV0RWwgPSBpbnB1dDtcblxuICAgICAgICB0aGlzLnVzZXJJbnB1dHMuYXBwZW5kQ2hpbGQodGhpcy5pbnB1dEVsKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGFuc3dlciAoKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLmlucHV0RWwudmFsdWUpO1xuICAgIH1cbiAgICBnZXQgaXNWYWxpZCAoKSB7XG4gICAgICAgIHZhciBhbnN3ZXIgPSB0aGlzLndyaXRlQW5zd2VyKCk7XG4gICAgICAgIGlmIChpc05hTihhbnN3ZXIpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBhbnN3ZXIgPD0gdGhpcy5tYXggJiYgYW5zd2VyID49IHRoaXMubWluO1xuICAgIH1cbiAgICBnZXQgYWR2aWNlICgpIHtcbiAgICAgICAgcmV0dXJuIFwiTWFrZSBzdXJlIHlvdSd2ZSBlbnRlcmVkIGEgbnVtYmVyIGJldHdlZW4gXCIgXG4gICAgICAgICAgICAgICArIHRoaXMubWluIFxuICAgICAgICAgICAgICAgKyBcIiBhbmQgXCIgXG4gICAgICAgICAgICAgICArIHRoaXMubWF4O1xuICAgIH1cbn1cblxuY2xhc3MgQ2hlY2tsaXN0IGV4dGVuZHMgUXVlc3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yIChpZCwgdGV4dCwgaW5wdXRzLCByYWRpbywgdW5tb2RpZmlhYmxlKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMudHlwZSA9IHJhZGlvID8gXCJyYWRpb1wiIDogXCJjaGVja2JveFwiO1xuXG4gICAgICAgIC8vIElmIHJhZGlvIG1vZGUgaXMgc2V0LCB1c2Ugc2FtZSBuYW1lIGZvciBhbGwgYm94ZXNcbiAgICAgICAgZm9yICh2YXIgaW5wdXQgb2YgaW5wdXRzKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IGlucHV0WzBdOyBcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gaW5wdXRbMV07XG4gICAgICAgICAgICB2YXIgYyA9IHRoaXMuY3JlYXRlQ2hlY2tib3gobmFtZSwgdGV4dCk7XG4gICAgICAgICAgICB0aGlzLnVzZXJJbnB1dHMuYXBwZW5kQ2hpbGQoYyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodW5tb2RpZmlhYmxlICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB2YXIgYWRkQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGFkZEJ1dHRvbi5pbm5lckhUTUwgPSBcIkRvbid0IHNlZSB5b3VyIG9wdGlvbj8gQ2xpY2sgdG8gYWRkIGFub3RoZXIuXCI7XG4gICAgICAgICAgICBhZGRCdXR0b24uY2xhc3NOYW1lID0gXCJidG4gYnRuLXRoZW1lZCBidG4tc20gbXQtMiB3LTEwMCBib3JkZXItMFwiO1xuICAgICAgICAgICAgYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm5ld0N1c3RvbUlucHV0LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5hZGRCdXR0b24gPSBhZGRCdXR0b247XG4gICAgICAgICAgICB0aGlzLnVzZXJJbnB1dHMuYXBwZW5kQ2hpbGQoYWRkQnV0dG9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4dHJhY3RDdXN0b21WYWx1ZSAoZWwpIHtcbiAgICAgICAgdmFyIGkgPSBlbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpWzBdO1xuICAgICAgICByZXR1cm4gaS52YWx1ZTtcbiAgICB9XG5cbiAgICBleHRyYWN0Q2hlY2tib3hWYWx1ZSAoZWwpIHtcbiAgICAgICAgdmFyIGkgPSBlbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpWzBdO1xuICAgICAgICBpZiAoaS5jaGVja2VkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSBcInJhZGlvXCIpIHJldHVybiBpLnZhbHVlO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gaS5pZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBhbnN3ZXIgKCkge1xuICAgICAgICB2YXIgY3VzdG9tSXRlbXMgPSB0aGlzLm5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNoZWNrbGlzdC1jdXN0b21cIik7XG4gICAgICAgIGN1c3RvbUl0ZW1zID0gWy4uLmN1c3RvbUl0ZW1zXTtcbiAgICAgICAgdmFyIGN1c3RvbVZhbHVlcyA9IGN1c3RvbUl0ZW1zLm1hcCh0aGlzLmV4dHJhY3RDdXN0b21WYWx1ZSwgdGhpcyk7XG5cbiAgICAgICAgdmFyIGNoZWNrYm94SXRlbXMgPSB0aGlzLm5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNoZWNrbGlzdC1pdGVtXCIpO1xuICAgICAgICBjaGVja2JveEl0ZW1zID0gWy4uLmNoZWNrYm94SXRlbXNdO1xuICAgICAgICB2YXIgY2hlY2tib3hWYWx1ZXMgPSBjaGVja2JveEl0ZW1zLm1hcCh0aGlzLmV4dHJhY3RDaGVja2JveFZhbHVlLCB0aGlzKTtcbiAgICAgICAgY2hlY2tib3hWYWx1ZXMgPSBjaGVja2JveFZhbHVlcy5maWx0ZXIodiA9PiB2ICE9IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgdmFyIHZhbHVlcyA9IGN1c3RvbVZhbHVlcy5jb25jYXQoY2hlY2tib3hWYWx1ZXMpO1xuICAgICAgICByZXR1cm4gdmFsdWVzLmpvaW4oXCJcXG5cIik7XG4gICAgfVxuXG4gICAgZ2V0IGFkdmljZSAoKSB7XG4gICAgICAgIHJldHVybiBcIk1ha2Ugc3VyZSB0byBjaGVjayBhdCBsZWFzdCBvbmUgYm94LCBvciBhZGQgYXQgbGVhc3Qgb25lIGN1c3RvbSB2YWx1ZVwiO1xuICAgIH1cbiAgICBnZXQgaXNWYWxpZCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndyaXRlQW5zd2VyKCkgIT09IFwiXCI7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ2hpbGQgKGNoaWxkKSB7XG4gICAgICAgIHRoaXMudXNlcklucHV0cy5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgfVxuICAgIGNyZWF0ZUNoZWNrYm94IChuYW1lLCB0ZXh0LCBjaGVja2JveCwgdGV4dE5vZGUpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcImNoZWNrbGlzdC1pdGVtIGZvcm0tY2hlY2sgYnRuIGJ0bi1saWdodFwiO1xuXG4gICAgICAgIGlmICh0ZXh0Tm9kZSA9PSB1bmRlZmluZWQgJiYgY2hlY2tib3ggPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09IFwicmFkaW9cIikge1xuICAgICAgICAgICAgICAgIGNoZWNrYm94LmlkID0gdGhpcy5pZDtcbiAgICAgICAgICAgICAgICBjaGVja2JveC52YWx1ZSA9IG5hbWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNoZWNrYm94LmlkID0gbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoZWNrYm94LnR5cGUgPSB0aGlzLnR5cGU7XG4gICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSAhY2hlY2tib3guY2hlY2tlZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiIFwiICsgdGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuICAgIG5ld0N1c3RvbUlucHV0ICgpIHtcbiAgICAgICAgdmFyIHJlbW92ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHJlbW92ZS5jbGFzc05hbWUgPSBcInJlbW92ZSBidG4gYnRuLW91dGxpbmUtZGFuZ2VyXCI7XG4gICAgICAgIHJlbW92ZS5pbm5lckhUTUwgPSBcIiZ0aW1lcztcIjtcbiAgICAgICAgcmVtb3ZlLnN0eWxlLnBhZGRpbmdMZWZ0ID0gXCIxcHhcIjtcblxuICAgICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGlucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgICAgICAgaW5wdXQuY2xhc3NOYW1lID0gXCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtXCI7XG4gICAgICAgIGlucHV0LnBsYWNlaG9sZGVyID0gXCJFbnRlciBuZXcgb3B0aW9uIGhlcmUuLi5cIjtcblxuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jcmVhdGVDaGVja2JveChcIlwiLCBcIlwiLCByZW1vdmUsIGlucHV0KTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjaGVja2xpc3QtY3VzdG9tXCIsIFwiZC1mbGV4XCIsIFwiYWxpZ24taXRlbXMtY2VudGVyXCIpO1xuICAgICAgICByZW1vdmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucmVtb3ZlQ2hpbGQuYmluZCh0aGlzLCBjb250YWluZXIpKTtcblxuICAgICAgICB0aGlzLnVzZXJJbnB1dHMuaW5zZXJ0QmVmb3JlKGNvbnRhaW5lciwgdGhpcy5hZGRCdXR0b24pO1xuXG4gICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgfVxufVxuXG53aW5kb3cucGFnZXIgPSBuZXcgUGFnZXIoXCJzdXJ2ZXktYm9keVwiKTtcblxud2luZG93LmZvcm0gPSBuZXcgRm9ybShcInN1cnZleVwiLCBcInN1cnZleS1zdWJtaXR0ZXJcIiwgW1xuICAgICBuZXcgICBJbnRlZ2VyKFwiY291bnRfc2ltdWx0YW5lb3VzX2FwcGxpY2F0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAsXCJXaGVuIHNlYXJjaGluZyBmb3IgYSBqb2IsIHJvdWdobHkgaG93IG1hbnkgc2VwYXJhdGUgam9iIGFwcGxpY2F0aW9ucyBkbyB5b3UgdGVuZCB0byBtYW5hZ2UgYXQgYW55IG9uZSB0aW1lP1wiXG4gICAgICAgICAgICAgICAgICApXG4gICAgLG5ldyBDaGVja2xpc3QoXCJob3dfdHJhY2tpbmdcIlxuICAgICAgICAgICAgICAgICAgLFwiSG93IGRvIHlvdSBub3JtYWxseSBrZWVwIHRyYWNrIG9mIHlvdXIgYXBwbGljYXRpb25zIGFuZCB0aGVpciBkb2N1bWVudHMgYXMgeW91IGFwcGx5IHRvIHRoZW0/XCJcbiAgICAgICAgICAgICAgICAgICxbW1wiZG9jc1wiLCBcIldvcmQgRG9jdW1lbnRzIC8gVHlwZWQgVXAgRmlsZXMgKC5kb2MsIC50eHQsIC5ldGMpXCJdXG4gICAgICAgICAgICAgICAgICAgLFtcInNwcmVhZFwiLCBcIlNwcmVhZHNoZWV0cyAoRXhjZWwsIEdudW1lcmljLCBldGMuKVwiXVxuICAgICAgICAgICAgICAgICAgICxbXCJwYXBlclwiLCBcIlBlbiBhbmQgUGFwZXIgKE5vdGVib29rLCBQb3N0LUl0cywgZXRjLilcIl1cbiAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApXG4gICAgLG5ldyBDaGVja2xpc3QoXCJ3aGF0X2V4dHJhX2RvY3VtZW50c1wiXG4gICAgICAgICAgICAgICAgICAsXCJXaGF0IGRvY3VtZW50cyBoYXZlIGJlZW4gcmVxdWVzdGVkIGZyb20geW91IGluIHBhc3QgYXBwbGljYXRpb25zLCBhc2lkZSBmcm9tIENWcz9cIlxuICAgICAgICAgICAgICAgICAgLFtbXCJjb3ZlclwiLCBcIkNvdmVyIExldHRlclwiXVxuICAgICAgICAgICAgICAgICAgICxbXCJyZWZlcmVuY2VcIiwgXCJMZXR0ZXIgb2YgUmVmZXJlbmNlIC8gUmVjb21tZW5kYXRpb25cIl1cbiAgICAgICAgICAgICAgICAgICAsW1wicGhpbG9zb3BoeVwiLCBcIldvcmsgUGhpbG9zb3BoeVwiXVxuICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAsbmV3IENoZWNrbGlzdChcIndoYXRfZG9jdW1lbnRfY3JlYXRpb25fc29mdHdhcmVzXCJcbiAgICAgICAgICAgICAgICAgICxcIldoYXQgcHJvZ3JhbXMgb3Igc29mdHdhcmVzIGRvIHlvdSB1c2UgdG8gY3JlYXRlIGRvY3VtZW50cyBmb3IgYXBwbGljYXRpb25zP1wiXG4gICAgICAgICAgICAgICAgICAsW1tcIndvcmRcIiwgXCJXb3JkIC8gR29vZ2xlIERvY3MgLyBPdGhlciBPZmZpY2UgU3VpdGUgU29mdHdhcmVcIl1cbiAgICAgICAgICAgICAgICAgICAsW1wibGF0ZXhcIiwgXCJMYVRlWFwiXVxuICAgICAgICAgICAgICAgICAgICxbXCJpbmRlc2lnblwiLCBcIkluRGVzaWduIC8gR0lNUCAvIE90aGVyIERlc2lnbiBhbmQgQXJ0d29yayBTb2Z0d2FyZVwiXVxuICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAsbmV3ICAgSW50ZWdlcihcImNvdW50X2RpZmZlcmVudF9jdnNcIlxuICAgICAgICAgICAgICAgICAgLFwiSG93IG1hbnkgZGlmZmVyZW50IENWcyBkbyB5b3UgZ2VuZXJhbGx5IG1haW50YWluIGF0IGEgZ2l2ZW4gdGltZT9cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICxuZXcgQ2hlY2tsaXN0KFwid2hhdF91cGRhdGVfZnJlcXVlbmN5XCJcbiAgICAgICAgICAgICAgICAgICxcIkhvdyBvZnRlbiBkbyB5b3UgdXBkYXRlIG9yIGNoYW5nZSB5b3VyIENWJ3MgY29udGVudHMgb3IgbGF5b3V0Pzxici8+PHNtYWxsIGNsYXNzPSd0ZXh0LW11dGVkIHRleHQtbm9ybWFsJz4oUGljayB0aGUgZmlyc3QgdGhhdCBhcHBsaWVzLik8L3NtYWxsPlwiXG4gICAgICAgICAgICAgICAgICAsW1tcImpvYlwiLCBcIkZvciBldmVyeSBqb2IgYXBwbGljYXRpb25cIl1cbiAgICAgICAgICAgICAgICAgICAsW1wic2tpbGxcIiwgXCJFdmVyeSB0aW1lIEkgYWNxdWlyZSBhIG5ldyBza2lsbFwiXVxuICAgICAgICAgICAgICAgICAgICxbXCI+MXBtb1wiLCBcIk1vcmUgdGhhbiBvbmNlIGEgbW9udGhcIl1cbiAgICAgICAgICAgICAgICAgICAsW1wiPjNwbW9cIiwgXCJNb3JlIHRoYW4gb25jZSBldmVyeSAzIG1vbnRoc1wiXVxuICAgICAgICAgICAgICAgICAgICxbXCI+MXB5clwiLCBcIk1vcmUgdGhhbiBvbmNlIGEgeWVhclwiXVxuICAgICAgICAgICAgICAgICAgICxbXCI8MXB5clwiLCBcIkxlc3MgdGhhbiBvbmNlIGEgeWVhclwiXVxuICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICx0cnVlLHRydWUpXG4gICAgXSwgcGFnZXIuc2V0UGFnZS5iaW5kKHBhZ2VyKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9