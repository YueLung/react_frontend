import { NONE_CHESS } from './define.js';


export function checkIsWin(boardInfo, checkedChessInfo) {
  return isWinHorizontal(boardInfo, checkedChessInfo) || isWinVertical(boardInfo, checkedChessInfo) ||
    isWinRightOblique(boardInfo, checkedChessInfo) || isWinLeftOblique(boardInfo, checkedChessInfo);
}

export function checkIsTie(boardInfo) {
  let res = true;

  for (let y = 0; y < boardInfo.boardSize; y++) {
    for (let x = 0; x < boardInfo.boardSize; x++) {
      if (boardInfo.board[y][x] === NONE_CHESS) {
        res = false;
        break;
      }
    }
  }
  return res;
}

function isWinHorizontal(boardInfo, checkedChessInfo) {
  return getConnectCount(boardInfo, checkedChessInfo, 1, 0) +
    getConnectCount(boardInfo, checkedChessInfo, -1, 0) - 1 >= boardInfo.winCount;
}

function isWinVertical(boardInfo, checkedChessInfo) {
  return getConnectCount(boardInfo, checkedChessInfo, 0, 1) +
    getConnectCount(boardInfo, checkedChessInfo, 0, -1) - 1 >= boardInfo.winCount;
}

function isWinRightOblique(boardInfo, checkedChessInfo) {
  return getConnectCount(boardInfo, checkedChessInfo, -1, 1) +
    getConnectCount(boardInfo, checkedChessInfo, 1, -1) - 1 >= boardInfo.winCount;
}

function isWinLeftOblique(boardInfo, checkedChessInfo) {
  return getConnectCount(boardInfo, checkedChessInfo, 1, 1) +
    getConnectCount(boardInfo, checkedChessInfo, -1, -1) - 1 >= boardInfo.winCount;
}

function getConnectCount(boardInfo, checkedChessInfo, volumeX, volumeY) {
  let res = 0;

  let x = checkedChessInfo.x;
  let y = checkedChessInfo.y;

  while (boardInfo.board[y][x] === checkedChessInfo.chessType) {
    res++;
    x += volumeX;
    y += volumeY;

    if ((y < 0 || y >= boardInfo.boardSize) ||
      (x < 0 || x >= boardInfo.boardSize)) {
      break;
    }
  }

  return res;
}






