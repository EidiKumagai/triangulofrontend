(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{1299:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n.n(r),o=n(13),l=n(48),a=function(e,t,n){return t&&c(e.prototype,t),n&&c(e,n),e};function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e){var t=e.fill,n=e.x,r=e.y,a=e.width,o=e.height;return i.a.createElement("path",{d:function(e,t,n,r){return"M"+e+","+(t+r)+"\n    C"+(e+n/3)+","+(t+r)+" "+(e+n/2)+","+(t+r/3)+" "+(e+n/2)+", "+t+"\n    C"+(e+n/2)+","+(t+r/3)+" "+(e+2*n/3)+","+(t+r)+" "+(e+n)+", "+(t+r)+"\n    Z"}(n,r,a,o),stroke:"none",fill:t})}var f=(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(p,r.Component),a(p,[{key:"render",value:function(){var e=this.props,t=e.datas,n=e.width,r=e.height,a=e.colors;return i.a.createElement(l.a,{className:"isoChartWrapper"},i.a.createElement(o.d,{width:n,height:r,data:t,margin:{top:5,right:30,left:20,bottom:5}},i.a.createElement(o.u,{dataKey:"name",fill:a[3]}),i.a.createElement(o.v,{stroke:a[3]}),i.a.createElement(o.e,{strokeDasharray:"3 3"}),i.a.createElement(o.c,{dataKey:"female",fill:a[0],shape:i.a.createElement(u,null),label:!0})))}}]),p);function p(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,p),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(p.__proto__||Object.getPrototypeOf(p)).apply(this,arguments))}t.default=f}}]);