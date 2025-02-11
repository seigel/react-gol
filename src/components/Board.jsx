import {useCallback, useEffect, useMemo, useState} from "react";
import {
    clearBoard,
    createBoard,
    moveToNextState,
} from "../models/BoardModel.js";
import Atom from "./Atom";
import PropTypes from "prop-types";

const Board = ({x, y, pattern}) => {
    const [isRunning, setIsRunning] = useState(false);
    const [count, setCount] = useState(0);
    const [generation, setGeneration] = useState(0);
    const [buttonLabel, setButtonLabel] = useState("Clear Board");
    const [timer, setTimer] = useState(150);

    useEffect(() => {
        console.log('redoing');
        const interval = setInterval(() => {
            console.log('intervalling');
            setCount(prev => prev + 1);
        }, timer);
        return () => clearInterval(interval);
    },[]);

    useEffect(() => {
        console.log('count', count);
        if (isRunning) {
            moveToNextState();
            setGeneration(prev => prev + 1);
        }
    }, [isRunning, count]);

    const board = useMemo(() => {
        return createBoard(x, y, pattern);
    }, [x, y, pattern]);

    const toggleRunning = () => {
        setIsRunning(!isRunning)
    };

    const clearBoardAction = useCallback(() => {
        setButtonLabel("...");
        setIsRunning(false);
        setGeneration(0);
        clearBoard();
        setButtonLabel("Clear Board");
    },[]);

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
    console.log('render')
    return (
        <>
            <button onClick={toggleRunning}>
                The Board {isRunning ? "is" : "is not"} Running
            </button>
            <button onClick={clearBoardAction}>
                {buttonLabel}
            </button>
            <div>{generation}</div>
            <div style={{marginBottom: 10}}>
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
