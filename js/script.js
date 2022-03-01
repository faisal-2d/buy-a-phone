const searchPhone = async () => {  
    
    mySpinner('block');

    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    
    if(searchInput.value == ''){
        mySpinner('none');
        return alert();
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
        mySpinner('none');
        return alert();
    }
    const phoneListSliced = phoneList.slice(0,20);

    phoneListSliced.forEach(phone => {
    const div = document.createElement('div');
       div.classList.add('col');
       div.innerHTML = `            
              <div class="card h-100 text-center p-3 border border-info">
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
       mySpinner('none');

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
    const div = document.createElement('div');
       div.innerHTML = `
       <div class="row row-cols-1 row-cols-md-2 g-4">
            <div class="col">
                <div class="text-center">
                <img src="${phoneDetails.image}" class="card-img-top w-50 mx-auto" alt="...">
                </div>
            </div>
            <div class="col">
                    <div>
                    <h3>${phoneDetails.name}</h3>
                    <p class="text-secondary">${phoneDetails.releaseDate}</p>
                    </div>
                    <div>                    
                    <h5 class="text-primary">Memory : </h5> <p>${phoneDetails.mainFeatures.memory}</p>
                    <h5 class="text-primary">Storage : </h5> <p>${phoneDetails.mainFeatures.storage}</p>
                    </div>
            </div>
        </div>


       `;
    displayDetails.appendChild(div);
    console.log(phoneDetails);
}

const alert = () => {
    document.getElementById('alert').style.display = 'block';
}

const mySpinner = action => {
    const spin = document.getElementById('spinner');
    if(action == 'block'){
        spin.style.display = 'block';
    }
    
    else if (action == 'none'){
        spin.style.display = 'none';
    }
    
}