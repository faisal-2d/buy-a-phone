const searchPhone = async () => {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
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
    phoneList.forEach(phone => {

    const div = document.createElement('div');
       div.classList.add('col');
       div.innerHTML = `
            <div class="col">
              <div class="card h-100 text-center p-3 border border-info">
                <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <h6 class="card-title">${phone.brand}</h6>                  
                </div>
                <div>
                <button class="btn btn-warning" type="button">Details</button>
                </div>
              </div>
            </div>    
       `;
       displayResult.appendChild(div);

    console.log(phone);
    });    
}

document.getElementById('spinner').style.display = 'none';

// spinner(0);

// const spinner = action => {
//     const spin = document.getElementById('spinner');
//     if(action == 1){
//         spin.style.display = 'block';
//     }
    
//     else if (action == 0){
//         spin.style.display = 'none';
//     }
    
// }