import React, { useState } from 'react';
import { WordSearchGrid } from "./WordSearchGrid";
import { Sidebar } from './sidebar';
import './WordSearchGame.css';

export const WordSearchGame = () => {
  const initialGrids = [
    [
      ['P', 'R', 'A', 'C', 'T', 'I', 'C', 'E', 'T'],
      ['L', 'E', 'A', 'R', 'N', 'D', 'O', 'W', 'R'],
      ['V', 'Y', 'L', 'A', 'P', 'P', 'L', 'Y', 'R'],
      ['C', 'E', 'G', 'O', 'D', 'I', 'A', 'G', 'O'],
      ['L', 'T', 'R', 'E', 'U', 'N', 'D', 'E', 'R'],
      ['A', 'J', 'L', 'B', 'C', 'O', 'M', 'P', 'R'],
      ['S', 'K', 'I', 'L', 'L', 'S', 'R', 'A', 'N'],
      ['A', 'P', 'P', 'L', 'I', 'C', 'A', 'T', 'E'],
    ],
    [
      ['R', 'E', 'A', 'D', 'S', 'P', 'E', 'L', 'L'],
      ['W', 'R', 'I', 'T', 'E', 'H', 'G', 'T', 'Z'],
      ['U', 'C', 'T', 'K', 'O', 'O', 'H', 'E', 'N'],
      ['S', 'T', 'O', 'R', 'Y', 'N', 'C', 'X', 'B'],
      ['U', 'L', 'A', 'R', 'M', 'I', 'P', 'T', 'O'],
      ['L', 'I', 'N', 'G', 'A', 'C', 'O', 'N', 'O'],
      ['C', 'S', 'G', 'R', 'R', 'S', 'M', 'A', 'K'],
      ['F', 'L', 'U', 'E', 'N', 'C', 'Y', 'Q', 'R'],
    ],
  ];

  const wordLists = [
    ['LEARN', 'APPLY', 'VERB', 'UNDER', 'COMP', 'RAN', 'SKILLS', 'PRACTICE', 'APPLICATE'],
    ['READ', 'WRITE', 'BOOK', 'STORY', 'SPELL', 'PHONIC', 'GRAMMAR', 'FLUENCY'],
  ];

  const [gridIndex, setGridIndex] = useState(0);
  const [grid, setGrid] = useState(initialGrids[gridIndex]);
  const [wordList, setWordList] = useState(wordLists[gridIndex]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [completedWords, setCompletedWords] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [foundCells, setFoundCells] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleCellClick = (row, col) => {
    const newSelectedCells = [...selectedCells];
    const cellIndex = newSelectedCells.findIndex(
      ({ row: selectedRow, col: selectedCol }) =>
        selectedRow === row && selectedCol === col
    );

    if (cellIndex !== -1) {
      // If the cell is already selected, remove it
      newSelectedCells.splice(cellIndex, 1);
    } else {
      // If the cell is not selected, add it
      newSelectedCells.push({ row, col });
    }

    setSelectedCells(newSelectedCells);

    // Checking if any word is formed
    const selectedWord = getSelectedWord(newSelectedCells);
    if (selectedWord && wordList.includes(selectedWord) && !completedWords.includes(selectedWord)) {
      highlightWord(newSelectedCells, selectedWord);
      setSelectedCells([]);
    }
  };

  const getSelectedWord = (selectedCells) => {
    const selectedWord = selectedCells.map(({ row, col }) => grid[row][col]).join('');
    return selectedWord;
  };

  const highlightWord = (selectedCells, selectedWord) => {
    setCompletedWords([...completedWords, selectedWord]);
    setFoundCells([...foundCells, ...selectedCells]);
    setFoundWords([...foundWords, selectedWord]);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setGridIndex((prevIndex) => prevIndex + 1);
    setGrid(initialGrids[gridIndex + 1]);
    setWordList(wordLists[gridIndex + 1]);
    setSelectedCells([]);
    setCompletedWords([]);
    setFoundWords([]);
    setFoundCells([]);
  };

  React.useEffect(() => {
    if (completedWords.length === wordList.length) {
      setShowModal(true);
    }
  }, [completedWords, wordList]);

  return (
    <div className="word-search-game">
      <Sidebar />
      <h1>Word Search</h1>
      <div className="word-search-container">
        <WordSearchGrid
          grid={grid}
          onCellClick={handleCellClick}
          selectedCells={selectedCells}
          foundCells={foundCells}
        />
        <div className="word-list">
          <h2><u>Words to Find:</u></h2>
          <ul>
            {wordList.map((word, index) => (
              <li key={index} className={completedWords.includes(word) ? 'word-found' : ''}>
                {word}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Well done!</h2>
            <p>Move on to the next word search.</p>
            <button onClick={handleModalClose}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};