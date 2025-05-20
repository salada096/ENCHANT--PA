document.getElementById("mes").addEventListener("change", function() {
    this.style.color = "black";
});
document.getElementById("ano").addEventListener("change", function() {
    this.style.color = "black";
});
document.getElementById("mesdebito").addEventListener("change", function() {
    this.style.color = "black";
});
document.getElementById("anodebito").addEventListener("change", function() {
    this.style.color = "black";
});
document.addEventListener("DOMContentLoaded", function() {
    // Set up select color changes
    const selects = document.querySelectorAll("select");
    selects.forEach(select => {
        select.addEventListener("change", function() {
            this.style.color = "black";
        });
    });

    // Set initial payment method
    mudarpagamento(1);
});

// Function to handle payment method selection
function mudarpagamento(valor) {
    // Convert to number if passed as string
    valor = parseInt(valor);

    // Get all payment method containers
    const cartaoCredito = document.querySelector(".cartao-credito");
    const cartaoDebito = document.querySelector(".cartao-debito");
    const pix = document.querySelector(".pix");

    // First hide all payment methods
    if (cartaoCredito) cartaoCredito.style.display = "none";
    if (cartaoDebito) cartaoDebito.style.display = "none";
    if (pix) pix.style.display = "none";

    // Then show only the selected one
    if (valor === 1 && cartaoCredito) {
        cartaoCredito.style.display = "block";
    } else if (valor === 2 && cartaoDebito) {
        cartaoDebito.style.display = "block";
    } else if (valor === 3 && pix) {
        pix.style.display = "block";
    }

    // Remove any existing event listener from the button by cloning it
    const comprarButton = document.getElementById("comprar");
    const newComprarButton = comprarButton.cloneNode(true);
    comprarButton.parentNode.replaceChild(newComprarButton, comprarButton);

    // Add new event listener based on payment method
    newComprarButton.addEventListener("click", function(e) {
        e.preventDefault();
        validatePayment(valor);
    });
    
    console.log("Payment method changed to:", valor);
}

// Function to validate payment based on selected method
function validatePayment(paymentMethod) {
    if (paymentMethod === 1) {
        // Credit card validation
        validateCreditCardForm();
    } else if (paymentMethod === 2) {
        // Debit card validation
        validateDebitCardForm();
    } else if (paymentMethod === 3) {
        // PIX validation
        validatePixForm();
    }
}

// Function to validate credit card form
function validateCreditCardForm() {
    const numerocartao = document.getElementById("numerocartao").value.replace(/\D/g, '');
    const cvv = document.getElementById("cvv").value.replace(/\D/g, '');
    const mes = document.getElementById("mes").value;
    const ano = document.getElementById("ano").value;

    if (numerocartao.length !== 16) {
        alert("O número do cartão deve conter 16 dígitos para ser enviado.");
    } else if (cvv.length !== 3 && cvv.length !== 4) {
        alert("O CVV deve conter 3 ou 4 dígitos apenas.");
    } else if (!mes || mes === "") {
        alert("Por favor, selecione o mês de validade do cartão.");
    } else if (!ano || ano === "") {
        alert("Por favor, selecione o ano de validade do cartão.");
    } else {
        // All validations passed, submit the form
        document.querySelector(".form-pagamento").submit();
    }
}

// Function to validate debit card form
function validateDebitCardForm() {
    const numerocartao = document.getElementById("numerocartaodebito").value.replace(/\D/g, '');
    const cvv = document.getElementById("cvvdebito").value.replace(/\D/g, '');
    const mes = document.getElementById("mesdebito").value;
    const ano = document.getElementById("anodebito").value;

    if (numerocartao.length !== 16) {
        alert("O número do cartão de débito deve conter 16 dígitos para ser enviado.");
    } else if (cvv.length !== 3 && cvv.length !== 4) {
        alert("O CVV deve conter 3 ou 4 dígitos apenas.");
    } else if (!mes || mes === "") {
        alert("Por favor, selecione o mês de validade do cartão de débito.");
    } else if (!ano || ano === "") {
        alert("Por favor, selecione o ano de validade do cartão de débito.");
    } else {
        // All validations passed, submit the form
        document.querySelector(".form-pagamento").submit();
    }
}

// Function to validate PIX form
function validatePixForm() {
    const nomecompleto = document.getElementById("nomecompleto").value.trim();
    const cpf = document.getElementById("cpf").value.replace(/\D/g, '');

    if (nomecompleto === "") {
        alert("Por favor, preencha o nome completo.");
    } else if (cpf.length !== 11) {
        alert("O CPF deve conter 11 dígitos.");
    } else {
        // All validations passed, submit the form
        document.querySelector(".form-pagamento").submit();
    }
}
