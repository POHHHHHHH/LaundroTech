window.addEventListener('load', function () {

    var userID = sessionStorage.getItem("userID");

    var currentLocation = window.location.href;

    if(userID === null && currentLocation.includes("index.html")){
        str2 = '';
        str2="<li><h2><a href=\"Login.html\">Get Started</a></li></h2>";
    }
    else if(sessionStorage.getItem("role") === "admin" && currentLocation.includes("index.html")){
        str2="<li><h2>Welcome Admin</a></li></h2>";
    }
    else{
        str2="<li><h2><a href=\"getLocation.html\">Start Booking</a></li></h2>";
    }
    var nav2 = document.getElementById("login");
    nav2.innerHTML = str2;

    if (userID === null && (!(currentLocation.includes("login.html") || currentLocation.includes("index.html") || currentLocation === "https://master.d8loh5zuotepy.amplifyapp.com/"))) {
        alert("Please login before proceeding!")
        window.location.replace("login.html")
    }
    else {
        str = '';

        if (sessionStorage.getItem("role") === null) {
            str = "<div class=\"inner\"><h2>Menu</h2><ul>" + "<li><a href=\"index.html\">Home</a></li>" +
                "<li><a href=\"login.html\">Login</a></li>" +
                "</ul></div><a class=\"close\" href=\"#menu\">\"Close\"</a>";
        }
        else if (sessionStorage.getItem("role") === "user") {
            str = "<div class=\"inner\"><h2>Menu</h2><ul>" + "<li><a href=\"index.html\">Home</a></li>" +
                "<li><a href=\"getBooking.html\">My account</a></li>" +
                "<li><a href=\"topup.html\">Top Up</a></li>" +
                "<li><a href=\"getLocation.html\">Make Booking</a></li>" +
                "<li onclick=\"logout()\">Logout</a></li>" +
                "</ul></div><a class=\"close\" href=\"#menu\">\"Close\"</a>";
        }
        else if (sessionStorage.getItem("role") === "admin") {
            str = "<div class=\"inner\"><h2>Menu</h2><ul>" + "<li><a href=\"admin.html\">Administrative Management</a></li>" +
                "<li onclick=\"logout()\">Logout</a></li>" +
                "</ul></div><a class=\"close\" href=\"#menu\">\"Close\"</a>";
        }

        var nav = document.getElementById("menu");

        nav.innerHTML = str;

    }
});

function logout() {
    sessionStorage.clear();
    window.location.replace("index.html");
}