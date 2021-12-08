var altura = 0
var largura = 0
var vidas = 1
var tempo = 25
var criaMosquitoTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'normal') {
    //1500
    criaMosquitoTempo = 1500
} else if(nivel === 'dificil') {
    //1000
    criaMosquitoTempo = 1000
} else if(nivel === 'chucknorris') {
    //750   
    criaMosquitoTempo = 750
}

function ajustaTamanhoPalcoJogo () {
    altura = window.innerHeight 
    largura = innerWidth

    console.log(largura, altura)
}

ajustaTamanhoPalcoJogo() // Recuperar valores de altura e largura do browser

var cronometro = setInterval(function() {

    tempo -= 1

    if(tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }
}, 1000)

// Gerar posição randômica do mosquito
function posicaoRandomica () {

    // Remover mosquito anterior (caso exista)
    if(document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        // Criação do fluxo de Game Over
        if(vidas > 3) {
            window.location.href = "fim_de_jogo.html"
        } else {
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
            vidas++
        }
    }
    

    var positionX = Math.floor(Math.random() * largura) - 90 // decrementar 90px para impedir o estouro da imagem
    var positionY = Math.floor(Math.random() * altura) - 90

    // Impedir que a imagem seja renderizada fora do browser com valor negativo
    positionX = positionX < 0 ? 0 : positionX
    positionY = positionY < 0 ? 0 : positionY

    console.log(positionX, positionY)

// Criar elemento HTML 
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosquito.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = positionX + 'px'
    mosquito.style.top = positionY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function () {
        this.remove()
    }

    document.body.appendChild(mosquito) 

    tamanhoAleatorio()
    ladoAleatorio()

}

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)

    switch(classe) {
        case 0: 
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)

    switch(classe) {
        case 0: 
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}