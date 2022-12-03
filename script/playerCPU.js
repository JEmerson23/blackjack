export default class PlayerCPU {
  #name;
  #inventory;
  constructor(){
    this.#name = "p-cpu-2.0";
    
    this.#inventory = [];
    this.inventoryStyle = {
      position: {x:64,y:28},
      spaceBetweenCards: 3,
    };
  }
  
  getName(){
    return this.#name;
  }
  
  clearInventory(){
    this.#inventory = [];
  }
  
  getInventory(){
    return this.#inventory;
  }
  
  setCardInInventory(card){
    if(card < 1 || card > 13)
     throw new Error(`[valor inválido ao tentar adicionar carta ao inventário (${card})]`);
     
    this.#inventory.push(card);
    return [card,this.getInventory(),this.getInventorySum];
  }
  
  getInventorySum(){
    return this.#inventory.reduce((total,value)=>total+=value,0);
  }
}