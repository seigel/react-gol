import {useCallback, useEffect, useMemo, useState} from "react";
import {
    clearBoard,
    createBoard,
    moveToNextState,
} from "../models/BoardModel.js";
import Atom from "./Atom";
import Patterns from "../patterns";
import PropTypes from "prop-types";


const Board = ({x, y, pattern}) => {
    const [isRunning, setIsRunning] = useState(false);
    const [count, setCount] = useState(0);
    const [generation, setGeneration] = useState(0);
    const [buttonLabel, setButtonLabel] = useState("Clear Board");
    const [timer, setTimer] = useState(150);
    const [startPattern, setStartPattern] = useState('glider');

    useEffect(() => {
        console.log('redoing');
        const interval = setInterval(() => {
            // console.log('intervalling');
            setCount(prev => prev + 1);
        }, timer);
        return () => clearInterval(interval);
    },[]);

    useEffect(() => {
        // console.log('count', count);
        if (isRunning) {
            moveToNextState();
            setGeneration(prev => prev + 1);
        }
    }, [isRunning, count]);

    const board = useMemo(() => {
        return createBoard(x, y, Patterns[startPattern] || [[0]]);
    }, [x, y, startPattern]);

    const toggleRunning = () => {
        setIsRunning(!isRunning)
    };

    const clearBoardAction = useCallback(() => {
        setButtonLabel("...");
        setIsRunning(false);
        setGeneration(0);
        clearBoard(Patterns[startPattern] || [[0]]);
        setButtonLabel("Clear Board");
    },[startPattern]);

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
        <div>
          <button onClick={toggleRunning}>
            The Board {isRunning ? "is" : "is not"} Running
          </button>
          <button onClick={clearBoardAction}>{buttonLabel}</button>
          <label htmlFor="cars">Choose a start pattern:</label>
          <select name="patterns" onChange={(event)=>{
              console.log('selected', event.target.value);
              setStartPattern(event.target.value);
          }} value={startPattern}>
            <option value="">None</option>
            <option value="glider">Glider</option>
          </select>
        </div>
        <div>{generation}</div>
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
