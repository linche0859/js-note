(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{437:function(s,t,a){"use strict";a.r(t);var e=a(42),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"變數與資料型別"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#變數與資料型別"}},[s._v("#")]),s._v(" 變數與資料型別")]),s._v(" "),a("h2",{attrs:{id:"變數"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#變數"}},[s._v("#")]),s._v(" 變數")]),s._v(" "),a("p",[s._v("由於 JavaScript 是弱型別的語言，變數本身無需宣告型別，型別的資訊只在值或物件本身，變數只是用來做為取得值或物件的參考。所以說在 "),a("strong",[s._v("執行時期")]),s._v(" 透過變數內容的參考，才會得知此變數有什麼操作的方式。")]),s._v(" "),a("blockquote",[a("p",[s._v("變數沒有型別，值才有。")])]),s._v(" "),a("h2",{attrs:{id:"資料型別"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#資料型別"}},[s._v("#")]),s._v(" 資料型別")]),s._v(" "),a("p",[s._v("可以分成基本型別 (Primitives) 與物件型別 (Object) 兩大類。")]),s._v(" "),a("p",[s._v("而基本型別又可以分成 "),a("code",[s._v("string")]),s._v("、"),a("code",[s._v("number")]),s._v("、"),a("code",[s._v("boolean")]),s._v("、"),a("code",[s._v("null")]),s._v("、"),a("code",[s._v("undefined")]),s._v("。除了這些型別，其他都可以歸類至物件型別。")]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("提醒")]),s._v(" "),a("p",[s._v("ES6 之後多了新的型別："),a("code",[s._v("Symbol")]),s._v("、"),a("code",[s._v("BigInt")]),s._v("。")])]),s._v(" "),a("p",[s._v("判斷型別的方式，可以透過 "),a("code",[s._v("typeof")]),s._v(" 運算子，但有時會有例外：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("typeof")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 'object'")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"string-字串"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#string-字串"}},[s._v("#")]),s._v(" string 字串")]),s._v(" "),a("p",[s._v("如果想使用多行字串時，可以透過 "),a("code",[s._v("\\")]),s._v(" (反斜線) 來繼續：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'aaa \\\n  bbb \\\n  ccc'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 'aaa bbb ccc'")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[s._v("注意")]),s._v(" "),a("p",[a("code",[s._v("\\")]),s._v(" 符號後面不能有任何東西，包括空白字元。不然會有 "),a("code",[s._v("Uncaught SyntaxError: Invalid or unexpected token")]),s._v(" 錯誤。")])]),s._v(" "),a("h3",{attrs:{id:"number-數字"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#number-數字"}},[s._v("#")]),s._v(" number 數字")]),s._v(" "),a("p",[s._v("除了常見的整數與小數點一類的數字外，另外還有幾種特殊的數字：")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("Infinity")]),s._v(" (無限大)")]),s._v(" "),a("li",[a("code",[s._v("-Infinity")]),s._v(" (負無限大)")]),s._v(" "),a("li",[a("code",[s._v("NaN")]),s._v(" (不是數值，Not a Number)")])]),s._v(" "),a("p",[a("code",[s._v("Infinity")]),s._v(" 與 "),a("code",[s._v("-Infinity")]),s._v(" 分別用來表示數學上的無限大與負無限大，一個正數除以 "),a("code",[s._v("0")]),s._v("，結果會得到是 "),a("code",[s._v("Infinity")]),s._v("，而任何負數除以 "),a("code",[s._v("0")]),s._v(" 會得到 "),a("code",[s._v("-Infinity")]),s._v("。")]),s._v(" "),a("p",[s._v("而以下結果皆會得到 "),a("code",[s._v("NaN")]),s._v("：")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("0 / 0")])]),s._v(" "),a("li",[a("code",[s._v("Infinity / Infinity")])]),s._v(" "),a("li",[a("code",[s._v("-Infinity / -Infinity")])])]),s._v(" "),a("hr"),s._v(" "),a("p",[a("code",[s._v("NaN")]),s._v(" 與任何數字做數學運算，結果都是 "),a("code",[s._v("NaN")]),s._v("，也就是說，"),a("code",[s._v("NaN")]),s._v(" 並不等於任何的數字，甚至是自己。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token number"}},[s._v("NaN")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("===")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("NaN")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// false")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("而使用 "),a("code",[s._v("isNaN(value)")]),s._v(" 檢查變數是否為 "),a("code",[s._v("NaN")]),s._v(" 時，有幾個地方要注意：")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("isNaN(NaN)")]),s._v(" - true")]),s._v(" "),a("li",[a("code",[s._v("isNaN('123')")]),s._v(" - 因為 "),a("code",[s._v("'123'")]),s._v(" 可以透過隱含的 "),a("code",[s._v("Number()")]),s._v(" 轉為數字，所以會是 false")]),s._v(" "),a("li",[a("code",[s._v("isNaN('NaN')")]),s._v(" - 因為 "),a("code",[s._v("'NaN'")]),s._v(" 無法轉成數字，所以會是 true")])]),s._v(" "),a("h3",{attrs:{id:"null-與-undefined"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#null-與-undefined"}},[s._v("#")]),s._v(" null 與 undefined")]),s._v(" "),a("p",[s._v("雖然這兩種值透過 "),a("code",[s._v("Boolean()")]),s._v(" 強制轉型成 "),a("code",[s._v("boolean")]),s._v(" 時，都會代表 "),a("code",[s._v("false")]),s._v(" 的意思，但兩者間仍然有意義上的差別：")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("undefined")]),s._v(" - 此變數還沒給值，所以不知道是什麼")]),s._v(" "),a("li",[a("code",[s._v("null")]),s._v(" - 此變數可能曾經有值，也有可能沒有，但現在沒有值")])]),s._v(" "),a("p",[s._v("如果透過 "),a("code",[s._v("Number()")]),s._v(" 強制轉型可以看得出：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("Number")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 0")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("Number")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("undefined")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// NaN")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("h2",{attrs:{id:"參考"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#參考"}},[s._v("#")]),s._v(" 參考")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://ithelp.ithome.com.tw/articles/10190873",target:"_blank",rel:"noopener noreferrer"}},[s._v("變數與資料型別"),a("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=n.exports}}]);