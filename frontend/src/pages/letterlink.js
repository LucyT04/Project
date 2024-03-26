import React, { useState, useEffect } from 'react';
import './letterlink.css';
import { Sidebar } from './sidebar';

const roundsData = [
  { round: 1, words: ['the', 'they', 'he', 'yet'], letters: ['T', 'E', 'Y', 'H'] },
  { round: 2, words: ['cat', 'hat', 'act', 'chat'], letters: ['C', 'A', 'T', 'H'] },
  { round: 3, words: ['dog', 'god', 'do', 'go'], letters: ['D', 'O', 'G'] },
  { round: 4, words: ['exit', 'tie', 'it', 'ex'], letters: ['T', 'I', 'X', 'E'] },
];

export const LetterLink = () => {
  const [currentRound, setCurrentRound] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [letters, setLetters] = useState('');
  const [inputWord, setInputWord] = useState('');
  const [correctWords, setCorrectWords] = useState([]);
  const [message, setMessage] = useState('');
  const [wordsGuessed, setWordsGuessed] = useState(0);

  const handleStartGame = () => {
    if (currentRound < roundsData.length) {
      setGameStarted(true);
      setLetters(generateRandomLetters());
      setInputWord('');
      setCorrectWords([]);
      setMessage('');
      setWordsGuessed(0);
    } else {
      setCurrentRound(0);
      setGameStarted(false);
      // You can add additional logic for game-over or navigation to a different screen
    }
  };

  useEffect(() => {
    setLetters(generateRandomLetters());
  }, [currentRound]);

  const generateRandomLetters = () => {
    const currentRoundData = roundsData.find((round) => round.round === currentRound + 1);

    if (currentRoundData) {
      return currentRoundData.letters.join('');
    } else {
      return '';
    }
  };

  const handleLettersChange = (event) => {
    const inputLetters = event.target.value.toUpperCase();
    setLetters(inputLetters);
    setInputWord('');
  };

  const handleWordChange = (event) => {
    setInputWord(event.target.value.trim());
  };

  const checkWord = () => {
    const availableWords = roundsData[currentRound].words;

    const isDuplicateLetters = hasDuplicateLetters(inputWord);

    if (isDuplicateLetters) {
      setMessage('Each letter can only be used once!');
    } else if (availableWords.includes(inputWord)) {
      setCorrectWords([...correctWords, inputWord]);
      setMessage(`"${inputWord}" is Correct!`);
      setWordsGuessed(wordsGuessed + 1);

      if (wordsGuessed === roundsData[currentRound].words.length) {
        handleNextRound();
      }
    } else {
      setMessage(`"${inputWord}" is not a valid word`);
    }

    setInputWord('');
  };

  const hasDuplicateLetters = (word) => {
    const letterCounts = new Map();

    for (const letter of word.toLowerCase()) {
      if (letterCounts.has(letter)) {
        return true; // Duplicate letter found
      } else {
        letterCounts.set(letter, 1);
      }
    }

    return false; // No duplicate letters
  };

  const findAvailableWords = (lettersArray) => {
    return roundsData[currentRound].words.filter((word) => isWordPossible(word, lettersArray));
  };

  const isWordPossible = (word, lettersArray) => {
    const lowerCaseWord = word.toLowerCase();
    const lowerCaseLetters = lettersArray.map((letter) => letter.toLowerCase());

    return lowerCaseWord.split('').every((letter) => lowerCaseLetters.includes(letter));
  };

  const handleNextRound = () => {
    if (currentRound < roundsData.length - 1) {
      setCurrentRound(currentRound + 1);
    } else {
      setCurrentRound(0);
      setGameStarted(false);
    }

    setInputWord('');
    setCorrectWords([]);
    setMessage('');
    setWordsGuessed(0);

    setLetters(generateRandomLetters());
  };

  const wordsRemaining = roundsData[currentRound].words.length - wordsGuessed;

  return (
    <div className="page-container">
      <h1>Letter Link</h1>
      <Sidebar />
      <div className="letterlink-page">
        {!gameStarted ? (
          <div className="start-screen">
            <h1>Letter Link</h1>
            <p>Welcome to Letter Link! </p>
            <p>Can you find all of the available words from the given letters?</p>
            <button onClick={handleStartGame}>Start Game</button>
          </div>
        ) : (
          <div>
            <p>{wordsGuessed}/{roundsData[currentRound].words.length} words guessed</p>
            <p>{wordsRemaining} words remaining</p>
            <p className="available-letters">
              Available Letters: <span className="large-spaced-letters">{letters.split('').join(' ')}</span>
            </p>
            <label>Enter a word:</label>
            <input
              type="text"
              value={inputWord}
              onChange={handleWordChange}
              placeholder="Type your word here"
            />
            <button onClick={checkWord}>Check Word</button>
            {message && <p className={message.includes('Correct') ? 'correct' : 'incorrect'}>{message}</p>}
            <div className="foundword-list">
              <h2>Correct Words:</h2>
              <ul>
                {correctWords.map((word, index) => (
                  <li key={index}>{word}</li>
                ))}
              </ul>
            </div>
            {wordsGuessed === roundsData[currentRound].words.length && (
              <button onClick={handleNextRound}>Next Round</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};