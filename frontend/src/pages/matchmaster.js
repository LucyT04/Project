import React, { useState, useEffect } from 'react';
import './matchmaster.css';
import { Sidebar } from './sidebar';

const wordsAndDefinitions = [
  { id: 1, word: 'Verb', definition: 'Jump' },
  { id: 2, word: 'Adjective', definition: 'Blue' },
  { id: 3, word: 'Adverb', definition: 'Quickly' },
  { id: 4, word: 'Noun', definition: 'Table' },
  { id: 5, word: 'Pronoun', definition: 'He' },
];

const punctuationWordsAndDefinitions = [
  { id: 1, word: 'Comma', definition: ',' },
  { id: 2, word: 'Semicolon', definition: ';' },
  { id: 3, word: 'Apostrophe', definition: '\'' },
  { id: 4, word: 'Colon', definition: ':' },
  { id: 5, word: 'Fullstop', definition: '.' },
  { id: 6, word: 'Exclamation Mark', definition: '!' },
  { id: 7, word: 'Speech Mark', definition: '" "' },
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const MatchMaster = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [shuffledDefinitions, setShuffledDefinitions] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);

  useEffect(() => {
    const words = currentRound === 1 ? wordsAndDefinitions : punctuationWordsAndDefinitions;
    const shuffledWords = shuffleArray(words.map((item) => item.word));
    const shuffledDefinitions = shuffleArray(words.map((item) => item.definition));

    setShuffledWords(shuffledWords);
    setShuffledDefinitions(shuffledDefinitions);
    setMatchedPairs([]); // Reset matched pairs on round change
    setScore(0); // Reset score on round change
    setLives(3); // Reset lives on round change
    setGameOver(false); // Reset game over status on round change
    setShowModal(false); // Reset modal visibility on round change
  }, [currentRound]);

  const handleDragStart = (e, word) => {
    e.dataTransfer.setData('text/plain', word);
    setDraggedItem(word);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, definition) => {
    e.preventDefault();
    const droppedWord = e.dataTransfer.getData('text/plain');

    const matchedPair = currentRound === 1
      ? wordsAndDefinitions.find((item) => item.word === droppedWord)
      : punctuationWordsAndDefinitions.find((item) => item.word === droppedWord);

    if (draggedItem === droppedWord && !matchedPairs.includes(droppedWord)) {
      if (matchedPair && matchedPair.definition === definition) {
        setMatchedPairs([...matchedPairs, droppedWord, definition]);
        setScore(score + 1);
        setTimeout(() => {
          setShuffledWords((prevWords) => prevWords.filter((word) => word !== droppedWord));
          setShuffledDefinitions((prevDefinitions) => prevDefinitions.filter((def) => def !== definition));
        }, 500);

        // Check if all matches are done for the current round
        const roundWords = currentRound === 1 ? wordsAndDefinitions : punctuationWordsAndDefinitions;
        if (matchedPairs.length + 2 === roundWords.length * 2) {
          setShowModal(true);
        }
      } else {
        // Incorrect match
        setLives(lives - 1);
        if (lives === 1) {
          setGameOver(true);
        }
        const definitionElement = e.target.closest('.definition');
        definitionElement.classList.add('shake');
        setTimeout(() => {
          definitionElement.classList.remove('shake');
        }, 500);
        setDraggedItem(null);
      }
    }
  };

  const handleTryAgain = (nextRound = false) => {
    setShowModal(false);
    if (nextRound) {
      setCurrentRound((prevRound) => prevRound + 1);
    } else {
      const words = currentRound === 1 ? wordsAndDefinitions : punctuationWordsAndDefinitions;
      const shuffledWords = shuffleArray(words.map((item) => item.word));
      const shuffledDefinitions = shuffleArray(words.map((item) => item.definition));
      setShuffledWords(shuffledWords);
      setShuffledDefinitions(shuffledDefinitions);
    }
    setMatchedPairs([]);
    setScore(0);
    setLives(3);
    setGameOver(false);
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="matchmaster-game">
        <h1>Match Master</h1>
        {gameOver ? (
          <div className="game-over">
            <p>Game Over!</p>
            <button onClick={() => handleTryAgain(false)}>Try Again</button>
          </div>
        ) : (
          <>
            <div className="score">Score: {score}</div>
            <div className="lives">
              Lives: {Array.from({ length: lives }, (_, index) => (
                <i key={index} className="fa-solid fa-heart"></i>
              ))}
            </div>
            <div className="draggame-container">
              <div className="dragword-list">
                {shuffledWords.map((word) => (
                  <div
                    key={word}
                    className={`word ${matchedPairs.includes(word) ? 'matched' : ''}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, word)}
                  >
                    {word}
                  </div>
                ))}
              </div>
              <div className="definition-list">
                {shuffledDefinitions.map((definition) => (
                  <div
                    key={definition}
                    className={`definition ${matchedPairs.includes(definition) ? 'matched' : ''}`}
                    onDragOver={(e) => handleDragOver(e)}
                    onDrop={(e) => handleDrop(e, definition)}
                  >
                    {definition}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {showModal && (
          <div className="matchmodal">
            <div className="matchmodal-content">
              <p>Well done!</p>
              <p>Here is a reminder of the correct matches:</p>
              <ul>
                {(currentRound === 1 ? wordsAndDefinitions : punctuationWordsAndDefinitions).map(({ word, definition }) => (
                  <li key={word}>{word} = {definition}</li>
                ))}
              </ul>
              <button onClick={() => handleTryAgain(true)}>Next Round</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};