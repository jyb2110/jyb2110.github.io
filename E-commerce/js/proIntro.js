/**
 * Created by lenovo- on 2016/10/22.
 */


//商品详细页级联菜单
window.onload = function () {
    createProvince();
    document.getElementById("province").onchange = createCity;
    document.getElementById("city").onchange = createDistrict;
    document.getElementById("district").onchange = createStock;
//alert(District[1][1]);

    /*返回顶部动画效果*/
    var goTop_btn = document.getElementById('goTop_btn');
    var timer = null;
    var curTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (curTop >= 500) {
        goTop_btn.style.display = 'block';
    } else {
        goTop_btn.style.display = 'none';
    }
    /*comment_head 悬浮窗置顶效果floatTop*/
    var fixed_Con = document.getElementById('fixed_Container');
    var aA = fixed_Con.getElementsByTagName('a');
    var fixedTop = fixed_Con.offsetTop;
    var comment = document.getElementById('comment');
    var commentTop = comment.offsetTop;

    if (curTop >= fixedTop) {
        fixed_Con.style.position = 'fixed';
        fixed_Con.style.top = 0;
    }

    window.onscroll = function () {
        var curTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (curTop >= 500) {
            goTop_btn.style.display = 'block';
        } else {
            goTop_btn.style.display = 'none';
        }
        goTop_btn.onclick = function () {
            clearInterval(timer);
            timer = setInterval(function () {
                var curTop = document.documentElement.scrollTop || document.body.scrollTop;
                var speed = Math.ceil(curTop / 2);
                if (curTop <= 0) {
                    clearInterval(timer);
                }
                document.documentElement.scrollTop -= speed;
                document.body.scrollTop -= speed;

                /*console.log(document.documentElement.scrollTop || document.body.scrollTop);*/
            }, 10);
        };
        if (curTop >= fixedTop) {
            fixed_Con.style.position = 'fixed';
            fixed_Con.style.top = 0;
        } else {
            fixed_Con.style.position = 'static';
        }

        if (curTop >= commentTop - 350) {
            aA[0].className = '';
            aA[1].className = 'active';
        } else {
            aA[0].className = 'active';
            aA[1].className = '';
        }
    };

    //颜色、规格选择及已选择联动效果
    var sel_Color = document.getElementById('sel_Color');
    var sel_Format = document.getElementById('sel_Format');
    var colorA = sel_Color.getElementsByTagName('a');  //颜色选择
    var formatA = sel_Format.getElementsByTagName('a');  //规格选择
    var receiveCol = document.getElementById('color_text');
    var receiveFormat = document.getElementById('format_text');

    for (var i = 0; i < colorA.length; i++) {
        colorA[i].onclick = function () {
            for (var j = 0; j < colorA.length; j++) {
                colorA[j].className = '';
            }
            this.className = 'active';
            receiveCol.innerHTML = '“' + this.innerHTML + '|';
        }
    }
    for (var j = 0; j < formatA.length; j++) {
        formatA[j].onclick = function () {
            for (var i = 0; i < formatA.length; i++) {
                formatA[i].className = '';
            }
            this.className = 'active';
            receiveFormat.innerHTML = this.innerHTML + '”';
        }
    }

    //购买数量加、减功能
    var number = document.getElementById('number');
    var reduce = document.getElementById('reduce');
    var add = document.getElementById('add');

    add.onclick = function () {
        var numVal = parseInt(number.value);
        number.value = numVal + 1;
        reduce.innerHTML = '-';
    };
    reduce.onclick = function () {
        var numVal = parseInt(number.value);
        if (numVal > 1) {
            number.value = numVal - 1;
        }
        if (number.value <= 1) {
            reduce.innerHTML = '';
        }
    };
    number.onkeyup = function () {
        var numVal = parseInt(this.value);
        if (isNaN(numVal) || numVal < 1) {
            numVal = 1;
        }
        this.value = numVal;
        if (numVal <= 1) {
            reduce.innerHTML = '';
        } else {
            reduce.innerHTML = '-';
        }
    }
};


//省份
var Province = ['请选择', '北京', '天津', '上海', '重庆'];
/*province[1] [2] [3] [4]*/
//城市
var City = [[],
    ['东城', '西城', '朝阳', '海淀'], /*city[1][0] [1][1] [1][2] [1][3]*/
    ['河东', '河西', '河北', '南开'],
    ['黄埔', '徐汇', '长宁', '静安'],
    ['渝北', '渝中', '江北', '江津']];
//地区
var District = [
    [[]],
    [['东城1', '东城2', '东城3', '东城4'], /*[1][0][0] [1][0][2]*/
        ['西城1', '西城2', '西城3', '西城4'], /*[1][1][0] [1][1][1] [1][1][2]*/
        ['朝阳1', '朝阳2', '朝阳3', '朝阳4'],
        ['海淀1', '海淀2', '海淀3', '海淀4']],
    [['河东1', '河东2', '河东3', '河东4'], /*[2][0][1] [2][0][2] [2][0][3]*/
        ['河西1', '河西2', '河西3', '河西4'],
        ['河北1', '河北2', '河北3', '河北4'],
        ['南开1', '南开2', '南开3', '南开4']],
    [['黄埔1', '黄埔2', '黄埔3', '黄埔4'],
        ['徐汇1', '徐汇2', '徐汇3', '徐汇4'],
        ['长宁1', '长宁2', '长宁3', '长宁4'],
        ['静安1', '静安2', '静安3', '静安4']],
    [['渝北1', '渝北2', '渝北3', '渝北4'],
        ['渝中1', '渝中2', '渝中3', '渝中4'],
        ['江北1', '江北2', '江北3', '江北4'],
        ['江津1', '江津2', '江津3', '江津4']]
];
function createProvince() {
    var sel_Province = document.getElementById("province");
    for (var i in Province) {
        var op1 = new Option(Province[i], Province[i]);
        sel_Province.options.add(op1);
    }
}
function createCity() {
    var stock = document.getElementById('stock');
    var index1 = document.getElementById("province").selectedIndex;
    var sel_City = document.getElementById("city");
    var sel_District = document.getElementById("district");
    var sel_Province = document.getElementById('province');
    sel_District.options.length = 0;
    sel_City.options.length = 0;
    for (var j in City[index1]) {
        var op2 = new Option(City[index1][j], City[index1][j]);
        sel_City.options.add(op2);
    }
    for (var k in District[index1][0]) {
        var op3 = new Option(District[index1][0][k]);
        sel_District.options.add(op3);
    }
    if (sel_Province.selectedIndex == 0) {
        stock.innerHTML = '';
    } else {
        stock.innerHTML = '有货，可当日出库';
    }
}
function createDistrict() {
    var stock = document.getElementById('stock');
    var index1 = document.getElementById("province").selectedIndex;
    var index2 = document.getElementById("city").selectedIndex;
    var sel_District = document.getElementById("district");
    sel_District.options.length = 0;
    for (var l in District[index1][index2]) {
        var op3 = new Option(District[index1][index2][l]);
        sel_District.options.add(op3);
    }
}

function createStock() {
    var stock = document.getElementById('stock');
    var sel_City = document.getElementById("city");
    var sel_Province = document.getElementById('province');
    var sel_District = document.getElementById("district");
    if (sel_Province.selectedIndex == 1 && sel_District.selectedIndex == 1 && sel_City.selectedIndex == 1) {
        stock.innerHTML = '抱歉，该地区暂时无货';
    } else {
        stock.innerHTML = '有货，可当日出库';
    }
}


