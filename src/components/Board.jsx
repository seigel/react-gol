import { useEffect, useMemo, useState } from "react";
import {
  createBoard,
  humanize,
  moveToNextState,
} from "../models/BoardModel.js";
import Atom from "./Atom";
import PropTypes from "prop-types";

const Board = ({ x, y, pattern }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        moveToNextState();
        setGeneration(generation + 1);
      }, 500);
      return () => clearInterval(interval);
    }

    setGeneration(0);
    return () => {};
  }, [generation, isRunning]);

  const board = useMemo(() => {
    return createBoard(x, y, pattern);
  }, [x, y]);

  const theBoard = board.map((a, i) => {
    const row = a.map((b) => {
      return (
        <Atom
          state={b.state}
          updateState={b.updateState}
          key={b.uid()}
          generation={generation}
        />
      );
    });

    return (
      <div
        key={i}
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 2,
        }}
      >
        {row}
      </div>
    );
  });
  return (
    <>
      <button onClick={() => setIsRunning(!isRunning)}>
        The Board {isRunning ? "is" : "is not"} Running
      </button>
      <div>{generation}</div>
      <div style={{ marginBottom: 10 }}>
        The dimensions of the board are x: {x || 0} and y: {y || 0}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {theBoard}
      </div>
    </>
  );
};
export default Board;

Board.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  pattern: PropTypes.array,
};
