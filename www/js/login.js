$("#reset-box-btn").click(function () {
    $("#login-box").slideUp();
    $("#password-reset-box").slideDown();

});

$("#reset-cancel-btn").click(function () {
    $("#login-box").slideDown();
    $("#password-reset-box").slideUp();
});

$("#sign-in-btn").click(function () {
    showWait();
    var user = {
        uname: $("#username").val(),
        pword: $("#password").val()
    };

    $.post(hostaddress + "/login", user, function (data) {
        //console.log(data);
        if (data != "invalid") {
            if (data != "false") {
                Cookies.set('username', user.uname, {
                    expires: 7,
                    path: '/'
                });


                Cookies.set("username-name", data.name, {
                    expires: 7,
                    path: '/'
                });
                window.location = "../home.html";


            } else {
                alert("Password Incorrect.");
                $("#password").val("");
                $("#password").focus();
            }
        } else {
            alert("Sorry, " + user.uname + " not found.");
        }
        hideWait();
    });
});

$("#reset-cancel-btn").click(function () {
    $("#login-box").slideDown();
    $("#password-reset-box").slideUp();
});

$("#reset-btn").click(function () {
    showWait();
    $.post(hostaddress + "/passwordreset", {
        email: $("#reset-email").val()
    }, function (data) {
        //console.log(data);
        if (data == "success") {

            alert("Request sent successfully. You will shortly recieve an email with your credentials.");

        } else {
            alert("Sorry, e-mail not found. Try again.");
        }
        hideWait();
    });
});

$(document).ready(function () {
    hideWait();
});
hideWait();
