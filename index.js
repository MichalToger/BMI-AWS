var url_aws = "https://ihx15igqc2.execute-api.us-east-1.amazonaws.com/HopfulliFinal";

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
    response = getDBcontent();
    let str = "<table>";
    str += "<tr><th><b> Name <b/></th><th><b> Weight <b/></th><th><b> Height <b/></th><th><b> BMI <b/></th></tr>";
    for (let element in response) {
        str += "<tr>";
        str += "<td>" + response[element]["userName"]["S"] + "</td>";
        str += "<td>" + response[element]["Weight"]["N"] + "</td>";
        str += "<td>" + response[element]["Height"]["N"] + "</td>";
        str += "<td>" + Number(response[element]["Weight"]["N"] / ((response[element]["Height"]["N"] / 100) ** 2)).toFixed(2) + "</td>";
        str += "</tr>";
    }
    str += "</table>";
    $("#table").html(str);
};

let add_item = function (event) {
    $.ajax({
        type: 'POST',
        url: url_aws,
        contentType: 'application/json',
        data: JSON.stringify({
            "userName": $("#userName").val(),
            "Weight": $("#weight").val(),
            "Height": $("#height").val()
        }),
        processData: false,
        encode: true,
        success: function (data, textStatus, jQxhr) {
            console.log(data);
            $("#addItemForm").css("display", "none");
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
    wait(1000);
    createTable();
    event.preventDefault();
};

let remove_item = function (event) {
    $.ajax({
        type: 'DELETE',
        url: url_aws,
        contentType: 'application/json',
        data: JSON.stringify({
            "userName": $("#userNameRemove").val()
        }),
        processData: false,
        encode: true,
        success: function (data, textStatus, jQxhr) {
            console.log(data);
            $("#removeItemForm").css("display", "none");
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
    wait(1000);
    createTable();
    event.preventDefault();
};

let update_item = function (event) {
    $.ajax({
        type: 'PUT',
        url: url_aws,
        contentType: 'application/json',
        data: JSON.stringify({
            "userName": $("#userNameUpdate").val(),
            "Weight": $("#weightUpdate").val(),
            "Height": $("#heightUpdate").val()
        }),
        processData: false,
        encode: true,
        success: function (data, textStatus, jQxhr) {
            console.log(data);
            $("#UpdateItemForm").css("display", "none");
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
    wait(1000);
    createTable();
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
