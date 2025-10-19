import React, { useState } from "react";
import GridTile from "./GridTile";
import "./Grid.css";

export default function Grid({
  currentPlayer,
  setCurrentPlayer,
  turnCount,
  setTurnCount,
  handleWinner,
  winner,
}: {
  currentPlayer: boolean;
  setCurrentPlayer: (currentPlayer: boolean) => void;
  turnCount: number;
  setTurnCount: (turnCount: number) => void;
  handleWinner: () => void;
  winner: boolean;
}) {
  const [grid, setGrid] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  function checkForWin(board: string[]) {
    const winningCombinations = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // main diagonal
      [2, 4, 6], // anti-diagonal
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        console.log("winner!");
        return true;
      }
    }
    console.log("no winner!");
    return false;
  }

  function handleTileClick(index: number) {
    // Do nothing if the tile is already filled or if the game is already won
    if (grid[index]) return;
    if (winner) return;

    const tileValue = currentPlayer ? "⭕" : "✖️";
    const nextGrid = grid.map((tile, i) => (i === index ? tileValue : tile));
    const nextPlayer = !currentPlayer;
    const nextTurnCount = turnCount + 1;

    if (nextTurnCount > 4) {
      const winner = checkForWin(nextGrid);
      if (winner) {
        handleWinner();
      }
    }

    setGrid(nextGrid);
    setCurrentPlayer(nextPlayer);
    setTurnCount(nextTurnCount);
  }

  return (
    <div className="grid">
      {grid.map((tile, index) => (
        <GridTile
          key={index}
          value={tile}
          onClick={() => handleTileClick(index)}
        />
      ))}
    </div>
  );
}
