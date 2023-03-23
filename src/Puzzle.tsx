import styled from "styled-components";
import { useState } from "react";
import { Tile } from "./Tile";

type PuzzleProps = {
  rows: number;
  columns: number;
};

const PuzzleWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 3rem;
`;

const StyledPuzzle = styled.div<PuzzleProps>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  grid-template-rows: repeat(${({ rows }) => rows}, 1fr);
  gap: 0.5rem;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  margin-top: 1rem;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: white;
  background-color: black;
  font-family: inherit;
  font-size: 1rem;
  box-shadow: 0 0.5rem 1rem lightgray;
  &:hover {
    background-color: dimgray;
  }
  &:active {
    transform: translateY(2px);
  }
`;

const Gif = styled.iframe`
  border: 0;
  margin-top: 1rem;
`;

const rows = 3;
const columns = 3;

const getShuffledArray = (arr: (number | null)[]) => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const values = getShuffledArray([
  null,
  ...Array(rows * columns - 1)
    .fill(null)
    .map((_, i) => i + 1),
]);

const inclusiveRange = (a: number, b: number) => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);

  const list = [];
  for (let i = min; i <= max; i++) {
    list.push(i);
  }

  if (a > b) {
    list.reverse();
  }

  return list;
};

const getPositionsBetween = (pos1: number[], pos2: number[]) => {
  const [i1, j1] = pos1;
  const [i2, j2] = pos2;

  if (i1 === i2) {
    const result = [];
    for (const j of inclusiveRange(j1, j2)) {
      result.push([i1, j]);
    }
    return result;
  }

  if (j1 === j2) {
    const result = [];
    for (const i of inclusiveRange(i1, i2)) {
      result.push([i, j1]);
    }
    return result;
  }

  return null;
};

export const Puzzle = () => {
  const [board, setBoard] = useState(() =>
    Array(rows)
      .fill(null)
      .map((_, i) =>
        Array(columns)
          .fill(null)
          .map((_, j) => values[i * columns + j])
      )
  );

  const setPos = (pos: number[], val: number | null) => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      const [i, j] = pos;
      newBoard[i][j] = val;
      return newBoard;
    });
  };

  const getPosOfNull = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (board[i][j] === null) {
          return [i, j];
        }
      }
    }
  };

  const getValue = (pos: number[]) => board[pos[0]][pos[1]];

  const moveClickedTilesTowardNullPosition = (pos: number[]) => {
    const nullPos = getPosOfNull();
    const positionsBetween = getPositionsBetween(pos, nullPos);

    if (positionsBetween === null) {
      return false;
    }

    const valuesToMove = positionsBetween.map(getValue);

    for (let i = 1; i < positionsBetween.length; i++) {
      setPos(positionsBetween[i], valuesToMove[i - 1]);
    }

    setPos(positionsBetween[0], null);

    return true;
  };

  const shuffleBoard = () => {
    const newValues = getShuffledArray([
      null,
      ...Array(rows * columns - 1)
        .fill(null)
        .map((_, i) => i + 1),
    ]);

    const newBoard = Array(rows)
      .fill(null)
      .map((_, i) =>
        Array(columns)
          .fill(null)
          .map((_, j) => newValues[i * columns + j])
      );

    setBoard(newBoard);
  };

  const isPuzzleSolved = () => {
    const expectedValues = [...values];
    expectedValues.sort();

    let i = 0;
    let j = 0;
    for (const expectedValue of expectedValues) {
      if (board[i][j] !== expectedValue) {
        return false;
      }

      if (j === columns - 1) {
        i++;
        j = 0;
      } else {
        j++;
      }
    }

    return true;
  };

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
    <PuzzleWrapper>
      <h1>N-pussel</h1>
      <StyledPuzzle columns={columns} rows={rows}>
        {board.map((row, i) => {
          return row.map((value, j) => {
            return (
              <Tile
                value={value}
                key={`${i}-${j}`}
                onMove={() => moveClickedTilesTowardNullPosition([i, j])}
              />
            );
          });
        })}
      </StyledPuzzle>
      <Button onClick={shuffleBoard}>Slumpa</Button>
      {isPuzzleSolved() && (
        <>
          <Gif src="https://giphy.com/embed/3otPoS81loriI9sO8o" />
        </>
      )}
    </PuzzleWrapper>
  );
};
