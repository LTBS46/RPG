var Dice, Hand;

Dice = class Dice {
  constructor(size) {
    this.size = size;
    this.state = [];
  }
  lunch() {
    this.state.unshift(Math.floor(Math.random * this.size) + 1);
    return (this.state[0]);
  }
};

Hand = class Hand {
  constructor(expression) {
    this.hand = [];
    do {
      var x = expression.indexOf("d");
      var xv = expression.slice(0,x);
      expression = expression.slice(x + 1);
      var y = expression.indexOf(",");
      var yv = expression.slice(0,y);
      expression = expression.slice(y + 1);
      for (var i = 0; i < xv; i++) {this.hand.push(new Dice(yv))}
    } while (expression == "");
  }
  lunch() {
    var toreturn = [];
    for (var i = 0; i < this.hand.length; i++) {
      toreturn.push(this.hand[i].lunch());
    }
    return toreturn;
  }
}
