// variables qui récupère l'id du produit dans son url

let urlData = window.location.search;
let param = new URLSearchParams(urlData);
let id = param.get('id');

// variables qui séléctionnes les différents input de la page produit

let btnAddToCart = document.querySelector('#addToCart');
let productQuantity = document.querySelector('#quantity');
let colorPicked = document. querySelector("#colors");

// variables de l'url du produit dans l'api

let urlProduct = `http://localhost:3000/api/products/${id}`; 

// fonction qui me permet d'afficher les différentes info du produit cliqué

function getProduct() {
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

getProduct();

// ajout de la sélection au panier au click sur le boutton de la page produit

btnAddToCart.addEventListener("click", () => {
    // création de l'objet a mettre dans le local storage 
    let choixCouleur = colorPicked.value;
    let choixQuantite = productQuantity.value;
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

    // Si la quantité est la couleur sont séléctionné on commence les vérification, sinon une alerte apparait pour préciser à l'utilisateur 
    // qui doit sélectionner une couleur et une quantité.

    if(choixQuantite > 0 && choixQuantite < 100 && colorPicked.value !== ""){
        let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

        // On vérifie si la clé "produit" éxiste dans le local storage, si oui...
        // sinon on la créer et on push l'objet optionProduit dans le localstorage

        if(produitLocalStorage){
            const resultFind = produitLocalStorage.find((el) => el._id === idProduct && el.productColor === choixCouleur);

            // si elle éxiste on vérifie qu'un même produit n'a pas déjà été ajouté, si oui on ajoute que la quantité, sinon on push l'objet
             
            if(resultFind) {
                let newQuantite = parseInt(optionsProduit.productQuantity) + parseInt(resultFind.productQuantity);
                resultFind.productQuantity = newQuantite;
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                alert('La quantité a été ajouté avec succès')
            }else{
                produitLocalStorage.push(optionsProduit);
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                alert('Le produit a été ajouté avec succès');
            }
        }else{
            produitLocalStorage =[];
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            alert('Le produit a été ajouté avec succès');
        }
    }else{
        alert('Le produit ne peut pas être ajouter. Veuillez sélectionnez une quantité et une couleur.')
    }
})