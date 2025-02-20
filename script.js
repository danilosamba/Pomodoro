const html = document.querySelector('html')

const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const botoes = document.querySelectorAll('.app__card-button')
const texto = document.querySelector('.app__title')
const banner = document.querySelector('.app__image')
const musicaFocoInput = document.querySelector('#alternar-musica')

const iniciarOuPausarBt = document.querySelector('#start-pause span')
const startPauseBt = document.querySelector('#start-pause')
const imgIniciarPausar = document.querySelector('.app__card-primary-butto-icon')

const tempoNaTela = document.querySelector('#timer')


const musica = new Audio('./sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')



let tempoDecorridoEmSegundos  = 10
let intervaloId = null

musica.loop = true


musicaFocoInput.addEventListener('change', () =>{
    if (musica.paused){
        musica.play()
    } else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')

})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')

})

longoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto){
    mostrarTempo()
    zerar()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)

switch (contexto) {
    case "foco":
        texto.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
        break;

    case "descanso-curto":
        texto.innerHTML = `
            Que tal dar uma respirada,<br>
            <strong class="app__title-strong">faça uma pausa curta.</strong>
        `
        break;

    case "descanso-longo":
        texto.innerHTML = `
            Volte a superficie,<br>
            <strong class="app__title-strong">faça uma pausa longa.</strong>`

    default:
        break;
}
    

}

const contagemRegressiva = () =>{
    const check = document.querySelector('.toggle-checkbox')
    if (tempoDecorridoEmSegundos <= 0){
        musica.paused ? musica.play() : musica.pause();
        check.classList.toggle('.toggle-switch')
        audioTempoFinalizado.play()
        zerar()
        alert('Tempo Finalizado!')

        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}   

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if (intervaloId){
        audioPausa.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = 'Pausar'
    imgIniciarPausar.src = ('./imagens/pause.png')
}

function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = 'Continuar'
    imgIniciarPausar.src = ('./imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo (){

    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleString('pt-BR', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}