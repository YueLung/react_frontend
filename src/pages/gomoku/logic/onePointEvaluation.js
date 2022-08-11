import { BLACK_CHESS, WHITE_CHESS, NONE_CHESS } from './define.js'

const Horizontal = 0
const Vertical = 1;
const RightOblique = 2
const LeftOblique = 3;


export function getScore(board, y, x, chessType) {
  let attackCloneModel = [...board.map(ary => [...ary])];
  let defenseCloneModel = [...board.map(ary => [...ary])];

  const enemyChessType = chessType === BLACK_CHESS ? WHITE_CHESS : BLACK_CHESS;

  attackCloneModel[y][x] = chessType;
  defenseCloneModel[y][x] = enemyChessType;

  const attackScore = getOnePointScore(attackCloneModel, x, y, chessType);
  const defenseScore = getOnePointScore(defenseCloneModel, x, y, enemyChessType);

  return (+attackScore * 1.05) + +defenseScore;
}

function getOnePointScore(board, x, y, chessType) {
  return +(getAttackLineScore(Horizontal, board, x, y, chessType)) +
    +(getAttackLineScore(Vertical, board, x, y, chessType)) +
    +(getAttackLineScore(RightOblique, board, x, y, chessType)) +
    +(getAttackLineScore(LeftOblique, board, x, y, chessType));

}

function getAttackLineScore(AttackDirection, board, x, y, chessType) {

  if (AttackDirection === Horizontal) {
    const directionInfoRight = getAttackConnectInfo(board, x, y, chessType, 1, 0);
    const directionInfoLeft = getAttackConnectInfo(board, x, y, chessType, -1, 0);

    return calculateAttackScore(directionInfoRight, directionInfoLeft);
  }
  else if (AttackDirection === Vertical) {
    const directionInfoRight = getAttackConnectInfo(board, x, y, chessType, 0, 1);
    const directionInfoLeft = getAttackConnectInfo(board, x, y, chessType, 0, -1);

    return calculateAttackScore(directionInfoRight, directionInfoLeft);
  }
  else if (AttackDirection === RightOblique) {
    const directionInfoRight = getAttackConnectInfo(board, x, y, chessType, -1, 1);
    const directionInfoLeft = getAttackConnectInfo(board, x, y, chessType, 1, -1);

    return calculateAttackScore(directionInfoRight, directionInfoLeft);
  }
  else if (AttackDirection === LeftOblique) {
    const directionInfoRight = getAttackConnectInfo(board, x, y, chessType, 1, 1);
    const directionInfoLeft = getAttackConnectInfo(board, x, y, chessType, -1, -1);

    return calculateAttackScore(directionInfoRight, directionInfoLeft);
  }
}

function getAttackConnectInfo(board, x, y, chessType, volumeX, volumeY) {
  let res = {};
  let connectCount = 0;

  while (board[y][x] === chessType) {
    connectCount++;
    x += volumeX;
    y += volumeY;

    if ((y < 0 || y >= board.length) ||
      (x < 0 || x >= board.length)) {
      break;
    }
  }

  res.ConnectCount = connectCount;

  if ((y < 0 || y >= board.length) ||
    (x < 0 || x >= board.length)) {
    res.IsLive = false;
  }
  else {
    if (board[y][x] === NONE_CHESS) {
      res.IsLive = true;
    }
    else if (board[y][x] === chessType) {
      console.log("Error impossible...");
    }
    else {
      res.IsLive = false;
    }
  }

  return res;
}

function calculateAttackScore(directionInfo_1, directionInfo_2) {
  let res = 0;

  let totalConnectCount = directionInfo_1.ConnectCount + directionInfo_2.ConnectCount - 1;
  let liveCount = 0;

  if (directionInfo_1.IsLive) liveCount += 1;
  if (directionInfo_2.IsLive) liveCount += 1;

  if (totalConnectCount >= 5) {
    res = 2000000;
  }
  else if (totalConnectCount === 4) {
    if (liveCount === 2)
      res = 999999;
    else if (liveCount === 1)
      res = 6000;
    else if (liveCount === 0)
      res = 0;
  }
  else if (totalConnectCount === 3) {
    if (liveCount === 2)
      res = 1800;
    else if (liveCount === 1)
      res = 800;
    else if (liveCount === 0)
      res = 0;
  }
  else if (totalConnectCount === 2) {
    if (liveCount === 2)
      res = 500;
    else if (liveCount === 1)
      res = 250;
    else if (liveCount === 0)
      res = 0;
  }
  else if (totalConnectCount === 1) {
    if (liveCount === 2)
      res = 125;
    else if (liveCount === 1)
      res = 50;
    else if (liveCount === 0)
      res = 0;
  }

  return res;
}