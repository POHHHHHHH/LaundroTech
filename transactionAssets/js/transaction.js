
function getTransactionReceipt() {
    var myHeaders = new Headers(); 
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify({"query":"SELECT count(*) as countRow FROM laundrotech.Transaction;"});
	console.log(raw);
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
	    body: raw,
		redirect: 'follow'
		};


	fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/transaction", requestOptions)
	.then(response => response.text())
	.then(result => {
        var data = JSON.parse(result);
        if(data[0] == null){
            console.log("null")
        }
        else{
            var transactionID = data[0].countRow;
        }

        var newReceiptNumber = pad_with_zeroes(transactionID, 6);
        var getPromotionName = sessionStorage.getItem("promotionName");
        var getPromotionDesc = sessionStorage.getItem("promotionDesc");
        var getPromotionPrice = sessionStorage.getItem("promotionPrice");
        
        //Today's Date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;

        document.getElementById("purchaseDate").innerHTML = "Date: " + today;
        document.getElementById("purchaseTransactionID").innerHTML = "Receipt #: " + newReceiptNumber;
        document.getElementById("purchasePlan").innerHTML = getPromotionName + ":";
        document.getElementById("purchasePlanDesc").innerHTML = getPromotionDesc;
        document.getElementById("purchasePlanPrice").innerHTML = "$ " + getPromotionPrice;
        document.getElementById("totalPurchasePrice").innerHTML = "$" + getPromotionPrice;

	})
	.catch(error => console.log('error', error));
}

function pad_with_zeroes(number, length) {

    var my_string = '' + number;
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }

    return my_string;

}

function backToHome(){
    window.location.href = "./index.html"
}