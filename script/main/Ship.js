export default class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.isHorizontal = true;
    this.life = length;
  }

  hit() {
    this.life -= 1;
  }

  getPosition() {
    //true for horizontal ----- false for vertical;
    return this.isHorizontal ? "horizontal" : "vertical";
  }

  switchPosition() {
    this.isHorizontal = !this.isHorizontal;
  }

  isSunk() {
    if (this.life > 0) {
      return false;
    } else {
      return true;
    }
  }
}
