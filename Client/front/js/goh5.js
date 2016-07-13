'use strict';

var utils = require('./utils.js');
var ani = require('./animate.js');

var defaultConfig = window.defaultConfig;

// arrow位置
if (defaultConfig.direction == 'horizontal') {
    utils.$('#arrow').addClass('horizontal_arrow');
} else if (defaultConfig.direction == 'vertical') {
    utils.$('#arrow').addClass('vertical_arrow');
}

var isInited = false; // swiper的bug，不是初始页的时候会出发slidechangeend事件
var setConfig = {
    direction: defaultConfig.direction,
    loop: defaultConfig.loop,
    effect: defaultConfig.effect,
    noSwiping: true,
    noSwipingClass: 'swipe-no-swiping',
    onInit: function(swiper){
        ani.swiperAnimateCache(function(){
            ani.swiperAnimate(swiper);
            isInited = true;
        });
    },
    onSlideChangeEnd: function(swiper){
        if(isInited){
            ani.swiperAnimate(swiper);
        }
    }
};

// 初始页面
setConfig.initialSlide = defaultConfig.autoBackPrePage ? (utils.getCookie('initialSlide') ? (setConfig.loop ? Number(utils.getCookie('initialSlide')) - 1 : Number(utils.getCookie('initialSlide'))) : 0) : 0;

var GoH5 = new Swiper('.swiper-container', setConfig);
GoH5.on('slideChangeEnd', function(swiper) {
	if(defaultConfig.autoBackPrePage){
        utils.setCookie('initialSlide', swiper.activeIndex, 2);
	}
})


// for debug
window.GoH5 = GoH5;
window.utils = utils;
window.$ = utils.$;



module.exports = GoH5;