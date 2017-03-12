// Author: Dagmawi Mulugeta
// Purpose: JS file for adjacent HTML file

(function() {
    // URL's that adress the services this application consumes
    var baseURL = "http://localhost:8080"
        // Titles for Tables
        // var titles = {
        //     student_id: "Student ID",
        //     first_name: "First Name",
        //     last_name: "Last Name",
        //     dob: "Date of Birth",
        //     major: "Major",
        //     course_id: "Course ID",
        //     description: "Description",
        //     term: "Term",
        //     grade: "Grade"
        // }

    //Make sure DOM calls are made after the document is ready
    $(document).ready(function() {
        console.log('login.js HERE');
        setEventHandlers();
    });

    // Attach all the event handlers for the buttons
    function setEventHandlers() {
        $("#login_button").click(function() {
            console.log("clicked");
        })
    }

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

    // // Fill in the data into the DOM using jquery
    // function fillInInformation(titles, json) {
    //     // Set all thw titles in the response
    //     table_start = '<table style=""><tr>';
    //     for (title in titles) {
    //         table_start += "<th>" + titles[title] + "</th>"
    //     }
    //     table_start += '</tr>';
    //     table_content = ""
    //         // For each item in the  array, display the item in the field
    //     for (i in json) {
    //         table_content += "<tr>"
    //         for (j in json[i]) {
    //             table_content += "<td>" + json[i][j] + "</td>"
    //         }
    //         table_content += "</tr>";
    //     }
    //     table_end = "</table>";
    //     // // Populate the view with the data
    //     $("#result_div").html(table_start + table_content + table_end);
    // }
})();