
function itemsDisplay(){
    fetch("http://localhost:3000/api/products")
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(data) {
            console.log(data);
            let section = document.getElementById("items");
            let i = 0;
            while (i < data.length) {

            /*-- création de la balise ancre a ----------------------------*/
                let a = document.createElement('a');
                a.setAttribute('href', "./product.html?id="+data[i]['_id']);                                
                section.appendChild(a);

            /*-- création de l'élément 'article de la balise a --------------*/
                let article = document.createElement('article');
                a.appendChild(article);
                
            /*-- création des éléments children img, h3 et p de l'élément article --*/
                let img = document.createElement("img");
                img.setAttribute('src', data[i]['imageUrl']);
                img.setAttribute('alt',data[i]['altTxt']);
                article.appendChild(img);
                let h3 = document.createElement('h3');            
                h3.classList.add("productName");
                h3.textContent = data[i]["name"];
                article.appendChild(h3);
                let p= document.createElement('p');
                p.classList.add("productDescription");
                p.textContent = data[i]["description"];
                article.appendChild(p);
                i++;
            }
        
        })
        .catch(function(err) {
        });  
}



document.addEventListener("DOMContentLoaded", itemsDisplay);





            
        