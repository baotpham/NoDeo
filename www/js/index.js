// Author: Dagmawi Mulugeta
// Purpose: JS file for adjacent HTML file
(function() {
    // URL's that adress the services this application consumes
    var baseURL = "http://localhost:8080"
        //Make sure DOM calls are made after the document is ready
    $(document).ready(function() {
        console.log('index.js loaded');
        $.getScript('js/tools.js', function(data, textStatus, jqxhr) {
            tools = new ToolModule();
            tools.loadPage("main");
        })
    });
})();