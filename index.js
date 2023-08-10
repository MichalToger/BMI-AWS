var url_aws = "https://tl9dh07xkc.execute-api.us-east-1.amazonaws.com/V1";

let loadPage = function () {
    $("#addItemForm").css("display", "none");
    $("#removeItemForm").css("display", "none");
    $("#updateItemForm").css("display", "none");

    var add = document.getElementById("addItemForm");
    var remove = document.getElementById("removeItemForm");
    var update = document.getElementById("updateItemForm");
    $("#addItem").click(() => {
        if (add.style.display === "none") {
            remove.style.display = "none";
            update.style.display = "none";
            add.style.display = "block";
        } else {
            add.style.display = "none";
        }
    });
    $("#removeItem").click(() => {
        if (remove.style.display === "none") {
            add.style.display = "none";
            update.style.display = "none";
            remove.style.display = "block";
        } else {
            remove.style.display = "none";
        }
    });
    $("#updateItem").click(() => {
        if (update.style.display === "none") {
            remove.style.display = "none";
            add.style.display = "none";
            update.style.display = "block";
        } else {
            update.style.display = "none";
        }
    });

    $('select').on('change', createTable);
    $('#addItemForm').submit(add_item);
    $('#removeItemForm').submit(remove_item);
    $('#updateItemForm').submit(update_item);

    createTable();
};

let getDBcontent = function () {
    var DBcontent;
    $.ajax({
        url: url_aws,
        async: false,
        success: function (result) {
            DBcontent = result;
            return result;
        },
        error: function (err) {
            console.log("err", err);
        }
    });
    return DBcontent;
};

let createTable = function () {
    response = getDBcontent()
    //response
    let str = "<table>"
    str = str + "<tr>";
    str = str + "<th><b> Name <b/></th>";
    str = str + "<th><b> Weight <b/></th>";
    str = str + "<th><b> Height <b/></th>";
    str = str + "<th><b> BMI <b/></th>";
    str = str + "</tr>";
    console.log(response);
    for (let element in response) {
        str = str + "<tr>";
        str = str + "<td>" + response[element]["userName"]["S"] + "</td>";
        str = str + "<td>" + response[element]["Weight"]["N"] + "</td>";
        str = str + "<td>" + response[element]["Height"]["N"] + "</td>";
        str = str + "<td>" + Number(response[element]["Weight"]["N"] / ((response[element]["Height"]["N"] / 100) ** 2)).toFixed(2) + "</td>";
        str = str + "</tr>";
    }
    str = str + "</table>";
    $("#table").html(str);
};

let add_item = function (event) {
    // process the form
    console.log($("#userName").val());
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: url_aws + '/insert', // the url where we want to POST
        contentType: 'application/json',
        data: JSON.stringify({
            "userName": $("#userName").val(),
            "Weight": $("#weight").val(),
            "Height": $("#height").val()
        }),
        processData: false,
        // dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jQxhr) {
            console.log(data);
            // alert("Item added!");
            $("#addItemForm").css("display", "none");
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
            // alert("Item not added!");
        }
    })
    wait(1000);
    createTable();
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
};

let remove_item = function (event) {
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: url_aws + '/delete', // the url where we want to POST
        contentType: 'application/json',
        data: JSON.stringify({
            "userName": $("#userNameRemove").val()
        }),
        processData: false,
        // dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jQxhr) {
            console.log(data);
            // alert("Item deleted!");
            $("#removeItemForm").css("display", "none");
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
            // alert("Item not deleted!");
        }
    })
    wait(1000);
    createTable();
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
};

let update_item = function (event) {
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: url_aws + '/update', // the url where we want to POST
        contentType: 'application/json',
        data: JSON.stringify({
            "userName": $("#userNameUpdate").val(),
            "Weight": $("#weightUpdate").val(),
            "Height": $("#heightUpdate").val()
        }),
        processData: false,
        // dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jQxhr) {
            console.log(data);
            // alert("Item updated!");
            $("#UpdateItemForm").css("display", "none");
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
            // alert("Item not updated!");
        }
    })
    wait(1000);
    createTable();
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
};

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

$(document).ready(loadPage);

