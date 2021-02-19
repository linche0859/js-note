(window.webpackJsonp=window.webpackJsonp||[]).push([[4,8],{309:function(e,t,n){},310:function(e,t,n){"use strict";n(309)},311:function(e,t,n){"use strict";n.r(t);var r={name:"BaseButton",components:{},props:{loading:{type:Boolean,default:!1},outline:{type:Boolean,default:!1}},data:function(){return{}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{}},o=(n(310),n(41)),a=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",e._g({attrs:{type:"button",disabled:e.loading}},e.$listeners),[n("span",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],class:["loader","mr-2","w-6","h-6","border-4","border-solid","rounded-full",{"border-green-500":e.outline},{"border-white":!e.outline}]}),e._v(" "),e.loading?n("span",[e._v("loading")]):e._t("default",[e._v("Click")])],2)}),[],!1,null,"980f271e",null);t.default=a.exports},335:function(e,t,n){},390:function(e,t,n){"use strict";n(335)},402:function(e,t,n){"use strict";n.r(t);n(9),n(22),n(28),n(386),n(94);var r=n(45),o={name:"DownloadRandomImage",components:{BaseButton:n(311).default},props:{},data:function(){return{random:1,loading:!1}},computed:{imageUrl:function(){return"https://picsum.photos/200/300?random=".concat(this.random)}},watch:{},created:function(){},mounted:function(){},methods:{render:function(){var e=arguments,t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.length>0&&void 0!==e[0]?e[0]:function(){},t.loading=!0,n.next=4,t.$nextTick();case 4:return n.next=6,r();case 6:t.loading=!1;case 7:case"end":return n.stop()}}),n)})))()},randomHandler:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.render(Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.random=Math.floor(10*Math.random());case 1:case"end":return t.stop()}}),t)}))));case 1:case"end":return t.stop()}}),t)})))()},downloadHandler:function(){var e=this;this.render(Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,o,a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch(e.imageUrl);case 2:return n=t.sent,t.next=5,n.blob();case 5:r=t.sent,o=URL.createObjectURL(r),a=document.createElement("a"),document.body.appendChild(a),a.href=o,a.download="photo.jpeg",a.click(),document.body.removeChild(a);case 13:case"end":return t.stop()}}),t)}))))}}},a=(n(390),n(41)),c=Object(a.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"downloadRandomImage flex flex-col items-center"},[n("img",{staticClass:"mb-4 rounded",attrs:{src:e.imageUrl,alt:"photo"}}),e._v(" "),n("div",{staticClass:"flex"},[n("base-button",{staticClass:"btn-outline-success mr-4",attrs:{outline:!0,loading:e.loading},on:{click:e.randomHandler}},[e._v("Random")]),e._v(" "),n("base-button",{staticClass:"btn-outline-success",attrs:{outline:!0,loading:e.loading},on:{click:e.downloadHandler}},[e._v("Download")])],1)])}),[],!1,null,"6508d4b8",null);t.default=c.exports}}]);