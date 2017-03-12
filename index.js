// Author: Dagmawi Mulugeta
// Purpose: JS file for adjacent HTML file

(function() {
    // URL's that adress the services this application consumes
    var baseURL = "http://localhost:8080"

    //Make sure DOM calls are made after the document is ready
    $(document).ready(function() {
        loadPage("")
        setEventHandlers();
    });

    // Attach all the event handlers for the buttons
    function setEventHandlers() {}

    // use AJAX to make an HTTP get request to the service 
    function makeRequest(type, endpt, data) {
        var jqxhr =
            $.ajax({
                type: type,
                url: baseURL + "/" + endpt,
                dataType: "html",
                data: data
            });
        return jqxhr
    }

    function loadPage(page) {
        console.log(" Loadin Page ");
        $.ajax({
            url: './clientJS/main.js',
            dataType: "script",
            success: function() {
                $("#page").load('./pages/main.html')
                console.log('GOT IT');
            }
        });
    }

})();