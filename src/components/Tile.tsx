import { TileState } from "../App";
import MoveO from "./MoveO";
import MoveX from "./MoveX";

export const createBorders = (index: number) => {
  switch (index) {
    case 0:
      return "border-r border-b";
    case 1:
      return "border-l border-b border-r";
    case 2:
      return "border-l border-b";
    case 3:
      return "border-t border-r border-b";
    case 4:
      return "border";
    case 5:
      return "border-t border-l border-b";
    case 6:
      return "border-t border-r";
    case 7:
      return "border-l border-t border-r";
    case 8:
      return "border-l border-t";
  }
};

const Tile = (props: {
  state: TileState;
  index: number;
  onClick: (index: number) => void;
  gameOn: boolean;
}) => {
  const move =
    typeof props.state === "string" ? (
      props.state === "O" ? (
        <MoveO />
      ) : (
        <MoveX />
      )
    ) : (
      ""
    );

  const handleClick = () => {
    props.onClick(props.index);
  };

  let hoverColor = move === "" ? "hover:bg-green-50" : "hover:bg-red-50";
  if (!props.gameOn) hoverColor = "";

  return (
    <div
      className={`${createBorders(
        props.index
      )} inline-flex justify-center items-center cursor-pointer ${hoverColor} duration-200 ease-in-out transition-color`}
      onClick={handleClick}
    >
      {move}
    </div>
  );
};

export default Tile;
