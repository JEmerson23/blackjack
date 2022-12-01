import Card from "/script/card.js";

//Jogo

class Game {
  constructor(){
    this.screen = document.getElementById("canvas");
    this.screenContext = this.screen.getContext("2d");
    
    this.deck = {
      card:[],
    };
    this.deck.getCard = () => {
      function numberRandom(){
        const RANDOM = n =>Math.round(Math.random()*n);

        let SECONDS = new Date().getSeconds();

        return SECONDS > 52 ? RANDOM(5) : SECONDS % 2 == 0 ? RANDOM(9) : RANDOM(12);
      }
      
      let n = numberRandom()+1;
      
      let card = this.deck.card.find(c => c.getValue() == n);
      
      if(!card)throw new Error(`[cartas acabaram ou valor não corresponde (${n})]`);
      return card.getCard();
    }
    
    this.player = {
      current: null,
      list: []
    };
    
    //---------------//
    this.#createCards();
  }
  
  #createCards(){
    for(let i = 1;i <= 13;i++){
      this.deck.card.push(new Card(i));
      this.deck.card[this.deck.card.length-1].texture.context.position = {x:32,y:32};
    }
  }
  //--//
}

const game = new Game();
