const prodContainer = document.querySelector('#prodContainer');
const notification = document.querySelector('#notification');

function addFunction(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].addEventListener('click', (e) => addToCart(e));
    }
}

function addToCart(e) {
    let elem = e.target.parentNode.parentNode;
    let target = e.target.parentNode.parentNode.id;
    let url = `http://localhost:8003/cart/add?id=${target}`;
    fetch(url, { method: 'POST' })
        .then(res => res.json())
        .then(data => console.log(data.message))
        .catch(err => console.error(err));
    elem.classList.add('checked');
}

const getButtons = () => {
    let arr = document.getElementsByClassName('addBtn');
    addFunction(arr, itemCount)
}

const markHtmlElem = ids => {
    let elemArr = document.querySelectorAll('.product');
    for (let i = 0; i < ids.length; i++) {
        for (let j = 0; j < elemArr.length; j++) {
            if (ids[i] === elemArr[j].id) {
                elemArr[j].classList.add('checked');
            }
        }
    }
}

const consoleFunc = (cartArr, prodArr) => {
    let ids = [];
    for (let i = 0; i < cartArr.length; i++) {
        for (let j = 0; j < prodArr.length; j++) {
            if (cartArr[i].id === prodArr[j].id) {
                ids.push(cartArr[i].id);
            }
        }
    }
    markHtmlElem(ids);
}

const checkFunc = data => {
    let url = 'http://localhost:8003/cart/getAll';
    fetch(url, { method: 'GET' })
        .then(res => res.json())
        .then(cartData => consoleFunc(cartData, data))
        .catch(err => console.error(err))
}

const createHmtlElement = data => {
    data.map(prod => {
        let prodDiv = document.createElement('div');
        prodDiv.setAttribute('class', 'product');
        prodDiv.setAttribute('id', prod.id);
        let prodImg = document.createElement('img');
        prodImg.setAttribute('src', prod.image);
        prodImg.setAttribute('class', 'prodImg');
        prodDiv.appendChild(prodImg);
        let article = document.createElement('article');
        let prodName = document.createElement('p');
        prodName.setAttribute('class', 'prodName');
        prodName.innerText = prod.product;
        let prodPrice = document.createElement('p');
        prodPrice.setAttribute('class', 'prodPrice');
        prodPrice.innerText = `${prod.price} kr.`;
        let addBtn = document.createElement('button');
        addBtn.setAttribute('class', 'addBtn');
        addBtn.innerText = 'ADD';
        article.appendChild(addBtn);
        article.appendChild(prodName);
        article.appendChild(prodPrice);
        prodDiv.appendChild(article);
        prodContainer.appendChild(prodDiv);
    });

    getButtons();
    checkFunc(data);
}

const getProductList = () => {
    let url = 'http://localhost:8003/products/getAll'
    fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(data => createHmtlElement(data))
        .catch(err => console.error('Error: ' + err));
}

getProductList();

function countFunc(data) {
    let num = 0;
    data.map(elem => {
        num += 1;
    })
    console.log(num)
    notification.innerText = num;
}

function itemCount() {
    let url = 'http://localhost:8003/cart/getAll'
    fetch(url, { method: 'GET' })
        .then(res => res.json())
        .then(data => countFunc(data))
        .catch(err => console.error(err))
}
itemCount()