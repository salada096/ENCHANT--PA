document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const form = document.querySelector('form');
    const senhaInput = document.getElementById('senha');
    const confirmaSenhaInput = document.getElementById('confirma-senha');
    const botaoContinuar = document.getElementById('botao');
    const cnpjInput = document.getElementById('cnpj');
    const telefoneInput = document.getElementById('telefone');
    const uploadInput = document.getElementById('upload');
    const simCheckbox = document.getElementById('elemento-escolha-1');
    const naoCheckbox = document.getElementById('elemento-escolha-2');
    const primeiraEtapa = document.querySelector('.primeiro');
    const segundaEtapa = document.querySelector('.segundo');
    const botaoVoltar = document.getElementById('botao1');
    const botaoCadastrar = document.getElementById('botao2');
    const erroSenhaModal = new bootstrap.Modal(document.getElementById('erroSenhaModal'));
    const erroSenhaModalBody = document.getElementById('erroSenhaModalBody');
    
    // Password toggle elements - adding them dynamically as they're missing in HTML
    const senhaToggleElements = document.querySelectorAll('.mostrar-senha');
    
    senhaToggleElements.forEach(function(element) {
   
        element.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            if (input.type === 'password') {
                input.type = 'text';
                this.innerHTML = '<i class="ph ph-eye-slash"></i>';
            } else {
                input.type = 'password';
                this.innerHTML = '<i class="ph ph-eye"></i>';
            }
        });
    });
    
    // Form validation functions
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validarSenha(senha) {
        const temOitoDigitos = senha.length >= 8;
        const temDoisNumeros = (senha.match(/\d/g) || []).length >= 2;
        const temCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
        const temLetraMaiuscula = /[A-Z]/.test(senha);
        
        return {
            valido: temOitoDigitos && temDoisNumeros && temCaracterEspecial && temLetraMaiuscula,
            temOitoDigitos,
            temDoisNumeros,
            temCaracterEspecial,
            temLetraMaiuscula
        };
    }
    
    // Format inputs
    if (cnpjInput) {
        cnpjInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 14) value = value.slice(0, 14);
            
            // Format as XX.XXX.XXX/XXXX-XX
            if (value.length > 12) {
                this.value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
            } else if (value.length > 8) {
                this.value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d+)$/, "$1.$2.$3/$4");
            } else if (value.length > 5) {
                this.value = value.replace(/^(\d{2})(\d{3})(\d+)$/, "$1.$2.$3");
            } else if (value.length > 2) {
                this.value = value.replace(/^(\d{2})(\d+)$/, "$1.$2");
            } else {
                this.value = value;
            }
        });
    }
    
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            // Format as (XX)XXXXX-XXXX or (XX)XXXX-XXXX
            if (value.length > 10) {
                this.value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1)$2-$3");
            } else if (value.length > 6) {
                this.value = value.replace(/^(\d{2})(\d{4})(\d+)$/, "($1)$2-$3");
            } else if (value.length > 2) {
                this.value = value.replace(/^(\d{2})(\d+)$/, "($1)$2");
            } else {
                this.value = value;
            }
        });
    }
    
    // Mutual exclusivity for checkboxes
    if (simCheckbox && naoCheckbox) {
        simCheckbox.addEventListener('change', function() {
            if (this.checked) {
                naoCheckbox.checked = false;
                document.querySelector('.texto-certificado').style.display = 'block';
                document.getElementById('upload-id').style.display = 'block';
            } else {
                document.querySelector('.texto-certificado').style.display = 'none';
                document.getElementById('upload-id').style.display = 'none';
            }
        });
        
        naoCheckbox.addEventListener('change', function() {
            if (this.checked) {
                simCheckbox.checked = false;
                document.querySelector('.texto-certificado').style.display = 'none';
                document.getElementById('upload-id').style.display = 'none';
            }
        });
        
        // Initially hide certificate upload elements
        document.querySelector('.texto-certificado').style.display = 'none';
        document.getElementById('upload-id').style.display = 'none';
    }
    
    // Multi-step form handling
    if (botaoContinuar) {
        botaoContinuar.addEventListener('click', function(e) {
            e.preventDefault();
            
            const nomeOng = document.getElementById('nome-ong').value;
            const email = document.getElementById('email').value;
            const senha = senhaInput.value;
            const confirmaSenha = confirmaSenhaInput.value;
            
            // Validate first step
            if (!nomeOng) {
                mostrarErro('Por favor, preencha o nome da ONG.');
                return;
            }
            
            if (!email || !validarEmail(email)) {
                mostrarErro('Por favor, forneça um endereço de e-mail válido.');
                return;
            }
            
            const resultadoValidacao = validarSenha(senha);
            if (!resultadoValidacao.valido) {
                let mensagemErro = 'Sua senha não atende aos requisitos:';
                if (!resultadoValidacao.temOitoDigitos) mensagemErro += '<br>- Precisa ter pelo menos 8 dígitos';
                if (!resultadoValidacao.temDoisNumeros) mensagemErro += '<br>- Precisa ter pelo menos 2 números';
                if (!resultadoValidacao.temCaracterEspecial) mensagemErro += '<br>- Precisa ter pelo menos 1 caractere especial';
                if (!resultadoValidacao.temLetraMaiuscula) mensagemErro += '<br>- Precisa ter pelo menos 1 letra MAIÚSCULA';
                
                mostrarErro(mensagemErro);
                return;
            }
            
            if (senha !== confirmaSenha) {
                mostrarErro('As senhas não coincidem. Por favor, verifique.');
                return;
            }
            
            // If validation passes, show second step
            primeiraEtapa.style.display = 'none';
            segundaEtapa.style.display = 'block';
        });
    }
    
    // Back button handling
    if (botaoVoltar) {
        botaoVoltar.addEventListener('click', function(e) {
            e.preventDefault();
            primeiraEtapa.style.display = 'block';
            segundaEtapa.style.display = 'none';
        });
    }
    
    // Final form submission
    if (botaoCadastrar) {
        botaoCadastrar.addEventListener('click', function(e) {
            e.preventDefault();
            
            const cnpj = cnpjInput ? cnpjInput.value : '';
            const telefone = telefoneInput ? telefoneInput.value : '';
            const termosAceitos = document.getElementById('termos') ? document.getElementById('termos').checked : false;
            
            if (!cnpj) {
                mostrarErro('Por favor, preencha o CNPJ da ONG.');
                return;
            }
            
            if (!telefone) {
                mostrarErro('Por favor, forneça um número de telefone.');
                return;
            }
            
            if (!termosAceitos) {
                mostrarErro('Você precisa aceitar os termos de uso e a política de privacidade para continuar.');
                return;
            }
            
            // If all validations pass, redirect to next page or submit form
            window.location.href = 'inicio2.html';
        });
    }
    
    // Error message display function
    function mostrarErro(mensagem) {
        if (erroSenhaModalBody) {
            erroSenhaModalBody.innerHTML = mensagem;
            erroSenhaModal.show();
        } else {
            alert(mensagem);
        }
    }
    
    // File upload handling
    if (uploadInput) {
        uploadInput.addEventListener('change', function() {
            const files = this.files;
            if (files.length > 0) {
                const uploadContainer = document.getElementById('upload-id');
                uploadContainer.style.backgroundImage = `url(${URL.createObjectURL(files[0])})`;
                uploadContainer.style.backgroundSize = 'cover';
                uploadContainer.style.backgroundPosition = 'center';
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const senhaInput = document.getElementById('senha');
    const confirmaSenhaInput = document.getElementById('confirma-senha');
    const botaoContinuar = document.getElementById('botao');
    
    const requisitosSecundarios = document.querySelectorAll('.requisitos-secundarios');
    const requisitoDigitos = requisitosSecundarios[0];     
    const requisitoNumeros = requisitosSecundarios[1];     
    const requisitoEspecial = requisitosSecundarios[2];    
    const requisitoMaiuscula = requisitosSecundarios[3];   
    
    if (senhaInput) {
        senhaInput.addEventListener('input', function() {
            const senha = this.value;
            const validacao = validarSenha(senha);
            
            atualizarCoresRequisitos(validacao);
        });
    }
    
    function validarSenha(senha) {
        const temOitoDigitos = senha.length >= 8;
        const temDoisNumeros = (senha.match(/\d/g) || []).length >= 2;
        const temCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
        const temLetraMaiuscula = /[A-Z]/.test(senha);
        
        return {
            valido: temOitoDigitos && temDoisNumeros && temCaracterEspecial && temLetraMaiuscula,
            temOitoDigitos,
            temDoisNumeros,
            temCaracterEspecial,
            temLetraMaiuscula
        };
    }
    
    function atualizarCoresRequisitos(validacao) {
        const corValidado = "#28a745";  
        const corPadrao = "#666";       
        
        requisitoDigitos.style.color = validacao.temOitoDigitos ? corValidado : corPadrao;
        requisitoNumeros.style.color = validacao.temDoisNumeros ? corValidado : corPadrao;
        requisitoEspecial.style.color = validacao.temCaracterEspecial ? corValidado : corPadrao;
        requisitoMaiuscula.style.color = validacao.temLetraMaiuscula ? corValidado : corPadrao;
    }
    
});     
