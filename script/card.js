export default class Card {
  #value;
  #amount;
  constructor(number) {
    this.#value = number;
    this.#amount = 4;
    
    this.texture = {
      context: {
        face: false,
        position: {
          x: 32,
          y: 32
        }
      },
      image: "/assets/deck.png",
      width: 28,
      height: 40,
      resolution: 4,
      cut: {
        position: {}
      }
    };
    
    this.texture.cut.width = ()=>this.texture.width*this.texture.resolution;
    
    this.texture.cut.height = ()=>this.texture.height*this.texture.resolution;
    
    this.texture.cut.position.x = () => this.texture.context.face ? (this.#value-1)*this.texture.cut.width() : 0;

    this.texture.cut.position.y = ()=> this.texture.context.face ? 0 : this.texture.cut.height();
  }

  render(screenContext) {
    let {
      width,
      height,
      cut,
      image,
      context
    } = this.texture;

    const texture = new Image();

    texture.onload = ()=> {
      screenContext.drawImage(texture, cut.position.x(), cut.position.y(), cut.width(), cut.height(), context.position.x, context.position.y, width, height);
    };

    texture.src = image;
  }

  getValue() {
    return this.#value;
  }

  getCard(){
    if(this.#amount < 1)
     return false;
    this.#amount -= 1;
    return this.#value;
  }
  
  isAvailable(){
    return this.#amount > 0;
  }

}