/**
 * Created by lenovo- on 2016/10/22.
 */


//检查并匹配cookie里的用户名，并显示到页面右上角
(function checkCookie() {
    var userN = document.getElementById('userN');
    var rightArea = document.getElementById('rightArea');
    var oA = rightArea.getElementsByTagName('a');
    var lgOut = document.getElementById('lgOut');
    username = getCookie('username');

    if (getCookie('isLogin') == 'true' && username != null && username != "") {
        rightArea.removeChild(oA[0]);
        rightArea.removeChild(oA[0]);
        userN.innerHTML = username;
        lgOut.innerHTML = '退出登录'
    }
})();
//获取cookie
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return decodeURIComponent(document.cookie.substring(c_start, c_end));
            //escape() unescape()函数可对字符串进行编码解码，这样就可以在所有的计算机上读取该字符串。
            //escape() unescape()其实只是转义特殊字符如:
            //document.write(escape("Visit W3School!") + "<br />")
            //document.write(escape("?!=()#%&"))
            //输出
            //Visit%20W3School%21
            //%3F%21%3D%28%29%23%25%26
            //ECMAScript v3 反对使用该方法，应用使用 decodeURI() 和 decodeURIComponent() 替代它。
        }
    }
    return "";
}

//点击退出 删除cookie 刷新页面 实现退出登录
function deleteCookie(){
    var r = confirm('确定要退出登录吗？');
    if(r == true){
        setCookie('isLogin','false',365);
        window.location.reload();
    }else{
        return false;
    }
}
//创建 cookie
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + decodeURI(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";Path=/";
}