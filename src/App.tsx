import React, { useCallback, useRef, useState } from "react";
import Board from "./components/Board";
import { DummyBoard } from "./components/DummyBoard";
import { GRID_SIZE } from "./enum/gridSize";
import { Header } from "./components/Header";
import { AboutModal } from "./components/AboutModal";

export type TileState = "X" | "O" | number;
export type BoardStats = { eval: number; pruned: number; duration: number };

function App() {
  const [gridSize, setGridSize] = useState(GRID_SIZE.THREE_X_THREE);

  const [showModal, setShowModal] = useState(false);

  const [aiPlayer, setAiPlayer] = useState<"X" | "O">("X");

  const resetRef = useRef<HTMLElement>(null);

  const [gameState, setGameState] = useState<
    false | "X wins!" | "O wins!" | "It's a tie!"
  >(false);

  const [depth, setDepth] = useState(5);

  const [playGame, setPlayGame] = useState(false);

  const [stats, setStats] = useState({
    eval: 0,
    pruned: 0,
    duration: 0,
  });

  const handleStatChange = useCallback((stats: BoardStats) => {
    setStats(stats);
  }, []);

  const handleIncreaseDepth = () => {
    setPlayGame(false);
    setDepth((prev) => {
      const newDepth = Math.min(prev + 1, 9);
      return newDepth;
    });
  };

  const handleNewGame = () => {
    setPlayGame((prev) => !prev);
  };

  const handleDecreaseDepth = () => {
    setPlayGame(false);
    setDepth((prev) => {
      const newDepth = Math.max(prev - 1, 1);
      return newDepth;
    });
  };

  const handleState = useCallback((state: "X" | "O" | "TIE" | false) => {
    if (state) {
      if (state === "X") setGameState("X wins!");
      if (state === "O") setGameState("O wins!");
      if (state === "TIE") setGameState("It's a tie!");

      let counter = 2;

      const bar = setInterval(() => {
        if (counter <= 0) clearInterval(bar);
        const el = resetRef.current as HTMLElement;
        if (el) el.innerText = `Resetting in ${counter}...`;
        counter--;
      }, 1000);

      setTimeout(() => {
        setStats({
          eval: 0,
          pruned: 0,
          duration: 0,
        });
        setGameState(false);
        setPlayGame(false);
      }, 3000);
    }
  }, []);

  const showModalHandler = useCallback(() => {
    setShowModal(true);
  }, []);

  const hideModalHandler = useCallback(() => {
    setShowModal(false);
  }, []);

  const toggleAiPlayerHandler = useCallback(() => {
    setAiPlayer((prev) => {
      const toggle = prev === "X" ? "O" : "X";
      return toggle;
    });
    setPlayGame(false);
  }, []);

  return (
    <>
      {showModal && <AboutModal hideModalHandler={hideModalHandler} />}

      <div className="App">
        <Header
          showModal={showModalHandler}
          toggleAi={toggleAiPlayerHandler}
          handleDecreaseDepth={handleDecreaseDepth}
          handleIncreaseDepth={handleIncreaseDepth}
          aiPlayer={aiPlayer}
          stats={stats}
          depth={depth}
        />
        <main className="w-screen h-screen min-h-screen pt-8">
          <div className="w-full h-full flex flex-col justify-center items-center space-x-8">
            {playGame && (
              <Board
                aiPlayer={aiPlayer}
                playGame={playGame}
                getState={handleState}
                gridSize={gridSize}
                maxDepth={depth}
                statChange={handleStatChange}
              />
            )}
            {!playGame && <DummyBoard onClick={handleNewGame} />}
            {gameState && (
              <div className="absolute select-none font-medium w-44 p-2 text-center text-2xl text-gray-700 bg-gray-100 rounded-lg shadow-lg">
                {gameState}
                <span ref={resetRef} className="block text-sm">
                  Resetting in 3...
                </span>
                <span className="absolute w-0 bg-gray-400 h-1 -bottom-1 left-0 rounded-br-lg rounded-bl-lg transition-all ease duration-75 overflow-hidden"></span>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
