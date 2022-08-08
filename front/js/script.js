
function itemsDisplay(e){
    fetch("http://localhost:3000/api/products")
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            console.log(value);
            let section = document.getElementById("items");
            let i = 0;
            while (i < value.length) {
                let a = document.createElement('a');          
                a.setAttribute('href', "./product.html");                                
                section.appendChild(a);                
                let article = document.createElement('article');
                a.appendChild(article);        
                let img = document.createElement("img");
                img.setAttribute('src', value[i]['imageUrl']);
                img.setAttribute('alt',value[i]['altTxt']);
                article.appendChild(img);
                let h3 = document.createElement('h3');            
                h3.classList.add("productName");
                h3.textContent = value[i]["name"];
                article.appendChild(h3);
                let p= document.createElement('p');
                p.classList.add("productDescription");
                p.textContent = value[i]["description"];
                article.appendChild(p);

                i++;
            }
        })
        .catch(function(err) {
        });    
}

function sendId(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: document.getElementsByTagName('a').value[i]['_id']})
    })
}

document.addEventListener("DOMContentLoaded", itemsDisplay);
document
    .getElementsByTagName('a')
    .addEventListener('click', sendId);


            
        