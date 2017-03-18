// Author: ..
// Purpose: ..

(function() {
    //Make sure DOM calls are made after the document is ready
    $(document).ready(function() {
        console.log('login.js HERE');
        setEventListeners();
    });

    function setEventListeners() {
        $('#login_button').on("click", function() {
            console.log('Logging in, Sir...');
            loginUser();
        });
    }


    function loginUser() {
        username = $("#username")[0].value
        password = $("#password")[0].value

        if (username && password) {
            // $.getScript('./js/tools.js', function(data, textStatus, jqxhr) {
            // tools = new ToolModule();
            tools.makeRequest('post', 'login', {
                    username: username,
                    password: password
                }).done(function(msg) {
                    console.log("LOGGED IN", msg);

                    sessionStorage.setItem("UserName", username);

                    tools.loadPage("index");
                }).fail(function(error) {
                    console.log("NOT LOGGED IN", error);
                    alert('Error logging in')
                })
                // })
        } else {
            alert("Please fill out both username and password fields");
        }
    }
})();