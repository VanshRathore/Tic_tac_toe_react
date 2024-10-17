import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Card from "../Card/Card";

import './Grid.css';
import 'react-toastify/dist/ReactToastify.css';
import isWinner from "../../helper/CheckWinner";



function Grid({ numberOfCards }) {
    const [turn, setTurn] = useState(true); 
    const [board, setBoard] = useState(Array(numberOfCards).fill(""));
    const [winner, setWinner] = useState(null);
    
    function play(index) {
        if (board[index] !== "" || winner) return; // Prevent playing in occupied cell or after win
        
        board[index] = turn ? "0" : "X";
        const win = isWinner(board, turn ? "0" : "X");
        
        if (win) {
            setWinner(win);
            toast.success(`Congratulations ${win} won the game`);
        }

        setBoard([...board]);
        setTurn(!turn);
    }

    function reset() {
        setBoard(Array(numberOfCards).fill(""));
        setWinner(null);
        setTurn(true);
    }
    
    return (
        <>
            <ToastContainer position="top-center" />
            {winner && (
                <>
                    <h1 className="turn-highlight">Winner is {winner}</h1>
                    <button className="reset" onClick={reset}>Reset Game</button>
                </>
            )}
            <h1 className="turn-highlight">Current Turn: {turn ? "0" : "X"}</h1>
            <div className="grid">
                {board.map((value, idx) => (
                    <Card onPlay={play} player={value} key={idx} index={idx} />
                ))}
            </div>
            
        </>
    );
}

export default Grid;
