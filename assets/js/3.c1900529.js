(window.webpackJsonp=window.webpackJsonp||[]).push([[3,7],{306:function(t,e,n){},307:function(t,e,n){"use strict";n(306)},308:function(t,e,n){"use strict";n.r(e);var r={name:"BaseButton",components:{},props:{loading:{type:Boolean,default:!1}},data:function(){return{}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{}},s=(n(307),n(42)),a=Object(s.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("button",t._g({attrs:{type:"button",disabled:t.loading}},t.$listeners),[n("span",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"spinner-border spinner-border-sm",attrs:{role:"status"}},[n("span",{staticClass:"sr-only"},[t._v("Loading...")])]),t._v(" "),t.loading?n("span",[t._v("loading")]):t._t("default",[t._v("Click")])],2)}),[],!1,null,null,null);e.default=a.exports},331:function(t,e,n){},376:function(t,e,n){var r=n(0),s=n(3),a=n(104),i=[].slice,o=function(t){return function(e,n){var r=arguments.length>2,s=r?i.call(arguments,2):void 0;return t(r?function(){("function"==typeof e?e:Function(e)).apply(this,s)}:e,n)}};r({global:!0,bind:!0,forced:/MSIE .\./.test(a)},{setTimeout:o(s.setTimeout),setInterval:o(s.setInterval)})},377:function(t,e,n){"use strict";n(331)},392:function(t,e,n){"use strict";n.r(e);n(9),n(376),n(91);var r=n(46),s={name:"ArrayMap",components:{BaseButton:n(308).default},props:{},data:function(){return{loading:!1,list:[1,2,3],consoleList:[],resultList:[]}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{asyncMap:function(t,e){return Object(r.a)(regeneratorRuntime.mark((function n(){var r,s,a;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r=[],s=0;case 2:if(!(s<t.length)){n.next=10;break}return n.next=5,e(t[s],s,t);case 5:a=n.sent,r.push(a);case 7:s++,n.next=2;break;case 10:return n.abrupt("return",r);case 11:case"end":return n.stop()}}),n)})))()},timeout:function(t,e){return new Promise((function(n){return setTimeout((function(){t(),n()}),e)}))},clickHandler:function(){var t=this;this.loading=!0,this.consoleList=[],this.resultList=[],this.$nextTick(Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.asyncMap(t.list,function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(n){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=Math.floor(5*Math.random()),e.next=3,t.timeout((function(){t.consoleList.push({currentItem:n,wait:r})}),1e3*r);case 3:return e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:t.resultList=e.sent,t.loading=!1;case 4:case"end":return e.stop()}}),e)}))))}}},a=(n(377),n(42)),i=Object(a.a)(s,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"arrayMap"},[n("h2",{staticClass:"border-bottom-0"},[t._v("Get [1,2,3] order by order")]),t._v(" "),n("base-button",{class:["btn","btn-success",{"mb-3":t.consoleList.length}],attrs:{loading:t.loading},on:{click:t.clickHandler}}),t._v(" "),n("ul",{staticClass:"my-0"},t._l(t.consoleList,(function(e){return n("li",{key:"id"+e.currentItem},[t._v(t._s("Current value："+e.currentItem+"，Waiting time："+e.wait+"秒"))])})),0),t._v(" "),n("p",{directives:[{name:"show",rawName:"v-show",value:t.resultList.length,expression:"resultList.length"}]},[t._v("The final data："+t._s(JSON.stringify(t.resultList)))])],1)}),[],!1,null,null,null);e.default=i.exports}}]);