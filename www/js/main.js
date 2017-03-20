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
        console.log(player);
        // getNotes("Dagmawi", "https://www.youtube.com/watch?v=txKUHWk5nXE");
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
        $("#youtube_link_button").on('click', function() {
            url = $("#youtube_link_input")[0].value
            getVideoFromURL(url);
        });
    }


    function getVideoFromURL(url) {
        // URL Format : https://www.youtube.com/watch?v=VIDEO_ID
        if (url.indexOf("&") == -1) {
            id = url.slice(32)
        } else {
            id = url.slice(32, url.indexOf("&"))
        }
        console.log(url, id);

        if (id != "") {
            console.log("submit clicked", $("#youtube_link_input")[0].value);
            // Media URL FORMAT : http://www.youtube.com/v/VIDEO_ID
            player.loadVideoByUrl("http://www.youtube.com/v/" + id, 0, "large")
        }
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


    function saveNote(note, url) {
        if (sessionStorage.getItem("UserName") && sessionStorage.getItem("UserName") != "") {
            var obj = {
                username: sessionStorage.getItem("UserName"),
                // *********THIS TIME SHOULD BE FROM YOUTUBE API***************
                time: player.getCurrentTime(), //CHANGE THIS BACK WHEN DATABASE IS FIXED

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

            var canvas0 = this.__canvas = new fabric.Canvas('canvas0', {
                isDrawingMode: true
            });

            fabric.Object.prototype.transparentCorners = false;
            //set up canvas at the beginning

            //set up variables
            var drawingModeEl = $('#drawing-mode'),
                drawingOptionsEl = $('#drawing-mode-options'),
                drawingModeSeletor = $('#drawing-mode-selector'),
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

            //load the canvas
            $('#load-notes').on('click', function() {
                console.log(sessionStorage.getItem("UserName"));
                console.log(player.getVideoUrl());
                tools.makeRequest('get', 'getNotes', {
                    username: sessionStorage.getItem("UserName"),
                    url: player.getVideoUrl()
                }).done(function(notes) {

                    var json = JSON.parse(notes);
                    console.log("Got notes", json);
                    var buttonName;
                    document.getElementById("noteNumber").innerHTML = "";
                    for (var i = 0; i < json.length; i++) {
                        document.getElementById("noteNumber").innerHTML += "<button class='id_button' value='" + i + "' style='width: 100px;'>" + i + "</button>";
                        buttonName = "#" + i;
                    }

                    $(".id_button").on('click', function() {
                        console.log($(this).html());
                        console.log('time: ' + json[$(this).html()].note);
                        canvas0.loadFromJSON(json[$(this).html()].note, canvas0.renderAll.bind(canvas0));
                        console.log('time: ' + json[$(this).html()].time);
                        var time = parseFloat(json[$(this).html()].time/100).toFixed(2);
                        document.getElementById('timeDisplay').innerHTML = 'Time: ' + time;
                    });


                }).fail(function(error) {
                    console.log("Could not get data ->", error);
                })
            });


            //save canvas by converting into JSON 
            saveEl.on('click', function() {
                var json = JSON.stringify(canvas.toJSON());
                console.log("url is", player.getVideoUrl())

                if (player.getVideoUrl() && json) {
                    saveNote(json, player.getVideoUrl());
                    console.log('CURRENT CANVAS: \n\n' + json);
                } else {
                    console.log("Save Failed");
                }
            });


            //turn on and off drawing mode
            drawingModeEl.on('click', function() {
                canvas.isDrawingMode = !canvas.isDrawingMode;
                if (canvas.isDrawingMode) {
                    drawingModeEl.html('Exit drawing mode');
                    drawingModeSeletor.removeAttr("disabled");
                } else {
                    drawingModeEl.html('Enter drawing mode');
                    drawingModeSeletor.attr("disabled", "disabled");
                }
            });


            //select mode
            drawingModeSeletor.change(function() {
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