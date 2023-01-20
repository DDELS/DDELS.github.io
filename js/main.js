
function hideDivDisplay(id){
    let targetDiv = document.getElementById(id);
    //console.log(targetDiv.style.display);
    if(targetDiv.style.display == "" || targetDiv.style.display == "none" ){
        targetDiv.style.display = "block";
    }else {
        targetDiv.style.display= "none";
    }
    
}

function getLocation(){
    const location = document.getElementById("locationContent");
    console.log(location);
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showLocation);
        console.log(navigator.geolocation.getCurrentPosition(showLocation));
    }else{
        location.innerHTML = "Geolocation is not supported by this browser.";
    }
    //console.log(location);
}

function showLocation(position){
    location.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude; 
}









