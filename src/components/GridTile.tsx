import React from "react";
import { useState } from "react";
import "./GridTile.css";

export default function GridTile({
  value,
  onClick,
}: {
  value: string;
  onClick: () => void;
}) {
  const isEmpty = value === "";

  return (
    <div className={`grid-tile ${isEmpty ? "empty" : ""}`} onClick={onClick}>
      <h1>{value}</h1>
    </div>
  );
}
