window.addEventListener( "pageshow", function ( event ) {
    var historyTraversal = event.persisted || 
                           ( typeof window.performance != "undefined" && 
                                window.performance.navigation.type === 2 );
    if ( historyTraversal ) {
      // Handle page restore.
      window.location.reload();
    }
  });
  
Date.prototype.addHours = function(h){
    this.setTime(this.getTime() + (h*60*60*1000));

    return this;
}

function selectDate(){
    var today = new Date().addHours(8).toISOString().split('T')[0];
    document.getElementsByName("bookingDate")[0].setAttribute('min', today);
}

window.onload = selectDate;

function changeTimeslot(){

    var today = new Date().addHours(8).toISOString().split('T')[0];

    document.getElementsByName("bookingDate")[0].setAttribute('min', today);

    var date = new Date(document.getElementById("bookingDate").value);
    var day = date.getDate();
    if(day < 10){
        day = "0" + day;
    }
    var month = date.getMonth()+1;
    if(month < 10){
        month = "0"+ month;
    }
    var year = date.getFullYear();

    var selectedDate = day + "/" + month + "/" + year;
    var myHeaders = new Headers(); 
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"query":"SELECT ts.bookingTime FROM (SELECT t.bookingTime, w.washingMachineID FROM laundrotech.Booking AS b, laundrotech.WashingMachine AS w, laundrotech.Timeslot AS t " + 
        "WHERE b.FK_washingMachineID = w.washingMachineID AND w.location= '" + sessionStorage.getItem("location") + "' AND b.FK_timeslotID <> t.timeslotID AND b.bookingDate = '" + selectedDate + "' " + 
        "UNION " + 
        "SELECT t.bookingTime, w.washingMachineID FROM laundrotech.Booking AS b, laundrotech.WashingMachine AS w, laundrotech.Timeslot AS t " + 
        "WHERE (w.washingMachineID NOT IN (SELECT bk.FK_washingMachineID FROM laundrotech.Booking AS bk WHERE bk.bookingDate = '" + selectedDate +"')) AND w.location= '" + sessionStorage.getItem("location") + "') AS ts " + 
        "GROUP BY ts.bookingTime"});
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    var str = "";
    fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/gettimeslot", requestOptions)
    .then(response => response.text())
    .then(result => {
         var data = JSON.parse(result);
            str += "<option value='chooseTimeslot' selected disabled hidden>Choose a Timeslot</option>";
            for (var i = 0; i < data.length; i++) {
            str += "<option>" + data[i].bookingTime + "</option>"
        }
        document.getElementById("bookingTime").innerHTML = str;
        var selectElement = document.getElementById("availWMTable");
        selectElement.style.display = "none";
    })
    .catch(error => console.log('error', error));
}

function displayTable(){
    var date = new Date(document.getElementById("bookingDate").value);
    var day = date.getDate();
    if(day < 10){
        day = "0" + day;
    }
    var month = date.getMonth()+1;
    if(month < 10){
        month = "0"+ month;
    }
    var year = date.getFullYear();

    var selectedDate = day + "/" + month + "/" + year;
    var timeslot = document.getElementById("bookingTime").value;

    var myHeaders = new Headers(); 
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"query":"SELECT wm.washingMachineID, wm.washingMachineBrand, wm.washingMachineModel, wm.price, wm.washingMachineAddress FROM " + 
                    "(SELECT t.bookingTime, w.washingMachineID, w.washingMachineBrand, w.washingMachineModel, w.price, w.washingMachineAddress FROM laundrotech.Booking AS b, laundrotech.WashingMachine AS w, laundrotech.Timeslot AS t " + 
                    "WHERE b.FK_washingMachineID = w.washingMachineID AND w.location= '" + sessionStorage.getItem("location") + "' AND b.FK_timeslotID <> t.timeslotID AND b.bookingDate = '" + selectedDate + "' " + 
                    "UNION " + 
                    "SELECT t.bookingTime, w.washingMachineID, w.washingMachineBrand, w.washingMachineModel, w.price, w.washingMachineAddress FROM laundrotech.Booking AS b, laundrotech.WashingMachine AS w, laundrotech.Timeslot AS t " + 
                    "WHERE (w.washingMachineID NOT IN (SELECT bk.FK_washingMachineID FROM laundrotech.Booking AS bk WHERE bk.bookingDate = '" + selectedDate + "')) AND w.location= '" + sessionStorage.getItem("location") + "') AS wm " + 
                    "WHERE wm.bookingTime = '" + timeslot + "' GROUP BY wm.washingMachineID"});
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    var str = "";
    str += '<table class = "availWM">' + 
            '<thead>' + 
                '<tr>' +
                '<th><strong>Washing Machine No.</strong></th>' +
                '<th><strong>Washing Machine Brand</strong></th>' +
                '<th><strong>Washing Machine Model</strong></th>' +
                '<th><strong>Price</strong></th>' +
                '<th><strong>Address</strong></th>' +
                '</tr>' +
            '</thead>' +
            '<tbody">';


    fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/getavailwm", requestOptions)
    .then(response => response.text())
    .then(result => {
         var data = JSON.parse(result);
         
            for (var i = 0; i < data.length; i++) {
            str += "<tr onclick=storeWMDetails(this);>" +  
                "<td>" + data[i].washingMachineID + "</td>" + 
                "<td>" + data[i].washingMachineBrand + "</td>" +
                "<td>" + data[i].washingMachineModel + "</td>" +
                "<td>" + data[i].price + "</td>" +
                "<td>" + data[i].washingMachineAddress + "</td>" +
                "</a>" + "</tr>"
        }

        str += "</tbody>" + "</tables>";
        document.getElementById("availWMTable").innerHTML = str;
        var selectElement = document.getElementById("availWMTable");
        selectElement.style.display = "block";
    })
    .catch(error => console.log('error', error));
}

function storeWMDetails(row){
    var date = new Date(document.getElementById("bookingDate").value);
    var day = date.getDate();
    if(day < 10){
        day = "0" + day;
    }
    var month = date.getMonth()+1;
    if(month < 10){
        month = "0"+ month;
    }
    var year = date.getFullYear();

    var selectedDate = day + "/" + month + "/" + year;
    var timeslot = document.getElementById("bookingTime").value;

    sessionStorage.setItem("washingMachineID", row.cells[0].innerHTML);
    sessionStorage.setItem("price", row.cells[3].innerHTML);
    sessionStorage.setItem("washingMachineAddress", row.cells[4].innerHTML);
    sessionStorage.setItem("bookingDate", selectedDate);
    sessionStorage.setItem("bookingTime", timeslot);

    var myHeaders = new Headers(); 
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"query":"SELECT timeslotID FROM laundrotech.Timeslot WHERE bookingTime = '" + timeslot + "'"});
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/gettimeslot", requestOptions)
    .then(response => response.text())
    .then(result => {
         var data = JSON.parse(result);
        sessionStorage.setItem("timeslotID", data[0].timeslotID);
        window.location.href = "review.html";
    })
    .catch(error => console.log('error', error));
}