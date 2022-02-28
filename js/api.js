const searchPhone = () => {
    const inputValue = document.getElementById('input-value').value;
    //console.log(inputValue);
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
        .then(response => response.json())
        .then(data => cardDisplay(data))

    document.getElementById('input-value').value = '';

}

const cardDisplay = (cards) => {
    if (!cards.status) {
        document.getElementById('phone-not-found').innerText = 'No phone found';

    }
    else {
        cards = cards.data;
        console.log(cards);
    }

}