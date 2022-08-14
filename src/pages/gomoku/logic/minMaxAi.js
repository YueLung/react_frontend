import { NONE_CHESS } from './define.js';
import { getScore as getOnePointScore } from './onePointEvaluation.js';
import { getScore as getBoardScore } from './boardEvaluation.js';
import { checkIsWin, checkIsTie } from './connectStrategy.js';
import { getOppositeChessType } from './util.js';

// 自行設定最大數，最小數
// 不可使用 JS 提供的 Number.NEGATIVE_INFINITY、Number.MIN_VALUE 會錯誤
const MIN_VALUE = -9999999;
const MAX_VALUE = 9999999;

export function minMaxPlayChess(board, aiPlayChess, minMaxSearchDepth) {
  let bestPosInfo = minMaxSearch(board, aiPlayChess, true, 0, Number.MIN_VALUE, Number.MAX_VALUE, minMaxSearchDepth, aiPlayChess);
  // console.log('---------------------------');
  return { x: bestPosInfo.x, y: bestPosInfo.y }
}

function minMaxSearch(board, chessType, isMaxLayer, depth, alpha, beta, minMaxSearchDepth, aiPlayChess) {
  // console.log(`depth=${depth} isMaxLayer=${isMaxLayer}`);
  let bestScore = isMaxLayer ? MIN_VALUE : MAX_VALUE;
  let bestPosInfo = { x: -1, y: -1, score: bestScore };

  const orderPosScoreList = getPossibleBestPosOrderList(board, chessType);

  for (let i = 0; i < orderPosScoreList.length; ++i) {
    const posScore = orderPosScoreList[i];

    let y = posScore.y;
    let x = posScore.x;

    let cloneModel = [...board.map(ary => [...ary])];
    cloneModel[y][x] = chessType;

    let isWin = false;
    let isTie = false;

    let tmpScore = 0;

    const boardInfo = {
      board: cloneModel,
      boardSize: cloneModel.length,
      winCount: cloneModel.length === 3 ? 3 : 5
    };

    isWin = checkIsWin(boardInfo, { x, y, chessType });
    isTie = checkIsTie(boardInfo);

    if (isWin) {
      console.log('win happen');
      let Info = { x, y, score: isMaxLayer ? MAX_VALUE - 1 : MIN_VALUE + 1 };
      return Info;
    }

    if (depth === minMaxSearchDepth || isTie) {
      tmpScore = getBoardScore(cloneModel, aiPlayChess);
    }
    else {
      let nextChessType = getOppositeChessType(chessType);
      let info = minMaxSearch(cloneModel, nextChessType, !isMaxLayer, depth + 1, alpha, beta, minMaxSearchDepth, aiPlayChess);

      //===== alpha beta pruning ===== 
      if (isMaxLayer)
        alpha = Math.max(alpha, info.score);
      else
        beta = Math.min(beta, info.score);

      if (alpha >= beta)
        return info;
      //=============================== 

      tmpScore = info.score;
    }

    if (isMaxLayer) {
      if (tmpScore > bestPosInfo.score) {
        bestPosInfo.score = tmpScore;
        bestPosInfo.x = x;
        bestPosInfo.y = y;
      }
    }
    else {
      if (tmpScore < bestPosInfo.score) {
        bestPosInfo.score = tmpScore;
        bestPosInfo.x = x;
        bestPosInfo.y = y;
      }
    }

    if (depth === 0) {
      console.log(`y: ${y}  x: ${x} score: ${tmpScore}  bestScore:${bestPosInfo.score} depth: ${depth} `);
      //bestModel.PrintBoard();
    }
  }

  console.log('bestPosInfo', bestPosInfo);
  return bestPosInfo;
}


function getPossibleBestPosOrderList(board, chessType) {
  const FIND_COUNT = 10;

  let posScoreList = [];

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board.length; x++) {
      if (board[y][x] === NONE_CHESS) {
        let score = getOnePointScore(board, y, x, chessType);
        posScoreList.push({ y, x, score });
      }
    }
  }

  posScoreList.sort((a, b) => {
    return a.score > b.score ? -1 : 1;
  });

  if (posScoreList.length > FIND_COUNT)
    posScoreList.splice(FIND_COUNT);

  return posScoreList;
}