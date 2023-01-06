/**
 * @license Vanillabox
 * (C) 2013 cocopon.
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 */!function t(e,n,i){function o(a,s){if(!n[a]){if(!e[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(r)return r(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var h=n[a]={exports:{}};e[a][0].call(h.exports,function(t){var n=e[a][1][t];return o(n?n:t)},h,h.exports,t,e,n,i)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<i.length;a++)o(i[a]);return o}({1:[function(t,e,n){"use strict";var i=t("./util.js"),o={};o.None={showMask:function(t){return t.getElement().show().promise()},hideMask:function(t){return t.getElement().hide()},showFrame:function(t){return o.None.resizeFrame(t),t.getElement().show().promise()},hideFrame:function(t){return t.getElement().hide()},resizeFrame:function(t){var e=t.getContainer(),n=e.getSize(),o=t.getPreferredOffset(n);return e.getElement().css({width:n.width,height:n.height}),t.getElement().css({left:o.left,top:o.top}),i.Deferred.emptyPromise()},showContent:function(t){return t.getElement().show().promise()},hideContent:function(t){return t.getElement().hide().promise()}},o.Default={showMask:function(t){return t.getElement().fadeIn(200).promise()},hideMask:function(t){return t.getElement().fadeOut(300).promise()},animateFrame_:function(t,e,n,i){var o=t.getContainer(),r=o.getElement();r.stop();var a=r.animate({width:e.width,height:e.height},i),s=t.getElement();s.stop();var u=s.animate({left:n.left,top:n.top},i);return $.when(a,u)},showFrame:function(t){var e=t.getContainer(),n=e.getSize(),o=t.getPreferredOffset(n);return e.getElement().css({width:n.width,height:n.height}),t.getElement().css({left:o.left,top:o.top}),i.Deferred.emptyPromise()},hideFrame:function(){return i.Deferred.emptyPromise()},resizeFrame:function(t){var e=t.getContainer(),n=e.getSize(),i=t.getPreferredOffset(n);return o.Default.animateFrame_(t,n,i,300)},showContent:function(t){return t.getElement().fadeIn(200).promise()},hideContent:function(t){return t.getElement().fadeOut(300).promise()}},e.exports=o},{"./util.js":19}],2:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=t("./animation.js"),a=function(){function t(){i(this,t)}return o(t,null,[{key:"get",value:function(e){var n=t.ANIMATIONS_[e];return n||t.getDefault()}},{key:"getDefault",value:function(){return r.Default}}]),t}();a.ANIMATIONS_={none:r.None,"default":r.Default},e.exports=a},{"./animation.js":1}],3:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=t("./events.js"),a=t("./util.js"),s=function(){function t(e){i(this,t),this.cls_=e.cls,this.disabled_=a.getOrDefault(e.disabled,!1),this.setup_()}return o(t,[{key:"setup_",value:function(){var t=$("<div>");t.addClass(a.CSS_PREFIX+"button"),this.cls_&&t.addClass(this.cls_),t.attr("ontouchstart","void(0)"),this.elem_=t,this.attach_()}},{key:"dispose",value:function(){this.elem_=null}},{key:"attach_",value:function(){var t=this.getElement();t.on("click",$.proxy(this.onClick_,this))}},{key:"detach_",value:function(){var t=this.getElement();t.off("click",this.onClick_)}},{key:"getElement",value:function(){return this.elem_}},{key:"isDisabled",value:function(){return this.disabled_}},{key:"setDisabled",value:function(t){var e=this.elem_;this.disabled_=t,this.disabled_?e.addClass(a.CSS_PREFIX+"disabled"):e.removeClass(a.CSS_PREFIX+"disabled")}},{key:"onClick_",value:function(t){t.stopPropagation(),this.isDisabled()||$(this).trigger(r.CLICK)}}]),t}();e.exports=s},{"./events.js":9,"./util.js":19}],4:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=t("./animation_provider.js"),a=t("./events.js"),s=t("./util.js"),u=function(){function t(e){i(this,t);var n=e||{};this.animation_=s.getOrDefault(n.animation,r.getDefault()),this.adjustToWindow_=s.getOrDefault(n.adjustToWindow,"both"),this.setup_()}return o(t,[{key:"setup_",value:function(){var t=$("<div>");t.addClass(s.CSS_PREFIX+"container"),this.elem_=t,this.attach_()}},{key:"dispose",value:function(){this.detach_(),this.elem_=null}},{key:"attach_",value:function(){}},{key:"detach_",value:function(){this.detachContent_()}},{key:"attachContent_",value:function(){var t=this.getContent();$(t).on(a.COMPLETE,$.proxy(this.onContentComplete_,this))}},{key:"detachContent_",value:function(){var t=this.getContent();t&&$(t).off(a.COMPLETE,this.onContentComplete_)}},{key:"getElement",value:function(){return this.elem_}},{key:"getContent",value:function(){return this.content_}},{key:"setContent",value:function(t){var e=this,n=this.animation_;if(t!==this.content_&&(this.content_&&!function(){e.detachContent_();var t=e.content_;n.hideContent(t).done(function(){e.onContentHide_(t)})}(),this.content_=t,this.content_)){this.attachContent_(),this.maxContentSize_&&this.applyMaxContentSize_();var i=this.getElement(),o=this.content_.getElement(),r=i.find("> *");0===r.length?i.append(o):o.insertBefore(r.first()),n.showContent(this.content_).done(function(){e.onContentShow_()})}}},{key:"getSize",value:function(){var e=this.getContent(),n={width:0,height:0};return e&&(n=e.getSize()),{width:Math.max(n.width,t.MIN_WIDTH),height:Math.max(n.height,t.MIN_HEIGHT)}}},{key:"needsAdjustment",value:function(t){return this.adjustToWindow_===!0||"both"===this.adjustToWindow_||this.adjustToWindow_===t}},{key:"updateMaxContentSize_",value:function(){var e=t.CONTENT_SIZE_SAFETY_MARGIN;this.maxContentSize_={width:this.needsAdjustment("horizontal")?s.Dom.getViewportWidth()-e:Number.MAX_VALUE,height:this.needsAdjustment("vertical")?s.Dom.getViewportHeight()-e:Number.MAX_VALUE};var n=this.content_;n&&this.applyMaxContentSize_()}},{key:"applyMaxContentSize_",value:function(){var e=this.getContent(),n=this.maxContentSize_;e.setMaxContentSize(Math.max(n.width,t.MIN_WIDTH),Math.max(n.height,t.MIN_HEIGHT))}},{key:"layout",value:function(){var t=this.getContent(),e=t.getSize();t.setOffset(-Math.round(e.width/2),-Math.round(e.height/2))}},{key:"onContentComplete_",value:function(){this.layout()}},{key:"onContentShow_",value:function(){$(this).trigger(a.CONTENT_SHOW,[this,this.getContent()])}},{key:"onContentHide_",value:function(t){$(this).trigger(a.CONTENT_HIDE,[this,t])}}]),t}();u.CONTENT_SIZE_SAFETY_MARGIN=100,u.MIN_WIDTH=200,u.MIN_HEIGHT=150,e.exports=u},{"./animation_provider.js":2,"./events.js":9,"./util.js":19}],5:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=t("./events.js"),a=t("./util.js"),s=function(){function t(e){i(this,t);var n=e||{};this.loaded_=!1,this.success_=!1,this.path_=n.path,this.title_=a.getOrDefault(n.title,""),this.setup_()}return o(t,[{key:"setup_",value:function(){var t=$("<div>");t.addClass(a.CSS_PREFIX+"content"),this.elem_=t,this.setupInternal_(),this.attach_()}},{key:"setupInternal_",value:function(){}},{key:"attach_",value:function(){}},{key:"detach_",value:function(){}},{key:"dispose",value:function(){this.detach_(),this.elem_.remove(),this.elem_=null}},{key:"shouldUnloadOnHide",value:function(){return!1}},{key:"isLoaded",value:function(){return this.loaded_}},{key:"getElement",value:function(){return this.elem_}},{key:"getTitle",value:function(){return this.title_}},{key:"getSize",value:function(){var t=this.getElement();return{width:t.width(),height:t.height()}}},{key:"setOffset",value:function(t,e){var n=this.getElement();n.css({marginLeft:t,marginTop:e})}},{key:"setMaxContentSize",value:function(t,e){this.getElement().css({maxWidth:t,maxHeight:e})}},{key:"load",value:function(){var t=this.getElement();return t.addClass(a.CSS_PREFIX+"loading"),this.loaded_?void this.onComplete_(this.success_):void this.loadInternal_()}},{key:"loadInternal_",value:function(){}},{key:"unload",value:function(){this.unloadInternal_(),this.loaded_=!1}},{key:"unloadInternal_",value:function(){}},{key:"onComplete_",value:function(t){var e=this.getElement();this.loaded_=!0,this.success_=t,e.removeClass(a.CSS_PREFIX+"loading"),t||e.addClass(a.CSS_PREFIX+"error"),$(this).trigger(r.COMPLETE,t)}}]),t}();e.exports=s},{"./events.js":9,"./util.js":19}],6:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=t("./iframe_content.js"),a=t("./image_content.js"),s=function(){function t(){i(this,t)}return o(t,null,[{key:"create",value:function(e,n){var i=t.FACTORIES_[n.type];if(!i)throw new VanillaException(VanillaException.Types.INVALID_TYPE);return i(e,n)}}]),t}();s.FACTORIES_={image:function(t){return new a({path:t.attr("href"),title:t.attr("title")})},iframe:function(t,e){return new r({path:t.attr("href"),preferredWidth:e.preferredWidth,preferredHeight:e.preferredHeight,title:t.attr("title")})}},e.exports=s},{"./iframe_content.js":12,"./image_content.js":13}],7:[function(t,e,n){"use strict";e.exports={animation:"default",closeButton:!1,adjustToWindow:"both",keyboard:!0,loop:!1,preferredHeight:600,preferredWidth:800,repositionOnScroll:!1,type:"image",grouping:!0}},{}],8:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(t,e,n){for(var i=!0;i;){var o=t,r=e,a=n;i=!1,null===o&&(o=Function.prototype);var s=Object.getOwnPropertyDescriptor(o,r);if(void 0!==s){if("value"in s)return s.value;var u=s.get;return void 0===u?void 0:u.call(a)}var l=Object.getPrototypeOf(o);if(null===l)return void 0;t=l,e=r,n=a,i=!0,s=l=void 0}},s=t("./content.js"),u=t("./events.js"),l=t("./util.js"),h=function(t){function e(){i(this,e),a(Object.getPrototypeOf(e.prototype),"constructor",this).apply(this,arguments)}return o(e,t),r(e,[{key:"setup_",value:function(){a(Object.getPrototypeOf(e.prototype),"setup_",this).call(this),this.elem_.addClass(l.CSS_PREFIX+"empty")}},{key:"load",value:function(){var t=this;setTimeout(function(){$(t).trigger(u.COMPLETE,!0)},0)}}]),e}(s);e.exports=h},{"./content.js":5,"./events.js":9,"./util.js":19}],9:[function(t,e,n){"use strict";var i=t("./util.js"),o={CHANGE:i.EVENT_PREFIX+"change",CLICK:i.EVENT_PREFIX+"click",COMPLETE:i.EVENT_PREFIX+"complete",CONTENT_HIDE:i.EVENT_PREFIX+"content_hide",CONTENT_SHOW:i.EVENT_PREFIX+"content_show",HIDE:i.EVENT_PREFIX+"hide",LOAD:i.EVENT_PREFIX+"load",SHOW:i.EVENT_PREFIX+"show"};e.exports=o},{"./util.js":19}],10:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=function(){function t(e){i(this,t),this.type_=e}return o(t,[{key:"getType",value:function(){return this.type_}}]),t}();r.Types={INVALID_TYPE:"invalid_type",NO_IMAGE:"no_image"},e.exports=r},{}],11:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=t("./container.js"),a=t("./util.js"),s=function(){function t(e){i(this,t);var n=e||{},o=new r({animation:n.animation,adjustToWindow:n.adjustToWindow});this.container_=o,this.setup_(),this.attach_()}return o(t,[{key:"setup_",value:function(){var t=$("<div>");t.addClass(a.CSS_PREFIX+"frame"),this.elem_=t;var e=this.container_;this.elem_.append(e.getElement())}},{key:"dispose",value:function(){this.container_.dispose(),this.container_=null,this.detach_(),this.elem_=null}},{key:"attach_",value:function(){this.elem_.on("click",$.proxy(this.onClick_,this))}},{key:"detach_",value:function(){this.elem_.off("click",this.onClick_)}},{key:"getElement",value:function(){return this.elem_}},{key:"getContainer",value:function(){return this.container_}},{key:"getPreferredOffset",value:function(t){var e=this.getContainer(),n=e.getElement(),i=n.width(),o=n.height();n.width(t.width),n.height(t.height);var r=$(window),s=this.getElement(),u=a.Dom.getViewportWidth(),l=a.Dom.getViewportHeight(),h=Math.round(r.scrollLeft()+(u-s.outerWidth())/2),c=Math.max(Math.round(r.scrollTop()+(l-s.outerHeight())/2),0);return n.width(i),n.height(o),{left:h,top:c}}},{key:"onClick_",value:function(t){t.stopPropagation()}}]),t}();s.RESIZE_TIMEOUT_DELAY=500,e.exports=s},{"./container.js":4,"./util.js":19}],12:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(t,e,n){for(var i=!0;i;){var o=t,r=e,a=n;i=!1,null===o&&(o=Function.prototype);var s=Object.getOwnPropertyDescriptor(o,r);if(void 0!==s){if("value"in s)return s.value;var u=s.get;return void 0===u?void 0:u.call(a)}var l=Object.getPrototypeOf(o);if(null===l)return void 0;t=l,e=r,n=a,i=!0,s=l=void 0}},s=t("./content.js"),u=t("./util.js"),l=function(t){function e(t){i(this,e);var n=t||{};a(Object.getPrototypeOf(e.prototype),"constructor",this).call(this,n),this.preferredWidth_=n.preferredWidth,this.preferredHeight_=n.preferredHeight}return o(e,t),r(e,[{key:"setupInternal_",value:function(){var t=$("<iframe>");t.attr({frameborder:0,allowfullscreen:!0}),this.elem_.append(t),this.iframeElem_=t}},{key:"dispose",value:function(){a(Object.getPrototypeOf(e.prototype),"dispose",this).call(this),this.iframeElem_=null}},{key:"shouldUnloadOnHide",value:function(){return!0}},{key:"attach_",value:function(){var t=this.iframeElem_;t.on("load",$.proxy(this.onLoad_,this)),t.on("error",$.proxy(this.onError_,this))}},{key:"detach_",value:function(){var t=this.iframeElem_;t.off("load",this.onLoad_),t.off("error",this.onError_)}},{key:"getFlexibleElement",value:function(){return u.Browser.isIos()?this.getElement():this.iframeElem_}},{key:"getSize",value:function(){var t=this.getFlexibleElement();return{width:t.width(),height:t.height()}}},{key:"setMaxContentSize",value:function(t,e){var n=this.getFlexibleElement();n.css({maxWidth:t,maxHeight:e})}},{key:"loadInternal_",value:function(){this.iframeElem_.attr("src",this.path_)}},{key:"unloadInternal_",value:function(){this.iframeElem_.attr("src",e.EMPTY_SRC);var t=this.getFlexibleElement();t.width(""),t.height("")}},{key:"onLoad_",value:function(){var t=this.iframeElem_,n=t.attr("src");if(n&&n!==e.EMPTY_SRC){var i=this.getFlexibleElement();i.width(this.preferredWidth_),i.height(this.preferredHeight_),this.onComplete_(!0)}}},{key:"onError_",value:function(){this.onComplete_(!1)}}]),e}(s);l.EMPTY_SRC="about:blank",e.exports=l},{"./content.js":5,"./util.js":19}],13:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(t,e,n){for(var i=!0;i;){var o=t,r=e,a=n;i=!1,null===o&&(o=Function.prototype);var s=Object.getOwnPropertyDescriptor(o,r);if(void 0!==s){if("value"in s)return s.value;var u=s.get;return void 0===u?void 0:u.call(a)}var l=Object.getPrototypeOf(o);if(null===l)return void 0;t=l,e=r,n=a,i=!0,s=l=void 0}},s=t("./content.js"),u=function(t){function e(t){i(this,e),a(Object.getPrototypeOf(e.prototype),"constructor",this).call(this,t)}return o(e,t),r(e,[{key:"setupInternal_",value:function(){var t=$("<img>");this.elem_.append(t),this.imgElem_=t}},{key:"dispose",value:function(){a(Object.getPrototypeOf(e.prototype),"dispose",this).call(this),this.imgElem_=null}},{key:"attach_",value:function(){var t=this.imgElem_;t.on("load",$.proxy(this.onLoad_,this)),t.on("error",$.proxy(this.onError_,this))}},{key:"detach_",value:function(){var t=this.imgElem_;t.off("load",this.onLoad_),t.off("error",this.onError_)}},{key:"setMaxContentSize",value:function(t,e){this.imgElem_.css({maxWidth:t,maxHeight:e})}},{key:"loadInternal_",value:function(){this.imgElem_.attr("src",this.path_)}},{key:"unloadInternal_",value:function(){this.imgElem_.attr("src",e.EMPTY_SRC)}},{key:"onLoad_",value:function(){this.imgElem_.attr("src")!==e.EMPTY_SRC&&this.onComplete_(!0)}},{key:"onError_",value:function(){this.onComplete_(!1)}}]),e}(s);u.EMPTY_SRC="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",e.exports=u},{"./content.js":5}],14:[function(t,e,n){"use strict";var i=t("./animation_provider.js"),o=t("./default_config.js"),r=t("./vanillabox.js");$.fn.vanillabox=function(t){var e={};$.extend(e,o),$.extend(e,t);var n=$(this),a=i.get(e.animation),s=new r({animation:a,closeButton:e.closeButton,adjustToWindow:e.adjustToWindow,keyboard:e.keyboard,loop:e.loop,preferredHeight:e.preferredHeight,preferredWidth:e.preferredWidth,repositionOnScroll:e.repositionOnScroll,targets:n,type:e.type,grouping:e.grouping});return s}},{"./animation_provider.js":2,"./default_config.js":7,"./vanillabox.js":20}],15:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=t("./util.js"),a=function(){function t(e){i(this,t),this.cls_=e.cls,this.setup_()}return o(t,[{key:"setup_",value:function(){var t=$("<div>");t.addClass(r.CSS_PREFIX+"label"),this.cls_&&t.addClass(this.cls_),this.elem_=t}},{key:"dispose",value:function(){this.elem_=null}},{key:"getElement",value:function(){return this.elem_}},{key:"getText",value:function(){return this.elem_.text()}},{key:"setText",value:function(t){this.elem_.text(t)}}]),t}();e.exports=a},{"./util.js":19}],16:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=t("./events.js"),a=t("./util.js"),s=function(){function t(){i(this,t),this.setup_()}return o(t,[{key:"setup_",value:function(){var t=$("<div>");t.addClass(a.CSS_PREFIX+"mask"),this.elem_=t,this.attach_()}},{key:"dispose",value:function(){this.detach_(),this.elem_=null}},{key:"attach_",value:function(){$(window).on("resize",$.proxy(this.onWindowResize_,this));var t=this.getElement();t.on("click",$.proxy(this.onClick_,this))}},{key:"detach_",value:function(){$(window).off("resize",this.onWindowResize_);var t=this.getElement();t.off("click",this.onClick_)}},{key:"getElement",value:function(){return this.elem_}},{key:"layout",value:function(){var t=this.getElement();t.width(""),t.height("");var e=$(window),n=$(document),i=Math.max(n.width(),e.width()),o=Math.max(n.height(),e.height());t.width(i),t.height(o)}},{key:"onWindowResize_",value:function(){this.layout()}},{key:"onClick_",value:function(){$(this).trigger(r.CLICK)}}]),t}();e.exports=s},{"./events.js":9,"./util.js":19}],17:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=t("./events.js"),a=t("./util.js"),s=function(){function t(e){i(this,t);var n=e||{};this.totalPages_=a.getOrDefault(n.totalPages,1),this.allowsLoop_=a.getOrDefault(n.loop,!1),this.setPage(a.getOrDefault(n.page,0))}return o(t,[{key:"getPage",value:function(){return this.currentPage_}},{key:"setPage",value:function(t){var e=this.currentPage_,n=this.getTotalPages(),i=Math.min(Math.max(t,0),n-1);this.currentPage_=i,e!==i&&$(this).trigger(r.CHANGE)}},{key:"getTotalPages",value:function(){return this.totalPages_}},{key:"hasPrevious",value:function(){return this.allowsLoop_?!0:this.currentPage_>0}},{key:"hasNext",value:function(){if(this.allowsLoop_)return!0;var t=this.getTotalPages();return this.currentPage_<t-1}},{key:"next",value:function(){var t=this.getTotalPages(),e=this.currentPage_,n=e+1;n>t-1&&(n=this.allowsLoop_?0:t-1),this.currentPage_=n,e!==n&&$(this).trigger(r.CHANGE)}},{key:"previous",value:function(){var t=this.getTotalPages(),e=this.currentPage_,n=e-1;0>n&&(n=this.allowsLoop_?t-1:0),this.currentPage_=n,e!==n&&$(this).trigger(r.CHANGE)}}]),t}();e.exports=s},{"./events.js":9,"./util.js":19}],18:[function(t,e,n){"use strict";t("./jquery_fn.js")},{"./jquery_fn.js":14}],19:[function(t,e,n){"use strict";var i={ROOT_CSS:"vnbx",CSS_PREFIX:"vnbx-",EVENT_PREFIX:"vnbx_",isDefined:function(t){return void 0!==t},getOrDefault:function(t,e){return i.isDefined(t)?t:e}};i.Array={forEach:function(t,e,n){for(var i=n||void 0,o=t.length,r=0;o>r;r++)e.call(i,t[r],r)},map:function(t,e,n){for(var i=n||void 0,o=[],r=t.length,a=0;r>a;a++)o.push(e.call(i,t[a],a));return o},indexOf:function(t,e){for(var n=t.length,i=0;n>i;i++)if(t[i]===e)return i;return-1}},i.Deferred={emptyPromise:function(){var t=new $.Deferred;return setTimeout(function(){t.resolve()},0),t.promise()}},i.Dom={getViewportWidth:function(){return window.innerWidth||document.documentElement.clientWidth},getViewportHeight:function(){return window.innerHeight||document.documentElement.clientHeight}},i.Browser={isIos:function(){var t=navigator.userAgent;return!!t.match(/(ipod|iphone|ipad)/gi)}},e.exports=i},{}],20:[function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=t("./animation_provider.js"),a=t("./button.js"),s=t("./content_factory.js"),u=t("./empty_content.js"),l=t("./events.js"),h=t("./frame.js"),c=t("./label.js"),f=t("./mask.js"),_=t("./pager.js"),d=t("./util.js"),p=t("./exception.js"),v=function(){function t(e){if(i(this,t),!e.targets||0===e.targets.length)throw new p(p.Types.NO_IMAGE);this.showed_=!1,this.targetElems_=e.targets,this.animation_=d.getOrDefault(e.animation,r.getDefault()),this.repositionOnScroll_=e.repositionOnScroll,this.supportsKeyboard_=e.keyboard,this.closeButtonEnabled_=e.closeButton,this.adjustToWindow_=e.adjustToWindow,this.grouping_=e.grouping,this.contentOptions_={preferredWidth:e.preferredWidth,preferredHeight:e.preferredHeight,type:e.type},this.pager_=new _({loop:e.loop,totalPages:this.targetElems_.length}),this.setup_()}return o(t,[{key:"setup_",value:function(){var t=new f,e=t.getElement();e.addClass(d.ROOT_CSS),e.hide(),$("body").append(e),this.mask_=t,this.setupRootCss_();var n=new h({animation:this.animation_,adjustToWindow:this.adjustToWindow_}),i=n.getElement();this.frame_=n,e.append(i);var o=new c({cls:d.CSS_PREFIX+"title"});this.titleLabel_=o,i.append(o.getElement());var r=new c({cls:d.CSS_PREFIX+"pager"});this.pagerLabel_=r,i.append(r.getElement());var s=new a({cls:d.CSS_PREFIX+"prev"});this.prevButton_=s,i.append(s.getElement());var u=new a({cls:d.CSS_PREFIX+"next"});this.nextButton_=u,i.append(u.getElement());var l=new a({cls:d.CSS_PREFIX+"close"});this.closeButtonEnabled_||l.getElement().hide(),this.closeButton_=l,i.append(l.getElement()),this.attach_(),this.setupContents_()}},{key:"setupRootCss_",value:function(){var t=this.mask_.getElement();d.Browser.isIos()&&t.addClass(d.CSS_PREFIX+"ios"),this.closeButtonEnabled_&&t.addClass(d.CSS_PREFIX+"close-button-enabled"),this.grouping_&&this.pager_.getTotalPages()>1&&t.addClass(d.CSS_PREFIX+"group")}},{key:"dispose",value:function(){this.detachWindow_(),this.detach_(),this.disposeAllContents_(),this.titleLabel_.dispose(),this.titleLabel_=null,this.pagerLabel_.dispose(),this.pagerLabel_=null,this.closeButton_.dispose(),this.closeButton_=null,this.prevButton_.dispose(),this.prevButton_=null,this.nextButton_.dispose(),this.nextButton_=null,this.frame_.dispose(),this.frame_=null,this.mask_.getElement().remove(),this.mask_.dispose(),this.mask_=null}},{key:"setupContents_",value:function(){var t=this;this.contents_=d.Array.map(this.targetElems_,function(e){var n=$(e);return s.create(n,t.contentOptions_)});var e=new u;this.setContent_(e)}},{key:"disposeAllContents_",value:function(){var t=this.frame_.getContainer();t.setContent(null),this.contents_&&(d.Array.forEach(this.contents_,function(t){t.dispose()}),this.contents_=null)}},{key:"attach_",value:function(){this.targetElems_.on("click",$.proxy(this.onTargetElementClick_,this)),$(this.mask_).on(l.CLICK,$.proxy(this.onMaskClick_,this));var t=this.frame_.getContainer();$(t).on(l.CONTENT_HIDE,$.proxy(this.onContentHide_,this));var e=this.pager_;$(e).on(l.CHANGE,$.proxy(this.onPagerChange_,this)),$(this.closeButton_).on(l.CLICK,$.proxy(this.onCloseButtonClick_,this)),$(this.prevButton_).on(l.CLICK,$.proxy(this.onPreviousButtonClick_,this)),$(this.nextButton_).on(l.CLICK,$.proxy(this.onNextButtonClick_,this))}},{key:"detach_",value:function(){this.targetElems_.off("click",this.onTargetElementClick_),$(this.mask_).off(l.CLICK,this.onMaskClick_);var t=this.frame_.getContainer();$(t).off(l.CONTENT_HIDE,this.onContentHide_);var e=this.pager_;$(e).off(l.CHANGE,this.onPagerChange_),$(this.closeButton_).off(l.CLICK,this.onCloseButtonClick_),$(this.prevButton_).off(l.CLICK,this.onPreviousButtonClick_),$(this.nextButton_).off(l.CLICK,this.onNextButtonClick_),this.detachContent_(),this.content_=null}},{key:"attachWindow_",value:function(){var t=$(window),e=$(document);t.on("resize",$.proxy(this.onWindowResize_,this)),t.on("scroll",$.proxy(this.onWindowScroll_,this)),e.on("keyup",$.proxy(this.onDocumentKeyUp_,this))}},{key:"detachWindow_",value:function(){var t=$(window),e=$(document);t.off("resize",this.onWindowResize_,this),t.off("scroll",this.onWindowScroll_,this),e.off("keyup",this.onDocumentKeyUp_,this)}},{key:"attachContent_",value:function(){var t=this.getContent_();$(t).on(l.COMPLETE,$.proxy(this.onContentComplete_,this));var e=t.getElement();e.on("click",$.proxy(this.onContentClick_,this))}},{key:"detachContent_",value:function(){var t=this.getContent_();if(t){$(t).off("complete",this.onContentComplete_);var e=t.getElement();e.off("click",this.onContentClick_)}}},{key:"show",value:function(t){var e=this,n=this.animation_;if(this.showed_)return d.Deferred.emptyPromise();this.showed_=!0,null===this.contents_&&this.setupContents_(),this.attachWindow_();var i=this.frame_.getContainer();i.updateMaxContentSize_();var o=this.mask_;o.layout();var r=n.showMask(o),a=n.showFrame(this.frame_),s=this.pager_,u=d.getOrDefault(t,0),h=u!==s.getPage();return s.setPage(u),h||this.updateContent_(),$.when(r,a).then(function(){$(e).trigger(l.SHOW)})}},{key:"hide",value:function(){var t=this;return this.showed_?$.when(this.animation_.hideFrame(this.frame_),this.animation_.hideMask(this.mask_)).then(function(){t.detachWindow_(),t.showed_=!1,d.Array.forEach(t.contents_,function(t){t.shouldUnloadOnHide()&&t.unload()}),$(t).trigger(l.HIDE)}):d.Deferred.emptyPromise()}},{key:"setTitle_",value:function(t){var e=this.titleLabel_;e.setText(t)}},{key:"previous",value:function(){this.grouping_&&this.pager_.previous()}},{key:"next",value:function(){this.grouping_&&this.pager_.next()}},{key:"getContent_",value:function(){var t=this.frame_.getContainer();return t.getContent()}},{key:"setContent_",value:function(t){var e=this.frame_.getContainer(),n=this.getContent_();return n&&n.isLoaded()&&n===t?void e.layout():(this.detachContent_(),e.setContent(t),this.attachContent_(),this.setTitle_(t.getTitle()),t.load(),void e.layout())}},{key:"layout_",value:function(t){var e=t||this.repositionOnScroll_;e&&this.animation_.resizeFrame(this.frame_)}},{key:"updatePager_",value:function(){var t=this.pager_,e=t.getPage(),n=t.getTotalPages(),i=String(e+1)+" of "+String(n),o=this.pagerLabel_;o.setText(i),this.prevButton_.setDisabled(!t.hasPrevious()),this.nextButton_.setDisabled(!t.hasNext())}},{key:"updateContent_",value:function(){this.updatePager_();var t=this.pager_.getPage(),e=this.contents_[t];this.setContent_(e)}},{key:"delayedLayout_",value:function(e){var n=this;this.layoutTimeout_&&clearTimeout(this.layoutTimeout_),this.layoutTimeout_=setTimeout(function(){n.layout_(e)},t.DELAYED_LAYOUT_DELAY)}},{key:"onWindowResize_",value:function(){this.delayedLayout_(!1)}},{key:"onWindowScroll_",value:function(){this.delayedLayout_(!1)}},{key:"onDocumentKeyUp_",value:function(t){if(this.supportsKeyboard_)switch(t.keyCode){case 27:this.hide();break;case 37:this.previous();break;case 39:this.next()}}},{key:"onTargetElementClick_",value:function(t){var e=this.targetElems_.index(t.delegateTarget);0>e||(t.preventDefault(),this.show(e))}},{key:"onPagerChange_",value:function(){this.updateContent_()}},{key:"onMaskClick_",value:function(){this.closeButtonEnabled_||this.hide();
}},{key:"onCloseButtonClick_",value:function(){this.closeButtonEnabled_&&this.hide()}},{key:"onPreviousButtonClick_",value:function(){this.previous()}},{key:"onNextButtonClick_",value:function(){this.next()}},{key:"onContentComplete_",value:function(t,e){this.layout_(!0);var n=t.target,i=d.Array.indexOf(this.contents_,n);i>=0&&$(this).trigger(l.LOAD,[e,n,i])}},{key:"onContentClick_",value:function(t){var e=this.pager_;return t.stopPropagation(),this.grouping_?void(e.hasNext()?this.next():this.hide()):void this.hide()}},{key:"onContentHide_",value:function(t,e,n){n.shouldUnloadOnHide()&&n.unload()}}]),t}();v.DELAYED_LAYOUT_DELAY=300,e.exports=v},{"./animation_provider.js":2,"./button.js":3,"./content_factory.js":6,"./empty_content.js":8,"./events.js":9,"./exception.js":10,"./frame.js":11,"./label.js":15,"./mask.js":16,"./pager.js":17,"./util.js":19}]},{},[18]);