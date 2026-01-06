console.log("Script loaded");

const products = getAvailableProducts();
console.log(products);

// This should create the ul and the li's with the individual products details

function renderProducts(products) {
  const ul = document.querySelector("#product-list");

  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerText = `Item: ${product.name} - Price: $${product.price.toFixed(
      2
    )} - Rating: ${product.rating}/10`;
    li.style.marginLeft = "30px";
    li.style.marginBottom = "10px";
    li.style.listStyleType = "disc";
    li.style.marginTop = "20px";
    ul.appendChild(li);
  });
}

renderProducts(products);
