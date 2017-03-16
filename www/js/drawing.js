$(document).ready(function(){

    //define $()
    var $ = function(id){return document.getElementById(id)};

    //initialize canvas
    var canvas = this.__canvas = new fabric.Canvas('canvas', {
        isDrawingMode: true
    });

    fabric.Object.prototype.transparentCorners = false;

    //set up variables
    var drawingModeEl = $('drawing-mode'),
        drawingOptionsEl = $('drawing-mode-options'),
        drawingColorEl = $('drawing-color'),
        drawingLineWidthEl = $('drawing-line-width'),
        clearEl = $('clear-canvas');
        saveEl = $('save-canvas');
    
    //clear canvas
    clearEl.onclick = function() { canvas.clear() };
    
    //save canvas by converting into JSON 
    saveEl.onclick = function(){
        var json = JSON.stringify(canvas.toJSON());
        console.log('CURRENT CANVAS: \n\n' + json);
    }

    //turn on and off drawing mode
    drawingModeEl.onclick = function() {
        canvas.isDrawingMode = !canvas.isDrawingMode;
        if (canvas.isDrawingMode) {
            drawingModeEl.innerHTML = 'Exit drawing mode';
            drawingOptionsEl.style.display = '';
        }
        else {
            drawingModeEl.innerHTML = 'Enter drawing mode';
            drawingOptionsEl.style.display = 'none';
        }
    };

    //select mode
    $('drawing-mode-selector').onchange = function() {
        canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](canvas);
        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.color = drawingColorEl.value;
            canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
        }
    };

    //update drawing tool values
    drawingColorEl.onchange = function() {
        canvas.freeDrawingBrush.color = this.value;
    };
    drawingLineWidthEl.onchange = function() {
        canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
        this.previousSibling.innerHTML = this.value;
    };

    //set up canvas at the beginning
    if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = drawingColorEl.value;
        canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
    }
});


