import React, { useState, useEffect } from 'react';
import { Button, Select, Alert } from 'antd';
import {
  NONE_CHESS,
  BLACK_CHESS,
  WHITE_CHESS,
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
const { Option } = Select;


const GomokuPage = () => {
  const [boardStyle, setBoardStyle] = useState({ width: '', height: '' });
  const [selectedBoardSize, setSelectedBoardSize] = useState(10);
  const [currentBoardSize, setCurrentBoardSize] = useState(selectedBoardSize);
  const [boardModel, setBoardModel] = useState(Array.from({ length: currentBoardSize }, () => Array.from({ length: currentBoardSize }, () => NONE_CHESS)));
  const [currentPlayer, setCurrentPlayer] = useState(BLACK_CHESS);
  const [isEndGame, setIsEndGame] = useState(false);
  const [message, setMessage] = useState('');
  const [latestChessInfo, setLatestChessInfo] = useState(null);
  const [selectedAiType, setSelectedAiType] = useState(MEDIUM_AI);
  const [aiType, setAiType] = useState(MEDIUM_AI);

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
        setMessage(latestChessInfo.chessType === BLACK_CHESS ? '黑棋獲勝' : '白棋獲勝');
        return;
      }
      else if (_isTie) {
        setIsEndGame(true);
        setMessage('平手');
        return;
      }
    }

    // turn computer
    if (currentPlayer === aiPlayChess) {
      // console.log('turn ai');


      let aiPlayPosition;
      if (aiType === RANDOM_AI) {
        aiPlayPosition = rdnPlayChess(boardModel, currentBoardSize);
      }
      else if (aiType === EASY_AI) {
        aiPlayPosition = easyPlayChess(boardModel, aiPlayChess);
      }
      else if (aiType === MEDIUM_AI) {
        aiPlayPosition = minMaxPlayChess(boardModel, aiPlayChess, 1);
      }
      else if (aiType === HARD_AI) {
        aiPlayPosition = minMaxPlayChess(boardModel, aiPlayChess, 1);
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

      if (aiPlayChess === BLACK_CHESS) setCurrentPlayer(WHITE_CHESS);
      else if (aiPlayChess === WHITE_CHESS) setCurrentPlayer(BLACK_CHESS);
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
    setCurrentPlayer(BLACK_CHESS);
  }

  const getStyle = (i, j) => {
    if (boardModel[i][j] === NONE_CHESS) return 'none-chess';
    if (boardModel[i][j] === BLACK_CHESS) return 'black-chess';
    if (boardModel[i][j] === WHITE_CHESS) return 'white-chess';
  }

  const onBoardClick = (i, j) => {
    if (boardModel[i][j] !== NONE_CHESS) return;
    if (isEndGame) return;

    const chessType = currentPlayer === BLACK_CHESS ? BLACK_CHESS : WHITE_CHESS;

    setBoardModel(prev => {
      prev[i][j] = chessType;
      return [...prev];
    });

    setLatestChessInfo({ x: j, y: i, chessType });

    if (currentPlayer === BLACK_CHESS) setCurrentPlayer(WHITE_CHESS);
    else if (currentPlayer === WHITE_CHESS) setCurrentPlayer(BLACK_CHESS);
  }


  return (
    <>

      <div>
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
          開始
        </Button>
      </div>
      <div className="mt-2">
        <Select
          defaultValue={selectedAiType}
          style={{ width: 150 }}
          className="mr-2"
          onChange={(value) => setSelectedAiType(value)}
        >
          <Option value={RANDOM_AI}>{RANDOM_AI}</Option>
          <Option value={EASY_AI}>{EASY_AI}</Option>
          <Option value={MEDIUM_AI}>{MEDIUM_AI}</Option>
          <Option value={HARD_AI}>{HARD_AI}</Option>
        </Select>

        <Button
          type="primary"
          onClick={() => { setAiType(selectedAiType) }}
        >
          更換AI
        </Button>
      </div>

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
                          // icon={<PlusOutlined />}
                          onClick={() => onBoardClick(i, j)}
                          className={getStyle(i, j)}
                        >
                          ""
                        </Button>
                      </div>
                    ))
                }
              </div>
            ))
        }
      </div>

      {isEndGame &&
        <Alert className="mt-2" message={message} type="success" />
      }
    </>
  )
}

export default GomokuPage;