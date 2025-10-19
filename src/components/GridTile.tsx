import React from "react";
import { useState } from "react";
import "./GridTile.css";

export default function GridTile({
  value,
  onClick,
  currentPlayer,
}: {
  value: string;
  onClick: () => void;
  currentPlayer: boolean;
}) {
  const isEmpty = value === "";
  const playerClass = currentPlayer ? "player1" : "player2";

  return (
    <div
      className={`grid-tile ${isEmpty ? "empty" : ""} ${
        isEmpty ? playerClass : ""
      }`}
      onClick={onClick}
    >
      <h1>{value}</h1>
    </div>
  );
}
