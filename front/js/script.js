let url = `http://localhost:3000/api/products`;

function getProduct () {
  fetch(url)
  .then((response) => response.json()
  .then((data) => {
    for(let elem of data) {
      let productCard = document.createElement('a');
      productCard.href = './product.html?id=' + elem._id;
      document.querySelector('#items').appendChild(productCard);
      let article = document.createElement('article');
      productCard.appendChild(article);
      let imgProduct = document.createElement('img');
      imgProduct.src = elem.imageUrl;
      article.appendChild(imgProduct);
      let nameProduct = document.createElement('h3');
      nameProduct.classList.add('productName')
      nameProduct.append(elem.name);
      article.appendChild(nameProduct);
      let descriptionProduct = document.createElement('p');
      descriptionProduct.classList.add("productDescription");
      descriptionProduct.append(elem.description);
      article.appendChild(descriptionProduct);
    }
  }))
}

getProduct()