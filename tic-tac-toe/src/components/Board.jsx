import Square from "./Square";

const Board = ({ xIsNext, squares, onPlay }) => {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);

  let playerStatus;
  if (winner) {
    playerStatus = `Winner is ${winner}`;
  } else {
    playerStatus = `Next player: ${xIsNext ? "X" : "O"}`;
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
      if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <div className="h-svh w-full flex flex-col justify-center items-center">
      <div>
        <p className="text-lg font-semibold">{playerStatus}</p>
      </div>
      <div>
        <Square onSqaureClick={() => handleClick(0)} value={squares[0]} />
        <Square onSqaureClick={() => handleClick(1)} value={squares[1]} />
        <Square onSqaureClick={() => handleClick(2)} value={squares[2]} />
      </div>
      <div>
        <Square onSqaureClick={() => handleClick(3)} value={squares[3]} />
        <Square onSqaureClick={() => handleClick(4)} value={squares[4]} />
        <Square onSqaureClick={() => handleClick(5)} value={squares[5]} />
      </div>
      <div>
        <Square onSqaureClick={() => handleClick(6)} value={squares[6]} />
        <Square onSqaureClick={() => handleClick(7)} value={squares[7]} />
        <Square onSqaureClick={() => handleClick(8)} value={squares[8]} />
      </div>
    </div>
  );
};

export default Board;
