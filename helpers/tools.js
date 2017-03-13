function ToolModule() {
    // use AJAX to make an HTTP get request to the service 
    var baseURL = "http://localhost:8080"

    this.makeRequest = function(type, endpt, data) {
        var jqxhr =
            $.ajax({
                type: type,
                url: baseURL + "/" + endpt,
                dataType: "html",
                data: data
            });
        return jqxhr
    }

    this.loadPage = function(page) {
        console.log(" Loading Page -> ", page);
        $.ajax({
            url: './www/js/' + page + '.js',
            dataType: "script",
            success: function() {
                $("#page").load('./pages/' + page + '.html')
                console.log('GOT IT');
            }
        });
    }
}