const arrow = document.getElementById('img_a');
const cart = document.getElementById('img_c');
const addSkateboardBtn = document.getElementById('skateboard_btn');
const addWheelsBtn = document.getElementById('wheels_btn');
const addHelmetBtn = document.getElementById('helmet_btn');
const addKneepadsBtn = document.getElementById('kneepads_btn');
const displayProducts = document.getElementById('product_output');
const baseURL = 'http://localhost:8003/api/cart';

const data = {
  name: name
};
fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(text => console.log(text));