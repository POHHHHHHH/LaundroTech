function getActiveBooking() {
    var getUserID = sessionStorage.getItem("userID");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ "query": "SELECT bookingID,bookingDate,startTime,endTime, bookingCode FROM laundrotech.Booking where bookingStatus='active' and FK_userID = " + getUserID + " ;" });
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

            str += "<table style=\"width:100%\"> <tr><th>Booking ID</th><th>Booking Date</th><th>Start Time</th><th>End Time</th><th>Booking Code</th><th>Cancel Booking</th></tr>"
            for (var i = 0; i < data.length; i++) {
                count = i + 1;
                str += "<tr><th>" + data[i].bookingID + "</th></th><th>" + data[i].bookingDate + "</th><th>" + data[i].startTime + "</th><th>" + data[i].endTime + "</th><th>" + data[i].bookingCode + "</><th><article class='style" + "'>" + "</span>" + "<button onclick='callMethod(" + data[i].bookingID + ")'>Cancel </button></th></tr>"
            }
            str += "</table>"
            document.getElementById("locationTile").innerHTML = str;
            getCompletedBooking();
            loadReview();

        })
        .catch(error => console.log('error', error));

}

function loadReview(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"query":"SELECT username, fullName, email, contactNo, credit FROM laundrotech.User WHERE userID = '" + sessionStorage.getItem("userID") + "'"});

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
            str = "<span class=\"reviewBooking\"><label class=\"reviewLabel\"><strong>Full Name:</strong></label><label id=\"fullName\" class=\"reviewValues\">" + data[0].fullName + "</label></span>";
            document.getElementById("spanFullName").innerHTML = str;
            str = "<span class=\"reviewBooking\"><label class=\"reviewLabel\"><strong>Username:</strong></label><label id=\"userName\" class=\"reviewValues\">" + data[0].username + "</label></span>";
            document.getElementById("spanUserName").innerHTML = str;
            str = "<span class=\"reviewBooking\"><label class=\"reviewLabel\"><strong>Email:</strong></label><label id=\"email\" class=\"reviewValues\">" + data[0].email + "</label></span>";
            document.getElementById("spanEmail").innerHTML = str;
            str = "<span class=\"reviewBooking\"><label class=\"reviewLabel\"><strong>Contact No:</strong></label><label id=\"contactNo\" class=\"reviewValues\">" + data[0].contactNo + "</label></span>";
            document.getElementById("spanContactNo").innerHTML = str;
            str = "<span class=\"reviewBooking\"><label class=\"reviewLabel\"><strong>Credits remaining:</strong></label><label id=\"creditsRemain\" class=\"reviewValues\">" + data[0].credit + "</label></span>";
            document.getElementById("spanCreditsRemain").innerHTML = str;
        })
        .catch(error => console.log('error', error));
}

function getCompletedBooking() {
    var getUserID = sessionStorage.getItem("userID");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ "query": "SELECT * FROM laundrotech.Booking where bookingStatus in ('completed','canceled') and FK_userID = " + getUserID + " ;" });
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
            if (data[0] == null) {
                console.log("null")
            } else {
                console.log("else");

                str += "<table style=\"width:100%\"> <tr><th>Booking ID</th><th>Booking Date</th><th>Start Time</th><th>End Time</th><th>Booking Status</th><th>Booking Code</th></tr>"
                for (var i = 0; i < data.length; i++) {
                    count = i + 1;
                    str += "<tr><th>" + data[i].bookingID + "</th><th>" + data[i].bookingDate + "</th><th>" + data[i].startTime + "</th><th>" + data[i].endTime + "</th><th>" + data[i].bookingStatus + "</th><th>" + data[i].bookingCode + "</th></tr>"
                }
                str += "</table>"
                document.getElementById("locationTile2").innerHTML = str;
            }

        })
        .catch(error => console.log('error', error));

}

function callMethod(bookingId) {
    var result = confirm("Are you sure you wish to Cancel Booking");
    if (result) {
        updateCancel(bookingId);
        var userID = sessionStorage.getItem("userID");

        updateRefund(userID, bookingId);
    }

}

function updateCancel(bookingId) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ "query": "Update laundrotech.Booking SET laundrotech.Booking.bookingStatus= 'canceled' WHERE laundrotech.Booking.bookingID=" + bookingId + ";" });
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

function updateRefund(userID, bId) {

     var bookingId = bId;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "query": "SELECT * FROM laundrotech.WashingMachine AS wm, laundrotech.Booking AS bk WHERE wm.washingMachineID = bk.FK_washingMachineID AND bk.bookingID = \'" + bookingId + "\'" });
    console.log(raw);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    var str = '';
    fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/getbooking", requestOptions)
        .then(response => response.text())
        .then(result => {
            var data = JSON.parse(result);
            price = data[0].price;

            
            var raw = JSON.stringify({ "query": "UPDATE `laundrotech`.`User` SET `credit`= credit + " + price + " WHERE `userID`='" + userID + "';" });

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
        })
        .catch(error => console.log('error', error));
}

