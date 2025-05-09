
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do formulário
    const senhaInput = document.getElementById('senha');
    const confirmaSenhaInput = document.getElementById('confirma-senha');
    const emailInput = document.getElementById('email');
    const formCadastro = document.getElementById('formCadastro');
    const botoesExibirSenha = document.querySelectorAll('.mostrar-senha');
    
    // Função para mostrar o modal com mensagem personalizada
    function mostrarModal(mensagem) {
        const modalBody = document.getElementById('erroSenhaModalBody');
        if (modalBody) {
            modalBody.innerHTML = mensagem;
            
            // Inicializar e mostrar o modal do Bootstrap
            const erroModal = new bootstrap.Modal(document.getElementById('erroSenhaModal'));
            erroModal.show();
        } else {
            // Fallback para alert caso o modal não esteja disponível no HTML
            alert(mensagem.replace(/<[^>]*>?/gm, ''));  // Remove tags HTML para exibir no alert
        }
    }

    // Função para validar a senha
    function validarSenha(senha) {
        const resultados = {
            temOitoDigitos: senha.length >= 8,
            temDoisNumeros: (senha.match(/[0-9]/g) || []).length >= 2,
            temCaractereEspecial: /[!@#$%^&*(),.?":{}|<>]/.test(senha),
            temLetraMaiuscula: /[A-Z]/.test(senha)
        };
        
        return resultados;
    }

    // Função para verificar se as senhas coincidem
    function senhasCoincidentes() {
        return senhaInput.value === confirmaSenhaInput.value;
    }
    
    // Função para validar o formato do email
    function validarEmail(email) {
        // Expressão regular para validação de email
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regexEmail.test(email);
    }

    // Adicionar evento de submit ao formulário
    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault(); // Impedir o comportamento padrão do botão
        
        // Verificar se a senha atende a todos os requisitos
        const senha = senhaInput.value;
        const validacao = validarSenha(senha);
        
        // Verificar se todos os campos estão preenchidos
        const nomeCompleto = document.getElementById('nome-completo').value;
        const email = emailInput.value;
        
        if (!nomeCompleto || !email || !senha || !confirmaSenhaInput.value) {
            mostrarModal('<p>Por favor, preencha todos os campos obrigatórios!</p>');
            return;
        }
        
        // Validar formato do email
        if (!validarEmail(email)) {
            mostrarModal('<p>Por favor, insira um endereço de e-mail válido!</p>');
            emailInput.focus();
            return;
        }
        
        // Verificar cada requisito da senha
        const erros = [];
        
        if (!validacao.temOitoDigitos) {
            erros.push('Mínimo 8 dígitos');
        }
        
        if (!validacao.temDoisNumeros) {
            erros.push('Pelo menos 2 números');
        }
        
        if (!validacao.temCaractereEspecial) {
            erros.push('Pelo menos 1 caractere especial');
        }
        
        if (!validacao.temLetraMaiuscula) {
            erros.push('Pelo menos 1 letra MAIÚSCULA');
        }
        
        // Se houver erros na validação da senha
        if (erros.length > 0) {
            let mensagemErro = '<p>A senha não atende aos seguintes requisitos:</p><ul>';
            erros.forEach(erro => {
                mensagemErro += `<li>${erro}</li>`;
            });
            mensagemErro += '</ul>';
            
            mostrarModal(mensagemErro);
            return;
        }
        
        // Verificar se as senhas coincidem
        if (!senhasCoincidentes()) {
            mostrarModal('<p>As senhas não coincidem!</p>');
            return;
        }
        
        // Se passar por todas as validações, redirecionar para a próxima página
        window.location.href = 'cadastrodonatario2.html';
    });

    // Validação em tempo real para mostrar visualmente os requisitos
    senhaInput.addEventListener('input', function() {
        const validacao = validarSenha(this.value);
        const requisitos = document.querySelectorAll('.requisitos-secundarios');
        
        // Atualizar estilo visual dos requisitos
        if (requisitos.length >= 4) {
            requisitos[0].style.color = validacao.temOitoDigitos ? 'green' : '';
            requisitos[1].style.color = validacao.temDoisNumeros ? 'green' : '';
            requisitos[2].style.color = validacao.temCaractereEspecial ? 'green' : '';
            requisitos[3].style.color = validacao.temLetraMaiuscula ? 'green' : '';
        }
    });
    
    // Validação em tempo real para verificar se as senhas coincidem
    confirmaSenhaInput.addEventListener('input', function() {
        if (senhaInput.value && this.value) {
            if (senhasCoincidentes()) {
                this.style.borderColor = 'green';
            } else {
                this.style.borderColor = 'red';
            }
        } else {
            this.style.borderColor = '';
        }
    });
    
    // Validação em tempo real do email
    emailInput.addEventListener('input', function() {
        if (this.value) {
            if (validarEmail(this.value)) {
                this.style.borderColor = 'green';
            } else {
                this.style.borderColor = 'red';
            }
        } else {
            this.style.borderColor = '';
        }
    });
    
    // Funcionalidade para mostrar/esconder senha
    botoesExibirSenha.forEach(function(botao) {
        botao.addEventListener('click', function() {
            const input = this.previousElementSibling;
            
            if (input.type === 'password') {
                input.type = 'text';
                this.innerHTML = '<i class="mostrar-senha" aria-hidden="true"></i>';
            } else {
                input.type = 'password';
                this.innerHTML = '<i class="mostrar-senha" aria-hidden="true"></i>';
            }
        });
    });
});
