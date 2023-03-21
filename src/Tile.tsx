import styled from "styled-components";

type TileProps = {
  number: number;
};

const TileWrapper = styled.div`
  border: 1px solid black;
`;

export const Tile = ({ number }: TileProps) => {
  return <TileWrapper>{number}</TileWrapper>;
};
