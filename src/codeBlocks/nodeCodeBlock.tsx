export const nodeCodeBlock = `class TicTacToeNode {
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
  }`;
