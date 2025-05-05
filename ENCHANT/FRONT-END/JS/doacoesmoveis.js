const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const img4 = document.getElementById("img4");
const moveisSection = document.getElementById("moveis");
const eletroSection = document.getElementById("eletro");
const btnAvancar = document.getElementById("bottao");
const btnVoltar = document.getElementById("bbotao");
// Vamos mudar o texto mas manter o estilo
const btnEnviar = document.getElementById("bbtn");
const btnBackToRoupas = document.getElementById("back-to-roupas");
const moveisTab = document.getElementById("moveis-tab");
const eletroTab = document.getElementById("eletro-tab");

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

// Function to show clothes section
function showMoveis() {
    moveisSection.style.display = "block";
    eletroSection.style.display = "none";
    img1.style.display = "block";
    img2.style.display = "none";
    img3.style.display = "none";
    img4.style.display = "none";
    
    // Update active tab
    moveisTab.classList.add("active");
    eletroTab.classList.remove("active");
}

// Function to show shoes section
function showEletro() {
    moveisSection.style.display = "none";
    eletroSection.style.display = "block";
    
    // Update active tab
    moveisTab.classList.remove("active");
    eletroTab.classList.add("active");
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
        
        if (input.tagName === 'SELECT') {
            if (input.selectedIndex <= 0) return false;
        } else {
            if (input.value.trim() === '') return false;
        }
    }
    
    return true; // All fields are filled
}

// Function to handle form submission
function handleSubmit() {
    // Check if all fields in at least one section have been filled
    const moveisComplete = isFormSectionComplete('moveis');
    const eletroComplete = isFormSectionComplete('eletro');
    
    if (moveisComplete || eletroComplete) {
        // Show success image and modal
        img1.style.display = "none";
        img2.style.display = "block";
        confirmModal.show();
    } else {
        // Show error modal with specific message
        const errorMessageElement = document.getElementById('errorMessage');
        if (errorMessageElement) {
            errorMessageElement.textContent = "Por favor, preencha todos os campos de pelo menos uma seção (Móveis ou Eletrodomésticos).";
        }
        errorModal.show();
    }
}

// Note: O HTML já tem o texto como "Enviar" para o btnVoltar (não precisamos mudar o texto)
// btnVoltar.textContent = "Enviar"; (o texto já está como "Enviar" no HTML)

// Update event listeners
btnVoltar.removeEventListener("click", showMoveis); // Remove funcionalidade antiga
btnVoltar.addEventListener("click", handleSubmit); // Adiciona nova funcionalidade de envio
btnEnviar.addEventListener("click", handleSubmit);
btnAvancar.addEventListener("click", showEletro);
btnBackToRoupas.addEventListener("click", showMoveis);

// Tab button event listeners
moveisTab.addEventListener("click", showMoveis);
eletroTab.addEventListener("click", showEletro);

// Initialize the page
showMoveis();
