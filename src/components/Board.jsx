import { useEffect, useMemo, useState } from "react";
import {
  createBoard,
  humanize,
  moveToNextState,
} from "../models/BoardModel.js";
import Atom from "./Atom";
import GenerationContext from "../context/GenerationContext.js";
import PropTypes from "prop-types";

const Board = ({ x, y }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    //Implementing the setInterval method
    if (isRunning) {
      const interval = setInterval(() => {
        console.log("generation board", generation, humanize());
        moveToNextState();
        setGeneration(generation + 1);
      }, 500);

      //Clearing the interval
      return () => clearInterval(interval);
    }
    setGeneration(0);
    return () => {};
  }, [generation, isRunning]);

  const board = useMemo(() => {
    return createBoard(x, y);
  }, [x, y]);

  const theBoard = board.map((a, i) => {
    const row = a.map((b) => {
      return <Atom state={b.state} updateState={b.updateState} key={b.uid()} />;
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
    <GenerationContext.Provider value={generation}>
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
    </GenerationContext.Provider>
  );
};
export default Board;

Board.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
};
