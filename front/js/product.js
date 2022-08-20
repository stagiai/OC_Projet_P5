let str = location.href;
var url = new URL(str);
var productId = url.searchParams.get("id");

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

document.getElementById('addToCart').addEventListener('click', () => {
    addToCart()});  

function addToCart() {   
    productColor = getItemColor();
    productQuantity = getItemQuantity();
    let newItem = {
        id : productId,
        color : productColor,
        quantity : productQuantity};

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

function getItemColor() {
    var selectColor = document.getElementById('colors');
    return selectColor.value;
}

function getItemQuantity() {
    var quantity = document.getElementById('quantity');
    return quantity.value;
}








