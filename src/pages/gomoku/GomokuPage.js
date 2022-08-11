import React, { useState, useEffect } from 'react';
import { Button, Select, Alert } from 'antd';
import './GomokuPage.css';
import { NONE_CHESS, BLACK_CHESS, WHITE_CHESS } from './logic/define.js';
import { isWin, isTie } from './logic/connectStrategy.js';
import { rdnPlayChess } from './logic/randomAi.js';
import { easyPlayChess } from './logic/easyAi.js'
const { Option } = Select;


const GomokuPage = () => {
  const [boardStyle, setBoardStyle] = useState({ width: '', height: '' });
  const [selectedBoardSize, setSelectedBoardSize] = useState(10);
  const [currentBoardSize, setCurrentBoardSize] = useState(selectedBoardSize);
  const [boardModel, setBoardModel] = useState(Array.from({ length: currentBoardSize }, () => Array.from({ length: currentBoardSize }, () => NONE_CHESS)));
  // const [tableModel, setTableModel] = useState(Array(currenTableSize).fill(Array(currenTableSize).fill(NONE_CHESS)));
  const [currentPlayer, setCurrentPlayer] = useState(BLACK_CHESS);
  const [isEndGame, setIsEndGame] = useState(false);
  const [message, setMessage] = useState('');
  const [latestChessInfo, setLatestChessInfo] = useState(null);

  let aiPlayerType = WHITE_CHESS;

  useEffect(() => {
    updatePlayRule();
  }, []);

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

  useEffect(() => {
    // check is anyone win or tie
    if (latestChessInfo) {
      const boardInfo = { board: boardModel, boardSize: currentBoardSize, winCount: currentBoardSize === 3 ? 3 : 5 };
      const _isWin = isWin(
        boardInfo,
        latestChessInfo
      );

      const _isTie = isTie(boardInfo);
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
    if (currentPlayer === aiPlayerType) {
      // console.log('turn ai');
      const aiChessType = aiPlayerType === BLACK_CHESS ? BLACK_CHESS : WHITE_CHESS;
      // let aiPlayPosition = rdnPlayChess(boardModel, currentBoardSize);
      let aiPlayPosition = easyPlayChess(boardModel, aiChessType);
      setBoardModel(prev => {
        prev[aiPlayPosition.y][aiPlayPosition.x] = aiChessType;
        return [...prev];
      });

      setLatestChessInfo({
        x: aiPlayPosition.x,
        y: aiPlayPosition.y,
        chessType: aiChessType
      });

      if (aiPlayerType === BLACK_CHESS) setCurrentPlayer(WHITE_CHESS);
      else if (aiPlayerType === WHITE_CHESS) setCurrentPlayer(BLACK_CHESS);
    }

  }, [boardModel]);


  return (
    <>
      <Select
        defaultValue="10"
        style={{ width: 120 }}
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
      >
        開始
      </Button>

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