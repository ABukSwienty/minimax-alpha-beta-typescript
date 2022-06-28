import { HoverNav } from "./HoverNav";
import { Icon } from "./Icon";
import { NavListItem } from "./NavListItem";

export const Header = (props: {
  showModal: () => void;
  toggleAi: () => void;
  handleIncreaseDepth: () => void;
  handleDecreaseDepth: () => void;
  aiPlayer: "X" | "O";
  stats: {
    duration: number;
    eval: number;
    pruned: number;
  };
  depth: number;
}) => {
  const {
    showModal,
    toggleAi,
    handleIncreaseDepth,
    handleDecreaseDepth,
    aiPlayer,
    stats,
    depth,
  } = props;
  return (
    <header className="App-header fixed w-screen space-y-4 md:space-y-0 h-24 md:h-12 flex-col md:flex-row bg-transparent py-4 md:py-0  px-8 md:px-4 flex items-center justify-between 4k:h-32 z-50">
      <h1 className="md:hidden text-center w-full">
        Alpha Beta Minimax Algorithm
      </h1>

      <ul className="text-sm font-medium h-full grid grid-cols-2 place md:grid-cols-none gap-4 md:gap-0 md:flex md:items-center md:justify-center w-full md:w-1/2">
        <NavListItem onClick={showModal}>
          <Icon icon="info" />
          <span>About</span>
        </NavListItem>
        <NavListItem onClick={toggleAi}>
          <Icon icon="computer" />
          <span>
            {'"'}
            {aiPlayer}
            {'"'}
          </span>
        </NavListItem>

        <NavListItem className="">
          <Icon icon="timer" />
          <span className="">{stats.duration}ms</span>
          <HoverNav
            title="Duration"
            text="The duration between creating all possible moves and then
                completing the minimax evaluation on all moves."
          />
        </NavListItem>
        <NavListItem>
          <Icon icon="functions" />
          <span>{stats.eval}</span>
          <HoverNav
            title="Evaluations"
            text="The total number of recursive minimax evaluations."
          />
        </NavListItem>
        <NavListItem>
          <Icon icon="cut" />
          <span>{stats.pruned}</span>
          <HoverNav
            title="Branches pruned"
            text="The total number of branches pruned from the mimimax
                evaluations."
          />
        </NavListItem>
        <NavListItem>
          <Icon icon="call_split" />
          <span>{depth}</span>

          <HoverNav
            title="Depth"
            text=" The current maximum depth for both creating possible moves and
                minimax evaluation depth. A minimum of 2 is needed to calculate the maximizing player."
          >
            <div className="w-full inline-flex flex-row justify-evenly">
              <button
                className="flex items-center rounded-full hover:bg-blue-500 hover:text-white"
                onClick={handleDecreaseDepth}
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>

              <button
                className="flex items-center rounded-full hover:bg-blue-500 hover:text-white"
                onClick={handleIncreaseDepth}
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </HoverNav>
        </NavListItem>
      </ul>

      <h1 className="invisible md:visible w-1/2 h-full font-medium text-lg  md:text-1xl lg:text-2xl 4k:text-4xl flex items-center justify-center md:justify-end text-gray-700">
        Alpha Beta Minimax Algorithm
      </h1>
    </header>
  );
};
