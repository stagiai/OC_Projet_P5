/*-- let section = document.getElementById('cart__items');
for (let k=0; i<localStorage.length; k++){
    let article = document.createElement('article');
    article.classList.add('cart__item');
    let id = localStorage[k]['product-ID'];
    let color = localStorage[k]['product-color'];
    article.setAttribute('data-ID', id);
    article.setAttribute('data-color', color);
    section.appendChild(article); --*/
    



/*-- } --*/

/*-- window.localStorage.addEventListener = ('change', () =>{
    const newId = localStorage.getitem.id;
    console.log(newId);
    const newColor = localStorage.getitem.color;
    const newQuantity = JSON.parse(localStorage.getitem.quantity);
    newItemDisplay (newId, newColor);
}) --*/

function newItemDisplay(newId, newColor) {

    fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(data) {
        let i = 0;
        while (data[i]['_id']!=newId){
            i++;}
        let div1 = document.createElement('div');
        div1.classList.add('cart__item__img');
        article.appendChild(div1);
        let img = document.createElement("img");
        img.setAttribute('src', data[i]['imageUrl']);
        img.setAttribute('alt',data[i]['altTxt']);
        div1.appendChild(img);
        let div2 = document.createElement('div');
        div2.classList.add('cart__item__content');
        article.appendChild(div2);
        let div3 = document.createElement('div');
        div3.classList.add('cart__item__content__description');
        div2.appendChild(div3);
        let h2 = document.createElement('h2');
        h2.textContent = data[i]['name'];
        div3.appendChild(h2);
        let p1 = document.createElement('p');
        p1.textContent = newColor;
        div3.appendChild(p1);
        let p2 = document.createElement('p');
        p2.textContent = data[i]['price'];
        div3.appendChild(p3);


    })
    .catch(function(err) {
    });
}