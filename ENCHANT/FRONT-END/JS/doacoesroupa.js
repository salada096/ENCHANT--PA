const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const img4 = document.getElementById("img4");
const roupasSection = document.getElementById("roupas");
const calcadosSection = document.getElementById("calcados");
const btnAvancar = document.getElementById("bottao");
const btnVoltar = document.getElementById("bbotao");
const roupasTab = document.getElementById("roupas-tab");
const calcadosTab = document.getElementById("calcados-tab");

// O problema é que existem DOIS botões com o mesmo ID "bbtn" no seu HTML!
// Vamos pegar os botões de enviar de forma mais específica
const btnEnviarRoupas = document.querySelector("#roupas #bbtn");
const btnEnviarCalcados = document.querySelector("#calcados #bbtn");

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
    const roupasComplete = isFormSectionComplete('roupas');
    const calcadosComplete = isFormSectionComplete('calcados');
    
    if (roupasComplete || calcadosComplete) {
        // Show success image and modal
        img1.style.display = "none";
        img2.style.display = "block";
        confirmModal.show();
    } else {
        // Show error modal with specific message
        const errorMessageElement = document.querySelector("#errorModalBody p");
        if (errorMessageElement) {
            errorMessageElement.textContent = "Por favor, preencha todos os campos de pelo menos uma seção (Roupas ou Calçados).";
        }
        errorModal.show();
    }
}

// Event listeners para navegação
btnAvancar.addEventListener("click", showCalcados);
btnVoltar.addEventListener("click", showRoupas); // Botão de voltar agora realmente volta para roupas

// Event listeners para envio do formulário - adicionamos aos botões específicos
if (btnEnviarRoupas) {
    btnEnviarRoupas.addEventListener("click", handleSubmit);
}

if (btnEnviarCalcados) {
    btnEnviarCalcados.addEventListener("click", handleSubmit);
}

// Tab button event listeners
roupasTab.addEventListener("click", showRoupas);
calcadosTab.addEventListener("click", showCalcados);

// Initialize the page
showRoupas();
