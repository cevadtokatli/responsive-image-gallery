/*!
 *   Responsive Image Gallery
 *   version: 1.0.1
 *    author: Cevad Tokatli <cevadtokatli@hotmail.com>
 *   website: http://cevadtokatli.com
 *    github: https://github.com/cevadtokatli/responsive-image-gallery
 *   license: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ResponsiveImageGallery = factory());
}(this, (function () { 'use strict';

    var defaultOptions = {
      active: '*',
      timing: 'ease',
      duration: 500,
      minWidth: 250,
      maxWidth: 500,
      height: 80,
      horizontalSpace: 10,
      verticalSpace: 10,
      overflow: false,
      grid: true
    };

    var classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    var createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    var Util;

    var Util$1 = Util = function () {
      var Util = function () {
        function Util() {
          classCallCheck(this, Util);
        }

        createClass(Util, null, [{
          key: 'getElement',

          // Returns the given element.
          // @params {HTMLElement|String} el
          // @returns {HTMLElement}
          value: function getElement(el) {
            if (typeof el === 'string') {
              return document.querySelector(el);
            }
            return el;
          }

          // Attaches the events to the element.
          // @params {HTMLElement} el
          // @params {String[]} events
          // @params {EventListener} callback

        }, {
          key: 'addMultiEventListener',
          value: function addMultiEventListener(el, events, callback) {
            var i, j, len, results;
            results = [];
            for (j = 0, len = events.length; j < len; j++) {
              i = events[j];
              results.push(el.addEventListener(i, callback, true));
            }
            return results;
          }

          // Removes the events from the element.
          // @params {HTMLElement} el
          // @params {String[]} events
          // @params {EventListener} callback

        }, {
          key: 'removeMultiEventListener',
          value: function removeMultiEventListener(el, events, callback) {
            var i, j, len, results;
            results = [];
            for (j = 0, len = events.length; j < len; j++) {
              i = events[j];
              results.push(el.removeEventListener(i, callback, true));
            }
            return results;
          }

          // Attaches the events to the element for once.
          // @params {HTMLElement} el
          // @params {String[]} events
          // @params {EventListener} callback

        }, {
          key: 'addMultiEventListenerOnce',
          value: function addMultiEventListenerOnce(el, events, callback) {
            var _this = this;

            var _cb;
            _cb = function cb(e) {
              _this.removeMultiEventListener(el, events, _cb);
              return callback(e);
            };
            return this.addMultiEventListener(el, events, _cb);
          }
        }]);
        return Util;
      }();

      Util.transitionEndEvents = ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd', 'otransitionend', 'MSTransitionEnd'];

      return Util;
    }.call(undefined);

    var ResponsiveImageGallery;

    var responsiveImageGallery = ResponsiveImageGallery = function () {
      // @params {Object} o
      function ResponsiveImageGallery() {
        var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions;
        classCallCheck(this, ResponsiveImageGallery);

        var activeEl, c, categories, i, j, len, len1, ref;
        this.extractAttributes(o);
        if (!(this.el = Util$1.getElement(o.el))) {
          throw new Error('Element could not be found');
        }
        this.el.style.position = 'relative';
        this.el.style.overflow = 'hidden';
        if (this.bar = Util$1.getElement(o.bar)) {
          if (activeEl = this.bar.querySelector('*[category=\'' + this.active + '\']')) {
            activeEl.classList.add('rig-active');
          }
          categories = this.bar.querySelectorAll('*[category]');
          this.setCategory = this.setCategory.bind(this);
          for (i = 0, len = categories.length; i < len; i++) {
            c = categories[i];
            c.addEventListener('click', this.setCategory, true);
          }
        }
        this.elements = [];
        ref = this.el.children;
        for (j = 0, len1 = ref.length; j < len1; j++) {
          c = ref[j];
          c.style.position = 'absolute';
          this.elements.push({
            el: c,
            category: c.getAttribute('category'),
            active: true
          });
        }
        this.resize = this.resize.bind(this);
        window.addEventListener('resize', this.resize, true);
        this.resize();
      }

      // Extracts attributes from default options.
      // @params {Object} o


      createClass(ResponsiveImageGallery, [{
        key: 'extractAttributes',
        value: function extractAttributes(o) {
          var key, results, value;
          for (key in defaultOptions) {
            value = defaultOptions[key];
            if (o[key] == null) {
              o[key] = value;
            }
          }
          results = [];
          for (key in o) {
            value = o[key];
            if (value != null) {
              results.push(this[key] = value);
            } else {
              results.push(void 0);
            }
          }
          return results;
        }

        // @params {Event} e

      }, {
        key: 'setCategory',
        value: function setCategory(e) {
          return this.set(e.target.getAttribute('category'));
        }

        // Returns the active category.
        // @returns {String}

      }, {
        key: 'get',
        value: function get$$1() {
          return this.active;
        }

        // Sets the new category and animates.
        // @params {String} active
        // @params {Boolean} animate

      }, {
        key: 'set',
        value: function set$$1(active) {
          var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

          var e;
          if (!this.processing && (!animate || active !== this.active)) {
            this.processing = true;
            this.active = active;
            if (this.bar) {
              if (e = this.bar.querySelector('.rig-active')) {
                e.classList.remove('rig-active');
              }
              if (e = this.bar.querySelector('*[category=\'' + this.active + '\']')) {
                e.classList.add('rig-active');
              }
            }
            return this.animate(animate);
          }
        }

        // @returns {String}

      }, {
        key: 'getTiming',
        value: function getTiming() {
          return this.timing;
        }

        // @params {String} timing

      }, {
        key: 'setTiming',
        value: function setTiming(timing) {
          this.timing = timing;
        }

        // @returns {Number}

      }, {
        key: 'getDuration',
        value: function getDuration() {
          return this.duration;
        }

        // @params {Number} duration

      }, {
        key: 'setDuration',
        value: function setDuration(duration) {
          this.duration = duration;
        }

        // Destroys the gallery.

      }, {
        key: 'destroy',
        value: function destroy() {
          var c, categories, i, len;
          window.removeEventListener('resize', this.resize, true);
          if (this.bar) {
            categories = this.bar.querySelectorAll('*[category]');
            for (i = 0, len = categories.length; i < len; i++) {
              c = categories[i];
              c.removeEventListener('click', this.setCategory, true);
            }
          }
          return this.el.innerHTML = '';
        }

        // Resizes elements.

      }, {
        key: 'resize',
        value: function resize() {
          var area, count, status, w;
          if (!this.processing) {
            this.processing = true;
            w = this.el.offsetWidth;
            count = Math.floor(w / this.minWidth) + 1;
            while (true) {
              count -= 1;
              area = this.minWidth * count + this.horizontalSpace * (count - 1);
              if (w >= area || count < 2) {
                break;
              }
            }
            if (count < 2) {
              count = 1;
              this.width = this.overflow ? this.minWidth : w;
            } else {
              this.width = (w - this.horizontalSpace * (count - 1)) / count;
            }
            if (this.width > this.maxWidth) {
              this.width = this.maxWidth;
            }
            status = count !== this.count && this.count != null;
            this.count = count;
            return this.animate(status);
          } else {
            if (this.processingTimeout) {
              clearTimeout(this.processingTimeout);
            }
            return this.processingTimeout = setTimeout(this.resize, 500);
          }
        }

        // Sets the width and position of gallery elements.
        // @params {Boolean} animation

      }, {
        key: 'animate',
        value: function animate() {
          var _this = this;

          var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

          var columnHeight, elHeight, g, h, height, i, j, len, nColumnHeight, oLeft, oTop, r, ref, ref1, row, rowHeight, style, t, transform, unactive;
          row = -1;
          rowHeight = [];
          columnHeight = 0;
          nColumnHeight = 0;
          if (this.height) {
            height = this.width * this.height / 100;
          }
          this.completed = 0;
          ref = this.elements;
          for (i = 0, len = ref.length; i < len; i++) {
            g = ref[i];
            if (g.category === this.active || this.active === '*') {
              if (!g.active) {
                unactive = true;
                g.active = true;
                g.el.setAttribute('style', (g.el.getAttribute('style') || '').replace(/height[^;]+;?/g, ''));
                g.el.style.visibility = 'visible';
              }
              g.el.style.width = this.width + 'px';
              if (height) {
                g.el.style.height = height + 'px';
              }
              oLeft = g.left;
              oTop = g.top;
              h = g.el.offsetHeight + this.verticalSpace;
              if (this.grid) {
                if (!((row += 1) < this.count)) {
                  row = 0;
                  columnHeight += nColumnHeight;
                  nColumnHeight = 0;
                }
                g.top = columnHeight;
                if (h > nColumnHeight) {
                  nColumnHeight = h;
                }
              } else {
                for (r = j = 0, ref1 = this.count - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; r = 0 <= ref1 ? ++j : --j) {
                  if (rowHeight[r] == null) {
                    rowHeight[r] = 0;
                  }
                  if (rowHeight[r] < rowHeight[row] || rowHeight[row] == null) {
                    row = r;
                  }
                }
                g.top = rowHeight[row];
                rowHeight[row] += h;
              }
              g.left = this.width * row + this.horizontalSpace * row;
              style = g.el.getAttribute('style').replace(/(-webkit-transition|-ms-transition|transition)[^;]+;?/g, '');
              if (animation) {
                t = this.duration + 'ms 0s ' + this.timing;
                style += '-webkit-transition: -webkit-transform ' + t + ';\n-ms-transition: -ms-transform ' + t + ';\ntransition: transform ' + t + ';';
              }
              g.el.setAttribute('style', style);
              g.el.style.opacity = 1;
              transform = 'translate(' + g.left + 'px, ' + g.top + 'px) scale(1)';
              g.el.style.webkitTransform = transform;
              g.el.style.msTransform = transform;
              g.el.style.transform = transform;
              if (animation && (oLeft !== g.left || oTop !== g.top || unactive != null)) {
                Util$1.addMultiEventListenerOnce(g.el, Util$1.transitionEndEvents, this.completeProcess.bind(this));
              } else {
                this.completed += 1;
              }
            } else {
              if (!g.active) {
                this.completed += 1;
              } else {
                if (!animation) {
                  this.completed += 1;
                  g.active = false;
                  g.el.setAttribute('style', 'position:absolute;visibility:hidden;width:0;height:0;-webkit-transform:scale(.75);-ms-transform:scale(.75);transform:scale(.75)');
                  g.left = 0;
                  g.top = 0;
                } else {
                  style = (g.el.getAttribute('style') || '').replace(/(-webkit-transition|-ms-transition|transition|-webkit-transform|-ms-transform|transform)[^;]+;?/g, '');
                  t = this.duration + 'ms 0s ' + this.timing + ', opacity ' + this.duration + 'ms 0s ' + this.timing + ', visibility 0s ' + (this.duration + 1) + 'ms ' + this.timing;
                  transform = 'translate(' + g.left + 'px, ' + g.top + 'px) scale(.75)';
                  style += '-webkit-transition: -webkit-transform ' + t + ';\n-ms-transition: -ms-transform ' + t + ';\ntransition: transform ' + t + ';\n-webkit-transform: ' + transform + ';\n-ms-transform: ' + transform + ';\ntransform: ' + transform + ';\nopacity: 0;\nvisibility: hidden;';
                  g.el.setAttribute('style', style);
                  (function (g) {
                    return Util$1.addMultiEventListenerOnce(g.el, Util$1.transitionEndEvents, function () {
                      g.active = false;
                      g.el.setAttribute('style', 'position:absolute;visibility:hidden;-webkit-transform:scale(.75);-ms-transform:scale(.75);transform:scale(.75);width:0;height:0;opacity:0;');
                      g.left = 0;
                      g.top = 0;
                      return _this.completeProcess();
                    });
                  })(g);
                }
              }
            }
          }
          elHeight = this.elHeight;
          if (this.grid) {
            this.elHeight = nColumnHeight + columnHeight - this.verticalSpace;
          } else {
            h = rowHeight.reduce(function (a, b) {
              if (a > b) {
                return a;
              } else {
                return b;
              }
            }, 0);
            this.elHeight = h - this.verticalSpace;
          }
          if (elHeight !== this.elHeight) {
            style = (this.el.getAttribute('style') || '').replace(/(-webkit-transition|-ms-transition|transition)[^;]+;?/g, '');
            if (animation) {
              t = 'height ' + this.duration + 'ms 0s ' + this.timing;
              style += '-webkit-transition: ' + t + ';\n-ms-transition: ' + t + ';\ntransition: ' + t + ';';
            }
            style += 'height:' + this.elHeight + 'px;';
            this.el.setAttribute('style', style);
            this.resize();
          }
          if (this.completed === this.elements.length) {
            return this.processing = false;
          }
        }
      }, {
        key: 'completeProcess',
        value: function completeProcess() {
          if ((this.completed += 1) === this.elements.length) {
            return this.processing = false;
          }
        }
      }]);
      return ResponsiveImageGallery;
    }();

    return responsiveImageGallery;

})));
