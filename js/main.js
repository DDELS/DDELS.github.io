//David Delgado
let temp =[];

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




// async function getFile(url){
//     const file = await fetch(url)
//      //await fetch(url).then((response) => response.json()).then((data) => temp = data );
        
//     let fileText = await file.text();
//     let data = JSON.parse(fileText);

//     //localStorage.setItem("locationData", data);

//     // data[0] = data.localityInfo.administrative[0].name;
//     // data[1] = data.localityInfo.administrative[1].name;
//     // data[2] = data.localityInfo.administrative[2].name;
//     //console.log(data);
//     //console.log(data.localityInfo.administrative[0].name);
//     //console.log(data.localityInfo.administrative[1].name);
//     //console.log(data.localityInfo.administrative[2].name);
//    // location.innerHTML += "<br>Country: " + data.localityInfo.administrative[0].name + "<br>State: " + data.localityInfo.administrative[1].name + "<br>City/County: " + data.localityInfo.administrative[2].name; 
//     // temp[0] = data.localityInfo.administrative[0].name;
//     // temp[1] = data.localityInfo.administrative[1].name;
//     // temp[2] = data.localityInfo.administrative[2].name;
    

//     ///console.log(temp);
//     //location.innerHTML += "<br>Country: " + data.localityInfo.administrative[0].name + "<br>State: " + data.localityInfo.administrative[1].name + "<br>City/County: " + data.localityInfo.administrative[2].name;
//     console.log("Done...")
    
//     return data;
    
// }

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
    
    // getFile(dataUrl).then(
    //     function(value){
    //           //location.innerHTML += "<br>Country: " + temp + "<br>State: " + temp.principalSubdivision + "<br>City/County: " + temp.locality; 
    //         displayLocation(value);
    //     }
    // )
    //temp = localStorage.getItem("locationData");
   // location.innerHTML += "<br>Country: " + temp + "<br>State: " + temp.principalSubdivision + "<br>City/County: " + temp.locality; 

    
    
    
    // getFile(dataUrl);
    // Promise.then(function (val){
    //     console.log(val); 
    // });
    // console.log("data...");
    //console.log(temp);
    
    //console.log(getFile(dataUrl));
    
    // getFile(dataUrl) = new Promise(function(myResolve, myReject){
    //     if(success){
    //         myResolve(); 
            
    //         //console.log(temp);
    //     }else{
    //         myReject(error(err));
    //     }
    // });
    
    // getFile(dataUrl).then(
    //     function(value){displayLocation(value);},
    //     function(error){displayLocation(error);}
    // );

    let myPromise = new Promise(function(myResolve, myReject){
        let req = new XMLHttpRequest();
        req.open('GET',dataUrl);
        req.onload = function(){
            let temp = JSON.parse(req.response);
            //console.log(temp.continent);
            if(req.status == 200){
                myResolve(temp);
            }else{
                myReject(error(err));
            }
        };
        req.send();
    });

    myPromise.then(
       function(value){
        
        displayLocation(value);
       }, 
       function(error){
        displayLocation(error);
       }
    )
    







    
   

}



  
function getLocation(){ 
    
    // var myPromise = new Promise(function(myResolve, myReject){
    //     if(success){
    //         myResolve(getFile(dataUrl) ); 
            
    //         //console.log(temp);
    //     }else{
    //         myReject(error(err));
    //     }
    // });
    
    // myPromise.then(
    //     function(value){displayLocation(value);},
    //     function(error){displayLocation(error);}
    // );
    
    navigator.geolocation.getCurrentPosition(success, error, options);
    
    
    // if(success){
    //     navigator.geolocation.getCurrentPosition(success, error, options); 
        
    //     //console.log(temp);
    // }else{
    //     error(err);
    // }
        
    
       
   

}

function displayLocation(data){
    //navigator.geolocation.getCurrentPosition(success, error, options);
    let location = document.getElementById("locationContent");
    //console.log(data);
    location.innerHTML += "<br>Country: "+ data.countryCode + "<br>State: " + data.principalSubdivision + "<br>City/County: " + data.locality;
}
















