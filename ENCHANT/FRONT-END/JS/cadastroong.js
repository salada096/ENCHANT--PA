// Esperar que o DOM esteja totalmente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do formulário
    const senhaInput = document.getElementById('senha');
    const confirmaSenhaInput = document.getElementById('confirma-senha');
    const emailInput = document.getElementById('email');
    const botaoContinuar = document.getElementById('botao');
    const cnpjInput = document.getElementById('cnpj');
    const telefoneInput = document.getElementById('telefone');
    const mesesInput = document.getElementById('meses');
    const botaoCadastrar = document.getElementById('botao2');
    const botaoVoltar = document.getElementById('botao1');
    const primeiraParte = document.querySelector('.primeiro');
    const segundaParte = document.querySelector('.segundo');
    const senhaGrupos = document.querySelectorAll('.senha-grupo');
    
    // Adicionar ícones para mostrar/ocultar senha
    senhaGrupos.forEach(grupo => {
        const senhaInput = grupo.querySelector('input[type="password"]');
        const span = grupo.querySelector('.mostrar-senha');
        
        if (span) {
            // Adicionar ícone ao span
            span.innerHTML = '<i class="ph-eye"></i>';
            span.style.cursor = 'pointer';
            span.style.position = 'absolute';
            span.style.right = '10px';
            span.style.top = '50%';
            span.style.transform = 'translateY(-50%)';
            
            // Adicionar evento de clique para mostrar/ocultar senha
            span.addEventListener('click', function() {
                if (senhaInput.type === 'password') {
                    senhaInput.type = 'text';
                    span.innerHTML = '<i class="ph-eye-slash"></i>';
                } else {
                    senhaInput.type = 'password';
                    span.innerHTML = '<i class="ph-eye"></i>';
                }
            });
        }
    });
    
    // Configuração inicial - mostrar apenas a primeira parte
    if (primeiraParte && segundaParte) {
        primeiraParte.style.display = 'flex';
        segundaParte.style.display = 'none';
    }
    
    // Configurar upload de fotos
    const configurarUploadFotos = function() {
        const uploadContainer = document.getElementById('upload-id');
        const fileInput = document.getElementById('upload');
        
        if (uploadContainer && fileInput) {
            // Verificar se já está configurado
            if (uploadContainer.dataset.configured === 'true') {
                return;
            }
            
            // Marcar como configurado
            uploadContainer.dataset.configured = 'true';
            
            // Estilizar o container de upload
            uploadContainer.style.border = '2px dashed #ccc';
            uploadContainer.style.borderRadius = '5px';
            uploadContainer.style.padding = '20px';
            uploadContainer.style.textAlign = 'center';
            uploadContainer.style.marginBottom = '20px';
            uploadContainer.style.cursor = 'pointer';
            uploadContainer.style.transition = 'border-color 0.3s ease';
            uploadContainer.style.position = 'relative';
            uploadContainer.style.minHeight = '150px';
            
            // Adicionar ícone e texto explicativo apenas se não existir
            if (!uploadContainer.querySelector('.upload-content')) {
                const iconoTexto = document.createElement('div');
                iconoTexto.className = 'upload-content';
                iconoTexto.innerHTML = `
                    <div style="font-size: 36px; color: #888; margin-bottom: 10px;">📁</div>
                    <p style="margin: 15px 0; color: #555; font-size: 16px;">Arraste e solte certificados ou prêmios aqui</p>
                    <p style="color: #888; font-size: 14px;">Arquivos suportados: JPG, PNG, GIF</p>
                `;
                uploadContainer.appendChild(iconoTexto);
            }
            
            // Eventos para drag and drop
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                uploadContainer.addEventListener(eventName, preventDefaults, false);
            });
            
            function preventDefaults(e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            ['dragenter', 'dragover'].forEach(eventName => {
                uploadContainer.addEventListener(eventName, highlight, false);
            });
            
            ['dragleave', 'drop'].forEach(eventName => {
                uploadContainer.addEventListener(eventName, unhighlight, false);
            });
            
            function highlight() {
                uploadContainer.style.borderColor = '#4CAF50';
                uploadContainer.style.backgroundColor = '#f8fff8';
            }
            
            function unhighlight() {
                uploadContainer.style.borderColor = '#ccc';
                uploadContainer.style.backgroundColor = '';
            }
            
            // Lidar com arquivos soltos na área de drop
            uploadContainer.addEventListener('drop', (e) => {
                const dt = e.dataTransfer;
                const files = dt.files;
                fileInput.files = files;
                handleFiles(files);
            });
            
            // Abrir o seletor de arquivos ao clicar no container
            uploadContainer.addEventListener('click', () => {
                fileInput.click();
            });
            
            // Lidar com arquivos selecionados
            fileInput.addEventListener('change', (e) => {
                handleFiles(e.target.files);
            });
            
            // Função para lidar com os arquivos
            function handleFiles(files) {
                // Remover previews anteriores
                const previews = uploadContainer.querySelectorAll('.preview-image');
                previews.forEach(preview => preview.remove());
                
                // Criar container para previews se não existir
                let previewsContainer = uploadContainer.querySelector('.previews-container');
                if (!previewsContainer) {
                    previewsContainer = document.createElement('div');
                    previewsContainer.className = 'previews-container';
                    previewsContainer.style.display = 'flex';
                    previewsContainer.style.flexWrap = 'wrap';
                    previewsContainer.style.gap = '10px';
                    previewsContainer.style.marginTop = '15px';
                    uploadContainer.appendChild(previewsContainer);
                } else {
                    previewsContainer.innerHTML = '';
                }
                
                // Mostrar previews para cada arquivo
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    
                    // Verificar se é uma imagem
                    if (!file.type.match('image.*')) {
                        continue;
                    }
                    
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        // Criar elemento de imagem para preview
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.classList.add('preview-image');
                        img.style.width = '100px';
                        img.style.height = '100px';
                        img.style.objectFit = 'cover';
                        img.style.borderRadius = '5px';
                        img.style.border = '1px solid #ddd';
                        previewsContainer.appendChild(img);
                    }
                    
                    reader.readAsDataURL(file);
                }
                
                // Esconder o texto de upload quando houver arquivos
                const uploadContent = uploadContainer.querySelector('.upload-content');
                if (uploadContent && files.length > 0) {
                    uploadContent.style.display = 'none';
                } else if (uploadContent) {
                    uploadContent.style.display = 'block';
                }
            }
        }
    };
    
    // Função para mostrar o modal com mensagem personalizada
    function mostrarModal(mensagem) {
        const modalBody = document.getElementById('erroSenhaModalBody');
        if (modalBody) {
            modalBody.innerHTML = mensagem;
            
            // Inicializar e mostrar o modal do Bootstrap
            const modalElement = document.getElementById('erroSenhaModal');
            
            if (typeof bootstrap !== 'undefined') {
                const erroModal = new bootstrap.Modal(modalElement);
                erroModal.show();
            } else {
                // Fallback para jQuery se bootstrap não estiver disponível diretamente
                try {
                    $(modalElement).modal('show');
                } catch (e) {
                    // Fallback para alert caso não consiga mostrar o modal
                    alert(mensagem.replace(/<[^>]*>?/gm, ''));
                }
            }
        } else {
            // Fallback para alert caso o modal não esteja disponível no HTML
            alert(mensagem.replace(/<[^>]*>?/gm, ''));
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
        return senhaInput && confirmaSenhaInput && senhaInput.value === confirmaSenhaInput.value;
    }
    
    // Função para validar o formato do email
    function validarEmail(email) {
        // Expressão regular para validação de email
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regexEmail.test(email);
    }
    
    // Função para validar CNPJ
    function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
        
        if (cnpj.length !== 14)
            return false;
            
        // Elimina CNPJs invalidos conhecidos
        if (
            cnpj === '00000000000000' || 
            cnpj === '11111111111111' || 
            cnpj === '22222222222222' || 
            cnpj === '33333333333333' || 
            cnpj === '44444444444444' || 
            cnpj === '55555555555555' || 
            cnpj === '66666666666666' || 
            cnpj === '77777777777777' || 
            cnpj === '88888888888888' || 
            cnpj === '99999999999999'
        )
            return false;
            
        // Valida DVs
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        const digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
            
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        
        return resultado == digitos.charAt(1);
    }
    
    // Função para validar telefone
    function validarTelefone(telefone) {
        telefone = telefone.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
        
        // Verifica se tem o tamanho de um celular (11) ou telefone fixo (10)
        if (telefone.length !== 10 && telefone.length !== 11)
            return false;
            
        // Verifica se não é uma sequência repetida
        if (/^(\d)\1+$/.test(telefone))
            return false;
            
        return true;
    }

    // Adicionar evento de clique ao botão continuar
    if (botaoContinuar) {
        botaoContinuar.addEventListener('click', function(event) {
            event.preventDefault(); // Impedir o comportamento padrão do botão
            
            // Verificar se a senha atende a todos os requisitos
            const senha = senhaInput ? senhaInput.value : '';
            const validacao = validarSenha(senha);
            
            // Verificar se todos os campos estão preenchidos
            const nomeOngInput = document.getElementById('nome-ong');
            const nomeOng = nomeOngInput ? nomeOngInput.value : '';
            const email = emailInput ? emailInput.value : '';
            const confirmaSenha = confirmaSenhaInput ? confirmaSenhaInput.value : '';
            
            if (!nomeOng || !email || !senha || !confirmaSenha) {
                mostrarModal('<p>Por favor, preencha todos os campos obrigatórios!</p>');
                return;
            }
            
            // Validar formato do email
            if (!validarEmail(email)) {
                mostrarModal('<p>Por favor, insira um endereço de e-mail válido!</p>');
                if (emailInput) emailInput.focus();
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
            
            // Se passar por todas as validações, mostrar a segunda parte do formulário
            if (primeiraParte && segundaParte) {
                primeiraParte.style.display = 'none';
                segundaParte.style.display = 'flex';
                
                // Configurar o upload de fotos quando a segunda parte for exibida
                configurarUploadFotos();
                
                // Atualizar a indicação visual do passo atual
                const passos = document.querySelectorAll('.passo');
                if (passos.length >= 2) {
                    passos[0].classList.remove('ativo');
                    passos[1].classList.add('ativo');
                }
            } else {
                // Caso não encontre os elementos, usar o redirecionamento original
                window.location.href = 'cadastroong2.html';
            }
        });
    }
    
    // Adicionar evento de clique ao botão voltar
    if (botaoVoltar) {
        botaoVoltar.addEventListener('click', function(event) {
            event.preventDefault(); // Impedir o comportamento padrão do botão
            
            // Voltar para a primeira parte do formulário
            if (primeiraParte && segundaParte) {
                segundaParte.style.display = 'none';
                primeiraParte.style.display = 'flex';
                
                // Atualizar a indicação visual do passo atual
                const passos = document.querySelectorAll('.passo');
                if (passos.length >= 2) {
                    passos[1].classList.remove('ativo');
                    passos[0].classList.add('ativo');
                }
            }
        });
    }
    
    // Adicionar evento ao botão cadastrar
    if (botaoCadastrar) {
        botaoCadastrar.addEventListener('click', function(event) {
            event.preventDefault(); // Impedir o comportamento padrão do botão
            
            // Validar campos obrigatórios
            const cnpj = cnpjInput ? cnpjInput.value : '';
            const telefone = telefoneInput ? telefoneInput.value : '';
            const meses = parseInt(mesesInput ? mesesInput.value : 0) || 0;
            const termosCheckbox = document.getElementById('termos');
            
            // Verificar se os campos obrigatórios estão preenchidos
            if (!cnpj || !telefone) {
                mostrarModal('<p>Por favor, preencha o CNPJ e o telefone!</p>');
                return;
            }
            
            // Validar CNPJ
            if (!validarCNPJ(cnpj)) {
                mostrarModal('<p>Por favor, insira um CNPJ válido!</p>');
                if (cnpjInput) cnpjInput.focus();
                return;
            }
            
            // Validar telefone
            if (!validarTelefone(telefone)) {
                mostrarModal('<p>Por favor, insira um número de telefone válido!</p>');
                if (telefoneInput) telefoneInput.focus();
                return;
            }
            
            // Validar meses de criação da ONG (pelo menos 12 meses = 1 ano)
            if (meses < 12) {
                mostrarModal('<p>A ONG precisa ter pelo menos 12 meses (1 ano) de criação para se cadastrar.</p>');
                if (mesesInput) mesesInput.focus();
                return;
            }
            
            // Verificar se os termos foram aceitos
            if (termosCheckbox && !termosCheckbox.checked) {
                mostrarModal('<p>Você precisa aceitar os termos de uso e a política de privacidade!</p>');
                return;
            }
            
            // Se passar por todas as validações, redirecionar para a página de sucesso
            window.location.href = 'inicio2.html';
        });
    }

    // Validação em tempo real para mostrar visualmente os requisitos
    if (senhaInput) {
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
    }
    
    // Validação em tempo real para verificar se as senhas coincidem
    if (confirmaSenhaInput && senhaInput) {
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
    }
    
    // Validação em tempo real do email
    if (emailInput) {
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
    }
    
    // Validação em tempo real do CNPJ
    if (cnpjInput) {
        cnpjInput.addEventListener('input', function() {
            const valor = this.value.replace(/[^\d]/g, '');
            
            // Formatar o CNPJ enquanto digita (XX.XXX.XXX/XXXX-XX)
            let valorFormatado = '';
            
            if (valor.length > 0) {
                valorFormatado = valor.substring(0, 2);
                if (valor.length > 2) {
                    valorFormatado += '.' + valor.substring(2, 5);
                }
                if (valor.length > 5) {
                    valorFormatado += '.' + valor.substring(5, 8);
                }
                if (valor.length > 8) {
                    valorFormatado += '/' + valor.substring(8, 12);
                }
                if (valor.length > 12) {
                    valorFormatado += '-' + valor.substring(12, 14);
                }
            }
            
            this.value = valorFormatado;
            
            // Validar e mostrar feedback visual
            if (valor.length === 14) {
                if (validarCNPJ(valor)) {
                    this.style.borderColor = 'green';
                } else {
                    this.style.borderColor = 'red';
                }
            } else {
                this.style.borderColor = valor.length > 0 ? 'red' : '';
            }
        });
    }
    
    // Validação em tempo real do telefone
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function() {
            const valor = this.value.replace(/[^\d]/g, '');
            
            // Formatar o telefone enquanto digita (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
            let valorFormatado = '';
            
            if (valor.length > 0) {
                valorFormatado = '(' + valor.substring(0, 2);
                if (valor.length > 2) {
                    valorFormatado += ') ' + valor.substring(2, valor.length > 10 ? 7 : 6);
                }
                if (valor.length > (valor.length > 10 ? 7 : 6)) {
                    valorFormatado += '-' + valor.substring(valor.length > 10 ? 7 : 6, 11);
                }
            }
            
            this.value = valorFormatado;
            
            // Validar e mostrar feedback visual
            if (valor.length === 10 || valor.length === 11) {
                if (validarTelefone(valor)) {
                    this.style.borderColor = 'green';
                } else {
                    this.style.borderColor = 'red';
                }
            } else {
                this.style.borderColor = valor.length > 0 ? 'red' : '';
            }
        });
    }
    
    // Validação em tempo real dos meses
    if (mesesInput) {
        mesesInput.addEventListener('input', function() {
            const valor = parseInt(this.value) || 0;
            
            // Mostrar feedback visual
            if (valor >= 12) {
                this.style.borderColor = 'green';
            } else if (valor > 0) {
                this.style.borderColor = 'red';
            } else {
                this.style.borderColor = '';
            }
        });
    }
    
    // Configurar mostrar/ocultar checkboxes para certificação
    const simCheckbox = document.getElementById('elemento-escolha-1');
    const naoCheckbox = document.getElementById('elemento-escolha-2');
    const uploadContainer = document.getElementById('upload-id');
    const textoCertificado = document.querySelector('.texto-certificado');

    if (simCheckbox && naoCheckbox && uploadContainer && textoCertificado) {
        // Inicialmente ocultar a área de upload e o texto
        uploadContainer.style.display = 'none';
        textoCertificado.style.display = 'none';
        
        // Função para garantir que apenas uma checkbox esteja marcada
        function atualizarCheckboxes(checked, other) {
            if (checked.checked) {
                other.checked = false;
            }
        }
        
        simCheckbox.addEventListener('change', function() {
            atualizarCheckboxes(this, naoCheckbox);
            uploadContainer.style.display = this.checked ? 'block' : 'none';
            textoCertificado.style.display = this.checked ? 'block' : 'none';
            
            if (this.checked) {
                configurarUploadFotos();
            }
        });
        
        naoCheckbox.addEventListener('change', function() {
            atualizarCheckboxes(this, simCheckbox);
            uploadContainer.style.display = 'none';
            textoCertificado.style.display = 'none';
        });
    }
    
    // Configurar o upload de fotos inicialmente
    if (document.URL.includes('cadastroong2.html') || (segundaParte && getComputedStyle(segundaParte).display !== 'none')) {
        configurarUploadFotos();
    }
});
