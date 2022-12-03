import Card from "/script/card.js";
import PlayerCPU from "/script/playerCPU.js";

//Jogo

class Game {
  constructor(){
    this.screen = document.getElementById("canvas");
    this.screenContext = this.screen.getContext("2d");
    
    this.deck = {card:[]};
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
      list: [new PlayerCPU()]
    };
    this.player.renderInventory = () =>{
      for(let player of this.player.list){
        
        let playerInventory = player.getInventory(), {inventoryStyle} = player;
        
        let cardPosition = inventoryStyle.position.x;
        
        for(let inventoryCard of  playerInventory){
          
          let card = new Object(this.deck.card.find(card => card.getValue() == inventoryCard));
         
          card.texture.context.face = true;
          card.texture.context.position = {
           x:cardPosition,
           y:inventoryStyle.position.y
          };
          
          cardPosition += (card.texture.width + inventoryStyle.spaceBetweenCards);
         
          card.render(this.screenContext);
        }
      }
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
/*game.player.list[0].setCardInInventory(1)
game.player.list[0].setCardInInventory(6)
game.player.list[0].setCardInInventory(13)
game.player.renderInventory()*/