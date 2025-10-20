const cards = document.querySelectorAll(".card"),
    timeTag = document.querySelector(".time b"),
    flipsTag = document.querySelector(".flips b"),
    refreshBtn = document.querySelector(".details button"),
    msgBox =  document.querySelector(".msg");
//példa

let maxTime = 120;
let timeLeft = maxTime;
let flips = 0;

let matched = 0;
let cardOne, cardTwo, timer;
let disableDeck = false;
let isPlaying = false;

function initTimer() {
    if(timeLeft <= 0) {
        msgBox.innerText = 'Lejárt az idő!';
        cards.forEach(card => {
            card.removeEventListener("click", flipCard);
        });
        return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard({target: clickedCard}) {
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            //
            flips++;
            flipsTag.innerText = flips;
            //
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched == 8) {
            //alert("Nyertél!!");
            msgBox.innerText = 'NYERTÉL!!!';
            return clearInterval(timer);
            /*
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
            */
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    //reset
     timeLeft = maxTime;
     timeTag.innerText = timeLeft;
     isPlaying=false;
     clearInterval(timer);
     flips = 0;
     flipsTag.innerText = flips;
     msgBox.innerText='';
     disableDeck = true;
     cards.forEach(card => {
        card.addEventListener("click", flipCard);
    });
     

    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

// új játék gomb
refreshBtn.addEventListener("click", shuffleCard);
    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});