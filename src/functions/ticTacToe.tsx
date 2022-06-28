import { TileState } from "../App";

const createPossibilities = (gridSize: number) => {
  const possibilites: number[][] = [];
  let placeHolder: number[] = [];

  const horizontal = () => {
    placeHolder = [];

    let counter = 0;
    for (let i = 0; i < gridSize * gridSize; i++) {
      if (counter < gridSize) {
        placeHolder.push(i);
      } else {
        possibilites.push(placeHolder);
        placeHolder = [];
        placeHolder.push(i);
        counter = 0;
      }

      counter++;
    }
    possibilites.push(placeHolder);
  };

  const vertical = () => {
    placeHolder = [];
    for (let i = 0; i < gridSize; i++) {
      for (let k = 0; k < gridSize * gridSize; k += gridSize) {
        placeHolder.push(i + k);
      }
      possibilites.push(placeHolder);
      placeHolder = [];
    }
  };

  const diagonal = () => {
    placeHolder = [];
    let counter = 0;

    // left
    for (let i = 0; i < gridSize * gridSize; i++) {
      if (i === 0) placeHolder.push(i);
      if (counter === gridSize + 1) {
        placeHolder.push(i);
        counter = 0;
      }
      counter++;
    }
    possibilites.push(placeHolder);
    placeHolder = [];
    counter = 0;
    // right
    for (let i = 0; i < gridSize * gridSize; i++) {
      if (counter === gridSize - 1 && placeHolder.length < gridSize) {
        placeHolder.push(i);
        counter = 0;
      }
      counter++;
    }
    possibilites.push(placeHolder);
  };

  horizontal();
  vertical();
  diagonal();

  return {
    possibilites,
  };
};

type Board = Array<TileState>;
const winningPossibilites = createPossibilities(3).possibilites;

/**
 * Wrapper for Board and Node classes as well as minimax function.
 * @param startBoard Array of X, O or numbers
 * @returns Object
 */
export function ticTacToe(startBoard: Board) {
  if (startBoard.length !== 9)
    throw new RangeError("Board must be 9 characters!");

  const timeStart = Date.now();
  let timeEnd = Date.now();

  let valueTable = {
    X: 0,
    O: 0,
  };

  class TicTacToeBoard {
    constructor(public board: Board) {}

    public move(player: "X" | "O" | number, index: number) {
      this.board[index] = player;
    }

    public value(): number {
      const winner = this.findWinner();
      if (winner) return valueTable[winner];
      return 0;
    }

    public isTerminal() {
      const hasWon = this.findWinner();
      if (hasWon === "X" || hasWon === "O") return true;
      return this.getAvailableTiles().length === 0;
    }

    public findWinner() {
      for (let i = 0; i < winningPossibilites.length; i++) {
        const possibleArr = winningPossibilites[i];
        let xHasWon: boolean[] = [];
        let oHasWon: boolean[] = [];

        for (let k = 0; k < possibleArr.length; k++) {
          const tile = this.board[possibleArr[k]];
          if (tile === "X") xHasWon.push(true);
          else xHasWon.push(false);
          if (tile === "O") oHasWon.push(true);
          else oHasWon.push(false);
        }
        if (!xHasWon.includes(false)) return "X";
        else xHasWon = [];
        if (!oHasWon.includes(false)) return "O";
        else oHasWon = [];
      }
      return false;
    }

    public getAvailableTiles() {
      return this.board.filter((val): val is number => typeof val === "number");
    }
  }

  class TicTacToeNode {
    public nodes: TicTacToeNode[] = [];
    public score: number = 0;
    constructor(
      public depth: number,
      public board: TicTacToeBoard,
      public maxDepth: number
    ) {}

    createNodes(playerToMove: "X" | "O") {
      if (this.board.isTerminal() || this.depth === this.maxDepth) return;
      const possibleMoves = this.board.getAvailableTiles() as Array<number>;

      this.score = this.board.value();

      for (let index = 0; index < possibleMoves.length; index++) {
        const move = possibleMoves[index];
        this.board.move(playerToMove, move);
        const newNode = new TicTacToeNode(
          this.depth + 1,
          new TicTacToeBoard([...this.board.board]),
          this.maxDepth
        );

        this.board.move(move, move);

        newNode.score = newNode.board.value();

        this.nodes.push(newNode);

        if (this.depth < this.maxDepth)
          newNode.createNodes(playerToMove === "X" ? "O" : "X");
      }
    }
  }

  const tttBoard = new TicTacToeBoard(startBoard.flat() as Board);

  let totalEvals = 0;
  let totalPruned = 0;
  function minimax(
    node: TicTacToeNode,
    depth: number,
    alpha: number,
    beta: number,
    maximizingPlayer: boolean
  ) {
    if (node.board.isTerminal() || depth === 0 || node.nodes.length === 0) {
      if (!maximizingPlayer) return node.score + depth;
      else return node.score - depth;
    }

    if (maximizingPlayer) {
      let maxEval = -Infinity;
      for (let index = 0; index < node.nodes.length; index++) {
        totalEvals++;
        const nodeChild = node.nodes[index];
        const value = minimax(
          nodeChild,
          depth - 1,
          alpha,
          beta,
          !maximizingPlayer
        );
        maxEval = Math.max(maxEval, value);
        alpha = Math.max(alpha, value);
        if (beta <= alpha) {
          totalPruned++;
          break;
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let index = 0; index < node.nodes.length; index++) {
        totalEvals++;
        const nodeChild = node.nodes[index];
        const value = minimax(
          nodeChild,
          depth - 1,
          alpha,
          beta,
          !maximizingPlayer
        );
        minEval = Math.min(minEval, value);
        beta = Math.min(beta, value);
        if (beta <= alpha) {
          totalPruned++;
          break;
        }
      }
      return minEval;
    }
  }

  return {
    /**
     * Find the best move for the ai player
     * @param aiPlayer string X or O
     * @param maxDepth number
     * @returns number | undefined
     */
    findBestMove: (
      aiPlayer: "X" | "O" = "X",
      maxDepth = 6
    ): number | undefined => {
      valueTable = {
        X: aiPlayer === "X" ? 1 : -1,
        O: aiPlayer === "O" ? 1 : -1,
      };

      const positions = new TicTacToeNode(0, tttBoard, maxDepth);
      positions.createNodes(aiPlayer);

      let bestMove: number = -Infinity;
      let bestScore: number = -Infinity;

      positions.nodes.forEach((node, index) => {
        const val = minimax(node, maxDepth, -Infinity, Infinity, false);
        if (val > bestScore) {
          bestScore = val;
          bestMove = index;
        }
      });
      timeEnd = Date.now();
      return tttBoard.getAvailableTiles()[bestMove];
    },
    /**
     * Checks the board to find a winner
     * @returns string X | O | TIE | false
     */
    boardState: () => {
      if (tttBoard.getAvailableTiles().length === 0) return "TIE";
      return tttBoard.findWinner();
    },
    /**
     * Total time spent calculating ai move.
     * @returns number
     */
    getDuration: () => timeEnd - timeStart,
    /**
     * Total evaluations.
     * @returns number
     */
    getTotalEvals: () => totalEvals,
    /**
     * Total branches pruned.
     * @returns number
     */
    getTotalPruned: () => totalPruned,
  };
}
