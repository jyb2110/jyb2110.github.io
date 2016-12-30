/**
 * Created by lenovo- on 2016/12/4.
 */
var width = height = Math.min(450 , $(window).width() - 20);
var isDown = false;

var strokeColor = 'black';
var lastLoc = {x:0,y:0};
var lastTime = 0;
var lastLineWidth = -1;

var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');

c.width = width;
c.height = height;

//HTML控件  屏幕自适应
$('#controller').css('width', width + 'px');

drawGrid();

//清除按钮
$('#clear-btn').click(function () {
    ctx.clearRect(0,0,width,height);
    drawGrid();
});

//笔触颜色
$('.color_btn').click(
    function () {
        $('.color_btn').removeClass('color_btn_select');
        $(this).addClass('color_btn_select');
        strokeColor = $(this).css('background-color');
    }
);

//鼠标事件逻辑封装
function beginStroke(point) {
    isDown = true;
    lastLoc = windowToCanvas(point.x,point.y);
    lastTime = new Date().getTime();
}
function endStroke() {
    isDown = false;

}
function moveStroke(point) {
    var curLoc = windowToCanvas(point.x,point.y);
    var curTime = new Date().getTime();
    var s = calcDistance(curLoc,lastLoc);
    var t = curTime - lastTime;
    var lineWidth = calcLineWidth(t,s);

    //draw
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.moveTo(lastLoc.x,lastLoc.y);
    ctx.lineTo(curLoc.x,curLoc.y);
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    lastLoc = curLoc;
    lastTime = curTime;
    lastLineWidth = lineWidth;
}

//4个事件
c.onmousedown = function (e) {
    // console.log('mousedown!');
    e.preventDefault();
    beginStroke( {x:e.clientX , y:e.clientY } );
    // alert(loc.x + ',' + loc.y);
};
c.onmouseup = function (e) {
    // console.log('mouseup!');
    e.preventDefault();
    endStroke();
};
c.onmouseout = function (e) {
    // console.log('mouseout!');
    e.preventDefault();
    endStroke();
};
c.onmousemove = function (e) {
    e.preventDefault();
    if( isDown ){
        // console.log('mousemove!')
        moveStroke( {x:e.clientX , y:e.clientY} );
    }
};

//屏幕触控事件
c.addEventListener('touchstart',function (e) {
    e.preventDefault();
    touch = e.touches[0];
    beginStroke( {x:touch.pageX , y:touch.pageY } );
});
c.addEventListener('touchmove',function (e) {
    e.preventDefault();
    if( isDown ){
        touch = e.touches[0];
        moveStroke( {x:touch.pageX , y:touch.pageY} );
    }
});
c.addEventListener('touchend',function (e) {
    e.preventDefault();
    endStroke();
});


//canvas坐标转换
function windowToCanvas(x, y) {
    var bbox = c.getBoundingClientRect();
    return {x : Math.round(x - bbox.left), y : Math.round(y - bbox.top)}
}

//计算距离
function calcDistance(loc1, loc2) {
    return Math.sqrt((loc1.x-loc2.x)*(loc1.x-loc2.x) + (loc1.y-loc2.y)*(loc1.y-loc2.y));
}

//计算线条宽度
var maxLineWidth = 10;
var minLineWidth = 1;
var maxStrokeV = 10;
var minStrokeV = 0.1;
function calcLineWidth(t , s) {
    var v = s/t;
    var resultLineWidth;

    if(v <= minStrokeV){
        resultLineWidth =maxLineWidth;
    }else if(v > maxStrokeV){
        resultLineWidth = minLineWidth;
    }else{
        resultLineWidth = maxLineWidth - (v - minStrokeV)/(maxStrokeV - minStrokeV)*(maxLineWidth - minLineWidth);
    }

    if(lastLineWidth == -1){
        return resultLineWidth;
    }

    return lastLineWidth * 2/3 + resultLineWidth * 1/3;
}

//格子
function drawGrid() {

    ctx.save();

    ctx.strokeStyle = 'rgb(247,4,4)';

    ctx.beginPath();
    ctx.moveTo(3,3);
    ctx.lineTo(width-3,3);
    ctx.lineTo(width-3,height-3);
    ctx.lineTo(3,height-3);
    ctx.closePath();
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(width,height);

    ctx.moveTo(width,0);
    ctx.lineTo(0,height);

    ctx.moveTo(0,height/2);
    ctx.lineTo(width,height/2);

    ctx.moveTo(width/2,0);
    ctx.lineTo(width/2,height);

    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
}