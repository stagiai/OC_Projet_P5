// ------------------ Récupération de l'orderId via l'URL -----------------------------
let str = location.href;
console.log(str);
var url = new URL(str);
console.log(url);
var productId = url.searchParams.get("id");
console.log(productId);


// ----------------- Intégration de l'orderId dans la page de confirmation ------------
document.getElementById('orderId').textContent=productId;