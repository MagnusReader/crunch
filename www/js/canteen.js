var orderobject = {};

function orderthis(item, itemcategory, rate, imagelink) {
    document.getElementById("modal-item-name").innerHTML = item;
    document.getElementById("modal-rate").innerHTML = rate;
    document.getElementById("modal-image").setAttribute("src", imagelink);
    $("#order-modal").modal('open');
    $("#order-quantity").val(1);
    $("#order-quantity").focus();
    writetotal();

    orderobject = {
        item: item,
        category: itemcategory,
        username: Cookies.get("username")
    };

}


function ordersend(itemconfirm) {

    orderobject.quantity = parseInt($("#order-quantity").val(), 10);
    if (orderobject.item == itemconfirm) {
        //console.log(orderobject);


        $.get(hostaddress + "/canteen/order", orderobject, function (returnedstring) {

            if (returnedstring == "success") {
                $("#order-modal").modal('close');
                Materialize.toast("Order for " + orderobject.quantity + " " + orderobject.item + " sent!", 3000);

            } else {

                Materialize.toast("Order failed!", 3000);
            }
            hideWait();
        });
    }
}

$("#submit-order-btn").click(function () {
    showWait();
    var confirmationName = document.getElementById("modal-item-name").innerHTML;
    ordersend(confirmationName);
});





function writetotal() {
    var rate = parseInt(document.getElementById("modal-rate").innerHTML, 10);

    var quantity = parseInt($("#order-quantity").val(), 10);
    var totalamount = rate * quantity;
    //alert("r " + rate + " q " + quantity + " t " + totalamount);
    document.getElementById("total-amount").innerHTML = totalamount;
}


$("#order-quantity").change(function () {
    writetotal();
});





function getcanteen() {


    showWait();
    $.get(hostaddress + "/rates", function (rates) {
        //console.log(rates);
        $.get(hostaddress + "/canteen/data/available.json", function (availableitems) {
            //console.log(availableitems);
            for (var category in availableitems) {
                var innerdata = "";
                //console.log(rates[category]);

                for (var item in availableitems[category]) {

                    var itemname = availableitems[category][item];
                    //console.log(itemname);
                    var imagelink = hostaddress + "/canteen/images/" + category + "/" + itemname + ".png";
                    innerdata = innerdata.concat("<div class='col s6 m3'><div class='card'><div class='card-image tiny'><img src='" + imagelink + "'><span class='card-title text-shadow truncate'>" + itemname + "</span></div><div class='card-action'><a href='#!' onclick='orderthis(" + '"' + itemname + '"' + "," + '"' + category + '"' + "," + rates[category][itemname] + "," + '"' + imagelink + '"' + ")'>Rs. " + rates[category][itemname] + "</a></div></div></div>");
                }
                //console.log(category);
                document.getElementById(category).innerHTML = innerdata;
            }

        });
        $.get(hostaddress + "/canteen/data/trending.json", function (trendingitems) {
            //console.log(availableitems);
            var innerdata = "";
            for (var itemname in trendingitems) {


                var itemcategory = trendingitems[itemname];
                //console.log(itemname);
                var imagelink = hostaddress + "/canteen/images/" + itemcategory + "/" + itemname + ".png";


                innerdata = innerdata.concat("<div class='col s6 m3'><div class='card'><div class='card-image tiny'><img src='" + imagelink + "'><span class='card-title text-shadow truncate'>" + itemname + "</span></div><div class='card-action'><a href='#!' onclick='orderthis(" + '"' + itemname + '"' + "," + '"' + itemcategory + '"' + "," + rates[itemcategory][itemname] + "," + '"' + imagelink + '"' + ")'>Rs. " + rates[itemcategory][itemname] + "</a></div></div></div>");

            }
            document.getElementById("trending").innerHTML = innerdata;

        });
    });
    hideWait();
}


$(document).ready(function () {
    getcanteen();
});
