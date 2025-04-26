const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const img4 = document.getElementById("img4");
const comidaSection = document.getElementById("comida");
const petSection = document.getElementById("pet");
const btnAvancar = document.getElementById("bottao");
const btnVoltar = document.getElementById("bbotao"); // We'll change this button's text but keep style
const btnEnviar = document.getElementById("bbtn");
const btnBackToRoupas = document.getElementById("back-to-roupas");
const comTab = document.getElementById("comida-tab");
const petTab = document.getElementById("pets-tab");

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

// Function to show clothes section
function showComida() {
    comidaSection.style.display = "block";
    petSection.style.display = "none";
    img1.style.display = "block";
    img2.style.display = "none";
    img3.style.display = "none";
    img4.style.display = "none";
    
    // Update active tab
    comTab.classList.add("active");
    petTab.classList.remove("active");
}

// Function to show shoes section
function showPets() {
    comidaSection.style.display = "none";
    petSection.style.display = "block";
    
    // Update active tab
    comTab.classList.remove("active");
    petTab.classList.add("active");
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
    const comidaFilled = isFormSectionFilled('comida');
    const petsFilled = isFormSectionFilled('pet');
    
    if (comidaFilled || petsFilled) {
        // Show success image and modal
        img1.style.display = "none";
        img2.style.display = "block";
        confirmModal.show();
    } else {
        // Show error modal
        errorModal.show();
    }
}

// Change only the text of the Voltar button to "Enviar"
btnVoltar.textContent = "Enviar";
// No class changes, keeping the original styling

// Update event listeners
btnVoltar.removeEventListener("click", showComida); // Remove old functionality if it exists
btnVoltar.addEventListener("click", handleSubmit); // Add new submit functionality
btnEnviar.addEventListener("click", handleSubmit);
btnAvancar.addEventListener("click", showPets);
btnBackToRoupas.addEventListener("click", showComida);

// Tab button event listeners
comTab.addEventListener("click", showComida);
petTab.addEventListener("click", showPets);

// Initialize the page
showComida();
