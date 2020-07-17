"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GenerateWorker = function GenerateWorker(_ref) {
  var lifecycleHooks = _ref.lifecycleHooks,
      prebuildOptions = _ref.prebuildOptions,
      methods = _ref.methods;
  return {
    hooks: _objectSpread({}, lifecycleHooks),
    content: _objectSpread({}, methods)
  };
};

var _default = GenerateWorker;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93b3JrZXJzL3V0aWxzL2dlbmVyYXRlV29ya2Vycy50cyJdLCJuYW1lcyI6WyJHZW5lcmF0ZVdvcmtlciIsImxpZmVjeWNsZUhvb2tzIiwicHJlYnVpbGRPcHRpb25zIiwibWV0aG9kcyIsImhvb2tzIiwiY29udGVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQU1BLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsT0FJVztBQUFBLE1BSGhDQyxjQUdnQyxRQUhoQ0EsY0FHZ0M7QUFBQSxNQUZoQ0MsZUFFZ0MsUUFGaENBLGVBRWdDO0FBQUEsTUFEaENDLE9BQ2dDLFFBRGhDQSxPQUNnQztBQUNoQyxTQUFPO0FBQ0xDLElBQUFBLEtBQUssb0JBQ0FILGNBREEsQ0FEQTtBQUlMSSxJQUFBQSxPQUFPLG9CQUNGRixPQURFO0FBSkYsR0FBUDtBQVFELENBYkQ7O2VBZWVILGMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXb3JrZXJCdWlsZGVyLCBCdWlsdFdvcmtlciB9IGZyb20gJy4uLy4uL3R5cGVzL1NwYWNlcG9ydFR5cGVzJztcbmNvbnN0IEdlbmVyYXRlV29ya2VyID0gKHtcbiAgbGlmZWN5Y2xlSG9va3MsXG4gIHByZWJ1aWxkT3B0aW9ucyxcbiAgbWV0aG9kcyxcbn06IFdvcmtlckJ1aWxkZXIpOiBCdWlsdFdvcmtlciA9PiB7XG4gIHJldHVybiB7XG4gICAgaG9va3M6IHtcbiAgICAgIC4uLmxpZmVjeWNsZUhvb2tzLFxuICAgIH0sXG4gICAgY29udGVudDoge1xuICAgICAgLi4ubWV0aG9kcyxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2VuZXJhdGVXb3JrZXI7XG4iXX0=