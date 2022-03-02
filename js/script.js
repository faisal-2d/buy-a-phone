const searchPhone = async () => {  
    
    spinner('block', 'none');

    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    
    if(searchInput.value == ''){
        spinner('none', 'none');
        return myAlert('block');
    }
    searchInput.value = '';    

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    const res = await fetch(url);
    const data = await res.json();

    getResult(data);
}

const getResult = phones => {

    const displayResult = document.getElementById('display-results');
   displayResult.textContent = '';
    
    const phoneList = phones.data;
    if(phoneList.length == 0){
        spinner('none', 'none');
        return myAlert('block');
    }
    const phoneListSliced = phoneList.slice(0,20);

    phoneListSliced.forEach(phone => {
    const div = document.createElement('div');
       div.classList.add('col');
       div.innerHTML = `            
              <div class="card h-100 text-center p-3 shadow">
                <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <h6 class="card-title">${phone.brand}</h6>                  
                </div>
                <div>
                <button onclick="getDetails('${phone.slug}')" class="btn btn-warning" type="button">Details</button>
                </div>
              </div>                
       `;
       displayResult.appendChild(div);
       spinner('none', 'block');

    // console.log(phone);
    });    
}

const getDetails = async phoneId => {
    const displayDetails = document.getElementById('display-details');
    displayDetails.textContent = ''; 
    
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    const res = await fetch(url);
    const data = await res.json();

    

    const phoneDetails = data.data;
    const others = phoneDetails.others;
    const featureKeys = Object.keys(others);
 
    const otherFeatures = document.createElement('div');  
    featureKeys.forEach( i => { 
        const p =document.createElement('p');        
        p.innerHTML =`
          <strong> ${i} </strong> :  ${others[i]}, 
          `;
         otherFeatures.appendChild(p)
    } )   
    const otherFeature = otherFeatures.innerHTML; 
    

    const sensorArray = phoneDetails.mainFeatures.sensors;
 
    // const sensors = (phoneDetails.mainFeatures.sensors).toString();
    const otherSensors = document.createElement('div');  
    sensorArray.forEach( sensor => { 
        const span =document.createElement('span');        
        span.innerHTML =`
          <strong> ${sensor} </strong>,  `;
          otherSensors.appendChild(span)
    } )   
    const sensors = otherSensors.innerHTML;   
    
    

    const div = document.createElement('div');
       div.innerHTML = `
       <div class="row row-cols-1 row-cols-md-2 g-4 align-items-center">
            <div class="col">
                <div class="text-center">
                <img src="${phoneDetails.image}" class="card-img-top w-50 mx-auto" alt="...">
                </div>
            </div>
            <div class="col">
                <div>
                    <h3>${phoneDetails.name}</h3>
                    <p class="text-secondary">${phoneDetails.releaseDate ? phoneDetails.releaseDate : 'Not Released Yet'}</p>
                 </div>                                        
                 <div class="col">
                    <h5 class="text-primary">Chipset : </h5> <p>${phoneDetails.mainFeatures.chipset ? phoneDetails.mainFeatures.chipset : 'Unknown'}</p>
                    <h5 class="text-primary">Memory : </h5> <p>${phoneDetails.mainFeatures.memory}</p>
                    <h5 class="text-primary">Storage : </h5> <p>${phoneDetails.mainFeatures.storage}</p>
                    <h5 class="text-primary">Display Size : </h5> <p>${phoneDetails.mainFeatures.displaySize}</p>
                </div>                       
            </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2 g-4 my-3">
                   <div class="col feature">
                        <h5 class="text-primary">Other Features :</h5> 
                        <ul> ${otherFeature} </ul>  
                   </div>
                   <div class="col">
                   <h5 class="text-primary">Sensors : </h5> 
                   <p>${sensors}</p>
                   </div>
        </div>       `;

    displayDetails.appendChild(div);    
    // console.log(phoneDetails);
}


const myAlert = (alertStyle) => {
    document.getElementById('alert').style.display = alertStyle;
}

const spinner = (spinnerDisplayStyle, contentDisplayStyle) => {
    document.getElementById('spinner').style.display = spinnerDisplayStyle;   
    document.getElementById('result-div').style.display = contentDisplayStyle;   
}
