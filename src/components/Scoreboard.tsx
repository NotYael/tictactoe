import React from "react";
import { useState } from "react";
import "./Scoreboard.css";

export default function Scoreboard({
  player1Score,
  player2Score,
  currentPlayer,
}: {
  player1Score: number;
  player2Score: number;
  currentPlayer: boolean;
}) {
  return (
    <div className="scoreboard">
      <div className="scoreboard-header">
        <h1>Current Player: {currentPlayer ? "Player 1 ⭕" : "Player 2 ✖️"}</h1>
      </div>
      <div className="scorecard">
        <div className="player-score-card">
          <h2>Player 1: {player1Score}</h2>
        </div>
        <div className="player-score-card">
          <h2>Player 2: {player2Score}</h2>
        </div>
      </div>
    </div>
  );
}
