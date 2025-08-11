import {
  styled
} from "./chunk-KQH23C7C.js";
import {
  require_react
} from "./chunk-KXN4HSBF.js";
import {
  __commonJS,
  __toESM
} from "./chunk-PLDDJCW6.js";

// node_modules/react-simple-animate/dist/index.js
var require_dist = __commonJS({
  "node_modules/react-simple-animate/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React3 = require_react();
    function _interopNamespace(e2) {
      if (e2 && e2.__esModule) return e2;
      var n2 = /* @__PURE__ */ Object.create(null);
      if (e2) {
        Object.keys(e2).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e2, k);
            Object.defineProperty(n2, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e2[k];
              }
            });
          }
        });
      }
      n2["default"] = e2;
      return Object.freeze(n2);
    }
    var React__namespace = _interopNamespace(React3);
    var DEFAULT_DURATION = 0.3;
    var DEFAULT_EASE_TYPE = "linear";
    var DEFAULT_DIRECTION = "normal";
    var DEFAULT_FILLMODE = "none";
    var RUNNING = "running";
    var PAUSED = "paused";
    var ALL = "all";
    var calculateTotalDuration = ({ duration = DEFAULT_DURATION, delay = 0, overlay = 0 }) => duration + delay - overlay || 0;
    var isUndefined2 = (val) => val === void 0;
    function getSequenceId(sequenceIndex, sequenceId, defaultValue) {
      if (isUndefined2(sequenceId) && isUndefined2(sequenceIndex)) {
        return defaultValue || 0;
      }
      if (sequenceIndex && sequenceIndex >= 0) {
        return sequenceIndex;
      }
      if (sequenceId) {
        return sequenceId;
      }
      return 0;
    }
    var AnimateContext = React__namespace.createContext({
      animationStates: {},
      register: () => {
      }
    });
    function AnimateGroup({ play, sequences = [], children }) {
      const [animationStates, setAnimationStates] = React__namespace.useState({});
      const animationsRef = React__namespace.useRef({});
      const register = React__namespace.useCallback((data) => {
        const { sequenceIndex, sequenceId } = data;
        if (!isUndefined2(sequenceId) || !isUndefined2(sequenceIndex)) {
          animationsRef.current[getSequenceId(sequenceIndex, sequenceId)] = data;
        }
      }, []);
      React__namespace.useEffect(() => {
        const sequencesToAnimate = Array.isArray(sequences) && sequences.length ? sequences : Object.values(animationsRef.current);
        const localAnimationState = {};
        (play ? sequencesToAnimate : [...sequencesToAnimate].reverse()).reduce((previous, { sequenceId, sequenceIndex, duration = DEFAULT_DURATION, delay, overlay }, currentIndex) => {
          const id = getSequenceId(sequenceIndex, sequenceId, currentIndex);
          const currentTotalDuration = calculateTotalDuration({
            duration,
            delay,
            overlay
          });
          const totalDuration = currentTotalDuration + previous;
          localAnimationState[id] = {
            play,
            pause: !play,
            delay: (delay || 0) + previous,
            controlled: true
          };
          return totalDuration;
        }, 0);
        setAnimationStates(localAnimationState);
      }, [play]);
      return React__namespace.createElement(AnimateContext.Provider, { value: { animationStates, register } }, children);
    }
    var secToMs = (ms) => (ms || 0) * 1e3;
    function Animate2(props) {
      const { play, children, render, start, end, complete = "", onComplete, delay = 0, duration = DEFAULT_DURATION, easeType = DEFAULT_EASE_TYPE, sequenceId, sequenceIndex } = props;
      const onCompleteTimeRef = React__namespace.useRef();
      const [style, setStyle] = React__namespace.useState(start || {});
      const { register, animationStates = {} } = React__namespace.useContext(AnimateContext);
      const id = getSequenceId(sequenceIndex, sequenceId);
      React__namespace.useEffect(() => {
        if (!isUndefined2(sequenceIndex) && sequenceIndex >= 0 || sequenceId) {
          register(props);
        }
      }, []);
      React__namespace.useEffect(() => {
        const animationState = animationStates[id] || {};
        setStyle({
          ...play || animationState.play ? end : start,
          transition: `${ALL} ${duration}s ${easeType} ${animationState.delay || delay}s`
        });
        if (play && (complete || onComplete)) {
          onCompleteTimeRef.current = setTimeout(() => {
            complete && setStyle(complete);
            onComplete && onComplete();
          }, secToMs((animationState.delay || delay) + duration));
        }
        return () => onCompleteTimeRef.current && clearTimeout(onCompleteTimeRef.current);
      }, [
        id,
        animationStates,
        play,
        duration,
        easeType,
        delay,
        onComplete,
        start,
        end,
        complete
      ]);
      return render ? render({ style }) : React__namespace.createElement("div", { style }, children);
    }
    var camelCaseToDash = (camelCase) => camelCase ? camelCase.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`) : "";
    var generateKeyframes = (keyframes) => {
      const animationLength = keyframes.length;
      return keyframes.reduce((previous, keyframe, currentIndex) => {
        const keyframePercentage = parseFloat((100 / (animationLength - 1)).toFixed(2)) * currentIndex;
        if (typeof keyframe === "string") {
          return `${previous} ${keyframePercentage}% {${keyframe}}`;
        }
        const keys = Object.keys(keyframe);
        if (keys.length && isNaN(+keys[0])) {
          const keyframeContent = keys.reduce((acc, key) => `${acc} ${camelCaseToDash(key)}: ${keyframe[key]};`, "");
          return `${previous} ${keyframePercentage}% {${keyframeContent}}`;
        }
        return `${previous} ${keys[0]}% {${keyframe[keys[0]]}}`;
      }, "");
    };
    function createStyle({ keyframes, animationName }) {
      return `@keyframes ${animationName} {${generateKeyframes(keyframes)}}`;
    }
    function createTag({ keyframes, animationName }) {
      var _a, _b, _c, _d;
      let styleTag = document.querySelector("style[data-id=rsi]");
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.setAttribute("data-id", "rsi");
        document.head.appendChild(styleTag);
      }
      const index = (_c = (_b = (_a = styleTag.sheet) === null || _a === void 0 ? void 0 : _a.cssRules) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0;
      try {
        (_d = styleTag.sheet) === null || _d === void 0 ? void 0 : _d.insertRule(createStyle({
          keyframes,
          animationName
        }), index);
      } catch (e2) {
        console.error("react simple animate, error found during insert style ", e2);
      }
      return {
        styleTag,
        index
      };
    }
    var deleteRules = (sheet, deleteName) => {
      if (!sheet) {
        return;
      }
      const index = Object.values(sheet.cssRules).findIndex(({ name }) => name === deleteName);
      if (index >= 0) {
        sheet.deleteRule(index);
      }
    };
    var createRandomName = () => `RSI-${Math.random().toString(36).substr(2, 9)}`;
    var getPlayState = (pause) => pause ? PAUSED : RUNNING;
    function AnimateKeyframes(props) {
      const { children, play = false, pause = false, render, duration = DEFAULT_DURATION, delay = 0, easeType = DEFAULT_EASE_TYPE, direction = DEFAULT_DIRECTION, fillMode = DEFAULT_FILLMODE, iterationCount = 1, sequenceIndex, keyframes, sequenceId } = props;
      let pauseValue;
      const animationNameRef = React__namespace.useRef({
        forward: "",
        reverse: ""
      });
      const controlled = React__namespace.useRef(false);
      const styleTagRef = React__namespace.useRef({
        forward: null,
        reverse: null
      });
      const id = getSequenceId(sequenceIndex, sequenceId);
      const { register, animationStates = {} } = React__namespace.useContext(AnimateContext);
      const animateState = animationStates[id] || {};
      const [, forceUpdate] = React__namespace.useState(false);
      React__namespace.useEffect(() => {
        const styleTag = styleTagRef.current;
        const animationName = animationNameRef.current;
        animationNameRef.current.forward = createRandomName();
        let result = createTag({
          animationName: animationNameRef.current.forward,
          keyframes
        });
        styleTagRef.current.forward = result.styleTag;
        animationNameRef.current.reverse = createRandomName();
        result = createTag({
          animationName: animationNameRef.current.reverse,
          keyframes: keyframes.reverse()
        });
        styleTagRef.current.reverse = result.styleTag;
        register(props);
        if (play) {
          forceUpdate(true);
        }
        return () => {
          var _a, _b;
          deleteRules((_a = styleTag.forward) === null || _a === void 0 ? void 0 : _a.sheet, animationName.forward);
          deleteRules((_b = styleTag.reverse) === null || _b === void 0 ? void 0 : _b.sheet, animationName.reverse);
        };
      }, []);
      if (animateState.controlled && !controlled.current) {
        pauseValue = animateState.pause;
        if (!animateState.pause) {
          controlled.current = true;
        }
      } else {
        pauseValue = pause;
      }
      const style = {
        animation: `${duration}s ${easeType} ${animateState.delay || delay}s ${iterationCount} ${direction} ${fillMode} ${getPlayState(pauseValue)} ${((animateState.controlled ? animateState.play : play) ? animationNameRef.current.forward : animationNameRef.current.reverse) || ""}`
      };
      return render ? render({ style }) : React__namespace.createElement("div", { style: style || {} }, children);
    }
    function useAnimate(props) {
      const { start, end, complete, onComplete, delay = 0, duration = DEFAULT_DURATION, easeType = DEFAULT_EASE_TYPE } = props;
      const transition = React__namespace.useMemo(() => `${ALL} ${duration}s ${easeType} ${delay}s`, [duration, easeType, delay]);
      const [animate, setAnimate] = React__namespace.useState({
        isPlaying: false,
        style: { ...start, transition }
      });
      const { isPlaying, style } = animate;
      const onCompleteTimeRef = React__namespace.useRef();
      React__namespace.useEffect(() => {
        if ((onComplete || complete) && isPlaying) {
          onCompleteTimeRef.current = setTimeout(() => {
            if (onComplete) {
              onComplete();
            }
            if (complete) {
              setAnimate((animate2) => ({
                ...animate2,
                style: complete
              }));
            }
          }, secToMs(delay + duration));
        }
        return () => onCompleteTimeRef.current && clearTimeout(onCompleteTimeRef.current);
      }, [animate, complete, delay, duration, isPlaying, onComplete]);
      return {
        isPlaying,
        style,
        play: React__namespace.useCallback((isPlaying2) => {
          setAnimate((animate2) => ({
            ...animate2,
            style: {
              ...isPlaying2 ? end : start,
              transition
            },
            isPlaying: isPlaying2
          }));
        }, [end, start, transition])
      };
    }
    function useAnimateKeyframes(props) {
      const { duration = DEFAULT_DURATION, delay = 0, easeType = DEFAULT_EASE_TYPE, direction = DEFAULT_DIRECTION, fillMode = DEFAULT_FILLMODE, iterationCount = 1, keyframes } = props;
      const animationNameRef = React__namespace.useRef({
        forward: "",
        reverse: ""
      });
      const styleTagRef = React__namespace.useRef({
        forward: null,
        reverse: null
      });
      const { register } = React__namespace.useContext(AnimateContext);
      const [isPlaying, setIsPlaying] = React__namespace.useState(null);
      const [isPaused, setIsPaused] = React__namespace.useState(false);
      React__namespace.useEffect(() => {
        const styleTag = styleTagRef.current;
        const animationName = animationNameRef.current;
        animationNameRef.current.forward = createRandomName();
        let result = createTag({
          animationName: animationNameRef.current.forward,
          keyframes
        });
        styleTagRef.current.forward = result.styleTag;
        animationNameRef.current.reverse = createRandomName();
        result = createTag({
          animationName: animationNameRef.current.reverse,
          keyframes: keyframes.reverse()
        });
        styleTagRef.current.reverse = result.styleTag;
        register(props);
        return () => {
          var _a, _b;
          deleteRules((_a = styleTag.forward) === null || _a === void 0 ? void 0 : _a.sheet, animationName.forward);
          deleteRules((_b = styleTag.reverse) === null || _b === void 0 ? void 0 : _b.sheet, animationName.reverse);
        };
      }, []);
      const style = {
        animation: `${duration}s ${easeType} ${delay}s ${iterationCount} ${direction} ${fillMode} ${getPlayState(isPaused)} ${isPlaying === null ? "" : isPlaying ? animationNameRef.current.forward : animationNameRef.current.reverse}`
      };
      return {
        style,
        play: setIsPlaying,
        pause: setIsPaused,
        isPlaying: !!isPlaying
      };
    }
    function createArrayWithNumbers(length) {
      return Array.from({ length }, () => null);
    }
    function useAnimateGroup(props) {
      const { sequences = [] } = props;
      const defaultArray = createArrayWithNumbers(sequences.length).map((_, index) => props.sequences[index].start);
      const [styles, setStyles] = React__namespace.useState(defaultArray);
      const [isPlaying, setPlaying] = React__namespace.useState(false);
      const animationNamesRef = React__namespace.useRef([]);
      const styleTagRef = React__namespace.useRef([]);
      React__namespace.useEffect(() => {
        sequences.forEach(({ keyframes }, i) => {
          if (!Array.isArray(keyframes)) {
            return;
          }
          if (!animationNamesRef.current[i]) {
            animationNamesRef.current[i] = {};
            styleTagRef.current[i] = {};
          }
          animationNamesRef.current[i].forward = createRandomName();
          let result = createTag({
            animationName: animationNamesRef.current[i].forward,
            keyframes
          });
          styleTagRef.current[i].forward = result.styleTag;
          animationNamesRef.current[i].reverse = createRandomName();
          result = createTag({
            animationName: animationNamesRef.current[i].reverse,
            keyframes: keyframes.reverse()
          });
          styleTagRef.current[i].reverse = result.styleTag;
        });
        const styleTags = styleTagRef.current;
        const animationNames = animationNamesRef.current;
        return () => Object.values(animationNames).forEach(({ forward, reverse }, i) => {
          var _a, _b;
          deleteRules((_a = styleTags[i].forward) === null || _a === void 0 ? void 0 : _a.sheet, forward);
          deleteRules((_b = styleTags[i].reverse) === null || _b === void 0 ? void 0 : _b.sheet, reverse);
        });
      }, []);
      const play = React__namespace.useCallback((isPlay) => {
        let totalDuration = 0;
        const animationRefWithOrder = isPlay ? animationNamesRef.current : [...animationNamesRef.current].reverse();
        const styles2 = (isPlay ? sequences : [...sequences].reverse()).map((current, currentIndex) => {
          const { duration = DEFAULT_DURATION, delay = 0, overlay, keyframes, iterationCount = 1, easeType = DEFAULT_EASE_TYPE, direction = DEFAULT_DIRECTION, fillMode = DEFAULT_FILLMODE, end = {}, start = {} } = current;
          const delayDuration = currentIndex === 0 ? delay : totalDuration;
          const transition = `${ALL} ${duration}s ${easeType} ${delayDuration}s`;
          totalDuration = calculateTotalDuration({ duration, delay, overlay }) + totalDuration;
          return keyframes ? {
            animation: `${duration}s ${easeType} ${delayDuration}s ${iterationCount} ${direction} ${fillMode} ${RUNNING} ${isPlay ? animationRefWithOrder[currentIndex].forward : animationRefWithOrder[currentIndex].reverse}`
          } : {
            ...isPlay ? end : start,
            transition
          };
        });
        setStyles(isPlay ? styles2 : [...styles2].reverse());
        setPlaying(isPlay);
      }, []);
      return { styles, play, isPlaying };
    }
    exports.Animate = Animate2;
    exports.AnimateGroup = AnimateGroup;
    exports.AnimateKeyframes = AnimateKeyframes;
    exports.useAnimate = useAnimate;
    exports.useAnimateGroup = useAnimateGroup;
    exports.useAnimateKeyframes = useAnimateKeyframes;
  }
});

// node_modules/lodash/isUndefined.js
var require_isUndefined = __commonJS({
  "node_modules/lodash/isUndefined.js"(exports, module) {
    function isUndefined2(value) {
      return value === void 0;
    }
    module.exports = isUndefined2;
  }
});

// node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "node_modules/lodash/isObject.js"(exports, module) {
    function isObject2(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module.exports = isObject2;
  }
});

// node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "node_modules/lodash/isArray.js"(exports, module) {
    var isArray = Array.isArray;
    module.exports = isArray;
  }
});

// node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "node_modules/lodash/_freeGlobal.js"(exports, module) {
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module.exports = freeGlobal;
  }
});

// node_modules/lodash/_root.js
var require_root = __commonJS({
  "node_modules/lodash/_root.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  }
});

// node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "node_modules/lodash/_Symbol.js"(exports, module) {
    var root = require_root();
    var Symbol = root.Symbol;
    module.exports = Symbol;
  }
});

// node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "node_modules/lodash/_getRawTag.js"(exports, module) {
    var Symbol = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e2) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    module.exports = getRawTag;
  }
});

// node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "node_modules/lodash/_objectToString.js"(exports, module) {
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module.exports = objectToString;
  }
});

// node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "node_modules/lodash/_baseGetTag.js"(exports, module) {
    var Symbol = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module.exports = baseGetTag;
  }
});

// node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "node_modules/lodash/isObjectLike.js"(exports, module) {
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module.exports = isObjectLike;
  }
});

// node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "node_modules/lodash/isSymbol.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module.exports = isSymbol;
  }
});

// node_modules/lodash/_isKey.js
var require_isKey = __commonJS({
  "node_modules/lodash/_isKey.js"(exports, module) {
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    function isKey2(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    module.exports = isKey2;
  }
});

// node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "node_modules/lodash/isFunction.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObject2 = require_isObject();
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction2(value) {
      if (!isObject2(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module.exports = isFunction2;
  }
});

// node_modules/lodash/_coreJsData.js
var require_coreJsData = __commonJS({
  "node_modules/lodash/_coreJsData.js"(exports, module) {
    var root = require_root();
    var coreJsData = root["__core-js_shared__"];
    module.exports = coreJsData;
  }
});

// node_modules/lodash/_isMasked.js
var require_isMasked = __commonJS({
  "node_modules/lodash/_isMasked.js"(exports, module) {
    var coreJsData = require_coreJsData();
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    module.exports = isMasked;
  }
});

// node_modules/lodash/_toSource.js
var require_toSource = __commonJS({
  "node_modules/lodash/_toSource.js"(exports, module) {
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e2) {
        }
        try {
          return func + "";
        } catch (e2) {
        }
      }
      return "";
    }
    module.exports = toSource;
  }
});

// node_modules/lodash/_baseIsNative.js
var require_baseIsNative = __commonJS({
  "node_modules/lodash/_baseIsNative.js"(exports, module) {
    var isFunction2 = require_isFunction();
    var isMasked = require_isMasked();
    var isObject2 = require_isObject();
    var toSource = require_toSource();
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    function baseIsNative(value) {
      if (!isObject2(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction2(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    module.exports = baseIsNative;
  }
});

// node_modules/lodash/_getValue.js
var require_getValue = __commonJS({
  "node_modules/lodash/_getValue.js"(exports, module) {
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    module.exports = getValue;
  }
});

// node_modules/lodash/_getNative.js
var require_getNative = __commonJS({
  "node_modules/lodash/_getNative.js"(exports, module) {
    var baseIsNative = require_baseIsNative();
    var getValue = require_getValue();
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    module.exports = getNative;
  }
});

// node_modules/lodash/_nativeCreate.js
var require_nativeCreate = __commonJS({
  "node_modules/lodash/_nativeCreate.js"(exports, module) {
    var getNative = require_getNative();
    var nativeCreate = getNative(Object, "create");
    module.exports = nativeCreate;
  }
});

// node_modules/lodash/_hashClear.js
var require_hashClear = __commonJS({
  "node_modules/lodash/_hashClear.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    module.exports = hashClear;
  }
});

// node_modules/lodash/_hashDelete.js
var require_hashDelete = __commonJS({
  "node_modules/lodash/_hashDelete.js"(exports, module) {
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = hashDelete;
  }
});

// node_modules/lodash/_hashGet.js
var require_hashGet = __commonJS({
  "node_modules/lodash/_hashGet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    module.exports = hashGet;
  }
});

// node_modules/lodash/_hashHas.js
var require_hashHas = __commonJS({
  "node_modules/lodash/_hashHas.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    module.exports = hashHas;
  }
});

// node_modules/lodash/_hashSet.js
var require_hashSet = __commonJS({
  "node_modules/lodash/_hashSet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    module.exports = hashSet;
  }
});

// node_modules/lodash/_Hash.js
var require_Hash = __commonJS({
  "node_modules/lodash/_Hash.js"(exports, module) {
    var hashClear = require_hashClear();
    var hashDelete = require_hashDelete();
    var hashGet = require_hashGet();
    var hashHas = require_hashHas();
    var hashSet = require_hashSet();
    function Hash(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    module.exports = Hash;
  }
});

// node_modules/lodash/_listCacheClear.js
var require_listCacheClear = __commonJS({
  "node_modules/lodash/_listCacheClear.js"(exports, module) {
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    module.exports = listCacheClear;
  }
});

// node_modules/lodash/eq.js
var require_eq = __commonJS({
  "node_modules/lodash/eq.js"(exports, module) {
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    module.exports = eq;
  }
});

// node_modules/lodash/_assocIndexOf.js
var require_assocIndexOf = __commonJS({
  "node_modules/lodash/_assocIndexOf.js"(exports, module) {
    var eq = require_eq();
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    module.exports = assocIndexOf;
  }
});

// node_modules/lodash/_listCacheDelete.js
var require_listCacheDelete = __commonJS({
  "node_modules/lodash/_listCacheDelete.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    var arrayProto = Array.prototype;
    var splice = arrayProto.splice;
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }
    module.exports = listCacheDelete;
  }
});

// node_modules/lodash/_listCacheGet.js
var require_listCacheGet = __commonJS({
  "node_modules/lodash/_listCacheGet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    module.exports = listCacheGet;
  }
});

// node_modules/lodash/_listCacheHas.js
var require_listCacheHas = __commonJS({
  "node_modules/lodash/_listCacheHas.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    module.exports = listCacheHas;
  }
});

// node_modules/lodash/_listCacheSet.js
var require_listCacheSet = __commonJS({
  "node_modules/lodash/_listCacheSet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    module.exports = listCacheSet;
  }
});

// node_modules/lodash/_ListCache.js
var require_ListCache = __commonJS({
  "node_modules/lodash/_ListCache.js"(exports, module) {
    var listCacheClear = require_listCacheClear();
    var listCacheDelete = require_listCacheDelete();
    var listCacheGet = require_listCacheGet();
    var listCacheHas = require_listCacheHas();
    var listCacheSet = require_listCacheSet();
    function ListCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    module.exports = ListCache;
  }
});

// node_modules/lodash/_Map.js
var require_Map = __commonJS({
  "node_modules/lodash/_Map.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Map2 = getNative(root, "Map");
    module.exports = Map2;
  }
});

// node_modules/lodash/_mapCacheClear.js
var require_mapCacheClear = __commonJS({
  "node_modules/lodash/_mapCacheClear.js"(exports, module) {
    var Hash = require_Hash();
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    module.exports = mapCacheClear;
  }
});

// node_modules/lodash/_isKeyable.js
var require_isKeyable = __commonJS({
  "node_modules/lodash/_isKeyable.js"(exports, module) {
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    module.exports = isKeyable;
  }
});

// node_modules/lodash/_getMapData.js
var require_getMapData = __commonJS({
  "node_modules/lodash/_getMapData.js"(exports, module) {
    var isKeyable = require_isKeyable();
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    module.exports = getMapData;
  }
});

// node_modules/lodash/_mapCacheDelete.js
var require_mapCacheDelete = __commonJS({
  "node_modules/lodash/_mapCacheDelete.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = mapCacheDelete;
  }
});

// node_modules/lodash/_mapCacheGet.js
var require_mapCacheGet = __commonJS({
  "node_modules/lodash/_mapCacheGet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    module.exports = mapCacheGet;
  }
});

// node_modules/lodash/_mapCacheHas.js
var require_mapCacheHas = __commonJS({
  "node_modules/lodash/_mapCacheHas.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    module.exports = mapCacheHas;
  }
});

// node_modules/lodash/_mapCacheSet.js
var require_mapCacheSet = __commonJS({
  "node_modules/lodash/_mapCacheSet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    module.exports = mapCacheSet;
  }
});

// node_modules/lodash/_MapCache.js
var require_MapCache = __commonJS({
  "node_modules/lodash/_MapCache.js"(exports, module) {
    var mapCacheClear = require_mapCacheClear();
    var mapCacheDelete = require_mapCacheDelete();
    var mapCacheGet = require_mapCacheGet();
    var mapCacheHas = require_mapCacheHas();
    var mapCacheSet = require_mapCacheSet();
    function MapCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    module.exports = MapCache;
  }
});

// node_modules/lodash/memoize.js
var require_memoize = __commonJS({
  "node_modules/lodash/memoize.js"(exports, module) {
    var MapCache = require_MapCache();
    var FUNC_ERROR_TEXT = "Expected a function";
    function memoize(func, resolver) {
      if (typeof func != "function" || resolver != null && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    }
    memoize.Cache = MapCache;
    module.exports = memoize;
  }
});

// node_modules/lodash/_memoizeCapped.js
var require_memoizeCapped = __commonJS({
  "node_modules/lodash/_memoizeCapped.js"(exports, module) {
    var memoize = require_memoize();
    var MAX_MEMOIZE_SIZE = 500;
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });
      var cache = result.cache;
      return result;
    }
    module.exports = memoizeCapped;
  }
});

// node_modules/lodash/_stringToPath.js
var require_stringToPath = __commonJS({
  "node_modules/lodash/_stringToPath.js"(exports, module) {
    var memoizeCapped = require_memoizeCapped();
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath2 = memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46) {
        result.push("");
      }
      string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
      });
      return result;
    });
    module.exports = stringToPath2;
  }
});

// node_modules/lodash/_arrayMap.js
var require_arrayMap = __commonJS({
  "node_modules/lodash/_arrayMap.js"(exports, module) {
    function arrayMap(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    module.exports = arrayMap;
  }
});

// node_modules/lodash/_baseToString.js
var require_baseToString = __commonJS({
  "node_modules/lodash/_baseToString.js"(exports, module) {
    var Symbol = require_Symbol();
    var arrayMap = require_arrayMap();
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    var symbolProto = Symbol ? Symbol.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isArray(value)) {
        return arrayMap(value, baseToString) + "";
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = baseToString;
  }
});

// node_modules/lodash/toString.js
var require_toString = __commonJS({
  "node_modules/lodash/toString.js"(exports, module) {
    var baseToString = require_baseToString();
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    module.exports = toString;
  }
});

// node_modules/lodash/_castPath.js
var require_castPath = __commonJS({
  "node_modules/lodash/_castPath.js"(exports, module) {
    var isArray = require_isArray();
    var isKey2 = require_isKey();
    var stringToPath2 = require_stringToPath();
    var toString = require_toString();
    function castPath(value, object) {
      if (isArray(value)) {
        return value;
      }
      return isKey2(value, object) ? [value] : stringToPath2(toString(value));
    }
    module.exports = castPath;
  }
});

// node_modules/lodash/_toKey.js
var require_toKey = __commonJS({
  "node_modules/lodash/_toKey.js"(exports, module) {
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = toKey;
  }
});

// node_modules/lodash/_baseGet.js
var require_baseGet = __commonJS({
  "node_modules/lodash/_baseGet.js"(exports, module) {
    var castPath = require_castPath();
    var toKey = require_toKey();
    function baseGet2(object, path) {
      path = castPath(path, object);
      var index = 0, length = path.length;
      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return index && index == length ? object : void 0;
    }
    module.exports = baseGet2;
  }
});

// node_modules/lodash/get.js
var require_get = __commonJS({
  "node_modules/lodash/get.js"(exports, module) {
    var baseGet2 = require_baseGet();
    function get2(object, path, defaultValue) {
      var result = object == null ? void 0 : baseGet2(object, path);
      return result === void 0 ? defaultValue : result;
    }
    module.exports = get2;
  }
});

// node_modules/little-state-machine/dist/little-state-machine.es.js
var e = __toESM(require_react());
var t = function() {
  var e2 = { name: "__LSM__", middleWares: [], persist: "action" }, t2 = {};
  try {
    e2.storageType = "undefined" != typeof sessionStorage ? window.sessionStorage : void 0;
  } catch (e3) {
  }
  return { updateStore: function(n2) {
    try {
      t2 = e2.storageType && JSON.parse(e2.storageType.getItem(e2.name) || "") || n2;
    } catch (e3) {
      t2 = n2;
    }
  }, saveStore: function() {
    e2.storageType && e2.storageType.setItem(e2.name, JSON.stringify(t2));
  }, get state() {
    return t2;
  }, set state(e3) {
    t2 = e3;
  }, get options() {
    return e2;
  }, set options(t3) {
    e2 = t3;
  } };
}();
var n = e.createContext(void 0);
var o = function(o2) {
  var r2 = o2.children, s2 = e.useState(t.state), a2 = s2[0], i = s2[1];
  return e.useEffect(function() {
    "beforeUnload" === t.options.persist && (window.onbeforeunload = function() {
      return t.saveStore();
    }, t.options.storageType && t.options.storageType.removeItem(t.options.name));
  }, []), e.createElement(n.Provider, { value: { state: a2, setState: i } }, r2);
};
function r() {
  return r = Object.assign || function(e2) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var n2 = arguments[t2];
      for (var o2 in n2) Object.prototype.hasOwnProperty.call(n2, o2) && (e2[o2] = n2[o2]);
    }
    return e2;
  }, r.apply(this, arguments);
}
function s(e2, n2) {
  n2 && (t.options = r({}, t.options, n2)), "undefined" != typeof window && (window.__LSM_NAME__ = t.options.name, window.__LSM_RESET__ = function() {
    return t.options.storageType && t.options.storageType.removeItem(t.options.name);
  }), t.updateStore(e2);
}
function a(o2) {
  var r2 = e.useContext(n), s2 = r2.state, a2 = r2.setState, i = e.useRef(Object.entries(o2 || {}).reduce(function(e2, n2) {
    var o3;
    return Object.assign({}, e2, ((o3 = {})[n2[0]] = /* @__PURE__ */ function(e3, n3) {
      return function(o4, r3) {
        window.__LSM_NAME__ = n3.name, t.state = n3(t.state, o4), t.options.middleWares && (t.state = t.options.middleWares.reduce(function(e4, t2) {
          return t2(e4, n3.name, o4) || e4;
        }, t.state)), (!r3 || !r3.skipRender) && e3(t.state), "action" === t.options.persist && t.saveStore();
      };
    }(a2, n2[1]), o3));
  }, {}));
  return { actions: i.current, state: s2, getState: e.useCallback(function() {
    return t.state;
  }, []) };
}

// node_modules/@hookform/devtools/dist/index.esm.js
var React2 = __toESM(require_react());
var import_react = __toESM(require_react());

// node_modules/uuid/dist/esm-browser/rng.js
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}

// node_modules/uuid/dist/esm-browser/regex.js
var regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

// node_modules/uuid/dist/esm-browser/validate.js
function validate(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default = validate;

// node_modules/uuid/dist/esm-browser/stringify.js
var byteToHex = [];
for (i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).substr(1));
}
var i;
function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate_default(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
var stringify_default = stringify;

// node_modules/uuid/dist/esm-browser/parse.js
function parse(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  var v;
  var arr = new Uint8Array(16);
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 255;
  arr[2] = v >>> 8 & 255;
  arr[3] = v & 255;
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 255;
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 255;
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 255;
  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
  arr[11] = v / 4294967296 & 255;
  arr[12] = v >>> 24 & 255;
  arr[13] = v >>> 16 & 255;
  arr[14] = v >>> 8 & 255;
  arr[15] = v & 255;
  return arr;
}
var parse_default = parse;

// node_modules/uuid/dist/esm-browser/v35.js
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  var bytes = [];
  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}
var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
var URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function v35_default(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === "string") {
      value = stringToBytes(value);
    }
    if (typeof namespace === "string") {
      namespace = parse_default(namespace);
    }
    if (namespace.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 15 | version;
    bytes[8] = bytes[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return stringify_default(bytes);
  }
  try {
    generateUUID.name = name;
  } catch (err) {
  }
  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

// node_modules/uuid/dist/esm-browser/md5.js
function md5(bytes) {
  if (typeof bytes === "string") {
    var msg = unescape(encodeURIComponent(bytes));
    bytes = new Uint8Array(msg.length);
    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }
  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = "0123456789abcdef";
  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 255;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15), 16);
    output.push(hex);
  }
  return output;
}
function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
function wordsToMd5(x, len) {
  x[len >> 5] |= 128 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a2 = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  for (var i = 0; i < x.length; i += 16) {
    var olda = a2;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a2 = md5ff(a2, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a2, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a2, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a2, x[i + 3], 22, -1044525330);
    a2 = md5ff(a2, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a2, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a2, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a2, x[i + 7], 22, -45705983);
    a2 = md5ff(a2, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a2, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a2, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a2, x[i + 11], 22, -1990404162);
    a2 = md5ff(a2, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a2, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a2, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a2, x[i + 15], 22, 1236535329);
    a2 = md5gg(a2, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a2, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a2, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a2, x[i], 20, -373897302);
    a2 = md5gg(a2, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a2, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a2, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a2, x[i + 4], 20, -405537848);
    a2 = md5gg(a2, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a2, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a2, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a2, x[i + 8], 20, 1163531501);
    a2 = md5gg(a2, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a2, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a2, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a2, x[i + 12], 20, -1926607734);
    a2 = md5hh(a2, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a2, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a2, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a2, x[i + 14], 23, -35309556);
    a2 = md5hh(a2, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a2, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a2, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a2, x[i + 10], 23, -1094730640);
    a2 = md5hh(a2, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a2, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a2, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a2, x[i + 6], 23, 76029189);
    a2 = md5hh(a2, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a2, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a2, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a2, x[i + 2], 23, -995338651);
    a2 = md5ii(a2, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a2, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a2, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a2, x[i + 5], 21, -57434055);
    a2 = md5ii(a2, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a2, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a2, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a2, x[i + 1], 21, -2054922799);
    a2 = md5ii(a2, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a2, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a2, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a2, x[i + 13], 21, 1309151649);
    a2 = md5ii(a2, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a2, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a2, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a2, x[i + 9], 21, -343485551);
    a2 = safeAdd(a2, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return [a2, b, c, d];
}
function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }
  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));
  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 255) << i % 32;
  }
  return output;
}
function safeAdd(x, y) {
  var lsw = (x & 65535) + (y & 65535);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 65535;
}
function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
function md5cmn(q, a2, b, x, s2, t2) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a2, q), safeAdd(x, t2)), s2), b);
}
function md5ff(a2, b, c, d, x, s2, t2) {
  return md5cmn(b & c | ~b & d, a2, b, x, s2, t2);
}
function md5gg(a2, b, c, d, x, s2, t2) {
  return md5cmn(b & d | c & ~d, a2, b, x, s2, t2);
}
function md5hh(a2, b, c, d, x, s2, t2) {
  return md5cmn(b ^ c ^ d, a2, b, x, s2, t2);
}
function md5ii(a2, b, c, d, x, s2, t2) {
  return md5cmn(c ^ (b | ~d), a2, b, x, s2, t2);
}
var md5_default = md5;

// node_modules/uuid/dist/esm-browser/v3.js
var v3 = v35_default("v3", 48, md5_default);

// node_modules/uuid/dist/esm-browser/v4.js
function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return stringify_default(rnds);
}
var v4_default = v4;

// node_modules/uuid/dist/esm-browser/sha1.js
function f(s2, x, y, z) {
  switch (s2) {
    case 0:
      return x & y ^ ~x & z;
    case 1:
      return x ^ y ^ z;
    case 2:
      return x & y ^ x & z ^ y & z;
    case 3:
      return x ^ y ^ z;
  }
}
function ROTL(x, n2) {
  return x << n2 | x >>> 32 - n2;
}
function sha1(bytes) {
  var K = [1518500249, 1859775393, 2400959708, 3395469782];
  var H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  if (typeof bytes === "string") {
    var msg = unescape(encodeURIComponent(bytes));
    bytes = [];
    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    bytes = Array.prototype.slice.call(bytes);
  }
  bytes.push(128);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);
  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);
    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }
    M[_i] = arr;
  }
  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);
    for (var t2 = 0; t2 < 16; ++t2) {
      W[t2] = M[_i2][t2];
    }
    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }
    var a2 = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e2 = H[4];
    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s2 = Math.floor(_t2 / 20);
      var T = ROTL(a2, 5) + f(s2, b, c, d) + e2 + K[s2] + W[_t2] >>> 0;
      e2 = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a2;
      a2 = T;
    }
    H[0] = H[0] + a2 >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e2 >>> 0;
  }
  return [H[0] >> 24 & 255, H[0] >> 16 & 255, H[0] >> 8 & 255, H[0] & 255, H[1] >> 24 & 255, H[1] >> 16 & 255, H[1] >> 8 & 255, H[1] & 255, H[2] >> 24 & 255, H[2] >> 16 & 255, H[2] >> 8 & 255, H[2] & 255, H[3] >> 24 & 255, H[3] >> 16 & 255, H[3] >> 8 & 255, H[3] & 255, H[4] >> 24 & 255, H[4] >> 16 & 255, H[4] >> 8 & 255, H[4] & 255];
}
var sha1_default = sha1;

// node_modules/uuid/dist/esm-browser/v5.js
var v5 = v35_default("v5", 80, sha1_default);

// node_modules/@hookform/devtools/dist/index.esm.js
var import_react_simple_animate = __toESM(require_dist());
var import_isUndefined = __toESM(require_isUndefined());
var import_isObject = __toESM(require_isObject());
var import_get = __toESM(require_get());

// node_modules/use-deep-compare-effect/dist/use-deep-compare-effect.esm.js
var React = __toESM(require_react());

// node_modules/dequal/dist/index.mjs
var has = Object.prototype.hasOwnProperty;
function find(iter, tar, key) {
  for (key of iter.keys()) {
    if (dequal(key, tar)) return key;
  }
}
function dequal(foo, bar) {
  var ctor, len, tmp;
  if (foo === bar) return true;
  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date) return foo.getTime() === bar.getTime();
    if (ctor === RegExp) return foo.toString() === bar.toString();
    if (ctor === Array) {
      if ((len = foo.length) === bar.length) {
        while (len-- && dequal(foo[len], bar[len])) ;
      }
      return len === -1;
    }
    if (ctor === Set) {
      if (foo.size !== bar.size) {
        return false;
      }
      for (len of foo) {
        tmp = len;
        if (tmp && typeof tmp === "object") {
          tmp = find(bar, tmp);
          if (!tmp) return false;
        }
        if (!bar.has(tmp)) return false;
      }
      return true;
    }
    if (ctor === Map) {
      if (foo.size !== bar.size) {
        return false;
      }
      for (len of foo) {
        tmp = len[0];
        if (tmp && typeof tmp === "object") {
          tmp = find(bar, tmp);
          if (!tmp) return false;
        }
        if (!dequal(len[1], bar.get(tmp))) {
          return false;
        }
      }
      return true;
    }
    if (ctor === ArrayBuffer) {
      foo = new Uint8Array(foo);
      bar = new Uint8Array(bar);
    } else if (ctor === DataView) {
      if ((len = foo.byteLength) === bar.byteLength) {
        while (len-- && foo.getInt8(len) === bar.getInt8(len)) ;
      }
      return len === -1;
    }
    if (ArrayBuffer.isView(foo)) {
      if ((len = foo.byteLength) === bar.byteLength) {
        while (len-- && foo[len] === bar[len]) ;
      }
      return len === -1;
    }
    if (!ctor || typeof foo === "object") {
      len = 0;
      for (ctor in foo) {
        if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
        if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
      }
      return Object.keys(bar).length === len;
    }
  }
  return foo !== foo && bar !== bar;
}

// node_modules/use-deep-compare-effect/dist/use-deep-compare-effect.esm.js
function checkDeps(deps) {
  if (!deps || !deps.length) {
    throw new Error("useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead.");
  }
  if (deps.every(isPrimitive)) {
    throw new Error("useDeepCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead.");
  }
}
function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val);
}
function useDeepCompareMemoize(value) {
  var ref = React.useRef(value);
  var signalRef = React.useRef(0);
  if (!dequal(value, ref.current)) {
    ref.current = value;
    signalRef.current += 1;
  }
  return React.useMemo(function() {
    return ref.current;
  }, [signalRef.current]);
}
function useDeepCompareEffect(callback, dependencies) {
  if (true) {
    checkDeps(dependencies);
  }
  return React.useEffect(callback, useDeepCompareMemoize(dependencies));
}

// node_modules/@hookform/devtools/dist/index.esm.js
var isCheckBoxInput = (element) => element.type === "checkbox";
var isDateObject = (value) => value instanceof Date;
var isNullOrUndefined = (value) => value == null;
var isObjectType = (value) => typeof value === "object";
var isObject = (value) => !isNullOrUndefined(value) && !Array.isArray(value) && isObjectType(value) && !isDateObject(value);
var getEventValue = (event) => isObject(event) && event.target ? isCheckBoxInput(event.target) ? event.target.checked : event.target.value : event;
var getNodeParentName = (name) => name.substring(0, name.search(/\.\d+(\.|$)/)) || name;
var isNameInFieldArray = (names, name) => names.has(getNodeParentName(name));
var isPlainObject = (tempObject) => {
  const prototypeCopy = tempObject.constructor && tempObject.constructor.prototype;
  return isObject(prototypeCopy) && prototypeCopy.hasOwnProperty("isPrototypeOf");
};
var isWeb = typeof window !== "undefined" && typeof window.HTMLElement !== "undefined" && typeof document !== "undefined";
function cloneObject(data) {
  let copy;
  const isArray = Array.isArray(data);
  const isFileListInstance = typeof FileList !== "undefined" ? data instanceof FileList : false;
  if (data instanceof Date) {
    copy = new Date(data);
  } else if (data instanceof Set) {
    copy = new Set(data);
  } else if (!(isWeb && (data instanceof Blob || isFileListInstance)) && (isArray || isObject(data))) {
    copy = isArray ? [] : {};
    if (!isArray && !isPlainObject(data)) {
      copy = data;
    } else {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          copy[key] = cloneObject(data[key]);
        }
      }
    }
  } else {
    return data;
  }
  return copy;
}
var compact = (value) => Array.isArray(value) ? value.filter(Boolean) : [];
var isUndefined = (val) => val === void 0;
var get = (object, path, defaultValue) => {
  if (!path || !isObject(object)) {
    return defaultValue;
  }
  const result = compact(path.split(/[,[\].]+?/)).reduce((result2, key) => isNullOrUndefined(result2) ? result2 : result2[key], object);
  return isUndefined(result) || result === object ? isUndefined(object[path]) ? defaultValue : object[path] : result;
};
var isBoolean = (value) => typeof value === "boolean";
var isKey = (value) => /^\w*$/.test(value);
var stringToPath = (input) => compact(input.replace(/["|']|\]/g, "").split(/\.|\[/));
var set = (object, path, value) => {
  let index = -1;
  const tempPath = isKey(path) ? [path] : stringToPath(path);
  const length = tempPath.length;
  const lastIndex = length - 1;
  while (++index < length) {
    const key = tempPath[index];
    let newValue = value;
    if (index !== lastIndex) {
      const objValue = object[key];
      newValue = isObject(objValue) || Array.isArray(objValue) ? objValue : !isNaN(+tempPath[index + 1]) ? [] : {};
    }
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return;
    }
    object[key] = newValue;
    object = object[key];
  }
};
var EVENTS = {
  BLUR: "blur",
  FOCUS_OUT: "focusout",
  CHANGE: "change"
};
var VALIDATION_MODE = {
  onBlur: "onBlur",
  onChange: "onChange",
  onSubmit: "onSubmit",
  onTouched: "onTouched",
  all: "all"
};
var INPUT_VALIDATION_RULES = {
  max: "max",
  min: "min",
  maxLength: "maxLength",
  minLength: "minLength",
  pattern: "pattern",
  required: "required",
  validate: "validate"
};
var HookFormContext = import_react.default.createContext(null);
var useFormContext = () => import_react.default.useContext(HookFormContext);
var getProxyFormState = (formState, control, localProxyFormState, isRoot = true) => {
  const result = {
    defaultValues: control._defaultValues
  };
  for (const key in formState) {
    Object.defineProperty(result, key, {
      get: () => {
        const _key = key;
        if (control._proxyFormState[_key] !== VALIDATION_MODE.all) {
          control._proxyFormState[_key] = !isRoot || VALIDATION_MODE.all;
        }
        localProxyFormState && (localProxyFormState[_key] = true);
        return formState[_key];
      }
    });
  }
  return result;
};
function useFormState(props) {
  const methods = useFormContext();
  const { control = methods.control, disabled, name, exact } = props || {};
  const [formState, updateFormState] = import_react.default.useState(control._formState);
  const _localProxyFormState = import_react.default.useRef({
    isDirty: false,
    isLoading: false,
    dirtyFields: false,
    touchedFields: false,
    validatingFields: false,
    isValidating: false,
    isValid: false,
    errors: false
  });
  const _name = import_react.default.useRef(name);
  _name.current = name;
  import_react.default.useEffect(() => control._subscribe({
    name: _name.current,
    formState: _localProxyFormState.current,
    exact,
    callback: (formState2) => {
      !disabled && updateFormState({
        ...control._formState,
        ...formState2
      });
    }
  }), [control, disabled, exact]);
  import_react.default.useEffect(() => {
    _localProxyFormState.current.isValid && control._setValid(true);
  }, [control]);
  return import_react.default.useMemo(() => getProxyFormState(formState, control, _localProxyFormState.current, false), [formState, control]);
}
var isString = (value) => typeof value === "string";
var generateWatchOutput = (names, _names, formValues, isGlobal, defaultValue) => {
  if (isString(names)) {
    isGlobal && _names.watch.add(names);
    return get(formValues, names, defaultValue);
  }
  if (Array.isArray(names)) {
    return names.map((fieldName) => (isGlobal && _names.watch.add(fieldName), get(formValues, fieldName)));
  }
  isGlobal && (_names.watchAll = true);
  return formValues;
};
function useWatch(props) {
  const methods = useFormContext();
  const { control = methods.control, name, defaultValue, disabled, exact } = props || {};
  const _name = import_react.default.useRef(name);
  const _defaultValue = import_react.default.useRef(defaultValue);
  _name.current = name;
  import_react.default.useEffect(() => control._subscribe({
    name: _name.current,
    formState: {
      values: true
    },
    exact,
    callback: (formState) => !disabled && updateValue(generateWatchOutput(_name.current, control._names, formState.values || control._formValues, false, _defaultValue.current))
  }), [control, disabled, exact]);
  const [value, updateValue] = import_react.default.useState(control._getWatch(name, defaultValue));
  import_react.default.useEffect(() => control._removeUnmounted());
  return value;
}
var appendErrors = (name, validateAllFieldCriteria, errors, type, message) => validateAllFieldCriteria ? {
  ...errors[name],
  types: {
    ...errors[name] && errors[name].types ? errors[name].types : {},
    [type]: message || true
  }
} : {};
var convertToArrayPayload = (value) => Array.isArray(value) ? value : [value];
var createSubject = () => {
  let _observers = [];
  const next = (value) => {
    for (const observer of _observers) {
      observer.next && observer.next(value);
    }
  };
  const subscribe = (observer) => {
    _observers.push(observer);
    return {
      unsubscribe: () => {
        _observers = _observers.filter((o2) => o2 !== observer);
      }
    };
  };
  const unsubscribe = () => {
    _observers = [];
  };
  return {
    get observers() {
      return _observers;
    },
    next,
    subscribe,
    unsubscribe
  };
};
var isPrimitive2 = (value) => isNullOrUndefined(value) || !isObjectType(value);
function deepEqual(object1, object2) {
  if (isPrimitive2(object1) || isPrimitive2(object2)) {
    return object1 === object2;
  }
  if (isDateObject(object1) && isDateObject(object2)) {
    return object1.getTime() === object2.getTime();
  }
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    if (!keys2.includes(key)) {
      return false;
    }
    if (key !== "ref") {
      const val2 = object2[key];
      if (isDateObject(val1) && isDateObject(val2) || isObject(val1) && isObject(val2) || Array.isArray(val1) && Array.isArray(val2) ? !deepEqual(val1, val2) : val1 !== val2) {
        return false;
      }
    }
  }
  return true;
}
var isEmptyObject = (value) => isObject(value) && !Object.keys(value).length;
var isFileInput = (element) => element.type === "file";
var isFunction = (value) => typeof value === "function";
var isHTMLElement = (value) => {
  if (!isWeb) {
    return false;
  }
  const owner = value ? value.ownerDocument : 0;
  return value instanceof (owner && owner.defaultView ? owner.defaultView.HTMLElement : HTMLElement);
};
var isMultipleSelect = (element) => element.type === `select-multiple`;
var isRadioInput = (element) => element.type === "radio";
var isRadioOrCheckbox = (ref) => isRadioInput(ref) || isCheckBoxInput(ref);
var live = (ref) => isHTMLElement(ref) && ref.isConnected;
function baseGet(object, updatePath) {
  const length = updatePath.slice(0, -1).length;
  let index = 0;
  while (index < length) {
    object = isUndefined(object) ? index++ : object[updatePath[index++]];
  }
  return object;
}
function isEmptyArray(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !isUndefined(obj[key])) {
      return false;
    }
  }
  return true;
}
function unset(object, path) {
  const paths = Array.isArray(path) ? path : isKey(path) ? [path] : stringToPath(path);
  const childObject = paths.length === 1 ? object : baseGet(object, paths);
  const index = paths.length - 1;
  const key = paths[index];
  if (childObject) {
    delete childObject[key];
  }
  if (index !== 0 && (isObject(childObject) && isEmptyObject(childObject) || Array.isArray(childObject) && isEmptyArray(childObject))) {
    unset(object, paths.slice(0, -1));
  }
  return object;
}
var objectHasFunction = (data) => {
  for (const key in data) {
    if (isFunction(data[key])) {
      return true;
    }
  }
  return false;
};
function markFieldsDirty(data, fields = {}) {
  const isParentNodeArray = Array.isArray(data);
  if (isObject(data) || isParentNodeArray) {
    for (const key in data) {
      if (Array.isArray(data[key]) || isObject(data[key]) && !objectHasFunction(data[key])) {
        fields[key] = Array.isArray(data[key]) ? [] : {};
        markFieldsDirty(data[key], fields[key]);
      } else if (!isNullOrUndefined(data[key])) {
        fields[key] = true;
      }
    }
  }
  return fields;
}
function getDirtyFieldsFromDefaultValues(data, formValues, dirtyFieldsFromValues) {
  const isParentNodeArray = Array.isArray(data);
  if (isObject(data) || isParentNodeArray) {
    for (const key in data) {
      if (Array.isArray(data[key]) || isObject(data[key]) && !objectHasFunction(data[key])) {
        if (isUndefined(formValues) || isPrimitive2(dirtyFieldsFromValues[key])) {
          dirtyFieldsFromValues[key] = Array.isArray(data[key]) ? markFieldsDirty(data[key], []) : { ...markFieldsDirty(data[key]) };
        } else {
          getDirtyFieldsFromDefaultValues(data[key], isNullOrUndefined(formValues) ? {} : formValues[key], dirtyFieldsFromValues[key]);
        }
      } else {
        dirtyFieldsFromValues[key] = !deepEqual(data[key], formValues[key]);
      }
    }
  }
  return dirtyFieldsFromValues;
}
var getDirtyFields = (defaultValues, formValues) => getDirtyFieldsFromDefaultValues(defaultValues, formValues, markFieldsDirty(formValues));
var defaultResult = {
  value: false,
  isValid: false
};
var validResult = { value: true, isValid: true };
var getCheckboxValue = (options) => {
  if (Array.isArray(options)) {
    if (options.length > 1) {
      const values = options.filter((option) => option && option.checked && !option.disabled).map((option) => option.value);
      return { value: values, isValid: !!values.length };
    }
    return options[0].checked && !options[0].disabled ? (
      // @ts-expect-error expected to work in the browser
      options[0].attributes && !isUndefined(options[0].attributes.value) ? isUndefined(options[0].value) || options[0].value === "" ? validResult : { value: options[0].value, isValid: true } : validResult
    ) : defaultResult;
  }
  return defaultResult;
};
var getFieldValueAs = (value, { valueAsNumber, valueAsDate, setValueAs }) => isUndefined(value) ? value : valueAsNumber ? value === "" ? NaN : value ? +value : value : valueAsDate && isString(value) ? new Date(value) : setValueAs ? setValueAs(value) : value;
var defaultReturn = {
  isValid: false,
  value: null
};
var getRadioValue = (options) => Array.isArray(options) ? options.reduce((previous, option) => option && option.checked && !option.disabled ? {
  isValid: true,
  value: option.value
} : previous, defaultReturn) : defaultReturn;
function getFieldValue(_f) {
  const ref = _f.ref;
  if (isFileInput(ref)) {
    return ref.files;
  }
  if (isRadioInput(ref)) {
    return getRadioValue(_f.refs).value;
  }
  if (isMultipleSelect(ref)) {
    return [...ref.selectedOptions].map(({ value }) => value);
  }
  if (isCheckBoxInput(ref)) {
    return getCheckboxValue(_f.refs).value;
  }
  return getFieldValueAs(isUndefined(ref.value) ? _f.ref.value : ref.value, _f);
}
var getResolverOptions = (fieldsNames, _fields, criteriaMode, shouldUseNativeValidation) => {
  const fields = {};
  for (const name of fieldsNames) {
    const field = get(_fields, name);
    field && set(fields, name, field._f);
  }
  return {
    criteriaMode,
    names: [...fieldsNames],
    fields,
    shouldUseNativeValidation
  };
};
var isRegex = (value) => value instanceof RegExp;
var getRuleValue = (rule) => isUndefined(rule) ? rule : isRegex(rule) ? rule.source : isObject(rule) ? isRegex(rule.value) ? rule.value.source : rule.value : rule;
var getValidationModes = (mode) => ({
  isOnSubmit: !mode || mode === VALIDATION_MODE.onSubmit,
  isOnBlur: mode === VALIDATION_MODE.onBlur,
  isOnChange: mode === VALIDATION_MODE.onChange,
  isOnAll: mode === VALIDATION_MODE.all,
  isOnTouch: mode === VALIDATION_MODE.onTouched
});
var ASYNC_FUNCTION = "AsyncFunction";
var hasPromiseValidation = (fieldReference) => !!fieldReference && !!fieldReference.validate && !!(isFunction(fieldReference.validate) && fieldReference.validate.constructor.name === ASYNC_FUNCTION || isObject(fieldReference.validate) && Object.values(fieldReference.validate).find((validateFunction) => validateFunction.constructor.name === ASYNC_FUNCTION));
var hasValidation = (options) => options.mount && (options.required || options.min || options.max || options.maxLength || options.minLength || options.pattern || options.validate);
var isWatched = (name, _names, isBlurEvent) => !isBlurEvent && (_names.watchAll || _names.watch.has(name) || [..._names.watch].some((watchName) => name.startsWith(watchName) && /^\.\w+/.test(name.slice(watchName.length))));
var iterateFieldsByAction = (fields, action, fieldsNames, abortEarly) => {
  for (const key of fieldsNames || Object.keys(fields)) {
    const field = get(fields, key);
    if (field) {
      const { _f, ...currentField } = field;
      if (_f) {
        if (_f.refs && _f.refs[0] && action(_f.refs[0], key) && !abortEarly) {
          return true;
        } else if (_f.ref && action(_f.ref, _f.name) && !abortEarly) {
          return true;
        } else {
          if (iterateFieldsByAction(currentField, action)) {
            break;
          }
        }
      } else if (isObject(currentField)) {
        if (iterateFieldsByAction(currentField, action)) {
          break;
        }
      }
    }
  }
  return;
};
function schemaErrorLookup(errors, _fields, name) {
  const error = get(errors, name);
  if (error || isKey(name)) {
    return {
      error,
      name
    };
  }
  const names = name.split(".");
  while (names.length) {
    const fieldName = names.join(".");
    const field = get(_fields, fieldName);
    const foundError = get(errors, fieldName);
    if (field && !Array.isArray(field) && name !== fieldName) {
      return { name };
    }
    if (foundError && foundError.type) {
      return {
        name: fieldName,
        error: foundError
      };
    }
    names.pop();
  }
  return {
    name
  };
}
var shouldRenderFormState = (formStateData, _proxyFormState, updateFormState, isRoot) => {
  updateFormState(formStateData);
  const { name, ...formState } = formStateData;
  return isEmptyObject(formState) || Object.keys(formState).length >= Object.keys(_proxyFormState).length || Object.keys(formState).find((key) => _proxyFormState[key] === (!isRoot || VALIDATION_MODE.all));
};
var shouldSubscribeByName = (name, signalName, exact) => !name || !signalName || name === signalName || convertToArrayPayload(name).some((currentName) => currentName && (exact ? currentName === signalName : currentName.startsWith(signalName) || signalName.startsWith(currentName)));
var skipValidation = (isBlurEvent, isTouched, isSubmitted, reValidateMode, mode) => {
  if (mode.isOnAll) {
    return false;
  } else if (!isSubmitted && mode.isOnTouch) {
    return !(isTouched || isBlurEvent);
  } else if (isSubmitted ? reValidateMode.isOnBlur : mode.isOnBlur) {
    return !isBlurEvent;
  } else if (isSubmitted ? reValidateMode.isOnChange : mode.isOnChange) {
    return isBlurEvent;
  }
  return true;
};
var unsetEmptyArray = (ref, name) => !compact(get(ref, name)).length && unset(ref, name);
var updateFieldArrayRootError = (errors, error, name) => {
  const fieldArrayErrors = convertToArrayPayload(get(errors, name));
  set(fieldArrayErrors, "root", error[name]);
  set(errors, name, fieldArrayErrors);
  return errors;
};
var isMessage = (value) => isString(value);
function getValidateError(result, ref, type = "validate") {
  if (isMessage(result) || Array.isArray(result) && result.every(isMessage) || isBoolean(result) && !result) {
    return {
      type,
      message: isMessage(result) ? result : "",
      ref
    };
  }
}
var getValueAndMessage = (validationData) => isObject(validationData) && !isRegex(validationData) ? validationData : {
  value: validationData,
  message: ""
};
var validateField = async (field, disabledFieldNames, formValues, validateAllFieldCriteria, shouldUseNativeValidation, isFieldArray) => {
  const { ref, refs, required, maxLength, minLength, min, max, pattern, validate: validate2, name, valueAsNumber, mount } = field._f;
  const inputValue = get(formValues, name);
  if (!mount || disabledFieldNames.has(name)) {
    return {};
  }
  const inputRef = refs ? refs[0] : ref;
  const setCustomValidity = (message) => {
    if (shouldUseNativeValidation && inputRef.reportValidity) {
      inputRef.setCustomValidity(isBoolean(message) ? "" : message || "");
      inputRef.reportValidity();
    }
  };
  const error = {};
  const isRadio = isRadioInput(ref);
  const isCheckBox = isCheckBoxInput(ref);
  const isRadioOrCheckbox2 = isRadio || isCheckBox;
  const isEmpty = (valueAsNumber || isFileInput(ref)) && isUndefined(ref.value) && isUndefined(inputValue) || isHTMLElement(ref) && ref.value === "" || inputValue === "" || Array.isArray(inputValue) && !inputValue.length;
  const appendErrorsCurry = appendErrors.bind(null, name, validateAllFieldCriteria, error);
  const getMinMaxMessage = (exceedMax, maxLengthMessage, minLengthMessage, maxType = INPUT_VALIDATION_RULES.maxLength, minType = INPUT_VALIDATION_RULES.minLength) => {
    const message = exceedMax ? maxLengthMessage : minLengthMessage;
    error[name] = {
      type: exceedMax ? maxType : minType,
      message,
      ref,
      ...appendErrorsCurry(exceedMax ? maxType : minType, message)
    };
  };
  if (isFieldArray ? !Array.isArray(inputValue) || !inputValue.length : required && (!isRadioOrCheckbox2 && (isEmpty || isNullOrUndefined(inputValue)) || isBoolean(inputValue) && !inputValue || isCheckBox && !getCheckboxValue(refs).isValid || isRadio && !getRadioValue(refs).isValid)) {
    const { value, message } = isMessage(required) ? { value: !!required, message: required } : getValueAndMessage(required);
    if (value) {
      error[name] = {
        type: INPUT_VALIDATION_RULES.required,
        message,
        ref: inputRef,
        ...appendErrorsCurry(INPUT_VALIDATION_RULES.required, message)
      };
      if (!validateAllFieldCriteria) {
        setCustomValidity(message);
        return error;
      }
    }
  }
  if (!isEmpty && (!isNullOrUndefined(min) || !isNullOrUndefined(max))) {
    let exceedMax;
    let exceedMin;
    const maxOutput = getValueAndMessage(max);
    const minOutput = getValueAndMessage(min);
    if (!isNullOrUndefined(inputValue) && !isNaN(inputValue)) {
      const valueNumber = ref.valueAsNumber || (inputValue ? +inputValue : inputValue);
      if (!isNullOrUndefined(maxOutput.value)) {
        exceedMax = valueNumber > maxOutput.value;
      }
      if (!isNullOrUndefined(minOutput.value)) {
        exceedMin = valueNumber < minOutput.value;
      }
    } else {
      const valueDate = ref.valueAsDate || new Date(inputValue);
      const convertTimeToDate = (time) => /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).toDateString() + " " + time);
      const isTime = ref.type == "time";
      const isWeek = ref.type == "week";
      if (isString(maxOutput.value) && inputValue) {
        exceedMax = isTime ? convertTimeToDate(inputValue) > convertTimeToDate(maxOutput.value) : isWeek ? inputValue > maxOutput.value : valueDate > new Date(maxOutput.value);
      }
      if (isString(minOutput.value) && inputValue) {
        exceedMin = isTime ? convertTimeToDate(inputValue) < convertTimeToDate(minOutput.value) : isWeek ? inputValue < minOutput.value : valueDate < new Date(minOutput.value);
      }
    }
    if (exceedMax || exceedMin) {
      getMinMaxMessage(!!exceedMax, maxOutput.message, minOutput.message, INPUT_VALIDATION_RULES.max, INPUT_VALIDATION_RULES.min);
      if (!validateAllFieldCriteria) {
        setCustomValidity(error[name].message);
        return error;
      }
    }
  }
  if ((maxLength || minLength) && !isEmpty && (isString(inputValue) || isFieldArray && Array.isArray(inputValue))) {
    const maxLengthOutput = getValueAndMessage(maxLength);
    const minLengthOutput = getValueAndMessage(minLength);
    const exceedMax = !isNullOrUndefined(maxLengthOutput.value) && inputValue.length > +maxLengthOutput.value;
    const exceedMin = !isNullOrUndefined(minLengthOutput.value) && inputValue.length < +minLengthOutput.value;
    if (exceedMax || exceedMin) {
      getMinMaxMessage(exceedMax, maxLengthOutput.message, minLengthOutput.message);
      if (!validateAllFieldCriteria) {
        setCustomValidity(error[name].message);
        return error;
      }
    }
  }
  if (pattern && !isEmpty && isString(inputValue)) {
    const { value: patternValue, message } = getValueAndMessage(pattern);
    if (isRegex(patternValue) && !inputValue.match(patternValue)) {
      error[name] = {
        type: INPUT_VALIDATION_RULES.pattern,
        message,
        ref,
        ...appendErrorsCurry(INPUT_VALIDATION_RULES.pattern, message)
      };
      if (!validateAllFieldCriteria) {
        setCustomValidity(message);
        return error;
      }
    }
  }
  if (validate2) {
    if (isFunction(validate2)) {
      const result = await validate2(inputValue, formValues);
      const validateError = getValidateError(result, inputRef);
      if (validateError) {
        error[name] = {
          ...validateError,
          ...appendErrorsCurry(INPUT_VALIDATION_RULES.validate, validateError.message)
        };
        if (!validateAllFieldCriteria) {
          setCustomValidity(validateError.message);
          return error;
        }
      }
    } else if (isObject(validate2)) {
      let validationResult = {};
      for (const key in validate2) {
        if (!isEmptyObject(validationResult) && !validateAllFieldCriteria) {
          break;
        }
        const validateError = getValidateError(await validate2[key](inputValue, formValues), inputRef, key);
        if (validateError) {
          validationResult = {
            ...validateError,
            ...appendErrorsCurry(key, validateError.message)
          };
          setCustomValidity(validateError.message);
          if (validateAllFieldCriteria) {
            error[name] = validationResult;
          }
        }
      }
      if (!isEmptyObject(validationResult)) {
        error[name] = {
          ref: inputRef,
          ...validationResult
        };
        if (!validateAllFieldCriteria) {
          return error;
        }
      }
    }
  }
  setCustomValidity(true);
  return error;
};
var defaultOptions = {
  mode: VALIDATION_MODE.onSubmit,
  reValidateMode: VALIDATION_MODE.onChange,
  shouldFocusError: true
};
function createFormControl(props = {}) {
  let _options = {
    ...defaultOptions,
    ...props
  };
  let _formState = {
    submitCount: 0,
    isDirty: false,
    isLoading: isFunction(_options.defaultValues),
    isValidating: false,
    isSubmitted: false,
    isSubmitting: false,
    isSubmitSuccessful: false,
    isValid: false,
    touchedFields: {},
    dirtyFields: {},
    validatingFields: {},
    errors: _options.errors || {},
    disabled: _options.disabled || false
  };
  const _fields = {};
  let _defaultValues = isObject(_options.defaultValues) || isObject(_options.values) ? cloneObject(_options.values || _options.defaultValues) || {} : {};
  let _formValues = _options.shouldUnregister ? {} : cloneObject(_defaultValues);
  let _state = {
    action: false,
    mount: false,
    watch: false
  };
  let _names = {
    mount: /* @__PURE__ */ new Set(),
    disabled: /* @__PURE__ */ new Set(),
    unMount: /* @__PURE__ */ new Set(),
    array: /* @__PURE__ */ new Set(),
    watch: /* @__PURE__ */ new Set()
  };
  let delayErrorCallback;
  let timer = 0;
  const _proxyFormState = {
    isDirty: false,
    dirtyFields: false,
    validatingFields: false,
    touchedFields: false,
    isValidating: false,
    isValid: false,
    errors: false
  };
  let _proxySubscribeFormState = {
    ..._proxyFormState
  };
  const _subjects = {
    array: createSubject(),
    state: createSubject()
  };
  const validationModeBeforeSubmit = getValidationModes(_options.mode);
  const validationModeAfterSubmit = getValidationModes(_options.reValidateMode);
  const shouldDisplayAllAssociatedErrors = _options.criteriaMode === VALIDATION_MODE.all;
  const debounce = (callback) => (wait) => {
    clearTimeout(timer);
    timer = setTimeout(callback, wait);
  };
  const _setValid = async (shouldUpdateValid) => {
    if (!_options.disabled && (_proxyFormState.isValid || _proxySubscribeFormState.isValid || shouldUpdateValid)) {
      const isValid = _options.resolver ? isEmptyObject((await _runSchema()).errors) : await executeBuiltInValidation(_fields, true);
      if (isValid !== _formState.isValid) {
        _subjects.state.next({
          isValid
        });
      }
    }
  };
  const _updateIsValidating = (names, isValidating) => {
    if (!_options.disabled && (_proxyFormState.isValidating || _proxyFormState.validatingFields || _proxySubscribeFormState.isValidating || _proxySubscribeFormState.validatingFields)) {
      (names || Array.from(_names.mount)).forEach((name) => {
        if (name) {
          isValidating ? set(_formState.validatingFields, name, isValidating) : unset(_formState.validatingFields, name);
        }
      });
      _subjects.state.next({
        validatingFields: _formState.validatingFields,
        isValidating: !isEmptyObject(_formState.validatingFields)
      });
    }
  };
  const _setFieldArray = (name, values = [], method, args, shouldSetValues = true, shouldUpdateFieldsAndState = true) => {
    if (args && method && !_options.disabled) {
      _state.action = true;
      if (shouldUpdateFieldsAndState && Array.isArray(get(_fields, name))) {
        const fieldValues = method(get(_fields, name), args.argA, args.argB);
        shouldSetValues && set(_fields, name, fieldValues);
      }
      if (shouldUpdateFieldsAndState && Array.isArray(get(_formState.errors, name))) {
        const errors = method(get(_formState.errors, name), args.argA, args.argB);
        shouldSetValues && set(_formState.errors, name, errors);
        unsetEmptyArray(_formState.errors, name);
      }
      if ((_proxyFormState.touchedFields || _proxySubscribeFormState.touchedFields) && shouldUpdateFieldsAndState && Array.isArray(get(_formState.touchedFields, name))) {
        const touchedFields = method(get(_formState.touchedFields, name), args.argA, args.argB);
        shouldSetValues && set(_formState.touchedFields, name, touchedFields);
      }
      if (_proxyFormState.dirtyFields || _proxySubscribeFormState.dirtyFields) {
        _formState.dirtyFields = getDirtyFields(_defaultValues, _formValues);
      }
      _subjects.state.next({
        name,
        isDirty: _getDirty(name, values),
        dirtyFields: _formState.dirtyFields,
        errors: _formState.errors,
        isValid: _formState.isValid
      });
    } else {
      set(_formValues, name, values);
    }
  };
  const updateErrors = (name, error) => {
    set(_formState.errors, name, error);
    _subjects.state.next({
      errors: _formState.errors
    });
  };
  const _setErrors = (errors) => {
    _formState.errors = errors;
    _subjects.state.next({
      errors: _formState.errors,
      isValid: false
    });
  };
  const updateValidAndValue = (name, shouldSkipSetValueAs, value, ref) => {
    const field = get(_fields, name);
    if (field) {
      const defaultValue = get(_formValues, name, isUndefined(value) ? get(_defaultValues, name) : value);
      isUndefined(defaultValue) || ref && ref.defaultChecked || shouldSkipSetValueAs ? set(_formValues, name, shouldSkipSetValueAs ? defaultValue : getFieldValue(field._f)) : setFieldValue(name, defaultValue);
      _state.mount && _setValid();
    }
  };
  const updateTouchAndDirty = (name, fieldValue, isBlurEvent, shouldDirty, shouldRender) => {
    let shouldUpdateField = false;
    let isPreviousDirty = false;
    const output = {
      name
    };
    if (!_options.disabled) {
      if (!isBlurEvent || shouldDirty) {
        if (_proxyFormState.isDirty || _proxySubscribeFormState.isDirty) {
          isPreviousDirty = _formState.isDirty;
          _formState.isDirty = output.isDirty = _getDirty();
          shouldUpdateField = isPreviousDirty !== output.isDirty;
        }
        const isCurrentFieldPristine = deepEqual(get(_defaultValues, name), fieldValue);
        isPreviousDirty = !!get(_formState.dirtyFields, name);
        isCurrentFieldPristine ? unset(_formState.dirtyFields, name) : set(_formState.dirtyFields, name, true);
        output.dirtyFields = _formState.dirtyFields;
        shouldUpdateField = shouldUpdateField || (_proxyFormState.dirtyFields || _proxySubscribeFormState.dirtyFields) && isPreviousDirty !== !isCurrentFieldPristine;
      }
      if (isBlurEvent) {
        const isPreviousFieldTouched = get(_formState.touchedFields, name);
        if (!isPreviousFieldTouched) {
          set(_formState.touchedFields, name, isBlurEvent);
          output.touchedFields = _formState.touchedFields;
          shouldUpdateField = shouldUpdateField || (_proxyFormState.touchedFields || _proxySubscribeFormState.touchedFields) && isPreviousFieldTouched !== isBlurEvent;
        }
      }
      shouldUpdateField && shouldRender && _subjects.state.next(output);
    }
    return shouldUpdateField ? output : {};
  };
  const shouldRenderByError = (name, isValid, error, fieldState) => {
    const previousFieldError = get(_formState.errors, name);
    const shouldUpdateValid = (_proxyFormState.isValid || _proxySubscribeFormState.isValid) && isBoolean(isValid) && _formState.isValid !== isValid;
    if (_options.delayError && error) {
      delayErrorCallback = debounce(() => updateErrors(name, error));
      delayErrorCallback(_options.delayError);
    } else {
      clearTimeout(timer);
      delayErrorCallback = null;
      error ? set(_formState.errors, name, error) : unset(_formState.errors, name);
    }
    if ((error ? !deepEqual(previousFieldError, error) : previousFieldError) || !isEmptyObject(fieldState) || shouldUpdateValid) {
      const updatedFormState = {
        ...fieldState,
        ...shouldUpdateValid && isBoolean(isValid) ? { isValid } : {},
        errors: _formState.errors,
        name
      };
      _formState = {
        ..._formState,
        ...updatedFormState
      };
      _subjects.state.next(updatedFormState);
    }
  };
  const _runSchema = async (name) => {
    _updateIsValidating(name, true);
    const result = await _options.resolver(_formValues, _options.context, getResolverOptions(name || _names.mount, _fields, _options.criteriaMode, _options.shouldUseNativeValidation));
    _updateIsValidating(name);
    return result;
  };
  const executeSchemaAndUpdateState = async (names) => {
    const { errors } = await _runSchema(names);
    if (names) {
      for (const name of names) {
        const error = get(errors, name);
        error ? set(_formState.errors, name, error) : unset(_formState.errors, name);
      }
    } else {
      _formState.errors = errors;
    }
    return errors;
  };
  const executeBuiltInValidation = async (fields, shouldOnlyCheckValid, context = {
    valid: true
  }) => {
    for (const name in fields) {
      const field = fields[name];
      if (field) {
        const { _f, ...fieldValue } = field;
        if (_f) {
          const isFieldArrayRoot = _names.array.has(_f.name);
          const isPromiseFunction = field._f && hasPromiseValidation(field._f);
          if (isPromiseFunction && _proxyFormState.validatingFields) {
            _updateIsValidating([name], true);
          }
          const fieldError = await validateField(field, _names.disabled, _formValues, shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation && !shouldOnlyCheckValid, isFieldArrayRoot);
          if (isPromiseFunction && _proxyFormState.validatingFields) {
            _updateIsValidating([name]);
          }
          if (fieldError[_f.name]) {
            context.valid = false;
            if (shouldOnlyCheckValid) {
              break;
            }
          }
          !shouldOnlyCheckValid && (get(fieldError, _f.name) ? isFieldArrayRoot ? updateFieldArrayRootError(_formState.errors, fieldError, _f.name) : set(_formState.errors, _f.name, fieldError[_f.name]) : unset(_formState.errors, _f.name));
        }
        !isEmptyObject(fieldValue) && await executeBuiltInValidation(fieldValue, shouldOnlyCheckValid, context);
      }
    }
    return context.valid;
  };
  const _removeUnmounted = () => {
    for (const name of _names.unMount) {
      const field = get(_fields, name);
      field && (field._f.refs ? field._f.refs.every((ref) => !live(ref)) : !live(field._f.ref)) && unregister(name);
    }
    _names.unMount = /* @__PURE__ */ new Set();
  };
  const _getDirty = (name, data) => !_options.disabled && (name && data && set(_formValues, name, data), !deepEqual(getValues(), _defaultValues));
  const _getWatch = (names, defaultValue, isGlobal) => generateWatchOutput(names, _names, {
    ..._state.mount ? _formValues : isUndefined(defaultValue) ? _defaultValues : isString(names) ? { [names]: defaultValue } : defaultValue
  }, isGlobal, defaultValue);
  const _getFieldArray = (name) => compact(get(_state.mount ? _formValues : _defaultValues, name, _options.shouldUnregister ? get(_defaultValues, name, []) : []));
  const setFieldValue = (name, value, options = {}) => {
    const field = get(_fields, name);
    let fieldValue = value;
    if (field) {
      const fieldReference = field._f;
      if (fieldReference) {
        !fieldReference.disabled && set(_formValues, name, getFieldValueAs(value, fieldReference));
        fieldValue = isHTMLElement(fieldReference.ref) && isNullOrUndefined(value) ? "" : value;
        if (isMultipleSelect(fieldReference.ref)) {
          [...fieldReference.ref.options].forEach((optionRef) => optionRef.selected = fieldValue.includes(optionRef.value));
        } else if (fieldReference.refs) {
          if (isCheckBoxInput(fieldReference.ref)) {
            fieldReference.refs.length > 1 ? fieldReference.refs.forEach((checkboxRef) => (!checkboxRef.defaultChecked || !checkboxRef.disabled) && (checkboxRef.checked = Array.isArray(fieldValue) ? !!fieldValue.find((data) => data === checkboxRef.value) : fieldValue === checkboxRef.value)) : fieldReference.refs[0] && (fieldReference.refs[0].checked = !!fieldValue);
          } else {
            fieldReference.refs.forEach((radioRef) => radioRef.checked = radioRef.value === fieldValue);
          }
        } else if (isFileInput(fieldReference.ref)) {
          fieldReference.ref.value = "";
        } else {
          fieldReference.ref.value = fieldValue;
          if (!fieldReference.ref.type) {
            _subjects.state.next({
              name,
              values: cloneObject(_formValues)
            });
          }
        }
      }
    }
    (options.shouldDirty || options.shouldTouch) && updateTouchAndDirty(name, fieldValue, options.shouldTouch, options.shouldDirty, true);
    options.shouldValidate && trigger(name);
  };
  const setValues = (name, value, options) => {
    for (const fieldKey in value) {
      const fieldValue = value[fieldKey];
      const fieldName = `${name}.${fieldKey}`;
      const field = get(_fields, fieldName);
      (_names.array.has(name) || isObject(fieldValue) || field && !field._f) && !isDateObject(fieldValue) ? setValues(fieldName, fieldValue, options) : setFieldValue(fieldName, fieldValue, options);
    }
  };
  const setValue = (name, value, options = {}) => {
    const field = get(_fields, name);
    const isFieldArray = _names.array.has(name);
    const cloneValue = cloneObject(value);
    set(_formValues, name, cloneValue);
    if (isFieldArray) {
      _subjects.array.next({
        name,
        values: cloneObject(_formValues)
      });
      if ((_proxyFormState.isDirty || _proxyFormState.dirtyFields || _proxySubscribeFormState.isDirty || _proxySubscribeFormState.dirtyFields) && options.shouldDirty) {
        _subjects.state.next({
          name,
          dirtyFields: getDirtyFields(_defaultValues, _formValues),
          isDirty: _getDirty(name, cloneValue)
        });
      }
    } else {
      field && !field._f && !isNullOrUndefined(cloneValue) ? setValues(name, cloneValue, options) : setFieldValue(name, cloneValue, options);
    }
    isWatched(name, _names) && _subjects.state.next({ ..._formState });
    _subjects.state.next({
      name: _state.mount ? name : void 0,
      values: cloneObject(_formValues)
    });
  };
  const onChange = async (event) => {
    _state.mount = true;
    const target = event.target;
    let name = target.name;
    let isFieldValueUpdated = true;
    const field = get(_fields, name);
    const _updateIsFieldValueUpdated = (fieldValue) => {
      isFieldValueUpdated = Number.isNaN(fieldValue) || isDateObject(fieldValue) && isNaN(fieldValue.getTime()) || deepEqual(fieldValue, get(_formValues, name, fieldValue));
    };
    if (field) {
      let error;
      let isValid;
      const fieldValue = target.type ? getFieldValue(field._f) : getEventValue(event);
      const isBlurEvent = event.type === EVENTS.BLUR || event.type === EVENTS.FOCUS_OUT;
      const shouldSkipValidation = !hasValidation(field._f) && !_options.resolver && !get(_formState.errors, name) && !field._f.deps || skipValidation(isBlurEvent, get(_formState.touchedFields, name), _formState.isSubmitted, validationModeAfterSubmit, validationModeBeforeSubmit);
      const watched = isWatched(name, _names, isBlurEvent);
      set(_formValues, name, fieldValue);
      if (isBlurEvent) {
        field._f.onBlur && field._f.onBlur(event);
        delayErrorCallback && delayErrorCallback(0);
      } else if (field._f.onChange) {
        field._f.onChange(event);
      }
      const fieldState = updateTouchAndDirty(name, fieldValue, isBlurEvent);
      const shouldRender = !isEmptyObject(fieldState) || watched;
      !isBlurEvent && _subjects.state.next({
        name,
        type: event.type,
        values: cloneObject(_formValues)
      });
      if (shouldSkipValidation) {
        if (_proxyFormState.isValid || _proxySubscribeFormState.isValid) {
          if (_options.mode === "onBlur") {
            if (isBlurEvent) {
              _setValid();
            }
          } else if (!isBlurEvent) {
            _setValid();
          }
        }
        return shouldRender && _subjects.state.next({ name, ...watched ? {} : fieldState });
      }
      !isBlurEvent && watched && _subjects.state.next({ ..._formState });
      if (_options.resolver) {
        const { errors } = await _runSchema([name]);
        _updateIsFieldValueUpdated(fieldValue);
        if (isFieldValueUpdated) {
          const previousErrorLookupResult = schemaErrorLookup(_formState.errors, _fields, name);
          const errorLookupResult = schemaErrorLookup(errors, _fields, previousErrorLookupResult.name || name);
          error = errorLookupResult.error;
          name = errorLookupResult.name;
          isValid = isEmptyObject(errors);
        }
      } else {
        _updateIsValidating([name], true);
        error = (await validateField(field, _names.disabled, _formValues, shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation))[name];
        _updateIsValidating([name]);
        _updateIsFieldValueUpdated(fieldValue);
        if (isFieldValueUpdated) {
          if (error) {
            isValid = false;
          } else if (_proxyFormState.isValid || _proxySubscribeFormState.isValid) {
            isValid = await executeBuiltInValidation(_fields, true);
          }
        }
      }
      if (isFieldValueUpdated) {
        field._f.deps && trigger(field._f.deps);
        shouldRenderByError(name, isValid, error, fieldState);
      }
    }
  };
  const _focusInput = (ref, key) => {
    if (get(_formState.errors, key) && ref.focus) {
      ref.focus();
      return 1;
    }
    return;
  };
  const trigger = async (name, options = {}) => {
    let isValid;
    let validationResult;
    const fieldNames = convertToArrayPayload(name);
    if (_options.resolver) {
      const errors = await executeSchemaAndUpdateState(isUndefined(name) ? name : fieldNames);
      isValid = isEmptyObject(errors);
      validationResult = name ? !fieldNames.some((name2) => get(errors, name2)) : isValid;
    } else if (name) {
      validationResult = (await Promise.all(fieldNames.map(async (fieldName) => {
        const field = get(_fields, fieldName);
        return await executeBuiltInValidation(field && field._f ? { [fieldName]: field } : field);
      }))).every(Boolean);
      !(!validationResult && !_formState.isValid) && _setValid();
    } else {
      validationResult = isValid = await executeBuiltInValidation(_fields);
    }
    _subjects.state.next({
      ...!isString(name) || (_proxyFormState.isValid || _proxySubscribeFormState.isValid) && isValid !== _formState.isValid ? {} : { name },
      ..._options.resolver || !name ? { isValid } : {},
      errors: _formState.errors
    });
    options.shouldFocus && !validationResult && iterateFieldsByAction(_fields, _focusInput, name ? fieldNames : _names.mount);
    return validationResult;
  };
  const getValues = (fieldNames) => {
    const values = {
      ..._state.mount ? _formValues : _defaultValues
    };
    return isUndefined(fieldNames) ? values : isString(fieldNames) ? get(values, fieldNames) : fieldNames.map((name) => get(values, name));
  };
  const getFieldState = (name, formState) => ({
    invalid: !!get((formState || _formState).errors, name),
    isDirty: !!get((formState || _formState).dirtyFields, name),
    error: get((formState || _formState).errors, name),
    isValidating: !!get(_formState.validatingFields, name),
    isTouched: !!get((formState || _formState).touchedFields, name)
  });
  const clearErrors = (name) => {
    name && convertToArrayPayload(name).forEach((inputName) => unset(_formState.errors, inputName));
    _subjects.state.next({
      errors: name ? _formState.errors : {}
    });
  };
  const setError = (name, error, options) => {
    const ref = (get(_fields, name, { _f: {} })._f || {}).ref;
    const currentError = get(_formState.errors, name) || {};
    const { ref: currentRef, message, type, ...restOfErrorTree } = currentError;
    set(_formState.errors, name, {
      ...restOfErrorTree,
      ...error,
      ref
    });
    _subjects.state.next({
      name,
      errors: _formState.errors,
      isValid: false
    });
    options && options.shouldFocus && ref && ref.focus && ref.focus();
  };
  const watch = (name, defaultValue) => isFunction(name) ? _subjects.state.subscribe({
    next: (payload) => name(_getWatch(void 0, defaultValue), payload)
  }) : _getWatch(name, defaultValue, true);
  const _subscribe = (props2) => _subjects.state.subscribe({
    next: (formState) => {
      if (shouldSubscribeByName(props2.name, formState.name, props2.exact) && shouldRenderFormState(formState, props2.formState || _proxyFormState, _setFormState, props2.reRenderRoot)) {
        props2.callback({
          values: { ..._formValues },
          ..._formState,
          ...formState
        });
      }
    }
  }).unsubscribe;
  const subscribe = (props2) => {
    _state.mount = true;
    _proxySubscribeFormState = {
      ..._proxySubscribeFormState,
      ...props2.formState
    };
    return _subscribe({
      ...props2,
      formState: _proxySubscribeFormState
    });
  };
  const unregister = (name, options = {}) => {
    for (const fieldName of name ? convertToArrayPayload(name) : _names.mount) {
      _names.mount.delete(fieldName);
      _names.array.delete(fieldName);
      if (!options.keepValue) {
        unset(_fields, fieldName);
        unset(_formValues, fieldName);
      }
      !options.keepError && unset(_formState.errors, fieldName);
      !options.keepDirty && unset(_formState.dirtyFields, fieldName);
      !options.keepTouched && unset(_formState.touchedFields, fieldName);
      !options.keepIsValidating && unset(_formState.validatingFields, fieldName);
      !_options.shouldUnregister && !options.keepDefaultValue && unset(_defaultValues, fieldName);
    }
    _subjects.state.next({
      values: cloneObject(_formValues)
    });
    _subjects.state.next({
      ..._formState,
      ...!options.keepDirty ? {} : { isDirty: _getDirty() }
    });
    !options.keepIsValid && _setValid();
  };
  const _setDisabledField = ({ disabled, name }) => {
    if (isBoolean(disabled) && _state.mount || !!disabled || _names.disabled.has(name)) {
      disabled ? _names.disabled.add(name) : _names.disabled.delete(name);
    }
  };
  const register = (name, options = {}) => {
    let field = get(_fields, name);
    const disabledIsDefined = isBoolean(options.disabled) || isBoolean(_options.disabled);
    set(_fields, name, {
      ...field || {},
      _f: {
        ...field && field._f ? field._f : { ref: { name } },
        name,
        mount: true,
        ...options
      }
    });
    _names.mount.add(name);
    if (field) {
      _setDisabledField({
        disabled: isBoolean(options.disabled) ? options.disabled : _options.disabled,
        name
      });
    } else {
      updateValidAndValue(name, true, options.value);
    }
    return {
      ...disabledIsDefined ? { disabled: options.disabled || _options.disabled } : {},
      ..._options.progressive ? {
        required: !!options.required,
        min: getRuleValue(options.min),
        max: getRuleValue(options.max),
        minLength: getRuleValue(options.minLength),
        maxLength: getRuleValue(options.maxLength),
        pattern: getRuleValue(options.pattern)
      } : {},
      name,
      onChange,
      onBlur: onChange,
      ref: (ref) => {
        if (ref) {
          register(name, options);
          field = get(_fields, name);
          const fieldRef = isUndefined(ref.value) ? ref.querySelectorAll ? ref.querySelectorAll("input,select,textarea")[0] || ref : ref : ref;
          const radioOrCheckbox = isRadioOrCheckbox(fieldRef);
          const refs = field._f.refs || [];
          if (radioOrCheckbox ? refs.find((option) => option === fieldRef) : fieldRef === field._f.ref) {
            return;
          }
          set(_fields, name, {
            _f: {
              ...field._f,
              ...radioOrCheckbox ? {
                refs: [
                  ...refs.filter(live),
                  fieldRef,
                  ...Array.isArray(get(_defaultValues, name)) ? [{}] : []
                ],
                ref: { type: fieldRef.type, name }
              } : { ref: fieldRef }
            }
          });
          updateValidAndValue(name, false, void 0, fieldRef);
        } else {
          field = get(_fields, name, {});
          if (field._f) {
            field._f.mount = false;
          }
          (_options.shouldUnregister || options.shouldUnregister) && !(isNameInFieldArray(_names.array, name) && _state.action) && _names.unMount.add(name);
        }
      }
    };
  };
  const _focusError = () => _options.shouldFocusError && iterateFieldsByAction(_fields, _focusInput, _names.mount);
  const _disableForm = (disabled) => {
    if (isBoolean(disabled)) {
      _subjects.state.next({ disabled });
      iterateFieldsByAction(_fields, (ref, name) => {
        const currentField = get(_fields, name);
        if (currentField) {
          ref.disabled = currentField._f.disabled || disabled;
          if (Array.isArray(currentField._f.refs)) {
            currentField._f.refs.forEach((inputRef) => {
              inputRef.disabled = currentField._f.disabled || disabled;
            });
          }
        }
      }, 0, false);
    }
  };
  const handleSubmit = (onValid, onInvalid) => async (e2) => {
    let onValidError = void 0;
    if (e2) {
      e2.preventDefault && e2.preventDefault();
      e2.persist && e2.persist();
    }
    let fieldValues = cloneObject(_formValues);
    _subjects.state.next({
      isSubmitting: true
    });
    if (_options.resolver) {
      const { errors, values } = await _runSchema();
      _formState.errors = errors;
      fieldValues = values;
    } else {
      await executeBuiltInValidation(_fields);
    }
    if (_names.disabled.size) {
      for (const name of _names.disabled) {
        set(fieldValues, name, void 0);
      }
    }
    unset(_formState.errors, "root");
    if (isEmptyObject(_formState.errors)) {
      _subjects.state.next({
        errors: {}
      });
      try {
        await onValid(fieldValues, e2);
      } catch (error) {
        onValidError = error;
      }
    } else {
      if (onInvalid) {
        await onInvalid({ ..._formState.errors }, e2);
      }
      _focusError();
      setTimeout(_focusError);
    }
    _subjects.state.next({
      isSubmitted: true,
      isSubmitting: false,
      isSubmitSuccessful: isEmptyObject(_formState.errors) && !onValidError,
      submitCount: _formState.submitCount + 1,
      errors: _formState.errors
    });
    if (onValidError) {
      throw onValidError;
    }
  };
  const resetField = (name, options = {}) => {
    if (get(_fields, name)) {
      if (isUndefined(options.defaultValue)) {
        setValue(name, cloneObject(get(_defaultValues, name)));
      } else {
        setValue(name, options.defaultValue);
        set(_defaultValues, name, cloneObject(options.defaultValue));
      }
      if (!options.keepTouched) {
        unset(_formState.touchedFields, name);
      }
      if (!options.keepDirty) {
        unset(_formState.dirtyFields, name);
        _formState.isDirty = options.defaultValue ? _getDirty(name, cloneObject(get(_defaultValues, name))) : _getDirty();
      }
      if (!options.keepError) {
        unset(_formState.errors, name);
        _proxyFormState.isValid && _setValid();
      }
      _subjects.state.next({ ..._formState });
    }
  };
  const _reset = (formValues, keepStateOptions = {}) => {
    const updatedValues = formValues ? cloneObject(formValues) : _defaultValues;
    const cloneUpdatedValues = cloneObject(updatedValues);
    const isEmptyResetValues = isEmptyObject(formValues);
    const values = isEmptyResetValues ? _defaultValues : cloneUpdatedValues;
    if (!keepStateOptions.keepDefaultValues) {
      _defaultValues = updatedValues;
    }
    if (!keepStateOptions.keepValues) {
      if (keepStateOptions.keepDirtyValues) {
        const fieldsToCheck = /* @__PURE__ */ new Set([
          ..._names.mount,
          ...Object.keys(getDirtyFields(_defaultValues, _formValues))
        ]);
        for (const fieldName of Array.from(fieldsToCheck)) {
          get(_formState.dirtyFields, fieldName) ? set(values, fieldName, get(_formValues, fieldName)) : setValue(fieldName, get(values, fieldName));
        }
      } else {
        if (isWeb && isUndefined(formValues)) {
          for (const name of _names.mount) {
            const field = get(_fields, name);
            if (field && field._f) {
              const fieldReference = Array.isArray(field._f.refs) ? field._f.refs[0] : field._f.ref;
              if (isHTMLElement(fieldReference)) {
                const form = fieldReference.closest("form");
                if (form) {
                  form.reset();
                  break;
                }
              }
            }
          }
        }
        for (const fieldName of _names.mount) {
          setValue(fieldName, get(values, fieldName));
        }
      }
      _formValues = cloneObject(values);
      _subjects.array.next({
        values: { ...values }
      });
      _subjects.state.next({
        values: { ...values }
      });
    }
    _names = {
      mount: keepStateOptions.keepDirtyValues ? _names.mount : /* @__PURE__ */ new Set(),
      unMount: /* @__PURE__ */ new Set(),
      array: /* @__PURE__ */ new Set(),
      disabled: /* @__PURE__ */ new Set(),
      watch: /* @__PURE__ */ new Set(),
      watchAll: false,
      focus: ""
    };
    _state.mount = !_proxyFormState.isValid || !!keepStateOptions.keepIsValid || !!keepStateOptions.keepDirtyValues;
    _state.watch = !!_options.shouldUnregister;
    _subjects.state.next({
      submitCount: keepStateOptions.keepSubmitCount ? _formState.submitCount : 0,
      isDirty: isEmptyResetValues ? false : keepStateOptions.keepDirty ? _formState.isDirty : !!(keepStateOptions.keepDefaultValues && !deepEqual(formValues, _defaultValues)),
      isSubmitted: keepStateOptions.keepIsSubmitted ? _formState.isSubmitted : false,
      dirtyFields: isEmptyResetValues ? {} : keepStateOptions.keepDirtyValues ? keepStateOptions.keepDefaultValues && _formValues ? getDirtyFields(_defaultValues, _formValues) : _formState.dirtyFields : keepStateOptions.keepDefaultValues && formValues ? getDirtyFields(_defaultValues, formValues) : keepStateOptions.keepDirty ? _formState.dirtyFields : {},
      touchedFields: keepStateOptions.keepTouched ? _formState.touchedFields : {},
      errors: keepStateOptions.keepErrors ? _formState.errors : {},
      isSubmitSuccessful: keepStateOptions.keepIsSubmitSuccessful ? _formState.isSubmitSuccessful : false,
      isSubmitting: false
    });
  };
  const reset = (formValues, keepStateOptions) => _reset(isFunction(formValues) ? formValues(_formValues) : formValues, keepStateOptions);
  const setFocus = (name, options = {}) => {
    const field = get(_fields, name);
    const fieldReference = field && field._f;
    if (fieldReference) {
      const fieldRef = fieldReference.refs ? fieldReference.refs[0] : fieldReference.ref;
      if (fieldRef.focus) {
        fieldRef.focus();
        options.shouldSelect && isFunction(fieldRef.select) && fieldRef.select();
      }
    }
  };
  const _setFormState = (updatedFormState) => {
    _formState = {
      ..._formState,
      ...updatedFormState
    };
  };
  const _resetDefaultValues = () => isFunction(_options.defaultValues) && _options.defaultValues().then((values) => {
    reset(values, _options.resetOptions);
    _subjects.state.next({
      isLoading: false
    });
  });
  const methods = {
    control: {
      register,
      unregister,
      getFieldState,
      handleSubmit,
      setError,
      _subscribe,
      _runSchema,
      _getWatch,
      _getDirty,
      _setValid,
      _setFieldArray,
      _setDisabledField,
      _setErrors,
      _getFieldArray,
      _reset,
      _resetDefaultValues,
      _removeUnmounted,
      _disableForm,
      _subjects,
      _proxyFormState,
      get _fields() {
        return _fields;
      },
      get _formValues() {
        return _formValues;
      },
      get _state() {
        return _state;
      },
      set _state(value) {
        _state = value;
      },
      get _defaultValues() {
        return _defaultValues;
      },
      get _names() {
        return _names;
      },
      set _names(value) {
        _names = value;
      },
      get _formState() {
        return _formState;
      },
      get _options() {
        return _options;
      },
      set _options(value) {
        _options = {
          ..._options,
          ...value
        };
      }
    },
    subscribe,
    trigger,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    resetField,
    clearErrors,
    unregister,
    setError,
    setFocus,
    getFieldState
  };
  return {
    ...methods,
    formControl: methods
  };
}
function useForm(props = {}) {
  const _formControl = import_react.default.useRef(void 0);
  const _values = import_react.default.useRef(void 0);
  const [formState, updateFormState] = import_react.default.useState({
    isDirty: false,
    isValidating: false,
    isLoading: isFunction(props.defaultValues),
    isSubmitted: false,
    isSubmitting: false,
    isSubmitSuccessful: false,
    isValid: false,
    submitCount: 0,
    dirtyFields: {},
    touchedFields: {},
    validatingFields: {},
    errors: props.errors || {},
    disabled: props.disabled || false,
    defaultValues: isFunction(props.defaultValues) ? void 0 : props.defaultValues
  });
  if (!_formControl.current) {
    _formControl.current = {
      ...props.formControl ? props.formControl : createFormControl(props),
      formState
    };
    if (props.formControl && props.defaultValues && !isFunction(props.defaultValues)) {
      props.formControl.reset(props.defaultValues, props.resetOptions);
    }
  }
  const control = _formControl.current.control;
  control._options = props;
  import_react.default.useLayoutEffect(() => control._subscribe({
    formState: control._proxyFormState,
    callback: () => updateFormState({ ...control._formState }),
    reRenderRoot: true
  }), [control]);
  import_react.default.useEffect(() => control._disableForm(props.disabled), [control, props.disabled]);
  import_react.default.useEffect(() => {
    if (control._proxyFormState.isDirty) {
      const isDirty = control._getDirty();
      if (isDirty !== formState.isDirty) {
        control._subjects.state.next({
          isDirty
        });
      }
    }
  }, [control, formState.isDirty]);
  import_react.default.useEffect(() => {
    if (props.values && !deepEqual(props.values, _values.current)) {
      control._reset(props.values, control._options.resetOptions);
      _values.current = props.values;
      updateFormState((state) => ({ ...state }));
    } else {
      control._resetDefaultValues();
    }
  }, [props.values, control]);
  import_react.default.useEffect(() => {
    if (props.errors && !isEmptyObject(props.errors)) {
      control._setErrors(props.errors);
    }
  }, [props.errors, control]);
  import_react.default.useEffect(() => {
    if (!control._state.mount) {
      control._setValid();
      control._state.mount = true;
    }
    if (control._state.watch) {
      control._state.watch = false;
      control._subjects.state.next({ ...control._formState });
    }
    control._removeUnmounted();
  });
  import_react.default.useEffect(() => {
    props.shouldUnregister && control._subjects.state.next({
      values: control._getWatch()
    });
  }, [props.shouldUnregister, control]);
  _formControl.current.formState = getProxyFormState(formState, control);
  return _formControl.current;
}
var colors = {
  primary: "#0e101c",
  secondary: "#bf1650",
  lightBlue: "#516391",
  blue: "#1e2a4a",
  lightPink: "#ec5990",
  errorPink: "#fbecf2",
  buttonBlue: "#191d3a",
  link: "#ff7aa8",
  green: "#1bda2b"
};
var paraGraphDefaultStyle = {
  fontSize: 13,
  lineHeight: "20px"
};
var Button = styled.button`
  appearance: none;
  margin: 0;
  border: 0;
  color: white;
  padding: 5px !important;
  border-radius: 0 !important;
  background: ${(props) => props.hideBackground ? `` : `${colors.blue} !important`};
  transition: 0.2s all;

  &:hover {
    background: ${colors.lightBlue};
  }
`;
var CircleButton = styled(Button)`
  font-size: 14px;
  font-weight: bold;
  margin: 0 4px 0 auto;
  background: none !important;
  display: flex;
  width: 25px;
  height: 25px;
  justify-content: center;
  line-height: 14px !important;
  border-radius: 50% !important;
  padding: 0 !important;
  transition: 0.2s all;

  &:hover {
    background: ${colors.lightBlue};
  }

  &:active {
    background: black;
  }
`;
var Input = styled.input`
  &::placeholder {
    color: #b3b3b3;
  }

  &:focus::placeholder {
    color: white;
  }
`;
var Table = styled.table`
  transition: 0.3s all;

  &:hover {
    background: ${colors.primary};
  }
`;
var Header = ({ setVisible: setVisible2, control }) => {
  const { isValid } = useFormState({
    control
  });
  return React2.createElement(
    "header",
    { style: {
      display: "flex",
      alignItems: "center",
      paddingLeft: 10,
      backgroundColor: "transparent"
    } },
    React2.createElement(
      "p",
      { style: Object.assign(Object.assign({}, paraGraphDefaultStyle), { margin: 0, padding: 0, fontWeight: 400, fontSize: 12 }) },
      React2.createElement("span", { style: {
        transition: "0.5s all",
        color: isValid ? colors.green : colors.lightPink
      } }, "■"),
      " ",
      "React Hook Form"
    ),
    React2.createElement(CircleButton, { title: "Close dev panel", onClick: () => setVisible2(false) }, "✕")
  );
};
var PanelTable = ({ refObject, hasError, isDirty, fieldsValues, isNative, errorMessage, errorType, type, isTouched, name, collapseAll }) => {
  const [collapse, setCollapse2] = React2.useState(false);
  React2.useEffect(() => {
    setCollapse2(!collapseAll);
  }, [collapseAll]);
  let value = fieldsValues ? get(fieldsValues, name) : "";
  let isValueWrappedInPre = false;
  if (!(0, import_isUndefined.default)(value)) {
    if ((0, import_isObject.default)(value)) {
      try {
        value = React2.createElement(
          "pre",
          { style: { margin: 0 } },
          React2.createElement("code", { style: { fontSize: 12 } }, JSON.stringify(value, null, 2))
        );
        isValueWrappedInPre = true;
      } catch (_a) {
        value = React2.createElement("span", null, "[Nested Object]");
      }
    } else if (typeof value !== "string") {
      value = String(value);
    }
  }
  return React2.createElement(
    Table,
    { style: {
      padding: "5px 8px",
      width: "100%",
      transition: ".3s all",
      borderLeft: `2px solid ${hasError ? colors.secondary : colors.buttonBlue}`,
      background: "none"
    } },
    React2.createElement(
      "thead",
      null,
      React2.createElement(
        "tr",
        null,
        React2.createElement(
          "td",
          { valign: "top", style: { width: 85, lineHeight: "22px" } },
          React2.createElement(Button, { onClick: () => setCollapse2(!collapse), title: "Toggle field table", style: {
            border: `1px solid ${colors.lightBlue}`,
            borderRadius: 2,
            padding: "3px 5px",
            display: "inline-block",
            fontSize: 9,
            lineHeight: "13px",
            width: 20,
            textAlign: "center",
            marginRight: 8
          }, type: "button" }, collapse ? "+" : "-"),
          React2.createElement(Button, { onClick: () => {
            if (refObject.scrollIntoView) {
              refObject.scrollIntoView({ behavior: "smooth" });
            }
          }, title: "Scroll into view", style: Object.assign({ border: `1px solid ${colors.lightBlue}`, borderRadius: 2, padding: "3px 5px", display: "inline-block", fontSize: 9, lineHeight: "13px", textAlign: "center", width: "calc(100% - 30px)" }, isNative ? {} : { cursor: "not-allowed", background: colors.lightBlue }), type: "button" }, isNative ? "Native" : "Custom")
        ),
        React2.createElement(
          "td",
          { style: {
            display: "block",
            maxWidth: 140
          } },
          React2.createElement("p", { style: Object.assign(Object.assign({ margin: 0, padding: 0, top: 0, position: "relative", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, paraGraphDefaultStyle), { lineHeight: "24px" }), title: name }, name)
        )
      )
    ),
    !collapse && React2.createElement(
      "tbody",
      null,
      type && React2.createElement(
        "tr",
        null,
        React2.createElement("td", { align: "right", style: Object.assign({ paddingRight: 5, fontWeight: 500, verticalAlign: "top" }, paraGraphDefaultStyle) }, "Type:"),
        React2.createElement("td", { style: Object.assign({ display: "block", maxWidth: 100 }, paraGraphDefaultStyle) }, type)
      ),
      errorType && React2.createElement(
        "tr",
        null,
        React2.createElement("td", { align: "right", style: Object.assign({ paddingRight: 5, fontWeight: 500, verticalAlign: "top" }, paraGraphDefaultStyle) }, "ERROR Type:"),
        React2.createElement("td", { style: Object.assign({ display: "block", maxWidth: 100 }, paraGraphDefaultStyle) }, errorType)
      ),
      errorMessage && React2.createElement(
        "tr",
        null,
        React2.createElement("td", { align: "right", style: Object.assign({ paddingRight: 5, fontWeight: 500, verticalAlign: "top" }, paraGraphDefaultStyle) }, "MESSAGE:"),
        React2.createElement("td", { style: Object.assign({ display: "block", maxWidth: 100 }, paraGraphDefaultStyle) }, typeof errorMessage === "string" ? errorMessage.trim() : JSON.stringify(errorMessage))
      ),
      !(0, import_isUndefined.default)(value) && React2.createElement(
        "tr",
        null,
        React2.createElement("td", { align: "right", style: Object.assign({ paddingRight: 5, fontWeight: 500, verticalAlign: "top" }, paraGraphDefaultStyle) }, "Value:"),
        React2.createElement(
          "td",
          { "data-testid": `${name}-field-value`, style: Object.assign({ display: "block", maxWidth: 100 }, paraGraphDefaultStyle) },
          !isValueWrappedInPre && React2.createElement("p", { title: value, style: Object.assign(Object.assign({}, paraGraphDefaultStyle), { margin: 0, padding: 0 }) }, value),
          isValueWrappedInPre && React2.createElement("div", { style: Object.assign(Object.assign({}, paraGraphDefaultStyle), { margin: 0, padding: 0 }) }, value)
        )
      ),
      React2.createElement(
        "tr",
        null,
        React2.createElement("td", { align: "right", style: Object.assign({ paddingRight: 5, fontWeight: 500, verticalAlign: "top" }, paraGraphDefaultStyle) }, "Touched:"),
        React2.createElement(
          "td",
          null,
          React2.createElement("code", { style: Object.assign(Object.assign({ color: isTouched ? colors.green : colors.lightPink }, paraGraphDefaultStyle), { fontSize: 12 }) }, isTouched ? "true" : "false")
        )
      ),
      React2.createElement(
        "tr",
        null,
        React2.createElement("td", { align: "right", style: Object.assign({ paddingRight: 5, fontWeight: 500, verticalAlign: "top" }, paraGraphDefaultStyle) }, "Dirty:"),
        React2.createElement(
          "td",
          null,
          React2.createElement("code", { style: Object.assign(Object.assign({ color: isDirty ? colors.green : colors.lightPink }, paraGraphDefaultStyle), { fontSize: 12 }) }, isDirty ? "true" : "false")
        )
      )
    )
  );
};
var FormStateTable = ({ formState, showFormState, setShowFormState }) => React2.createElement(
  "div",
  { style: {
    alignSelf: "end"
  } },
  React2.createElement(import_react_simple_animate.Animate, { play: showFormState, start: { opacity: 0 }, end: { opacity: 1 }, render: ({ style }) => React2.createElement(
    "table",
    { style: Object.assign({ padding: "5px 10px", display: "block", background: "black", borderTop: `1px solid ${colors.lightPink}`, pointerEvents: "none" }, style) },
    React2.createElement(
      "tbody",
      null,
      React2.createElement(
        "tr",
        null,
        React2.createElement("td", { align: "right", style: Object.assign({ width: 90 }, paraGraphDefaultStyle) }, "Valid:"),
        React2.createElement("td", { style: Object.assign({ color: formState.isValid ? colors.green : colors.lightPink }, paraGraphDefaultStyle) }, formState.isValid ? "true" : "false")
      ),
      React2.createElement(
        "tr",
        null,
        React2.createElement("td", { align: "right", style: Object.assign({}, paraGraphDefaultStyle) }, "Dirty:"),
        React2.createElement("td", { style: Object.assign({ color: formState.isDirty ? colors.green : colors.lightPink }, paraGraphDefaultStyle) }, formState.isDirty ? "true" : "false")
      ),
      React2.createElement(
        "tr",
        null,
        React2.createElement("td", { align: "right", style: Object.assign({}, paraGraphDefaultStyle) }, "Submitted:"),
        React2.createElement("td", { style: Object.assign({ color: formState.isSubmitted ? colors.green : colors.lightPink }, paraGraphDefaultStyle) }, formState.isSubmitted ? "true" : "false")
      ),
      React2.createElement(
        "tr",
        null,
        React2.createElement("td", { align: "right", style: Object.assign({}, paraGraphDefaultStyle) }, "Count:"),
        React2.createElement("td", { style: Object.assign({ color: formState.submitCount ? colors.green : colors.lightPink }, paraGraphDefaultStyle) }, formState.submitCount)
      ),
      React2.createElement(
        "tr",
        null,
        React2.createElement("td", { align: "right", style: Object.assign({}, paraGraphDefaultStyle) }, "Submitting:"),
        React2.createElement("td", { style: Object.assign({ color: formState.isSubmitting ? colors.green : colors.lightPink }, paraGraphDefaultStyle) }, formState.isSubmitting ? "true" : "false")
      )
    )
  ) }),
  React2.createElement(
    Button,
    { style: {
      margin: 0,
      width: "100%",
      padding: "8px 10px",
      textTransform: "none",
      fontSize: 12,
      lineHeight: "14px",
      cursor: "pointer"
    }, title: "Toggle form state panel", onClick: () => {
      setShowFormState(!showFormState);
    }, type: "button" },
    React2.createElement("span", { style: {
      transition: "0.5s all",
      color: formState.isValid ? colors.green : colors.lightPink
    } }, "■"),
    " ",
    "Form State: ",
    showFormState ? "OFF" : "ON"
  )
);
function setVisible(state, payload) {
  return Object.assign(Object.assign({}, state), { visible: payload });
}
function setCollapse(state, payload) {
  return Object.assign(Object.assign({}, state), { isCollapse: payload });
}
var childIndex = 0;
function PanelChildren({ fields, searchTerm, touchedFields, errors, dirtyFields, state, fieldsValues }) {
  return React2.createElement(React2.Fragment, null, fields && Object.entries(fields).filter(([name]) => (name && name.toLowerCase && name.toLowerCase().includes(searchTerm) || !name && !searchTerm || searchTerm === "") && name).map(([name, value], index) => {
    childIndex++;
    if (!(value === null || value === void 0 ? void 0 : value._f)) {
      return React2.createElement(PanelChildren, Object.assign({ key: name + childIndex }, {
        fields: value,
        searchTerm,
        touchedFields,
        errors,
        dirtyFields,
        state,
        fieldsValues
      }));
    } else {
      const error = get(errors, value._f.name);
      const errorMessage = get(error, "message", void 0);
      const errorType = get(error, "type", void 0);
      const type = get(value, "ref.type", void 0);
      const isTouched = !!get(touchedFields, value._f.name);
      const isNative = !!(value && value._f.ref.type);
      const isDirty = !!get(dirtyFields, value._f.name);
      const hasError = !!error;
      const ref = get(value, "_f.ref");
      return React2.createElement(
        "section",
        { key: (value === null || value === void 0 ? void 0 : value._f.name) + childIndex, style: {
          borderBottom: `1px dashed ${colors.secondary}`,
          margin: 0
        } },
        React2.createElement(PanelTable, { refObject: ref, index, collapseAll: state.isCollapse, name: value === null || value === void 0 ? void 0 : value._f.name, isTouched, type, hasError, isNative, errorMessage, errorType, isDirty, fieldsValues })
      );
    }
  }));
}
var Panel = ({ control, control: { _fields } }) => {
  const formState = useFormState({
    control
  });
  const { dirtyFields, touchedFields, errors } = formState;
  formState.isDirty;
  const { state, actions } = a({
    setCollapse
  });
  const [, setData] = React2.useState({});
  const [showFormState, setShowFormState] = React2.useState(false);
  const fieldsValues = useWatch({
    control
  });
  const { register, watch } = useForm();
  const searchTerm = watch("search", "");
  (0, import_react.useEffect)(() => {
    setData({});
  }, []);
  return React2.createElement(
    "div",
    { style: {
      display: "grid",
      gridTemplateRows: "56px auto",
      height: false ? "100vh" : "calc(100vh - 40px)"
    } },
    React2.createElement(
      "div",
      { style: {
        display: "grid",
        gridTemplateColumns: `1fr 1fr`,
        gridTemplateRows: "28px 28px"
      } },
      React2.createElement(Button, { style: {
        borderRight: `1px solid ${colors.primary}`,
        textTransform: "none",
        fontSize: 11,
        lineHeight: 1
      }, title: "Update values and state the form", onClick: () => setData({}), type: "button" }, "♺ REFRESH"),
      React2.createElement(Button, { style: {
        borderRight: `1px solid ${colors.primary}`,
        textTransform: "none",
        fontSize: 11,
        lineHeight: 1
      }, title: "Toggle entire fields", onClick: () => {
        actions.setCollapse(!state.isCollapse);
      }, type: "button" }, state.isCollapse ? "[-] COLLAPSE" : "[+] EXPAND"),
      React2.createElement(Input, Object.assign({ style: {
        display: "inline-block",
        borderRadius: 0,
        width: "100%",
        margin: 0,
        padding: "5px 10px",
        WebkitAppearance: "none",
        appearance: "none",
        fontSize: 14,
        border: 0,
        color: "white",
        gridColumnStart: 1,
        gridColumnEnd: 4,
        background: "black"
      } }, register("search"), { placeholder: "Filter name...", type: "search" }))
    ),
    React2.createElement(
      "div",
      { style: {
        overflow: "auto"
      } },
      React2.createElement(PanelChildren, { fields: _fields, searchTerm, errors, touchedFields, dirtyFields, fieldsValues, state })
    ),
    React2.createElement(FormStateTable, { formState, showFormState, setShowFormState })
  );
};
var Logo = ({ style, actions }) => {
  return React2.createElement(
    "svg",
    { fill: "white", viewBox: "0 0 100 100", style: Object.assign({ height: 14, padding: 3, borderRadius: 2, background: colors.lightPink }, style), onClick: () => {
      actions.setVisible(true);
    }, "aria-label": "React Hook Form Logo" },
    React2.createElement("path", { d: "M73.56,13.32H58.14a8.54,8.54,0,0,0-16.27,0H26.44a11,11,0,0,0-11,11V81.63a11,11,0,0,0,11,11H73.56a11,11,0,0,0,11-11V24.32A11,11,0,0,0,73.56,13.32Zm-30.92,2a1,1,0,0,0,1-.79,6.54,6.54,0,0,1,12.78,0,1,1,0,0,0,1,.79h5.38v6.55a3,3,0,0,1-3,3H40.25a3,3,0,0,1-3-3V15.32ZM82.56,81.63a9,9,0,0,1-9,9H26.44a9,9,0,0,1-9-9V24.32a9,9,0,0,1,9-9h8.81v6.55a5,5,0,0,0,5,5h19.5a5,5,0,0,0,5-5V15.32h8.81a9,9,0,0,1,9,9Z" }),
    React2.createElement("path", { style: { transform: "translateX(-25px)" }, d: "M71.6,45.92H54a1,1,0,0,0,0,2H71.6a1,1,0,0,0,0-2Z" }),
    React2.createElement("path", { d: "M71.6,45.92H54a1,1,0,0,0,0,2H71.6a1,1,0,0,0,0-2Z" }),
    React2.createElement("path", { style: { transform: "translateX(-25px)" }, d: "M71.1,69.49H53.45a1,1,0,1,0,0,2H71.1a1,1,0,0,0,0-2Z" }),
    React2.createElement("path", { d: "M71.1,69.49H53.45a1,1,0,1,0,0,2H71.1a1,1,0,0,0,0-2Z" })
  );
};
function getPositionByPlacement(placement, defaultX = 0, defaultY = 0) {
  const [x, y] = placement.split("-");
  return {
    [x]: defaultX,
    [y]: defaultY
  };
}
var DevToolUI = ({ control, placement = "top-right", styles }) => {
  const { state, actions } = a({
    setVisible
  });
  const position = getPositionByPlacement(placement, 0, 0);
  return React2.createElement(
    React2.Fragment,
    null,
    React2.createElement(
      import_react_simple_animate.Animate,
      { play: state.visible, duration: 0.2, start: Object.assign(Object.assign({}, position), { position: "fixed", transform: placement.includes("right") ? "translateX(280px)" : "translateX(-280px)", zIndex: 99999 }), end: Object.assign(Object.assign({}, position), { position: "fixed", transform: "translateX(0)", zIndex: 99999 }) },
      React2.createElement(
        "div",
        { style: Object.assign(Object.assign(Object.assign({}, position), { position: "fixed", height: "100vh", width: 250, zIndex: 99999, background: colors.buttonBlue, display: "grid", textAlign: "left", color: "white", fontSize: 14, gridTemplateRows: "40px auto", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }), styles === null || styles === void 0 ? void 0 : styles.panel) },
        React2.createElement(Header, { setVisible: actions.setVisible, control }),
        React2.createElement(Panel, { control })
      )
    ),
    !state.visible && React2.createElement(
      Button,
      { title: "Show dev panel", hideBackground: true, style: Object.assign(Object.assign(Object.assign({ position: "fixed", zIndex: 99999 }, getPositionByPlacement(placement, 3, 3)), { padding: 3, margin: 0, background: "none" }), styles === null || styles === void 0 ? void 0 : styles.button), type: "button" },
      React2.createElement(Logo, { actions })
    )
  );
};
function __rest(s2, e2) {
  var t2 = {};
  for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p) && e2.indexOf(p) < 0)
    t2[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s2); i < p.length; i++) {
      if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i]))
        t2[p[i]] = s2[p[i]];
    }
  return t2;
}
function proxyToObject(proxy) {
  return Reflect.ownKeys(proxy).reduce((prev, key) => {
    prev[key] = proxy[key];
    return prev;
  }, {});
}
function nestToFlat(flatKeys, obj, defaultValue) {
  return flatKeys.reduce((prev, name) => {
    prev[name] = (0, import_get.default)(obj, name) || defaultValue;
    return prev;
  }, {});
}
function useExportControlToExtension({ id, control }) {
  const nestedFormValues = useWatch({ control });
  const formState = useFormState({ control });
  const [isExtensionEnabled, setIsExtensionEnabled] = (0, import_react.useState)(false);
  const handleInitMessage = (message) => {
    if (message.data.source !== "react-hook-form-bridge" || message.data.type !== "INIT") {
      return;
    }
    window.postMessage({
      source: "react-hook-form-bridge",
      type: "WELCOME"
    });
    setIsExtensionEnabled(true);
  };
  (0, import_react.useEffect)(() => {
    window.addEventListener("message", handleInitMessage);
    return () => window.removeEventListener("message", handleInitMessage);
  }, []);
  useDeepCompareEffect(() => {
    if (!isExtensionEnabled) {
      return;
    }
    const _a = proxyToObject(formState), { errors: nestedErrors, dirtyFields: nestedDirtyFields, touchedFields: nestedTouchedFields } = _a, formStatus = __rest(_a, ["errors", "dirtyFields", "touchedFields"]);
    const flatFieldNames = [...control._names.mount];
    const formValues = nestToFlat(flatFieldNames, nestedFormValues, "");
    const dirtyFields = nestToFlat(flatFieldNames, nestedDirtyFields, false);
    const touchedFields = nestToFlat(flatFieldNames, nestedTouchedFields, false);
    const flatErrors = nestToFlat(flatFieldNames, nestedErrors);
    const errors = Object.entries(flatErrors).reduce((prev, [key, value]) => {
      prev[key] = {
        type: value === null || value === void 0 ? void 0 : value.type,
        message: value === null || value === void 0 ? void 0 : value.message
      };
      return prev;
    }, {});
    const nativeFields = flatFieldNames.reduce((prev, name) => {
      var _a2, _b;
      const field = (_a2 = (0, import_get.default)(control._fields, name)) === null || _a2 === void 0 ? void 0 : _a2._f;
      prev[name] = (_b = (0, import_get.default)(field, "ref")) === null || _b === void 0 ? void 0 : _b.type;
      return prev;
    }, {});
    const updateMessagePayload = {
      id,
      data: {
        formValues,
        formState: Object.assign({
          errors,
          dirtyFields,
          touchedFields,
          nativeFields
        }, formStatus)
      }
    };
    window.postMessage({
      source: "react-hook-form-bridge",
      type: "UPDATE",
      payload: updateMessagePayload
    });
  }, [isExtensionEnabled, nestedFormValues, proxyToObject(formState)]);
  return { isExtensionEnabled };
}
if (typeof window !== "undefined") {
  s({
    visible: false,
    isCollapse: false,
    filterName: ""
  }, {
    name: "__REACT_HOOK_FORM_DEVTOOLS__",
    middleWares: [],
    storageType: window.localStorage
  });
}
var DevTool = (props) => {
  var _a, _b, _c;
  const methods = useFormContext();
  const uuid = React2.useRef("");
  React2.useEffect(() => {
    uuid.current = v4_default();
  }, []);
  const { isExtensionEnabled } = useExportControlToExtension({
    id: (_a = props === null || props === void 0 ? void 0 : props.id) !== null && _a !== void 0 ? _a : uuid.current,
    control: (_b = props === null || props === void 0 ? void 0 : props.control) !== null && _b !== void 0 ? _b : methods.control
  });
  if (isExtensionEnabled) {
    return null;
  }
  return React2.createElement(
    o,
    null,
    React2.createElement(DevToolUI, { control: (_c = props === null || props === void 0 ? void 0 : props.control) !== null && _c !== void 0 ? _c : methods.control, placement: props === null || props === void 0 ? void 0 : props.placement, styles: props === null || props === void 0 ? void 0 : props.styles })
  );
};
export {
  DevTool
};
/*! Bundled license information:

@hookform/devtools/dist/index.esm.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
//# sourceMappingURL=@hookform_devtools.js.map
