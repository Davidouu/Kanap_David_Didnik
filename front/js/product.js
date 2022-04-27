let urlData = window.location.search;
let param = new URLSearchParams(urlData);
let id = param.get('id');
let btnAddToCart = document.querySelector('#addToCart');
let productQuantity = document.querySelector('#quantity');
const colorPicked = document. querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");



let urlProduct = `http://localhost:3000/api/products/${id}`; 

function afficherDivAvecNomEtPrixNounours() {
    fetch(urlProduct).then((response) => response.json().then((data) => {
        let image = document.createElement('img');
        image.src = data.imageUrl;
        document.querySelector('.item__img').appendChild(image);
        let nameProduct = document.createTextNode(data.name);
        document.querySelector('#title').append(nameProduct);
        let priceProduct = document.createTextNode(data.price);
        document.querySelector('#price').append(priceProduct);
        let descriptionProduct = document.createTextNode(data.description);
        document.querySelector('#description').append(descriptionProduct);
        let couleurDeclinaison = document.querySelector('#colors');
        for (let i = 0; i < data.colors.length; i++) {
            couleurDeclinaison.options.add(new Option(data.colors[i], data.colors[i]));
        }
    }));
}

afficherDivAvecNomEtPrixNounours();

btnAddToCart.addEventListener("click", () => {
    let choixCouleur = colorPicked.value;
    let choixQuantite = quantityPicked.value;
    let idProduct = id;
    let prixProduit = parseInt(document.querySelector('#price').innerHTML);
    let supId = id + colorPicked.value;
    let optionsProduit = {
        productColor: choixCouleur,
        productQuantity: choixQuantite,
        _id: idProduct,
        productPrice: prixProduit,
        supIdCart: supId,
    }   
    if(choixQuantite > 0 && choixQuantite < 100){
        let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
        if(produitLocalStorage){
            const resultFind = produitLocalStorage.find((el) => el._id === idProduct && el.productColor === choixCouleur);
            if(resultFind) {
                let newQuantite = parseInt(optionsProduit.productQuantity) + parseInt(resultFind.productQuantity);
                resultFind.productQuantity = newQuantite;
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                alert('la quantité est ajt')
            }else{
                produitLocalStorage.push(optionsProduit);
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                alert('le produit est ajt');
            }
        }else{
            produitLocalStorage =[];
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            alert('le produit est ajt');
        }
    }
})