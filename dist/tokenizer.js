//re-define version:1.14.6
//library version:1.0.0
//externals: lodash._basevalues,lodash._baseuniq,lodash._basecopy
;(function (parent, factory){
  if (typeof define === 'function' && define.amd) {
    define('tokenizer', ['lodash._basevalues','lodash._baseuniq','lodash._basecopy'], factory)
  } else if (typeof module === "object" && !!module.exports) {
    module.exports = factory(require('lodash._basevalues'),require('lodash._baseuniq'),require('lodash._basecopy'))
  } else {
    var lodash__basevalues =  parent.lodash__basevalues
    var lodash__baseuniq =  parent.lodash__baseuniq
    var lodash__basecopy =  parent.lodash__basecopy
  
    parent["db"] = parent["db"] || {};
    parent["db"]["tokenizer"] = factory(lodash__basevalues,lodash__baseuniq,lodash__basecopy);

  }
  })(this, function (lodash__basevalues,lodash__baseuniq,lodash__basecopy) {
  var closure = {}

  closure['lodash._basevalues'] = lodash__basevalues
  closure['lodash._baseuniq'] = lodash__baseuniq
  closure['lodash._basecopy'] = lodash__basecopy
  var __req = (function (modules, namespace, imports) {
  var __oldReq = typeof require == "function" && require

  function __req(name){

    if(!namespace[name]) {
      var f = modules[name]
        , m = { exports:{} }
        , args

      if(f) {

        args = [m.exports, function(x) {
          return __req(x)
        }, m].concat(f.slice(1))

        namespace[name] = m;
        f = f[0].apply(null, args);
        f && (m.exports = f);
      } else {
        var mod
          , len = imports && imports.length;

        for(var i=0; i < len; i++) {
          mod = imports[i] && imports[i][name];
          if(mod) return mod;
        }

        if(__oldReq) return __oldReq.apply(null, arguments);
        throw new Error('Module does not exists ' + name);
      }
    }
    return namespace[name].exports;
  }

  return __req;
})
({ 
'lodash.isarguments': [function(exports,require,module) { 
    var argsTag = '[object Arguments]';
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }
    var objectProto = Object.prototype;
    var objToString = objectProto.toString;
    var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isArguments(value) {
      var length = isObjectLike(value) ? value.length : undefined;
      return isLength(length) && objToString.call(value) == argsTag;
    }
    module.exports = isArguments;
}], 
'lodash.isarray': [function(exports,require,module) { 
    var arrayTag = '[object Array]';
    var funcTag = '[object Function]';
    var reHostCtor = /^\[object .+?Constructor\]$/;
    var reRegExpChars = /[.*+?^()|[\]\/\\]/g;
    var reHasRegExpChars = RegExp(reRegExpChars.source);
    function baseToString(value) {
      if (typeof value == 'string') {
        return value;
      }
      return value == null ? '' : value + '';
    }
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }
    var objectProto = Object.prototype;
    var fnToString = Function.prototype.toString;
    var objToString = objectProto.toString;
    var reNative = RegExp('^' + escapeRegExp(objToString).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
    var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;
    var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    var isArray = nativeIsArray || function (value) {
        return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
      };
    function isNative(value) {
      if (value == null) {
        return false;
      }
      if (objToString.call(value) == funcTag) {
        return reNative.test(fnToString.call(value));
      }
      return isObjectLike(value) && reHostCtor.test(value);
    }
    function escapeRegExp(string) {
      string = baseToString(string);
      return string && reHasRegExpChars.test(string) ? string.replace(reRegExpChars, '\\$&') : string;
    }
    module.exports = isArray;
}], 
'lodash.isnative': [function(exports,require,module) { 
    var funcTag = '[object Function]';
    var reHostCtor = /^\[object .+?Constructor\]$/;
    var reRegExpChars = /[.*+?^()|[\]\/\\]/g;
    var reHasRegExpChars = RegExp(reRegExpChars.source);
    function baseToString(value) {
      if (typeof value == 'string') {
        return value;
      }
      return value == null ? '' : value + '';
    }
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }
    var objectProto = Object.prototype;
    var fnToString = Function.prototype.toString;
    var objToString = objectProto.toString;
    var reNative = RegExp('^' + escapeRegExp(objToString).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
    function isNative(value) {
      if (value == null) {
        return false;
      }
      if (objToString.call(value) == funcTag) {
        return reNative.test(fnToString.call(value));
      }
      return isObjectLike(value) && reHostCtor.test(value);
    }
    function escapeRegExp(string) {
      string = baseToString(string);
      return string && reHasRegExpChars.test(string) ? string.replace(reRegExpChars, '\\$&') : string;
    }
    module.exports = isNative;
}], 
'lodash.keys': [function(exports,require,module) { 
    var isArguments = require('lodash.isarguments');
    var isArray = require('lodash.isarray');
    var isNative = require('lodash.isnative');
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;
    var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
    var support = {};
    (function (x) {
      try {
        support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
      } catch (e) {
        support.nonEnumArgs = true;
      }
    }(0, 0));
    function isIndex(value, length) {
      value = +value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return value > -1 && value % 1 == 0 && value < length;
    }
    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function shimKeys(object) {
      var props = keysIn(object);
      var propsLength = props.length;
      var length = propsLength && object.length;
      var allowIndexes = length && isLength(length) && (isArray(object) || support.nonEnumArgs && isArguments(object));
      var index = -1;
      var result = [];
      while (++index < propsLength) {
        var key = props[index];
        if (allowIndexes && isIndex(key, length) || hasOwnProperty.call(object, key)) {
          result.push(key);
        }
      }
      return result;
    }
    function isObject(value) {
      var type = typeof value;
      return type == 'function' || !!value && type == 'object';
    }
    var keys = !nativeKeys ? shimKeys : function (object) {
        if (object) {
          var Ctor = object.constructor;
          var length = object.length;
        }
        if (typeof Ctor == 'function' && Ctor.prototype === object || typeof object != 'function' && (length && isLength(length))) {
          return shimKeys(object);
        }
        return isObject(object) ? nativeKeys(object) : [];
      };
    function keysIn(object) {
      if (object == null) {
        return [];
      }
      if (!isObject(object)) {
        object = Object(object);
      }
      var length = object.length;
      length = length && isLength(length) && (isArray(object) || support.nonEnumArgs && isArguments(object)) && length || 0;
      var Ctor = object.constructor;
      var index = -1;
      var isProto = typeof Ctor == 'function' && Ctor.prototype === object;
      var result = Array(length);
      var skipIndexes = length > 0;
      while (++index < length) {
        result[index] = index + '';
      }
      for (var key in object) {
        if (!(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = keys;
}], 
'lodash.values': [function(exports,require,module) { 
    var baseValues = require('lodash._basevalues');
    var keys = require('lodash.keys');
    function values(object) {
      return baseValues(object, keys(object));
    }
    module.exports = values;
}], 
'lodash.istypedarray': [function(exports,require,module) { 
    var argsTag = '[object Arguments]';
    var arrayTag = '[object Array]';
    var boolTag = '[object Boolean]';
    var dateTag = '[object Date]';
    var errorTag = '[object Error]';
    var funcTag = '[object Function]';
    var mapTag = '[object Map]';
    var numberTag = '[object Number]';
    var objectTag = '[object Object]';
    var regexpTag = '[object RegExp]';
    var setTag = '[object Set]';
    var stringTag = '[object String]';
    var weakMapTag = '[object WeakMap]';
    var arrayBufferTag = '[object ArrayBuffer]';
    var float32Tag = '[object Float32Array]';
    var float64Tag = '[object Float64Array]';
    var int8Tag = '[object Int8Array]';
    var int16Tag = '[object Int16Array]';
    var int32Tag = '[object Int32Array]';
    var uint8Tag = '[object Uint8Array]';
    var uint8ClampedTag = '[object Uint8ClampedArray]';
    var uint16Tag = '[object Uint16Array]';
    var uint32Tag = '[object Uint32Array]';
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }
    var objectProto = Object.prototype;
    var objToString = objectProto.toString;
    var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
    }
    module.exports = isTypedArray;
}], 
'lodash._baseisequal': [function(exports,require,module) { 
    var isArray = require('lodash.isarray');
    var isTypedArray = require('lodash.istypedarray');
    var keys = require('lodash.keys');
    var argsTag = '[object Arguments]';
    var arrayTag = '[object Array]';
    var boolTag = '[object Boolean]';
    var dateTag = '[object Date]';
    var errorTag = '[object Error]';
    var funcTag = '[object Function]';
    var numberTag = '[object Number]';
    var objectTag = '[object Object]';
    var regexpTag = '[object RegExp]';
    var stringTag = '[object String]';
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objToString = objectProto.toString;
    function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
      if (value === other) {
        return value !== 0 || 1 / value == 1 / other;
      }
      var valType = typeof value;
      var othType = typeof other;
      if (valType != 'function' && valType != 'object' && othType != 'function' && othType != 'object' || value == null || other == null) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
    }
    function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var objIsArr = isArray(object);
      var othIsArr = isArray(other);
      var objTag = arrayTag;
      var othTag = arrayTag;
      if (!objIsArr) {
        objTag = objToString.call(object);
        if (objTag == argsTag) {
          objTag = objectTag;
        } else if (objTag != objectTag) {
          objIsArr = isTypedArray(object);
        }
      }
      if (!othIsArr) {
        othTag = objToString.call(other);
        if (othTag == argsTag) {
          othTag = objectTag;
        } else if (othTag != objectTag) {
          othIsArr = isTypedArray(other);
        }
      }
      var objIsObj = objTag == objectTag || isLoose && objTag == funcTag;
      var othIsObj = othTag == objectTag || isLoose && othTag == funcTag;
      var isSameTag = objTag == othTag;
      if (isSameTag && !(objIsArr || objIsObj)) {
        return equalByTag(object, other, objTag);
      }
      if (isLoose) {
        if (!isSameTag && !(objIsObj && othIsObj)) {
          return false;
        }
      } else {
        var valWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__');
        var othWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
        if (valWrapped || othWrapped) {
          return equalFunc(valWrapped ? object.value() : object, othWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
        }
        if (!isSameTag) {
          return false;
        }
      }
      stackA || (stackA = []);
      stackB || (stackB = []);
      var length = stackA.length;
      while (length--) {
        if (stackA[length] == object) {
          return stackB[length] == other;
        }
      }
      stackA.push(object);
      stackB.push(other);
      var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);
      stackA.pop();
      stackB.pop();
      return result;
    }
    function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var index = -1;
      var arrLength = array.length;
      var othLength = other.length;
      var result = true;
      if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
        return false;
      }
      while (result && ++index < arrLength) {
        var arrValue = array[index];
        var othValue = other[index];
        result = undefined;
        if (customizer) {
          result = isLoose ? customizer(othValue, arrValue, index) : customizer(arrValue, othValue, index);
        }
        if (typeof result == 'undefined') {
          if (isLoose) {
            var othIndex = othLength;
            while (othIndex--) {
              othValue = other[othIndex];
              result = arrValue && arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
              if (result) {
                break;
              }
            }
          } else {
            result = arrValue && arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
          }
        }
      }
      return !!result;
    }
    function equalByTag(object, other, tag) {
      switch (tag) {
      case boolTag:
      case dateTag:
        return +object == +other;
      case errorTag:
        return object.name == other.name && object.message == other.message;
      case numberTag:
        return object != +object ? other != +other : object == 0 ? 1 / object == 1 / other : object == +other;
      case regexpTag:
      case stringTag:
        return object == other + '';
      }
      return false;
    }
    function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var objProps = keys(object);
      var objLength = objProps.length;
      var othProps = keys(other);
      var othLength = othProps.length;
      if (objLength != othLength && !isLoose) {
        return false;
      }
      var skipCtor = isLoose;
      var index = -1;
      while (++index < objLength) {
        var key = objProps[index];
        var result = isLoose ? key in other : hasOwnProperty.call(other, key);
        if (result) {
          var objValue = object[key];
          var othValue = other[key];
          result = undefined;
          if (customizer) {
            result = isLoose ? customizer(othValue, objValue, key) : customizer(objValue, othValue, key);
          }
          if (typeof result == 'undefined') {
            result = objValue && objValue === othValue || equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB);
          }
        }
        if (!result) {
          return false;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (!skipCtor) {
        var objCtor = object.constructor;
        var othCtor = other.constructor;
        if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          return false;
        }
      }
      return true;
    }
    module.exports = baseIsEqual;
}], 
'lodash._bindcallback': [function(exports,require,module) { 
    function bindCallback(func, thisArg, argCount) {
      if (typeof func != 'function') {
        return identity;
      }
      if (typeof thisArg == 'undefined') {
        return func;
      }
      switch (argCount) {
      case 1:
        return function (value) {
          return func.call(thisArg, value);
        };
      case 3:
        return function (value, index, collection) {
          return func.call(thisArg, value, index, collection);
        };
      case 4:
        return function (accumulator, value, index, collection) {
          return func.call(thisArg, accumulator, value, index, collection);
        };
      case 5:
        return function (value, other, key, object, source) {
          return func.call(thisArg, value, other, key, object, source);
        };
      }
      return function () {
        return func.apply(thisArg, arguments);
      };
    }
    function identity(value) {
      return value;
    }
    module.exports = bindCallback;
}], 
'lodash._basecallback': [function(exports,require,module) { 
    var baseIsEqual = require('lodash._baseisequal');
    var bindCallback = require('lodash._bindcallback');
    var keys = require('lodash.keys');
    function baseCallback(func, thisArg, argCount) {
      var type = typeof func;
      if (type == 'function') {
        return typeof thisArg == 'undefined' ? func : bindCallback(func, thisArg, argCount);
      }
      if (func == null) {
        return identity;
      }
      if (type == 'object') {
        return baseMatches(func);
      }
      return typeof thisArg == 'undefined' ? baseProperty(func + '') : baseMatchesProperty(func + '', thisArg);
    }
    function baseIsMatch(object, props, values, strictCompareFlags, customizer) {
      var index = -1;
      var length = props.length;
      var noCustomizer = !customizer;
      while (++index < length) {
        if (noCustomizer && strictCompareFlags[index] ? values[index] !== object[props[index]] : !(props[index] in object)) {
          return false;
        }
      }
      index = -1;
      while (++index < length) {
        var key = props[index];
        var objValue = object[key];
        var srcValue = values[index];
        if (noCustomizer && strictCompareFlags[index]) {
          var result = typeof objValue != 'undefined' || key in object;
        } else {
          result = customizer ? customizer(objValue, srcValue, key) : undefined;
          if (typeof result == 'undefined') {
            result = baseIsEqual(srcValue, objValue, customizer, true);
          }
        }
        if (!result) {
          return false;
        }
      }
      return true;
    }
    function baseMatches(source) {
      var props = keys(source);
      var length = props.length;
      if (!length) {
        return constant(true);
      }
      if (length == 1) {
        var key = props[0];
        var value = source[key];
        if (isStrictComparable(value)) {
          return function (object) {
            return object != null && object[key] === value && (typeof value != 'undefined' || key in toObject(object));
          };
        }
      }
      var values = Array(length);
      var strictCompareFlags = Array(length);
      while (length--) {
        value = source[props[length]];
        values[length] = value;
        strictCompareFlags[length] = isStrictComparable(value);
      }
      return function (object) {
        return object != null && baseIsMatch(toObject(object), props, values, strictCompareFlags);
      };
    }
    function baseMatchesProperty(key, value) {
      if (isStrictComparable(value)) {
        return function (object) {
          return object != null && object[key] === value && (typeof value != 'undefined' || key in toObject(object));
        };
      }
      return function (object) {
        return object != null && baseIsEqual(value, object[key], null, true);
      };
    }
    function baseProperty(key) {
      return function (object) {
        return object == null ? undefined : object[key];
      };
    }
    function isStrictComparable(value) {
      return value === value && (value === 0 ? 1 / value > 0 : !isObject(value));
    }
    function toObject(value) {
      return isObject(value) ? value : Object(value);
    }
    function isObject(value) {
      var type = typeof value;
      return type == 'function' || !!value && type == 'object';
    }
    function constant(value) {
      return function () {
        return value;
      };
    }
    function identity(value) {
      return value;
    }
    module.exports = baseCallback;
}], 
'lodash._isiterateecall': [function(exports,require,module) { 
    var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
    function isIndex(value, length) {
      value = +value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return value > -1 && value % 1 == 0 && value < length;
    }
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number') {
        var length = object.length;
        var prereq = isLength(length) && isIndex(index, length);
      } else {
        prereq = type == 'string' && index in object;
      }
      if (prereq) {
        var other = object[index];
        return value === value ? value === other : other !== other;
      }
      return false;
    }
    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject(value) {
      var type = typeof value;
      return type == 'function' || !!value && type == 'object';
    }
    module.exports = isIterateeCall;
}], 
'lodash.uniq': [function(exports,require,module) { 
    var baseCallback = require('lodash._basecallback');
    var baseUniq = require('lodash._baseuniq');
    var isIterateeCall = require('lodash._isiterateecall');
    var isArray = require('lodash.isarray');
    var isNative = require('lodash.isnative');
    function sortedUniq(array, iteratee) {
      var seen;
      var index = -1;
      var length = array.length;
      var resIndex = -1;
      var result = [];
      while (++index < length) {
        var value = array[index];
        var computed = iteratee ? iteratee(value, index, array) : value;
        if (!index || seen !== computed) {
          seen = computed;
          result[++resIndex] = value;
        }
      }
      return result;
    }
    function uniq(array, isSorted, iteratee, thisArg) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (isSorted != null && typeof isSorted != 'boolean') {
        thisArg = iteratee;
        iteratee = isIterateeCall(array, isSorted, thisArg) ? null : isSorted;
        isSorted = false;
      }
      iteratee = iteratee == null ? iteratee : baseCallback(iteratee, thisArg, 3);
      return isSorted ? sortedUniq(array, iteratee) : baseUniq(array, iteratee);
    }
    module.exports = uniq;
}], 
'lodash.last': [function(exports,require,module) { 
    function last(array) {
      var length = array ? array.length : 0;
      return length ? array[length - 1] : undefined;
    }
    module.exports = last;
}], 
'lodash.compact': [function(exports,require,module) { 
    function compact(array) {
      var index = -1;
      var length = array ? array.length : 0;
      var resIndex = -1;
      var result = [];
      while (++index < length) {
        var value = array[index];
        if (value) {
          result[++resIndex] = value;
        }
      }
      return result;
    }
    module.exports = compact;
}], 
'lodash.isfunction': [function(exports,require,module) { 
    var funcTag = '[object Function]';
    var reRegExpChars = /[.*+?^()|[\]\/\\]/g;
    var reHasRegExpChars = RegExp(reRegExpChars.source);
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    function baseIsFunction(value) {
      return typeof value == 'function' || false;
    }
    function baseToString(value) {
      if (typeof value == 'string') {
        return value;
      }
      return value == null ? '' : value + '';
    }
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }
    var objectProto = Object.prototype;
    var fnToString = Function.prototype.toString;
    var objToString = objectProto.toString;
    var reIsNative = RegExp('^' + escapeRegExp(objToString).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
    var Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;
    var isFunction = !(baseIsFunction(/x/) || Uint8Array && !baseIsFunction(Uint8Array)) ? baseIsFunction : function (value) {
        return objToString.call(value) == funcTag;
      };
    function isNative(value) {
      if (value == null) {
        return false;
      }
      if (objToString.call(value) == funcTag) {
        return reIsNative.test(fnToString.call(value));
      }
      return isObjectLike(value) && reIsHostCtor.test(value);
    }
    function escapeRegExp(string) {
      string = baseToString(string);
      return string && reHasRegExpChars.test(string) ? string.replace(reRegExpChars, '\\$&') : string;
    }
    module.exports = isFunction;
}], 
'lodash.isstring': [function(exports,require,module) { 
    var stringTag = '[object String]';
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }
    var objectProto = Object.prototype;
    var objToString = objectProto.toString;
    function isString(value) {
      return typeof value == 'string' || isObjectLike(value) && objToString.call(value) == stringTag;
    }
    module.exports = isString;
}], 
'lodash.isempty': [function(exports,require,module) { 
    var isArguments = require('lodash.isarguments');
    var isArray = require('lodash.isarray');
    var isFunction = require('lodash.isfunction');
    var isString = require('lodash.isstring');
    var keys = require('lodash.keys');
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }
    var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
    function baseProperty(key) {
      return function (object) {
        return object == null ? undefined : object[key];
      };
    }
    var getLength = baseProperty('length');
    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      var length = getLength(value);
      if (isLength(length) && (isArray(value) || isString(value) || isArguments(value) || isObjectLike(value) && isFunction(value.splice))) {
        return !length;
      }
      return !keys(value).length;
    }
    module.exports = isEmpty;
}], 
'lodash._baseassign': [function(exports,require,module) { 
    var baseCopy = require('lodash._basecopy');
    var isNative = require('lodash.isnative');
    var keys = require('lodash.keys');
    var getOwnPropertySymbols = isNative(getOwnPropertySymbols = Object.getOwnPropertySymbols) && getOwnPropertySymbols;
    var preventExtensions = isNative(Object.preventExtensions = Object.preventExtensions) && preventExtensions;
    var nativeAssign = function () {
        var object = { '1': 0 };
        var func = preventExtensions && isNative(func = Object.assign) && func;
        try {
          func(preventExtensions(object), 'xo');
        } catch (e) {
        }
        return !object[1] && func;
      }();
    var baseAssign = nativeAssign || function (object, source) {
        return source == null ? object : baseCopy(source, getSymbols(source), baseCopy(source, keys(source), object));
      };
    var getSymbols = !getOwnPropertySymbols ? constant([]) : function (object) {
        return getOwnPropertySymbols(toObject(object));
      };
    function toObject(value) {
      return isObject(value) ? value : Object(value);
    }
    function isObject(value) {
      var type = typeof value;
      return type == 'function' || !!value && type == 'object';
    }
    function constant(value) {
      return function () {
        return value;
      };
    }
    module.exports = baseAssign;
}], 
'lodash.restparam': [function(exports,require,module) { 
    var FUNC_ERROR_TEXT = 'Expected a function';
    var nativeMax = Math.max;
    function restParam(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = nativeMax(start === undefined ? func.length - 1 : +start || 0, 0);
      return function () {
        var args = arguments;
        var index = -1;
        var length = nativeMax(args.length - start, 0);
        var rest = Array(length);
        while (++index < length) {
          rest[index] = args[start + index];
        }
        switch (start) {
        case 0:
          return func.call(this, rest);
        case 1:
          return func.call(this, args[0], rest);
        case 2:
          return func.call(this, args[0], args[1], rest);
        }
        var otherArgs = Array(start + 1);
        index = -1;
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = rest;
        return func.apply(this, otherArgs);
      };
    }
    module.exports = restParam;
}], 
'lodash._createassigner': [function(exports,require,module) { 
    var bindCallback = require('lodash._bindcallback');
    var isIterateeCall = require('lodash._isiterateecall');
    var restParam = require('lodash.restparam');
    function createAssigner(assigner) {
      return restParam(function (object, sources) {
        var index = -1;
        var length = object == null ? 0 : sources.length;
        var customizer = length > 2 && sources[length - 2];
        var guard = length > 2 && sources[2];
        var thisArg = length > 1 && sources[length - 1];
        if (typeof customizer == 'function') {
          customizer = bindCallback(customizer, thisArg, 5);
          length -= 2;
        } else {
          customizer = typeof thisArg == 'function' ? thisArg : null;
          length -= customizer ? 1 : 0;
        }
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? null : customizer;
          length = 1;
        }
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, customizer);
          }
        }
        return object;
      });
    }
    module.exports = createAssigner;
}], 
'lodash.assign': [function(exports,require,module) { 
    var baseAssign = require('lodash._baseassign');
    var createAssigner = require('lodash._createassigner');
    var isNative = require('lodash.isnative');
    var keys = require('lodash.keys');
    var arrayProto = Array.prototype;
    var getOwnPropertySymbols = isNative(getOwnPropertySymbols = Object.getOwnPropertySymbols) && getOwnPropertySymbols;
    var push = arrayProto.push;
    function assignWith(object, source, customizer) {
      var props = keys(source);
      push.apply(props, getSymbols(source));
      var index = -1;
      var length = props.length;
      while (++index < length) {
        var key = props[index];
        var value = object[key];
        var result = customizer(value, source[key], key, object, source);
        if ((result === result ? result !== value : value === value) || value === undefined && !(key in object)) {
          object[key] = result;
        }
      }
      return object;
    }
    var getSymbols = !getOwnPropertySymbols ? constant([]) : function (object) {
        return getOwnPropertySymbols(toObject(object));
      };
    function toObject(value) {
      return isObject(value) ? value : Object(value);
    }
    function isObject(value) {
      var type = typeof value;
      return type == 'function' || !!value && type == 'object';
    }
    var assign = createAssigner(function (object, source, customizer) {
        return customizer ? assignWith(object, source, customizer) : baseAssign(object, source);
      });
    function constant(value) {
      return function () {
        return value;
      };
    }
    module.exports = assign;
}], 
'tokenizer': [function(exports,require,module) { 
    var _ = {
        keys: require('lodash.keys'),
        values: require('lodash.values'),
        uniq: require('lodash.uniq'),
        last: require('lodash.last'),
        compact: require('lodash.compact'),
        isEmpty: require('lodash.isempty'),
        assign: require('lodash.assign')
      };
    module.exports = function (input) {
      var self = {};
      var _tokens = {};
      var _helpers = {};
      var _input = input;
      self.input = function (input) {
        _input = input;
        return self;
      };
      self.token = function (token, pattern, helper) {
        var t = {};
        t[token] = pattern;
        addTokens(t);
        helper && self.helper(token, helper);
        return self;
      };
      self.helper = function (token, callback) {
        var m = {};
        m[token] = callback;
        addHelpers(m);
        return self;
      };
      self.tokens = addTokens;
      self.helpers = addHelpers;
      self.walk = walk;
      self.resolve = resolve;
      return self;
      function addTokens(token) {
        var names = _.keys(token);
        var expressions = _.values(token);
        var expression;
        expressions.forEach(function (d, i) {
          expression = new RegExp('(' + getSource(d) + ')');
          _tokens[expression.source] = names[i];
        });
        return self;
        function getSource(expression) {
          if (is(expression, 'RegExp'))
            return expression.source;
          return getSource(new RegExp(expression));
        }
      }
      function addHelpers(helpers) {
        for (var helper in helpers)
          _helpers[helper] = helpers[helper];
        return self;
      }
      function walk(onToken) {
        var cb = onToken || noop;
        var tokens = _.keys(_tokens) || [];
        var names = _.values(_tokens);
        if (tokens.length == 0)
          throw new Error('Define at least one token');
        runFrom(0);
        return self;
        function runFrom(lastIndex) {
          var expr;
          var helper;
          for (var i = 0; i < tokens.length; i++) {
            expr = new RegExp(tokens[i], 'g');
            expr.lastIndex = lastIndex;
            helper = _helpers[names[i]];
            var part;
            var offset = !_.isEmpty(part = evalExpr()) ? part.lastIndex || part.index : -1;
            var matches;
            function evalExpr() {
              var r = expr.exec(_input);
              if (helper && r)
                r.push(helper(r, _input, expr.source));
              return r;
            }
            if (offset == lastIndex) {
              match = part || [];
              var shouldSkip = cb(names[i], topMatch(match), _.uniq(_.compact(match)));
              if (typeof shouldSkip != 'undefined' && !shouldSkip)
                continue;
              offset += match[0].length;
              return runFrom(offset);
            }
          }
        }
        function topMatch(arr) {
          return _.last(_.compact(arr));
        }
        function evaluateExpression(tokens) {
          return new RegExp(tokens.join('|'), 'g');
        }
      }
      function resolve() {
        var r = {};
        walk(function (name, value, raw) {
          if (is(r[name], 'Array'))
            return r[name].push(value);
          if (is(r[name], 'String'))
            return r[name] = [value].concat(r[name] || []).reverse();
          if (is(r[name], 'Object'))
            return r[name] = _.assign(value, r[name]);
          r[name] = r[name] || [];
          r[name].push(value);
        });
        r._source = _input;
        return simplify(r);
        function simplify(r) {
          for (var key in r)
            if (is(r[key], 'Array') && r[key].length == 1)
              r[key] = r[key][0];
          return r;
        }
      }
      function noop() {
      }
      function is(expression, type) {
        return Object.prototype.toString.call(expression) == '[object ' + type + ']';
      }
    };
}]
}
, {} 
, typeof window === 'undefined' ? [] : [closure]
)

return __req('tokenizer')

})
