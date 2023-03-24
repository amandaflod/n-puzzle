import styled from "styled-components";

type TileProps = {
  value: number | null;
  onMove: () => void;
};

const TileWrapper = styled.div<{ isClickable: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid grey;
  cursor: ${({ isClickable }) => (isClickable ? "pointer" : "default")};
  opacity: ${({ isClickable }) => (isClickable ? 1 : 0.5)};
  box-shadow: 0 0.5rem 1rem lightgray;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

export const Tile = ({ value, onMove }: TileProps) => {
  const handleClick = () => {
    if (value !== null) {
      onMove();
    }
  };

  const isClickable = value !== null;

  return (
    <>
      {isClickable ? (
        <TileWrapper isClickable={isClickable} onClick={handleClick}>
          {value}
        </TileWrapper>
      ) : (
        <TileWrapper isClickable={isClickable}>{value}</TileWrapper>
      )}
    </>
  );
};
