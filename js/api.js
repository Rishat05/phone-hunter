
const main = document.getElementById('main');
const detailShow = document.getElementById('detail-show');

// spinner show 
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

const searchPhone = () => {
    document.getElementById('main').innerHTML = '';
    document.getElementById('detail-show').innerHTML = '';
    const inputValue = document.getElementById('input-value').value;
    // spinner display 
    toggleSpinner('block');

    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
        .then(response => response.json())
        .then(data => cardDisplay(data))

    document.getElementById('input-value').value = '';

}

const cardDisplay = (cards) => {
    if (!cards.status) {
        document.getElementById('phone-not-found').innerText = 'No phone found';
        toggleSpinner('none');
    }
    else {
        document.getElementById('phone-not-found').innerText = '';
        cards = cards.data;
        // handle at-most 20 data or phone
        if (cards.length > 20) {
            cards = cards.slice(0, 20);
        }

        for (const card of cards) {
            const div = document.createElement('div');
            div.classList.add("col-lg-4");
            div.classList.add('mb-5');
            div.innerHTML = `
            <div class="card">
            <img src="${card.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Name : ${card.phone_name}</h5>
                <h6 class="card-text"><span>Brand :</span> ${card.brand}</h6>
                <button onclick="cardDetail('${card.slug}')"  class="btn btn-primary">Details</button>
               
            </div>
        </div>
        `;
            main.appendChild(div);
        }
        toggleSpinner('none');
    }
}

const cardDetail = (id) => {

    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(response => response.json())
        .then(data => setDetails(data))
    window.scrollTo(0, 0);
}

const setDetails = (phone) => {

    document.getElementById('detail-show').innerHTML = '';
    phone = phone.data;
    //console.log(phone);
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `      
        <div class="w-50 mx-auto">
           <img src="${phone.image}" class="card-img-top" alt="...">
        </div>
        <div class="card-body">
            <h5 class="card-title">Name : ${phone.name}</h5>
            <br>
            <h6 class="card-text"><span>Release-Date :</span> ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</h6>
            <br>
            <h6 class="card-text"><span>ChipSet :</span> ${phone.mainFeatures.chipSet}</h6>
            <h6 class="card-text"><span>Display-Size :</span> ${phone.mainFeatures.displaySize}</h6>
            <h6 class="card-text"><span>Memory :</span> ${phone.mainFeatures.memory}</h6>
            <h6 class="card-text"><span>Storage :</span> ${phone.mainFeatures.storage}</h6>
            <br>
            <h6 class="card-text"><span>Sensors :</span> ${phone.mainFeatures.sensors.join()}</h6>
            <br>
            <h6 class="card-text"><span>Others :</span>
            ${phone.others ? `<h6 class="card-text"><span>WLAN :</span> ${phone.others.WLAN} </h6>
                              <h6 class="card-text"><span>Blutooth :</span> ${phone.others.Bluetooth} </h6>
                              <h6 class="card-text"><span>GPS :</span> ${phone.others.GPS} </h6> 
                              <h6 class="card-text"><span>NFC :</span> ${phone.others.NFC} </h6> 
                              <h6 class="card-text"><span>Radio :</span> ${phone.others.Radio} </h6>
                        <h6 class="card-text"><span>USB :</span> ${phone.others.USB} </h6> ` : "Others not avialable"}</h6>
        </div>
       
        `;

    detailShow.appendChild(div);
}




