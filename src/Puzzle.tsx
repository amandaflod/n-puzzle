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
    const numbers = [...Array(rows * columns).keys()];

    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    setTiles(numbers);
  };

  useEffect(() => {
    shuffle();
  }, []);

  return (
    <div>
      <PuzzleWrapper columns={columns} rows={rows}>
        {tiles.map((number) => (
          <Tile number={number} />
        ))}
      </PuzzleWrapper>
      <button onClick={shuffle}>Shuffle</button>
    </div>
  );
};
