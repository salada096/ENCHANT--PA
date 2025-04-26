const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const img4 = document.getElementById("img4");
const moveisSection = document.getElementById("moveis");
const eletroSection = document.getElementById("eletro");
const btnAvancar = document.getElementById("bottao");
const btnVoltar = document.getElementById("bbotao"); // Vamos mudar o texto mas manter o estilo
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

// Function to check if any field in a form section is filled
function isFormSectionFilled(formId) {
    const formSection = document.getElementById(formId);
    const inputs = formSection.querySelectorAll('input, select');
    
    for (let input of inputs) {
        if (input.tagName === 'SELECT') {
            if (input.selectedIndex > 0) return true;
        } else {
            if (input.value.trim() !== '') return true;
        }
    }
    
    return false;
}

// Function to handle form submission
function handleSubmit() {
    // Check if at least one section has been filled
    const moveisFilled = isFormSectionFilled('moveis');
    const eletroFilled = isFormSectionFilled('eletro');
    
    if (moveisFilled || eletroFilled) {
        // Show success image and modal
        img1.style.display = "none";
        img2.style.display = "block";
        confirmModal.show();
    } else {
        // Show error modal
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
