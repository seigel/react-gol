import Square from "./Square.js";
import board from "../components/Board.jsx";

let _board = null;

const createBoard = (x, y, pattern) => {
  _board ||= [];
  for (let yLoc = 0; yLoc < y; yLoc++) {
    _board[yLoc] = [];
    for (let xLoc = 0; xLoc < x; xLoc++) {
      let initValue = false;
      if (pattern && yLoc < pattern.length && xLoc < pattern[0].length) {
        initValue = pattern[yLoc][xLoc];
      }
      _board[yLoc][xLoc] = new Square(xLoc, yLoc, initValue, _board);
    }
  }
  return _board;
};

const clearBoard = (pattern) => {
  const y = _board.length;
  const x = _board[0].length;
  for (let yLoc = 0; yLoc < y; yLoc++) {
    for (let xLoc = 0; xLoc < x; xLoc++) {
      let initValue = false;
      if (pattern && yLoc < pattern.length && xLoc < pattern[0].length) {
        initValue = pattern[yLoc][xLoc];
      }
      _board[yLoc][xLoc].updateState(initValue);
    }
  }
}

const humanize = () => {
  return _board.map((row) => {
    return row.map((cell) => {
      return cell.to_al();
    });
  });
};

const moveToNextState = () => {
  _board.forEach((row) => {
    return row.forEach((cell) => {
      return cell.calculateNextState();
    });
  });
  _board.forEach((row) => {
    return row.forEach((cell) => {
      return cell.applyState();
    });
  });
};

export { createBoard, humanize, moveToNextState, clearBoard };
