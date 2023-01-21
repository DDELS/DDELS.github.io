//David Delgado

function hideDivDisplay(id){
    let targetDiv = document.getElementById(id);
    //console.log(targetDiv.style.display);
    if(targetDiv.style.display == "" || targetDiv.style.display == "none" ){
        targetDiv.style.display = "block";
    }else {
        targetDiv.style.display= "none";
    }
    
}


const options = {
    enableHighAccuracy: true,
};

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

function getLocation(){ 
    navigator.geolocation.getCurrentPosition(success, error, options);
}

async function success(pos) {
    let location = document.getElementById("locationText");
    const crd = pos.coords;
    let latitude = crd.latitude;
    let longitude = crd.longitude;
    let accuracy = crd.accuracy;
    var dataUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" +latitude+"&longitude="+longitude+"&localityLanguage=en";

    location.innerHTML = "<b>Latitude/Longitude: </b>" + latitude + " / " + longitude + "<br> <b>Accuracy: </b>" + accuracy + " meter(s)";    
    
    let getJSON = new Promise(function(myResolve, myReject){
        let req = new XMLHttpRequest();
        req.open('GET',dataUrl);
        req.onload = function(){
            let temp = JSON.parse(req.response);
            //console.log(temp);
            if(req.status == 200){
                myResolve(temp);
            }else{
                myReject(error(err));
            }
        };
        req.send();
    });

    getJSON.then(
       function(value){
        displayLocation(value);
       }, 
       function(error){
        displayLocation(error);
       }
    )
    

}
  
function displayLocation(data){
    let location = document.getElementById("locationText");
    console.log(data);
    
    location.innerHTML += "<br><b>Country:</b> "+ data.countryName +" (" + data.countryCode + ")" + "<br><b>State:</b> " + data.principalSubdivision + "<br><b>City: </b>"+ data.city + "<br><b>County: </b>" + data.locality + "<br><b>Zip-Code: </b>" + data.postcode + "</br>";
}
















