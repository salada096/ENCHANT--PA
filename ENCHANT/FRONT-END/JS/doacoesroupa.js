const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const img4 = document.getElementById("img4");
const roupasSection = document.getElementById("roupas");
const calcadosSection = document.getElementById("calcados");
const btnAvancar = document.getElementById("bottao");
const btnVoltar = document.getElementById("bbotao");
const btnEnviar = document.getElementById("bbtn");
const btnBackToRoupas = document.getElementById("back-to-roupas");
const roupasTab = document.getElementById("roupas-tab");
const calcadosTab = document.getElementById("calcados-tab");

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
function showRoupas() {
    roupasSection.style.display = "block";
    calcadosSection.style.display = "none";
    img1.style.display = "block";
    img2.style.display = "none";
    img3.style.display = "none";
    img4.style.display = "none";
    
    // Update active tab
    roupasTab.classList.add("active");
    calcadosTab.classList.remove("active");
}

// Function to show shoes section
function showCalcados() {
    roupasSection.style.display = "none";
    calcadosSection.style.display = "block";
    
    // Update active tab
    roupasTab.classList.remove("active");
    calcadosTab.classList.add("active");
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
    const roupasFilled = isFormSectionFilled('roupas');
    const calcadosFilled = isFormSectionFilled('calcados');
    
    if (roupasFilled || calcadosFilled) {
        // Show success image and modal
        img1.style.display = "none";
        img2.style.display = "block";
        confirmModal.show();
    } else {
        // Show error modal
        errorModal.show();
    }
}

// Event listeners
btnAvancar.addEventListener("click", showCalcados);
btnBackToRoupas.addEventListener("click", handleSubmit); // Alterado para acionar a submissão em vez de voltar
btnVoltar.addEventListener("click", handleSubmit); // Alterado para acionar a submissão

// Tab button event listeners
roupasTab.addEventListener("click", showRoupas);
calcadosTab.addEventListener("click", showCalcados);

// Submit form event
btnEnviar.addEventListener("click", handleSubmit);

// Initialize the page
showRoupas();
