function loadInvoice(){
    var d = new Date();
    var monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var month = monthArray[d.getMonth()];

    str = "<em id=\"todayDate\">Date: " + d.getDate() + " " + month + " " + d.getFullYear() + "</em>"
    document.getElementById("todayDate").innerHTML = str;

    var receiptDigit = '';
    var chars = "0123456789";
    for (var i = 8; i > 0; --i) 
        receiptDigit += chars[Math.floor(Math.random() * chars.length)];
    receiptAlpha = '';
    chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 1; i > 0; --i) 
        receiptAlpha += chars[Math.floor(Math.random() * chars.length)];
     str = "<em id=\"receiptNo\">Receipt #: " + receiptDigit + receiptAlpha+ "</em>";
    document.getElementById("receiptNo").innerHTML = str;

    str = "<td class=\"col-md-1\" id=\"washingMachineID\">" + sessionStorage.getItem("washingMachineID") + "</td>";
    document.getElementById("washingMachineID").innerHTML = str;

    var day = sessionStorage.getItem("bookingDate").substring(0,2);
    var month = sessionStorage.getItem("bookingDate").substring(3,5);
    var year = sessionStorage.getItem("bookingDate").substring(6);
    month = monthArray[parseInt(month) - 1];
    str = "<td class=\"col-md-1\" id=\"bookingDate\">" + day + " " + month + " " + year + "</td>";
    document.getElementById("bookingDate").innerHTML = str;

    str = "<td class=\"col-md-1\" id=\"bookingTime\">" + sessionStorage.getItem("bookingTime") + "</td>";
    document.getElementById("bookingTime").innerHTML = str;
    str = "<td class=\"col-md-1\" id=\"location\">" + sessionStorage.getItem("location") + "</td>";
    document.getElementById("location").innerHTML = str;
    str = "<td class=\"col-md-1\" id=\"washingmachineAddress\">" + sessionStorage.getItem("washingMachineAddress") + "</td>";
    document.getElementById("washingMachineAddress").innerHTML = str;
    str = "<td class=\"col-md-1\" id=\"price\">$" + sessionStorage.getItem("price") + "</td>";
    document.getElementById("price").innerHTML = str;
    str = "<td class=\"col-md-1\" id=\"bookingFee\">$1</td>";
    document.getElementById("bookingFee").innerHTML = str;
    str = "<td class=\"col-md-1\" id=\"credit\">$" + sessionStorage.getItem("credit") + "</td>";
    document.getElementById("credit").innerHTML = str;
    str = "<td class=\"col-md-1\" id=\"bookingCode\">" + sessionStorage.getItem("bookingCode") + "</td>";
    document.getElementById("bookingCode").innerHTML = str;
    str = "<td class=\"text-center text-danger\" id=\"total\"><h4><strong>$" + sessionStorage.getItem("total") + "</strong></h4></td>";
    document.getElementById("total").innerHTML = str;
}

window.onload = loadInvoice;