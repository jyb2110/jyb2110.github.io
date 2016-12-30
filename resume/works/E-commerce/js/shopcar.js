/**
 * Created by lenovo- on 2016/9/26.
 */
/*1. 实现兼容低版本IE的getElementsByClassName()方法
 2. JS表格操作
 3. 通过parseInt()，parseFloat()把字符串转换成数字
 4. 通过toFixed()把数字格式化成指定位数的小数
 5. 事件代理的运用*/

window.onload = function () {
    //低版本IE不支持document.getElementsByClassName()方法
    //IE兼容方法
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (cls) {
            var ret = [];
            var els = document.getElementsByTagName("*");
            for (var i = 0; i < els.length; i++) {
                if (els[i].className === cls
                    || els[i].className.indexOf(' ' + cls) >= 0
                    || els[i].className.indexOf(' ' + cls + ' ') >= 0
                    || els[i].className.indexOf(cls + ' ') >= 0) {
                    ret.push(els[i]);
                }
            }
            return ret;
        }
    }

    var cartTable = document.getElementById("cartTable");
    var tr = cartTable.children[1].rows;
    var checkInputs = document.getElementsByClassName("check");  //所有的checkbox复选框
    var checkAllInputs = document.getElementsByClassName("check-all"); //两个全选框
    var selectedTotal = document.getElementById("selectedTotal");
    var priceTotal = document.getElementById("priceTotal");
    var selected = document.getElementById("selected");
    var foot = document.getElementById("foot");
    var selectedViewList = document.getElementById("selectedViewList");
    var deleteAll = document.getElementById("deleteAll");

    //计算
    function getTotal() {
        var selected = 0;
        var price = 0;
        var HTMLstr = "";
        for (var i = 0, len = tr.length; i < len; i++) {
            if (tr[i].getElementsByTagName("input")[0].checked) {
                HTMLstr += "<div><img src='" + tr[i].getElementsByTagName('img')[0].src + "'/><span class='del' index=" + i + ">取消选择</span></div>";
                tr[i].classname = "on";
                selected += parseInt(tr[i].getElementsByTagName("input")[1].value);
                price += parseFloat(tr[i].cells[4].innerHTML);
            } else {
                tr[i].classname = " ";
            }
        }
        selectedTotal.innerHTML = selected;
        priceTotal.innerHTML = price.toFixed(2);
        selectedViewList.innerHTML = HTMLstr;

        if (selected == 0) {
            foot.className = "foot";
        }
    }

    //小计
    function getSubTotal(tr) {
        var tds = tr.cells;    //使用cells 获取到tr下的所有列td
        var price = parseFloat(tds[2].innerHTML);    //单价
        var count = parseInt(tr.getElementsByTagName('input')[1].value);    //数量
        var SubTotal = parseFloat(price * count);    //小计
        tds[4].innerHTML = SubTotal.toFixed(2);
    }

    //给每一个checkbox绑定onclick事件
    for (var j = 0; j < checkInputs.length; j++) {
        checkInputs[j].onclick = function () {
            //如果当前点击的checkbox类名为check-all check，使所有checkbox被勾选
            if (this.className == "check-all check") {
                for (var i = 0; i < checkInputs.length; i++) {
                    checkInputs[i].checked = this.checked;
                }
            }
            //如果当前有任意一个单选框未被勾选，则所有全选框的checked都为false，即未被勾选
            if (this.checked == false) {
                for (var k = 0; k < checkAllInputs.length; k++) {
                    checkAllInputs[k].checked = false;
                }
            }
            //当所有单选框被勾选时，使所有全选框被勾选 （思考）
            if (this.className == 'check-one check') {
                var allchecked = true;
                for (var k = 0; k < tr.length; k++) {
                    var check_One = tr[k].getElementsByTagName('input')[0];
                    if (!check_One.checked) {
                        allchecked = false;
                    }
                }
                if (allchecked) {
                    for (var j = 0; j < checkAllInputs.length; j++) {
                        checkAllInputs[j].checked = true;
                    }
                }
            }
            getTotal();
        };
    }

    //通过改变foot的class显示已选商品的缩略图
    selected.onclick = function () {
        if (foot.className == "foot") {
            if (selectedTotal.innerHTML != 0) {
                foot.className = "foot show";
            }
        } else {
            foot.className = "foot";
        }
    };

    //通过事件代理e.srcElemnt方法实现缩略图取消选择效果
    selectedViewList.onclick = function (e) {
        e = e || window.event;
        var el = e.target || e.srcElement;
        if (el.className == 'del') {
            var index = el.getAttribute('index');
            var input = tr[index].getElementsByTagName('input')[0];
            input.checked = false;
            input.onclick();
        }
    };

    //通过事件代理e.srcElement方法实现商品数量的加减
    for (var i = 0; i < tr.length; i++) {
        tr[i].onclick = function (e) {
            e = e || window.event;
            var el = e.target || e.srcElement;
            var cls = el.className;
            var input = this.getElementsByTagName('input')[1];
            var val = parseInt(input.value);
            var reduce = this.getElementsByTagName("span")[1];
            switch (cls) {
                case 'add':
                    input.value = val + 1;
                    reduce.innerHTML = '-';
                    getSubTotal(this);
                    break;
                case 'reduce':
                    if (val > 1) {
                        input.value = val - 1;
                    }
                    if (input.value <= 1) {
                        reduce.innerHTML = '';
                    }
                    getSubTotal(this);
                    break;
                case 'delete':
                    var conf = confirm('确定要删除该商品吗？');
                    if (conf) {
                        this.parentNode.removeChild(this);
                    }
                    break;
                default:
                    break;
            }
            getTotal();
        };
        tr[i].getElementsByTagName("input")[1].onkeyup = function () {
            var val = parseInt(this.value);
            var tr = this.parentNode.parentNode;
            var reduce = tr.getElementsByTagName('span')[1];
            if (isNaN(val) || val < 1) {
                val = 1;
            }
            this.value = val;
            if (val <= 1) {
                reduce.innerHTML = '';
            } else {
                reduce.innerHTML = '-';
            }
            getSubTotal(this.parentNode.parentNode);
        }
    }

    deleteAll.onclick = function () {
        if (selectedTotal.innerHTML != 0) {
            var conf = confirm('确定要删除选中的商品吗？');
            if (conf) {
                for (var i = 0; i < tr.length; i++) {
                    var input = tr[i].getElementsByTagName('input')[0];
                    if (input.checked) {
                        tr[i].parentNode.removeChild(tr[i]);
                        i--;
                    }
                }
            }
        }
        for (var j = 0; j < checkAllInputs.length; j++) {
            checkAllInputs[j].checked = false;
        }
        getTotal();
    };

    /*document.onclick = function (e) {
        console.log(e);
    }*/
};