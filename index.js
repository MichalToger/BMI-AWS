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
