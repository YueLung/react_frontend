import { NONE_CHESS } from './define.js';
import { getScore } from './onePointEvaluation';


export function easyPlayChess(board, chessType) {
  let bestScore = Number.MIN_VALUE;
  let bestX = -1;
  let bestY = -1;

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board.length; x++) {

      if (board[y][x] === NONE_CHESS) {
        let score = getScore(board, y, x, chessType);

        if (score > bestScore) {
          bestScore = score;
          bestX = x;
          bestY = y;
        }
      }
    }
  }

  return { x: bestX, y: bestY };

}