/**
 * Created by lenovo- on 2016/9/12.
 */
//慕课网视频教程----运动框架
//实现既可链式运动，又可同时运动
//startMove(obj,{attr1:iTarget1,attr2:iTarget2},fn)
function startMove(obj,json,fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for(var attr in json) {
            //1.获取当前值
            var icurr = 0;
            if (attr == 'opacity') {
                icurr = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                icurr = parseInt(getStyle(obj, attr));
            }
            //2.定义缓冲运动速度
            var speed = (json[attr] - icurr) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //3.检测停止
            if (icurr != json[attr])
            {
                flag = false;
            }
            if (attr == 'opacity') {
                obj.style.fliter = 'alpha(opacity=' + (icurr+speed) + ')';
                obj.style.opacity = (icurr + speed) / 100;
            } else {
                obj.style[attr] = icurr + speed + 'px';
            }
        }
            if(flag)
            {
                clearInterval(obj.timer);
                if(fn){
                    fn();
                }
            }
    }, 30);
}

//getStyle()函数目的是获取内部样式表的样式
function getStyle(obj, attr) {
    if (obj.currentStyle) {  //IE下的处理
        return obj.currentStyle[attr];
    } else {    //标准浏览器下的处理
        return getComputedStyle(obj, false)[attr];
    }
}