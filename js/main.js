//David Delgado
const temp =[];

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

async function getFile(url){
    let file = await fetch(url);
    let fileText = await file.text();
    let data = JSON.parse(fileText);
    // data[0] = data.localityInfo.administrative[0].name;
    // data[1] = data.localityInfo.administrative[1].name;
    // data[2] = data.localityInfo.administrative[2].name;
    //console.log(data);
    //console.log(data.localityInfo.administrative[0].name);
    //console.log(data.localityInfo.administrative[1].name);
    //console.log(data.localityInfo.administrative[2].name);
   // location.innerHTML += "<br>Country: " + data.localityInfo.administrative[0].name + "<br>State: " + data.localityInfo.administrative[1].name + "<br>City/County: " + data.localityInfo.administrative[2].name; 
    temp[0] = data.localityInfo.administrative[0].name;
    temp[1] = data.localityInfo.administrative[1].name;
    temp[2] = data.localityInfo.administrative[2].name;
    //location.innerHTML += "<br>Country: " + temp[0] + "<br>State: " + temp[1] + "<br>City/County: " + temp[2]; 
    return data ;
}

function success(pos) {
    let location = document.getElementById("locationContent");
    const crd = pos.coords;
    let latitude = crd.latitude;
    let longitude = crd.longitude;
    let accuracy = crd.accuracy;
    
    // console.log('Your current position is:');
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);

    location.innerHTML = "Latitude : " + latitude + " Longitude: " + longitude + "<br> Accuracy: " + accuracy + " meter(s)";
    var dataUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" +latitude+"&longitude="+longitude+"&localityLanguage=en";
   
    //getFile(dataUrl);
    var Promise = getFile(dataUrl);
    Promise.then(function (val){
        console.log(val); 
    });
    console.log("data...");
    //console.log(getFile(dataUrl));
    

    
   

}


  
function getLocation(){ 
    if(success){
        navigator.geolocation.getCurrentPosition(success, error, options); 
        
    }else{
        error(err);
    }
        
    
       
   

}












