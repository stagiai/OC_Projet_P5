function itemDisplay(e){
    console.log(id);
  fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(data) {
        let i = 0;
        while (data[i]['_id']!=id){
            i++;
        }
        console.log(data[i]['_id']);
        let itemImg = document.getElementsByClassName("item__img");
        let img = document.createElement("img");
        img.setAttribute('src', data[i]['imageUrl']);
        img.setAttribute('alt',data[i]['altTxt']);
        itemImg[0].appendChild(img);
        let title = document.getElementById("title");
        title.textContent = data[i]['name'];            
        let price = document.getElementById("price");
        price.textContent = data[i]["price"];
        let description = document.getElementById("description");
        description.textContent = data[i]["description"];
        let colors = data[i]['colors'];
        console.log(colors);
        let select = document.getElementById("colors");
        for (let n=0; n < colors.length; n++) {
            console.log(n);
            option = document.createElement("option");
            option.setAttribute('value', colors[n]);
            option.textContent = colors[n];
            select.appendChild(option);
        }
    })
    .catch(function(err) {
    });  
}
let str = location.href;
var url = new URL(str);
var id = url.searchParams.get("id");
console.log(id);
let index = 0;

document.addEventListener("DOMContentLoaded", itemDisplay());





