// ------------------------- Récupération de l'id du produit sélectionné à la page d'accueil -------------
let str = location.href;
var url = new URL(str);
var productId = url.searchParams.get("id");

// ------------------------- Affichage du produit avec ses nom, prix, description et les sélections de couleurs et de quantité-----------------------------------------------------

function itemDisplay(){
    console.log(productId);
    fetch("http://localhost:3000/api/products/"+ productId)
        .then(response => {if (response.ok) {return response.json();}})
        .then(data => {
            let itemImg = document.getElementsByClassName("item__img");
            let img = document.createElement("img");
            img.setAttribute('src', data['imageUrl']);
            img.setAttribute('alt',data['altTxt']);
            itemImg[0].appendChild(img);
            let title = document.getElementById("title");
            title.textContent = data['name'];            
            let price = document.getElementById("price");
            price.textContent = data["price"];
            let description = document.getElementById("description");
            description.textContent = data["description"];
            let colors = data['colors'];
            console.log(colors);
            let select = document.getElementById("colors");
            for (let n=0; n < colors.length; n++) {
                let option = document.createElement("option");
                option.setAttribute('value', colors[n]);
                option.textContent = colors[n];
                select.appendChild(option);
            }
        })
        .catch(function(error) {alert('une erreur est survenue');})
    }
    
itemDisplay();


// ----------- Ajouter le produit dans le window local storage sur appui du bouton 'ajouter au panier' -------------------

document.getElementById('addToCart').addEventListener('click', () => {addToCart()});  

function addToCart() {   
    productColor = getItemColor();
    if (productColor == "") {
        alert("Veuillez choisir une couleur");
        productColor = getItemColor();
    }
    productQuantity = getItemQuantity();
    if (productQuantity == 0 || productQuantity > 100) {
        alert("Veuillez choisir une quantité comprise entre 1 et 100");
        productQuantity = getItemQuantity();
    }

    let newItem = {
        id : productId,
        color : productColor,
        quantity : productQuantity};

    if (productColor != "" && productQuantity > 0 && productQuantity <= 100) {
        if (localStorage.getItem('AllItems') == null) {
            var existingItems = [];}
        else {
            existingItems = JSON.parse(localStorage.getItem('AllItems'));}
    
        let detect = false
    
        if (existingItems.length == 0) {
            existingItems.push(newItem);
            detect = true;
        }
        else {
            for (let i = 0; i < existingItems.length; i++) {
                if (existingItems[i].id == productId && existingItems[i].color == productColor) {
                    let quantity = Number(existingItems[i].quantity);
                    quantity += Number(productQuantity);
                    existingItems[i].quantity = String(quantity);
                    detect = true;
                }
            }
        }
        if (detect == false) {
            existingItems.push(newItem);}    
    
        localStorage.setItem('AllItems', JSON.stringify(existingItems));
    }  
}

// ------------------------ récupération de la couleur sélectionnée --------------------------
function getItemColor() {
    var selectColor = document.getElementById('colors');
    return selectColor.value;
}

// ------------------------- récupération de la quantité sélectionnée -------------------------
function getItemQuantity() {
    var quantity = document.getElementById('quantity');
    return quantity.value;
}








