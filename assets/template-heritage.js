/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************************!*\
  !*** ./src/js/template-heritage.js ***!
  \*************************************/
function incNum(num) {
  var target = parseInt(num.dataset.number);
  var firstItem = num.querySelector(':scope > span:first-child');
  var notFirstItems = num.querySelectorAll(':scope > span:not(span:first-child)');
  var currentVal = parseInt(firstItem.textContent);
  if (currentVal == target) {
    if (num.previousElementSibling) {
      incNum(num.previousElementSibling);
    }
    return;
  }
  if (notFirstItems) {
    notFirstItems.forEach(function (item) {
      item.remove();
    });
  }
  var count = 1;
  firstItem.style.transition = 'transform 0.2s linear,opacity 0.2s linear';
  firstItem.style.transform = 'translateY(100%)';
  firstItem.style.position = 'absolute';
  firstItem.style.opacity = '0';
  if (currentVal <= target) {
    firstItem.style.transform = 'translateY(100%)';
  } else {
    firstItem.style.transform = 'translateY(-100%)';
  }
  setTimeout(function () {
    firstItem.remove();
  }, count * 200);
  if (currentVal <= target) {
    var current = currentVal + 1;
    var _loop = function _loop() {
      var el = document.createElement('span');
      el.classList.add('will-change-transform');
      el.style.display = 'block';
      el.style.top = '0px';
      el.style.position = 'absolute';
      el.style.transform = 'translateY(-100%)';
      el.style.opacity = '0';
      el.style.transition = 'transform 0.2s linear,opacity 0.2s linear';
      el.textContent = current;
      num.append(el);
      if (current == target) {
        el.style.position = 'relative';
        setTimeout(function () {
          el.style.transform = 'translateY(0%)';
          el.style.opacity = '1';
        }, count * 100);
      } else {
        setTimeout(function () {
          el.style.transform = 'translateY(100%)';
          el.style.opacity = '1';
          setTimeout(function () {
            el.style.opacity = '0';
          }, 100);
          setTimeout(function () {
            el.remove();
          }, 200);
          if (num.previousElementSibling) {
            incNum(num.previousElementSibling);
          }
        }, count * 100);
      }
      count++;
    };
    for (current; current <= target; current++) {
      _loop();
    }
  } else {
    var _current = currentVal - 1;
    var _loop2 = function _loop2() {
      var el = document.createElement('span');
      el.classList.add('will-change-transform');
      el.style.display = 'block';
      el.style.top = '0px';
      el.style.position = 'absolute';
      el.style.transform = 'translateY(100%)';
      el.style.opacity = '0';
      el.style.transition = 'transform 0.2s linear,opacity 0.2s linear';
      el.textContent = _current;
      num.append(el);
      if (_current == target) {
        el.style.position = 'relative';
        setTimeout(function () {
          el.style.transform = 'translateY(0%)';
          el.style.opacity = '1';
        }, count * 100);
      } else {
        setTimeout(function () {
          el.style.transform = 'translateY(-100%)';
          el.style.opacity = '1';
          setTimeout(function () {
            el.style.opacity = '0';
          }, 100);
          setTimeout(function () {
            el.remove();
          }, 200);
          if (num.previousElementSibling) {
            incNum(num.previousElementSibling);
          }
        }, count * 100);
      }
      count++;
    };
    for (_current; _current >= target; _current--) {
      _loop2();
    }
  }
}
function heritageInit() {
  var anNumTimer = '';
  var timelineNav = document.querySelectorAll('#timeline-nav a');
  var counters = document.querySelectorAll('#counter > span.num');
  var sections = document.querySelectorAll('#timeline [data-era]');
  var modalBtns = document.querySelectorAll('#timeline [data-modaltrigger]');
  var prevDate = sections[0].dataset.era;
  function anNumbers() {
    var currentSection = '';
    sections.forEach(function (el) {
      var sectionTop = el.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2;
      if (window.scrollY > sectionTop) {
        currentSection = el;
      }
    });
    modalBtns.forEach(function (el) {
      var sectionTop = el.getBoundingClientRect().top + window.scrollY - window.innerHeight / 4 * 3;
      if (window.scrollY > sectionTop) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
    if (currentSection) {
      var date = currentSection.dataset.era;
      //if (date != prevDate) {
      prevDate = date;
      var dateArr = date.split('');
      // loop date array, and update the span in counters array.  Update data-number attribute

      dateArr.forEach(function (item, index) {
        item = counters[index].dataset.number = item;
      });
      this.setTimeout(function () {
        incNum(counters[3]);
      }, 100);
      var id = currentSection.id;
      if (document.querySelector('#timeline-nav a[href="#' + id + '"]')) {
        timelineNav.forEach(function (el) {
          el.classList.remove('active');
        });
        document.querySelector('#timeline-nav a[href="#' + id + '"]').classList.add('active');
      }
      //}
    }
  }

  anNumbers();
  window.addEventListener('scroll', function () {
    clearTimeout(anNumTimer);
    anNumTimer = setTimeout(function () {
      anNumbers();
    }, 10);
  });
  window.addEventListener('resize', function () {
    clearTimeout(anNumTimer);
    anNumTimer = setTimeout(function () {
      anNumbers();
    }, 10);
  });
  if (timelineNav.length) {
    timelineNav.forEach(function (anchor) {
      var href = anchor.getAttribute('href');
      if (document.querySelector(href)) {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          var elTop = document.querySelector(href).getBoundingClientRect().top + window.scrollY - document.querySelector('#timeline-nav').offsetHeight * 2;
          window.scrollTo({
            top: elTop,
            behavior: 'smooth'
          });
        });
      }
    });
  }
}
heritageInit();
/******/ })()
;