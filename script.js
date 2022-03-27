const card=document.querySelectorAll(".cards");

let matchCard=0;
let cardOne, cardTwo;
let disableDeck=false;

function flipCard(e){
    let clickedCard= e.target; //getting user click card
    
    if(clickedCard !== cardOne && !disableDeck){
        clickedCard.classList.add("flip");

        if(!cardOne){
            return cardOne = clickedCard;//return the card one value to click
        }
        cardTwo= clickedCard;
        disableDeck=true;

        let cardOneImg = cardOne.querySelector("img").src,
        cardTwoImg = cardTwo.querySelector("img").src;
        mactchCards(cardOneImg, cardTwoImg);
    }
}

function mactchCards(img1, img2){
    if(img1 === img2)//if cards match
    {
        matchCard++;//increase matchCard Balue by 1
        //if value=8 mean user has matched all card(8*2=16 cards)
        if(matchCard==8){
            setTimeout(() =>{
                return suffleCard();
            },1000); //calling suffle function after 1s
        }

        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";//setting bothing class to blank
        return disableDeck=false;
    }
       setTimeout(() => {//adding shake to both class after 400s
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
       },400);
    
       setTimeout(() => {//removing both shake & flip class from the both class after 1.2s
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = ""; //setting bothing class to blank
        disableDeck=false;
       },1200);
    
}

function suffleCard(){
    matchCard=0;
    disableDeck=false;
    cardOne= cardTwo= "";
    //creating arr of 16 item and each item is repeat twice
    let arr=[2,3,4,7,1,6,5,8,2,3,4,7,1,6,5,8];
    arr.sort(() => Math.random() > 0.5? 1:-1); //sorting arr item randomly
    
    card.forEach((cards, index) => { 
        cards.classList.remove("flip");
        let imgTag= cards.querySelector("img");
        imgTag.src = `photo/p${arr[index]}.png`;
        cards.addEventListener("click",flipCard);
    });
}
suffleCard();

card.forEach(cards => { //add click event to at all
    
    cards.addEventListener("click",flipCard);
})
