var orderobject = {};

var orderlist = [];

var finaltotal = 0;

function orderthis(item, itemcategory, rate, imagelink) {
    document.getElementById("modal-item-name").innerHTML = item;
    document.getElementById("modal-rate").innerHTML = rate;
    document.getElementById("modal-image").setAttribute("src", imagelink);
    $("#order-modal").modal('open');
    $("#order-quantity").val(1);
    $("#order-quantity").focus();
    writetotal();

    orderobject = {
        time: new Date(),
        item: item,
        category: itemcategory,
        rate: rate,
        username: Cookies.get("username")
    };


}


function updatetotal() {
    document.getElementById("total-amt").innerHTML = finaltotal;
}


function ordersend(itemconfirm) {
    orderobject.quantity = parseInt($("#order-quantity").val(), 10);

    if (orderobject.item == itemconfirm) {
        //console.log(orderobject);
        orderlist.push(orderobject);

        //console.log("pushed");
        //console.log(orderlist);

        $("#order-modal").modal('close');

        finaltotal = finaltotal + orderobject.quantity * orderobject.rate;

        var elem = "<div class='collection-item row'><div class='col s8'><p>" + orderobject.item + "<p></div><div class='col s4'><p class='right'>" + orderobject.quantity * orderobject.rate + "</p></div></div>";

        $("#cart-items").append(elem);

        Materialize.toast(orderobject.quantity + " " + orderobject.item + " added to cart!", 3000);
    } else {
        Materialize.toast("Order failed!", 3000);
    }
    updatetotal();
    hideWait();

}




$(".payment-option").click(function () {
    // console.log(orderlist);
    orderconfirm();
});


function orderconfirm() {
    showWait();

    $("#payment-modal").modal('close');
    $("#cart-modal").modal('close');
    //console.log(orderlist);

    $.post(hostaddress + "/canteen/order", {
        orders: orderlist
    }, function (returnedstring) {
        //console.log(orderlist);
        if (returnedstring == "success") {

            Materialize.toast("Order sent!", 3000);

        } else {

            Materialize.toast("Order failed!", 3000);
        }
        hideWait();
    });

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


$("#pay-now-btn").click(function () {
    document.getElementById("confirm-amt").innerHTML = finaltotal;
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
                            innerdata = innerdata.concat("<div class='col s12 m3'><div class='card'><div class='card-image tiny'><img src='" + imagelink + "'></div><div class='card-content'><span class='card-title truncate'>" + itemname + "</span><p> I am some description about " + itemname + ".</p></div><div class='card-action valign-wrapper'><div class='btn right red white-text' onclick='orderthis(" + '"' + itemname + '"' + "," + '"' + category + '"' + "," + rates[category][itemname] + "," + '"' + imagelink + '"' + ")'>Rs. " + rates[category][itemname] + "</div></div></div></div>");
                            }
                            //console.log(category);
                            document.getElementById(category).innerHTML = innerdata;
                        }

                    });

                /*
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

                */
            }); hideWait();
    }


    $(document).ready(function () {
        getcanteen();
    });
