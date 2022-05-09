let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

// fonction qui me permet d'afficher les produits du local storage dans la page panier

async function showCart() {
        for(let elem of produitLocalStorage){
            let id = elem._id;
            let urlProduct = `http://localhost:3000/api/products/` + id;
            await fetch(urlProduct).then((response) => response.json().then(async(data) => {

                let articleCard = document.createElement('article');
                articleCard.classList.add('cart__item');
                document.querySelector('#cart__items').appendChild(articleCard);

                let divItemImg = document.createElement('div');
                divItemImg.classList.add('cart__item__img');
                articleCard.appendChild(divItemImg);

                let img = document.createElement('img');
                img.src = data.imageUrl;
                img.alt = `image d'un canapé`;
                divItemImg.appendChild(img);

                let divItemContent = document.createElement('div');
                divItemContent.classList.add('cart__item__content');
                document.querySelector('#cart__items').appendChild(divItemContent);

                let divItemContentDescription = document.createElement('div');
                divItemContentDescription.classList.add('cart__item__content__description');
                divItemContent.appendChild(divItemContentDescription);

                let nomProduit = document.createElement('h2');
                nomProduit.append(data.name);
                divItemContentDescription.appendChild(nomProduit);

                let productColor = document.createElement('p');
                productColor.append(elem.productColor);
                divItemContentDescription.appendChild(productColor);

                let productPrice = document.createElement('p');
                productPrice.append(data.price + ` €`);
                divItemContentDescription.appendChild(productPrice);

                let divItemContentSettings = document.createElement('div');
                divItemContentSettings.classList.add('cart__item__content__settings');
                divItemContent.appendChild(divItemContentSettings);

                let divItemContentSettingsQuantity = document.createElement('div');
                divItemContentSettingsQuantity.classList.add('cart__item__content__settings__quantity');
                divItemContentSettings.appendChild(divItemContentSettingsQuantity);

                let quantityProduct = document.createElement('p');                    
                quantityProduct.append(`Qté : `);
                divItemContentSettingsQuantity.appendChild(quantityProduct);

                let input = document.createElement('input');
                input.type = 'number';
                input.min = 1;
                input.max = 100;
                input.value = elem.productQuantity;
                input.classList.add('itemQuantity');
                divItemContentSettingsQuantity.appendChild(input);

                let divItemContentSettingsDelete = document.createElement('div');
                divItemContentSettingsDelete.classList.add('cart__item__content__settings__delete');
                divItemContentSettings.appendChild(divItemContentSettingsDelete);

                let itemDelete = document.createElement('p');
                itemDelete.append('Supprimer');
                itemDelete.classList.add('deleteItem');
                divItemContentSettingsDelete.appendChild(itemDelete);
            }))
        };

        // lancement des mes fonction qui ont besoin que les éléments des produits soient créés dans la page (donc après la boucle)
        
        removeItemCart()
        modifcart()
}

// le total de quantité plus le prix total

function totalPriceQuantity() {
    let sumPrice = 0;
    let sumQuantity = 0;
    for(let elem of produitLocalStorage) {
        sumPrice += parseInt(elem.productPrice) * parseInt(elem.productQuantity);
        sumQuantity += parseInt(elem.productQuantity);

    }
    document.querySelector('#totalQuantity').append(sumQuantity);
    document.querySelector('#totalPrice').append(sumPrice);
}

// ma fonction qui écoute au changement de l'input de quantité

function modifcart() {
    let modif = document.querySelectorAll('.itemQuantity');
    for(let i = 0; i < modif.length; i++){
        modif[i].addEventListener('change', () => {
            if(modif[i].value > 100){
                alert('Vous ne pouvez pas ajouter plus de 100 produits au panier')
            }else{
                produitLocalStorage[i].productQuantity = modif[i].value;
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                window.location.href = "cart.html";
            }
        })
    }
}

// ma fonction qui écoutre a la suppréssion d'un produit 
// à la supression, il y a un tri pour réecrire tout sauf le produit supp du panier dans le local storage 

function removeItemCart() {
    let supp = document.querySelectorAll('.deleteItem');
    for(let l = 0; l < supp.length; l++){
        supp[l].addEventListener('click', () => {
            let idSelcet = produitLocalStorage[l].supIdCart;
            let selectFilter = produitLocalStorage.filter( el => idSelcet !== el.supIdCart);
            localStorage.setItem("produit", JSON.stringify(selectFilter));
            window.location.href = "cart.html";
        })
    }    
}

showCart()
totalPriceQuantity()

// variables pour mon element formulaire | les regexp du form | et ma variables qui permet de vérifier si le form est bien remplis (de base sur false)

let form = document.querySelector('.cart__order__form');

let emailRegexp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
let regexpSimple = new RegExp('^[a-zA-Z-_ ]');
let regexpAdresse = new RegExp('^[a-zA-Z0-9À-ÖØ-öø-ÿ.-_ 0-9]{2,}$');

let prenomValide = false;
let nomValide = false;
let adresseValide = false;
let villeValide = false;
let emailValide = false;

// mes 5 fonctions qui écoute au changement des champs du form, si validé alors ma variables passe true

form.firstName.addEventListener('change', function(){
    let testFirstName = regexpSimple.test(this.value);
    prenomValide = testFirstName;
    if(testFirstName == false){
        document.querySelector('#firstNameErrorMsg').append('La saisie est incorrect')
    }else{}
})

form.lastName.addEventListener('change', function(){
    let testLastName = regexpSimple.test(this.value);
    nomValide = testLastName;
    if(testLastName == false){
        document.querySelector('#lastNameErrorMsg').append('La saisie est incorrect')
    }else{}
})

form.address.addEventListener('change', function(){
    let testAdress = regexpAdresse.test(this.value);
    adresseValide = testAdress;
    if(testAdress == false){
        document.querySelector('#addressErrorMsg').append('La saisie est incorrect')
    }else{}
})

form.city.addEventListener('change', function(){
    let testCity = regexpSimple.test(this.value);
    villeValide = testCity;
    if(testCity == false){
        document.querySelector('#cityErrorMsg').append('La saisie est incorrect')
    }else{}
})

form.email.addEventListener('change', function(){
    let testEmail = emailRegexp.test(this.value);
    emailValide = testEmail;
    if(testEmail == false){
        document.querySelector('#emailErrorMsg').append('La saisie est incorrect')
    }else{}
})

// fonction qui vérifie si tous les champs du form sont valide 

function verifForm(){
    if(prenomValide && nomValide && adresseValide && villeValide && emailValide){
        return true;
    }else{
        alert('Le formulaire contient des erreurs');
        return false;
    }
}
        
const commande = document.getElementById('order');

// fonction qui créer un objet de commande, et qui le post à l'api pour récuperer un id de commande qui seras placer dans le local storage

commande.addEventListener('click', function(){
    if(verifForm()){
        let ids = [];

        for(let i = 0; i <produitLocalStorage.length; i++){
            ids.push(produitLocalStorage[i]._id)
        }

        let detailCommande = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            },
            products: ids,
        };

        let post = {
            method: 'POST',
            body: JSON.stringify(detailCommande),
            headers: {
                'content-Type': 'application/json'},
            };

        fetch("http://localhost:3000/api/products/order", post)
            .then((response) => response.json())
            .then(data => {
                document.location.href = `confirmation.html?order_id=` + data.orderId;
            });   
}})