function validateLogin(event) {
    event.preventDefault();
    
    // Obter valores dos campos
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    // 1. Validação básica de campos vazios
    if (!email || !password) {
        showError("Por favor, preencha todos os campos.");
        return false;
    }
            
    // 2. Validação do formato do email
    if (!validateEmail(email)) {
        showError("Formato de email inválido!");
        return false;
    }
    
    // 3. Validação da força da senha
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
        showError("Erros na senha:\n" + passwordErrors.join('\n'));
        return false;
    }
    
    // Login bem-sucedido se passou por todas as validações
    showSuccess("Bem-vindo de volta!");
            
    // Simular redirecionamento após 2 segundos
    setTimeout(() => {
        window.location.href = "inicio2.html"; // Modificado para inicio2.html
    }, 2000);
    
    return false;
}

// Funções auxiliares
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    let errorMessage = [];
    
    if(password.length < 8) {
        errorMessage.push("Senha invalida");
    }
        
    return errorMessage;
}

function showError(message) {
    // Remove mensagens anteriores
    const oldError = document.querySelector('.error-message');
    if (oldError) oldError.remove();
    
    // Remove mensagens de sucesso
    const oldSuccess = document.querySelector('.success-message');
    if (oldSuccess) oldSuccess.remove();
    
    // Cria nova mensagem de erro
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message alert alert-danger';
    errorElement.textContent = message;
    
    // Insere antes do formulário
    const form = document.querySelector('form');
    form.parentNode.insertBefore(errorElement, form);
}

function showSuccess(message) {
    // Remove mensagens anteriores
    const oldError = document.querySelector('.error-message');
    if (oldError) oldError.remove();
    
    const oldSuccess = document.querySelector('.success-message');
    if (oldSuccess) oldSuccess.remove();
    
    // Cria nova mensagem de sucesso
    const successElement = document.createElement('div');
    successElement.className = 'success-message alert alert-success';
    successElement.textContent = message;
    
    // Insere antes do formulário
    const form = document.querySelector('form');
    form.parentNode.insertBefore(successElement, form);
}

// Adicionar o event listener ao formulário
document.querySelector('form').addEventListener('submit', validateLogin);
