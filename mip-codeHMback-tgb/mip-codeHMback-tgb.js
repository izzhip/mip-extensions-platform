/**
 * @file mip-codeHMback-tgb 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var funId = element.getAttribute('funId') || '';
        var obj = document.getElementById(funId).value;
        var type = element.getAttribute('type') || '';
        var data = JSON.parse(obj);
        if (data.status === true) {
            var list = data.dto.listStock;
            var html = htmlHM(list, type);
            if (type === 'H') {
                document.getElementById('H_stocke').innerHTML = html;
                // 港股数据添加
                var codelist = '';
                for (var i = 0; i < list.length; i++) {
                    if (i === (list.length - 1)) {
                        codelist += list[i].keywordName;
                    } else {
                        codelist += list[i].keywordName + ',';
                    }
                }
                $('#' + funId).attr('name', codelist);
                if (type === 'M') {
                    document.getElementById('M_stocke').innerHTML = html;
                    // 美股数据添加
                    var codelist = '';
                    // 需要判断股票代码是否以gb_开头
                    for (var i = 0; i < list.length; i++) {
                        var head = list[i].keywordName.toLowerCase().substring(0, 3);
                        if (i === (list.length - 1)) {
                            if ('gb_' === head) {
                                codelist += list[i].keywordName.toLowerCase();
                            } else {
                                codelist += 'gb_' + list[i].keywordName.toLowerCase();
                            }
                        } else {
                            if ('gb_' === head) {
                                codelist += list[i].keywordName.toLowerCase() + ',';
                            } else {
                                codelist += 'gb_' + list[i].keywordName.toLowerCase() + ',';
                            }
                        }
                    }
                    $('#' + funId).attr('name', codelist);
                }
            }
        }
    };
    function htmlHM(list, type) {
        var html = '';
        for (var i = 0; i < list.length; i++) {
            html += '<div class="zfb_list_gupiao">' + '<a  id=' + list[i].keywordID + '  href="/quotes/';
            html += list[i].keywordName + '"><div class="gupiao_name">' + list[i].keywordName;
            html += '</div></a>' + '<a    href="/quotes/' + list[i].keywordName;
            html += '"><div class="gupiao_name_hm  gangmei_name" >' + list[i].stockName + '</div></a>';
            if ('M' === type) {
                if (list[i].keywordName.toLowerCase().substring(0, 3) === 'gb_') {
                    html += '<div id=l_' + list[i].keywordName.toLowerCase() + '   class="gupiao_zhi_hm">';
                } else {
                    html += '<div id=l_gb_' + list[i].keywordName.toLowerCase() + '   class="gupiao_zhi_hm">';
                }
            } else {
                html += '<div id=l_' + list[i].keywordName + '   class="gupiao_zhi_hm">';
            }
            html += '<div class="gupiao_price_hm  other_color" >--</div>';
            html += '<div class="gupiao_zdf_hm other_color" >--</div>' + '</div>' + '</div>';
        }
        return html;
    }
    return customElement;
});