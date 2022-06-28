import React, { useEffect, useState } from "react";
import { TileState, BoardStats } from "../App";
import { GRID_SIZE } from "../enum/gridSize";
import { ticTacToe } from "../functions/ticTacToe";
import Tile from "./Tile";

const gridCols = {
  3: "grid-cols-3",
  5: "grid-cols-5",
  7: "grid-cols-7",
};

const gridRows = {
  3: "grid-rows-3",
  5: "grid-rows-5",
  7: "grid-rows-7",
};

const Board = (props: {
  gridSize: GRID_SIZE;
  maxDepth: number;
  aiPlayer: "X" | "O";
  statChange: (stats: BoardStats) => void;
  getState: (state: "X" | "O" | "TIE" | false) => void;
  playGame: boolean;
}) => {
  const { gridSize, maxDepth, statChange, getState, playGame, aiPlayer } =
    props;

  const [playerTurn, setPlayerTurn] = useState(aiPlayer === "X" ? false : true);

  const [board, setBoard] = useState<TileState[]>(
    Array.from({ length: gridSize * gridSize }, (i, k) => k)
  );

  const [boardState, setBoardState] = useState<"X" | "O" | "TIE" | false>(
    false
  );

  const [localPlayGame, setLocalPlayGame] = useState(playGame);

  const handleMove = (index: number) => {
    if (
      playGame &&
      localPlayGame &&
      playerTurn &&
      typeof board[index] !== "string"
    ) {
      setBoard((prev) => {
        const newBoard = [...prev];
        newBoard[index] = aiPlayer === "X" ? "O" : "X";
        return newBoard;
      });
      setPlayerTurn(false);
    }
  };

  useEffect(() => {
    const ttt = ticTacToe([...board]);
    const winner = ttt.boardState();
    if (winner) {
      setLocalPlayGame(false);
      setBoardState(winner);
      getState(winner);
    }
  }, [board, getState]);

  useEffect(() => {
    if (!playerTurn && playGame && localPlayGame) {
      // setup ai and board
      const ttt = ticTacToe([...board]);

      // create all possible pos and find best move
      const move = ttt.findBestMove(aiPlayer, maxDepth) as number;
      setBoard((prev) => {
        const newBoard = [...prev];
        newBoard[move] = aiPlayer;
        return newBoard;
      });

      statChange({
        eval: ttt.getTotalEvals(),
        pruned: ttt.getTotalPruned(),
        duration: ttt.getDuration(),
      });

      setPlayerTurn(true);
    }
  }, [board, playerTurn, playGame, maxDepth, statChange, aiPlayer]);

  return (
    <>
      <section
        className={`h-[80vw] w-[80vw] sm:h-[50vh] sm:w-[50vh] grid ${gridCols[gridSize]} ${gridRows[gridSize]}`}
      >
        {board.map((state, index) => (
          <Tile
            key={index}
            onClick={handleMove}
            index={index}
            state={state}
            gameOn={playGame}
          />
        ))}
      </section>
    </>
  );
};

export default Board;
