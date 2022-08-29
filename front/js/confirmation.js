let str = location.href;
console.log(str);
var url = new URL(str);
console.log(url);
var productId = url.searchParams.get("id");
console.log(productId);

document.getElementById('orderId').textContent=productId;