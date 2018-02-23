var username = Cookies.get("username");
console.log(username);

if (username != undefined) {
    window.location = "./home.html";
} else {
    window.location = "./pages/login.html";
}
