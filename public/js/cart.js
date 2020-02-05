
const cart = document.getElementById('img_c');
const getCart = () => {
    fetch('http://localhost:8003/api/cart', {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
    })
}
getCart();

