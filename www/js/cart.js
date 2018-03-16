function getorders() {
    showWait();
    console.log(Cookies.get("username"));
    // /*

    $.get(hostaddress + "/canteen/myorders", {
        username: Cookies.get("username")
    }, function (returneddata) {
        if (returneddata != "failure") {
            var openorders = "";
            var closedorders = "";
            var cancelorders = "";
            for (var item in returneddata) {

                var datetime = new Date(returneddata[item].time);
                var orderdate = datetime.getDate() + "-" + (datetime.getMonth() + 1);
                var ordertime = datetime.getHours() + ":" + datetime.getMinutes();
                var orderamount = parseInt(returneddata[item].quantity) * parseInt(returneddata[item].rate);

                if (returneddata[item].status == "open") {
                    openorders = ("<div class='collection-item row'><div class='col s2'>" + orderdate + "<br><span class='grey-text'>" + ordertime + "</span></div><div class='col s4'>" + returneddata[item].item + "<br><span class='grey-text'>" + returneddata[item].category + "</span></div><div class='col s2'>" + returneddata[item].quantity + "</div><div class='col s2'>" + returneddata[item].rate + "</div><div class='col s2 strong'>" + orderamount + "</div></div>").concat(openorders);

                } else if (returneddata[item].status == "cancel") {

                    cancelorders = ("<div class='collection-item row'><div class='col s2'>" + orderdate + "<br><span class='grey-text'>" + ordertime + "</span></div><div class='col s4'>" + returneddata[item].item + "<br><span class='grey-text'>" + returneddata[item].category + "</span></div><div class='col s2'>" + returneddata[item].quantity + "</div><div class='col s2'>" + returneddata[item].rate + "</div><div class='col s2 strong'>" + orderamount + "</div></div>").concat(closedorders);
                } else {
                    closedorders = ("<div class='collection-item row'><div class='col s2'>" + orderdate + "<br><span class='grey-text'>" + ordertime + "</span></div><div class='col s4'>" + returneddata[item].item + "<br><span class='grey-text'>" + returneddata[item].category + "</span></div><div class='col s2'>" + returneddata[item].quantity + "</div><div class='col s2'>" + returneddata[item].rate + "</div><div class='col s2 strong'>" + orderamount + "</div></div>").concat(closedorders);

                }
            }

            document.getElementById("current-orders-container").innerHTML = openorders;
            document.getElementById("closed-orders-container").innerHTML = closedorders;
            document.getElementById("cancel-orders-container").innerHTML = cancelorders;

        } else {

            Materialize.toast("Get failed!", 3000);
        }

        hideWait();
    });
    /**/
    // hideWait();
}


$(document).ready(function () {
    getorders();
});

$("#refresh-btn").click(function () {
    getorders();
});

$("#clear-btn").click(function () {

    if (confirm("Are you sure you want to clear history?")) {
        showWait();
        $.get(hostaddress + "/canteen/myorders/clear", {
            username: Cookies.get("username")
        }, function (returnedstring) {
            if (returnedstring == "success") {
                getorders();
            } else {
                Materialize.toast("Failed to clear!", 3000);
            }
            hideWait();
        });
    }
});
