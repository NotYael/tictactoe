import { useEffect, useState } from "react";
import Scoreboard from "./components/Scoreboard";
import Grid from "./components/Grid";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(true); // true = player 1, false = player 2
  const [winner, setWinner] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [gameId, setGameId] = useState(0); // used to remount Grid and clear its local state
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleWinner() {
    setPlayer1Score((s) => s + (currentPlayer ? 1 : 0));
    setPlayer2Score((s) => s + (currentPlayer ? 0 : 1));
    setWinner(true);
  }

  function handleReset() {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setCurrentPlayer(true);
    setTurnCount(0);
    setWinner(false);
    setGameId((id) => id + 1); // remount Grid to clear its local grid state
  }

  // Automatically start a new round shortly after a win
  useEffect(() => {
    if (!winner) return;
    const timeout = setTimeout(() => {
      setWinner(false);
      setCurrentPlayer(true);
      setTurnCount(0);
      setGameId((id) => id + 1);
    }, 800);
    return () => clearTimeout(timeout);
  }, [winner]);

  // reset board
  useEffect(() => {
    if (winner) return; // handled by the winner effect above
    if (turnCount !== 9) return; // draw
    const timeout = setTimeout(() => {
      setCurrentPlayer(true);
      setTurnCount(0);
      setGameId((id) => id + 1);
    }, 800);
    return () => clearTimeout(timeout);
  }, [turnCount, winner]);

  return (
    <div className="container">
      <div className="game-container">
        <div className="game-title">
          <h1>Tic Tac Toe</h1>
          <button className="info-btn" onClick={() => setIsModalOpen(true)}>
            i
          </button>
        </div>
        <Scoreboard
          player1Score={player1Score}
          player2Score={player2Score}
          currentPlayer={currentPlayer}
        />
        <Grid
          key={gameId}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          turnCount={turnCount}
          setTurnCount={setTurnCount}
          handleWinner={handleWinner}
          winner={winner}
        />
        <div className="buttons-container">
          <button className="btn" onClick={handleReset}>
            RESET
          </button>
        </div>
      </div>
      <span className="credit">Made by Danyael</span>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>How to Play Tic Tac Toe</h2>
        <p>
          Get three of your marks in a row—horizontally, vertically, or
          diagonally — before your opponent does.
        </p>
        <p>
          How to Play:
          <ol>
            <li>The game board has 9 squares arranged in a 3×3 grid.</li>
            <li>
              Players take turns marking a square — Player 1 is ⭕, and Player 2
              is ✖️ You can only mark empty squares.
            </li>
            <li>
              The first player to get three in a row (across, down, or
              diagonally) wins the game. If all squares are filled and no one
              has three in a row, it’s a draw.
            </li>
          </ol>
        </p>
      </Modal>
    </div>
  );
}

export default App;
