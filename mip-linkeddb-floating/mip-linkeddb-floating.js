/**
 * @file mip-linkeddb-floating 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('jquery'); // zepto 不支持 .prev().innerHeight()  所以才使用 jquery

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var topNavListTop = $(ele).prev().innerHeight();
        var topNavListHeight = $(ele).find('#topNavList').innerHeight();
        console.log(topNavListTop);
        $(window).on('scroll', function () {
            console.log($(this).scrollTop());
            if ($(this).scrollTop() > topNavListTop) {
                $(ele).find('#topNavList').addClass('fixed');
                $(ele).next().css({
                    marginTop: topNavListHeight
                });
            } else {
                $(ele).find('#topNavList').removeClass('fixed');
                $(ele).next().css({
                    marginTop: 0
                });
            }
        });
    };

    return customElement;
});
