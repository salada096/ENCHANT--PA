const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const img4 = document.getElementById("img4");
const comidaSection = document.getElementById("comida");
const petSection = document.getElementById("pet");
const btnAvancar = document.getElementById("bottao");
const btnVoltar = document.getElementById("bbotao");
const btnBackToRoupas = document.getElementById("back-to-roupas");
const comidaTab = document.getElementById("comida-tab");
const petTab = document.getElementById("pets-tab");

// O botão de enviar na seção de comida é "bbotao" e na seção de pet é "bbtn"
const btnEnviarComida = document.getElementById("bbotao");
const btnEnviarPet = document.getElementById("bbtn");

// Modificar o input de data para aceitar texto (múltiplas datas)
const validadeInput = document.getElementById("alimentovalidade");
if (validadeInput) {
    // Alterar o tipo do input de 'date' para 'text'
    validadeInput.type = "text";
    validadeInput.placeholder = "Ex: 10/05/2025, 15/06/2025";
    
    // Remover quaisquer atributos min ou max que possam limitar a entrada
    validadeInput.removeAttribute("min");
}

// Inicializando os modais do Bootstrap
const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));

// Botões de fechar modais
document.getElementById("closeConfirmModal").addEventListener("click", () => {
    confirmModal.hide();
});

document.getElementById("closeErrorModal").addEventListener("click", () => {
    errorModal.hide();
});

// Botões fechar no "×"
document.querySelectorAll(".btn-close").forEach(button => {
    button.addEventListener("click", (e) => {
        const modalEl = e.target.closest('.modal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
    });
});

// Function to show food section
function showComida() {
    comidaSection.style.display = "block";
    petSection.style.display = "none";
    img1.style.display = "block";
    img2.style.display = "none";
    img3.style.display = "none";
    img4.style.display = "none";
    
    // Update active tab
    comidaTab.classList.add("active");
    petTab.classList.remove("active");
}

// Function to show pets section
function showPets() {
    comidaSection.style.display = "none";
    petSection.style.display = "block";
    
    // Update active tab
    comidaTab.classList.remove("active");
    petTab.classList.add("active");
}

// Function to check if ALL fields in a form section are filled
function isFormSectionComplete(formId) {
    const formSection = document.getElementById(formId);
    const inputs = formSection.querySelectorAll('input, select');
    
    for (let input of inputs) {
        // Skip hidden inputs or inputs with type="hidden"
        if (input.type === 'hidden' || getComputedStyle(input).display === 'none') {
            continue;
        }
        
        // Verificar campos de formulário específicos
        if (formId === 'comida') {
            // Na seção de alimentos, verificar: tipo, quantidade, validade, especificação
            if (input.id === 'alimntostipo' || input.id === 'alimentosquantidade' || 
                input.id === 'alimentovalidade' || input.id === 'alimentosespecificações') {
                if (input.tagName === 'SELECT') {
                    if (input.selectedIndex <= 0) return false;
                } else {
                    if (input.value.trim() === '') return false;
                }
            }
        } else if (formId === 'pet') {
            // Na seção de pets, verificar: tamanho, tipo, quantidade, animal
            if (input.id === 'tamanhoracao' || input.id === 'Tiporacao' || 
                input.id === 'racaoquantidade' || input.id === 'racaoespecificao') {
                if (input.tagName === 'SELECT') {
                    if (input.selectedIndex <= 0) return false;
                } else {
                    if (input.value.trim() === '') return false;
                }
            }
        }
    }
    
    return true; // All fields are filled
}

// Function to handle form submission
function handleSubmit() {
    // Determinar qual seção está atualmente visível
    const isComidaVisible = comidaSection.style.display === "block" || comidaSection.style.display === "";
    const isPetVisible = petSection.style.display === "block";
    
    // Verificar apenas a seção visível
    let formIsValid = false;
    
    if (isComidaVisible) {
        formIsValid = isFormSectionComplete('comida');
    } else if (isPetVisible) {
        formIsValid = isFormSectionComplete('pet');
    }
    
    if (formIsValid) {
        // Show success image and modal
        img1.style.display = "none";
        img2.style.display = "block";
        img3.style.display = "none";
        img4.style.display = "none";
        confirmModal.show();
        
        // Opcional: Resetar os campos do formulário após submissão bem-sucedida
        resetFormFields(isComidaVisible ? 'comida' : 'pet');
    } else {
        // Show error modal with specific message
        const errorMessageElement = document.querySelector("#errorModalBody p");
        if (errorMessageElement) {
            errorMessageElement.textContent = "Por favor, preencha todos os campos da seção atual (Alimentos ou Ração para Animais).";
        }
        errorModal.show();
    }
}

// Function to reset form fields after successful submission
function resetFormFields(formId) {
    const formSection = document.getElementById(formId);
    const inputs = formSection.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        if (input.tagName === 'SELECT') {
            input.selectedIndex = 0;
        } else {
            input.value = '';
        }
    });
}

// Event listeners para navegação
btnAvancar.addEventListener("click", showPets);
btnBackToRoupas.addEventListener("click", showComida); // Botão "Voltar" na seção Pet volta para Comida

// Event listeners para envio do formulário - adicionamos aos botões específicos
// Na seção de comida, o botão "Enviar" é o "bbotao"
btnEnviarComida.addEventListener("click", handleSubmit);

// Na seção de pet, o botão "Enviar" é o "bbtn"
btnEnviarPet.addEventListener("click", handleSubmit);

// Tab button event listeners
comidaTab.addEventListener("click", showComida);
petTab.addEventListener("click", showPets);

// Initialize the page
showComida();
