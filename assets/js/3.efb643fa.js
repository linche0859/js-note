(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{320:function(t,n,e){},362:function(t,n,e){var r=e(0),s=e(3),a=e(99),i=[].slice,c=function(t){return function(n,e){var r=arguments.length>2,s=r?i.call(arguments,2):void 0;return t(r?function(){("function"==typeof n?n:Function(n)).apply(this,s)}:n,e)}};r({global:!0,bind:!0,forced:/MSIE .\./.test(a)},{setTimeout:c(s.setTimeout),setInterval:c(s.setInterval)})},363:function(t,n,e){"use strict";var r=e(320);e.n(r).a},368:function(t,n,e){"use strict";e.r(n);e(9),e(362),e(100);var r=e(61),s={name:"ArrayMap",components:{},props:{},data:function(){return{loading:!1,list:[1,2,3],consoleList:[],resultList:[]}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{asyncMap:function(t,n){return Object(r.a)(regeneratorRuntime.mark((function e(){var r,s,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=[],s=0;case 2:if(!(s<t.length)){e.next=10;break}return e.next=5,n(t[s],s,t);case 5:a=e.sent,r.push(a);case 7:s++,e.next=2;break;case 10:return e.abrupt("return",r);case 11:case"end":return e.stop()}}),e)})))()},timeout:function(t,n){return new Promise((function(e){return setTimeout((function(){t(),e()}),n)}))},clickHandler:function(){var t=this;this.loading=!0,this.consoleList=[],this.resultList=[],this.$nextTick(Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.asyncMap(t.list,function(){var n=Object(r.a)(regeneratorRuntime.mark((function n(e){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=Math.floor(10*Math.random()),n.next=3,t.timeout((function(){t.consoleList.push({currentItem:e,wait:r})}),1e3*r);case 3:return n.abrupt("return",e);case 4:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}());case 2:t.resultList=n.sent,t.loading=!1;case 4:case"end":return n.stop()}}),n)}))))}}},a=(e(363),e(42)),i=Object(a.a)(s,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"arrayMap"},[e("button",{class:["btn","btn-success",{"mb-3":t.consoleList.length}],attrs:{disabled:t.loading},on:{click:t.clickHandler}},[t.loading?e("span",[t._m(0),t._v(" "),e("span",[t._v("loading")])]):e("span",[t._v("Click")])]),t._v(" "),e("ul",{staticClass:"my-0"},t._l(t.consoleList,(function(n){return e("li",{key:"id"+n.currentItem},[t._v(t._s("目前讀取的值："+n.currentItem+"，等待時間："+n.wait+"秒"))])})),0),t._v(" "),e("p",{directives:[{name:"show",rawName:"v-show",value:t.resultList.length,expression:"resultList.length"}]},[t._v("最終取得的資料："+t._s(JSON.stringify(t.resultList)))])])}),[function(){var t=this.$createElement,n=this._self._c||t;return n("span",{staticClass:"spinner-border spinner-border-sm",attrs:{role:"status"}},[n("span",{staticClass:"sr-only"},[this._v("Loading...")])])}],!1,null,null,null);n.default=i.exports}}]);