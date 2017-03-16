var canvas;
var ctx;
var lastX
var lastY;
var x = "black";
var y = 2;
var color;
var mousePressed = false;

//initialize mouse events
function initCanvas() {
    canvas = document.getElementById('canvas');
    ctx = document.getElementById('canvas').getContext("2d");

    w = canvas.width;
    h = canvas.height;
    clearAll();
    
    $('#canvas').mousedown(function (e) {
        mousePressed = true;
        draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });
    $('#canvas').mousemove(function (e) {
        if (mousePressed) {
            draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });
    $('#canvas').mouseup(function (e) {
        mousePressed = false;
    });

    $('#canvas').mouseleave(function (e) {
        mousePressed = false;
    });
}

//reset all
function clearAll(){
    ctx.clearRect(0, 0, w, h);
    document.getElementById("canvasimg").style.display = "none";
}

//set drawing color
function changeColor(type) {
    switch (type) {
        case "green":
            color = "green";
            break;
        case "blue":
            color = "blue";
            break;
        case "red":
            color = "red";
            break;
        case "yellow":
            color = "yellow";
            break;
        case "orange":
            color = "orange";
            break;
        case "black":
            color = "black";
            break;
        case "white":
            color = "white";
            break;
    }
    console.log('color: ' + color);
}

//draw the canvas
function draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = $('#setWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x;
    lastY = y;
}

//erase path
function erase() {
    var m = confirm("Want to clear");
    if (m) {
        ctx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    }
}

//save data to png
function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}