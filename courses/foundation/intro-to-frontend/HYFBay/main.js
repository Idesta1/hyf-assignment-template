console.log("Script loaded");

const products = getAvailableProducts();
console.log(products);

// This should create the ul and the li's with the individual products details

function renderProducts(products) {
  const productList = document.getElementById("product-list");

  products.forEach((product) => {
    const listItem = document.createElement("li");
    listItem.classList.add("product-item");
    listItem.innerHTML = `${product.name}
  Price: $${product.price.toFixed(2)}
Rating: ${product.rating} / 10
    `;
    productList.appendChild(listItem);
  });
}

renderProducts(products);
