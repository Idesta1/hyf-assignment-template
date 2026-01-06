console.log("Script loaded");

const products = getAvailableProducts();
console.log(products);

// This should create the ul and the li's with the individual products details

function renderProducts(products) {
  const ul = document.querySelector("#product-list");

  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerText = `Item: ${product.name} - Price: $${product.price} - Rating: ${product.rating}/10`;
    li.style.marginLeft = "30px";
    li.style.marginBottom = "10px";
    li.style.listStyleType = "none";
    li.style.marginTop = "20px";
    li.style.backgroundColor = "lightyellow";
    ul.appendChild(li);
  });
}

renderProducts(products);
