// Add your API endpoint here
var API_ENDPOINT = "https://4fa1fxpoi5.execute-api.us-east-1.amazonaws.com/prod";
// AJAX POST request to save intern data
document.getElementById("saveintern").onclick = function(){
    var inputData = {
        "internid": $('#internid').val(),
        "name": $('#name').val(),
        "pos": $('#pos').val(),
        "age": $('#age').val()
    };
    $.ajax({
        url: API_ENDPOINT,
        type: 'POST',
        data:  JSON.stringify(inputData),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            document.getElementById("internSaved").innerHTML = "Intern Data Saved!";
        },
        error: function () {
            alert("Error saving intern data.");
        }
    });
}

// AJAX GET request to retrieve all interns
document.getElementById("getinterns").onclick = function(){  
    $.ajax({
        url: API_ENDPOINT,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $('#InternTable tr').slice(1).remove();
            jQuery.each(response, function(i, data) {          
                $("#InternTable").append("<tr> \
                    <td>" + data['internid'] + "</td> \
                    <td>" + data['name'] + "</td> \
                    <td>" + data['pos'] + "</td> \
                    <td>" + data['age'] + "</td> \
                    </tr>");
            });
        },
        error: function () {
            alert("Error retrieving intern data.");
        }
    });
}
