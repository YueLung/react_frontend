import { BLACK_CHESS, WHITE_CHESS } from './define.js'

export function getOppositeChessType(chessType) {
  return chessType === BLACK_CHESS ? WHITE_CHESS : BLACK_CHESS;
}