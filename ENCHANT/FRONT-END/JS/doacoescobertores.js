document.addEventListener("DOMContentLoaded", function () {
    // Função para controlar o dropdown do perfil
    setupProfileDropdown();
   
    // Configurar evento para detectar o fechamento do menu colapsável
    const navbarCollapse = document.getElementById('navbarNav');
   
    // Se estivermos usando Bootstrap 5
    if (window.bootstrap && navbarCollapse) {
      const collapseInstance = new bootstrap.Collapse(navbarCollapse, {
        toggle: false // Não alternar ao criar a instância
      });
     
      // Adicionar listener para quando o colapso for escondido
      navbarCollapse.addEventListener('hidden.bs.collapse', function () {
        // Garantir que o botão possa ser clicado novamente
        const toggleButton = document.getElementById('icone');
        if (toggleButton) {
          toggleButton.classList.remove('collapsed');
          toggleButton.setAttribute('aria-expanded', 'false');
        }
      });
    }
    // Para Bootstrap 4 (que parece estar sendo usado no seu código)
    else if ($ && navbarCollapse) {
      $(navbarCollapse).on('hidden.bs.collapse', function () {
        const toggleButton = document.getElementById('icone');
        if (toggleButton) {
          toggleButton.classList.remove('collapsed');
          toggleButton.setAttribute('aria-expanded', 'false');
        }
      });
    }
   
    // Restante do código existente...
    const instagramBtn = document.getElementById("botao");
    const instagramCaixa = document.getElementById("caixa-principal");
    const instagramSairBtn = document.getElementById("botao-sair");
    const instagramInput = document.getElementById("instagram");
    const instagramLinkContainer = document.getElementById("linkContainer");
    const instagramEditarBtn = document.getElementById("editarLink");
    const instagramConfirmarBtn = document.getElementById("botaocaixa");
    const modalOverlay = createModalOverlay();
  
  
    // Configurar botão do Facebook
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
  
  
    if (instagramBtn) {
      instagramBtn.addEventListener("click", () => {
        instagramCaixa.style.display = "flex";
        modalOverlay.style.display = "block";
        document.body.style.overflow = "hidden";
      });
    }
  
  
    if (instagramSairBtn) {
      instagramSairBtn.addEventListener("click", () => {
        instagramCaixa.style.display = "none";
        modalOverlay.style.display = "none";
        document.body.style.overflow = "auto";
      });
    }
  
  
    // Adicionar evento de clique manual ao botão de três pontos
    const toggleButton = document.getElementById('icone');
    if (toggleButton) {
      toggleButton.addEventListener('click', function() {
        // Se Bootstrap 5
        if (window.bootstrap && navbarCollapse) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            if (navbarCollapse.classList.contains('show')) {
              bsCollapse.hide();
            } else {
              bsCollapse.show();
            }
          } else {
            // Alternar manualmente se não houver instância
            navbarCollapse.classList.toggle('show');
          }
        }
        // Para Bootstrap 4
        else if ($) {
          $(navbarCollapse).collapse('toggle');
        }
        // Alternar manualmente como fallback
        else if (navbarCollapse) {
          if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
            toggleButton.setAttribute('aria-expanded', 'false');
          } else {
            navbarCollapse.classList.add('show');
            toggleButton.setAttribute('aria-expanded', 'true');
          }
        }
      });
    }
  
  
    // Chamadas para outras funções existentes
    handleHeaderAnimation();
    handleSidebarHover();
  });
  
  
  // Nova função para configurar o dropdown do perfil
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
        e.stopPropagation(); // Impede propagação do evento
        if (dropdownMenu.style.display === "block") {
          dropdownMenu.style.display = "none";
        } else {
          dropdownMenu.style.display = "block";
        }
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
     
      // Container do dropdown para evitar que feche quando mover para os itens
      const profileDropdown = document.querySelector(".profile-dropdown");
      if (profileDropdown) {
        profileDropdown.addEventListener("mouseleave", function() {
          dropdownMenu.style.display = "none";
        });
      }
     
      // Também adicionar clique para melhorar acessibilidade
      usuarioBtn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation(); // Impede propagação do evento
        if (dropdownMenu.style.display === "block") {
          dropdownMenu.style.display = "none";
        } else {
          dropdownMenu.style.display = "block";
        }
      });
    }
   
    // Adicionar evento de clique nos itens do dropdown para fechar após clicar
    const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
      item.addEventListener('click', function() {
        dropdownMenu.style.display = "none";
      });
    });
  }
  
  
  // Re-configurar em caso de redimensionamento da janela
  window.addEventListener("resize", function() {
    setupProfileDropdown();
    handleHeaderAnimation();
    handleSidebarHover();
    ensureSidebarHeight();
  });
  
  
  // Funções existentes...
  function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const body = document.body;
  
  
    sidebar.classList.toggle("open");
    body.classList.toggle("sidebar-open"); // Adiciona classe ao body para controlar overflow
  
  
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
  
  
      // Garante que o botão de upload permaneça visível
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
      if (window.innerWidth <= 768) {
        header.style.transition = "none";
      } else {
        header.style.transition = "all 0.3s ease-in-out";
      }
    }
  }
  
  
  function handleSidebarHover() {
    const sidebar = document.getElementById("sidebar");
    const body = document.body;
    const imgHeader = document.getElementById("imgheader");
  
  
    if (sidebar) {
      // Remover quaisquer listeners existentes para evitar duplicações
      const oldMouseEnter = sidebar._mouseenterListener;
      const oldMouseLeave = sidebar._mouseleaveListener;
     
      if (oldMouseEnter) {
        sidebar.removeEventListener("mouseenter", oldMouseEnter);
      }
     
      if (oldMouseLeave) {
        sidebar.removeEventListener("mouseleave", oldMouseLeave);
      }
     
      // É um tablet? (Entre 768px e 992px)
      const isTablet = window.innerWidth > 768 && window.innerWidth <= 992;
     
      // Se for desktop (acima de 992px) ou não for tablet, mantém o comportamento original
      if (!isTablet && window.innerWidth > 768) {
        const mouseenterListener = function() {
          body.classList.add("sidebar-expanded");
         
          // Garante que o botão de upload permaneça visível
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
       
        // Armazenar referências para possibilitar remoção posterior
        sidebar._mouseenterListener = mouseenterListener;
        sidebar._mouseleaveListener = mouseleaveListener;
      }
      // Para tablets, desabilitar o efeito de hover
      else if (isTablet) {
        // Não adiciona novos listeners para mouseenter/mouseleave
        // Isso impede que o botão de upload se mova em tablets quando
        // o mouse passa sobre a sidebar
       
        // Garante que o botão de upload permaneça sempre visível em tablets
        if (imgHeader) {
          imgHeader.style.visibility = "visible";
          imgHeader.style.opacity = "1";
        }
      }
    }
  }
  
  
  // Adicione essa função para garantir que a sidebar tenha altura máxima em celulares
  function ensureSidebarHeight() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar && window.innerWidth <= 768) {
      // Define a altura para o viewport height ou para o height da página, o que for maior
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
  
  
  // Função para gerar link do Instagram
  function gerarLinkInstagram() {
    const instagram = document.getElementById("instagram").value.trim();
    const instagramLinkContainer = document.getElementById("linkContainer");
    const instagramEditarBtn = document.getElementById("editarLink");
    const instagramConfirmarBtn = document.getElementById("botaocaixa");
    const instagramInput = document.getElementById("instagram");
    const instagramBtn = document.getElementById("botao");
   
    const regexInstagram = /^[a-zA-Z0-9._]+$/;
  
  
    if (instagram && regexInstagram.test(instagram.replace(/^@/, ""))) {
      const padrao = instagram.startsWith("@") ? instagram.slice(1) : instagram;
      const link = `https://www.instagram.com/${padrao}`;
  
  
      instagramLinkContainer.innerHTML = `
        <div style="text-align: center;">
          <a href="${link}" target="_blank" style="color:#EC9E07; font-size:16px; word-wrap:break-word;">
            ${link}
          </a>
        </div>
      `;
      instagramBtn.setAttribute("href", link);
      instagramBtn.innerHTML = "Instagram";
  
  
      instagramInput.style.display = "none";
      instagramConfirmarBtn.style.display = "none";
      instagramEditarBtn.style.display = "inline-block";
      instagramInput.value = "";
      document.getElementById("texto-caixa3").textContent = "Aqui você pode editar o Instagram da sua empresa!";
    } else {
      alert("Por favor, insira um Instagram válido (somente letras, números, pontos e underlines).");
      instagramLinkContainer.innerHTML = "";
    }
  }
  
  
  // Função para gerar link do Facebook
  function gerarLinkFacebook() {
    const facebook = document.getElementById("facebook2").value.trim();
    const facebookLinkContainer = document.getElementById("linkContainer2");
    const facebookEditarBtn = document.getElementById("editarLink2");
    const facebookConfirmarBtn = document.getElementById("botaocaixa2");
    const facebookInput = document.getElementById("facebook2");
    const facebookBtn = document.getElementById("facebook");
   
    const regexFacebook = /^[a-zA-Z0-9._]+$/;
  
  
    if (facebook && regexFacebook.test(facebook.replace(/^@/, ""))) {
      const padrao = facebook.startsWith("@") ? facebook.slice(1) : facebook;
      const link = `https://www.facebook.com/${padrao}`;
  
  
      facebookLinkContainer.innerHTML = `
        <div style="text-align: center;">
          <a href="${link}" target="_blank" style="color:#EC9E07; font-size:16px; word-wrap:break-word;">
            ${link}
          </a>
        </div>
      `;
      facebookBtn.setAttribute("href", link);
      facebookBtn.innerHTML = "Facebook";
  
  
      facebookInput.style.display = "none";
      facebookConfirmarBtn.style.display = "none";
      facebookEditarBtn.style.display = "inline-block";
      facebookInput.value = "";
      document.getElementById("texto-caixa4").textContent = "Aqui você pode editar o Facebook da sua empresa!";
    } else {
      alert("Por favor, insira um Facebook válido (somente letras, números, pontos e underlines).");
      facebookLinkContainer.innerHTML = "";
    }
  }
  
  
  // Adicionar função para editar links
  document.addEventListener("DOMContentLoaded", function() {
    const editarInstagramBtn = document.getElementById("editarLink");
    if (editarInstagramBtn) {
      editarInstagramBtn.addEventListener("click", function() {
        const instagramInput = document.getElementById("instagram");
        const instagramLinkContainer = document.getElementById("linkContainer");
        const instagramConfirmarBtn = document.getElementById("botaocaixa");
       
        instagramInput.style.display = "block";
        instagramConfirmarBtn.style.display = "block";
        instagramLinkContainer.innerHTML = "";
        editarInstagramBtn.style.display = "none";
      });
    }
   
    const editarFacebookBtn = document.getElementById("editarLink2");
    if (editarFacebookBtn) {
      editarFacebookBtn.addEventListener("click", function() {
        const facebookInput = document.getElementById("facebook2");
        const facebookLinkContainer = document.getElementById("linkContainer2");
        const facebookConfirmarBtn = document.getElementById("botaocaixa2");
       
        facebookInput.style.display = "block";
        facebookConfirmarBtn.style.display = "block";
        facebookLinkContainer.innerHTML = "";
        editarFacebookBtn.style.display = "none";
      });
    }
  });
  
  
  
  

const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const img4 = document.getElementById("img4");
const cobertoresSection = document.getElementById("cobertores");
const outrosSection = document.getElementById("outros");
const btnEnviar = document.getElementById("bbtn");
const btnBackToCobertores = document.getElementById("back-to-cobertores");
const cobertoresTab = document.getElementById("cobertores-tab");
const outrosTab = document.getElementById("outros-tab");

// Changing "Avançar" button to "Enviar" in the first section
const bottao = document.getElementById("bottao");
bottao.textContent = "Enviar";
bottao.id = "cobertores-submit";

// Inicializando os modais do Bootstrap
const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));

// Criar novos modais para validações específicas
function createCustomModals() {
    // Criar container para os modais
    const modalContainer = document.createElement('div');
    modalContainer.id = 'custom-modals-container';
    document.body.appendChild(modalContainer);
    
    // Estrutura HTML para os modais
    const modalsHTML = `
        <!-- Modal para quantidade inválida em cobertores -->
        <div class="modal fade" id="cobertoresQuantidadeModal" tabindex="-1" aria-labelledby="cobertoresQuantidadeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="cobertoresQuantidadeModalLabel">Quantidade Inválida</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div class="modal-body">
                        <p>A quantidade de cobertores deve ser um número positivo maior que zero.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendi</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Modal para quantidade inválida em outros -->
        <div class="modal fade" id="outrosQuantidadeModal" tabindex="-1" aria-labelledby="outrosQuantidadeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="outrosQuantidadeModalLabel">Quantidade Inválida</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div class="modal-body">
                        <p>A quantidade deve ser um número positivo maior que zero.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendi</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Modal para tamanho mínimo do campo Especifique -->
        <div class="modal fade" id="especifiqueTamanhoModal" tabindex="-1" aria-labelledby="especifiqueTamanhoModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="especifiqueTamanhoModalLabel">Texto Muito Curto</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div class="modal-body">
                        <p>O campo Especifique deve ter no mínimo 5 caracteres.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendi</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Modal para caracteres especiais no campo Especifique -->
        <div class="modal fade" id="especifiqueCaracteresModal" tabindex="-1" aria-labelledby="especifiqueCaracteresModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="especifiqueCaracteresModalLabel">Caracteres Inválidos</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div class="modal-body">
                        <p>O campo Especifique não pode conter caracteres especiais.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendi</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Modal para sequência de letras repetidas no campo Especifique -->
        <div class="modal fade" id="especifiqueRepetidoModal" tabindex="-1" aria-labelledby="especifiqueRepetidoModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="especifiqueRepetidoModalLabel">Sequência Repetida</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div class="modal-body">
                        <p>O campo Especifique não pode conter sequências de letras repetidas (ex: aaa, bbb).</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendi</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Adicionar os modais ao container
    modalContainer.innerHTML = modalsHTML;
    
    // Inicializar os modais do Bootstrap
    const cobertoresQuantidadeModal = new bootstrap.Modal(document.getElementById('cobertoresQuantidadeModal'));
    const outrosQuantidadeModal = new bootstrap.Modal(document.getElementById('outrosQuantidadeModal'));
    const especifiqueTamanhoModal = new bootstrap.Modal(document.getElementById('especifiqueTamanhoModal'));
    const especifiqueCaracteresModal = new bootstrap.Modal(document.getElementById('especifiqueCaracteresModal'));
    const especifiqueRepetidoModal = new bootstrap.Modal(document.getElementById('especifiqueRepetidoModal'));
    
    // Retornar os objetos dos modais
    return {
        cobertoresQuantidadeModal,
        outrosQuantidadeModal,
        especifiqueTamanhoModal,
        especifiqueCaracteresModal,
        especifiqueRepetidoModal
    };
}

// Criar e inicializar os modais customizados
const customModals = createCustomModals();

// Botões de fechar modais
document.getElementById("closeConfirmModal").addEventListener("click", () => {
    confirmModal.hide();
    // Reset forms after successful submission
    resetForms();
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

// Function to check if device is mobile
function isMobileDevice() {
    return window.innerWidth <= 768; // pode ajustar este valor conforme necessário
}

// Function to show cobertores section
function showCobertores() {
    cobertoresSection.style.display = "block";
    outrosSection.style.display = "none";
  
    img1.style.display = "block";
    img2.style.display = "none";
    img3.style.display = "none";
    img4.style.display = "none";
    
    // Update active tab
    cobertoresTab.classList.add("active");
    outrosTab.classList.remove("active");
}

// Function to show outros section
function showOutros() {
    cobertoresSection.style.display = "none";
    outrosSection.style.display = "block";
    
    img1.style.display = "block";
    img2.style.display = "none";
    img3.style.display = "none";
    img4.style.display = "none";
    
    // Update active tab
    cobertoresTab.classList.remove("active");
    outrosTab.classList.add("active");
}

// Function to validate cobertores form
function validateCobertoresForm() {
    const qualidade = document.getElementById("cobertoresqualidade").value;
    const quantidade = document.getElementById("cobertoresquantidade").value;
    
    // Validar se todos os campos estão preenchidos
    if (!qualidade || !quantidade) {
        document.getElementById("errorModalBody").innerHTML = 
            "<p>Por favor, preencha todos os campos do formulário de Cobertores.</p>";
        errorModal.show();
        return false;
    }
    
    // Validar quantidade (não pode ser negativo ou zero)
    if (parseInt(quantidade) <= 0) {
        customModals.cobertoresQuantidadeModal.show();
        return false;
    }
    
    return true;
}

// Function to validate outros form
function validateOutrosForm() {
    const qualidade = document.getElementById("outrosqualidade").value;
    const quantidade = document.getElementById("outrosquantidade").value;
    const especifique = document.getElementById("outrosespecifique").value;
    
    // Validar se todos os campos estão preenchidos
    if (!qualidade || !quantidade || !especifique.trim()) {
        document.getElementById("errorModalBody").innerHTML = 
            "<p>Por favor, preencha todos os campos do formulário de Outros.</p>";
        errorModal.show();
        return false;
    }
    
    // Validar quantidade (não pode ser negativo ou zero)
    if (parseInt(quantidade) <= 0) {
        customModals.outrosQuantidadeModal.show();
        return false;
    }
    
    // Validar campo Especifique (mínimo 5 caracteres)
    if (especifique.trim().length < 5) {
        customModals.especifiqueTamanhoModal.show();
        return false;
    }
    
    // Verificar caracteres especiais
    const especialRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (especialRegex.test(especifique)) {
        customModals.especifiqueCaracteresModal.show();
        return false;
    }
    
    // Verificar sequência de letras repetidas (3 ou mais letras iguais consecutivas)
    const repetidoRegex = /([a-zA-Z])\1{2,}/;
    if (repetidoRegex.test(especifique)) {
        customModals.especifiqueRepetidoModal.show();
        return false;
    }
    
    return true;
}

// Function to reset all forms
function resetForms() {
    // Reset cobertores form
    document.getElementById("cobertoresqualidade").selectedIndex = 0;
    document.getElementById("cobertoresquantidade").value = "";
    
    // Reset outros form
    document.getElementById("outrosqualidade").selectedIndex = 0;
    document.getElementById("outrosquantidade").value = "";
    document.getElementById("outrosespecifique").value = "";
    
    // Return to the first tab
    showCobertores();
}

// Function to handle cobertores form submission
function handleCobertoresSubmit() {
    if (validateCobertoresForm()) {
        img1.style.display = "none";
        img2.style.display = "block";
        img3.style.display = "none";
        img4.style.display = "none";
        
        // Customize confirmation message
        const qualidade = document.getElementById("cobertoresqualidade").value;
        const quantidade = document.getElementById("cobertoresquantidade").value;
        
        document.getElementById("confirmModalBody").innerHTML = 
            `<p>Formulário de Cobertores foi enviado com sucesso!</p>
            <p>Detalhes da doação:</p>
            <ul>
                <li>Qualidade: ${qualidade}</li>
                <li>Quantidade: ${quantidade}</li>
            </ul>`;
        
        confirmModal.show();
    }
}

// Function to handle outros form submission
function handleOutrosSubmit() {
    if (validateOutrosForm()) {
        img3.style.display = "none";
        img4.style.display = "block"; // 16.png
        img1.style.display = "none";
        img2.style.display = "none";
        
        // Customize confirmation message
        const qualidade = document.getElementById("outrosqualidade").value;
        const quantidade = document.getElementById("outrosquantidade").value;
        const especifique = document.getElementById("outrosespecifique").value;
        
        document.getElementById("confirmModalBody").innerHTML = 
            `<p>Formulário Outros foi enviado com sucesso!</p>
            <p>Detalhes da doação:</p>
            <ul>
                <li>Qualidade: ${qualidade}</li>
                <li>Quantidade: ${quantidade}</li>
                <li>Item: ${especifique}</li>
            </ul>`;
        
        confirmModal.show();
    }
}

// Event listeners
document.addEventListener("DOMContentLoaded", function() {
    const cobertoresSubmitBtn = document.getElementById("cobertores-submit");
    if (cobertoresSubmitBtn) {
        cobertoresSubmitBtn.addEventListener("click", handleCobertoresSubmit);
    }
    
    const outrosSubmitBtn = document.getElementById("bbtn");
    if (outrosSubmitBtn) {
        outrosSubmitBtn.addEventListener("click", handleOutrosSubmit);
    }
    
    const backToCobertoresBtn = document.getElementById("back-to-cobertores");
    if (backToCobertoresBtn) {
        backToCobertoresBtn.addEventListener("click", showCobertores);
    }
    
    // Tab button event listeners
    const cobertoresTabBtn = document.getElementById("cobertores-tab");
    if (cobertoresTabBtn) {
        cobertoresTabBtn.addEventListener("click", showCobertores);
    }
    
    const outrosTabBtn = document.getElementById("outros-tab");
    if (outrosTabBtn) {
        outrosTabBtn.addEventListener("click", showOutros);
    }
    
    // Initialize the page
    showCobertores();
});

// Adicionar validação em tempo real para o campo quantidade em cobertores
document.getElementById("cobertoresquantidade").addEventListener("input", function(e) {
    // Remove qualquer caractere que não seja número
    this.value = this.value.replace(/[^0-9]/g, '');
    
    // Se o valor for 0, mostrar alerta visual
    if (this.value === '0') {
        this.classList.add('is-invalid');
    } else {
        this.classList.remove('is-invalid');
    }
});

// Adicionar validação em tempo real para o campo quantidade em outros
document.getElementById("outrosquantidade").addEventListener("input", function(e) {
    // Remove qualquer caractere que não seja número
    this.value = this.value.replace(/[^0-9]/g, '');
    
    // Se o valor for 0, mostrar alerta visual
    if (this.value === '0') {
        this.classList.add('is-invalid');
    } else {
        this.classList.remove('is-invalid');
    }
});

// Adicionar validação em tempo real para o campo especifique em outros
document.getElementById("outrosespecifique").addEventListener("input", function(e) {
    const value = this.value;
    let isValid = true;
    
    // Verificar tamanho mínimo
    if (value.trim().length < 5) {
        isValid = false;
    }
    
    // Verificar caracteres especiais
    const especialRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (especialRegex.test(value)) {
        isValid = false;
    }
    
    // Verificar sequência de letras repetidas
    const repetidoRegex = /([a-zA-Z])\1{2,}/;
    if (repetidoRegex.test(value)) {
        isValid = false;
    }
    
    // Atualizar estado visual do campo
    if (!isValid) {
        this.classList.add('is-invalid');
    } else {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
    }
});

// Adicionar listener para mudança de tamanho da tela
window.addEventListener('resize', function() {
    if (cobertoresSection.style.display === "block") {
        showCobertores();
    }
});
