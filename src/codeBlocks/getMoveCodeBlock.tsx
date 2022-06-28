export const getMoveCodeBlock = `findBestMove: (
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
    },`;
