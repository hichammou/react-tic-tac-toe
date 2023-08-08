import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function onSquareClick(i) {
    if (squares.at(i) !== null || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const status = winner
    ? `winner is ${winner}`
    : `next player ${xIsNext ? "X" : "O"}`;

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square onSquareClick={() => onSquareClick(0)} value={squares[0]} />
        <Square onSquareClick={() => onSquareClick(1)} value={squares[1]} />
        <Square onSquareClick={() => onSquareClick(2)} value={squares[2]} />
      </div>
      <div className="board-row">
        <Square onSquareClick={() => onSquareClick(3)} value={squares[3]} />
        <Square onSquareClick={() => onSquareClick(4)} value={squares[4]} />
        <Square onSquareClick={() => onSquareClick(5)} value={squares[5]} />
      </div>
      <div className="board-row">
        <Square onSquareClick={() => onSquareClick(6)} value={squares[6]} />
        <Square onSquareClick={() => onSquareClick(7)} value={squares[7]} />
        <Square onSquareClick={() => onSquareClick(8)} value={squares[8]} />
      </div>
    </>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currnetMove, setCurrentMove] = useState(0);
  const xIsNext = currnetMove % 2 === 0;
  const currentSquares = history.at(currnetMove);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currnetMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTO(nextmove) {
    setCurrentMove(nextmove);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>
          {history.map((_, move) => {
            // move is the index  map(item, index, array)
            return (
              <li key={move}>
                <button onClick={() => jumpTO(move)}>
                  {move > 0 ? `Go to move #${move}` : "Go to game start"}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
