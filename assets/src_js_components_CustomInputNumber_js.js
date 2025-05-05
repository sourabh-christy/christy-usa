"use strict";
(self["webpackChunkchristy"] = self["webpackChunkchristy"] || []).push([["src_js_components_CustomInputNumber_js"],{

/***/ "./src/js/components/CustomInputNumber.js":
/*!************************************************!*\
  !*** ./src/js/components/CustomInputNumber.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomInputNumber: () => (/* binding */ CustomInputNumber)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var CustomInputNumber = /*#__PURE__*/function (_HTMLElement) {
  _inherits(CustomInputNumber, _HTMLElement);
  var _super = _createSuper(CustomInputNumber);
  function CustomInputNumber() {
    _classCallCheck(this, CustomInputNumber);
    return _super.apply(this, arguments);
  }
  _createClass(CustomInputNumber, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this$input, _this$input2, _this$input3, _this$incrementButton, _this$decrementButton, _this$input4;
      this.input = this.querySelector('input');
      this.incrementButton = this.querySelector('[data-increment]');
      this.decrementButton = this.querySelector('[data-decrement]');
      this.min = parseInt((_this$input = this.input) === null || _this$input === void 0 ? void 0 : _this$input.getAttribute('min')) || 0;
      this.max = parseInt((_this$input2 = this.input) === null || _this$input2 === void 0 ? void 0 : _this$input2.getAttribute('max')) || Infinity;
      this.step = parseInt((_this$input3 = this.input) === null || _this$input3 === void 0 ? void 0 : _this$input3.getAttribute('step')) || 1;
      (_this$incrementButton = this.incrementButton) === null || _this$incrementButton === void 0 ? void 0 : _this$incrementButton.addEventListener('click', this.increment.bind(this));
      (_this$decrementButton = this.decrementButton) === null || _this$decrementButton === void 0 ? void 0 : _this$decrementButton.addEventListener('click', this.decrement.bind(this));
      (_this$input4 = this.input) === null || _this$input4 === void 0 ? void 0 : _this$input4.addEventListener('input', this.validateInput.bind(this));
      this.updateDisabled();
    }
  }, {
    key: "increment",
    value: function increment() {
      this.input.value = Math.min(parseInt(this.input.value) + this.step, this.max);
      this.updateDisabled();
    }
  }, {
    key: "decrement",
    value: function decrement() {
      this.input.value = Math.max(parseInt(this.input.value) - this.step, this.min);
      this.updateDisabled();
    }
  }, {
    key: "validateInput",
    value: function validateInput() {
      this.input.value = Math.min(Math.max(parseInt(this.input.value), this.min), this.max);
      this.updateDisabled();
    }
  }, {
    key: "updateDisabled",
    value: function updateDisabled() {
      this.incrementButton.disabled = this.input.value >= this.max;
      this.decrementButton.disabled = this.input.value <= this.min;
    }
  }]);
  return CustomInputNumber;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('custom-input-number', CustomInputNumber);

/***/ })

}]);