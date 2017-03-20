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
            url: 'js/mappings.js',
            dataType: "script",
            success: function() {
                console.log('map ->', mappings);
                window.location = './' + mappings[page]["page"] + '.html';
                // $("#page").load('./' + mappings[page]["page"] + '.html', function() {
                //     console.log("loading page components");
                //     getMultiScripts(mappings[page]["scripts"], '').done(function() {
                //         console.log("GOT ALL THE SCRIPTS AND PAGES");
                //     }).fail(function(error) {
                //         console.log('Error -> ', error);
                //     });
                // });
            }
        })
    }




    function getMultiScripts(arr, path) {
        var _arr = $.map(arr, function(scr) {
            return $.getScript((path || "") + scr);
        });
        console.log("_arr", _arr);
        _arr.push($.Deferred(function(deferred) {
            $(deferred.resolve);
        }));

        return $.when.apply($, _arr);
    }
}