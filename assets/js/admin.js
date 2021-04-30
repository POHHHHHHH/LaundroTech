function chooseTable(){
    var myHeaders = new Headers(); 
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"query":"SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA='laundrotech' AND (TABLE_NAME = 'Booking' OR TABLE_NAME='Payment' OR TABLE_NAME='User' OR TABLE_NAME='WashingMachine')"});
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    var str = "";
    fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/admin", requestOptions)
    .then(response => response.text())
    .then(result => {
        var data = JSON.parse(result);
        str += "<select class=\"inline\" id=\"tableName\" onchange=\"displayTable()\"><option value='chooseTable' selected disabled hidden>Choose a Table</option>";
        for (var i = 0; i < data.length; i++) {
            str += "<option>" + data[i].TABLE_NAME + "</option>"
        }
        str += "</select>";
        document.getElementById("tableName").innerHTML = str;

    })
    .catch(error => console.log('error', error));
}

window.onload=chooseTable;

function displayTable(){
    var tableName = document.getElementById("tableName").value;
    document.getElementById("createButtonID").style.display = "inline-block";

    if(tableName === 'Booking'){
        var myHeaders = new Headers(); 
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"query":"SELECT * FROM laundrotech.Booking"});
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        var str = "";
        fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/admin", requestOptions)
        .then(response => response.text())
        .then(result => {
            var data = JSON.parse(result);
            var str = "";
            str += '<table id=\"bookingTable\"class = "selectedTable">' + 
                    '<thead>' + 
                        '<tr>' +
                        '<th><strong>Booking ID</strong></th>' +
                        '<th><strong>User ID</strong></th>' +
                        '<th><strong>Timeslot ID</strong></th>' +
                        '<th><strong>Washing Machine ID</strong></th>' +
                        '<th><strong>Booking Date</strong></th>' +
                        '<th><strong>Start Time</strong></th>' +
                        '<th><strong>End Time</strong></th>' +
                        '<th><strong>Booking Status</strong></th>' +
                        '<th><strong>Booking Code</strong></th>' +
                        '<th><strong>Action</strong></th>' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody id=\"bodyID\"">';
    
            for (var i = 0; i < data.length; i++) {
            str += "<tr  id=\"" + i + "\">" +  
                "<td class=\"rowData\">" + data[i].bookingID + "</td>" + 
                "<td class=\"rowData\">" + data[i].FK_userID + "</td>" +
                "<td contenteditable class=\"rowData\">" + data[i].FK_timeslotID + "</td>" +
                "<td contenteditable class=\"rowData\">" + data[i].FK_washingMachineID + "</td>" +
                "<td contenteditable class=\"rowData\">" + data[i].bookingDate + "</td>" +
                "<td contenteditable class=\"rowData\">" + data[i].startTime + "</td>" +
                "<td contenteditable class=\"rowData\">" + data[i].endTime + "</td>" +
                "<td contenteditable class=\"rowData\">" + data[i].bookingStatus + "</td>" +
                "<td>" + data[i].bookingCode + "</td>" +
                "<td ><button type=\"button\" class=\"updateButton\" onclick=\"updateRow()\">Update</button><button type=\"button\" class=\"deleteButton\" onclick=\"deleteRow()\">Delete</button></td>" +
                "</tr>"
        }

                str += "</tbody>" + "</tables>";
                document.getElementById("displayedTable").innerHTML = str;
        })
        .catch(error => console.log('error', error));
    }
    else if(tableName === 'Payment'){
        var myHeaders = new Headers(); 
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"query":"SELECT * FROM laundrotech.Payment"});
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        var str = "";
        fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/admin", requestOptions)
        .then(response => response.text())
        .then(result => {
            var data = JSON.parse(result);
            var str = "";
            str += '<table id=\"paymentTable\" class = "selectedTable">' + 
                    '<thead>' + 
                        '<tr>' +
                        '<th><strong>Payment ID</strong></th>' +
                        '<th><strong>User ID</strong></th>' +
                        '<th><strong>Booking ID</strong></th>' +
                        '<th ><strong>Amount Paid</strong></th>' +
                        '<th><strong>Status</strong></th>' +
                        '<th><strong>Action</strong></th>' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody id=\"bodyID\"">';
                
            for (var i = 0; i < data.length; i++) {
            str += "<tr  id=\"" + i + "\">" +  
                "<td class=\"rowData\">" + data[i].paymentID + "</td>" + 
                "<td class=\"rowData\">" + data[i].FK_userID + "</td>" +
                "<td class=\"rowData\">" + data[i].FK_bookingID + "</td>" +
                "<td contenteditable class=\"rowData\">" + data[i].price + "</td>" +
                "<td contenteditable class=\"rowData\">" + data[i].status + "</td>" +
                "<td ><button type=\"button\" class=\"updateButton\" onclick=\"updateRow()\">Update</button><button type=\"button\" class=\"deleteButton\" onclick=\"deleteRow()\">Delete</button></td>" +
                "</tr>"
        }
                str += "</tbody>" + "</tables>";
                document.getElementById("displayedTable").innerHTML = str;
        })
        .catch(error => console.log('error', error));
    }
    else if(tableName === 'User'){
        var myHeaders = new Headers(); 
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"query":"SELECT * FROM laundrotech.User"});
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        var str = "";
        fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/admin", requestOptions)
        .then(response => response.text())
        .then(result => {
            var data = JSON.parse(result);
            var str = "";
            str += '<table id=\"userTable\" class = "selectedTable">' + 
                    '<thead>' + 
                        '<tr>' +
                        '<th><strong>User ID</strong></th>' +
                        '<th><strong>Username</strong></th>' +
                        '<th><strong>Password</strong></th>' +
                        '<th><strong>Role</strong></th>' +
                        '<th><strong>Full Name</strong></th>' +
                        '<th><strong>Email</strong></th>' +
                        '<th><strong>Contact No</strong></th>' +
                        '<th><strong>Credits</strong></th>' +
                        '<th><strong>Action</strong></th>' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody id=\"bodyID\"">';
                
            for (var i = 0; i < data.length; i++) {
            str += "<tr  id=\"" + i + "\">" +  
                "<td class=\"rowData\">" + data[i].userID + "</td>" + 
                "<td class=\"rowData\">" + data[i].username + "</td>" +
                "<td class=\"rowData\">" + data[i].password + "</td>" +
                "<td contenteditable class=\"rowData\">" + data[i].role + "</td>" +
                "<td contenteditable class=\"rowData\">" + data[i].fullName + "</td>" +
                "<td contenteditable class=\"rowData\">" + data[i].email + "</td>" +
                "<td contenteditable class=\"rowData\">" + data[i].contactNo + "</td>" +
                "<td contenteditable class=\"rowData\">" + data[i].credit + "</td>" +
                "<td ><button type=\"button\" class=\"updateButton\" onclick=\"updateRow()\">Update</button><button type=\"button\" class=\"deleteButton\" onclick=\"deleteRow()\">Delete</button></td>" +
                "</tr>"
        }
                str += "</tbody>" + "</tables>";
                document.getElementById("displayedTable").innerHTML = str;
        })
        .catch(error => console.log('error', error));
    }
    else{
        var myHeaders = new Headers(); 
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"query":"SELECT * FROM laundrotech.WashingMachine"});
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        var str = "";
        fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/admin", requestOptions)
        .then(response => response.text())
        .then(result => {
            var data = JSON.parse(result);
            var str = "";
            str += '<table id=\"wmTable\" class = "selectedTable">' + 
                    '<thead>' + 
                        '<tr>' +
                        '<th><strong>Washing Machine ID</strong></th>' +
                        '<th><strong>Location</strong></th>' +
                        '<th><strong>Address</strong></th>' +
                        '<th><strong>Price</strong></th>' +
                        '<th><strong>Brand</strong></th>' +
                        '<th><strong>Model</strong></th>' +
                        '<th><strong>Action</strong></th>' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody id=\"bodyID\"">';
                
            for (var i = 0; i < data.length; i++) {
            str += "<tr  id=\"" + i + "\">" +  
                "<td class=\"rowData\">" + data[i].washingMachineID + "</td>" + 
                "<td contenteditable class=\"rowData\">" + data[i].location + "</td>" +
                "<td contenteditable class=\"rowData\">" + data[i].washingMachineAddress + "</td>" +
                "<td contenteditable class=\"rowData\">" + data[i].price + "</td>" +
                "<td contenteditable class=\"rowData\">" + data[i].washingMachineBrand + "</td>" +
                "<td contenteditable class=\"rowData\">" + data[i].washingMachineModel + "</td>" +
                "<td ><button type=\"button\" class=\"updateButton\" onclick=\"updateRow()\">Update</button><button type=\"button\" class=\"deleteButton\" onclick=\"deleteRow()\">Delete</button></td>" +
                "</tr>"
        }
                str += "</tbody>" + "</tables>";
                document.getElementById("displayedTable").innerHTML = str;
        })
        .catch(error => console.log('error', error));
    }
}

function updateRow(){
    var rowId =  event.target.parentNode.parentNode.id; 
    var data =  document.getElementById(rowId).querySelectorAll(".rowData");  
    var tableName = document.getElementById("tableName").value;
    var myHeaders = new Headers(); 
    myHeaders.append("Content-Type", "application/json");
    
    if(tableName === "Booking"){
        var bookingID = data[0].innerHTML; 
        var timeslotID = data[2].innerHTML; 
        var washingMachineID = data[3].innerHTML; 
        var bookingDate = data[4].innerHTML; 
        var startTime = data[5].innerHTML; 
        var endTime = data[6].innerHTML; 
        var bookingStatus = data[7].innerHTML;  

        var raw = JSON.stringify({"query":"UPDATE laundrotech.Booking SET FK_timeslotID = '" + timeslotID + "', FK_washingMachineID = '" + washingMachineID + "', bookingDate = '" + bookingDate + "', startTime = '" + startTime + "', endTime = '" +
                        endTime + "', bookingStatus = '" + bookingStatus + "' WHERE bookingID = '" + bookingID + "'"});
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/admin", requestOptions)
        .then(response => response.text())
        .then(result => {
            var data = JSON.parse(result);
            if(data.errorType === "Error")
                alert("Invalid Values");
            else
                alert("Entry Updated!");
        })
        .catch(error => console.log('error', error));
    }
    else if(tableName === "Payment"){
        var paymentID = data[0].innerHTML; 
        var price = data[3].innerHTML; 
        var status = data[4].innerHTML; 

        var raw = JSON.stringify({"query":"UPDATE laundrotech.Payment SET price = '" + price + "', status = '" + status + "' WHERE paymentID = '" + paymentID + "'"});
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/admin", requestOptions)
        .then(response => response.text())
        .then(result => {
            if(data.errorType === "Error")
                alert("Invalid Values");
            else
                alert("Entry Updated!");
        })
        .catch(error => console.log('error', error));
    }
    else if(tableName === "User"){
        var userID = data[0].innerHTML; 
        var role = data[3].innerHTML; 
        var fullName = data[4].innerHTML; 
        var email = data[5].innerHTML; 
        var contactNo = data[6].innerHTML; 
        var credit = data[7].innerHTML;  

        var raw = JSON.stringify({"query":"UPDATE laundrotech.User SET role = '" + role + "', fullName = '" + fullName + "', email = '" + email + "', contactNo = '" + contactNo + "', credit = '" +
                        credit + "' WHERE userID = '" + userID + "'"});
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/admin", requestOptions)
        .then(response => response.text())
        .then(result => {
            if(data.errorType === "Error")
                alert("Invalid Values");
            else
                alert("Entry Updated!");
        })
        .catch(error => console.log('error', error));
    }
    else{
        var washingMachineID = data[0].innerHTML; 
        var location = data[1].innerHTML; 
        var washingMachineAddress = data[2].innerHTML; 
        var price = data[3].innerHTML;
        var washingMachineBrand = data[4].innerHTML; 
        var washingMachineModel = data[5].innerHTML; 
        
        var raw = JSON.stringify({"query":"UPDATE laundrotech.WashingMachine SET location = '" + location + "', washingMachineAddress = '" + 
        washingMachineAddress + "', price = '" + 
        price + "', washingMachineBrand = '" + 
        washingMachineBrand + 
                            "', washingMachineModel = '" +	
                            washingMachineModel + "' WHERE washingMachineID = '" + 
                            washingMachineID + "'"});
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/admin", requestOptions)
        .then(response => response.text())
        .then(result => {
            if(data.errorType === "Error")
                alert("Invalid Values");
            else
                alert("Entry Updated!");
        })
        .catch(error => console.log('error', error));
    }


}

function deleteRow(){
    var rowId =  event.target.parentNode.parentNode.id; 
    var data =  document.getElementById(rowId).querySelectorAll(".rowData");  
    var tableName = document.getElementById("tableName").value;
    var myHeaders = new Headers(); 
    myHeaders.append("Content-Type", "application/json");

    if(tableName === "Booking"){
        var bookingID = data[0].innerHTML;

        var raw = JSON.stringify({"query":"DELETE FROM laundrotech.Payment WHERE FK_bookingID = '" + bookingID + "'"});
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/admin", requestOptions)
        .then(response => response.text())
        .then(result => {
            var bookingID = data[0].innerHTML;
            var raw = JSON.stringify({"query":"DELETE FROM laundrotech.Booking WHERE bookingID = '" + bookingID + "'"});

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            return fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/admin", requestOptions)
        })
        .then(response => response.text())
        .then(result => {
            alert("Entry Deleted!");
             displayTable();
        })
        .catch(error => console.log('error', error));

    }
    else if (tableName === "Payment"){
        var paymentID = data[0].innerHTML;

        var raw = JSON.stringify({"query":"DELETE FROM laundrotech.Payment WHERE paymentID = '" + paymentID + "'"});
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/admin", requestOptions)
        .then(response => response.text())
        .then(result => {					
            alert("Entry Deleted!")

            displayTable();
        })
        .catch(error => console.log('error', error));
    }
    else if(tableName === "User"){
        var userID = data[0].innerHTML;

        var raw = JSON.stringify({"query":"DELETE FROM laundrotech.User WHERE userID = '" + userID + "'"});
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/admin", requestOptions)
        .then(response => response.text())
        .then(result => {					
            alert("Entry Deleted!")

            displayTable();
        })
        .catch(error => console.log('error', error));
    }
    else{
        var washingMachineID = data[0].innerHTML;

        var raw = JSON.stringify({"query":"DELETE FROM laundrotech.WashingMachine WHERE washingMachineID = '" + washingMachineID + "'"});
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/admin", requestOptions)
        .then(response => response.text())
        .then(result => {					
            alert("Entry Deleted!")

            displayTable();
        })
        .catch(error => console.log('error', error));
    }
}

function createRow(){
    var table = document.getElementById("bodyID");
    var row = table.insertRow(-1);
    var index = parseInt(table.rows[table.rows.length - 2].id) + 1;
    row.id = index;
    var tableName = document.getElementById("tableName").value;
    var cell = '';

    if(tableName === "Booking"){
        cell = row.insertCell(0);
        cell.setAttribute("class", "rowData");
        cell = row.insertCell(1);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(2);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(3);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(4);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(5);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(6);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(7);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(8);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(9);
        cell.innerHTML = "<td><button type=\"button\" class=\"createButton\" onclick=\"createEntry()\">Create</button><button type=\"button\" class=\"deleteButton\" onclick=\"cancelEntry()\">Cancel</button></td>";
    }
    else if(tableName === "Payment"){
        cell = row.insertCell(0);
        cell.setAttribute("class", "rowData");
        cell = row.insertCell(1);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(2);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(3);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(4);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(5);
        cell.innerHTML = "<td><button type=\"button\" class=\"createButton\" onclick=\"createEntry()\">Create</button><button type=\"button\" class=\"deleteButton\" onclick=\"cancelEntry()\">Cancel</button></td>";
    }
    else if(tableName === "User"){
        cell = row.insertCell(0);
        cell.setAttribute("class", "rowData");
        cell = row.insertCell(1);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(2);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(3);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(4);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(5);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(6);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(7);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(8);
        cell.innerHTML = "<td><button type=\"button\" class=\"createButton\" onclick=\"createUser()\">Create</button><button type=\"button\" class=\"deleteButton\" onclick=\"cancelEntry()\">Cancel</button></td>";
    }
    else{
        cell = row.insertCell(0);
        cell.setAttribute("class", "rowData");
        cell = row.insertCell(1);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(2);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(3);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(4);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(5);
        cell.setAttribute("class", "rowData");
        cell.setAttribute("contenteditable", "true");
        cell = row.insertCell(6);
        cell.innerHTML = "<td><button type=\"button\" class=\"createButton\" onclick=\"createEntry()\">Create</button><button type=\"button\" class=\"deleteButton\" onclick=\"cancelEntry()\">Cancel</button></td>";
    }
}

function createEntry(){
    var rowId =  event.target.parentNode.parentNode.id; 
    var data =  document.getElementById(rowId).querySelectorAll(".rowData");  
    var tableName = document.getElementById("tableName").value;
    var myHeaders = new Headers(); 
    myHeaders.append("Content-Type", "application/json");

    if(tableName === "Booking"){
        var userID = data[1].innerHTML; 
        var timeslotID = data[2].innerHTML; 
        var washingMachineID = data[3].innerHTML; 
        var bookingDate = data[4].innerHTML; 
        var startTime = data[5].innerHTML; 
        var endTime = data[6].innerHTML; 
        var bookingStatus = data[7].innerHTML;  
        var bookingCode = data[8].innerHTML; 
        var raw = JSON.stringify({"query":"INSERT INTO laundrotech.Booking(FK_userID,FK_timeslotID,FK_washingMachineID,bookingDate,startTime,endTime,bookingStatus,bookingCode)VALUES('" + userID + "','" + timeslotID + "','" 
                        + washingMachineID + "','" + bookingDate + "','" + startTime + "','" + endTime + "','" + bookingStatus + "','" + bookingCode + "')"});
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/admin", requestOptions)
        .then(response => response.text())
        .then(result => {
            var data = JSON.parse(result);
            if(data.errorType === "Error")
                alert("Invalid Values");
            else{
                alert("Entry Created!");	
                displayTable();
            }
        })
        .catch(error => console.log('error', error));
    }
    else if(tableName === "Payment"){
        var userID = data[1].innerHTML; 
        var bookingID = data[2].innerHTML; 
        var price = data[3].innerHTML; 
        var status = data[4].innerHTML; 

        var raw = JSON.stringify({"query":"INSERT INTO laundrotech.Payment(FK_userID,FK_bookingID,price,status)VALUES('" + userID + "','" + bookingID + "','" 
                        + price + "','" + status + "')"});
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/admin", requestOptions)
        .then(response => response.text())
        .then(result => {
            var data = JSON.parse(result);
            if(data.errorType === "Error")
                alert("Invalid Values");
            else{
                alert("Entry Created!");
                displayTable();
            }
        })
        .catch(error => console.log('error', error));
    }
    else{
        var location = data[1].innerHTML; 
        var washingMachineAddress = data[2].innerHTML; 
        var price = data[3].innerHTML; 
        var washingMachineBrand = data[4].innerHTML; 
        var washingMachineModel = data[5].innerHTML; 			
        
        var raw = JSON.stringify({"query":"INSERT INTO laundrotech.WashingMachine(location,washingMachineAddress,price,washingMachineBrand,washingMachineModel)VALUES('" + location + "','" + washingMachineAddress + "','" 
                        + price + "','" + washingMachineBrand + "','" + washingMachineModel + "')"});
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/admin", requestOptions)
        .then(response => response.text())
        .then(result => {
            var data = JSON.parse(result);
            if(data.errorType === "Error")
                alert("Invalid Values");
            else{
                alert("Entry Created!");
                displayTable();
            }
        })
        .catch(error => console.log('error', error));
    }
}

function createUser(){
    var rowId =  event.target.parentNode.parentNode.id; 
    var data =  document.getElementById(rowId).querySelectorAll(".rowData");  
    var tableName = document.getElementById("tableName").value;
    var myHeaders = new Headers(); 
    myHeaders.append("Content-Type", "application/json");

    var username = data[1].innerHTML; 
    var password = data[2].innerHTML; 
    var role = data[3].innerHTML; 
    var fullName = data[4].innerHTML; 
    var email = data[5].innerHTML; 
    var contactNo = data[6].innerHTML; 
    var credit = data[7].innerHTML;  

    var raw = JSON.stringify({"query":"SELECT username FROM laundrotech.User WHERE username = '" + username + "'"});
        
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/admin", requestOptions)
    .then(response => response.text())
    .then(result => {
        var data = JSON.parse(result);
        
        if(data.length > 0){
            alert("Username already exists!")
        }
        else{
            raw = JSON.stringify({"query":"INSERT INTO laundrotech.User(username,password,role,fullName,email,contactNo,credit)VALUES('" + username + "','plaintextPW','" + role + "','" + fullName + "','" +
                        email + "','" + contactNo + "','" + credit + "')", "password": password});
            
            console.log(raw);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/admin/createuser", requestOptions)
            .then(response => response.text())
            .then(result => {
                var data = JSON.parse(result);
                if(data.errorType === "Error")
                    alert("Invalid Values");
                else{
                    alert("Entry Created!");
                    displayTable();
                }
            })
            .catch(error => console.log('error', error));
        }
    })
    .catch(error => console.log('error', error));
}

function cancelEntry(){
    var rowId =  event.target.parentNode.parentNode.id; 
    var table = document.getElementById("bodyID");
    table.deleteRow(parseInt(rowId));
}