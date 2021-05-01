$(function() {

    var owner = $('#owner');
    var cardNumber = $('#cardNumber');
    var cardNumberField = $('#card-number-field');
    var CVV = $("#cvv");
    var mastercard = $("#mastercard");
    var confirmButton = $('#confirm-purchase');
	var cancelButton = $('#cancel-purchase');
    var visa = $("#visa");
    var amex = $("#amex");

    // the payment fields.

    cardNumber.payform('formatCardNumber');
    CVV.payform('formatCardCVC');


    cardNumber.keyup(function() {

        amex.removeClass('transparent');
        visa.removeClass('transparent');
        mastercard.removeClass('transparent');

        if ($.payform.validateCardNumber(cardNumber.val()) == false) {
            cardNumberField.addClass('has-error');
        } else {
            cardNumberField.removeClass('has-error');
            cardNumberField.addClass('has-success');
        }

        if ($.payform.parseCardType(cardNumber.val()) == 'visa') {
            mastercard.addClass('transparent');
            amex.addClass('transparent');
        } else if ($.payform.parseCardType(cardNumber.val()) == 'amex') {
            mastercard.addClass('transparent');
            visa.addClass('transparent');
        } else if ($.payform.parseCardType(cardNumber.val()) == 'mastercard') {
            amex.addClass('transparent');
            visa.addClass('transparent');
        }
    });

    confirmButton.click(function(e) {

        e.preventDefault();

        var isCardValid = $.payform.validateCardNumber(cardNumber.val());
        var isCvvValid = $.payform.validateCardCVC(CVV.val());

        if(owner.val().length < 4){
            alert("Wrong card name");
        } else if (!isCardValid) {
            alert("Wrong card number");
        } else if (!isCvvValid) {
            alert("Wrong CVV");
        } else {
            var getUserID = sessionStorage.getItem("userID");
            var getPromotionID = sessionStorage.getItem("promotionID");
            var getPromotionPrice = sessionStorage.getItem("promotionPrice");
            var getPromotionCredit = sessionStorage.getItem("promotionCredit");
            let reg = /.{1,15}/;
            var hiddenCardNumber = cardNumber.val().replace(reg, (m) => "X".repeat(m.length));
            var cardName= owner.val();

            //Today's Date
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;
            
            // Insert into Transaction table
            insertTransaction(getUserID,getPromotionID,getPromotionPrice,cardName,hiddenCardNumber,today);
            // update User Table
            updateUser(getUserID,getPromotionCredit);

        }
    });
	
	cancelButton.click(function(e) {
		e.preventDefault();
        window.location.href = "./index.html";
    });
});



function insertTransaction(userID,promotionID,amountPaid,cName,cCard,todayDate) {
    var myHeaders = new Headers(); 
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify({"query":"INSERT INTO `laundrotech`.`Transaction` (`FK_userID`, `FK_promotionID`, `amountPaid`, `date`, `cName`, `cCard`) VALUES ('" + userID + "', '"+ promotionID +"', '"+ amountPaid +"', '"+ todayDate +"', '"+ cName +"', '"+ cCard +"');"});
	console.log(raw);
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
	    body: raw,
		redirect: 'follow'
		};

	var str = "";
	fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/transaction", requestOptions)
	.then(response => response.text())
	.then(result => {
        var data = JSON.parse(result);
	})
	.catch(error => console.log('error', error));
}

function updateUser(userID,credit) {
    var myHeaders = new Headers(); 
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify({"query":"UPDATE `laundrotech`.`User` SET `credit`= credit + "+ credit +" WHERE `userID`='"+ userID +"';"});
	console.log(raw);
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
	    body: raw,
		redirect: 'follow'
		};

	var str = "";
	fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/getuser", requestOptions)
	.then(response => response.text())
	.then(result => {
        var data = JSON.parse(result);
        window.location.href = "./transactionInvoice.html";
	})
	.catch(error => console.log('error', error));
}


function displayAmount(){
    var getPromotionPrice = sessionStorage.getItem("promotionPrice");
    document.getElementById("paymentAmount").innerHTML = "Total Amount: $" + getPromotionPrice;
}