import { useEffect, useState } from "react";
import styled from "styled-components";
import { Tile } from "./Tile";

type PuzzleProps = {
  rows: number;
  columns: number;
};

const PuzzleWrapper = styled.div<PuzzleProps>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  grid-template-rows: repeat(${({ rows }) => rows}, 1fr);
`;

export const Puzzle = () => {
  const rows = 4;
  const columns = 4;

  const [tiles, setTiles] = useState<number[]>([]);

  const shuffle = () => {
    const numbers = [...Array(rows * columns - 1).keys()].map((n) => n + 1);
    numbers.push(-1);

    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    setTiles(numbers);
  };

  useEffect(() => {
    shuffle();
  }, []);

  const handleMove = (position: number) => {
    const emptyIndex = tiles.indexOf(-1);
    const emptyRow = Math.floor(emptyIndex / columns);
    const emptyCol = emptyIndex % columns;

    const row = Math.floor(position / columns);
    const col = position % columns;

    if (
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)
    ) {
      const newTiles = [...tiles];
      const indexDiff = position - emptyIndex;
      const step = indexDiff > 0 ? 1 : -1;
      for (let i = emptyIndex; i !== position; i += step) {
        newTiles[i] = newTiles[i + step];
      }
      newTiles[position] = -1;
      setTiles(newTiles);
    }
  };

  return (
    <div>
      <PuzzleWrapper columns={columns} rows={rows}>
        {tiles.map((number, index) => (
          <Tile number={number} position={index} onMove={handleMove} />
        ))}
      </PuzzleWrapper>
      <button onClick={shuffle}>Shuffle</button>
    </div>
  );
};
