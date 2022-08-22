let object = JSON.parse(localStorage.getItem("AllItems"));
console.log(object.length);

var totalPrice = 0;
var totalQuantity = 0;

for (let i = 0; i < object.length; i++) {
    let section = document.getElementById('cart__items');
    let article = document.createElement('article');
    article.classList.add('cart__item');
    article.setAttribute('data-id', object[i].id);
    article.setAttribute('data-color', object[i].color);
    section.appendChild(article);
    cartDisplay(object[i].id, object[i].color, object[i].quantity, article);
}

async function cartDisplay(id, color, quantity, article) {
    let data = [];
    try {
        data = await getItem(id);
    }
    catch (e) {
        console.log('Erreur')
    }
    console.log(data);
    let div1 = document.createElement('div');
    div1.classList.add('cart__item__img');
    article.appendChild(div1);
    let img = document.createElement("img");
    img.setAttribute('src', data['imageUrl']);
    img.setAttribute('alt',data['altTxt']);
    div1.appendChild(img);
    let div2 = document.createElement('div');
    div2.classList.add('cart__item__content');
    article.appendChild(div2);
    let div3 = document.createElement('div');
    div3.classList.add('cart__item__content__description');
    div2.appendChild(div3);
    let h2 = document.createElement('h2');
    h2.textContent = data['name'];
    div3.appendChild(h2);
    let p1 = document.createElement('p');
    p1.textContent = color;
    div3.appendChild(p1);
    let p2 = document.createElement('p');
    let price = data['price']+" €";
    p2.textContent = price;
    div3.appendChild(p2);
    let div4 = document.createElement('div');
    div4.classList.add('cart__item__content__settings');
    div2.appendChild(div4);
    let div5 = document.createElement('div');
    div5.classList.add('cart__item__content__settings__quantity');
    div4.appendChild(div5);
    let p3 = document.createElement('p');
    p3.textContent = 'Qté : ';
    div5.appendChild(p3);
    let input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.classList.add('itemQuantity');
    input.setAttribute('name', 'itemQuantity');
    input.setAttribute('min', '1');
    input.setAttribute('max', '100');
    input.setAttribute('value', quantity);
    div4.appendChild(input);
    let div6 = document.createElement('div');
    div6.classList.add('cart__item__content__settings__delete');
    div4.appendChild(div6);
    let p4 = document.createElement('p');
    p4.classList.add('deleteItem');
    p4.textContent = 'Supprimer';
    div6.appendChild(p4);
    totalQuantity += Number(quantity); 
    document.getElementById("totalQuantity").textContent = totalQuantity;
    totalPrice += Number(quantity)*Number(data['price']);
    document.getElementById("totalPrice").textContent = totalPrice;
}

async function getItem(id) {
    const itemPromise = await fetch("http://localhost:3000/api/products/"+id);
    const response = await itemPromise.json();
    console.log(response);
    return response;
}




        