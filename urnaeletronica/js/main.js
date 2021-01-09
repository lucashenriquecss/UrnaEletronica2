// variaveis de controle de interface
let seuVoto = document.querySelector('.name span');
let cargo = document.querySelector('.cargo span');
let descricao = document.querySelector('.informacoes');
let aviso = document.querySelector('.d2');
let imagens = document.querySelector('.photo');
let numeros = document.querySelector('.numeros');

// variaveis de controle de ambiente

let etapaAtual = 0; // eteapa incial igual a 0
let numero = '';
let branco=  true;
let resultado = [];



function comecarEtapa() {   // vai limpar a tale a pegar as informacoes

    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numero = '';
    branco = false;

    for(let i=0; i<etapa.numeros; i++){

        if(i === 0){ //add o pisca na caixa e verifica
            numeroHtml += '<div class="num pisca"></div>';
        }else{
            numeroHtml += '<div class="num"></div>';
        }      
    }

    seuVoto.style.display ='none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display= 'none';
    imagens.innerHTML = '';
    numeros.innerHTML = numeroHtml;
    
    
}

//funçoes dos botoes

function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) =>{
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }
    });
    if(candidato.length > 0){
        candidato = candidato[0];
        seuVoto.style.display ='block';
        aviso.style.display= 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido:${candidato.partido}`;
        

        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="img small"><img src="./img/${candidato.fotos[i].url}" alt=""/>${candidato.fotos}</div>`;

            }else{
                fotosHtml += `<div class="img"><img src="./img/${candidato.fotos[i].url}" alt=""/>${candidato.fotos}</div>`;
            }
            
        }

        imagens.innerHTML = fotosHtml;
    }else{
        seuVoto.style.display ='block';
        aviso.style.display= 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">voto null</div>';
        
    }
}

function clicou(n) {
    let numeroElemento = document.querySelector('.num.pisca'); // 
    if(numeroElemento!==null){ // se for diferente de nulo ele vai preencher o vai clicado
        numeroElemento.innerHTML = n;
        numero =`${numero}${n}`;

        numeroElemento.classList.remove('pisca');// remove o pisca qnd for preenchido com numero

        if(numeroElemento.nextElementSibling !== null){
        numeroElemento.nextElementSibling.classList.add('pisca');// aponta pro proximo quadrado
        }else{
            atualizaInterface()
        }
    }
}


function votobranco() {
    if(numero === ''){
        numero ='';
        branco = true;
        seuVoto.style.display ='block';
        aviso.style.display= 'block';
        numeros.innerHTML= '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO!</div>';
        imagens.innerHTML='';
    }else{
        alert('para votar em branco digite nenhum numero, caso ja tenha digitado, aperte corrigir e depois o botao de branco!');
    }
}
function corrigir(params) {
    comecarEtapa()
}

function confirmar(params) {
    let etapa = etapas[etapaAtual];
    let  votoconfirmado = false;


    if(branco === true){
        votoconfirmado = true;
        resultado.push({
            etapa: etapas[etapaAtual].titulo,
            resultado: 'branco'
        });
        console.log('confirmando como branco');

    }else if(numero.lenght === etapa.numeros){
        votoconfirmado =true;
        resultado.push({
            etapa: etapas[etapaAtual].titulo,
            resultado: numero
        });
        console.log('confirmando voto para');
    }
    if(votoconfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined ){
            comecarEtapa();
        }else{
            document.querySelector('.screen').innerHTML ='<div class="aviso--fim pisca">FIM!</div>';
            console.log(resultado);
        }
    }
}


comecarEtapa()