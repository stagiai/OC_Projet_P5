//------------------ Affichage du panier ----------------------------------------
cartDisplay();
cartTotalPriceAndQuantity();

async function cartDisplay () {
    var array = await getItemsFromLocalStorage()
    console.log(array.length);
    var section = document.getElementById('cart__items');
    if (array.length > 0) {
        for (let i = 0; i < array.length; i++) {
            itemDisplay(array[i].id, array[i].color, array[i].quantity, section);
        }
    }
}

async function itemDisplay(id, color, quantity, section) {
    let data = [];
    try {
        data = await getItemFromAPI(id);
    }
    catch (err) {
        console.log(err)
    }
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

// -------------- prise en compte des modifications de quantités à la page panier ------------------------
    input.addEventListener('change',() =>{
        if (input.value > 100) {
            input.value = 100;
        }
        el = input.closest("article");
        console.log(el);
        let removeItemId = el.getAttribute('data-Id');
        console.log(removeItemId);
        let removeItemColor = el.getAttribute('data-color');
        console.log(removeItemColor);
        let itemsUpdate = JSON.parse(window.localStorage.getItem("AllItems"));;
        for (let i =0; i < itemsUpdate.length; i++) {
            if (itemsUpdate[i].id == removeItemId && itemsUpdate[i].color == removeItemColor) {
    // 
                itemsUpdate[i].quantity = input.value;
                }
            }
    
// ------------- mise à jour du local storage, du nombre d'articles et du prix total --------------------
// ------------- après modification de la quantité d'un article -----------------------------------------
        localStorage.setItem('AllItems', JSON.stringify(itemsUpdate)); 
        console.log(itemsUpdate.length);
        console.log(itemsUpdate);
        cartTotalPriceAndQuantity();
    })
    let div6 = document.createElement('div');
    div6.classList.add('cart__item__content__settings__delete');
    div4.appendChild(div6);
    let p4 = document.createElement('p');
    p4.classList.add('deleteItem');
    p4.textContent = 'Supprimer';
    div6.appendChild(p4);

// ------------- prise en compte de la suppression des articles à la page panier -----------------------
    p4.addEventListener('click',() =>{  
        el = p4.closest("article");
        console.log(el);
        let removeItemId = el.getAttribute('data-Id');
        console.log(removeItemId);
        let removeItemColor = el.getAttribute('data-color');
        console.log(removeItemColor);
        el.remove();
        let itemsUpdate = JSON.parse(window.localStorage.getItem("AllItems"));;
        for (let i =0; i < itemsUpdate.length; i++) {
            if (itemsUpdate[i].id == removeItemId && itemsUpdate[i].color == removeItemColor) {
                itemsUpdate.splice(i, 1);
                }
            }
        
// ------------- mise à jour du local storage, du nombre d'articles et du prix total ------------------
// ------------- après suppression d'articles ---------------------------------------------------------        
        localStorage.setItem('AllItems', JSON.stringify(itemsUpdate)); 
        console.log(itemsUpdate.length);
        console.log(itemsUpdate);
        cartTotalPriceAndQuantity();
    })
}


async function getItemFromAPI(id) {
    const itemPromise = await fetch("http://localhost:3000/api/products/"+id);
    const response = await itemPromise.json();
    console.log(response);
    return response;
}

async function getItemsFromLocalStorage() {
    var array = JSON.parse(window.localStorage.getItem("AllItems"));
    return array;
}

async function cartTotalPriceAndQuantity () {
    var array = await getItemsFromLocalStorage();
    var totalPrice = 0;
    var totalQuantity = 0;
    console.log('hello');
    if (array.length > 0) {
        for (let i = 0; i < array.length; i++) {
            console.log(Number(array[i].quantity));
            totalQuantity += Number(array[i].quantity); 
            document.getElementById("totalQuantity").textContent = totalQuantity;
            try {
                data = await getItemFromAPI(array[i].id);
                console.log(data.price);
                totalPrice += Number(array[i].quantity)*Number(data.price);
                document.getElementById("totalPrice").textContent = totalPrice;
            }
            catch (err) {
                console.log(err)
            }
        }
    }
    else {
        document.getElementById("totalQuantity").textContent = 0;
        document.getElementById("totalPrice").textContent = 0;
    }
}

//------------------  Fin de l'affichage intial du panier -------------------------------



//-----------------------Contrôle des inputs du formulaire de la page panier--------------

//-----------------------Contrôle du prénom-----------------------------------------------

const reg1 = /[0123456789&"'(_)=~#{[|\^@\]$*,;:!¤ù§/.?<>]/;
let firstName = document.getElementById('firstName');
firstName.addEventListener('change', () => {
    if (firstName.value.search(reg1) > -1) {
        document.querySelector('#firstNameErrorMsg').innerHTML = "prénom invalide";
    }
    else {
        document.querySelector('#firstNameErrorMsg').innerHTML = "";
    };
});

//-----------------------Contrôle du nom-----------------------------------------------

let lastName = document.getElementById('lastName');
lastName.addEventListener('change', () => {
    if (lastName.value.search(reg1) > -1) {
        document.querySelector('#lastNameErrorMsg').innerHTML = "nom invalide";
    }
    else {
        document.querySelector('#lastNameErrorMsg').innerHTML = "";
    };
});

//-----------------------Contrôle de l'adresse-----------------------------------------------

const reg2 = /[&"(_)=~#{[|\^@\]$*,;:!¤ù§/.?<>]/;
let address = document.getElementById('address');
address.addEventListener('change', () => {
    if (address.value.search(reg2) > -1) {
        document.querySelector('#addressErrorMsg').innerHTML = "adresse invalide";
    }
    else {
        document.querySelector('#addressErrorMsg').innerHTML = "";
    };
});

//-----------------------Contrôle de la ville-----------------------------------------------

const reg3 = /[0123456789&"(_)=~#{[|\^@\]$*,;:!¤ù§/.?<>]/;
let city = document.getElementById('city');
city.addEventListener('change', () => {
    if (city.value.search(reg3) > -1) {
        document.querySelector('#cityErrorMsg').innerHTML = "nom de ville invalide";
    }
    else {
        document.querySelector('#cityErrorMsg').innerHTML = "";
    };
});

//-----------------------  Contrôle de l'email -----------------------------------------------------------------------------------------------------------------------

let email = document.getElementById('email');
email.addEventListener('change', () => {
    emailValidate(email.value);
    });

function checkEmail(email) {
    var reg4 = /^[\w.+-]{1,64}@[\w-]{2,252}\.[a-zA-Z][a-zA-Z\\.]{1,5}$/;
    return reg4.test(email);
}
function emailValidate(email) {
    if (checkEmail(email)) {
        document.getElementById('emailErrorMsg').textContent = "";
    }
    else {
        document.getElementById('emailErrorMsg').textContent = "Adresse e-mail invalide !";
    }
}

//--------------------------Fin du contrôle des inputs du formulaire de la page panier ---------------------------------

//--------------------------Passation de commande et récupération de l'orderId --------------------------------------------------

let order = document.getElementById('order');
var productsId = [];
order.addEventListener('click', (event)=>{
    event.preventDefault();
    var object = JSON.parse(window.localStorage.getItem("AllItems"));
    console.log(object);

    if (object.length > 0) {
        for (let i = 0; i < object.length; i++) {
            console.log(object[i].id);
            productsId.push(object[i].id);
        };
        console.log(productsId);
        send(productsId);
    }
    else {
        alert("Le panier est vide");
    }

});



function send(productsId){
    fetch("http://localhost:3000/api/products/order/",{
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            contact: {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                email: document.getElementById('email').value
            },
            products: productsId,
        })
    })
        .then(function(res) {
            if (res.ok) {
            return res.json();}
            else {console.log('error')}})
        .then(data => {
            console.log(data);
            window.location.replace ("C:/Users/mabdu/Documents/OC/P5_Aabdul_Malik/P5-Dev-Web-Kanap/front/html/confirmation.html?id="+data.orderId);
        })
        .catch(err => {console.log(err)})
};

//---------------------------  Fin de passation de commande  -------------------------------------









        