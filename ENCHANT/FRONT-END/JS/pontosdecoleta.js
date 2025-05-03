document.addEventListener("DOMContentLoaded", function () {
    // Funções pré-existentes para o comportamento do site
    setupProfileDropdown();
    handleHeaderAnimation();
    handleSidebarHover();
    ensureSidebarHeight();
    
    // Setup para o Instagram e Facebook
    setupSocialMediaLinks();
    
    // Setup para o sidebar toggle
    const toggleButton = document.getElementById('icone');
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse) {
                if (window.bootstrap) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        if (navbarCollapse.classList.contains('show')) {
                            bsCollapse.hide();
                        } else {
                            bsCollapse.show();
                        }
                    } else {
                        navbarCollapse.classList.toggle('show');
                    }
                } else if ($) {
                    $(navbarCollapse).collapse('toggle');
                } else {
                    navbarCollapse.classList.toggle('show');
                    toggleButton.setAttribute('aria-expanded', navbarCollapse.classList.contains('show'));
                }
            }
        });
    }
    
    // NOVO CÓDIGO PARA PONTOS DE COLETA
    // Inicializar componentes para pontos de coleta
    setupPontosColetaFunctionality();
});

// Inicialização dos componentes para pontos de coleta
function setupPontosColetaFunctionality() {
    // Variáveis globais
    let count = 0;
    const maxItems = 9;
    let editingItemId = null;
    let originalFileName = null;
    
    // Elementos do DOM
    const addButton = document.getElementById('addButton');
    const cancelButton = document.getElementById('cancelButton');
    const inputForm = document.getElementById('inputForm');
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const localName = document.getElementById('localName');
    const openingHours = document.querySelectorAll('#openingHours')[0]; // Primeiro campo de horário (abertura)
    const closingHours = document.querySelectorAll('#openingHours')[1]; // Segundo campo de horário (fechamento)
    const address = document.getElementById('address');
    const gallery = document.getElementById('gallery');
    
    // Verificar se os elementos foram encontrados
    if (!addButton || !imageInput || !gallery) {
        console.error('Elementos necessários não encontrados no DOM');
        return;
    }
    
    // Inicializar o modal (se bootstrap estiver disponível)
    const mensagemModalElement = document.getElementById('mensagemModal');
    let mensagemModal;
    
    if (window.bootstrap && mensagemModalElement) {
        mensagemModal = new bootstrap.Modal(mensagemModalElement);
    }
    
    const mensagemModalBody = document.getElementById('mensagemModalBody');
    const mensagemModalLabel = document.getElementById('mensagemModalLabel');
    
    // Função para mostrar mensagem
    function mostrarMensagem(mensagem, tipo = 'erro') {
        if (mensagemModalBody && mensagemModalLabel) {
            mensagemModalBody.textContent = mensagem;
            
            if (tipo === 'sucesso') {
                mensagemModalLabel.textContent = 'Sucesso';
                mensagemModalLabel.style.color = '#693B11';
            } else if (tipo === 'info') {
                mensagemModalLabel.textContent = 'Informação';
                mensagemModalLabel.style.color = '#693B11';
            } else {
                mensagemModalLabel.textContent = 'Atenção';
                mensagemModalLabel.style.color = '#693B11';
            }
            
            if (mensagemModal) {
                mensagemModal.show();
            } else {
                alert(mensagem); // Fallback para navegadores sem bootstrap
            }
        } else {
            alert(mensagem); // Fallback para navegadores sem bootstrap
        }
    }
    
    // Configurar preview da imagem
    if (imageInput && imagePreview) {
        imageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                    const uploadText = document.querySelector('.upload-text');
                    if (uploadText) {
                        uploadText.style.display = 'none';
                    }
                };
                
                reader.readAsDataURL(this.files[0]);
                originalFileName = this.files[0].name;
            }
        });
    }
    
    // Limpar inputs
    function clearInputs() {
        if (imageInput) imageInput.value = '';
        if (imagePreview) {
            imagePreview.src = '#';
            imagePreview.style.display = 'none';
        }
        
        const uploadText = document.querySelector('.upload-text');
        if (uploadText) {
            uploadText.style.display = 'block';
        }
        
        if (localName) localName.value = '';
        if (openingHours) openingHours.value = '';
        if (closingHours) closingHours.value = '';
        if (address) address.value = '';
        
        editingItemId = null;
        originalFileName = null;
        
        if (addButton) addButton.textContent = 'Adicionar Item';
        if (cancelButton) cancelButton.classList.add('hidden');
    }
    
    // Adicionar evento ao botão cancelar
    if (cancelButton) {
        cancelButton.addEventListener('click', clearInputs);
    }
    
    // Adicionar ou atualizar item
    if (addButton) {
        addButton.addEventListener('click', function() {
            // Verificar modo (edição ou adição)
            if (editingItemId) {
                updateItem();
                return;
            }
            
            // Validações
            if (count >= maxItems) {
                mostrarMensagem(`Limite de ${maxItems} itens atingido!`);
                return;
            }
            
            if (!imageInput.files || !imageInput.files[0]) {
                mostrarMensagem('Por favor, selecione uma imagem.');
                return;
            }
            
            if (!localName.value.trim()) {
                mostrarMensagem('Por favor, adicione o nome do local.');
                return;
            }
            
            if (!openingHours.value.trim()) {
                mostrarMensagem('Por favor, adicione o horário de abertura.');
                return;
            }
            
            if (!closingHours.value.trim()) {
                mostrarMensagem('Por favor, adicione o horário de fechamento.');
                return;
            }
            
            if (!address.value.trim()) {
                mostrarMensagem('Por favor, adicione o endereço.');
                return;
            }
            
            // Criar ID único
            const itemId = 'item-' + Date.now();
            
            // Nome do arquivo
            const fileName = imageInput.files[0].name;
            
            // Criar elemento de galeria
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.id = itemId;
            
            // Criar imagem
            const img = document.createElement('img');
            img.src = URL.createObjectURL(imageInput.files[0]);
            
            // Criar container de info
            const infoDiv = document.createElement('div');
            infoDiv.className = 'gallery-info';
            
            // Nome do local
            const localSection = document.createElement('div');
            localSection.className = 'info-section';
            
            const localLabel = document.createElement('div');
            localLabel.className = 'info-label';
            localLabel.textContent = 'Local:';
            
            const localValue = document.createElement('div');
            localValue.className = 'local-value';
            localValue.textContent = localName.value;
            
            localSection.appendChild(localLabel);
            localSection.appendChild(localValue);
            
            // Horário de abertura
            const hoursSection = document.createElement('div');
            hoursSection.className = 'info-section';
            
            const hoursLabel = document.createElement('div');
            hoursLabel.className = 'info-label';
            hoursLabel.textContent = 'Horário em que abre:';
            
            const hoursValue = document.createElement('div');
            hoursValue.className = 'hours-value';
            hoursValue.textContent = openingHours.value;
            
            hoursSection.appendChild(hoursLabel);
            hoursSection.appendChild(hoursValue);
            
            // Horário de fechamento
            const closingHoursSection = document.createElement('div');
            closingHoursSection.className = 'info-section';
            
            const closingHoursLabel = document.createElement('div');
            closingHoursLabel.className = 'info-label';
            closingHoursLabel.textContent = 'Horário em que fecha:';
            
            const closingHoursValue = document.createElement('div');
            closingHoursValue.className = 'closing-hours-value';
            closingHoursValue.textContent = closingHours.value;
            
            closingHoursSection.appendChild(closingHoursLabel);
            closingHoursSection.appendChild(closingHoursValue);
            
            // Endereço
            const addressSection = document.createElement('div');
            addressSection.className = 'info-section';
            
            const addressLabel = document.createElement('div');
            addressLabel.className = 'info-label';
            addressLabel.textContent = 'Endereço:';
            
            const addressValue = document.createElement('div');
            addressValue.className = 'address-value';
            addressValue.textContent = address.value;
            
            addressSection.appendChild(addressLabel);
            addressSection.appendChild(addressValue);
            
            // Adicionar seções ao container de info
            infoDiv.appendChild(localSection);
            infoDiv.appendChild(hoursSection);
            infoDiv.appendChild(closingHoursSection);
            infoDiv.appendChild(addressSection);
            
            // Botões de ação
            const actionButtons = document.createElement('div');
            actionButtons.className = 'action-buttons';
            
            const editButton = document.createElement('button');
            editButton.className = 'edit-btn';
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', function() {
                editItem(itemId);
            });
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-btn';
            deleteButton.textContent = 'Excluir';
            deleteButton.addEventListener('click', function() {
                deleteItem(itemId);
            });
            
            actionButtons.appendChild(editButton);
            actionButtons.appendChild(deleteButton);
            
            // Montar o item completo
            galleryItem.appendChild(img);
            galleryItem.appendChild(infoDiv);
            galleryItem.appendChild(actionButtons);
            
            // Armazenar nome do arquivo
            galleryItem.dataset.fileName = fileName;
            
            // Adicionar à galeria
            gallery.appendChild(galleryItem);
            
            // Atualizar contagem
            count++;
            const countDisplay = document.getElementById('count');
            if (countDisplay) {
                countDisplay.textContent = count;
            }
            
            // Limpar inputs
            clearInputs();
            
            // Mensagem de sucesso
            mostrarMensagem('Item adicionado com sucesso!', 'sucesso');
            
            // Verificar limite
            if (count >= maxItems) {
                mostrarMensagem(`Limite de ${maxItems} itens atingido!`, 'info');
                addButton.disabled = true;
            }
        });
    }
    
    // Função para editar item
    function editItem(itemId) {
        const galleryItem = document.getElementById(itemId);
        
        if (!galleryItem) {
            return;
        }
        
        // Salvar ID do item em edição
        editingItemId = itemId;
        
        // Obter valores atuais
        const localValue = galleryItem.querySelector('.local-value').textContent;
        const hoursValue = galleryItem.querySelector('.hours-value').textContent;
        const closingHoursValue = galleryItem.querySelector('.closing-hours-value').textContent;
        const addressValue = galleryItem.querySelector('.address-value').textContent;
        const currentImageSrc = galleryItem.querySelector('img').src;
        
        // Armazenar nome do arquivo
        originalFileName = galleryItem.dataset.fileName;
        
        // Preencher formulário
        localName.value = localValue;
        openingHours.value = hoursValue;
        closingHours.value = closingHoursValue;
        address.value = addressValue;
        
        // Mostrar imagem atual
        imagePreview.src = currentImageSrc;
        imagePreview.style.display = 'block';
        
        const uploadText = document.querySelector('.upload-text');
        if (uploadText) {
            uploadText.style.display = 'none';
        }
        
        // Scroll para o formulário
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Mudar botão para Atualizar
        addButton.textContent = 'Atualizar Item';
        
        // Mostrar botão cancelar
        cancelButton.classList.remove('hidden');
        
        // Mensagem informativa
        mostrarMensagem('Editando item. Selecione uma nova imagem ou deixe em branco para manter a atual.', 'info');
    }
    
    // Função para atualizar um item
    function updateItem() {
        // Validações
        if (!localName.value.trim()) {
            mostrarMensagem('Por favor, adicione o nome do local.');
            return;
        }
        
        if (!openingHours.value.trim()) {
            mostrarMensagem('Por favor, adicione o horário de abertura.');
            return;
        }
        
        if (!closingHours.value.trim()) {
            mostrarMensagem('Por favor, adicione o horário de fechamento.');
            return;
        }
        
        if (!address.value.trim()) {
            mostrarMensagem('Por favor, adicione o endereço.');
            return;
        }
        
        // Obter o item
        const galleryItem = document.getElementById(editingItemId);
        
        if (!galleryItem) {
            return;
        }
        
        // Atualizar valores
        galleryItem.querySelector('.local-value').textContent = localName.value;
        galleryItem.querySelector('.hours-value').textContent = openingHours.value;
        galleryItem.querySelector('.closing-hours-value').textContent = closingHours.value;
        galleryItem.querySelector('.address-value').textContent = address.value;
        
        // Atualizar imagem se necessário
        if (imageInput.files && imageInput.files[0]) {
            const newFileName = imageInput.files[0].name;
            galleryItem.querySelector('img').src = URL.createObjectURL(imageInput.files[0]);
            galleryItem.dataset.fileName = newFileName;
        }
        
        // Limpar formulário
        clearInputs();
        
        // Mensagem de sucesso
        mostrarMensagem('Item atualizado com sucesso!', 'sucesso');
    }
    
    // Função para excluir um item
    function deleteItem(itemId) {
        // Confirmar exclusão
        if (!confirm('Tem certeza que deseja excluir este item?')) {
            return;
        }
        
        // Obter o item
        const galleryItem = document.getElementById(itemId);
        
        if (!galleryItem) {
            return;
        }
        
        // Remover da galeria
        galleryItem.remove();
        
        // Atualizar contagem
        count--;
        const countDisplay = document.getElementById('count');
        if (countDisplay) {
            countDisplay.textContent = count;
        }
        
        // Se estava editando este item, limpar
        if (editingItemId === itemId) {
            clearInputs();
        }
        
        // Reabilitar botão se estava desabilitado
        if (addButton.disabled) {
            addButton.disabled = false;
        }
        
        // Mensagem de sucesso
        mostrarMensagem('Item excluído com sucesso!', 'sucesso');
    }
}

// Funções pré-existentes reformuladas para melhor organização
function setupProfileDropdown() {
    const usuarioBtn = document.getElementById("usuario");
    const dropdownMenu = document.getElementById("dropzinho");
   
    if (!usuarioBtn || !dropdownMenu) return;
   
    // Verifica se estamos em dispositivo móvel
    const isMobile = window.innerWidth <= 768;
   
    if (isMobile) {
        // No mobile, o dropdown aparece com clique
        usuarioBtn.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
        });
       
        // Fecha ao clicar fora
        document.addEventListener("click", function(e) {
            if (!usuarioBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.style.display = "none";
            }
        });
    } else {
        // Em desktop, mostra ao passar o mouse
        usuarioBtn.addEventListener("mouseenter", function() {
            dropdownMenu.style.display = "block";
        });
       
        const profileDropdown = document.querySelector(".profile-dropdown");
        if (profileDropdown) {
            profileDropdown.addEventListener("mouseleave", function() {
                dropdownMenu.style.display = "none";
            });
        }
       
        usuarioBtn.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
        });
    }
   
    // Adicionar evento de clique nos itens do dropdown
    const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            dropdownMenu.style.display = "none";
        });
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const body = document.body;

    if (!sidebar) return;

    sidebar.classList.toggle("open");
    body.classList.toggle("sidebar-open");

    let overlay = document.getElementById("sidebar-overlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "sidebar-overlay";
        overlay.style.display = "none";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.right = "0";
        overlay.style.bottom = "0";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        overlay.style.zIndex = "650";
        document.body.appendChild(overlay);

        overlay.addEventListener("click", function () {
            toggleSidebar();
        });
    }

    if (sidebar.classList.contains("open")) {
        overlay.style.display = "block";
        document.body.style.overflow = "hidden";

        const imgHeader = document.getElementById("imgheader");
        if (imgHeader) {
            imgHeader.style.visibility = "visible";
            imgHeader.style.opacity = "1";
        }
    } else {
        overlay.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

function createModalOverlay() {
    let modalOverlay = document.getElementById("modal-overlay");
    if (!modalOverlay) {
        modalOverlay = document.createElement("div");
        modalOverlay.id = "modal-overlay";
        modalOverlay.style.display = "none";
        modalOverlay.style.position = "fixed";
        modalOverlay.style.top = "0";
        modalOverlay.style.left = "0";
        modalOverlay.style.right = "0";
        modalOverlay.style.bottom = "0";
        modalOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        modalOverlay.style.zIndex = "1000";
        document.body.appendChild(modalOverlay);
    }
    return modalOverlay;
}

function handleHeaderAnimation() {
    const header = document.getElementById("header");

    if (header) {
        header.style.transition = window.innerWidth <= 768 ? "none" : "all 0.3s ease-in-out";
    }
}

function handleSidebarHover() {
    const sidebar = document.getElementById("sidebar");
    const body = document.body;
    const imgHeader = document.getElementById("imgheader");

    if (!sidebar) return;

    // Remover listeners existentes
    const oldMouseEnter = sidebar._mouseenterListener;
    const oldMouseLeave = sidebar._mouseleaveListener;
    
    if (oldMouseEnter) {
        sidebar.removeEventListener("mouseenter", oldMouseEnter);
    }
    
    if (oldMouseLeave) {
        sidebar.removeEventListener("mouseleave", oldMouseLeave);
    }
    
    // Verificar se é tablet ou desktop
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 992;
    
    if (!isTablet && window.innerWidth > 768) {
        const mouseenterListener = function() {
            body.classList.add("sidebar-expanded");
            
            if (imgHeader) {
                imgHeader.style.visibility = "visible";
                imgHeader.style.opacity = "1";
            }
        };
        
        const mouseleaveListener = function() {
            body.classList.remove("sidebar-expanded");
        };
        
        sidebar.addEventListener("mouseenter", mouseenterListener);
        sidebar.addEventListener("mouseleave", mouseleaveListener);
        
        sidebar._mouseenterListener = mouseenterListener;
        sidebar._mouseleaveListener = mouseleaveListener;
    }
    // Em tablets, sempre manter o botão de upload visível
    else if (isTablet && imgHeader) {
        imgHeader.style.visibility = "visible";
        imgHeader.style.opacity = "1";
    }
}

function ensureSidebarHeight() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar && window.innerWidth <= 768) {
        const docHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );

        sidebar.style.height = Math.max(docHeight, window.innerHeight) + "px";
    }
}

function setupSocialMediaLinks() {
    // Setup para botões de rede social
    const instagramBtn = document.getElementById("botao");
    const instagramCaixa = document.getElementById("caixa-principal");
    const instagramSairBtn = document.getElementById("botao-sair");
    const modalOverlay = createModalOverlay();
    
    // Instagram
    if (instagramBtn && instagramCaixa && instagramSairBtn) {
        instagramBtn.addEventListener("click", () => {
            instagramCaixa.style.display = "flex";
            modalOverlay.style.display = "block";
            document.body.style.overflow = "hidden";
        });
        
        instagramSairBtn.addEventListener("click", () => {
            instagramCaixa.style.display = "none";
            modalOverlay.style.display = "none";
            document.body.style.overflow = "auto";
        });
    }
    
    // Facebook
    const facebookBtn = document.getElementById("facebook");
    const facebookCaixa = document.getElementById("caixa-principal2");
    const facebookSairBtn = document.getElementById("botao-sair2");
    
    if (facebookBtn && facebookCaixa && facebookSairBtn) {
        facebookBtn.addEventListener("click", () => {
            facebookCaixa.style.display = "flex";
            modalOverlay.style.display = "block";
            document.body.style.overflow = "hidden";
        });
        
        facebookSairBtn.addEventListener("click", () => {
            facebookCaixa.style.display = "none";
            modalOverlay.style.display = "none";
            document.body.style.overflow = "auto";
        });
    }
    
    // Setup para botão de edição do Instagram
    const editarInstagramBtn = document.getElementById("editarLink");
    if (editarInstagramBtn) {
        editarInstagramBtn.addEventListener("click", function() {
            const instagramInput = document.getElementById("instagram");
            const instagramLinkContainer = document.getElementById("linkContainer");
            const instagramConfirmarBtn = document.getElementById("botaocaixa");
            
            if (instagramInput) instagramInput.style.display = "block";
            if (instagramConfirmarBtn) instagramConfirmarBtn.style.display = "block";
            if (instagramLinkContainer) instagramLinkContainer.innerHTML = "";
            editarInstagramBtn.style.display = "none";
        });
    }
    
    // Setup para botão de edição do Facebook
    const editarFacebookBtn = document.getElementById("editarLink2");
    if (editarFacebookBtn) {
        editarFacebookBtn.addEventListener("click", function() {
            const facebookInput = document.getElementById("facebook2");
            const facebookLinkContainer = document.getElementById("linkContainer2");
            const facebookConfirmarBtn = document.getElementById("botaocaixa2");
            
            if (facebookInput) facebookInput.style.display = "block";
            if (facebookConfirmarBtn) facebookConfirmarBtn.style.display = "block";
        })}};
