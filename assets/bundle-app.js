/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/js/bundle-app.js ***!
  \******************************/
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var bundleApp = {
  handlers: function handlers() {},
  init: function init() {
    this.handlers();
    var currentStep = 0;
    var sectionId = document.querySelector('#product-bundle').closest('[data-section]').dataset.section;
    var productBundle = document.querySelector('#product-bundle');
    var productBundleBlocker = productBundle.querySelector('#product-bundle-blocker');
    var btnPrev = document.querySelectorAll('.js-bundle-prev');
    var btnNext = document.querySelectorAll('.js-bundle-next');
    var currentStepNumber = document.querySelector('[data-currentstep]');
    var addCart = document.querySelector('#product-bundle [data-addcart]');

    // bundle json
    var bundleData = JSON.parse(document.querySelector('#bundleJson').innerHTML);
    console.log(bundleData);
    if (bundleData.steps.length > 0) {
      document.querySelector('[data-totalstep]').innerHTML = bundleData.steps.length;
    }
    function fadeBlockerIn() {
      productBundleBlocker.classList.add('!opacity-100', '!visible');
    }
    function fadeBlockerOut() {
      productBundleBlocker.classList.remove('!opacity-100', '!visible');
    }
    function formatMoney(cents, format) {
      var money_format = "${{amount}}";
      // ---------------------------------------------------------------------------
      // Money format handler
      // ---------------------------------------------------------------------------
      if (typeof cents == 'string') {
        cents = cents.replace('.', '');
      }
      var value = '';
      var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
      var formatString = money_format;
      function defaultOption(opt, def) {
        return typeof opt == 'undefined' ? def : opt;
      }
      function formatWithDelimiters(number, precision, thousands, decimal) {
        precision = defaultOption(precision, 2);
        thousands = defaultOption(thousands, ',');
        decimal = defaultOption(decimal, '.');
        if (isNaN(number) || number == null) {
          return 0;
        }
        number = (number / 100.0).toFixed(precision);
        var parts = number.split('.'),
          dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
          cents = parts[1] ? decimal + parts[1] : '';
        return dollars + cents;
      }
      switch (formatString.match(placeholderRegex)[1]) {
        case 'amount':
          value = formatWithDelimiters(cents, 2);
          break;
        case 'amount_no_decimals':
          value = formatWithDelimiters(cents, 0);
          break;
        case 'amount_with_comma_separator':
          value = formatWithDelimiters(cents, 2, '.', ',');
          break;
        case 'amount_no_decimals_with_comma_separator':
          value = formatWithDelimiters(cents, 0, '.', ',');
          break;
      }
      return formatString.replace(placeholderRegex, value);
    }
    function fetchStep(_x) {
      return _fetchStep.apply(this, arguments);
    }
    function _fetchStep() {
      _fetchStep = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(url) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return fetch("".concat(url)).then(function (response) {
                return response.text();
              }).then(function (responseText) {
                var html = new DOMParser().parseFromString(responseText, 'text/html');
                document.querySelector('[data-moboptions]').innerHTML = '';
                if (html.querySelector('[data-moboptions]')) {
                  var mobOptions = html.querySelector('[data-moboptions]').innerHTML;
                  document.querySelector('[data-moboptions]').innerHTML = mobOptions;
                }
                document.querySelector('#media-gallery').innerHTML = '';
                if (html.querySelector('#media-gallery')) {
                  var productGallery = html.querySelector('#media-gallery').innerHTML;
                  document.querySelector('#media-gallery').innerHTML = productGallery;
                }
                if (document.querySelector('product-info[data-variantid]') && html.querySelector('product-info[data-variantid]')) {
                  document.querySelector('product-info[data-variantid]').dataset.variantid = html.querySelector('product-info[data-variantid]').dataset.variantid;
                }

                // check if in stock
                var addButtonUpdated = html.getElementById("ProductSubmitButton-".concat(sectionId));
                if (addButtonUpdated) {
                  if (addButtonUpdated.hasAttribute('disabled')) {
                    document.querySelector('#product-bundle [data-bundlebtn="next"]').disabled = true;
                    document.querySelector('#product-bundle [data-bundlebtn="next"]').textContent = window.variantStrings.soldOut;
                  } else {
                    document.querySelector('#product-bundle [data-bundlebtn="next"]').disabled = false;
                    document.querySelector('#product-bundle [data-bundlebtn="next"]').textContent = 'Next';
                  }
                }
                updateGaleries();
              });
            case 2:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return _fetchStep.apply(this, arguments);
    }
    function updateGaleries() {
      // update galleries
      var activeMedia = document.querySelectorAll('#media-gallery > div:not(.hidden)');
      var galleryMob = document.querySelector('#media-gallery-mob');
      var galleryThumbs = document.querySelector('#media-gallery-thumbs');
      if (activeMedia && galleryMob) {
        galleryMob.querySelector('.splide__list').innerHTML = '';
        galleryThumbs.querySelector('.splide__list').innerHTML = '';
        activeMedia.forEach(function (el) {
          var li = document.createElement('li');
          li.classList.add('splide__slide', '!translate-x-0');
          li.appendChild(el.cloneNode(true));
          li.querySelector('img').classList.remove('loaded');
          galleryMob.querySelector('.splide__list').appendChild(li.cloneNode(true));
          li.querySelector('img').classList.remove('image-magnify-hover', 'cursor-zoom-in');
          galleryThumbs.querySelector('.splide__list').appendChild(li.cloneNode(true));
        });

        // refresh slider
        var splidegalrefresh = new Event('splidegalrefresh');
        window.dispatchEvent(splidegalrefresh);

        // refresh zooms
        var initzoomer = new Event('initzoomer');
        window.dispatchEvent(initzoomer);
      }
    }
    function makeVisible() {
      var prodWrapTop = document.querySelector('.product__info-wrapper').getBoundingClientRect().top + window.scrollY;
      var headerHeight = document.querySelector('.header-bar').offsetHeight;
      var headerBar = headerHeight + window.scrollY;
      if (headerBar > prodWrapTop) {
        window.scrollTo({
          top: prodWrapTop - headerHeight - 50,
          behavior: "smooth"
        });
      }
    }
    function prevStep() {
      currentStep--;
    }
    function nextStep() {
      currentStep++;
    }
    function setStep() {
      if (currentStepNumber) {
        currentStepNumber.innerHTML = currentStep;
      }
      if (currentStep == 0) {
        document.querySelector('#product-title').innerHTML = bundleData.bundleData.bundleTitle;
      } else if (currentStep > 0) {
        document.querySelector('#product-title').innerHTML = bundleData.steps[currentStep - 1].stepTitle;
      }
      document.querySelector('#product-bundle').dataset.step = currentStep;
      makeVisible();
      updateStepsValues();
      buildBunleReview();
    }
    function showReview() {
      setTimeout(function () {
        if (currentStepNumber) {
          currentStepNumber.innerHTML = currentStep;
        }
        document.querySelector('#product-title').innerHTML = bundleData.bundleData.bundleTitle;
        document.querySelector('#product-bundle').dataset.step = currentStep;
        document.querySelector('#product-bundle').classList.add('last-step');
        var images = [];
        if (bundleData.steps.length > 0) {
          bundleData.steps.forEach(function (step, i) {
            var varId = step.variantId;
            var variantData = bundleData.variants.find(function (variant) {
              return variant.id === varId;
            });
            if (variantData.featured_image) {
              images.push(variantData.featured_image);
            }
          });
        }
        var mediaGal = document.querySelector('#media-gallery');
        if (mediaGal && images.length) {
          mediaGal.innerHTML = '';
          var mediaGalHtml = '';
          images.forEach(function (img) {
            var div = document.createElement('div');
            mediaGalHtml += "<div class=\"flex\"><figure class=\"w-full relative z-0\"><img class=\"min-h-full object-cover\" loading=\"lazy\" src=\"".concat(img, "&width=672\" alt=\"").concat(bundleData.bundleData.bundleTitle, "\" /></figure></div>");
          });
          mediaGal.innerHTML = mediaGalHtml;
          updateGaleries();
        }
        makeVisible();
        fadeBlockerOut();
      }, 500);
    }
    function getProductUrl() {
      console.log("currentStep------",currentStep)
      if (currentStep == 0) {
        return "/products/".concat(bundleData.bundleData.mainHandle, "?isAjax=true&section_id=").concat(sectionId);
      }
      var _bundleData$steps = bundleData.steps[currentStep - 1],
        handle = _bundleData$steps.handle,
        variantId = _bundleData$steps.variantId,
        variants = _bundleData$steps.variants;
      if (variants && variants.length > 0) {
        var varIds = variants.map(function (variant) {
          return variant.id.replace('gid://shopify/ProductVariant/', '');
        });
        var varIdsString = varIds.join(':');
        return "/products/".concat(handle, "/v:").concat(varIdsString, ",sv:").concat(variantId, "?isAjax=true&section_id=").concat(sectionId);
      } else {
        return "/products/".concat(handle, "?isAjax=true&variant=").concat(variantId, "&section_id=").concat(sectionId);
      }
    }
    if (btnPrev.length) {
      btnPrev.forEach(function (el) {
        el.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                fadeBlockerIn();
                prevStep();
                _context.next = 4;
                return fetchStep(getProductUrl());
              case 4:
                setStep();
                fadeBlockerOut();
              case 6:
              case "end":
                return _context.stop();
            }
          }, _callee);
        })));
      });
    }
    if (btnNext.length) {
      btnNext.forEach(function (el) {
        el.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                fadeBlockerIn();
                nextStep();
                if (!(currentStep > bundleData.steps.length)) {
                  _context2.next = 5;
                  break;
                }
                showReview();
                return _context2.abrupt("return");
              case 5:
                _context2.next = 7;
                return fetchStep(getProductUrl());
              case 7:
                setStep();
                fadeBlockerOut();
              case 9:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        })));
      });
    }
    function goToStep(_x2) {
      return _goToStep.apply(this, arguments);
    }
    function _goToStep() {
      _goToStep = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(step) {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              fadeBlockerIn();
              currentStep = step;
              _context4.next = 4;
              return fetchStep(getProductUrl());
            case 4:
              // remove last-step class
              document.querySelector('#product-bundle').classList.remove('last-step');
              setStep();
              fadeBlockerOut();
            case 7:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      return _goToStep.apply(this, arguments);
    }
    function updateStepsValues() {
      if (currentStep > 0) {
        if (document.querySelector('[data-variantid]')) {
          bundleData.steps[currentStep - 1].variantId = parseInt(document.querySelector('[data-variantid]').dataset.variantid);
        }

        // find variant by ID from bundleData.variants and return object
        var variantData = bundleData.variants.find(function (variant) {
          return variant.id === bundleData.steps[currentStep - 1].variantId;
        });
      }
    }
    function buildBunleReview() {
      var bundleReview = document.querySelector('#bundle-review');
      var bundleReviewList = document.querySelector('#bundle-review > ul');
      var totalPrice = 0;
      var totalCompare = 0;
      var bundleHtml = '';
      if (bundleData.steps.length > 0) {
        bundleData.steps.forEach(function (step, i) {
          var varId = step.variantId;
          var variantData = bundleData.variants.find(function (variant) {
            return variant.id === varId;
          });
          console.log("step",step);
          console.log("variantData",variantData);
          var quantity = 1;
          if (step.quantity) {
            quantity = step.quantity;
          }

          // update price and compare price
          if (variantData.price) {
            totalPrice += variantData.price * quantity;
          }
          if (variantData.compare_at_price) {
            totalCompare += variantData.compare_at_price * quantity;
          }
          var optionsHtml = '';
          if (variantData.options && variantData.options.length) {
            variantData.options.forEach(function (option) {
              optionsHtml += "<p>".concat(option, "</p>");
            });
          }
          var imgHtml = '';
          if (variantData.featured_image) {
            imgHtml = "<div loading=\"lazy\" class=\"w-[100px] h-[100px]\"><img class=\"w-full h-full bg-cover\" src=\"".concat(variantData.featured_image, "&width=200&height=200&crop=center\" alt=\"").concat(variantData.product_title, "\" /></div>");
          }
          var variantTitle = variantData.product_title;
          if (step.handle == bundleData.bundleData.mainHandle && bundleData.bundleData.mainStepBaskTitle) {
            variantTitle = bundleData.bundleData.mainStepBaskTitle;
          }
          bundleHtml += "\n                    <li class=\"flex justify-between gap-5\">\n                    <div class=\"\">\n                        <h3 class=\"font-semibold lg:d-h5 mb-3\">".concat(quantity, " x ").concat(variantTitle, "</h3>\n                        <div>").concat(optionsHtml, "</div>\n                        <button class=\"underline mt-3\" data-changestep=\"").concat(i + 1, "\">Change</button>\n                    </div>\n                    ").concat(imgHtml, "\n                    </li>\n                    ");
        });
        updateBundlePrice(totalPrice, totalCompare);
        bundleReviewList.innerHTML = bundleHtml;
        if (bundleReviewList.querySelectorAll('[data-changestep]').length) {
          bundleReviewList.querySelectorAll('[data-changestep]').forEach(function (changestep) {
            changestep.addEventListener('click', function () {
              var step = changestep.dataset.changestep;
              goToStep(step);
            });
          });
        }
      }
    }
    function updateBundlePrice(totalPrice, totalCompare) {
      var bundlePrice = document.querySelectorAll('#product-bundle [data-bundlepricehtml]');
      var bundlePriceHtml = '';
      var bundleSavingsHtml = '';
      var totalPercentOff = 0;

      // get percent off from original price/compare price
      if (totalCompare > totalPrice) {
        totalPercentOff = totalPrice * 100 / totalCompare * 100 / 100;
        totalPercentOff = totalPercentOff.toFixed(2);
        totalPercentOff = 100 - totalPercentOff;
        totalPercentOff = Math.round(totalPercentOff * 100) / 100;
      }

      // apply bundle discount
      if (bundleData.bundleData.bundleDiscount > 0) {
        var diff = totalPrice * bundleData.bundleData.bundleDiscount / 100;
        totalPrice = totalPrice - diff;
        totalPrice = Math.round(totalPrice);
      }

      //let totalPriceFormatted = Shopify.formatMoney(totalPrice);
      //let totalCompareFormatted = Shopify.formatMoney(totalCompare);
      var totalPriceFormatted = formatMoney(totalPrice);
      var totalCompareFormatted = formatMoney(totalCompare);
      if (totalCompare > totalPrice) {
        bundlePriceHtml = "<span class=\"flex gap-x-2 font-semibold \">\n            <span class=\"line-through opacity-60\">\n              ".concat(totalCompareFormatted, "\n            </span>\n            <span>").concat(totalPriceFormatted, "</span>\n            </span>");
      } else {
        bundlePriceHtml = "<span class=\"font-semibold\">".concat(totalPriceFormatted, "</span>");
      }
      if (bundleData.bundleData.bundleDiscount > 0) {
        bundleSavingsHtml = "Bundle Savings ".concat(bundleData.bundleData.bundleDiscount, "% Off");
      } else {
        bundleSavingsHtml = "Bundle Savings";
      }
      if (bundlePrice.length) {
        bundlePrice.forEach(function (el) {
          el.querySelector('.bundleprice').innerHTML = bundlePriceHtml;
          el.querySelector('.bundlesavings').innerHTML = bundleSavingsHtml;
        });
      }
    }
    function addBundleCart() {
      return _addBundleCart.apply(this, arguments);
    }
    function _addBundleCart() {
      _addBundleCart = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var formData, bundleUID, add, cartDrawer, cartcontent;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              formData = {
                items: []
              };
              addCart.disabled = true;
              addCart.textContent = 'Adding...';
              if (!(bundleData.steps.length > 0)) {
                _context5.next = 13;
                break;
              }
              bundleUID = Date.now();
              bundleData.steps.forEach(function (step) {
                var item = {
                  id: step.variantId,
                  quantity: parseInt(step.quantity),
                  properties: {
                    'bundle': bundleUID
                  }
                };
                formData.items.push(item);
              });
              _context5.next = 8;
              return fetch(window.Shopify.routes.root + 'cart/add.js', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
              }).then(function (response) {
                return response.json();
              })["catch"](function (error) {});
            case 8:
              add = _context5.sent;
              // update cart-drawer. fetch, then parse html
              cartDrawer = document.querySelector('cart-drawer');
              _context5.next = 12;
              return fetch(window.location, {}).then(function (response) {
                return response.text();
              }).then(function (responseText) {
                var html = new DOMParser().parseFromString(responseText, 'text/html');
                cartDrawer.innerHTML = html.querySelector('cart-drawer').innerHTML;
                document.querySelector('cart-drawer').open();
                App.overflowFloatedStyle();
                if (document.querySelector('.cart__contents .splide:not(.splide-custom):not(.is-initialized)')) {
                  SplideConfig.initSplides('.cart__contents .splide:not(.splide-custom):not(.is-initialized)');
                }
                resetBundle();
              });
            case 12:
              cartcontent = _context5.sent;
            case 13:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      return _addBundleCart.apply(this, arguments);
    }
    addCart.addEventListener('click', function () {
      addBundleCart();
    });
    function resetBundle() {
      return _resetBundle.apply(this, arguments);
    }
    function _resetBundle() {
      _resetBundle = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              fadeBlockerIn();
              addCart.disabled = true;
              addCart.textContent = 'Added';
              currentStep = 0;
              _context6.next = 6;
              return fetchStep(getProductUrl());
            case 6:
              document.querySelector('#product-bundle').classList.remove('last-step');
              addCart.disabled = false;
              addCart.textContent = 'Add to Basket';
              setStep();
              fadeBlockerOut();
            case 11:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      return _resetBundle.apply(this, arguments);
    }
    window.addEventListener('variantchange', function () {
      updateStepsValues();
      buildBunleReview();
    });
    updateStepsValues();
    //buildBunleReview();
    fadeBlockerOut();
  }
};
document.addEventListener('DOMContentLoaded', function () {
  bundleApp.init();
});
/******/ })()
;