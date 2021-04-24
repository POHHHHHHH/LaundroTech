var sha256 = function sha256(ascii) {
	function rightRotate(value, amount) {
		return (value>>>amount) | (value<<(32 - amount));
	};
	
	var mathPow = Math.pow;
	var maxWord = mathPow(2, 32);
	var lengthProperty = 'length'
	var i, j; // Used as a counter across the whole file
	var result = ''

	var words = [];
	var asciiBitLength = ascii[lengthProperty]*8;
	
	//* caching results is optional - remove/add slash from front of this line to toggle
	// Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
	// (we actually calculate the first 64, but extra values are just ignored)
	var hash = sha256.h = sha256.h || [];
	// Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
	var k = sha256.k = sha256.k || [];
	var primeCounter = k[lengthProperty];
	/*/
	var hash = [], k = [];
	var primeCounter = 0;
	//*/

	var isComposite = {};
	for (var candidate = 2; primeCounter < 64; candidate++) {
		if (!isComposite[candidate]) {
			for (i = 0; i < 313; i += candidate) {
				isComposite[i] = candidate;
			}
			hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
			k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
		}
	}
	
	ascii += '\x80' // Append Ƈ' bit (plus zero padding)
	while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
	for (i = 0; i < ascii[lengthProperty]; i++) {
		j = ascii.charCodeAt(i);
		if (j>>8) return; // ASCII check: only accept characters in range 0-255
		words[i>>2] |= j << ((3 - i)%4)*8;
	}
	words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
	words[words[lengthProperty]] = (asciiBitLength)
	
	// process each chunk
	for (j = 0; j < words[lengthProperty];) {
		var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
		var oldHash = hash;
		// This is now the undefinedworking hash", often labelled as variables a...g
		// (we have to truncate as well, otherwise extra entries at the end accumulate
		hash = hash.slice(0, 8);
		
		for (i = 0; i < 64; i++) {
			var i2 = i + j;
			// Expand the message into 64 words
			// Used below if 
			var w15 = w[i - 15], w2 = w[i - 2];

			// Iterate
			var a = hash[0], e = hash[4];
			var temp1 = hash[7]
				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
				+ ((e&hash[5])^((~e)&hash[6])) // ch
				+ k[i]
				// Expand the message schedule if needed
				+ (w[i] = (i < 16) ? w[i] : (
						w[i - 16]
						+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
						+ w[i - 7]
						+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
					)|0
				);
			// This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
			var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
				+ ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
			
			hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
			hash[4] = (hash[4] + temp1)|0;
		}
		
		for (i = 0; i < 8; i++) {
			hash[i] = (hash[i] + oldHash[i])|0;
		}
	}
	
	for (i = 0; i < 8; i++) {
		for (j = 3; j + 1; j--) {
			var b = (hash[i]>>(j*8))&255;
			result += ((b < 16) ? 0 : '') + b.toString(16);
		}
	}
	return result;
};


function login() {
	event.preventDefault();
	//Get username, Password from forms
    var getUsername = document.getElementById("loginUsername").value;
    var getPassword = document.getElementById("loginPassword").value;
    var getWashingMachineID = document.getElementById("loginWashingMachineID").value;
	var shaPassword = sha256(getPassword);
	// Check username, password in db
	var myHeaders = new Headers(); 
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify({"query":"SELECT * FROM laundrotech.User where username ='"+ getUsername +"' and password ='"+ shaPassword +"';"});
	console.log(raw);
	
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
	    body: raw,
		redirect: 'follow'
		};


	fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/login", requestOptions)
	.then(response => response.text())
	.then(result => {
        var data = JSON.parse(result);
        if(data[0] == null){
			console.log("Wrong Username and/or Password");
			alert("Wrong Username and/or Password");
		}
		else if(data[0].role !== "admin"){
			console.log("User is not a Admin.");
			alert("User is not a Admin.");
		}
        else{
			console.log("You have Login as Admin.");
			sessionStorage.setItem("userID", data[0].userID);
			sessionStorage.setItem("username", data[0].username);
			sessionStorage.setItem("fullName", data[0].fullName);
			sessionStorage.setItem("washingMachineID", getWashingMachineID);
			window.location.href = "./bookingCode.html";
		}
	})
	.catch(error => console.log('error', error));
}


function logout() {
	event.preventDefault();
	//Get username, Password from forms
    var getUsername = document.getElementById("logoutUsername").value;
    var getPassword = document.getElementById("logoutPassword").value;
	var shaPassword = sha256(getPassword);
	// Check username, password in db
	var myHeaders = new Headers(); 
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify({"query":"SELECT * FROM laundrotech.User where username ='"+ getUsername +"' and password ='"+ shaPassword +"';"});
	console.log(raw);
	
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
	    body: raw,
		redirect: 'follow'
		};


	fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/login", requestOptions)
	.then(response => response.text())
	.then(result => {
        var data = JSON.parse(result);
        if(data[0] == null){
			console.log("Wrong Username and/or Password");
			alert("Wrong Username and/or Password");
		}
		else if(data[0].role !== "admin"){
			console.log("User is not a Admin.");
			alert("User is not a Admin.");
		}
        else{
			console.log("You have Logout as Admin.");
			sessionStorage.clear();
			window.location.href = "./index.html";
		}
	})
	.catch(error => console.log('error', error));
}

function verifyBookingCode() {
	event.preventDefault();

	//Get user input - Booking Code
	var getBookingCode = document.getElementById("bookingCode").value;
	var getWashingMachineID = sessionStorage.getItem("washingMachineID");

	
	// Get time slot
	var timeslot = getTimeslot();

	// Get today date
	var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
            
	// Get Status
	var bookingStatus = "active"

	//Search Booking Code
	var myHeaders = new Headers(); 
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify({"query":"SELECT * FROM laundrotech.Booking, laundrotech.User where FK_userID = userID and FK_washingMachineID = '"+ getWashingMachineID +"' and bookingDate = '"+ today +"' and FK_timeslotID= '"+ timeslot +"' and bookingCode = '"+ getBookingCode +"' and bookingStatus = '"+ bookingStatus +"';"});
	console.log(raw);
	
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
	    body: raw,
		redirect: 'follow'
		};


	fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/getbooking", requestOptions)
	.then(response => response.text())
	.then(result => {
        var data = JSON.parse(result);
        if(data[0] == null){
			console.log("Booking code is invalid.");
			alert("Booking code is invalid.");
		}
        else{
			console.log("Booking code is valid.");
			sessionStorage.setItem("fullName", data[0].fullName);
			sessionStorage.setItem("bookingID", data[0].bookingID);
			sessionStorage.setItem("bookingDate", data[0].bookingDate);
			sessionStorage.setItem("startTime", data[0].startTime);
			sessionStorage.setItem("endTime", data[0].endTime);
			window.location.href = "./bookingDetails.html";
		}
	})
	.catch(error => console.log('error', error));

}

function displayBookingDetails(){
	//Get from session storage
	var fullName = sessionStorage.getItem("fullName");
	var washingMachineID = sessionStorage.getItem("washingMachineID");
	var bookingID = sessionStorage.getItem("bookingID");
	var bookingDate = sessionStorage.getItem("bookingDate");
	var startTime = sessionStorage.getItem("startTime");
	var endTime = sessionStorage.getItem("endTime");

	//Display booking details
	document.getElementById("name").innerHTML= "Dear"+ fullName +", Thank you for using our services.";
	document.getElementById("washingMachineID").innerHTML= washingMachineID;
	document.getElementById("bookingID").innerHTML= bookingID;
	document.getElementById("date").innerHTML= bookingDate;
	document.getElementById("start").innerHTML= startTime;
	document.getElementById("end").innerHTML= endTime;
}

function updateBookingStatus() {
	event.preventDefault();
	var bookingID = sessionStorage.getItem("bookingID");
	var completedStatus = "completed";
	var myHeaders = new Headers(); 
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify({"query":"UPDATE `laundrotech`.`Booking` SET `bookingStatus`='"+ completedStatus +"' WHERE `bookingID`='"+ bookingID+"';"});
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
		console.log("Updated Booking status");
        window.location.href = "./bookingCode.html";
	})
	.catch(error => console.log('error', error));
}


function getTimeslot(){
	//Get time slot
	var now = new Date();
	var nowHour = now.getHours();
	var timeslot = nowHour +1;
	return timeslot;
}

