export const tttBoardCodeBlock = `class TicTacToeBoard {
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
  }`;
