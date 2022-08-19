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
    addToCart()
});  

function addToCart() {   
        productColor = getItemColor();
        if (productColor == "") { alert('Veuillez choisir une couleur');};
        productQuantity = getItemQuantity();
        if (productQuantity == 0 || productQuantity > 100) {alert('Veuillez choisir une quantité comprise entre 1 et 100')};
        const newItem = {
            id : productId,
            color : productColor,
            quantity : productQuantity,
        }
        let existingItems = JSON.parse(localStorage.getItem('allItems'));
        if( existingItems == null) {existingItems = [];}
        existingItems.push(newItem);
        console.log(existingItems);
        localStorage.setItem ('allItems', JSON.stringify(existingItems));
}

function getItemColor() {
    var selectColor = document.getElementById('colors');
    return selectColor.value;
}

function getItemQuantity() {
    var quantity = document.getElementById ('quantity');
    return quantity.value;
}








