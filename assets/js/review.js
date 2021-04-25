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
    fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/reviewbooking", requestOptions)
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
        sessionStorage.setItem("credit", data[0].credit);
        str = "<span class=\"reviewBooking\"><label class=\"reviewLabel\"><strong>Washing Machine Price:</strong></label><label id=\"price\" class=\"reviewValues\">$" + sessionStorage.getItem("price") + "</label></span>";
        document.getElementById("spanPrice").innerHTML = str;
        str = "<span class=\"reviewBooking\"><label class=\"reviewLabel\"><strong>Booking Fee:</strong></label><label id=\"bookingFee\" class=\"reviewValues\">$1</label></span>";
        document.getElementById("spanBookingFee").innerHTML = str;
        str = "<span class=\"reviewBooking\"><label class=\"reviewLabel\"><strong>Total:</strong></label><label id=\"total\" class=\"reviewValues\">$" + (parseInt(sessionStorage.getItem("price")) + 1) + "</label></span>";
        sessionStorage.setItem("total", (parseInt(sessionStorage.getItem("price")) + 1).toString());
        document.getElementById("spanTotal").innerHTML = str;
        str = "<div id=\"reviewButton\" class=\"reviewButton\"><input type=\"button\" id=\"topUp\" value=\"Top Up Credits\" onclick=\"location.href='topup.html'\"><input type=\"button\" id=\"checkout\" value=\"Checkout\" onclick=\"checkout()\"></div>";
        document.getElementById("reviewButton").innerHTML = str;
    })
    .catch(error => console.log('error', error));				
}

window.onload=loadReview;

function checkout(){

    if(parseInt(sessionStorage.getItem("total")) > sessionStorage.getItem("credit")){
        var insufficientFunds = document.getElementById("insufficientCredits");
        insufficientFunds.style.display = "block";
    }
    else{
        var myHeaders = new Headers(); 
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"query":"SELECT bookingCode FROM laundrotech.Booking WHERE bookingDate = '" + sessionStorage.getItem("bookingDate") + "'"});

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        var str = "";
        
        fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/reviewbooking", requestOptions)
        .then(response => response.text())
        .then(result => {
            var data = JSON.parse(result);
            var bookingCode = '';
            if(data[0] == null){
                
                chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                for (var i = 5; i > 0; --i) 
                    bookingCode += chars[Math.floor(Math.random() * chars.length)];
            }
            else{
                var codeExists = true;
                while(codeExists){
                    bookingCode = '';
                    var count = '0';
                    chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    for (var i = 5; i > 0; --i) 
                        bookingCode += chars[Math.floor(Math.random() * chars.length)];

                    for(var i = 0; i < data.length; i++){
                        if(data[i].bookingCode == bookingCode){
                            count = '1';
                            i = data.length;
                        }
                    }

                    if(count == '0'){
                        codeExists = false;
                    }
                    else{
                        count = '0';
                    }
                }
            }

            var startHr = parseInt(sessionStorage.getItem("bookingTime").substring(0,2));
            
            var endHr = startHr + 1;
            
            if(endHr < 10){
                endHr = "0" + endHr.toString() + ":00";
            }
            else if(endHr == 24){
                endHr = "00:00";
            }
            else{
                endHr = endHr.toString() + ":00";
            }

            raw = JSON.stringify({"query":"INSERT INTO laundrotech.Booking (FK_userID,FK_timeslotID,FK_washingMachineID,bookingDate,startTime,endTime,bookingStatus,bookingCode) VALUES (" + 
                        sessionStorage.getItem("userID") + "," + sessionStorage.getItem("timeslotID") + "," + sessionStorage.getItem("washingMachineID") + ",'" + sessionStorage.getItem("bookingDate") + "','" + sessionStorage.getItem("bookingTime") + "','" + 
                        endHr + "'," + "'active','" + bookingCode + "');"});
            requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            return fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/reviewbooking", requestOptions)
        })
        .then(response => response.text())
        .then(result => {
            raw = JSON.stringify({"query":"UPDATE laundrotech.User SET credit = " + (sessionStorage.getItem("credit") - parseInt(sessionStorage.getItem("total"))) + " WHERE userID = " + sessionStorage.getItem("userID") + ";"});

            sessionStorage.setItem("credit", (sessionStorage.getItem("credit") - parseInt(sessionStorage.getItem("total"))));
            requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            return fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/reviewbooking", requestOptions)
        })
        .then(response => response.text())
        .then(result => window.location.replace("index.html"))
        .catch(error => console.log('error', error));
    }
    
}