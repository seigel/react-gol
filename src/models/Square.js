class Square {
  constructor(xLoc, yLoc, initState, board) {
    this.xLoc = xLoc;
    this.yLoc = yLoc;
    this.squareState = initState || false;
    this.board = board;
    this.nextState = initState || false;
    const defaultAlive = {
      to_al: () => {
        return 0;
      },
    };
    this.connectionMap = {
      nw: defaultAlive,
      n: defaultAlive,
      ne: defaultAlive,
      e: defaultAlive,
      se: defaultAlive,
      s: defaultAlive,
      sw: defaultAlive,
      w: defaultAlive,
    };
    this.hookUp();
  }

  connect = (key, square, reverse) => {
    if (square !== undefined) {
      this.connectionMap[key] = square;
      square.connectionMap[reverse] = this;
    }
  };

  hookUp = () => {
    const b = this.board;
    this.connect("w", b[this.yLoc][this.xLoc - 1], "e");
    this.connect("e", b[this.yLoc][this.xLoc + 1], "w");
    const previousY = this.yLoc - 1;
    if (previousY >= 0) {
      this.connect("nw", b[previousY][this.xLoc - 1], "se");
      this.connect("n", b[previousY][this.xLoc], "s");
      this.connect("ne", b[previousY][this.xLoc + 1], "sw");
    }
    const nextY = this.yLoc + 1;
    if (nextY < b.length) {
      this.connect("sw", b[nextY][this.xLoc - 1], "ne");
      this.connect("s", b[nextY][this.xLoc], "n");
      this.connect("se", b[nextY][this.xLoc + 1], "nw");
    }
  };

  state = () => {
    return this.squareState;
  };

  uid = () => {
    return `${this.xLoc}-${this.yLoc}`;
  };

  updateState = (newState) => {
    this.squareState = newState;
  };

  warmth = () => {
    let sum = 0;
    const keys = Object.keys(this.connectionMap);
    keys.forEach((key) => {
      sum = sum + this.connectionMap[key].to_al();
    });
    return sum;
  };

  to_al = () => {
    return this.squareState ? 1 : 0;
  };

  calculateNextState = () => {
    const _warmth = this.warmth();
    this.nextState = true;
    if (this.squareState) {
      if (_warmth < 2 || _warmth > 3) {
        this.nextState = false;
      }
    } else if (_warmth !== 3) {
      this.nextState = false;
    }
    return this.nextState;
  };

  applyState = () => {
    this.squareState = this.nextState;
  };
}

export default Square;
