function getActiveBooking() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"query": "SELECT bookingID,startTime,endTime FROM laundrotech.Booking where bookingStatus='active' and FK_userID = 2 ;"});
    console.log(raw);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    var str = "";
    fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/getbooking", requestOptions)
        .then(response => response.text())
        .then(result => {
            var data = JSON.parse(result);
            // console.log("before if" + data.length);
            if (data[0] == null) {
                console.log("null")
            } else {
                console.log("else");

                str += "<table style=\"width:100%\"> <tr><th>Booking ID</th><th>Start Time</th><th>End Time</th><th>Cancel Booking</th></tr>"
                for (var i = 0; i < data.length; i++) {
                    count = i + 1;
                    str += "<tr><th>"+ data[i].bookingID + "</th><th>" + data[i].startTime + "</th><th>"+ data[i].endTime + "</th><th><article class='style"+ "'>" + "</span>" + "<button onclick='callMethod(" + data[i].bookingID + ")'>DELETE</button></th></tr>"
                }
                str+="</table>"
                document.getElementById("locationTile").innerHTML = str;
                getCompletedBooking();
            }

        })
        .catch(error => console.log('error', error));

}

function getCompletedBooking() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"query": "SELECT bookingID,startTime,endTime FROM laundrotech.Booking where bookingStatus in ('completed','canceled') and FK_userID = 2 ;"});
    console.log(raw);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    var str = "";
    fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/getbooking", requestOptions)
        .then(response => response.text())
        .then(result => {
            var data = JSON.parse(result);
            // console.log("before if" + data.length);
            if (data[0] == null) {
                console.log("null")
            } else {
                console.log("else");

                str += "<table style=\"width:100%\"> <tr><th>Booking ID</th><th>Start Time</th><th>End Time</th><th>Cancel Booking</th></tr>"
                for (var i = 0; i < data.length; i++) {
                    count = i + 1;
                    str += "<tr><th>"+ data[i].bookingID + "</th><th>" + data[i].startTime + "</th><th>"+ data[i].endTime + "</th><th><article class='style"+ "'>" + "</span>" + "<button onclick='callMethod(" + data[i].bookingID + ")'>DELETE</button></th></tr>"
                }
                str+="</table>"
                document.getElementById("locationTile2").innerHTML = str;
            }

        })
        .catch(error => console.log('error', error));

}

function callMethod(bookingId) {
    var userID = 2;
    updateCancel(bookingId);
    updateRefund(userID);

     //var locationID = document.getElementById("locationID").innerHTML;
}

function updateCancel(bookingId) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"query":"Update laundrotech.Booking SET laundrotech.Booking.bookingStatus= 'canceled' WHERE laundrotech.Booking.bookingID="+bookingId+";"});
    console.log(raw);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    var str = "";
    fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/getbooking", requestOptions)
        .then(response => response.text())
        .then(result => {
            var data = JSON.parse(result);
        })
        .catch(error => console.log('error', error));
}

function updateRefund(userID) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"query":"UPDATE `laundrotech`.`User` SET `credit`= credit + "+ 1 +" WHERE `userID`='"+ userID +"';"});
    console.log(raw);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    var str = "";
    fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/getbooking", requestOptions)
        .then(response => response.text())
        .then(result => {
            var data = JSON.parse(result);
            window.location.href = "./getBooking.html";
        })
        .catch(error => console.log('error', error));
}
