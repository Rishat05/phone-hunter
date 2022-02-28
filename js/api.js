const searchPhone = () => {
    const inputValue = document.getElementById('input-value').value;
    //console.log(inputValue);
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
        .then(response => response.json())
        .then(data => console.log(data))

    document.getElementById('input-value').value = '';
}