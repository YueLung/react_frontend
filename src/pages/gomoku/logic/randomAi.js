import { NONE_CHESS } from './define.js';


export function rdnPlayChess(board, boardSize) {
  for (let i = 0; i < 999; ++i) {
    let x = Math.floor(Math.random() * boardSize);
    let y = Math.floor(Math.random() * boardSize);

    if (board[y][x] === NONE_CHESS) return { x, y }
  }
}