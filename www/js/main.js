// Author : ...
// Purpose : ...
(function() {
    //Make sure DOM calls are made after the document is ready
    // ToolModule = require('tools');
    // console.log('ToolModule', ToolModule);
    $.getScript('./js/tools.js', function(data, textStatus, jqxhr) {
        tools = new ToolModule();
        console.log('tools', tools);
        console.log('main.js HERE');
        setLoginSignUpIdentifier();
        setEventHandlers();
        // getNotes("Dagmawi", "myurl.com");
    })

    // Attach all the event handlers for the buttons
    function setEventHandlers() {

        $("#login_button").click(function() {
            console.log("login clicked");
            tools.loadPage("login");
            tools.loadPage("login");
        })

        $("#signup_button").click(function() {
            console.log("signup clicked");
            tools.loadPage("signup")
        })

        $("#logout_button").click(logoutUser)
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
        console.log("logout clicked");
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

    function getNotes(user, url) {
        tools.makeRequest('get', 'getNotes', {
            username: user,
            url: url
        }).done(function(notes) {
            console.log("Got notes", JSON.parse(notes));
        }).fail(function(error) {
            console.log("Could not get data ->", error);
        })
    }



    function saveNote(note, url) {
        if (sessionStorage.getItem("UserName") && sessionStorage.getItem("UserName") != "") {
            var obj = {
                username: sessionStorage.getItem("UserName"),
                // *********THIS TIME SHOULD BE FROM YOUTUBE API***************
                time: (new Date().getTime() / 1000), //CHANGE THIS BACK WHEN DATABASE IS FIXED
                note: note,
                url: url
            };
            console.log("saving note ->", obj);
            tools.makeRequest('post', 'setNotes', obj).done(function(resp) {
                console.log("Set note ->", resp);
            }).fail(function(error) {
                console.log("Could not save data ->", error);
            })
        } else {
            alert("Please log in or sign up to save a note")
            console.log("Error saving note to name ->", sessionStorage.getItem("UserName"))
        }
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
                saveEl = $('#save-canvas'),
                hideEl = $('#hide-canvas');

            hideEl.on('click', function() {
                if (document.getElementById("canvasContainer").className == "canvasContainer-show") {
                    document.getElementById("canvasContainer").className = "canvasContainer-hide";
                    hideEl.html("Show Note");
                } else {
                    document.getElementById("canvasContainer").className = "canvasContainer-show";
                    hideEl.html("Hide Note");
                }
            });

            //clear canvas
            clearEl.on('click', function() {
                canvas.clear();
            });


            //save canvas by converting into JSON 
            saveEl.on('click', function() {
                var json = JSON.stringify(canvas.toJSON());
                // Get URL from youtube API
                saveNote(json, "myurl.com");
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