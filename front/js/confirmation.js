fetch("http://localhost:3000/api/products/orderId")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
  })
  .catch(err => {
    console.log('error')
  });

document.getElementById('orderId').innerHTML=orderId;