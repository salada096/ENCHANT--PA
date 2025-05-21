const minimoDigitos = document.getElementById("minimodigitos");
const doisNumeros = document.getElementById("doisnumeros");
const umCaracterEspecial = document.getElementById("umcaracterespecial");
const letraMaiuscula = document.getElementById("letramaiuscula");
const senhaInput = document.getElementById("senha");
const confirmarSenhaInput = document.getElementById("confirmarsenha");

// Função para verificar se a senha atende aos requisitos
function validarSenha() {
    const senha = senhaInput.value;
    
    // Verificando cada requisito
    const temMinimo8Digitos = senha.length >= 8;
    const temPeloMenos2Numeros = (senha.match(/[0-9]/g) || []).length >= 2;
    const temCaracterEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(senha);
    const temLetraMaiuscula = /[A-Z]/.test(senha);
    
    // Atualizando a cor dos requisitos
    minimoDigitos.style.color = temMinimo8Digitos ? "green" : "#757575";
    doisNumeros.style.color = temPeloMenos2Numeros ? "green" : "#757575";
    umCaracterEspecial.style.color = temCaracterEspecial ? "green" : "#757575";
    letraMaiuscula.style.color = temLetraMaiuscula ? "green" : "#757575";
    
    // Verificando se todos os requisitos foram atendidos
    return temMinimo8Digitos && temPeloMenos2Numeros && temCaracterEspecial && temLetraMaiuscula;
}

// Função para verificar se as senhas correspondem
function verificarSenhasCorrespondem() {
    const senha = senhaInput.value;
    const confirmarSenha = confirmarSenhaInput.value;
    
    if (confirmarSenha && senha !== confirmarSenha) {
        confirmarSenhaInput.style.borderColor = "#FF0404";
    } else if (confirmarSenha) {
        confirmarSenhaInput.style.borderColor = "green";
    } else {
        confirmarSenhaInput.style.borderColor = "#B7B6B6";
    }
}

// Adicionar eventos de input aos campos
senhaInput.addEventListener("input", function() {
    validarSenha();
    verificarSenhasCorrespondem();
});

confirmarSenhaInput.addEventListener("input", verificarSenhasCorrespondem);
document.getElementById("estado").addEventListener("change", function(){
    this.style.color = "black";
});
document.getElementById("cidade").addEventListener("change", function(){
    this.style.color = "black";
});
const cidadesPorEstado = {
        AC: ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira", "Tarauacá", "Feijó"],
        AL: ["Maceió", "Arapiraca", "Palmeira dos Índios", "Rio Largo", "Penedo"],
        AP: ["Macapá", "Santana", "Laranjal do Jari", "Oiapoque", "Porto Grande"],
        AM: ["Manaus", "Parintins", "Itacoatiara", "Manacapuru", "Coari"],
        BA: ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Ilhéus", "Lauro de Freitas"],
        CE: ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Sobral", "Maracanaú"],
        DF: ["Brasília", "Taguatinga", "Ceilândia", "Samambaia", "Planaltina"],
        ES: ["Vitória", "Vila Velha", "Serra", "Cariacica", "Guarapari"],
        GO: ["Goiânia", "Anápolis", "Aparecida de Goiânia", "Rio Verde", "Luziânia"],
        MA: ["São Luís", "Imperatriz", "Caxias", "Timon", "Codó"],
        MT: ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop", "Tangará da Serra"],
        MS: ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá", "Ponta Porã"],
        MG: ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim"],
        PA: ["Belém", "Ananindeua", "Santarém", "Marabá", "Castanhal"],
        PB: ["João Pessoa", "Campina Grande", "Santa Rita", "Patos", "Bayeux"],
        PR: ["Curitiba", "Londrina", "Maringá", "Cascavel", "São José dos Pinhais"],
        PE: ["Recife", "Jaboatão dos Guararapes", "Olinda", "Caruaru", "Petrolina"],
        PI: ["Teresina", "Parnaíba", "Picos", "Floriano", "Piripiri"],
        RJ: ["Rio de Janeiro", "São Gonçalo", "Duque de Caxias", "Nova Iguaçu", "Niterói"],
        RN: ["Natal", "Mossoró", "Parnamirim", "São Gonçalo do Amarante", "Caicó"],
        RS: ["Porto Alegre", "Caxias do Sul", "Pelotas", "Santa Maria", "Novo Hamburgo"],
        RO: ["Porto Velho", "Ji-Paraná", "Ariquemes", "Cacoal", "Vilhena"],
        RR: ["Boa Vista", "Rorainópolis", "Caracaraí", "Mucajaí", "Alto Alegre"],
        SC: ["Florianópolis", "Joinville", "Blumenau", "Chapecó", "Itajaí"],
        SP: ["São Paulo", "Campinas", "Santos", "Sorocaba", "São José dos Campos"],
        SE: ["Aracaju", "Nossa Senhora do Socorro", "Lagarto", "Itabaiana", "Estância"],
        TO: ["Palmas", "Araguaína", "Gurupi", "Porto Nacional", "Paraíso do Tocantins"]
    };
function atualizarCidades(){
    const estadoSelecionado = document.getElementById("estado").value;
    const selectCidades = document.getElementById("cidade");
    selectCidades.disabled = estadoSelecionado === "";
    selectCidades.innerHTML = "<option value='' hidden>Selecione uma cidade</option>";
    if (estadoSelecionado in cidadesPorEstado) {
        cidadesPorEstado[estadoSelecionado].forEach(cidade => {
            const option = document.createElement("option");
            option.value = cidade;
            option.textContent = cidade;
            selectCidades.appendChild(option);
        });
    }
}
