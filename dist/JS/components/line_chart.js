"use strict";var _chart=_interopRequireDefault(require("/dist/JS/components/chart.js"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(Object(b),!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _typeof(a){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}function _extends(){return _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_extends.apply(this,arguments)}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}function _possibleConstructorReturn(a,b){return b&&("object"===_typeof(b)||"function"==typeof b)?b:_assertThisInitialized(a)}function _assertThisInitialized(a){if(void 0===a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function _getPrototypeOf(a){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(a){return a.__proto__||Object.getPrototypeOf(a)},_getPrototypeOf(a)}function _inherits(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function");a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,writable:!0,configurable:!0}}),b&&_setPrototypeOf(a,b)}function _setPrototypeOf(a,b){return _setPrototypeOf=Object.setPrototypeOf||function(a,b){return a.__proto__=b,a},_setPrototypeOf(a,b)}for(var e=React.createElement,LineChart=/*#__PURE__*/function(a){function b(a){return _classCallCheck(this,b),console.log(a),_possibleConstructorReturn(this,_getPrototypeOf(b).call(this,a))}return _inherits(b,a),_createClass(b,[{key:"xScale",value:function xScale(){// Returns the scale the x axis should use
return d3.scaleTime()}},{key:"yScale",value:function yScale(){// Returns the scale the y axis should use
return d3.scaleLinear()}},{key:"xAxisFormat",value:function xAxisFormat(a,b){console.log("formatting x axis"),400>a?b.ticks(d3.timeYear.every(8)):800>a?b.ticks(d3.timeYear.every(4)):b.ticks(d3.timeYear.every(2))}},{key:"renderData",value:function renderData(a,b,c,e,d,f){var g=f.data,h=f.dataset,i=d3.line().x(function(a){return c(a[h.xcol])}).y(function(a){return e(a[b])});d.append("path").attr("class","line").style("stroke",h.linecolors.split(",")[a]).attr("d",i(g))}},{key:"positionTooltip",value:function positionTooltip(a,b,c,d,e){return{left:20+a[0]+b.node().offsetWidth>e.width+e.margin.left+e.margin.right?a[0]-10-b.node().offsetWidth-e.offset:a[0]+10-e.offset,top:d(0)-b.node().offsetHeight+e.margin.top+24}}},{key:"render",value:function render(){return React.createElement(_chart["default"],_extends({},this.props,{margin:{top:5,right:20,bottom:20,left:65},padding:{top:40,right:20,bottom:40,left:20},xScale:this.xScale,yScale:this.yScale,xAxisFormat:this.xAxisFormat,renderData:this.renderData,positionTooltip:this.positionTooltip,useTooltipLine:!0}))}}]),b}(React.Component),elements=document.getElementsByClassName("line-chart"),i=0;i<elements.length;i++)ReactDOM.render(e(LineChart,_objectSpread({},elements[i].dataset,{chart:elements[i]})),elements[i]);