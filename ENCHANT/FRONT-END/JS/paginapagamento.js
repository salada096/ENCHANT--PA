document.getElementById("mes").addEventListener("change", function() {
    this.style.color = "black";
});
document.getElementById("ano").addEventListener("change", function() {
    this.style.color = "black";
});
document.getElementById("comprar").addEventListener("click", function(){
    let numerocartao = String(document.getElementById("numerocartao").value);
    let cvv = String(document.getElementById("cvv").value);
    if(numerocartao.length != 16){
        alert("O número do cartão deve conter 16 dígitos para ser enviado.")
    }else if(cvv.length != 4 && cvv.length != 3){
        alert("O CVV deve conter 4 ou 3 dígitos apenas.")
    }else{
        document.querySelector(".form-pagamento").submit();
    }
});
