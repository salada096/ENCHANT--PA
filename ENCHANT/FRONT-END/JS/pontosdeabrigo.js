   let count = 0;
        const maxItems = 9;
        const addButton = document.getElementById('addButton');
        const cancelButton = document.getElementById('cancelButton');
        const imageInput = document.getElementById('imageInput');
        const imagePreview = document.getElementById('imagePreview');
        const localName = document.getElementById('localName');
        const openingHours = document.getElementById('openingHours');
        const address = document.getElementById('address');
        const gallery = document.getElementById('gallery');
        const countDisplay = document.getElementById('count');
        
        // Inicializar o modal de mensagens
        const mensagemModal = new bootstrap.Modal(document.getElementById('mensagemModal'));
        const mensagemModalBody = document.getElementById('mensagemModalBody');
        const mensagemModalLabel = document.getElementById('mensagemModalLabel');
        
        // Função para mostrar mensagem no modal
        function mostrarMensagem(mensagem, tipo = 'erro') {
            mensagemModalBody.textContent = mensagem;
            
            // Configurar o título e as classes de acordo com o tipo de mensagem
            if (tipo === 'sucesso') {
                mensagemModalLabel.textContent = 'Sucesso';
                mensagemModalLabel.className = 'modal-title';
                mensagemModalLabel.style.color = '#693B11';
            } else if (tipo === 'info') {
                mensagemModalLabel.textContent = 'Informação';
                mensagemModalLabel.className = 'modal-title';
                mensagemModalLabel.style.color = '#693B11';
            } else {
                mensagemModalLabel.textContent = 'Atenção';
                mensagemModalLabel.className = 'modal-title';
                mensagemModalLabel.style.color = '#693B11';
            }
            
            mensagemModal.show();
        }


        
        // Variável para armazenar o ID do item em edição
        let editingItemId = null;
        // Armazenar o nome do arquivo original durante a edição
        let originalFileName = null;
        
        // Função para mostrar preview da imagem
        imageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                    document.querySelector('.upload-text').style.display = 'none';
                }
                
                reader.readAsDataURL(this.files[0]);
                // Armazenar o nome do arquivo original
                originalFileName = this.files[0].name;
            }
        });

        // Função para limpar os campos de entrada
        function clearInputs() {
            imageInput.value = '';
            imagePreview.src = '#';
            imagePreview.style.display = 'none';
            document.querySelector('.upload-text').style.display = 'block';
            localName.value = '';
            openingHours.value = '';
            address.value = '';
            editingItemId = null;
            originalFileName = null;
            addButton.textContent = 'Adicionar Item';
            cancelButton.classList.add('hidden');
        }

        // Adicionar ouvinte de eventos para o botão cancelar
        cancelButton.addEventListener('click', clearInputs);

        // Função para adicionar ou atualizar um item
        addButton.addEventListener('click', function() {
            // Verificar se está no modo de edição ou adição
            if (editingItemId) {
                updateItem();
                return;
            }
            
            // Verificar se já atingiu o limite
            if (count >= maxItems) {
                mostrarMensagem(`Limite de ${maxItems} itens atingido!`);
                return;
            }
            
            // Verificar se uma imagem foi selecionada
            if (!imageInput.files || !imageInput.files[0]) {
                mostrarMensagem('Por favor, selecione uma imagem.');
                return;
            }
            
            // Verificar se os campos foram preenchidos
            if (!localName.value.trim()) {
                mostrarMensagem('Por favor, adicione o nome do local.');
                return;
            }
            
            if (!openingHours.value.trim()) {
                mostrarMensagem('Por favor, adicione o horário de funcionamento.');
                return;
            }
            
            if (!address.value.trim()) {
                mostrarMensagem('Por favor, adicione o endereço.');
                return;
            }

            // Criar um identificador único para o item
            const itemId = 'item-' + Date.now();
            
            // Obter o nome do arquivo da imagem
            const fileName = imageInput.files[0].name;
            
            // Criar um novo item da galeria
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.id = itemId;
            
            // Criar a imagem
            const img = document.createElement('img');
            img.src = URL.createObjectURL(imageInput.files[0]);
            
            // Criar o contêiner para as informações
            const infoDiv = document.createElement('div');
            infoDiv.className = 'gallery-info';
            
            // Adicionar as seções de informação
            // Nome do Local
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
            
            // Horário de Funcionamento
            const hoursSection = document.createElement('div');
            hoursSection.className = 'info-section';
            
            const hoursLabel = document.createElement('div');
            hoursLabel.className = 'info-label';
            hoursLabel.textContent = 'Horário de Funcionamento:';
            
            const hoursValue = document.createElement('div');
            hoursValue.className = 'hours-value';
            hoursValue.textContent = openingHours.value;
            
            hoursSection.appendChild(hoursLabel);
            hoursSection.appendChild(hoursValue);
            
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
            
            // Nome do arquivo
          
            // Adicionar todas as seções ao contêiner de informações
            infoDiv.appendChild(localSection);
            infoDiv.appendChild(hoursSection);
            infoDiv.appendChild(addressSection);
            
            
            // Criar botões de ação (editar e excluir)
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
            
            // Adicionar imagem, informações e botões de ação ao item da galeria
            galleryItem.appendChild(img);
            galleryItem.appendChild(infoDiv);
            galleryItem.appendChild(actionButtons);
            
            // Armazenar o nome do arquivo no dataset do item
            galleryItem.dataset.fileName = fileName;
            
            // Adicionar o item ao contêiner da galeria
            gallery.appendChild(galleryItem);
            
            // Incrementar a contagem e atualizar o display
            count++;
            countDisplay.textContent = count;
            
            // Limpar os campos de entrada
            clearInputs();
            
            // Mostrar mensagem de sucesso
            mostrarMensagem('Item adicionado com sucesso!', 'sucesso');
            
            // Verificar se atingiu o limite após adicionar
            if (count >= maxItems) {
                mostrarMensagem(`Limite de ${maxItems} itens atingido!`, 'info');
                addButton.disabled = true;
            }
        });
        
        // Função para editar um item
        function editItem(itemId) {
            // Obter o item da galeria pelo ID
            const galleryItem = document.getElementById(itemId);
            
            if (!galleryItem) {
                return;
            }
            
            // Armazenar o ID do item em edição
            editingItemId = itemId;
            
            // Obter os valores atuais do item
            const localValue = galleryItem.querySelector('.local-value').textContent;
            const hoursValue = galleryItem.querySelector('.hours-value').textContent;
            const addressValue = galleryItem.querySelector('.address-value').textContent;
            const currentImageSrc = galleryItem.querySelector('img').src;
            
            // Armazenar o nome do arquivo original
            originalFileName = galleryItem.dataset.fileName;
            
            // Preencher o formulário com os valores atuais
            localName.value = localValue;
            openingHours.value = hoursValue;
            address.value = addressValue;
            
            // Mostrar a imagem atual no preview
            imagePreview.src = currentImageSrc;
            imagePreview.style.display = 'block';
            document.querySelector('.upload-text').style.display = 'none';
            
            // Rolar para o topo onde está o formulário
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Mudar o texto do botão para "Atualizar"
            addButton.textContent = 'Atualizar Item';
            
            // Mostrar botão de cancelar
            cancelButton.classList.remove('hidden');
            
            // Exibir mensagem informativa
            mostrarMensagem('Editando item. Selecione uma nova imagem ou deixe em branco para manter a atual.', 'info');
        }
        
        // Função para atualizar um item após a edição
        function updateItem() {
            // Verificar se os campos foram preenchidos
            if (!localName.value.trim()) {
                mostrarMensagem('Por favor, adicione o nome do local.');
                return;
            }
            
            if (!openingHours.value.trim()) {
                mostrarMensagem('Por favor, adicione o horário de funcionamento.');
                return;
            }
            
            if (!address.value.trim()) {
                mostrarMensagem('Por favor, adicione o endereço.');
                return;
            }
            
            // Obter o item da galeria pelo ID
            const galleryItem = document.getElementById(editingItemId);
            
            if (!galleryItem) {
                return;
            }
            
            // Atualizar os valores do item
            galleryItem.querySelector('.local-value').textContent = localName.value;
            galleryItem.querySelector('.hours-value').textContent = openingHours.value;
            galleryItem.querySelector('.address-value').textContent = address.value;
            
            // Atualizar a imagem e o nome do arquivo se uma nova foi selecionada
            if (imageInput.files && imageInput.files[0]) {
                const newFileName = imageInput.files[0].name;
                galleryItem.querySelector('img').src = URL.createObjectURL(imageInput.files[0]);
                galleryItem.dataset.fileName = newFileName;
            }
            
            // Limpar os campos e redefinir o estado
            clearInputs();
            
            // Exibir mensagem de sucesso
            mostrarMensagem('Item atualizado com sucesso!', 'sucesso');
        }
        
        // Função para excluir um item
        function deleteItem(itemId) {
            // Confirmar antes de excluir
            if (!confirm('Tem certeza que deseja excluir este item?')) {
                return;
            }
            
            // Obter o item da galeria pelo ID
            const galleryItem = document.getElementById(itemId);
            
            if (!galleryItem) {
                return;
            }
            
            // Remover o item da galeria
            galleryItem.remove();
            
            // Decrementar a contagem e atualizar o display
            count--;
            countDisplay.textContent = count;
            
            // Se estava editando este item, limpar o formulário
            if (editingItemId === itemId) {
                clearInputs();
            }
            
            // Se havia atingido o limite antes, habilitar o botão novamente
            if (addButton.disabled) {
                addButton.disabled = false;
            }
            
            // Exibir mensagem de sucesso
            mostrarMensagem('Item excluído com sucesso!', 'sucesso');
        }

        
