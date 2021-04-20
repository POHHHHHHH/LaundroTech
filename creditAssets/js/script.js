function getPromotion(){
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
                str += "<article class='style"+ i+1 + "'>" + "<span class='image'>" + "<img src='images/pic"+ i+1 + ".jpg'/> </span>" + "<a href='payment.html' onclick='getPromotionID()'>" + "<h2 hidden id='promotionID' name='promotionID'>"+ data[i].promotionID +"</h2>" + "<h2 hidden id='price' name='price'>"+ data[i].price +"</h2>" + "<h2 hidden id='credit' name='credit'>"+ data[i].creditTopUp +"</h2>"+ "<h2 id='promotionName' name='promotionName'>"+ data[i].name +"</h2>" + "<div class='content'><p id='promotionDesc' name='promotionDesc'>"+ data[i].description+"</p></div></a></article>"
                
            }
            document.getElementById("promotionDetail").innerHTML = str;
        }
	})
	.catch(error => console.log('error', error));
}

function getPromotionID(){
    var promotionID = document.getElementById("promotionID").innerHTML;
    alert(promotionID);
}