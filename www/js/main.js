// Author : ...
// Purpose : ...
(function() {
    //Make sure DOM calls are made after the document is ready
    // ToolModule = require('tools');
    // console.log('ToolModule', ToolModule);
    // $.getScript('./js/tools.js', function(data, textStatus, jqxhr) {
    // tools = new ToolModule();
    console.log('tools', tools);
    console.log('main.js HERE');
    setLoginSignUpIdentifier();
    setEventHandlers();
    // })

    // Attach all the event handlers for the buttons
    function setEventHandlers() {
        $("#login_button").click(function() {
            console.log("login clicked");
            // if (tools != undefined) {
            // tools.loadPage("login");
            // } else {
            // tools.loadPage("login");
            // }

        })
        $("#signup_button").click(function() {
            console.log("signup clicked");
        })
        $("#logout_button").click(function() {
            console.log("logout clicked");
            logoutUser();
        })
    }


    function setLoginSignUpIdentifier() {
        if (sessionStorage.getItem("UserName") && sessionStorage.getItem("UserName") != null) {
            $("#loginOrSignup").html("<div class='pullRight'><p> User ID : " + sessionStorage.getItem("UserName") + "</p><a id='logout_button'>Log Out</a><br></div>")
        } else {
            //if user has not logged in
        }
    }


    function logoutUser() {
        // $.getScript('./js/tools.js', function(data, textStatus, jqxhr) {
        // tools = new ToolModule();
        tools.makeRequest('post', 'logout', {}).done(function(msg) {
                console.log("LOGGED OUT", msg);
                sessionStorage.setItem("UserName", "");
                tools.loadPage("main");
            }).fail(function(error) {
                console.log("NOT LOGGED OUT", error);
                alert('Error logging out')
            })
            // })
    }

    //initialize canvas
    if (!window["fabric"]) {
        $.getScript('./js/fabric.js', function(data, textStatus, jqxhr) {
            var canvas = this.__canvas = new fabric.Canvas('canvas', {
                isDrawingMode: true
            });

            fabric.Object.prototype.transparentCorners = false;
            //set up canvas at the beginning

            //set up variables
            var drawingModeEl = $('#drawing-mode'),
                drawingOptionsEl = $('#drawing-mode-options'),
                drawingColorEl = $('#drawing-color'),
                drawingLineWidthEl = $('#drawing-line-width'),
                clearEl = $('#clear-canvas'),
                saveEl = $('#save-canvas');

            //clear canvas
            clearEl.on('click', function() {
                canvas.clear();
            });


            //save canvas by converting into JSON 
            saveEl.on('click', function() {
                var json = JSON.stringify(canvas.toJSON());
                console.log('CURRENT CANVAS: \n\n' + json);
            });


            //turn on and off drawing mode
            drawingModeEl.on('click', function() {
                canvas.isDrawingMode = !canvas.isDrawingMode;
                if (canvas.isDrawingMode) {
                    drawingModeEl.html('Exit drawing mode');
                    drawingOptionsEl.attr["display"] = '';
                } else {
                    drawingModeEl.html('Enter drawing mode');
                    drawingOptionsEl.attr["display"] = 'none';
                }
            });


            //select mode
            $('#drawing-mode-selector').change(function() {
                canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](canvas);
                if (canvas.freeDrawingBrush) {
                    canvas.freeDrawingBrush.color = drawingColorEl[0].value;
                    canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl[0].value, 10) || 1;
                }
            });


            //update drawing tool values
            drawingColorEl.change(function() {
                canvas.freeDrawingBrush.color = this.value;
            });


            drawingLineWidthEl.on('change mousemove', function() {
                canvas.freeDrawingBrush.width = drawingLineWidthEl[0].value;
            });

            if (canvas.freeDrawingBrush) {
                canvas.freeDrawingBrush.color = drawingColorEl[0].value;
                canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl[0].value, 10) || 1;
            }

        });
    }
})();