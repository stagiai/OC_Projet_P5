function idReception(e) {
  e.preventDefault();
  fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(id) {
    console.log(id);

/*    console.log(arr[i]);
    let item__img = document.getElementsByClassName('item__img');
    let img = document.createElement("img");
    img.setAttribute('src', arr[0]['imageUrl']);
    img.setAttribute('alt',arr[0]['altTxt']);
    item__img.appendChild(img);*/

  });
}

document.addEventListener("DOMContentLoaded", idReception);






