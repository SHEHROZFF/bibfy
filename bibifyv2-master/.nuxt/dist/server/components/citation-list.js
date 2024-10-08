exports.ids = [2];
exports.modules = Array(49).concat([
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _util_colorUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);



/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
  name: 'colorable',
  props: {
    color: String
  },
  methods: {
    setBackgroundColor(color, data = {}) {
      if (typeof data.style === 'string') {
        // istanbul ignore next
        Object(_util_console__WEBPACK_IMPORTED_MODULE_1__[/* consoleError */ "b"])('style must be an object', this); // istanbul ignore next

        return data;
      }
      if (typeof data.class === 'string') {
        // istanbul ignore next
        Object(_util_console__WEBPACK_IMPORTED_MODULE_1__[/* consoleError */ "b"])('class must be an object', this); // istanbul ignore next

        return data;
      }
      if (Object(_util_colorUtils__WEBPACK_IMPORTED_MODULE_2__[/* isCssColor */ "d"])(color)) {
        data.style = {
          ...data.style,
          'background-color': `${color}`,
          'border-color': `${color}`
        };
      } else if (color) {
        data.class = {
          ...data.class,
          [color]: true
        };
      }
      return data;
    },
    setTextColor(color, data = {}) {
      if (typeof data.style === 'string') {
        // istanbul ignore next
        Object(_util_console__WEBPACK_IMPORTED_MODULE_1__[/* consoleError */ "b"])('style must be an object', this); // istanbul ignore next

        return data;
      }
      if (typeof data.class === 'string') {
        // istanbul ignore next
        Object(_util_console__WEBPACK_IMPORTED_MODULE_1__[/* consoleError */ "b"])('class must be an object', this); // istanbul ignore next

        return data;
      }
      if (Object(_util_colorUtils__WEBPACK_IMPORTED_MODULE_2__[/* isCssColor */ "d"])(color)) {
        data.style = {
          ...data.style,
          color: `${color}`,
          'caret-color': `${color}`
        };
      } else if (color) {
        const [colorName, colorModifier] = color.toString().trim().split(' ', 2);
        data.class = {
          ...data.class,
          [colorName + '--text']: true
        };
        if (colorModifier) {
          data.class['text--' + colorModifier] = true;
        }
      }
      return data;
    }
  }
}));

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mergeData; });
/* unused harmony export mergeStyles */
/* unused harmony export mergeClasses */
/* unused harmony export mergeListeners */
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

const pattern = {
  styleList: /;(?![^(]*\))/g,
  styleProp: /:(.*)/
};
function parseStyle(style) {
  const styleMap = {};
  for (const s of style.split(pattern.styleList)) {
    let [key, val] = s.split(pattern.styleProp);
    key = key.trim();
    if (!key) {
      continue;
    } // May be undefined if the `key: value` pair is incomplete.

    if (typeof val === 'string') {
      val = val.trim();
    }
    styleMap[Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[/* camelize */ "c"])(key)] = val;
  }
  return styleMap;
}
function mergeData() {
  const mergeTarget = {};
  let i = arguments.length;
  let prop; // Allow for variadic argument length.

  while (i--) {
    // Iterate through the data properties and execute merge strategies
    // Object.keys eliminates need for hasOwnProperty call
    for (prop of Object.keys(arguments[i])) {
      switch (prop) {
        // Array merge strategy (array concatenation)
        case 'class':
        case 'directives':
          if (arguments[i][prop]) {
            mergeTarget[prop] = mergeClasses(mergeTarget[prop], arguments[i][prop]);
          }
          break;
        case 'style':
          if (arguments[i][prop]) {
            mergeTarget[prop] = mergeStyles(mergeTarget[prop], arguments[i][prop]);
          }
          break;
        // Space delimited string concatenation strategy

        case 'staticClass':
          if (!arguments[i][prop]) {
            break;
          }
          if (mergeTarget[prop] === undefined) {
            mergeTarget[prop] = '';
          }
          if (mergeTarget[prop]) {
            // Not an empty string, so concatenate
            mergeTarget[prop] += ' ';
          }
          mergeTarget[prop] += arguments[i][prop].trim();
          break;
        // Object, the properties of which to merge via array merge strategy (array concatenation).
        // Callback merge strategy merges callbacks to the beginning of the array,
        // so that the last defined callback will be invoked first.
        // This is done since to mimic how Object.assign merging
        // uses the last given value to assign.

        case 'on':
        case 'nativeOn':
          if (arguments[i][prop]) {
            mergeTarget[prop] = mergeListeners(mergeTarget[prop], arguments[i][prop]);
          }
          break;
        // Object merge strategy

        case 'attrs':
        case 'props':
        case 'domProps':
        case 'scopedSlots':
        case 'staticStyle':
        case 'hook':
        case 'transition':
          if (!arguments[i][prop]) {
            break;
          }
          if (!mergeTarget[prop]) {
            mergeTarget[prop] = {};
          }
          mergeTarget[prop] = {
            ...arguments[i][prop],
            ...mergeTarget[prop]
          };
          break;
        // Reassignment strategy (no merge)

        default:
          // slot, key, ref, tag, show, keepAlive
          if (!mergeTarget[prop]) {
            mergeTarget[prop] = arguments[i][prop];
          }
      }
    }
  }
  return mergeTarget;
}
function mergeStyles(target, source) {
  if (!target) return source;
  if (!source) return target;
  target = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[/* wrapInArray */ "x"])(typeof target === 'string' ? parseStyle(target) : target);
  return target.concat(typeof source === 'string' ? parseStyle(source) : source);
}
function mergeClasses(target, source) {
  if (!source) return target;
  if (!target) return source;
  return target ? Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[/* wrapInArray */ "x"])(target).concat(source) : source;
}
function mergeListeners(...args) {
  if (!args[0]) return args[1];
  if (!args[1]) return args[0];
  const dest = {};
  for (let i = 2; i--;) {
    const arg = args[i];
    for (const event in arg) {
      if (!arg[event]) continue;
      if (dest[event]) {
        // Merge current listeners before (because we are iterating backwards).
        // Note that neither "target" or "source" must be altered.
        dest[event] = [].concat(arg[event], dest[event]);
      } else {
        // Straight assign.
        dest[event] = arg[event];
      }
    }
  }
  return dest;
}

/***/ }),
/* 51 */,
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

/**
 * This mixin provides `attrs$` and `listeners$` to work around
 * vue bug https://github.com/vuejs/vue/issues/10115
 */

function makeWatcher(property) {
  return function (val, oldVal) {
    for (const attr in oldVal) {
      if (!Object.prototype.hasOwnProperty.call(val, attr)) {
        this.$delete(this.$data[property], attr);
      }
    }
    for (const attr in val) {
      this.$set(this.$data[property], attr, val[attr]);
    }
  };
}
/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
  data: () => ({
    attrs$: {},
    listeners$: {}
  }),
  created() {
    // Work around unwanted re-renders: https://github.com/vuejs/vue/issues/10115
    // Make sure to use `attrs$` instead of `$attrs` (confusing right?)
    this.$watch('$attrs', makeWatcher('attrs$'), {
      immediate: true
    });
    this.$watch('$listeners', makeWatcher('listeners$'), {
      immediate: true
    });
  }
}));

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return inject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return provide; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);


function generateWarning(child, parent) {
  return () => Object(_util_console__WEBPACK_IMPORTED_MODULE_1__[/* consoleWarn */ "c"])(`The ${child} component must be used inside a ${parent}`);
}
function inject(namespace, child, parent) {
  const defaultImpl = child && parent ? {
    register: generateWarning(child, parent),
    unregister: generateWarning(child, parent)
  } : null;
  return vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
    name: 'registrable-inject',
    inject: {
      [namespace]: {
        default: defaultImpl
      }
    }
  });
}
function provide(namespace, self = false) {
  return vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
    name: 'registrable-provide',
    provide() {
      return {
        [namespace]: self ? this : {
          register: this.register,
          unregister: this.unregister
        }
      };
    }
  });
}

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Intersect */
function inserted(el, binding, vnode) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
  const modifiers = binding.modifiers || {};
  const value = binding.value;
  const {
    handler,
    options
  } = typeof value === 'object' ? value : {
    handler: value,
    options: {}
  };
  const observer = new IntersectionObserver((entries = [], observer) => {
    var _a;
    const _observe = (_a = el._observe) === null || _a === void 0 ? void 0 : _a[vnode.context._uid];
    if (!_observe) return; // Just in case, should never fire

    const isIntersecting = entries.some(entry => entry.isIntersecting); // If is not quiet or has already been
    // initted, invoke the user callback

    if (handler && (!modifiers.quiet || _observe.init) && (!modifiers.once || isIntersecting || _observe.init)) {
      handler(entries, observer, isIntersecting);
    }
    if (isIntersecting && modifiers.once) unbind(el, binding, vnode);else _observe.init = true;
  }, options);
  el._observe = Object(el._observe);
  el._observe[vnode.context._uid] = {
    init: false,
    observer
  };
  observer.observe(el);
}
function unbind(el, binding, vnode) {
  var _a;
  const observe = (_a = el._observe) === null || _a === void 0 ? void 0 : _a[vnode.context._uid];
  if (!observe) return;
  observe.observer.unobserve(el);
  delete el._observe[vnode.context._uid];
}
const Intersect = {
  inserted,
  unbind
};
/* harmony default export */ __webpack_exports__["a"] = (Intersect);

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VCardActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return VCardSubtitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return VCardText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return VCardTitle; });
/* harmony import */ var _VCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);


const VCardActions = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* createSimpleFunctional */ "h"])('v-card__actions');
const VCardSubtitle = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* createSimpleFunctional */ "h"])('v-card__subtitle');
const VCardText = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* createSimpleFunctional */ "h"])('v-card__text');
const VCardTitle = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* createSimpleFunctional */ "h"])('v-card__title');

/* unused harmony default export */ var _unused_webpack_default_export = ({
  $_vuetify_subcomponents: {
    VCard: _VCard__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"],
    VCardActions,
    VCardSubtitle,
    VCardText,
    VCardTitle
  }
});

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return factory; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);


const availableProps = {
  absolute: Boolean,
  bottom: Boolean,
  fixed: Boolean,
  left: Boolean,
  right: Boolean,
  top: Boolean
};
function factory(selected = []) {
  return vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
    name: 'positionable',
    props: selected.length ? Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* filterObjectOnKeys */ "j"])(availableProps, selected) : availableProps
  });
}
/* harmony default export */ __webpack_exports__["a"] = (factory()); // Add a `*` before the second `/`

/* Tests /
let single = factory(['top']).extend({
  created () {
    this.top
    this.bottom
    this.absolute
  }
})

let some = factory(['top', 'bottom']).extend({
  created () {
    this.top
    this.bottom
    this.absolute
  }
})

let all = factory().extend({
  created () {
    this.top
    this.bottom
    this.absolute
    this.foobar
  }
})
/**/

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ VFadeTransition; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ VScrollXTransition; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* binding */ VScrollYReverseTransition; });
__webpack_require__.d(__webpack_exports__, "f", function() { return /* binding */ VSlideXTransition; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ VExpandTransition; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ VExpandXTransition; });

// UNUSED EXPORTS: VCarouselTransition, VCarouselReverseTransition, VTabTransition, VTabReverseTransition, VMenuTransition, VFabTransition, VDialogTransition, VDialogBottomTransition, VDialogTopTransition, VScaleTransition, VScrollXReverseTransition, VScrollYTransition, VSlideXReverseTransition, VSlideYTransition, VSlideYReverseTransition

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/mergeData.js
var mergeData = __webpack_require__(50);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/transitions/createTransition.js

function mergeTransitions(dest = [], ...transitions) {
  /* eslint-disable-next-line no-array-constructor */
  return Array().concat(dest, ...transitions);
}
function createSimpleTransition(name, origin = 'top center 0', mode) {
  return {
    name,
    functional: true,
    props: {
      group: {
        type: Boolean,
        default: false
      },
      hideOnLeave: {
        type: Boolean,
        default: false
      },
      leaveAbsolute: {
        type: Boolean,
        default: false
      },
      mode: {
        type: String,
        default: mode
      },
      origin: {
        type: String,
        default: origin
      }
    },
    render(h, context) {
      const tag = `transition${context.props.group ? '-group' : ''}`;
      const data = {
        props: {
          name,
          mode: context.props.mode
        },
        on: {
          beforeEnter(el) {
            el.style.transformOrigin = context.props.origin;
            el.style.webkitTransformOrigin = context.props.origin;
          }
        }
      };
      if (context.props.leaveAbsolute) {
        data.on.leave = mergeTransitions(data.on.leave, el => {
          const {
            offsetTop,
            offsetLeft,
            offsetWidth,
            offsetHeight
          } = el;
          el._transitionInitialStyles = {
            position: el.style.position,
            top: el.style.top,
            left: el.style.left,
            width: el.style.width,
            height: el.style.height
          };
          el.style.position = 'absolute';
          el.style.top = offsetTop + 'px';
          el.style.left = offsetLeft + 'px';
          el.style.width = offsetWidth + 'px';
          el.style.height = offsetHeight + 'px';
        });
        data.on.afterLeave = mergeTransitions(data.on.afterLeave, el => {
          if (el && el._transitionInitialStyles) {
            const {
              position,
              top,
              left,
              width,
              height
            } = el._transitionInitialStyles;
            delete el._transitionInitialStyles;
            el.style.position = position || '';
            el.style.top = top || '';
            el.style.left = left || '';
            el.style.width = width || '';
            el.style.height = height || '';
          }
        });
      }
      if (context.props.hideOnLeave) {
        data.on.leave = mergeTransitions(data.on.leave, el => {
          el.style.setProperty('display', 'none', 'important');
        });
      }
      return h(tag, Object(mergeData["a" /* default */])(context.data, data), context.children);
    }
  };
}
function createJavascriptTransition(name, functions, mode = 'in-out') {
  return {
    name,
    functional: true,
    props: {
      mode: {
        type: String,
        default: mode
      }
    },
    render(h, context) {
      return h('transition', Object(mergeData["a" /* default */])(context.data, {
        props: {
          name
        },
        on: functions
      }), context.children);
    }
  };
}
// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/helpers.js
var helpers = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/transitions/expand-transition.js

/* harmony default export */ var expand_transition = (function (expandedParentClass = '', x = false) {
  const sizeProperty = x ? 'width' : 'height';
  const offsetProperty = `offset${Object(helpers["w" /* upperFirst */])(sizeProperty)}`;
  return {
    beforeEnter(el) {
      el._parent = el.parentNode;
      el._initialStyle = {
        transition: el.style.transition,
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty]
      };
    },
    enter(el) {
      const initialStyle = el._initialStyle;
      el.style.setProperty('transition', 'none', 'important'); // Hide overflow to account for collapsed margins in the calculated height

      el.style.overflow = 'hidden';
      const offset = `${el[offsetProperty]}px`;
      el.style[sizeProperty] = '0';
      void el.offsetHeight; // force reflow

      el.style.transition = initialStyle.transition;
      if (expandedParentClass && el._parent) {
        el._parent.classList.add(expandedParentClass);
      }
      requestAnimationFrame(() => {
        el.style[sizeProperty] = offset;
      });
    },
    afterEnter: resetStyles,
    enterCancelled: resetStyles,
    leave(el) {
      el._initialStyle = {
        transition: '',
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty]
      };
      el.style.overflow = 'hidden';
      el.style[sizeProperty] = `${el[offsetProperty]}px`;
      void el.offsetHeight; // force reflow

      requestAnimationFrame(() => el.style[sizeProperty] = '0');
    },
    afterLeave,
    leaveCancelled: afterLeave
  };
  function afterLeave(el) {
    if (expandedParentClass && el._parent) {
      el._parent.classList.remove(expandedParentClass);
    }
    resetStyles(el);
  }
  function resetStyles(el) {
    const size = el._initialStyle[sizeProperty];
    el.style.overflow = el._initialStyle.overflow;
    if (size != null) el.style[sizeProperty] = size;
    delete el._initialStyle;
  }
});
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/transitions/index.js

 // Component specific transitions

const VCarouselTransition = createSimpleTransition('carousel-transition');
const VCarouselReverseTransition = createSimpleTransition('carousel-reverse-transition');
const VTabTransition = createSimpleTransition('tab-transition');
const VTabReverseTransition = createSimpleTransition('tab-reverse-transition');
const VMenuTransition = createSimpleTransition('menu-transition');
const VFabTransition = createSimpleTransition('fab-transition', 'center center', 'out-in'); // Generic transitions

const VDialogTransition = createSimpleTransition('dialog-transition');
const VDialogBottomTransition = createSimpleTransition('dialog-bottom-transition');
const VDialogTopTransition = createSimpleTransition('dialog-top-transition');
const VFadeTransition = createSimpleTransition('fade-transition');
const VScaleTransition = createSimpleTransition('scale-transition');
const VScrollXTransition = createSimpleTransition('scroll-x-transition');
const VScrollXReverseTransition = createSimpleTransition('scroll-x-reverse-transition');
const VScrollYTransition = createSimpleTransition('scroll-y-transition');
const VScrollYReverseTransition = createSimpleTransition('scroll-y-reverse-transition');
const VSlideXTransition = createSimpleTransition('slide-x-transition');
const VSlideXReverseTransition = createSimpleTransition('slide-x-reverse-transition');
const VSlideYTransition = createSimpleTransition('slide-y-transition');
const VSlideYReverseTransition = createSimpleTransition('slide-y-reverse-transition'); // Javascript transitions

const VExpandTransition = createJavascriptTransition('expand-transition', expand_transition());
const VExpandXTransition = createJavascriptTransition('expand-x-transition', expand_transition('', true));
/* harmony default export */ var transitions = ({
  $_vuetify_subcomponents: {
    VCarouselTransition,
    VCarouselReverseTransition,
    VDialogTransition,
    VDialogBottomTransition,
    VDialogTopTransition,
    VFabTransition,
    VFadeTransition,
    VMenuTransition,
    VScaleTransition,
    VScrollXTransition,
    VScrollXReverseTransition,
    VScrollYTransition,
    VScrollYReverseTransition,
    VSlideXTransition,
    VSlideXReverseTransition,
    VSlideYTransition,
    VSlideYReverseTransition,
    VTabReverseTransition,
    VTabTransition,
    VExpandTransition,
    VExpandXTransition
  }
});

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Ripple */
/* harmony import */ var _src_directives_ripple_VRipple_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(79);
/* harmony import */ var _src_directives_ripple_VRipple_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_directives_ripple_VRipple_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
// Styles
 // Utilities



const DELAY_RIPPLE = 80;
function transform(el, value) {
  el.style.transform = value;
  el.style.webkitTransform = value;
}
function isTouchEvent(e) {
  return e.constructor.name === 'TouchEvent';
}
function isKeyboardEvent(e) {
  return e.constructor.name === 'KeyboardEvent';
}
const calculate = (e, el, value = {}) => {
  let localX = 0;
  let localY = 0;
  if (!isKeyboardEvent(e)) {
    const offset = el.getBoundingClientRect();
    const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
    localX = target.clientX - offset.left;
    localY = target.clientY - offset.top;
  }
  let radius = 0;
  let scale = 0.3;
  if (el._ripple && el._ripple.circle) {
    scale = 0.15;
    radius = el.clientWidth / 2;
    radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
  } else {
    radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
  }
  const centerX = `${(el.clientWidth - radius * 2) / 2}px`;
  const centerY = `${(el.clientHeight - radius * 2) / 2}px`;
  const x = value.center ? centerX : `${localX - radius}px`;
  const y = value.center ? centerY : `${localY - radius}px`;
  return {
    radius,
    scale,
    x,
    y,
    centerX,
    centerY
  };
};
const ripples = {
  /* eslint-disable max-statements */
  show(e, el, value = {}) {
    if (!el._ripple || !el._ripple.enabled) {
      return;
    }
    const container = document.createElement('span');
    const animation = document.createElement('span');
    container.appendChild(animation);
    container.className = 'v-ripple__container';
    if (value.class) {
      container.className += ` ${value.class}`;
    }
    const {
      radius,
      scale,
      x,
      y,
      centerX,
      centerY
    } = calculate(e, el, value);
    const size = `${radius * 2}px`;
    animation.className = 'v-ripple__animation';
    animation.style.width = size;
    animation.style.height = size;
    el.appendChild(container);
    const computed = window.getComputedStyle(el);
    if (computed && computed.position === 'static') {
      el.style.position = 'relative';
      el.dataset.previousPosition = 'static';
    }
    animation.classList.add('v-ripple__animation--enter');
    animation.classList.add('v-ripple__animation--visible');
    transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`);
    animation.dataset.activated = String(performance.now());
    setTimeout(() => {
      animation.classList.remove('v-ripple__animation--enter');
      animation.classList.add('v-ripple__animation--in');
      transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
    }, 0);
  },
  hide(el) {
    if (!el || !el._ripple || !el._ripple.enabled) return;
    const ripples = el.getElementsByClassName('v-ripple__animation');
    if (ripples.length === 0) return;
    const animation = ripples[ripples.length - 1];
    if (animation.dataset.isHiding) return;else animation.dataset.isHiding = 'true';
    const diff = performance.now() - Number(animation.dataset.activated);
    const delay = Math.max(250 - diff, 0);
    setTimeout(() => {
      animation.classList.remove('v-ripple__animation--in');
      animation.classList.add('v-ripple__animation--out');
      setTimeout(() => {
        var _a;
        const ripples = el.getElementsByClassName('v-ripple__animation');
        if (ripples.length === 1 && el.dataset.previousPosition) {
          el.style.position = el.dataset.previousPosition;
          delete el.dataset.previousPosition;
        }
        if (((_a = animation.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode) === el) el.removeChild(animation.parentNode);
      }, 300);
    }, delay);
  }
};
function isRippleEnabled(value) {
  return typeof value === 'undefined' || !!value;
}
function rippleShow(e) {
  const value = {};
  const element = e.currentTarget;
  if (!element || !element._ripple || element._ripple.touched || e.rippleStop) return; // Don't allow the event to trigger ripples on any other elements

  e.rippleStop = true;
  if (isTouchEvent(e)) {
    element._ripple.touched = true;
    element._ripple.isTouch = true;
  } else {
    // It's possible for touch events to fire
    // as mouse events on Android/iOS, this
    // will skip the event call if it has
    // already been registered as touch
    if (element._ripple.isTouch) return;
  }
  value.center = element._ripple.centered || isKeyboardEvent(e);
  if (element._ripple.class) {
    value.class = element._ripple.class;
  }
  if (isTouchEvent(e)) {
    // already queued that shows or hides the ripple
    if (element._ripple.showTimerCommit) return;
    element._ripple.showTimerCommit = () => {
      ripples.show(e, element, value);
    };
    element._ripple.showTimer = window.setTimeout(() => {
      if (element && element._ripple && element._ripple.showTimerCommit) {
        element._ripple.showTimerCommit();
        element._ripple.showTimerCommit = null;
      }
    }, DELAY_RIPPLE);
  } else {
    ripples.show(e, element, value);
  }
}
function rippleHide(e) {
  const element = e.currentTarget;
  if (!element || !element._ripple) return;
  window.clearTimeout(element._ripple.showTimer); // The touch interaction occurs before the show timer is triggered.
  // We still want to show ripple effect.

  if (e.type === 'touchend' && element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit();
    element._ripple.showTimerCommit = null; // re-queue ripple hiding

    element._ripple.showTimer = setTimeout(() => {
      rippleHide(e);
    });
    return;
  }
  window.setTimeout(() => {
    if (element._ripple) {
      element._ripple.touched = false;
    }
  });
  ripples.hide(element);
}
function rippleCancelShow(e) {
  const element = e.currentTarget;
  if (!element || !element._ripple) return;
  if (element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit = null;
  }
  window.clearTimeout(element._ripple.showTimer);
}
let keyboardRipple = false;
function keyboardRippleShow(e) {
  if (!keyboardRipple && (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* keyCodes */ "r"].enter || e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* keyCodes */ "r"].space)) {
    keyboardRipple = true;
    rippleShow(e);
  }
}
function keyboardRippleHide(e) {
  keyboardRipple = false;
  rippleHide(e);
}
function focusRippleHide(e) {
  if (keyboardRipple === true) {
    keyboardRipple = false;
    rippleHide(e);
  }
}
function updateRipple(el, binding, wasEnabled) {
  const enabled = isRippleEnabled(binding.value);
  if (!enabled) {
    ripples.hide(el);
  }
  el._ripple = el._ripple || {};
  el._ripple.enabled = enabled;
  const value = binding.value || {};
  if (value.center) {
    el._ripple.centered = true;
  }
  if (value.class) {
    el._ripple.class = binding.value.class;
  }
  if (value.circle) {
    el._ripple.circle = value.circle;
  }
  if (enabled && !wasEnabled) {
    el.addEventListener('touchstart', rippleShow, {
      passive: true
    });
    el.addEventListener('touchend', rippleHide, {
      passive: true
    });
    el.addEventListener('touchmove', rippleCancelShow, {
      passive: true
    });
    el.addEventListener('touchcancel', rippleHide);
    el.addEventListener('mousedown', rippleShow);
    el.addEventListener('mouseup', rippleHide);
    el.addEventListener('mouseleave', rippleHide);
    el.addEventListener('keydown', keyboardRippleShow);
    el.addEventListener('keyup', keyboardRippleHide);
    el.addEventListener('blur', focusRippleHide); // Anchor tags can be dragged, causes other hides to fail - #1537

    el.addEventListener('dragstart', rippleHide, {
      passive: true
    });
  } else if (!enabled && wasEnabled) {
    removeListeners(el);
  }
}
function removeListeners(el) {
  el.removeEventListener('mousedown', rippleShow);
  el.removeEventListener('touchstart', rippleShow);
  el.removeEventListener('touchend', rippleHide);
  el.removeEventListener('touchmove', rippleCancelShow);
  el.removeEventListener('touchcancel', rippleHide);
  el.removeEventListener('mouseup', rippleHide);
  el.removeEventListener('mouseleave', rippleHide);
  el.removeEventListener('keydown', keyboardRippleShow);
  el.removeEventListener('keyup', keyboardRippleHide);
  el.removeEventListener('dragstart', rippleHide);
  el.removeEventListener('blur', focusRippleHide);
}
function directive(el, binding, node) {
  updateRipple(el, binding, false);
  if (false) {}
}
function unbind(el) {
  delete el._ripple;
  removeListeners(el);
}
function update(el, binding) {
  if (binding.value === binding.oldValue) {
    return;
  }
  const wasEnabled = isRippleEnabled(binding.oldValue);
  updateRipple(el, binding, wasEnabled);
}
const Ripple = {
  bind: directive,
  unbind,
  update
};
/* harmony default export */ __webpack_exports__["a"] = (Ripple);

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VProgressLinear_VProgressLinear_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(80);
/* harmony import */ var _src_components_VProgressLinear_VProgressLinear_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VProgressLinear_VProgressLinear_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _transitions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(57);
/* harmony import */ var _directives_intersect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(49);
/* harmony import */ var _mixins_positionable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(56);
/* harmony import */ var _mixins_proxyable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(61);
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
 // Components

 // Directives

 // Mixins




 // Utilities



const baseMixins = Object(_util_mixins__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(_mixins_colorable__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], Object(_mixins_positionable__WEBPACK_IMPORTED_MODULE_4__[/* factory */ "b"])(['absolute', 'fixed', 'top', 'bottom']), _mixins_proxyable__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"]);
/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (baseMixins.extend({
  name: 'v-progress-linear',
  directives: {
    intersect: _directives_intersect__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]
  },
  props: {
    active: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: null
    },
    backgroundOpacity: {
      type: [Number, String],
      default: null
    },
    bufferValue: {
      type: [Number, String],
      default: 100
    },
    color: {
      type: String,
      default: 'primary'
    },
    height: {
      type: [Number, String],
      default: 4
    },
    indeterminate: Boolean,
    query: Boolean,
    reverse: Boolean,
    rounded: Boolean,
    stream: Boolean,
    striped: Boolean,
    value: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      internalLazyValue: this.value || 0,
      isVisible: true
    };
  },
  computed: {
    __cachedBackground() {
      return this.$createElement('div', this.setBackgroundColor(this.backgroundColor || this.color, {
        staticClass: 'v-progress-linear__background',
        style: this.backgroundStyle
      }));
    },
    __cachedBar() {
      return this.$createElement(this.computedTransition, [this.__cachedBarType]);
    },
    __cachedBarType() {
      return this.indeterminate ? this.__cachedIndeterminate : this.__cachedDeterminate;
    },
    __cachedBuffer() {
      return this.$createElement('div', {
        staticClass: 'v-progress-linear__buffer',
        style: this.styles
      });
    },
    __cachedDeterminate() {
      return this.$createElement('div', this.setBackgroundColor(this.color, {
        staticClass: `v-progress-linear__determinate`,
        style: {
          width: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__[/* convertToUnit */ "g"])(this.normalizedValue, '%')
        }
      }));
    },
    __cachedIndeterminate() {
      return this.$createElement('div', {
        staticClass: 'v-progress-linear__indeterminate',
        class: {
          'v-progress-linear__indeterminate--active': this.active
        }
      }, [this.genProgressBar('long'), this.genProgressBar('short')]);
    },
    __cachedStream() {
      if (!this.stream) return null;
      return this.$createElement('div', this.setTextColor(this.color, {
        staticClass: 'v-progress-linear__stream',
        style: {
          width: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__[/* convertToUnit */ "g"])(100 - this.normalizedBuffer, '%')
        }
      }));
    },
    backgroundStyle() {
      const backgroundOpacity = this.backgroundOpacity == null ? this.backgroundColor ? 1 : 0.3 : parseFloat(this.backgroundOpacity);
      return {
        opacity: backgroundOpacity,
        [this.isReversed ? 'right' : 'left']: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__[/* convertToUnit */ "g"])(this.normalizedValue, '%'),
        width: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__[/* convertToUnit */ "g"])(Math.max(0, this.normalizedBuffer - this.normalizedValue), '%')
      };
    },
    classes() {
      return {
        'v-progress-linear--absolute': this.absolute,
        'v-progress-linear--fixed': this.fixed,
        'v-progress-linear--query': this.query,
        'v-progress-linear--reactive': this.reactive,
        'v-progress-linear--reverse': this.isReversed,
        'v-progress-linear--rounded': this.rounded,
        'v-progress-linear--striped': this.striped,
        'v-progress-linear--visible': this.isVisible,
        ...this.themeClasses
      };
    },
    computedTransition() {
      return this.indeterminate ? _transitions__WEBPACK_IMPORTED_MODULE_1__[/* VFadeTransition */ "c"] : _transitions__WEBPACK_IMPORTED_MODULE_1__[/* VSlideXTransition */ "f"];
    },
    isReversed() {
      return this.$vuetify.rtl !== this.reverse;
    },
    normalizedBuffer() {
      return this.normalize(this.bufferValue);
    },
    normalizedValue() {
      return this.normalize(this.internalLazyValue);
    },
    reactive() {
      return Boolean(this.$listeners.change);
    },
    styles() {
      const styles = {};
      if (!this.active) {
        styles.height = 0;
      }
      if (!this.indeterminate && parseFloat(this.normalizedBuffer) !== 100) {
        styles.width = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__[/* convertToUnit */ "g"])(this.normalizedBuffer, '%');
      }
      return styles;
    }
  },
  methods: {
    genContent() {
      const slot = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__[/* getSlot */ "n"])(this, 'default', {
        value: this.internalLazyValue
      });
      if (!slot) return null;
      return this.$createElement('div', {
        staticClass: 'v-progress-linear__content'
      }, slot);
    },
    genListeners() {
      const listeners = this.$listeners;
      if (this.reactive) {
        listeners.click = this.onClick;
      }
      return listeners;
    },
    genProgressBar(name) {
      return this.$createElement('div', this.setBackgroundColor(this.color, {
        staticClass: 'v-progress-linear__indeterminate',
        class: {
          [name]: true
        }
      }));
    },
    onClick(e) {
      if (!this.reactive) return;
      const {
        width
      } = this.$el.getBoundingClientRect();
      this.internalValue = e.offsetX / width * 100;
    },
    onObserve(entries, observer, isIntersecting) {
      this.isVisible = isIntersecting;
    },
    normalize(value) {
      if (value < 0) return 0;
      if (value > 100) return 100;
      return parseFloat(value);
    }
  },
  render(h) {
    const data = {
      staticClass: 'v-progress-linear',
      attrs: {
        role: 'progressbar',
        'aria-valuemin': 0,
        'aria-valuemax': this.normalizedBuffer,
        'aria-valuenow': this.indeterminate ? undefined : this.normalizedValue
      },
      class: this.classes,
      directives: [{
        name: 'intersect',
        value: this.onObserve
      }],
      style: {
        bottom: this.bottom ? 0 : undefined,
        height: this.active ? Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__[/* convertToUnit */ "g"])(this.height) : 0,
        top: this.top ? 0 : undefined
      },
      on: this.genListeners()
    };
    return h('div', data, [this.__cachedStream, this.__cachedBackground, this.__cachedBuffer, this.__cachedBar, this.genContent()]);
  }
}));

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VSheet_VSheet_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85);
/* harmony import */ var _src_components_VSheet_VSheet_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VSheet_VSheet_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_binds_attrs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(49);
/* harmony import */ var _mixins_elevatable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(65);
/* harmony import */ var _mixins_measurable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(82);
/* harmony import */ var _mixins_roundable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(77);
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
// Styles
 // Mixins






 // Helpers


/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(_mixins_binds_attrs__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], _mixins_colorable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _mixins_elevatable__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _mixins_measurable__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], _mixins_roundable__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"]).extend({
  name: 'v-sheet',
  props: {
    outlined: Boolean,
    shaped: Boolean,
    tag: {
      type: String,
      default: 'div'
    }
  },
  computed: {
    classes() {
      return {
        'v-sheet': true,
        'v-sheet--outlined': this.outlined,
        'v-sheet--shaped': this.shaped,
        ...this.themeClasses,
        ...this.elevationClasses,
        ...this.roundedClasses
      };
    },
    styles() {
      return this.measurableStyles;
    }
  },
  render(h) {
    const data = {
      class: this.classes,
      style: this.styles,
      on: this.listeners$
    };
    return h(this.tag, this.setBackgroundColor(this.color, data), this.$slots.default);
  }
}));

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export factory */
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

function factory(prop = 'value', event = 'change') {
  return vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
    name: 'proxyable',
    model: {
      prop,
      event
    },
    props: {
      [prop]: {
        required: false
      }
    },
    data() {
      return {
        internalLazyValue: this[prop]
      };
    },
    computed: {
      internalValue: {
        get() {
          return this.internalLazyValue;
        },
        set(val) {
          if (val === this.internalLazyValue) return;
          this.internalLazyValue = val;
          this.$emit(event, val);
        }
      }
    },
    watch: {
      [prop](val) {
        this.internalLazyValue = val;
      }
    }
  });
}
/* eslint-disable-next-line @typescript-eslint/no-redeclare */

const Proxyable = factory();
/* harmony default export */ __webpack_exports__["a"] = (Proxyable);

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_1__);


const state = new vue__WEBPACK_IMPORTED_MODULE_0___default.a({
  data() {
    return {
      type: "book",
      manualCite: false,
      sources: [],
      currentSource: {
        authors: []
      },
      currentMessageOpen: false,
      currentMessage: {
        type: "none",
        text: ""
      },
      citationTypes: [{
        label: "Book",
        type: "book"
      }, {
        label: "Website",
        type: "webpage"
      }, {
        label: "Journal",
        type: "article-journal"
      }, {
        label: "Article",
        type: "article"
      }, {
        label: "Podcast",
        type: "song"
      }, {
        label: "Personal Communication",
        type: "personal_communication"
      }, {
        label: "Speech",
        type: "speech"
      }, {
        label: "Broadcast",
        type: "broadcast"
      }, {
        label: "Report",
        type: "report"
      }],
      fields: [],
      currentCitation: "",
      citationList: [],
      showCitationList: [],
      citationTimeout: null,
      citationLoading: false,
      citationLoadingTimeout: null,
      citations: [],
      currentSearch: "",
      currentCitationFile: "",
      currentStyle: 0
    };
  },
  watch: {
    async currentCitationFile() {
      if (this.currentSource.title) {
        await this.getNewCitation();
      }
    },
    type() {
      if (this.type !== "book" && this.type !== "webpage") {
        this.currentMessage = {
          type: "warning",
          text: "This citation type is in beta. Use with caution."
        };
      }
    },
    currentMessage() {
      if (this.currentMessage.type !== "none") {
        this.currentMessageOpen = true;
      } else {
        this.currentMessageOpen = false;
      }
    }
  },
  methods: {
    async fetchFields() {
      const type = this.type !== "auto" ? this.type : "book";
      const res = await fetch(`${"https://api.bibify.org/api"}/fields/${type}`);
      if (res.ok) {
        this.fields = await res.json();
      } else {
        console.error("Field fetch failed!");
        state.currentMessage = {
          type: "error",
          text: "Error: could not fetch citation fields. Backend is probably down; try later."
        };
      }
      this.fields = this.fields.map(field => {
        if (field.field === "issued") {
          field.label = "Publish Date";
          field.field = "date";
        } else if (field.field === "publisher-place") {
          field.label = "Publisher Location";
        }
        return field;
      });
    },
    async getNewCitation() {
      const source = {
        ...this.currentSource,
        style: this.currentCitationFile || "modern-language-association.csl",
        type: this.type !== "auto" ? this.type : "book"
      };
      this.citationLoading = false;
      this.citationLoadingTimeout = setTimeout(() => {
        this.citationLoading = true;
      }, 1000);
      console.log(source);
      const res = await fetch(`${"https://api.bibify.org/api"}/cite?${qs__WEBPACK_IMPORTED_MODULE_1___default.a.stringify(source, {
        format: "RFC3986"
      })}`);
      if (res.ok) {
        const citation = await res.json();
        this.currentCitation = citation[0];
      } else {
        console.error("cite failed", res);
        state.currentMessage = {
          type: "error",
          text: "Error: could not fetch citation. Backend is probably down; try later."
        };
      }
      clearTimeout(this.citationLoadingTimeout);
      this.citationLoading = false;
    }
  },
  computed: {
    infoFields() {
      const type = this.type !== "auto" ? this.type : "book";
      return this.fields.filter(field => {
        switch (field.field) {
          case "title":
            return true;
          case "edition":
          case "volume":
            return type === "book";
          case "URL":
            return type === "webpage";
          default:
            return false;
        }
      });
    },
    publisherFields() {
      return this.fields.filter(field => {
        switch (field.field) {
          case "publisher":
          case "publisher-place":
          case "date":
            return true;
          default:
            return false;
        }
      });
    },
    currentMessageType() {
      return this.currentMessage.type === "none" ? "success" : this.currentMessage.type;
    },
    otherFields() {
      return this.fields.filter(field => {
        return !(this.publisherFields.includes(field) || this.infoFields.includes(field));
      });
    }
  }
});
if (false) {}
/* harmony default export */ __webpack_exports__["a"] = (state);

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return factory; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

function factory(prop = 'value', event = 'input') {
  return vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
    name: 'toggleable',
    model: {
      prop,
      event
    },
    props: {
      [prop]: {
        required: false
      }
    },
    data() {
      return {
        isActive: !!this[prop]
      };
    },
    watch: {
      [prop](val) {
        this.isActive = !!val;
      },
      isActive(val) {
        !!val !== this[prop] && this.$emit(event, val);
      }
    }
  });
}
/* eslint-disable-next-line @typescript-eslint/no-redeclare */

const Toggleable = factory();
/* harmony default export */ __webpack_exports__["a"] = (Toggleable);

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
  name: 'sizeable',
  props: {
    large: Boolean,
    small: Boolean,
    xLarge: Boolean,
    xSmall: Boolean
  },
  computed: {
    medium() {
      return Boolean(!this.xSmall && !this.small && !this.large && !this.xLarge);
    },
    sizeableClasses() {
      return {
        'v-size--x-small': this.xSmall,
        'v-size--small': this.small,
        'v-size--default': this.medium,
        'v-size--large': this.large,
        'v-size--x-large': this.xLarge
      };
    }
  }
}));

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
  name: 'elevatable',
  props: {
    elevation: [Number, String]
  },
  computed: {
    computedElevation() {
      return this.elevation;
    },
    elevationClasses() {
      const elevation = this.computedElevation;
      if (elevation == null) return {};
      if (isNaN(parseInt(elevation))) return {};
      return {
        [`elevation-${this.elevation}`]: true
      };
    }
  }
}));

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _directives_ripple__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(58);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
 // Directives

 // Utilities


/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
  name: 'routable',
  directives: {
    Ripple: _directives_ripple__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]
  },
  props: {
    activeClass: String,
    append: Boolean,
    disabled: Boolean,
    exact: {
      type: Boolean,
      default: undefined
    },
    exactPath: Boolean,
    exactActiveClass: String,
    link: Boolean,
    href: [String, Object],
    to: [String, Object],
    nuxt: Boolean,
    replace: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: null
    },
    tag: String,
    target: String
  },
  data: () => ({
    isActive: false,
    proxyClass: ''
  }),
  computed: {
    classes() {
      const classes = {};
      if (this.to) return classes;
      if (this.activeClass) classes[this.activeClass] = this.isActive;
      if (this.proxyClass) classes[this.proxyClass] = this.isActive;
      return classes;
    },
    computedRipple() {
      var _a;
      return (_a = this.ripple) !== null && _a !== void 0 ? _a : !this.disabled && this.isClickable;
    },
    isClickable() {
      if (this.disabled) return false;
      return Boolean(this.isLink || this.$listeners.click || this.$listeners['!click'] || this.$attrs.tabindex);
    },
    isLink() {
      return this.to || this.href || this.link;
    },
    styles: () => ({})
  },
  watch: {
    $route: 'onRouteChange'
  },
  mounted() {
    this.onRouteChange();
  },
  methods: {
    generateRouteLink() {
      let exact = this.exact;
      let tag;
      const data = {
        attrs: {
          tabindex: 'tabindex' in this.$attrs ? this.$attrs.tabindex : undefined
        },
        class: this.classes,
        style: this.styles,
        props: {},
        directives: [{
          name: 'ripple',
          value: this.computedRipple
        }],
        [this.to ? 'nativeOn' : 'on']: {
          ...this.$listeners,
          ...('click' in this ? {
            click: this.click
          } : undefined) // #14447
        },
        ref: 'link'
      };
      if (typeof this.exact === 'undefined') {
        exact = this.to === '/' || this.to === Object(this.to) && this.to.path === '/';
      }
      if (this.to) {
        // Add a special activeClass hook
        // for component level styles
        let activeClass = this.activeClass;
        let exactActiveClass = this.exactActiveClass || activeClass;
        if (this.proxyClass) {
          activeClass = `${activeClass} ${this.proxyClass}`.trim();
          exactActiveClass = `${exactActiveClass} ${this.proxyClass}`.trim();
        }
        tag = this.nuxt ? 'nuxt-link' : 'router-link';
        Object.assign(data.props, {
          to: this.to,
          exact,
          exactPath: this.exactPath,
          activeClass,
          exactActiveClass,
          append: this.append,
          replace: this.replace
        });
      } else {
        tag = this.href && 'a' || this.tag || 'div';
        if (tag === 'a' && this.href) data.attrs.href = this.href;
      }
      if (this.target) data.attrs.target = this.target;
      return {
        tag,
        data
      };
    },
    onRouteChange() {
      if (!this.to || !this.$refs.link || !this.$route) return;
      const activeClass = `${this.activeClass || ''} ${this.proxyClass || ''}`.trim();
      const exactActiveClass = `${this.exactActiveClass || ''} ${this.proxyClass || ''}`.trim() || activeClass;
      const path = '_vnode.data.class.' + (this.exact ? exactActiveClass : activeClass);
      this.$nextTick(() => {
        /* istanbul ignore else */
        if (!Object(_util_helpers__WEBPACK_IMPORTED_MODULE_2__[/* getObjectValueByPath */ "l"])(this.$refs.link, path) === this.isActive) {
          this.toggle();
        }
      });
    },
    toggle() {
      this.isActive = !this.isActive;
    }
  }
}));

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return factory; });
/* harmony import */ var _registrable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(53);
// Mixins

function factory(namespace, child, parent) {
  return Object(_registrable__WEBPACK_IMPORTED_MODULE_0__[/* inject */ "a"])(namespace, child, parent).extend({
    name: 'groupable',
    props: {
      activeClass: {
        type: String,
        default() {
          if (!this[namespace]) return undefined;
          return this[namespace].activeClass;
        }
      },
      disabled: Boolean
    },
    data() {
      return {
        isActive: false
      };
    },
    computed: {
      groupClasses() {
        if (!this.activeClass) return {};
        return {
          [this.activeClass]: this.isActive
        };
      }
    },
    created() {
      this[namespace] && this[namespace].register(this);
    },
    beforeDestroy() {
      this[namespace] && this[namespace].unregister(this);
    },
    methods: {
      toggle(e) {
        if (this.disabled && e) {
          // Prevent keyboard actions
          // from children elements
          // within disabled tabs
          e.preventDefault();
          return;
        }
        this.$emit('change');
      }
    }
  });
}
/* eslint-disable-next-line @typescript-eslint/no-redeclare */

const Groupable = factory('itemGroup');
/* unused harmony default export */ var _unused_webpack_default_export = (Groupable);

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VIcon_VIcon_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(87);
/* harmony import */ var _src_components_VIcon_VIcon_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VIcon_VIcon_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_binds_attrs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(49);
/* harmony import */ var _mixins_sizeable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64);
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(0);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
 // Mixins




 // Util

 // Types



var SIZE_MAP;
(function (SIZE_MAP) {
  SIZE_MAP["xSmall"] = "12px";
  SIZE_MAP["small"] = "16px";
  SIZE_MAP["default"] = "24px";
  SIZE_MAP["medium"] = "28px";
  SIZE_MAP["large"] = "36px";
  SIZE_MAP["xLarge"] = "40px";
})(SIZE_MAP || (SIZE_MAP = {}));
function isFontAwesome5(iconType) {
  return ['fas', 'far', 'fal', 'fab', 'fad', 'fak'].some(val => iconType.includes(val));
}
function isSvgPath(icon) {
  return /^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(icon) && /[\dz]$/i.test(icon) && icon.length > 4;
}
const VIcon = Object(_util_mixins__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(_mixins_binds_attrs__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], _mixins_colorable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _mixins_sizeable__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]
/* @vue/component */).extend({
  name: 'v-icon',
  props: {
    dense: Boolean,
    disabled: Boolean,
    left: Boolean,
    right: Boolean,
    size: [Number, String],
    tag: {
      type: String,
      required: false,
      default: 'i'
    }
  },
  computed: {
    medium() {
      return false;
    },
    hasClickListener() {
      return Boolean(this.listeners$.click || this.listeners$['!click']);
    }
  },
  methods: {
    getIcon() {
      let iconName = '';
      if (this.$slots.default) iconName = this.$slots.default[0].text.trim();
      return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_5__[/* remapInternalIcon */ "v"])(this, iconName);
    },
    getSize() {
      const sizes = {
        xSmall: this.xSmall,
        small: this.small,
        medium: this.medium,
        large: this.large,
        xLarge: this.xLarge
      };
      const explicitSize = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_5__[/* keys */ "s"])(sizes).find(key => sizes[key]);
      return explicitSize && SIZE_MAP[explicitSize] || Object(_util_helpers__WEBPACK_IMPORTED_MODULE_5__[/* convertToUnit */ "g"])(this.size);
    },
    // Component data for both font icon and SVG wrapper span
    getDefaultData() {
      return {
        staticClass: 'v-icon notranslate',
        class: {
          'v-icon--disabled': this.disabled,
          'v-icon--left': this.left,
          'v-icon--link': this.hasClickListener,
          'v-icon--right': this.right,
          'v-icon--dense': this.dense
        },
        attrs: {
          'aria-hidden': !this.hasClickListener,
          disabled: this.hasClickListener && this.disabled,
          type: this.hasClickListener ? 'button' : undefined,
          ...this.attrs$
        },
        on: this.listeners$
      };
    },
    getSvgWrapperData() {
      const fontSize = this.getSize();
      const wrapperData = {
        ...this.getDefaultData(),
        style: fontSize ? {
          fontSize,
          height: fontSize,
          width: fontSize
        } : undefined
      };
      this.applyColors(wrapperData);
      return wrapperData;
    },
    applyColors(data) {
      data.class = {
        ...data.class,
        ...this.themeClasses
      };
      this.setTextColor(this.color, data);
    },
    renderFontIcon(icon, h) {
      const newChildren = [];
      const data = this.getDefaultData();
      let iconType = 'material-icons'; // Material Icon delimiter is _
      // https://material.io/icons/

      const delimiterIndex = icon.indexOf('-');
      const isMaterialIcon = delimiterIndex <= -1;
      if (isMaterialIcon) {
        // Material icon uses ligatures.
        newChildren.push(icon);
      } else {
        iconType = icon.slice(0, delimiterIndex);
        if (isFontAwesome5(iconType)) iconType = '';
      }
      data.class[iconType] = true;
      data.class[icon] = !isMaterialIcon;
      const fontSize = this.getSize();
      if (fontSize) data.style = {
        fontSize
      };
      this.applyColors(data);
      return h(this.hasClickListener ? 'button' : this.tag, data, newChildren);
    },
    renderSvgIcon(icon, h) {
      const svgData = {
        class: 'v-icon__svg',
        attrs: {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          role: 'img',
          'aria-hidden': true
        }
      };
      const size = this.getSize();
      if (size) {
        svgData.style = {
          fontSize: size,
          height: size,
          width: size
        };
      }
      return h(this.hasClickListener ? 'button' : 'span', this.getSvgWrapperData(), [h('svg', svgData, [h('path', {
        attrs: {
          d: icon
        }
      })])]);
    },
    renderSvgIconComponent(icon, h) {
      const data = {
        class: {
          'v-icon__component': true
        }
      };
      const size = this.getSize();
      if (size) {
        data.style = {
          fontSize: size,
          height: size,
          width: size
        };
      }
      this.applyColors(data);
      const component = icon.component;
      data.props = icon.props;
      data.nativeOn = data.on;
      return h(this.hasClickListener ? 'button' : 'span', this.getSvgWrapperData(), [h(component, data)]);
    }
  },
  render(h) {
    const icon = this.getIcon();
    if (typeof icon === 'string') {
      if (isSvgPath(icon)) {
        return this.renderSvgIcon(icon, h);
      }
      return this.renderFontIcon(icon, h);
    }
    return this.renderSvgIconComponent(icon, h);
  }
});
/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_6___default.a.extend({
  name: 'v-icon',
  $_wrapperFor: VIcon,
  functional: true,
  render(h, {
    data,
    children
  }) {
    let iconName = ''; // Support usage of v-text and v-html

    if (data.domProps) {
      iconName = data.domProps.textContent || data.domProps.innerHTML || iconName; // Remove nodes so it doesn't
      // overwrite our changes

      delete data.domProps.textContent;
      delete data.domProps.innerHTML;
    }
    return h(VIcon, data, iconName ? [iconName] : children);
  }
}));

/***/ }),
/* 69 */,
/* 70 */,
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_VProgressLinear__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);



/**
 * Loadable
 *
 * @mixin
 *
 * Used to add linear progress bar to components
 * Can use a default bar with a specific color
 * or designate a custom progress linear bar
 */

/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend().extend({
  name: 'loadable',
  props: {
    loading: {
      type: [Boolean, String],
      default: false
    },
    loaderHeight: {
      type: [Number, String],
      default: 2
    }
  },
  methods: {
    genProgress() {
      if (this.loading === false) return null;
      return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_2__[/* getSlot */ "n"])(this, 'progress') || this.$createElement(_components_VProgressLinear__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
        props: {
          absolute: true,
          color: this.loading === true || this.loading === '' ? this.color || 'primary' : this.loading,
          height: this.loaderHeight,
          indeterminate: true
        }
      });
    }
  }
}));

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _VProgressLinear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59);


/* harmony default export */ __webpack_exports__["a"] = (_VProgressLinear__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),
/* 73 */,
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VProgressCircular_VProgressCircular_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(86);
/* harmony import */ var _src_components_VProgressCircular_VProgressCircular_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VProgressCircular_VProgressCircular_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _directives_intersect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(54);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(49);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
// Styles
 // Directives

 // Mixins

 // Utils


/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (_mixins_colorable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].extend({
  name: 'v-progress-circular',
  directives: {
    intersect: _directives_intersect__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]
  },
  props: {
    button: Boolean,
    indeterminate: Boolean,
    rotate: {
      type: [Number, String],
      default: 0
    },
    size: {
      type: [Number, String],
      default: 32
    },
    width: {
      type: [Number, String],
      default: 4
    },
    value: {
      type: [Number, String],
      default: 0
    }
  },
  data: () => ({
    radius: 20,
    isVisible: true
  }),
  computed: {
    calculatedSize() {
      return Number(this.size) + (this.button ? 8 : 0);
    },
    circumference() {
      return 2 * Math.PI * this.radius;
    },
    classes() {
      return {
        'v-progress-circular--visible': this.isVisible,
        'v-progress-circular--indeterminate': this.indeterminate,
        'v-progress-circular--button': this.button
      };
    },
    normalizedValue() {
      if (this.value < 0) {
        return 0;
      }
      if (this.value > 100) {
        return 100;
      }
      return parseFloat(this.value);
    },
    strokeDashArray() {
      return Math.round(this.circumference * 1000) / 1000;
    },
    strokeDashOffset() {
      return (100 - this.normalizedValue) / 100 * this.circumference + 'px';
    },
    strokeWidth() {
      return Number(this.width) / +this.size * this.viewBoxSize * 2;
    },
    styles() {
      return {
        height: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__[/* convertToUnit */ "g"])(this.calculatedSize),
        width: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__[/* convertToUnit */ "g"])(this.calculatedSize)
      };
    },
    svgStyles() {
      return {
        transform: `rotate(${Number(this.rotate)}deg)`
      };
    },
    viewBoxSize() {
      return this.radius / (1 - Number(this.width) / +this.size);
    }
  },
  methods: {
    genCircle(name, offset) {
      return this.$createElement('circle', {
        class: `v-progress-circular__${name}`,
        attrs: {
          fill: 'transparent',
          cx: 2 * this.viewBoxSize,
          cy: 2 * this.viewBoxSize,
          r: this.radius,
          'stroke-width': this.strokeWidth,
          'stroke-dasharray': this.strokeDashArray,
          'stroke-dashoffset': offset
        }
      });
    },
    genSvg() {
      const children = [this.indeterminate || this.genCircle('underlay', 0), this.genCircle('overlay', this.strokeDashOffset)];
      return this.$createElement('svg', {
        style: this.svgStyles,
        attrs: {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: `${this.viewBoxSize} ${this.viewBoxSize} ${2 * this.viewBoxSize} ${2 * this.viewBoxSize}`
        }
      }, children);
    },
    genInfo() {
      return this.$createElement('div', {
        staticClass: 'v-progress-circular__info'
      }, Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__[/* getSlot */ "n"])(this));
    },
    onObserve(entries, observer, isIntersecting) {
      this.isVisible = isIntersecting;
    }
  },
  render(h) {
    return h('div', this.setTextColor(this.color, {
      staticClass: 'v-progress-circular',
      attrs: {
        role: 'progressbar',
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuenow': this.indeterminate ? undefined : this.normalizedValue
      },
      class: this.classes,
      directives: [{
        name: 'intersect',
        value: this.onObserve
      }],
      style: this.styles,
      on: this.$listeners
    }), [this.genSvg(), this.genInfo()]);
  }
}));

/***/ }),
/* 75 */,
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _VSheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(60);


/* harmony default export */ __webpack_exports__["a"] = (_VSheet__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
  name: 'roundable',
  props: {
    rounded: [Boolean, String],
    tile: Boolean
  },
  computed: {
    roundedClasses() {
      const composite = [];
      const rounded = typeof this.rounded === 'string' ? String(this.rounded) : this.rounded === true;
      if (this.tile) {
        composite.push('rounded-0');
      } else if (typeof rounded === 'string') {
        const values = rounded.split(' ');
        for (const value of values) {
          composite.push(`rounded-${value}`);
        }
      } else if (rounded) {
        composite.push('rounded');
      }
      return composite.length > 0 ? {
        [composite.join(' ')]: true
      } : {};
    }
  }
}));

/***/ }),
/* 78 */,
/* 79 */
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),
/* 80 */
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return attachedRoot; });
/**
 * Returns:
 *  - 'null' if the node is not attached to the DOM
 *  - the root node (HTMLDocument | ShadowRoot) otherwise
 */
function attachedRoot(node) {
  /* istanbul ignore next */
  if (typeof node.getRootNode !== 'function') {
    // Shadow DOM not supported (IE11), lets find the root of this node
    while (node.parentNode) node = node.parentNode; // The root parent is the document if the node is attached to the DOM

    if (node !== document) return null;
    return document;
  }
  const root = node.getRootNode(); // The composed root node is the document if the node is attached to the DOM

  if (root !== document && root.getRootNode({
    composed: true
  }) !== document) return null;
  return root;
}

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
// Helpers
 // Types


/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_1___default.a.extend({
  name: 'measurable',
  props: {
    height: [Number, String],
    maxHeight: [Number, String],
    maxWidth: [Number, String],
    minHeight: [Number, String],
    minWidth: [Number, String],
    width: [Number, String]
  },
  computed: {
    measurableStyles() {
      const styles = {};
      const height = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[/* convertToUnit */ "g"])(this.height);
      const minHeight = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[/* convertToUnit */ "g"])(this.minHeight);
      const minWidth = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[/* convertToUnit */ "g"])(this.minWidth);
      const maxHeight = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[/* convertToUnit */ "g"])(this.maxHeight);
      const maxWidth = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[/* convertToUnit */ "g"])(this.maxWidth);
      const width = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[/* convertToUnit */ "g"])(this.width);
      if (height) styles.height = height;
      if (minHeight) styles.minHeight = minHeight;
      if (minWidth) styles.minWidth = minWidth;
      if (maxHeight) styles.maxHeight = maxHeight;
      if (maxWidth) styles.maxWidth = maxWidth;
      if (width) styles.width = width;
      return styles;
    }
  }
}));

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _VProgressCircular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74);


/* harmony default export */ __webpack_exports__["a"] = (_VProgressCircular__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),
/* 84 */,
/* 85 */
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),
/* 86 */
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),
/* 87 */
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),
/* 88 */,
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
// Utilities
 // Types


/**
 * Bootable
 * @mixin
 *
 * Used to add lazy content functionality to components
 * Looks for change in "isActive" to automatically boot
 * Otherwise can be set manually
 */

/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_1___default.a.extend().extend({
  name: 'bootable',
  props: {
    eager: Boolean
  },
  data: () => ({
    isBooted: false
  }),
  computed: {
    hasContent() {
      return this.isBooted || this.eager || this.isActive;
    }
  },
  watch: {
    isActive() {
      this.isBooted = true;
    }
  },
  created() {
    /* istanbul ignore next */
    if ('lazy' in this.$attrs) {
      Object(_util_console__WEBPACK_IMPORTED_MODULE_0__[/* removed */ "e"])('lazy', this);
    }
  },
  methods: {
    showLazyContent(content) {
      return this.hasContent && content ? content() : [this.$createElement()];
    }
  }
}));

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _delayable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(102);
/* harmony import */ var _toggleable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(63);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
// Mixins

 // Utilities




const baseMixins = Object(_util_mixins__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_delayable__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"], _toggleable__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);
/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (baseMixins.extend({
  name: 'activatable',
  props: {
    activator: {
      default: null,
      validator: val => {
        return ['string', 'object'].includes(typeof val);
      }
    },
    disabled: Boolean,
    internalActivator: Boolean,
    openOnClick: {
      type: Boolean,
      default: true
    },
    openOnHover: Boolean,
    openOnFocus: Boolean
  },
  data: () => ({
    // Do not use this directly, call getActivator() instead
    activatorElement: null,
    activatorNode: [],
    events: ['click', 'mouseenter', 'mouseleave', 'focus'],
    listeners: {}
  }),
  watch: {
    activator: 'resetActivator',
    openOnFocus: 'resetActivator',
    openOnHover: 'resetActivator'
  },
  mounted() {
    const slotType = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__[/* getSlotType */ "o"])(this, 'activator', true);
    if (slotType && ['v-slot', 'normal'].includes(slotType)) {
      Object(_util_console__WEBPACK_IMPORTED_MODULE_4__[/* consoleError */ "b"])(`The activator slot must be bound, try '<template v-slot:activator="{ on }"><v-btn v-on="on">'`, this);
    }
    this.addActivatorEvents();
  },
  beforeDestroy() {
    this.removeActivatorEvents();
  },
  methods: {
    addActivatorEvents() {
      if (!this.activator || this.disabled || !this.getActivator()) return;
      this.listeners = this.genActivatorListeners();
      const keys = Object.keys(this.listeners);
      for (const key of keys) {
        this.getActivator().addEventListener(key, this.listeners[key]);
      }
    },
    genActivator() {
      const node = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__[/* getSlot */ "n"])(this, 'activator', Object.assign(this.getValueProxy(), {
        on: this.genActivatorListeners(),
        attrs: this.genActivatorAttributes()
      })) || [];
      this.activatorNode = node;
      return node;
    },
    genActivatorAttributes() {
      return {
        role: this.openOnClick && !this.openOnHover ? 'button' : undefined,
        'aria-haspopup': true,
        'aria-expanded': String(this.isActive)
      };
    },
    genActivatorListeners() {
      if (this.disabled) return {};
      const listeners = {};
      if (this.openOnHover) {
        listeners.mouseenter = e => {
          this.getActivator(e);
          this.runDelay('open');
        };
        listeners.mouseleave = e => {
          this.getActivator(e);
          this.runDelay('close');
        };
      } else if (this.openOnClick) {
        listeners.click = e => {
          const activator = this.getActivator(e);
          if (activator) activator.focus();
          e.stopPropagation();
          this.isActive = !this.isActive;
        };
      }
      if (this.openOnFocus) {
        listeners.focus = e => {
          this.getActivator(e);
          e.stopPropagation();
          this.isActive = !this.isActive;
        };
      }
      return listeners;
    },
    getActivator(e) {
      // If we've already fetched the activator, re-use
      if (this.activatorElement) return this.activatorElement;
      let activator = null;
      if (this.activator) {
        const target = this.internalActivator ? this.$el : document;
        if (typeof this.activator === 'string') {
          // Selector
          activator = target.querySelector(this.activator);
        } else if (this.activator.$el) {
          // Component (ref)
          activator = this.activator.$el;
        } else {
          // HTMLElement | Element
          activator = this.activator;
        }
      } else if (this.activatorNode.length === 1 || this.activatorNode.length && !e) {
        // Use the contents of the activator slot
        // There's either only one element in it or we
        // don't have a click event to use as a last resort
        const vm = this.activatorNode[0].componentInstance;
        if (vm && vm.$options.mixins &&
        //                         Activatable is indirectly used via Menuable
        vm.$options.mixins.some(m => m.options && ['activatable', 'menuable'].includes(m.options.name))) {
          // Activator is actually another activatible component, use its activator (#8846)
          activator = vm.getActivator();
        } else {
          activator = this.activatorNode[0].elm;
        }
      } else if (e) {
        // Activated by a click or focus event
        activator = e.currentTarget || e.target;
      } // The activator should only be a valid element (Ignore comments and text nodes)

      this.activatorElement = (activator === null || activator === void 0 ? void 0 : activator.nodeType) === Node.ELEMENT_NODE ? activator : null;
      return this.activatorElement;
    },
    getContentSlot() {
      return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__[/* getSlot */ "n"])(this, 'default', this.getValueProxy(), true);
    },
    getValueProxy() {
      const self = this;
      return {
        get value() {
          return self.isActive;
        },
        set value(isActive) {
          self.isActive = isActive;
        }
      };
    },
    removeActivatorEvents() {
      if (!this.activator || !this.activatorElement) return;
      const keys = Object.keys(this.listeners);
      for (const key of keys) {
        this.activatorElement.removeEventListener(key, this.listeners[key]);
      }
      this.listeners = {};
    },
    resetActivator() {
      this.removeActivatorEvents();
      this.activatorElement = null;
      this.getActivator();
      this.addActivatorEvents();
    }
  }
}));

/***/ }),
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VCard_VCard_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(112);
/* harmony import */ var _src_components_VCard_VCard_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VCard_VCard_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VSheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(76);
/* harmony import */ var _mixins_loadable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(71);
/* harmony import */ var _mixins_routable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);
// Styles
 // Extensions

 // Mixins


 // Helpers



/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(_mixins_loadable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _mixins_routable__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _VSheet__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]).extend({
  name: 'v-card',
  props: {
    flat: Boolean,
    hover: Boolean,
    img: String,
    link: Boolean,
    loaderHeight: {
      type: [Number, String],
      default: 4
    },
    raised: Boolean
  },
  computed: {
    classes() {
      return {
        'v-card': true,
        ..._mixins_routable__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].options.computed.classes.call(this),
        'v-card--flat': this.flat,
        'v-card--hover': this.hover,
        'v-card--link': this.isClickable,
        'v-card--loading': this.loading,
        'v-card--disabled': this.disabled,
        'v-card--raised': this.raised,
        ..._VSheet__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].options.computed.classes.call(this)
      };
    },
    styles() {
      const style = {
        ..._VSheet__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].options.computed.styles.call(this)
      };
      if (this.img) {
        style.background = `url("${this.img}") center center / cover no-repeat`;
      }
      return style;
    }
  },
  methods: {
    genProgress() {
      const render = _mixins_loadable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].options.methods.genProgress.call(this);
      if (!render) return null;
      return this.$createElement('div', {
        staticClass: 'v-card__progress',
        key: 'progress'
      }, [render]);
    }
  },
  render(h) {
    const {
      tag,
      data
    } = this.generateRouteLink();
    data.style = this.styles;
    if (this.isClickable) {
      data.attrs = data.attrs || {};
      data.attrs.tabindex = 0;
    }
    return h(tag, this.setBackgroundColor(this.color, data), [this.genProgress(), Object(_util_helpers__WEBPACK_IMPORTED_MODULE_5__[/* getSlot */ "n"])(this)]);
  }
}));

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);

function searchChildren(children) {
  const results = [];
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    if (child.isActive && child.isDependent) {
      results.push(child);
    } else {
      results.push(...searchChildren(child.$children));
    }
  }
  return results;
}
/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])().extend({
  name: 'dependent',
  data() {
    return {
      closeDependents: true,
      isActive: false,
      isDependent: true
    };
  },
  watch: {
    isActive(val) {
      if (val) return;
      const openDependents = this.getOpenDependents();
      for (let index = 0; index < openDependents.length; index++) {
        openDependents[index].isActive = false;
      }
    }
  },
  methods: {
    getOpenDependents() {
      if (this.closeDependents) return searchChildren(this.$children);
      return [];
    },
    getOpenDependentElements() {
      const result = [];
      const openDependents = this.getOpenDependents();
      for (let index = 0; index < openDependents.length; index++) {
        result.push(...openDependents[index].getClickableDependentElements());
      }
      return result;
    },
    getClickableDependentElements() {
      const result = [this.$el];
      if (this.$refs.content) result.push(this.$refs.content);
      if (this.overlay) result.push(this.overlay.$el);
      result.push(...this.getOpenDependentElements());
      return result;
    }
  }
}));

/***/ }),
/* 98 */,
/* 99 */,
/* 100 */
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),
/* 101 */
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Delayable
 *
 * @mixin
 *
 * Changes the open or close delay time for elements
 */

/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend().extend({
  name: 'delayable',
  props: {
    openDelay: {
      type: [Number, String],
      default: 0
    },
    closeDelay: {
      type: [Number, String],
      default: 0
    }
  },
  data: () => ({
    openTimeout: undefined,
    closeTimeout: undefined
  }),
  methods: {
    /**
     * Clear any pending delay timers from executing
     */
    clearDelay() {
      clearTimeout(this.openTimeout);
      clearTimeout(this.closeTimeout);
    },
    /**
     * Runs callback after a specified delay
     */
    runDelay(type, cb) {
      this.clearDelay();
      const delay = parseInt(this[`${type}Delay`], 10);
      this[`${type}Timeout`] = setTimeout(cb || (() => {
        this.isActive = {
          open: true,
          close: false
        }[type];
      }), delay);
    }
  }
}));

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VBtn_VBtn_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(100);
/* harmony import */ var _src_components_VBtn_VBtn_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VBtn_VBtn_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VSheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(76);
/* harmony import */ var _VProgressCircular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(83);
/* harmony import */ var _mixins_groupable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(67);
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(63);
/* harmony import */ var _mixins_elevatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(65);
/* harmony import */ var _mixins_positionable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(56);
/* harmony import */ var _mixins_routable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(66);
/* harmony import */ var _mixins_sizeable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(64);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(13);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1);
// Styles
 // Extensions

 // Components

 // Mixins






 // Utilities




const baseMixins = Object(_util_mixins__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])(_VSheet__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], _mixins_routable__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], _mixins_positionable__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], _mixins_sizeable__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], Object(_mixins_groupable__WEBPACK_IMPORTED_MODULE_3__[/* factory */ "a"])('btnToggle'), Object(_mixins_toggleable__WEBPACK_IMPORTED_MODULE_4__[/* factory */ "b"])('inputValue')
/* @vue/component */);
/* harmony default export */ __webpack_exports__["a"] = (baseMixins.extend().extend({
  name: 'v-btn',
  props: {
    activeClass: {
      type: String,
      default() {
        if (!this.btnToggle) return '';
        return this.btnToggle.activeClass;
      }
    },
    block: Boolean,
    depressed: Boolean,
    fab: Boolean,
    icon: Boolean,
    loading: Boolean,
    outlined: Boolean,
    plain: Boolean,
    retainFocusOnClick: Boolean,
    rounded: Boolean,
    tag: {
      type: String,
      default: 'button'
    },
    text: Boolean,
    tile: Boolean,
    type: {
      type: String,
      default: 'button'
    },
    value: null
  },
  data: () => ({
    proxyClass: 'v-btn--active'
  }),
  computed: {
    classes() {
      return {
        'v-btn': true,
        ..._mixins_routable__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].options.computed.classes.call(this),
        'v-btn--absolute': this.absolute,
        'v-btn--block': this.block,
        'v-btn--bottom': this.bottom,
        'v-btn--disabled': this.disabled,
        'v-btn--is-elevated': this.isElevated,
        'v-btn--fab': this.fab,
        'v-btn--fixed': this.fixed,
        'v-btn--has-bg': this.hasBg,
        'v-btn--icon': this.icon,
        'v-btn--left': this.left,
        'v-btn--loading': this.loading,
        'v-btn--outlined': this.outlined,
        'v-btn--plain': this.plain,
        'v-btn--right': this.right,
        'v-btn--round': this.isRound,
        'v-btn--rounded': this.rounded,
        'v-btn--router': this.to,
        'v-btn--text': this.text,
        'v-btn--tile': this.tile,
        'v-btn--top': this.top,
        ...this.themeClasses,
        ...this.groupClasses,
        ...this.elevationClasses,
        ...this.sizeableClasses
      };
    },
    computedElevation() {
      if (this.disabled) return undefined;
      return _mixins_elevatable__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].options.computed.computedElevation.call(this);
    },
    computedRipple() {
      var _a;
      const defaultRipple = this.icon || this.fab ? {
        circle: true
      } : true;
      if (this.disabled) return false;else return (_a = this.ripple) !== null && _a !== void 0 ? _a : defaultRipple;
    },
    hasBg() {
      return !this.text && !this.plain && !this.outlined && !this.icon;
    },
    isElevated() {
      return Boolean(!this.icon && !this.text && !this.outlined && !this.depressed && !this.disabled && !this.plain && (this.elevation == null || Number(this.elevation) > 0));
    },
    isRound() {
      return Boolean(this.icon || this.fab);
    },
    styles() {
      return {
        ...this.measurableStyles
      };
    }
  },
  created() {
    const breakingProps = [['flat', 'text'], ['outline', 'outlined'], ['round', 'rounded']];
    /* istanbul ignore next */

    breakingProps.forEach(([original, replacement]) => {
      if (this.$attrs.hasOwnProperty(original)) Object(_util_console__WEBPACK_IMPORTED_MODULE_10__[/* breaking */ "a"])(original, replacement, this);
    });
  },
  methods: {
    click(e) {
      // TODO: Remove this in v3
      !this.retainFocusOnClick && !this.fab && e.detail && this.$el.blur();
      this.$emit('click', e);
      this.btnToggle && this.toggle();
    },
    genContent() {
      return this.$createElement('span', {
        staticClass: 'v-btn__content'
      }, Object(_util_helpers__WEBPACK_IMPORTED_MODULE_11__[/* getSlot */ "n"])(this));
    },
    genLoader() {
      return this.$createElement('span', {
        class: 'v-btn__loader'
      }, Object(_util_helpers__WEBPACK_IMPORTED_MODULE_11__[/* getSlot */ "n"])(this, 'loader') || [this.$createElement(_VProgressCircular__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
        props: {
          indeterminate: true,
          size: 23,
          width: 2
        }
      })]);
    }
  },
  render(h) {
    const children = [this.genContent(), this.loading && this.genLoader()];
    const {
      tag,
      data
    } = this.generateRouteLink();
    const setColor = this.hasBg ? this.setBackgroundColor : this.setTextColor;
    if (tag === 'button') {
      data.attrs.type = this.type;
      data.attrs.disabled = this.disabled;
    }
    data.attrs.value = ['string', 'number'].includes(typeof this.value) ? this.value : JSON.stringify(this.value);
    return h(tag, this.disabled ? data : setColor(this.color, data), children);
  }
}));

/***/ }),
/* 104 */,
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);


/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend().extend({
  name: 'stackable',
  data() {
    return {
      stackElement: null,
      stackExclude: null,
      stackMinZIndex: 0,
      isActive: false
    };
  },
  computed: {
    activeZIndex() {
      if (typeof window === 'undefined') return 0;
      const content = this.stackElement || this.$refs.content; // Return current zindex if not active

      const index = !this.isActive ? Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* getZIndex */ "p"])(content) : this.getMaxZIndex(this.stackExclude || [content]) + 2;
      if (index == null) return index; // Return max current z-index (excluding self) + 2
      // (2 to leave room for an overlay below, if needed)

      return parseInt(index);
    }
  },
  methods: {
    getMaxZIndex(exclude = []) {
      const base = this.$el; // Start with lowest allowed z-index or z-index of
      // base component's element, whichever is greater

      const zis = [this.stackMinZIndex, Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* getZIndex */ "p"])(base)]; // Convert the NodeList to an array to
      // prevent an Edge bug with Symbol.iterator
      // https://github.com/vuetifyjs/vuetify/issues/2146

      const activeElements = [...document.getElementsByClassName('v-menu__content--active'), ...document.getElementsByClassName('v-dialog__content--active')]; // Get z-index for all active dialogs

      for (let index = 0; index < activeElements.length; index++) {
        if (!exclude.includes(activeElements[index])) {
          zis.push(Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* getZIndex */ "p"])(activeElements[index]));
        }
      }
      return Math.max(...zis);
    }
  }
}));

/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _bootable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(89);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
// Mixins
 // Utilities




function validateAttachTarget(val) {
  const type = typeof val;
  if (type === 'boolean' || type === 'string') return true;
  return val.nodeType === Node.ELEMENT_NODE;
}
function removeActivator(activator) {
  activator.forEach(node => {
    node.elm && node.elm.parentNode && node.elm.parentNode.removeChild(node.elm);
  });
}
/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_bootable__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]).extend({
  name: 'detachable',
  props: {
    attach: {
      default: false,
      validator: validateAttachTarget
    },
    contentClass: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    activatorNode: null,
    hasDetached: false
  }),
  watch: {
    attach() {
      this.hasDetached = false;
      this.initDetach();
    },
    hasContent() {
      this.$nextTick(this.initDetach);
    }
  },
  beforeMount() {
    this.$nextTick(() => {
      if (this.activatorNode) {
        const activator = Array.isArray(this.activatorNode) ? this.activatorNode : [this.activatorNode];
        activator.forEach(node => {
          if (!node.elm) return;
          if (!this.$el.parentNode) return;
          const target = this.$el === this.$el.parentNode.firstChild ? this.$el : this.$el.nextSibling;
          this.$el.parentNode.insertBefore(node.elm, target);
        });
      }
    });
  },
  mounted() {
    this.hasContent && this.initDetach();
  },
  deactivated() {
    this.isActive = false;
  },
  beforeDestroy() {
    if (this.$refs.content && this.$refs.content.parentNode) {
      this.$refs.content.parentNode.removeChild(this.$refs.content);
    }
  },
  destroyed() {
    if (this.activatorNode) {
      const activator = Array.isArray(this.activatorNode) ? this.activatorNode : [this.activatorNode];
      if (this.$el.isConnected) {
        // Component has been destroyed but the element still exists, we must be in a transition
        // Wait for the transition to finish before cleaning up the detached activator
        const observer = new MutationObserver(list => {
          if (list.some(record => Array.from(record.removedNodes).includes(this.$el))) {
            observer.disconnect();
            removeActivator(activator);
          }
        });
        observer.observe(this.$el.parentNode, {
          subtree: false,
          childList: true
        });
      } else {
        removeActivator(activator);
      }
    }
  },
  methods: {
    getScopeIdAttrs() {
      const scopeId = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* getObjectValueByPath */ "l"])(this.$vnode, 'context.$options._scopeId');
      return scopeId && {
        [scopeId]: ''
      };
    },
    initDetach() {
      if (this._isDestroyed || !this.$refs.content || this.hasDetached ||
      // Leave menu in place if attached
      // and dev has not changed target
      this.attach === '' ||
      // If used as a boolean prop (<v-menu attach>)
      this.attach === true ||
      // If bound to a boolean (<v-menu :attach="true">)
      this.attach === 'attach' // If bound as boolean prop in pug (v-menu(attach))
      ) return;
      let target;
      if (this.attach === false) {
        // Default, detach to app
        target = document.querySelector('[data-app]');
      } else if (typeof this.attach === 'string') {
        // CSS selector
        target = document.querySelector(this.attach);
      } else {
        // DOM Element
        target = this.attach;
      }
      if (!target) {
        Object(_util_console__WEBPACK_IMPORTED_MODULE_3__[/* consoleWarn */ "c"])(`Unable to locate target ${this.attach || '[data-app]'}`, this);
        return;
      }
      target.appendChild(this.$refs.content);
      this.hasDetached = true;
    }
  }
}));

/***/ }),
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ClickOutside */
/* harmony import */ var _util_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81);

function defaultConditional() {
  return true;
}
function checkEvent(e, el, binding) {
  // The include element callbacks below can be expensive
  // so we should avoid calling them when we're not active.
  // Explicitly check for false to allow fallback compatibility
  // with non-toggleable components
  if (!e || checkIsActive(e, binding) === false) return false; // If we're clicking inside the shadowroot, then the app root doesn't get the same
  // level of introspection as to _what_ we're clicking. We want to check to see if
  // our target is the shadowroot parent container, and if it is, ignore.

  const root = Object(_util_dom__WEBPACK_IMPORTED_MODULE_0__[/* attachedRoot */ "a"])(el);
  if (typeof ShadowRoot !== 'undefined' && root instanceof ShadowRoot && root.host === e.target) return false; // Check if additional elements were passed to be included in check
  // (click must be outside all included elements, if any)

  const elements = (typeof binding.value === 'object' && binding.value.include || (() => []))(); // Add the root element for the component this directive was defined on

  elements.push(el); // Check if it's a click outside our elements, and then if our callback returns true.
  // Non-toggleable components should take action in their callback and return falsy.
  // Toggleable can return true if it wants to deactivate.
  // Note that, because we're in the capture phase, this callback will occur before
  // the bubbling click event on any outside elements.

  return !elements.some(el => el.contains(e.target));
}
function checkIsActive(e, binding) {
  const isActive = typeof binding.value === 'object' && binding.value.closeConditional || defaultConditional;
  return isActive(e);
}
function directive(e, el, binding) {
  const handler = typeof binding.value === 'function' ? binding.value : binding.value.handler;
  el._clickOutside.lastMousedownWasOutside && checkEvent(e, el, binding) && setTimeout(() => {
    checkIsActive(e, binding) && handler && handler(e);
  }, 0);
}
function handleShadow(el, callback) {
  const root = Object(_util_dom__WEBPACK_IMPORTED_MODULE_0__[/* attachedRoot */ "a"])(el);
  callback(document);
  if (typeof ShadowRoot !== 'undefined' && root instanceof ShadowRoot) {
    callback(root);
  }
}
const ClickOutside = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  inserted(el, binding, vnode) {
    const onClick = e => directive(e, el, binding);
    const onMousedown = e => {
      el._clickOutside.lastMousedownWasOutside = checkEvent(e, el, binding);
    };
    handleShadow(el, app => {
      app.addEventListener('click', onClick, true);
      app.addEventListener('mousedown', onMousedown, true);
    });
    if (!el._clickOutside) {
      el._clickOutside = {
        lastMousedownWasOutside: true
      };
    }
    el._clickOutside[vnode.context._uid] = {
      onClick,
      onMousedown
    };
  },
  unbind(el, binding, vnode) {
    if (!el._clickOutside) return;
    handleShadow(el, app => {
      var _a;
      if (!app || !((_a = el._clickOutside) === null || _a === void 0 ? void 0 : _a[vnode.context._uid])) return;
      const {
        onClick,
        onMousedown
      } = el._clickOutside[vnode.context._uid];
      app.removeEventListener('click', onClick, true);
      app.removeEventListener('mousedown', onMousedown, true);
    });
    delete el._clickOutside[vnode.context._uid];
  }
};
/* harmony default export */ __webpack_exports__["a"] = (ClickOutside);

/***/ }),
/* 111 */,
/* 112 */
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),
/* 113 */,
/* 114 */
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VDivider_VDivider_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(101);
/* harmony import */ var _src_components_VDivider_VDivider_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VDivider_VDivider_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
// Styles
 // Mixins


/* harmony default export */ __webpack_exports__["a"] = (_mixins_themeable__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].extend({
  name: 'v-divider',
  props: {
    inset: Boolean,
    vertical: Boolean
  },
  render(h) {
    // WAI-ARIA attributes
    let orientation;
    if (!this.$attrs.role || this.$attrs.role === 'separator') {
      orientation = this.vertical ? 'vertical' : 'horizontal';
    }
    return h('hr', {
      class: {
        'v-divider': true,
        'v-divider--inset': this.inset,
        'v-divider--vertical': this.vertical,
        ...this.themeClasses
      },
      attrs: {
        role: 'separator',
        'aria-orientation': orientation,
        ...this.$attrs
      },
      on: this.$listeners
    });
  }
}));

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
  name: 'returnable',
  props: {
    returnValue: null
  },
  data: () => ({
    isActive: false,
    originalValue: null
  }),
  watch: {
    isActive(val) {
      if (val) {
        this.originalValue = this.returnValue;
      } else {
        this.$emit('update:return-value', this.originalValue);
      }
    }
  },
  methods: {
    save(value) {
      this.originalValue = value;
      setTimeout(() => {
        this.isActive = false;
      });
    }
  }
}));

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _stackable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(105);
/* harmony import */ var _positionable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(56);
/* harmony import */ var _activatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(90);
/* harmony import */ var _detachable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(106);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);
// Mixins



 // Utilities



const baseMixins = Object(_util_mixins__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(_stackable__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"], Object(_positionable__WEBPACK_IMPORTED_MODULE_1__[/* factory */ "b"])(['top', 'right', 'bottom', 'left', 'absolute']), _activatable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _detachable__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]);
/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (baseMixins.extend().extend({
  name: 'menuable',
  props: {
    allowOverflow: Boolean,
    light: Boolean,
    dark: Boolean,
    maxWidth: {
      type: [Number, String],
      default: 'auto'
    },
    minWidth: [Number, String],
    nudgeBottom: {
      type: [Number, String],
      default: 0
    },
    nudgeLeft: {
      type: [Number, String],
      default: 0
    },
    nudgeRight: {
      type: [Number, String],
      default: 0
    },
    nudgeTop: {
      type: [Number, String],
      default: 0
    },
    nudgeWidth: {
      type: [Number, String],
      default: 0
    },
    offsetOverflow: Boolean,
    positionX: {
      type: Number,
      default: null
    },
    positionY: {
      type: Number,
      default: null
    },
    zIndex: {
      type: [Number, String],
      default: null
    }
  },
  data: () => ({
    activatorNode: [],
    absoluteX: 0,
    absoluteY: 0,
    activatedBy: null,
    activatorFixed: false,
    dimensions: {
      activator: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: 0,
        height: 0,
        offsetTop: 0,
        scrollHeight: 0,
        offsetLeft: 0
      },
      content: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: 0,
        height: 0,
        offsetTop: 0,
        scrollHeight: 0
      }
    },
    relativeYOffset: 0,
    hasJustFocused: false,
    hasWindow: false,
    inputActivator: false,
    isContentActive: false,
    pageWidth: 0,
    pageYOffset: 0,
    stackClass: 'v-menu__content--active',
    stackMinZIndex: 6
  }),
  computed: {
    computedLeft() {
      const a = this.dimensions.activator;
      const c = this.dimensions.content;
      const activatorLeft = (this.attach !== false ? a.offsetLeft : a.left) || 0;
      const minWidth = Math.max(a.width, c.width);
      let left = 0;
      left += activatorLeft;
      if (this.left || this.$vuetify.rtl && !this.right) left -= minWidth - a.width;
      if (this.offsetX) {
        const maxWidth = isNaN(Number(this.maxWidth)) ? a.width : Math.min(a.width, Number(this.maxWidth));
        left += this.left ? -maxWidth : a.width;
      }
      if (this.nudgeLeft) left -= parseInt(this.nudgeLeft);
      if (this.nudgeRight) left += parseInt(this.nudgeRight);
      return left;
    },
    computedTop() {
      const a = this.dimensions.activator;
      const c = this.dimensions.content;
      let top = 0;
      if (this.top) top += a.height - c.height;
      if (this.attach !== false) top += a.offsetTop;else top += a.top + this.pageYOffset;
      if (this.offsetY) top += this.top ? -a.height : a.height;
      if (this.nudgeTop) top -= parseInt(this.nudgeTop);
      if (this.nudgeBottom) top += parseInt(this.nudgeBottom);
      return top;
    },
    hasActivator() {
      return !!this.$slots.activator || !!this.$scopedSlots.activator || !!this.activator || !!this.inputActivator;
    },
    absoluteYOffset() {
      return this.pageYOffset - this.relativeYOffset;
    }
  },
  watch: {
    disabled(val) {
      val && this.callDeactivate();
    },
    isActive(val) {
      if (this.disabled) return;
      val ? this.callActivate() : this.callDeactivate();
    },
    positionX: 'updateDimensions',
    positionY: 'updateDimensions'
  },
  beforeMount() {
    this.hasWindow = typeof window !== 'undefined';
    if (this.hasWindow) {
      window.addEventListener('resize', this.updateDimensions, false);
    }
  },
  beforeDestroy() {
    if (this.hasWindow) {
      window.removeEventListener('resize', this.updateDimensions, false);
    }
  },
  methods: {
    absolutePosition() {
      return {
        offsetTop: this.positionY || this.absoluteY,
        offsetLeft: this.positionX || this.absoluteX,
        scrollHeight: 0,
        top: this.positionY || this.absoluteY,
        bottom: this.positionY || this.absoluteY,
        left: this.positionX || this.absoluteX,
        right: this.positionX || this.absoluteX,
        height: 0,
        width: 0
      };
    },
    activate() {},
    calcLeft(menuWidth) {
      return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_5__[/* convertToUnit */ "g"])(this.attach !== false ? this.computedLeft : this.calcXOverflow(this.computedLeft, menuWidth));
    },
    calcTop() {
      return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_5__[/* convertToUnit */ "g"])(this.attach !== false ? this.computedTop : this.calcYOverflow(this.computedTop));
    },
    calcXOverflow(left, menuWidth) {
      const xOverflow = left + menuWidth - this.pageWidth + 12;
      if ((!this.left || this.right) && xOverflow > 0) {
        left = Math.max(left - xOverflow, 0);
      } else {
        left = Math.max(left, 12);
      }
      return left + this.getOffsetLeft();
    },
    calcYOverflow(top) {
      const documentHeight = this.getInnerHeight();
      const toTop = this.absoluteYOffset + documentHeight;
      const activator = this.dimensions.activator;
      const contentHeight = this.dimensions.content.height;
      const totalHeight = top + contentHeight;
      const isOverflowing = toTop < totalHeight; // If overflowing bottom and offset
      // TODO: set 'bottom' position instead of 'top'

      if (isOverflowing && this.offsetOverflow &&
      // If we don't have enough room to offset
      // the overflow, don't offset
      activator.top > contentHeight) {
        top = this.pageYOffset + (activator.top - contentHeight); // If overflowing bottom
      } else if (isOverflowing && !this.allowOverflow) {
        top = toTop - contentHeight - 12; // If overflowing top
      } else if (top < this.absoluteYOffset && !this.allowOverflow) {
        top = this.absoluteYOffset + 12;
      }
      return top < 12 ? 12 : top;
    },
    callActivate() {
      if (!this.hasWindow) return;
      this.activate();
    },
    callDeactivate() {
      this.isContentActive = false;
      this.deactivate();
    },
    checkForPageYOffset() {
      if (this.hasWindow) {
        this.pageYOffset = this.activatorFixed ? 0 : this.getOffsetTop();
      }
    },
    checkActivatorFixed() {
      if (this.attach !== false) {
        this.activatorFixed = false;
        return;
      }
      let el = this.getActivator();
      while (el) {
        if (window.getComputedStyle(el).position === 'fixed') {
          this.activatorFixed = true;
          return;
        }
        el = el.offsetParent;
      }
      this.activatorFixed = false;
    },
    deactivate() {},
    genActivatorListeners() {
      const listeners = _activatable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].options.methods.genActivatorListeners.call(this);
      const onClick = listeners.click;
      if (onClick) {
        listeners.click = e => {
          if (this.openOnClick) {
            onClick && onClick(e);
          }
          this.absoluteX = e.clientX;
          this.absoluteY = e.clientY;
        };
      }
      return listeners;
    },
    getInnerHeight() {
      if (!this.hasWindow) return 0;
      return window.innerHeight || document.documentElement.clientHeight;
    },
    getOffsetLeft() {
      if (!this.hasWindow) return 0;
      return window.pageXOffset || document.documentElement.scrollLeft;
    },
    getOffsetTop() {
      if (!this.hasWindow) return 0;
      return window.pageYOffset || document.documentElement.scrollTop;
    },
    getRoundedBoundedClientRect(el) {
      const rect = el.getBoundingClientRect();
      return {
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        bottom: Math.round(rect.bottom),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      };
    },
    measure(el) {
      if (!el || !this.hasWindow) return null;
      const rect = this.getRoundedBoundedClientRect(el); // Account for activator margin

      if (this.attach !== false) {
        const style = window.getComputedStyle(el);
        rect.left = parseInt(style.marginLeft);
        rect.top = parseInt(style.marginTop);
      }
      return rect;
    },
    sneakPeek(cb) {
      requestAnimationFrame(() => {
        const el = this.$refs.content;
        if (!el || el.style.display !== 'none') {
          cb();
          return;
        }
        el.style.display = 'inline-block';
        cb();
        el.style.display = 'none';
      });
    },
    startTransition() {
      return new Promise(resolve => requestAnimationFrame(() => {
        this.isContentActive = this.hasJustFocused = this.isActive;
        resolve();
      }));
    },
    updateDimensions() {
      this.hasWindow = typeof window !== 'undefined';
      this.checkActivatorFixed();
      this.checkForPageYOffset();
      this.pageWidth = document.documentElement.clientWidth;
      const dimensions = {
        activator: {
          ...this.dimensions.activator
        },
        content: {
          ...this.dimensions.content
        }
      }; // Activator should already be shown

      if (!this.hasActivator || this.absolute) {
        dimensions.activator = this.absolutePosition();
      } else {
        const activator = this.getActivator();
        if (!activator) return;
        dimensions.activator = this.measure(activator);
        dimensions.activator.offsetLeft = activator.offsetLeft;
        if (this.attach !== false) {
          // account for css padding causing things to not line up
          // this is mostly for v-autocomplete, hopefully it won't break anything
          dimensions.activator.offsetTop = activator.offsetTop;
        } else {
          dimensions.activator.offsetTop = 0;
        }
      } // Display and hide to get dimensions

      this.sneakPeek(() => {
        if (this.$refs.content) {
          if (this.$refs.content.offsetParent) {
            const offsetRect = this.getRoundedBoundedClientRect(this.$refs.content.offsetParent);
            this.relativeYOffset = window.pageYOffset + offsetRect.top;
            dimensions.activator.top -= this.relativeYOffset;
            dimensions.activator.left -= window.pageXOffset + offsetRect.left;
          }
          dimensions.content = this.measure(this.$refs.content);
        }
        this.dimensions = dimensions;
      });
    }
  }
}));

/***/ }),
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),
/* 123 */,
/* 124 */
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),
/* 125 */
/***/ (function(module, exports) {

// Exports
module.exports = {

};


/***/ }),
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(103);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(96);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var components_VCard = __webpack_require__(55);

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VDialog/VDialog.sass
var VDialog = __webpack_require__(124);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VThemeProvider/VThemeProvider.js
var VThemeProvider = __webpack_require__(148);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/activatable/index.js
var activatable = __webpack_require__(90);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/dependent/index.js
var dependent = __webpack_require__(97);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/detachable/index.js
var detachable = __webpack_require__(106);

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VOverlay/VOverlay.sass
var VOverlay = __webpack_require__(125);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/colorable/index.js
var colorable = __webpack_require__(49);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/themeable/index.js
var themeable = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/toggleable/index.js
var toggleable = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/mixins.js
var mixins = __webpack_require__(13);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/helpers.js
var helpers = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VOverlay/VOverlay.js
// Styles
 // Mixins



 // Utilities



/* @vue/component */

/* harmony default export */ var VOverlay_VOverlay = (Object(mixins["a" /* default */])(colorable["a" /* default */], themeable["a" /* default */], toggleable["a" /* default */]).extend({
  name: 'v-overlay',
  props: {
    absolute: Boolean,
    color: {
      type: String,
      default: '#212121'
    },
    dark: {
      type: Boolean,
      default: true
    },
    opacity: {
      type: [Number, String],
      default: 0.46
    },
    value: {
      default: true
    },
    zIndex: {
      type: [Number, String],
      default: 5
    }
  },
  computed: {
    __scrim() {
      const data = this.setBackgroundColor(this.color, {
        staticClass: 'v-overlay__scrim',
        style: {
          opacity: this.computedOpacity
        }
      });
      return this.$createElement('div', data);
    },
    classes() {
      return {
        'v-overlay--absolute': this.absolute,
        'v-overlay--active': this.isActive,
        ...this.themeClasses
      };
    },
    computedOpacity() {
      return Number(this.isActive ? this.opacity : 0);
    },
    styles() {
      return {
        zIndex: this.zIndex
      };
    }
  },
  methods: {
    genContent() {
      return this.$createElement('div', {
        staticClass: 'v-overlay__content'
      }, Object(helpers["n" /* getSlot */])(this));
    }
  },
  render(h) {
    const children = [this.__scrim];
    if (this.isActive) children.push(this.genContent());
    return h('div', {
      staticClass: 'v-overlay',
      on: this.$listeners,
      class: this.classes,
      style: this.styles
    }, children);
  }
}));
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VOverlay/index.js


/* harmony default export */ var components_VOverlay = (VOverlay_VOverlay);
// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(0);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/overlayable/index.js
// Components
 // Utilities

 // Types


/* @vue/component */

/* harmony default export */ var overlayable = (external_vue_default.a.extend().extend({
  name: 'overlayable',
  props: {
    hideOverlay: Boolean,
    overlayColor: String,
    overlayOpacity: [Number, String]
  },
  data() {
    return {
      animationFrame: 0,
      overlay: null
    };
  },
  watch: {
    hideOverlay(value) {
      if (!this.isActive) return;
      if (value) this.removeOverlay();else this.genOverlay();
    }
  },
  beforeDestroy() {
    this.removeOverlay();
  },
  methods: {
    createOverlay() {
      const overlay = new components_VOverlay({
        propsData: {
          absolute: this.absolute,
          value: false,
          color: this.overlayColor,
          opacity: this.overlayOpacity
        }
      });
      overlay.$mount();
      const parent = this.absolute ? this.$el.parentNode : document.querySelector('[data-app]');
      parent && parent.insertBefore(overlay.$el, parent.firstChild);
      this.overlay = overlay;
    },
    genOverlay() {
      this.hideScroll();
      if (this.hideOverlay) return;
      if (!this.overlay) this.createOverlay();
      this.animationFrame = requestAnimationFrame(() => {
        if (!this.overlay) return;
        if (this.activeZIndex !== undefined) {
          this.overlay.zIndex = String(this.activeZIndex - 1);
        } else if (this.$el) {
          this.overlay.zIndex = Object(helpers["p" /* getZIndex */])(this.$el);
        }
        this.overlay.value = true;
      });
      return true;
    },
    /** removeOverlay(false) will not restore the scollbar afterwards */
    removeOverlay(showScroll = true) {
      if (this.overlay) {
        Object(helpers["a" /* addOnceEventListener */])(this.overlay.$el, 'transitionend', () => {
          if (!this.overlay || !this.overlay.$el || !this.overlay.$el.parentNode || this.overlay.value || this.isActive) return;
          this.overlay.$el.parentNode.removeChild(this.overlay.$el);
          this.overlay.$destroy();
          this.overlay = null;
        }); // Cancel animation frame in case
        // overlay is removed before it
        // has finished its animation

        cancelAnimationFrame(this.animationFrame);
        this.overlay.value = false;
      }
      showScroll && this.showScroll();
    },
    scrollListener(e) {
      if ('key' in e) {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) ||
        // https://github.com/vuetifyjs/vuetify/issues/4715
        e.target.isContentEditable) return;
        const up = [helpers["r" /* keyCodes */].up, helpers["r" /* keyCodes */].pageup];
        const down = [helpers["r" /* keyCodes */].down, helpers["r" /* keyCodes */].pagedown];
        if (up.includes(e.keyCode)) {
          e.deltaY = -1;
        } else if (down.includes(e.keyCode)) {
          e.deltaY = 1;
        } else {
          return;
        }
      }
      if (e.target === this.overlay || e.type !== 'keydown' && e.target === document.body || this.checkPath(e)) e.preventDefault();
    },
    hasScrollbar(el) {
      if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
      const style = window.getComputedStyle(el);
      return (['auto', 'scroll'].includes(style.overflowY) || el.tagName === 'SELECT') && el.scrollHeight > el.clientHeight || ['auto', 'scroll'].includes(style.overflowX) && el.scrollWidth > el.clientWidth;
    },
    shouldScroll(el, e) {
      if (el.hasAttribute('data-app')) return false;
      const dir = e.shiftKey || e.deltaX ? 'x' : 'y';
      const delta = dir === 'y' ? e.deltaY : e.deltaX || e.deltaY;
      let alreadyAtStart;
      let alreadyAtEnd;
      if (dir === 'y') {
        alreadyAtStart = el.scrollTop === 0;
        alreadyAtEnd = el.scrollTop + el.clientHeight === el.scrollHeight;
      } else {
        alreadyAtStart = el.scrollLeft === 0;
        alreadyAtEnd = el.scrollLeft + el.clientWidth === el.scrollWidth;
      }
      const scrollingUp = delta < 0;
      const scrollingDown = delta > 0;
      if (!alreadyAtStart && scrollingUp) return true;
      if (!alreadyAtEnd && scrollingDown) return true;
      if ((alreadyAtStart || alreadyAtEnd) && el.parentNode) {
        return this.shouldScroll(el.parentNode, e);
      }
      return false;
    },
    isInside(el, parent) {
      if (el === parent) {
        return true;
      } else if (el === null || el === document.body) {
        return false;
      } else {
        return this.isInside(el.parentNode, parent);
      }
    },
    checkPath(e) {
      const path = Object(helpers["f" /* composedPath */])(e);
      if (e.type === 'keydown' && path[0] === document.body) {
        const dialog = this.$refs.dialog; // getSelection returns null in firefox in some edge cases, can be ignored

        const selected = window.getSelection().anchorNode;
        if (dialog && this.hasScrollbar(dialog) && this.isInside(selected, dialog)) {
          return !this.shouldScroll(dialog, e);
        }
        return true;
      }
      for (let index = 0; index < path.length; index++) {
        const el = path[index];
        if (el === document) return true;
        if (el === document.documentElement) return true;
        if (el === this.$refs.content) return true;
        if (this.hasScrollbar(el)) return !this.shouldScroll(el, e);
      }
      return true;
    },
    hideScroll() {
      if (this.$vuetify.breakpoint.smAndDown) {
        document.documentElement.classList.add('overflow-y-hidden');
      } else {
        Object(helpers["b" /* addPassiveEventListener */])(window, 'wheel', this.scrollListener, {
          passive: false
        });
        window.addEventListener('keydown', this.scrollListener);
      }
    },
    showScroll() {
      document.documentElement.classList.remove('overflow-y-hidden');
      window.removeEventListener('wheel', this.scrollListener);
      window.removeEventListener('keydown', this.scrollListener);
    }
  }
}));
// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/returnable/index.js
var returnable = __webpack_require__(116);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/stackable/index.js
var stackable = __webpack_require__(105);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/directives/click-outside/index.js
var click_outside = __webpack_require__(110);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/console.js
var console = __webpack_require__(4);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VDialog/VDialog.js
// Styles
 // Components

 // Mixins






 // Directives

 // Helpers




const baseMixins = Object(mixins["a" /* default */])(dependent["a" /* default */], detachable["a" /* default */], overlayable, returnable["a" /* default */], stackable["a" /* default */], activatable["a" /* default */]);
/* @vue/component */

/* harmony default export */ var VDialog_VDialog = (baseMixins.extend({
  name: 'v-dialog',
  directives: {
    ClickOutside: click_outside["a" /* default */]
  },
  props: {
    dark: Boolean,
    disabled: Boolean,
    fullscreen: Boolean,
    light: Boolean,
    maxWidth: [String, Number],
    noClickAnimation: Boolean,
    origin: {
      type: String,
      default: 'center center'
    },
    persistent: Boolean,
    retainFocus: {
      type: Boolean,
      default: true
    },
    scrollable: Boolean,
    transition: {
      type: [String, Boolean],
      default: 'dialog-transition'
    },
    width: [String, Number]
  },
  data() {
    return {
      activatedBy: null,
      animate: false,
      animateTimeout: -1,
      stackMinZIndex: 200,
      previousActiveElement: null
    };
  },
  computed: {
    classes() {
      return {
        [`v-dialog ${this.contentClass}`.trim()]: true,
        'v-dialog--active': this.isActive,
        'v-dialog--persistent': this.persistent,
        'v-dialog--fullscreen': this.fullscreen,
        'v-dialog--scrollable': this.scrollable,
        'v-dialog--animated': this.animate
      };
    },
    contentClasses() {
      return {
        'v-dialog__content': true,
        'v-dialog__content--active': this.isActive
      };
    },
    hasActivator() {
      return Boolean(!!this.$slots.activator || !!this.$scopedSlots.activator);
    }
  },
  watch: {
    isActive(val) {
      var _a;
      if (val) {
        this.show();
        this.hideScroll();
      } else {
        this.removeOverlay();
        this.unbind();
        (_a = this.previousActiveElement) === null || _a === void 0 ? void 0 : _a.focus();
      }
    },
    fullscreen(val) {
      if (!this.isActive) return;
      if (val) {
        this.hideScroll();
        this.removeOverlay(false);
      } else {
        this.showScroll();
        this.genOverlay();
      }
    }
  },
  created() {
    /* istanbul ignore next */
    if (this.$attrs.hasOwnProperty('full-width')) {
      Object(console["e" /* removed */])('full-width', this);
    }
  },
  beforeMount() {
    this.$nextTick(() => {
      this.isBooted = this.isActive;
      this.isActive && this.show();
    });
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') this.unbind();
  },
  methods: {
    animateClick() {
      this.animate = false; // Needed for when clicking very fast
      // outside of the dialog

      this.$nextTick(() => {
        this.animate = true;
        window.clearTimeout(this.animateTimeout);
        this.animateTimeout = window.setTimeout(() => this.animate = false, 150);
      });
    },
    closeConditional(e) {
      const target = e.target; // Ignore the click if the dialog is closed or destroyed,
      // if it was on an element inside the content,
      // if it was dragged onto the overlay (#6969),
      // or if this isn't the topmost dialog (#9907)

      return !(this._isDestroyed || !this.isActive || this.$refs.content.contains(target) || this.overlay && target && !this.overlay.$el.contains(target)) && this.activeZIndex >= this.getMaxZIndex();
    },
    hideScroll() {
      if (this.fullscreen) {
        document.documentElement.classList.add('overflow-y-hidden');
      } else {
        overlayable.options.methods.hideScroll.call(this);
      }
    },
    show() {
      !this.fullscreen && !this.hideOverlay && this.genOverlay(); // Double nextTick to wait for lazy content to be generated

      this.$nextTick(() => {
        this.$nextTick(() => {
          var _a, _b;
          if (!((_a = this.$refs.dialog) === null || _a === void 0 ? void 0 : _a.contains(document.activeElement))) {
            this.previousActiveElement = document.activeElement;
            (_b = this.$refs.dialog) === null || _b === void 0 ? void 0 : _b.focus();
          }
          this.bind();
        });
      });
    },
    bind() {
      window.addEventListener('focusin', this.onFocusin);
    },
    unbind() {
      window.removeEventListener('focusin', this.onFocusin);
    },
    onClickOutside(e) {
      this.$emit('click:outside', e);
      if (this.persistent) {
        this.noClickAnimation || this.animateClick();
      } else {
        this.isActive = false;
      }
    },
    onKeydown(e) {
      if (e.keyCode === helpers["r" /* keyCodes */].esc && !this.getOpenDependents().length) {
        if (!this.persistent) {
          this.isActive = false;
          const activator = this.getActivator();
          this.$nextTick(() => activator && activator.focus());
        } else if (!this.noClickAnimation) {
          this.animateClick();
        }
      }
      this.$emit('keydown', e);
    },
    // On focus change, wrap focus to stay inside the dialog
    // https://github.com/vuetifyjs/vuetify/issues/6892
    onFocusin(e) {
      if (!e || !this.retainFocus) return;
      const target = e.target;
      if (!!target && this.$refs.dialog &&
      // It isn't the document or the dialog body
      ![document, this.$refs.dialog].includes(target) &&
      // It isn't inside the dialog body
      !this.$refs.dialog.contains(target) &&
      // We're the topmost dialog
      this.activeZIndex >= this.getMaxZIndex() &&
      // It isn't inside a dependent element (like a menu)
      !this.getOpenDependentElements().some(el => el.contains(target)) // So we must have focused something outside the dialog and its children
      ) {
        // Find and focus the first available element inside the dialog
        const focusable = this.$refs.dialog.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])');
        const el = [...focusable].find(el => !el.hasAttribute('disabled') && !el.matches('[tabindex="-1"]'));
        el && el.focus();
      }
    },
    genContent() {
      return this.showLazyContent(() => [this.$createElement(VThemeProvider["a" /* default */], {
        props: {
          root: true,
          light: this.light,
          dark: this.dark
        }
      }, [this.$createElement('div', {
        class: this.contentClasses,
        attrs: {
          role: 'dialog',
          'aria-modal': this.hideOverlay ? undefined : 'true',
          ...this.getScopeIdAttrs()
        },
        on: {
          keydown: this.onKeydown
        },
        style: {
          zIndex: this.activeZIndex
        },
        ref: 'content'
      }, [this.genTransition()])])]);
    },
    genTransition() {
      const content = this.genInnerContent();
      if (!this.transition) return content;
      return this.$createElement('transition', {
        props: {
          name: this.transition,
          origin: this.origin,
          appear: true
        }
      }, [content]);
    },
    genInnerContent() {
      const data = {
        class: this.classes,
        attrs: {
          tabindex: this.isActive ? 0 : undefined
        },
        ref: 'dialog',
        directives: [{
          name: 'click-outside',
          value: {
            handler: this.onClickOutside,
            closeConditional: this.closeConditional,
            include: this.getOpenDependentElements
          }
        }, {
          name: 'show',
          value: this.isActive
        }],
        style: {
          transformOrigin: this.origin
        }
      };
      if (!this.fullscreen) {
        data.style = {
          ...data.style,
          maxWidth: Object(helpers["g" /* convertToUnit */])(this.maxWidth),
          width: Object(helpers["g" /* convertToUnit */])(this.width)
        };
      }
      return this.$createElement('div', data, this.getContentSlot());
    }
  },
  render(h) {
    return h('div', {
      staticClass: 'v-dialog__container',
      class: {
        'v-dialog__container--attached': this.attach === '' || this.attach === true || this.attach === 'attach'
      }
    }, [this.genActivator(), this.genContent()]);
  }
}));
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDivider/VDivider.js
var VDivider = __webpack_require__(115);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon = __webpack_require__(68);

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VGrid/_grid.sass
var _grid = __webpack_require__(114);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VGrid/VSpacer.js


/* harmony default export */ var VSpacer = (Object(helpers["h" /* createSimpleFunctional */])('spacer', 'div', 'v-spacer'));
// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VTooltip/VTooltip.js
var VTooltip = __webpack_require__(150);

// CONCATENATED MODULE: ./node_modules/vuetify-loader/lib/loader.js??ref--4!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/CitationList.vue?vue&type=template&id=5c1e2530











var CitationListvue_type_template_id_5c1e2530_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c(VDialog_VDialog, {
    attrs: {
      "width": "500"
    },
    scopedSlots: _vm._u([{
      key: "activator",
      fn: function ({
        on,
        attrs
      }) {
        return [_c(VBtn["a" /* default */], _vm._g(_vm._b({
          directives: [{
            name: "show",
            rawName: "v-show",
            value: _vm.state.citationList.length > 0,
            expression: "state.citationList.length > 0"
          }],
          staticClass: "ml-auto mb-0",
          staticStyle: {
            "transition": "all 200ms"
          },
          attrs: {
            "elevation": "0",
            "color": _vm.color
          }
        }, 'v-btn', attrs, false), on), [_vm._v("\n            Open List\n        ")])];
      }
    }]),
    model: {
      value: _vm.dialog,
      callback: function ($$v) {
        _vm.dialog = $$v;
      },
      expression: "dialog"
    }
  }, [_vm._v(" "), _c(VCard["a" /* default */], [_c(components_VCard["d" /* VCardTitle */], {
    staticClass: "text-h5"
  }, [_vm._v("\n            Citations List\n        ")]), _vm._v(" "), _c(VDivider["a" /* default */]), _vm._v(" "), _c(components_VCard["c" /* VCardText */], {
    ref: "citationList",
    staticClass: "mt-4"
  }, _vm._l(_vm.state.citationList, function (citation, idx) {
    return _c(VCard["a" /* default */], {
      key: idx,
      attrs: {
        "elevation": "0"
      }
    }, [_c('div', {
      staticClass: "d-flex flex-row flex-nowrap mt-2",
      staticStyle: {
        "align-items": "center",
        "overflow": "hidden"
      }
    }, [_c(components_VCard["c" /* VCardText */], [_c('span', {
      ref: "citationItem",
      refInFor: true,
      domProps: {
        "innerHTML": _vm._s(citation)
      }
    })]), _vm._v(" "), _c(VTooltip["a" /* default */], {
      attrs: {
        "bottom": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function ({
          on,
          attrs
        }) {
          return [_c(VBtn["a" /* default */], _vm._g(_vm._b({
            staticClass: "mt-1",
            attrs: {
              "icon": "",
              "elevation": "0"
            },
            on: {
              "click": function ($event) {
                return _vm.copyCitation(idx);
              }
            }
          }, 'v-btn', attrs, false), on), [_c(VIcon["a" /* default */], [_vm._v("mdi-content-copy")])], 1)];
        }
      }], null, true)
    }, [_vm._v(" "), _c('span', [_vm._v("Copy Citation")])]), _vm._v(" "), _c(VTooltip["a" /* default */], {
      attrs: {
        "bottom": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function ({
          on,
          attrs
        }) {
          return [_c(VBtn["a" /* default */], _vm._g(_vm._b({
            staticClass: "mt-1",
            attrs: {
              "icon": "",
              "elevation": "0"
            },
            on: {
              "click": function ($event) {
                return _vm.deleteCitation(idx);
              }
            }
          }, 'v-btn', attrs, false), on), [_c(VIcon["a" /* default */], [_vm._v("mdi-delete")])], 1)];
        }
      }], null, true)
    }, [_vm._v(" "), _c('span', [_vm._v("Copy Citation")])])], 1)]);
  }), 1), _vm._v(" "), _c(VDivider["a" /* default */]), _vm._v(" "), _c(components_VCard["a" /* VCardActions */], [_c(VSpacer), _vm._v(" "), _c(VBtn["a" /* default */], {
    attrs: {
      "color": "primary",
      "text": ""
    },
    on: {
      "click": _vm.copyAll
    }
  }, [_vm._v("\n                Copy All\n            ")]), _vm._v(" "), _c(VBtn["a" /* default */], {
    attrs: {
      "text": ""
    },
    on: {
      "click": function ($event) {
        _vm.dialog = false;
      }
    }
  }, [_vm._v("\n                Close\n            ")])], 1)], 1)], 1);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./components/CitationList.vue?vue&type=template&id=5c1e2530

// EXTERNAL MODULE: ./state/index.js
var state = __webpack_require__(62);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/CitationList.vue?vue&type=script&lang=js

/* harmony default export */ var CitationListvue_type_script_lang_js = ({
  props: {
    color: String
  },
  computed: {
    state() {
      return state["a" /* default */];
    }
  },
  methods: {
    copyCitation(idx) {
      let range = document.createRange();
      range.selectNode(this.$refs.citationItem[idx]);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
    },
    copyAll() {
      let range = document.createRange();
      range.selectNode(this.$refs.citationList);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
    },
    deleteCitation(idx) {
      state["a" /* default */].citationList.splice(idx, 1);
    }
  },
  data() {
    return {
      dialog: false
    };
  }
});
// CONCATENATED MODULE: ./components/CitationList.vue?vue&type=script&lang=js
 /* harmony default export */ var components_CitationListvue_type_script_lang_js = (CitationListvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(7);

// CONCATENATED MODULE: ./components/CitationList.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_CitationListvue_type_script_lang_js,
  CitationListvue_type_template_id_5c1e2530_render,
  staticRenderFns,
  false,
  null,
  null,
  "202f9f52"
  
)

/* harmony default export */ var CitationList = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
// Mixins

/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (_mixins_themeable__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].extend({
  name: 'v-theme-provider',
  props: {
    root: Boolean
  },
  computed: {
    isDark() {
      return this.root ? this.rootIsDark : _mixins_themeable__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].options.computed.isDark.call(this);
    }
  },
  render() {
    /* istanbul ignore next */
    return this.$slots.default && this.$slots.default.find(node => !node.isComment && node.text !== ' ');
  }
}));

/***/ }),
/* 149 */,
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VTooltip_VTooltip_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(122);
/* harmony import */ var _src_components_VTooltip_VTooltip_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VTooltip_VTooltip_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_activatable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(90);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(49);
/* harmony import */ var _mixins_delayable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(102);
/* harmony import */ var _mixins_dependent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(97);
/* harmony import */ var _mixins_menuable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(117);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
 // Mixins





 // Helpers




/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(_mixins_colorable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _mixins_delayable__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _mixins_dependent__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], _mixins_menuable__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]).extend({
  name: 'v-tooltip',
  props: {
    closeDelay: {
      type: [Number, String],
      default: 0
    },
    disabled: Boolean,
    openDelay: {
      type: [Number, String],
      default: 0
    },
    openOnHover: {
      type: Boolean,
      default: true
    },
    openOnFocus: {
      type: Boolean,
      default: true
    },
    tag: {
      type: String,
      default: 'span'
    },
    transition: String
  },
  data: () => ({
    calculatedMinWidth: 0,
    closeDependents: false
  }),
  computed: {
    calculatedLeft() {
      const {
        activator,
        content
      } = this.dimensions;
      const unknown = !this.bottom && !this.left && !this.top && !this.right;
      const activatorLeft = this.attach !== false ? activator.offsetLeft : activator.left;
      let left = 0;
      if (this.top || this.bottom || unknown) {
        left = activatorLeft + activator.width / 2 - content.width / 2;
      } else if (this.left || this.right) {
        left = activatorLeft + (this.right ? activator.width : -content.width) + (this.right ? 10 : -10);
      }
      if (this.nudgeLeft) left -= parseInt(this.nudgeLeft);
      if (this.nudgeRight) left += parseInt(this.nudgeRight);
      return `${this.calcXOverflow(left, this.dimensions.content.width)}px`;
    },
    calculatedTop() {
      const {
        activator,
        content
      } = this.dimensions;
      const activatorTop = this.attach !== false ? activator.offsetTop : activator.top;
      let top = 0;
      if (this.top || this.bottom) {
        top = activatorTop + (this.bottom ? activator.height : -content.height) + (this.bottom ? 10 : -10);
      } else if (this.left || this.right) {
        top = activatorTop + activator.height / 2 - content.height / 2;
      }
      if (this.nudgeTop) top -= parseInt(this.nudgeTop);
      if (this.nudgeBottom) top += parseInt(this.nudgeBottom);
      if (this.attach === false) top += this.pageYOffset;
      return `${this.calcYOverflow(top)}px`;
    },
    classes() {
      return {
        'v-tooltip--top': this.top,
        'v-tooltip--right': this.right,
        'v-tooltip--bottom': this.bottom,
        'v-tooltip--left': this.left,
        'v-tooltip--attached': this.attach === '' || this.attach === true || this.attach === 'attach'
      };
    },
    computedTransition() {
      if (this.transition) return this.transition;
      return this.isActive ? 'scale-transition' : 'fade-transition';
    },
    offsetY() {
      return this.top || this.bottom;
    },
    offsetX() {
      return this.left || this.right;
    },
    styles() {
      return {
        left: this.calculatedLeft,
        maxWidth: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_6__[/* convertToUnit */ "g"])(this.maxWidth),
        minWidth: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_6__[/* convertToUnit */ "g"])(this.minWidth),
        top: this.calculatedTop,
        zIndex: this.zIndex || this.activeZIndex
      };
    }
  },
  beforeMount() {
    this.$nextTick(() => {
      this.value && this.callActivate();
    });
  },
  mounted() {
    if (Object(_util_helpers__WEBPACK_IMPORTED_MODULE_6__[/* getSlotType */ "o"])(this, 'activator', true) === 'v-slot') {
      Object(_util_console__WEBPACK_IMPORTED_MODULE_7__[/* consoleError */ "b"])(`v-tooltip's activator slot must be bound, try '<template #activator="data"><v-btn v-on="data.on>'`, this);
    }
  },
  methods: {
    activate() {
      // Update coordinates and dimensions of menu
      // and its activator
      this.updateDimensions(); // Start the transition

      requestAnimationFrame(this.startTransition);
    },
    deactivate() {
      this.runDelay('close');
    },
    genActivatorListeners() {
      const listeners = _mixins_activatable__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].options.methods.genActivatorListeners.call(this);
      if (this.openOnFocus) {
        listeners.focus = e => {
          this.getActivator(e);
          this.runDelay('open');
        };
        listeners.blur = e => {
          this.getActivator(e);
          this.runDelay('close');
        };
      }
      listeners.keydown = e => {
        if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_6__[/* keyCodes */ "r"].esc) {
          this.getActivator(e);
          this.runDelay('close');
        }
      };
      return listeners;
    },
    genActivatorAttributes() {
      return {
        'aria-haspopup': true,
        'aria-expanded': String(this.isActive)
      };
    },
    genTransition() {
      const content = this.genContent();
      if (!this.computedTransition) return content;
      return this.$createElement('transition', {
        props: {
          name: this.computedTransition
        }
      }, [content]);
    },
    genContent() {
      return this.$createElement('div', this.setBackgroundColor(this.color, {
        staticClass: 'v-tooltip__content',
        class: {
          [this.contentClass]: true,
          menuable__content__active: this.isActive,
          'v-tooltip__content--fixed': this.activatorFixed
        },
        style: this.styles,
        attrs: this.getScopeIdAttrs(),
        directives: [{
          name: 'show',
          value: this.isContentActive
        }],
        ref: 'content'
      }), this.getContentSlot());
    }
  },
  render(h) {
    return h(this.tag, {
      staticClass: 'v-tooltip',
      class: this.classes
    }, [this.showLazyContent(() => [this.genTransition()]), this.genActivator()]);
  }
}));

/***/ })
]);;
//# sourceMappingURL=citation-list.js.map