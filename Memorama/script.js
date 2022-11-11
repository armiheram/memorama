const tablero = document.getElementById("tablero");
const buttonStart = document.getElementById('start');
const news = document.getElementById('new');
const title = document.getElementById('title');
const attemps = document.getElementById('attemps');
const pares = document.getElementById('pares');

let cards = [];
let selected = [];
let pairs = 0;
let tries = 0;
let gamePlus = -1;
let img = [];

const newGame = () => {
    title.style.display = 'none';
    buttonStart.style.display = 'none';
    attemps.innerHTML = 'Intentos: ' + tries;
    pares.innerHTML = 'Pares encontrados: ' + pairs;
    selected = [];
    cards = [];
    pairs = 0;
    tries = 0;
    gamePlus++;
    img = [];

    for(let i = 0; i < 8; i++){
        const number = getRandom();
        img.push(number);
    }
    
    for (let i = 0; i < 16; i++) {
        cards.push(`
            <div class="card-container" onclick="select(${i})">
                <div class="cards" id="cards-${i}">
                    <div class="front back" id="back-${i}">
                        ${icons[img[gamePlus]]}
                    </div>
                    <div class="front card-back">
                        <img class="img-fluid" src="img/Card.jpg" alt="">
                    </div>
                </div>
            </div>
        `)
        if (i % 2 == 1) img.splice(0, 1);
    }
    cards.sort(() => Math.random() - 0.5);
    tablero.innerHTML = cards.join(" ");
}

const getRandom = () => {
    const random = Math.floor(Math.random() * icons.length);
    if(img.indexOf(random) == -1){
        return random;
    }else {
        return getRandom();
    }
}

const select = (card) => {
    let cardSelected = document.getElementById("cards-" + card);
    if(cardSelected.style.transform != "rotateY(180deg)"){
        if(selected.length < 2) {
            cardSelected.style.transform = "rotateY(180deg)";
            selected.push(card);
            if(selected.length == 2) deselect(selected);
        }
    }
}

const deselect = (cardsSelected) => {
    setTimeout(() => {
        tries ++;
        attemps.innerHTML = 'Intentos: ' + tries;
        pares.innerHTML = 'Pares encontrados: ' + pairs;
        let card1 = document.getElementById("back-" + cardsSelected[0])
        let card2 = document.getElementById("back-" + cardsSelected[1])
        if(card1.innerHTML != card2.innerHTML){
            selected = [];
            let cardOne = document.getElementById("cards-" + cardsSelected[0])
            let cardTwo = document.getElementById("cards-" + cardsSelected[1])
            card1.style.background = "crimson";
            card2.style.background = "crimson";
            setTimeout(() => {
                cardOne.style.transform = "rotateY(0deg)";
                cardTwo.style.transform = "rotateY(0deg)";
                card1.style.background = "#5f8697";
                card2.style.background = "#5f8697";
            }, 800)
        }else{
            card1.style.background = "green";
            card2.style.background = "green";
            selected = [];
            pairs ++;
            if(pairs == 8){
                tablero.innerHTML = ``;
                news.innerHTML = `
                    <div class="row text-center text-white">
                        <h3>Juego terminado!</h3>
                        <h5>Gracias por jugar</h5>
                        <p>Intentos realizados: <span class="text-muted fw-bold">${tries}</span></p>
                        <button id="start" class="btn btn-secondary btn-lg mt-2" onclick="newGame()">Empezar</button>
                    </div>
                `;
            }
        }
    }, 1000);
}