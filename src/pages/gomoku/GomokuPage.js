import React, { useState, useEffect } from 'react';
import { Button, Select, Alert } from 'antd';
import './GomokuPage.css';
import { WHITE_PLAYER, BLACK_PLAYER, NONE_CHESS, BLACK_CHESS, WHITE_CHESS } from './logic/define.js';
import { isWin, isTie } from './logic/connectStrategy.js';
import { rdnPlayChess } from './logic/randomAi.js';
const { Option } = Select;

const GomokuPage = () => {
  const [boardStyle, setBoardStyle] = useState({ width: '120px', height: '120px' });
  const [selectedBoardSize, setSelectedBoardSize] = useState(3);
  const [currentBoardSize, setCurrentBoardSize] = useState(selectedBoardSize);
  const [boardModel, setBoardModel] = useState(Array.from({ length: currentBoardSize }, () => Array.from({ length: currentBoardSize }, () => NONE_CHESS)));
  // const [tableModel, setTableModel] = useState(Array(currenTableSize).fill(Array(currenTableSize).fill(NONE_CHESS)));
  const [currentPlayer, setCurrentPlayer] = useState(BLACK_PLAYER);
  const [isEndGame, setIsEndGame] = useState(false);
  const [message, setMessage] = useState('');

  // useEffect()

  const updatePlayRule = () => {
    if (selectedBoardSize === 3) setBoardStyle({ width: '120px', height: '120px' });
    else if (selectedBoardSize === 5) setBoardStyle({ width: '200px', height: '200px' });
    else if (selectedBoardSize === 10) setBoardStyle({ width: '400px', height: '400px' });

    setIsEndGame(false);
    setCurrentBoardSize(selectedBoardSize);
    setBoardModel(Array.from({ length: selectedBoardSize }, () => Array.from({ length: selectedBoardSize }, () => NONE_CHESS)));
    setCurrentPlayer(BLACK_PLAYER);
  }

  const playChess = (x, y, chessType) => {
    setBoardModel(prev => {
      let array = [...prev];
      array[y][x] = chessType;
      return array;
    });

    // if (currentPlayer === BLACK_PLAYER) setCurrentPlayer(WHITE_PLAYER);
    // else if (currentPlayer === WHITE_PLAYER) setCurrentPlayer(BLACK_PLAYER);
  }

  function checkEndGame(chessType, x, y) {
    const boardInfo = { board: boardModel, boardSize: currentBoardSize, winCount: currentBoardSize === 3 ? 3 : 5 };
    const _isWin = isWin(
      boardInfo,
      { chessType, x, y }
    );

    const _isTie = isTie(boardInfo);
    if (_isWin) {
      setIsEndGame(true);
      setMessage(chessType === BLACK_CHESS ? '黑棋獲勝' : '白棋獲勝');
      return true;
    }
    else if (_isTie) {
      setIsEndGame(true);
      setMessage('平手');
      return true;
    }
    return false;
  }

  const onBoardClick = (i, j) => {
    if (boardModel[i][j] !== NONE_CHESS) return;
    if (isEndGame) return;

    const chessType = currentPlayer === BLACK_PLAYER ? BLACK_CHESS : WHITE_CHESS;
    playChess(j, i, chessType);

    setTimeout(() => {
      if (checkEndGame(chessType, j, i) === false) {
        let aiPlayPosition = rdnPlayChess(boardModel, currentBoardSize);
        const aiChessType = chessType === BLACK_CHESS ? WHITE_CHESS : BLACK_CHESS;
        playChess(aiPlayPosition.x, aiPlayPosition.y, aiChessType);
        setTimeout(() => {
          checkEndGame(aiChessType, aiPlayPosition.x, aiPlayPosition.y);
        }, 10)
      }
    }, 10);
  }

  const getStyle = (i, j) => {
    if (boardModel[i][j] === NONE_CHESS) return 'none-chess';
    if (boardModel[i][j] === BLACK_CHESS) return 'black-chess';
    if (boardModel[i][j] === WHITE_CHESS) return 'white-chess';
  }

  // console.log(tableModel,'tableModel');

  return (
    <>
      <Select
        defaultValue="3"
        style={{ width: 120 }}
        className="mr-2"
        onChange={(value) => setSelectedBoardSize(+value)}
      >
        <Option value="3">3x3</Option>
        <Option value="5">5x5</Option>
        <Option value="10">10x10</Option>
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