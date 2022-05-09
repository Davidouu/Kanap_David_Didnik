// variables qui me permettent de récuperer mon orderId dans mon url

let urlData = window.location.search;
let param = new URLSearchParams(urlData);
let orderId = param.get('order_id');

// si mon orderId dans l'url n'éxiste pas alors redirection sur la home page, sinon je l'affiche et je clear le local storage

function commande(){
    if(orderId == null){
        document.location.href = 'index.html';
    }else{
        document.querySelector('#orderId').append(orderId);
        localStorage.clear();
    }
}

commande();