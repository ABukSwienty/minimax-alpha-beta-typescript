export const minimaxCodeBlock = `function minimax(
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
  }`;
