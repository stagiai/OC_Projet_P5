var object = JSON.parse(window.localStorage.getItem("AllItems"));
console.log(object.length);

var totalPrice = 0;
var totalQuantity = 0;
var section = document.getElementById('cart__items');
cartDisplay(object);

let trash = document.getElementsByClassName("deleteItem");
console.log(trash);
trash.forEach((element) => {element.addEventListener('click',() =>{
    el = element.closest('cart__item');
    let removeItemId = el.getAttribute('data-Id');
    let removeItemColor = el.getAttribute('data-color');
    removeItem(removeItemId, removeItemColor)
})});


function removeItem (id, color) {
    let array = [];
    let localStorageItems = JSON.parse(window.localStorage.getItem("AllItems"));;
    for (let i =0; i < localStorageItems.length; i++) {
        if (localStorageItems[i].id == id && localStorageItems[i].color == color) {
            if (i == 0) {
                array = localStorageItems.shift();
            }
            else {
            array = localStorageItems.splice(i-1, 1);
            }
        }
    }
    localStorage.setItem('AllItems', JSON.stringify(array));
    console.log(object.length);
    cartDisplay(array);
}


let inputs = section.getElementsByClassName('itemQuantity');
console.log(inputs);



const reg = /\d/;
let firstName = document.getElementById('firstName');
firstName.addEventListener('change', () => {
    alert(firstName.value);
    console.log(firstName.value);
    console.log(firstName.value.search(reg));
    if (firstName.value.search(reg) > -1) {
        document.querySelector('#firstNameErrorMsg').innerHTML = "Le prénom ne doit pas contenir de chiffres";
    }
    else {
        document.querySelector('#firstNameErrorMsg').innerHTML = "";
    };
});

let lastName = document.getElementById('lastName');
lastName.addEventListener('change', () => {
    alert(lastName.value);
    console.log(lastName.value.search(reg));
    if (lastName.value.search(reg) > -1) {
        document.querySelector('#lastNameErrorMsg').innerHTML = "Le nom ne doit pas contenir de chiffres";
    }
    else {
        document.querySelector('#lastNameErrorMsg').innerHTML = "";
    };
});

let email = document.getElementById('email');
email.addEventListener('change', () => {
    alert(email.value);
    if (email.value.indexOf('@') == -1) {
        document.getElementById('emailErrorMsg').innerHTML = "Veuillez renter un email correct";
    }});

let order = document.getElementById('order');
order.addEventListener('click', ()=>{
    var object = JSON.parse(window.localStorage.getItem("AllItems"));
    let productsId = [];
    for (let i = 0; i < object.length; i++) {
        productsId.push(object[i].id);
        alert(productsId[i]);
    };
    console.log(productsId.length);
    send(productsId);

});

function send(productsId){
    fetch("http://localhost:3000/api/products",{
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            clientFirstName : document.getElementById('firstName').value,
            products : productsId
        })
    })
        .then(function(res) {
            if (res.ok) {
            return res.json();}
            else {console.log('error')}})
        .then(data => {console.log(data)})
        .catch(err => {console.log('error')})
};




async function cartDisplay (array) {
    if (object.length > 0) {
        for (let i = 0; i < array.length; i++) {
            await itemDisplay(array[i].id, array[i].color, array[i].quantity, section);
        }
    }
}

async function itemDisplay(id, color, quantity, section) {
    let data = [];
    try {
        data = await getItem(id);
    }
    catch (e) {
        console.log('Erreur')
    }
    console.log(data);
    let article = document.createElement('article');
    article.classList.add('cart__item');
    article.setAttribute('data-id', id);
    article.setAttribute('data-color', color);
    section.appendChild(article);
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




        