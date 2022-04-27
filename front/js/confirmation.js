function commande(){
    if(localStorage.getItem('orderId') == null){
        document.location.href = 'index.html';
    }else{
        document.querySelector('#orderId').append(localStorage.getItem("orderId"));
        localStorage.clear();
    }
}

commande();