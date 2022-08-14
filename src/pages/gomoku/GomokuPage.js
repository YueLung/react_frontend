import React, { useState, useEffect } from 'react';
import { Button, Select, Alert } from 'antd';
import {
  NONE_CHESS,
  BLACK_CHESS,
  WHITE_CHESS,
  PEOPLE,
  RANDOM_AI,
  EASY_AI,
  MEDIUM_AI,
  HARD_AI
} from './logic/define.js';
import { checkIsWin, checkIsTie } from './logic/connectStrategy.js';
import { rdnPlayChess } from './logic/randomAi.js';
import { easyPlayChess } from './logic/easyAi.js';
import './GomokuPage.css';
import { minMaxPlayChess } from './logic/minMaxAi.js';
import { getOppositeChessType } from './logic/util';
const { Option } = Select;


const GomokuPage = () => {
  const [boardStyle, setBoardStyle] = useState({ width: '', height: '' });
  const [selectedBoardSize, setSelectedBoardSize] = useState(10);
  const [currentBoardSize, setCurrentBoardSize] = useState(selectedBoardSize);
  const [boardModel, setBoardModel] = useState(Array.from({ length: currentBoardSize }, () => Array.from({ length: currentBoardSize }, () => NONE_CHESS)));
  const [currentPlayChess, setCurrentPlayChess] = useState(BLACK_CHESS);
  const [isEndGame, setIsEndGame] = useState(false);
  const [message, setMessage] = useState('');
  const [latestChessInfo, setLatestChessInfo] = useState(null);
  const [selectedOpponentType, setSelectedOpponentType] = useState(MEDIUM_AI);
  const [opponentType, setOpponentType] = useState(MEDIUM_AI);

  let aiPlayChess = WHITE_CHESS;

  useEffect(() => {
    updatePlayRule();
  }, []);

  useEffect(() => {
    // check is anyone win or tie
    if (latestChessInfo) {
      const boardInfo = { board: boardModel, boardSize: currentBoardSize, winCount: currentBoardSize === 3 ? 3 : 5 };
      const _isWin = checkIsWin(
        boardInfo,
        latestChessInfo
      );

      const _isTie = checkIsTie(boardInfo);
      if (_isWin) {
        setIsEndGame(true);
        setMessage(prev => {
          return `${prev}     ${(latestChessInfo.chessType === BLACK_CHESS ? '黑棋獲勝' : '白棋獲勝')}`;
        });
        return;
      }
      else if (_isTie) {
        setIsEndGame(true);
        setMessage('平手');
        return;
      }
    }

    // turn computer
    if (opponentType !== PEOPLE && currentPlayChess === aiPlayChess) {
      // console.log('turn ai');

      let aiPlayPosition;
      if (opponentType === RANDOM_AI) {
        aiPlayPosition = rdnPlayChess(boardModel, currentBoardSize);
      }
      else if (opponentType === EASY_AI) {
        aiPlayPosition = easyPlayChess(boardModel, aiPlayChess);
      }
      else if (opponentType === MEDIUM_AI) {
        aiPlayPosition = minMaxPlayChess(boardModel, aiPlayChess, 1);
      }
      else if (opponentType === HARD_AI) {
        aiPlayPosition = minMaxPlayChess(boardModel, aiPlayChess, 3);
      }

      setBoardModel(prev => {
        prev[aiPlayPosition.y][aiPlayPosition.x] = aiPlayChess;
        return [...prev];
      });

      setLatestChessInfo({
        x: aiPlayPosition.x,
        y: aiPlayPosition.y,
        chessType: aiPlayChess
      });

      const nextPlayChess = getOppositeChessType(aiPlayChess);
      setCurrentPlayChess(nextPlayChess);
    }
  }, [boardModel]);


  const updatePlayRule = () => {
    if (selectedBoardSize === 3) setBoardStyle({ width: '120px', height: '120px' });
    else if (selectedBoardSize === 10) setBoardStyle({ width: '400px', height: '400px' });
    else if (selectedBoardSize === 15) setBoardStyle({ width: '600px', height: '600px' });

    setLatestChessInfo(null);
    setIsEndGame(false);
    setCurrentBoardSize(selectedBoardSize);
    setBoardModel(Array.from({ length: selectedBoardSize }, () => Array.from({ length: selectedBoardSize }, () => NONE_CHESS)));
    setCurrentPlayChess(BLACK_CHESS);
    setMessage(opponentType);
  }

  const getStyle = (i, j) => {
    let res = '';
    if (latestChessInfo && latestChessInfo.y === i && latestChessInfo.x === j) res = 'latest-chess '
    if (boardModel[i][j] === NONE_CHESS) return res + 'none-chess';
    if (boardModel[i][j] === BLACK_CHESS) return res + 'black-chess';
    if (boardModel[i][j] === WHITE_CHESS) return res + 'white-chess';
  }

  const onBoardClick = (i, j) => {
    if (boardModel[i][j] !== NONE_CHESS) return;
    if (isEndGame) return;
    if (opponentType !== PEOPLE && currentPlayChess === aiPlayChess) return;

    const chessType = currentPlayChess;

    setBoardModel(prev => {
      prev[i][j] = chessType;
      return [...prev];
    });

    setLatestChessInfo({ x: j, y: i, chessType });

    const nextPlayChess = getOppositeChessType(currentPlayChess);
    setCurrentPlayChess(nextPlayChess);
  }


  return (
    <>
      <Select
        defaultValue="10"
        style={{ width: 150 }}
        className="mr-2"
        onChange={(value) => setSelectedBoardSize(+value)}
      >
        <Option value="3">3x3</Option>
        <Option value="10">10x10</Option>
        <Option value="15">15x15</Option>
      </Select>

      <Button
        type="primary"
        onClick={updatePlayRule}
        className="mr-2"
      >
        更換棋盤
      </Button>
      <Select
        defaultValue={selectedOpponentType}
        style={{ width: 200 }}
        className="mr-2"
        onChange={(value) => setSelectedOpponentType(value)}
      >
        <Option value={PEOPLE}>{PEOPLE}</Option>
        <Option value={RANDOM_AI}>{RANDOM_AI}</Option>
        <Option value={EASY_AI}>{EASY_AI}</Option>
        <Option value={MEDIUM_AI}>{MEDIUM_AI}</Option>
        <Option value={HARD_AI}>{HARD_AI}</Option>
      </Select>

      <Button
        type="primary"
        onClick={() => { setOpponentType(selectedOpponentType); setMessage(selectedOpponentType); }}
      >
        更換對手
      </Button>

      <Alert style={{ width: '475px', height: '35px' }} className="mt-1 mb-1" message={message} type="success" />

      <div id="goban" style={boardStyle}>
        {
          Array.from(
            { length: currentBoardSize },
            (_, i) => (
              <div className="row r-0" key={i}>
                {
                  Array.from(
                    { length: currentBoardSize },
                    (_, j) => (
                      <div className="col" key={j}>
                        <Button
                          type="primary"
                          shape="circle"
                          onClick={() => onBoardClick(i, j)}
                          className={getStyle(i, j)}
                        >
                          chess
                        </Button>
                      </div>
                    ))
                }
              </div>
            ))
        }
      </div>
    </>
  )
}

export default GomokuPage;