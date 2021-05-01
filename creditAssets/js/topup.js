function getPromotion(){
    sessionStorage.setItem("username", "user01");
    sessionStorage.setItem("userID", "2");

    
    var myHeaders = new Headers(); 
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify({"query":"SELECT * FROM laundrotech.promotion;"});
	console.log(raw);
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
	    body: raw,
		redirect: 'follow'
		};

	var str = "";
	fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/promotion", requestOptions)
	.then(response => response.text())
	.then(result => {
        var data = JSON.parse(result);
        // console.log("before if" + data.length);
        if(data[0] == null){
            console.log("null")
        }
        else{
            console.log("else");
            for (var i = 0; i < data.length; i++) {
                count = i + 1;
                str += "<article class='style"+ count + "'>" + "<span class='image'>" + "<img src='images/pic"+ count + ".jpg'/> </span>" 
                + "<a id='"+data[i].promotionID+"' href='#' onclick='getPromotionID(this.id)'>" 
                + "<h2 hidden id='promotionID' name='promotionID'>"+ data[i].promotionID +"</h2>" 
                +"</h2>"+ "<h2 id='promotionName' name='promotionName'>"+ data[i].name +"</h2>" 
                + "<div class='content'><p id='promotionDesc' name='promotionDesc'>"+ data[i].description +"</p></div></a></article>"
                
            }
            document.getElementById("promotionDetail").innerHTML = str;
        }
	})
	.catch(error => console.log('error', error));
}

function getPromotionID(clicked_id){
    var promotionID = clicked_id;
    var myHeaders = new Headers(); 
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify({"query":"SELECT * FROM laundrotech.promotion as p where p.promotionID='"+ promotionID +"';"});
	console.log(raw);
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
	    body: raw,
		redirect: 'follow'
		};

	fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/promotion", requestOptions)
	.then(response => response.text())
	.then(result => {
        var data = JSON.parse(result);
        // console.log("before if" + data.length);
        if(data[0] == null){
            console.log("null")
        }
        else{
            sessionStorage.setItem("promotionName", data[0].name);
            sessionStorage.setItem("promotionDesc", data[0].description);
            sessionStorage.setItem("promotionID", data[0].promotionID);
            sessionStorage.setItem("promotionPrice", data[0].price);
            sessionStorage.setItem("promotionCredit", data[0].creditTopUp);
            window.location.href = "./payment.html";
         
        }
	})
	.catch(error => console.log('error', error));


}