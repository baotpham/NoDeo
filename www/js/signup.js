(function() {
    $(document).ready(function() {
        $.getScript('./js/tools.js', function(data, textStatus, jqxhr) {
            console.log('signup.js here');
            tools = new ToolModule();
            setEventListeners();
        });
    });

    function setEventListeners() {
        // $("#back_button").on('click', backClicked);
        $("#cancel_button").on('click', function() {
            // console.log("Cancel CLICKED");
            backClicked();
        })
    }

    function backClicked() {
        console.log("Cancel CLICKED");
        tools.loadPage("main");
    }

})();