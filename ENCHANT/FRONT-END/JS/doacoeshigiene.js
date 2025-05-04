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
  const higieneSection = document.getElementById("higiene");
  const limpezaSection = document.getElementById("limpeza");
  const btnEnviarHigiene = document.getElementById("bottao"); // Alterado de "Avançar" para "Enviar"
  const btnEnviarLimpeza = document.getElementById("bbtn");
  const btnBackToHigiene = document.getElementById("back-to-higiene");
  const higieneTab = document.getElementById("higiene-tab");
  const limpezaTab = document.getElementById("limpeza-tab");
  const higieneQuantidadeInput = document.getElementById("higienequantidade");
  const limpezaQuantidadeInput = document.getElementById("limpezaquantidade");
  const higieneEspecifiqueInput = document.getElementById("higienetipo");
  const limpezaEspecifiqueInput = document.getElementById("limpezatipo");
  const higieneRestricaoInput = document.getElementById("higienerestricao");
  const limpezaTamanhoInput = document.getElementById("limpezatamanho");
  
  // Alterando o texto do botão "Avançar" para "Enviar"
  btnEnviarHigiene.textContent = "Enviar";
  
  // Remover o botão "Enviar" na esquerda da primeira página
  const btnVoltar = document.getElementById("bbotao");
  if (btnVoltar) {
      btnVoltar.style.display = "none";
  }
  
  // Criando e inicializando modais customizados para cada validação
  function createCustomModals() {
      const modalContainer = document.createElement('div');
      modalContainer.id = 'custom-modals-container';
      document.body.appendChild(modalContainer);
      
      const modalsHTML = `
          <!-- Modal de Quantidade Inválida para Higiene -->
          <div class="modal fade" id="higieneQuantidadeModal" tabindex="-1" aria-labelledby="higieneQuantidadeModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="higieneQuantidadeModalLabel">Quantidade Inválida</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                      </div>
                      <div class="modal-body">
                          <p>A quantidade de produtos de higiene deve ser um número positivo maior que zero.</p>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendi</button>
                      </div>
                  </div>
              </div>
          </div>
          
          <!-- Modal de Quantidade Inválida para Limpeza -->
          <div class="modal fade" id="limpezaQuantidadeModal" tabindex="-1" aria-labelledby="limpezaQuantidadeModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="limpezaQuantidadeModalLabel">Quantidade Inválida</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                      </div>
                      <div class="modal-body">
                          <p>A quantidade de produtos de limpeza deve ser um número positivo maior que zero.</p>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendi</button>
                      </div>
                  </div>
              </div>
          </div>
          
          <!-- Modal para Especificação Inválida de Higiene -->
          <div class="modal fade" id="higieneEspecifiqueModal" tabindex="-1" aria-labelledby="higieneEspecifiqueModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="higieneEspecifiqueModalLabel">Especificação Inválida</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                      </div>
                      <div class="modal-body">
                          <p>O campo "Especifique" para produtos de higiene deve conter pelo menos 5 caracteres válidos e não pode conter caracteres especiais não permitidos.</p>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendi</button>
                      </div>
                  </div>
              </div>
          </div>
          
          <!-- Modal para Especificação Inválida de Limpeza -->
          <div class="modal fade" id="limpezaEspecifiqueModal" tabindex="-1" aria-labelledby="limpezaEspecifiqueModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="limpezaEspecifiqueModalLabel">Especificação Inválida</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                      </div>
                      <div class="modal-body">
                          <p>O campo "Especifique" para produtos de limpeza deve conter pelo menos 5 caracteres válidos e não pode conter caracteres especiais não permitidos.</p>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendi</button>
                      </div>
                  </div>
              </div>
          </div>
          
          <!-- Modal para Restrição Inválida -->
          <div class="modal fade" id="higieneRestricaoModal" tabindex="-1" aria-labelledby="higieneRestricaoModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="higieneRestricaoModalLabel">Restrição/Recomendação Inválida</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                      </div>
                      <div class="modal-body">
                          <p>O campo "Restrição/Recomendação específica" deve conter pelo menos 3 caracteres válidos e não pode conter caracteres especiais não permitidos.</p>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendi</button>
                      </div>
                  </div>
              </div>
          </div>
          
          <!-- Modal para Tamanho Inválido -->
          <div class="modal fade" id="limpezaTamanhoModal" tabindex="-1" aria-labelledby="limpezaTamanhoModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="limpezaTamanhoModalLabel">Tamanho Inválido</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                      </div>
                      <div class="modal-body">
                          <p>O campo "Tamanho" deve conter pelo menos 2 caracteres válidos (ex: 1L, 500ML) e não pode conter caracteres especiais não permitidos.</p>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendi</button>
                      </div>
                  </div>
              </div>
          </div>
      `;
      
      modalContainer.innerHTML = modalsHTML;
      
      // Inicializar os modais do Bootstrap
      const higieneQuantidadeModal = new bootstrap.Modal(document.getElementById('higieneQuantidadeModal'));
      const limpezaQuantidadeModal = new bootstrap.Modal(document.getElementById('limpezaQuantidadeModal'));
      const higieneEspecifiqueModal = new bootstrap.Modal(document.getElementById('higieneEspecifiqueModal'));
      const limpezaEspecifiqueModal = new bootstrap.Modal(document.getElementById('limpezaEspecifiqueModal'));
      const higieneRestricaoModal = new bootstrap.Modal(document.getElementById('higieneRestricaoModal'));
      const limpezaTamanhoModal = new bootstrap.Modal(document.getElementById('limpezaTamanhoModal'));
      
      return {
          higieneQuantidadeModal,
          limpezaQuantidadeModal,
          higieneEspecifiqueModal,
          limpezaEspecifiqueModal,
          higieneRestricaoModal,
          limpezaTamanhoModal
      };
  }
  
  // Inicializando os modais do Bootstrap 5
  const confirmModalEl = document.getElementById('confirmModal');
  const errorModalEl = document.getElementById('errorModal');
  const confirmModal = new bootstrap.Modal(confirmModalEl);
  const errorModal = new bootstrap.Modal(errorModalEl);
  
  // Criar e inicializar os modais customizados
  const customModals = createCustomModals();
  
  // Botões de fechar modais
  document.getElementById("closeConfirmModal").addEventListener("click", () => {
      confirmModal.hide();
      resetForms();
  });
  
  document.getElementById("closeErrorModal").addEventListener("click", () => {
      errorModal.hide();
  });
  
  // Event listeners para todos os botões de fechar modal
  document.querySelectorAll(".btn-close, [data-bs-dismiss='modal']").forEach(button => {
      button.addEventListener("click", (e) => {
          const modalEl = e.target.closest('.modal');
          const modalInstance = bootstrap.Modal.getInstance(modalEl);
          if (modalInstance) {
              modalInstance.hide();
          }
      });
  });
  
  // Function to reset all forms
  function resetForms() {
      // Reset higiene form
      higieneQuantidadeInput.value = "";
      higieneEspecifiqueInput.value = "";
      higieneRestricaoInput.value = "";
      
      // Reset limpeza form
      limpezaQuantidadeInput.value = "";
      limpezaEspecifiqueInput.value = "";
      limpezaTamanhoInput.value = "";
      
      // Return to the first tab
      showHigiene();
  }
  
  // Function to show higiene section
  function showHigiene() {
      higieneSection.style.display = "block";
      limpezaSection.style.display = "none";
      img1.style.display = "block";
      img2.style.display = "none";
      img3.style.display = "none";
      img4.style.display = "none";
      
      // Update active tab
      higieneTab.classList.add("active");
      limpezaTab.classList.remove("active");
  }
  
  // Function to show limpeza section
  function showLimpeza() {
      higieneSection.style.display = "none";
      limpezaSection.style.display = "block";
      img1.style.display = "block";
      img2.style.display = "none";
      img3.style.display = "none";
      img4.style.display = "none";
      
      // Update active tab
      higieneTab.classList.remove("active");
      limpezaTab.classList.add("active");
  }
  
  // Função para validar quantidade (não pode ser negativo ou zero)
  function validarQuantidade(input, modal) {
      if (input.value <= 0 || input.value.trim() === "") {
          modal.show();
          return false;
      }
      return true;
  }
  
  // Função para validar especificação
  function validarEspecifique(input, modal) {
      const regex = /^[a-zA-Z0-9\sáéíóúãõâêîôûçÁÉÍÓÚÃÕÂÊÎÔÛÇ]+$/; // Permite letras, números e espaços
      if (!regex.test(input.value) || input.value.trim().length < 5) {
          modal.show();
          return false;
      }
      return true;
  }
  
  // Função para validar restrição e tamanho
  function validarCampoAdicional(input, modal, minLength = 3) {
      if (!input || input.value.trim() === "") {
          modal.show();
          return false;
      }
      
      const regex = /^[a-zA-Z0-9\sáéíóúãõâêîôûçÁÉÍÓÚÃÕÂÊÎÔÛÇ,./-]+$/; // Permite letras, números, espaços e alguns caracteres especiais
      if (!regex.test(input.value) || input.value.trim().length < minLength) {
          modal.show();
          return false;
      }
      return true;
  }
  
  // Function to validate higiene form
  function validateHigieneForm() {
      // Validar quantidade
      if (!validarQuantidade(higieneQuantidadeInput, customModals.higieneQuantidadeModal)) {
          return false;
      }
      
      // Validar especificação
      if (!validarEspecifique(higieneEspecifiqueInput, customModals.higieneEspecifiqueModal)) {
          return false;
      }
      
      // Validar restrição/recomendação
      if (!validarCampoAdicional(higieneRestricaoInput, customModals.higieneRestricaoModal)) {
          return false;
      }
      
      return true;
  }
  
  // Function to validate limpeza form
  function validateLimpezaForm() {
      // Validar quantidade
      if (!validarQuantidade(limpezaQuantidadeInput, customModals.limpezaQuantidadeModal)) {
          return false;
      }
      
      // Validar especificação
      if (!validarEspecifique(limpezaEspecifiqueInput, customModals.limpezaEspecifiqueModal)) {
          return false;
      }
      
      // Validar tamanho
      if (!validarCampoAdicional(limpezaTamanhoInput, customModals.limpezaTamanhoModal, 2)) {
          return false;
      }
      
      return true;
  }
  
  // Function to handle higiene form submission
  function handleHigieneSubmit() {
      if (validateHigieneForm()) {
          // Show success image
          img1.style.display = "none";
          img2.style.display = "block";
          img3.style.display = "none";
          img4.style.display = "none";
          
          // Customize confirmation message
          document.getElementById("confirmModalBody").innerHTML = 
              `<p>Formulário de Produtos de Higiene enviado com sucesso!</p>
              <p>Detalhes da doação:</p>
              <ul>
                  <li>Quantidade: ${higieneQuantidadeInput.value}</li>
                  <li>Produto: ${higieneEspecifiqueInput.value}</li>
                  <li>Restrição/Recomendação: ${higieneRestricaoInput.value}</li>
              </ul>`;
          
          confirmModal.show();
      }
  }
  
  // Function to handle limpeza form submission
  function handleLimpezaSubmit() {
      if (validateLimpezaForm()) {
          // Show success image
          img1.style.display = "none";
          img2.style.display = "block";
          img3.style.display = "none";
          img4.style.display = "none";
          
          // Customize confirmation message
          document.getElementById("confirmModalBody").innerHTML = 
              `<p>Formulário de Produtos de Limpeza enviado com sucesso!</p>
              <p>Detalhes da doação:</p>
              <ul>
                  <li>Quantidade: ${limpezaQuantidadeInput.value}</li>
                  <li>Produto: ${limpezaEspecifiqueInput.value}</li>
                  <li>Tamanho: ${limpezaTamanhoInput.value}</li>
              </ul>`;
          
          confirmModal.show();
      }
  }
  
  // Adicionar validação em tempo real para os campos de quantidade
  higieneQuantidadeInput.addEventListener("input", function(e) {
      // Remove qualquer caractere que não seja número
      this.value = this.value.replace(/[^0-9]/g, '');
      
      // Se o valor for 0, mostrar alerta visual
      if (this.value === '0' || this.value === '') {
          this.classList.add('is-invalid');
      } else {
          this.classList.remove('is-invalid');
          this.classList.add('is-valid');
      }
  });
  
  limpezaQuantidadeInput.addEventListener("input", function(e) {
      // Remove qualquer caractere que não seja número
      this.value = this.value.replace(/[^0-9]/g, '');
      
      // Se o valor for 0, mostrar alerta visual
      if (this.value === '0' || this.value === '') {
          this.classList.add('is-invalid');
      } else {
          this.classList.remove('is-invalid');
          this.classList.add('is-valid');
      }
  });
  
  // Adicionar validação em tempo real para os campos específicos
  higieneEspecifiqueInput.addEventListener("input", function(e) {
      const value = this.value;
      const regex = /^[a-zA-Z0-9\sáéíóúãõâêîôûçÁÉÍÓÚÃÕÂÊÎÔÛÇ]+$/;
      
      if (!regex.test(value) || value.trim().length < 5) {
          this.classList.add('is-invalid');
      } else {
          this.classList.remove('is-invalid');
          this.classList.add('is-valid');
      }
  });
  
  limpezaEspecifiqueInput.addEventListener("input", function(e) {
      const value = this.value;
      const regex = /^[a-zA-Z0-9\sáéíóúãõâêîôûçÁÉÍÓÚÃÕÂÊÎÔÛÇ]+$/;
      
      if (!regex.test(value) || value.trim().length < 5) {
          this.classList.add('is-invalid');
      } else {
          this.classList.remove('is-invalid');
          this.classList.add('is-valid');
      }
  });
  
  // Adicionar validação em tempo real para os campos adicionais
  higieneRestricaoInput.addEventListener("input", function(e) {
      const value = this.value;
      const regex = /^[a-zA-Z0-9\sáéíóúãõâêîôûçÁÉÍÓÚÃÕÂÊÎÔÛÇ,./-]+$/;
      
      if (!regex.test(value) || value.trim().length < 3) {
          this.classList.add('is-invalid');
      } else {
          this.classList.remove('is-invalid');
          this.classList.add('is-valid');
      }
  });
  
  limpezaTamanhoInput.addEventListener("input", function(e) {
      const value = this.value;
      const regex = /^[a-zA-Z0-9\sáéíóúãõâêîôûçÁÉÍÓÚÃÕÂÊÎÔÛÇ,./-]+$/;
      
      if (!regex.test(value) || value.trim().length < 2) {
          this.classList.add('is-invalid');
      } else {
          this.classList.remove('is-invalid');
          this.classList.add('is-valid');
      }
  });
  
  // Event listeners para botões de navegação
  btnEnviarHigiene.addEventListener("click", handleHigieneSubmit);
  btnEnviarLimpeza.addEventListener("click", handleLimpezaSubmit);
  btnBackToHigiene.addEventListener("click", showHigiene);
  
  // Tab button event listeners
  higieneTab.addEventListener("click", showHigiene);
  limpezaTab.addEventListener("click", showLimpeza);
  
  // Initialize the page
  showHigiene();
