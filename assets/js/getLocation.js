function getLocation() {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"query": "SELECT distinct location FROM laundrotech.WashingMachine;"});
    console.log(raw);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    var str = "";
    fetch("https://3rczj928aa.execute-api.us-east-1.amazonaws.com/prod/getlocation", requestOptions)
        .then(response => response.text())
        .then(result => {
            var data = JSON.parse(result);
            // console.log("before if" + data.length);
            if (data[0] == null) {
                console.log("null")
            } else {
                console.log("else");
                for (var i = 0; i < data.length; i++) {
                    count = i + 1;
                    str += "<article class='style" + count + "'>" + "<span class='image'>" + "<img src='images/pic" + count + ".jpg'/> </span>" + "<a id='"+data[i].location+"' href='booking.html' onclick='Location(this.id)'>" + "<h2>" + data[i].location + "</h2>" + "</a></article>"     ;
                        // str += "<article class='style" + count + "'>" + "<span class='image'>" + "<img src='images/pic" + count + ".jpg'/> </span>" + "<a href='booking.html' onclick='Location("+data[i].location+")'>" + "<h2 id='location' name='location'>" + data[i].location + "</h2>" + "</a></article>"
                }
                document.getElementById("locationTile").innerHTML = str;
            }
        })
        .catch(error => console.log('error', error));
}

function Location(location) {
    var locationID = location;
    sessionStorage.setItem("location", locationID);
}