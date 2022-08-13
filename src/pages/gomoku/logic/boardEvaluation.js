import {
  BLACK_CHESS,
  Horizontal,
  LeftOblique,
  RightOblique,
  Vertical
} from './define.js';
import { getAttackConnectInfo } from './onePointEvaluation.js';
import { getOppositeChessType } from './util.js';


export function getScore(board, chessType) {
  let res = 0;
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board.length; x++) {
      if (board[y][x] === chessType) {
        res += getOnePointScore(board, x, y, chessType);
      }
      else if (board[y][x] === getOppositeChessType(chessType)) {
        const enemyChessType = getOppositeChessType(chessType);
        res -= getOnePointScore(board, x, y, enemyChessType);
      }
    }
  }

  return res;
}

function getOnePointScore(board, x, y, posChessType) {
  let score = +(getAttackLineScore(Horizontal, board, x, y, posChessType)) +
    +(getAttackLineScore(Vertical, board, x, y, posChessType)) +
    +(getAttackLineScore(RightOblique, board, x, y, posChessType)) +
    +(getAttackLineScore(LeftOblique, board, x, y, posChessType));

  if (posChessType === BLACK_CHESS)
    score = score * 1.0;

  return score;
}

function getAttackLineScore(AttackDirection, board, x, y, posChessType) {
  if (AttackDirection === Horizontal) {
    const directionInfoRight = getAttackConnectInfo(board, x, y, posChessType, 1, 0);
    const directionInfoLeft = getAttackConnectInfo(board, x, y, posChessType, -1, 0);

    return calculateAttackScore(directionInfoRight, directionInfoLeft);
  }
  else if (AttackDirection === Vertical) {
    const directionInfoRight = getAttackConnectInfo(board, x, y, posChessType, 0, 1);
    const directionInfoLeft = getAttackConnectInfo(board, x, y, posChessType, 0, -1);

    return calculateAttackScore(directionInfoRight, directionInfoLeft);
  }
  else if (AttackDirection === RightOblique) {
    const directionInfoRight = getAttackConnectInfo(board, x, y, posChessType, -1, 1);
    const directionInfoLeft = getAttackConnectInfo(board, x, y, posChessType, 1, -1);

    return calculateAttackScore(directionInfoRight, directionInfoLeft);
  }
  else if (AttackDirection === LeftOblique) {
    const directionInfoRight = getAttackConnectInfo(board, x, y, posChessType, 1, 1);
    const directionInfoLeft = getAttackConnectInfo(board, x, y, posChessType, -1, -1);

    return calculateAttackScore(directionInfoRight, directionInfoLeft);
  }
}

function calculateAttackScore(directionInfo_1, directionInfo_2) {
  let res = 0;

  let totalConnectCount = directionInfo_1.ConnectCount + directionInfo_2.ConnectCount - 1;
  let liveCount = 0;

  if (directionInfo_1.IsLive) liveCount += 1;
  if (directionInfo_2.IsLive) liveCount += 1;

  if (totalConnectCount >= 5) {
    res = 200000;
  }
  else if (totalConnectCount === 4) {
    if (liveCount === 2)
      res = 7000;
    else if (liveCount === 1)
      res = 1500;
    else if (liveCount === 0)
      res = 0;
  }
  else if (totalConnectCount === 3) {
    if (liveCount === 2)
      res = 333;
    else if (liveCount === 1)
      res = 33;
    else if (liveCount === 0)
      res = 0;
  }
  else if (totalConnectCount === 2) {
    if (liveCount === 2)
      res = 50;
    else if (liveCount === 1)
      res = 5;
    else if (liveCount === 0)
      res = 0;
  }
  else if (totalConnectCount === 1) {
    if (liveCount === 2)
      res = 10;
    else if (liveCount === 1)
      res = 1;
    else if (liveCount === 0)
      res = 0;
  }

  return res;
}
