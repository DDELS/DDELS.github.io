//David Delgado

function hideDivDisplay(id){
    let targetDiv = document.getElementById(id);
    //console.log(targetDiv.style.display);
    if(targetDiv.style.display == "" || targetDiv.style.display == "block"  ){
        targetDiv.style.display = "none";
    }else {
        targetDiv.style.display= "block";
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
    

    location.innerHTML = "<br><b>Latitude/Longitude: </b>" + latitude + " / " + longitude + "<br><b>Accuracy: </b>" + accuracy + " meter(s)<br>";    
    
    let getLocationJSON =  new Promise(function(myResolve, myReject){
        let locReq = new XMLHttpRequest(); 
        locReq.open('GET',dataUrl); //Getting lat & long
        locReq.onload = function(){
            let temp = JSON.parse(locReq.response);
            //console.log(temp);
            if(locReq.status == 200){
                myResolve(temp);
            }else{
                myReject(error(err));
            }
        };
        locReq.send();
    });

    
    

    getLocationJSON.then(
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
    const apiKey = "b790f47e51eb5d8765e95e8aa4cc1d2f";
    console.log("data...");
    console.log(data);
    
    location.innerHTML += "<b>Country:</b> "+ data.localityInfo.administrative[0].name +" (" + data.localityInfo.administrative[0].isoCode + ")" + "<br><b>State:</b> " + data.localityInfo.administrative[1].name + "<br><b>City: </b>"+ data.localityInfo.administrative[2].name + "<br><b>County: </b>" + data.localityInfo.administrative[3].name + "<br><b>Zip-Code: </b>" + data.postcode + "</br></div>"; 
    
    //Weather Widget
    let locationId = data.localityInfo.administrative[2].geonameId;
    window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
    window.myWidgetParam.push({id: 22,cityid: locationId ,appid: apiKey ,units: 'imperial',containerid: 'openweathermap-widget-21',  });
    (function() {var script = document.createElement('script');
    script.async = true;
    script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);
    })();

}

function displayWeather(data){
    let weatherDiv = document.getElementById("weatherInfo");
    console.log("Weather...");
    console.log(data);

}

function tempConverterF2C(val){
    val = parseFloat(val);
    document.getElementById("inputCelsius").value = (val - 32) / 1.8;
    document.getElementById("inputKelvin").value = ((val - 32) / 1.8) + 273.15;


}

function tempConverterC2F(val){
    val = parseFloat(val);
    document.getElementById("inputFahrenheit").value =(val * 1.8) + 32;
    document.getElementById("inputKelvin").value = val + 273.15;
}

function tempConverterK2F(val){
    val = parseFloat(val);
    document.getElementById("inputFahrenheit").value = ((val - 273.15) * 1.8) + 32;
    document.getElementById("inputCelsius").value = val - 273.15;

}
















