const inputLista = document.querySelector('.input-lista');
const btnAdicionar = document.querySelector('.btn-adicionar');
const lista = document.querySelector('.lista');

function criaLi(texto){
    const li = document.createElement('li');
    li.innerText = texto;
    return li;
};
function criaBotaoApagar(){
    const btn = document.createElement('button')
    btn.innerText = 'Apagar';
    btn.setAttribute('class','botao btn-apagar');
    btn.setAttribute('title', 'Apagar da lista');
    return btn;
};
function resetaInput(){
    inputLista.value = '';
    inputLista.focus();
}
function criaLista(valor){
    const li = criaLi(valor);
    const btn = criaBotaoApagar();
    li.appendChild(btn);
    lista.appendChild(li);
    resetaInput();
    salvaTarefas();
};

btnAdicionar.addEventListener('click',function(){
    if(!inputLista.value) return alert('Digite algo para por na lista ☺');
    criaLista(inputLista.value);
});
inputLista.addEventListener('keydown',function(e){
    if(e.keyCode === 13){
        if(!inputLista.value) return alert('Digite algo para por na lista ☺');
        criaLista(inputLista.value);
    }
});

lista.addEventListener('click',function(e){
    const elemento = e.target;
    if(elemento.classList.contains('btn-apagar')){
        elemento.parentElement.remove();
        salvaTarefas();
    }
});

function salvaTarefas(){
    const tarefas = document.querySelectorAll('li');
    const listaDeTarefas = [];

    for(let tarefa of tarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar','').trim()
        listaDeTarefas.push(tarefaTexto);
    };
    const tarefasJson = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas',tarefasJson);
};

function adicionaTarefasSalvas(){
    const tarefasSalvasJson = localStorage.getItem('tarefas');
    const tarefasSalvasArray = JSON.parse(tarefasSalvasJson);
    for(let tarefa of tarefasSalvasArray){
        criaLista(tarefa);
        console.log(tarefa);
    };
;}
adicionaTarefasSalvas();

