import styled from "styled-components";

type TileProps = {
  number: number;
  position: number;
  onMove: (position: number) => void;
};

const TileWrapper = styled.div`
  border: 1px solid black;
`;

export const Tile = ({ number, onMove, position }: TileProps) => {
  return (
    <TileWrapper onClick={() => onMove(position)}>
      {number !== -1 ? number : ""}
    </TileWrapper>
  );
};
