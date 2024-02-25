const nomeInput = document.querySelector('#nome');
const nota1 = document.querySelector('#nota1');
const nota2 = document.querySelector('#nota2');
const nota3 = document.querySelector('#nota3');
const calcularButton = document.querySelector('#calcular');
const resultado = document.querySelector('#resultado');
const modalContainer = document.querySelector('.modal-container');
const modalText = document.querySelector('#modalText');
const modalOKButton = document.querySelector('.btnOK');

calcularButton.addEventListener('click', function(event) {
    event.preventDefault();
    const nome = nomeInput.value.trim();
    const n1 = parseFloat(nota1.value);
    const n2 = parseFloat(nota2.value);
    const n3 = parseFloat(nota3.value);

    if (nome === '') {
        modalText.textContent = 'INSIRA O NOME DA PESSOA.';
        openModal();
    } else if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
        modalText.textContent = 'INSIRA TODAS AS NOTAS ANTES DE CALCULAR.';
        openModal();
    } else {
        const mediaFinal = calcularMedia(n1, n2, n3);
        const situacao = situacaoFinal(mediaFinal);
        const saudacao = getSaudacao();

        const mediaTexto = `SUA MÉDIA É: ${mediaFinal.toFixed(2)}`;
        const situacaoTexto = `SUA SITUAÇÃO É: ${situacao}`;
        const saudacaoTexto = `${saudacao} ${nome.toUpperCase()}!`;

        modalText.innerHTML = `${saudacaoTexto}<br>${mediaTexto}<br>${situacaoTexto}`;

        if (situacao === 'APROVADO(A)') {
            modalText.style.color = 'green';
        } else if (situacao === 'PROVA FINAL') {
            modalText.style.color = 'orange';
        } else {
            modalText.style.color = 'red';
        }
        openModal();
    }
});

modalOKButton.addEventListener('click', function() {
    closeModal();
    modalText.style.color = '';
});

function calcularMedia(n1, n2, n3) {
    return (n1 + n2 + n3) / 3;
}

function situacaoFinal(mediaFinal) {
    if (mediaFinal >= 7) {
        return 'APROVADO(A)';
    } else if (mediaFinal >= 4 && mediaFinal < 7) {
        return 'PROVA FINAL';
    } else {
        return 'RECUPERAÇÃO';
    }
}

function getSaudacao() {
    const agora = new Date();
    const hora = agora.getHours();
    let saudacao = '';

    if (hora >= 0 && hora < 12) {
        saudacao = 'BOM DIA,';
    } else if (hora >= 12 && hora < 18) {
        saudacao = 'BOA TARDE,';
    } else {
        saudacao = 'BOA NOITE,';
    }
    return saudacao;
}

function openModal() {
    modalContainer.style.display = 'flex';
}

function closeModal() {
    modalContainer.style.display = 'none';
}