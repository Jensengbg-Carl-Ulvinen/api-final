const cartProdContainer = document.querySelector('.cart');
const sum = document.querySelector('#sum');

function getTarget(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].addEventListener('click', e => addFunc(e));
    }
}

function addFunc(e) {
    let target = e.target.parentNode.id;
    let url = `http://localhost:8003/cart/delete?id=${target}`;
    fetch(url, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))

    location.reload();
}

const getSum = data => {
    let result = 0;
    data.map(prod => {
        result += parseInt(prod.price);
    })
    sum.innerText = `${result} kr.`;
}

const createHmtlElement = data => {
    data.map(prod => {
        let prodDiv = document.createElement('div');
        prodDiv.setAttribute('class', 'cartProd');
        prodDiv.setAttribute('id', prod.id);
        let prodImg = document.createElement('img');
        prodImg.setAttribute('src', prod.image);
        prodImg.setAttribute('class', 'cartImg');
        prodDiv.appendChild(prodImg);
        let article = document.createElement('article');
        let prodName = document.createElement('p');
        prodName.setAttribute('class', 'prodName');
        prodName.innerText = prod.product;
        let prodPrice = document.createElement('p');
        prodPrice.setAttribute('class', 'prodPrice');
        prodPrice.innerText = `${prod.price} kr.`;
        let deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('class', 'deleteBtn');
        deleteBtn.innerText = 'delete';
        article.appendChild(prodName);
        article.appendChild(prodPrice);
        prodDiv.appendChild(article);
        prodDiv.appendChild(deleteBtn);
        cartProdContainer.appendChild(prodDiv);
    });

    getSum(data);
    let btnArray = document.getElementsByClassName('deleteBtn');
    getTarget(btnArray);
}

const getCartProducts = () => {
    let url = 'http://localhost:8003/cart/getAll';
    fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(data => createHmtlElement(data))
        .catch(err => console.error('Error: ' + err));
}

getCartProducts();