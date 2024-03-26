import React, { useState, useEffect } from 'react';
import './grammargame.css';
import { Sidebar } from "./sidebar";


export const GrammarGame = () => {
  const sentences = [
    'He don\'t like to eat vegtables',
    'She goes to the store every weekends.',
    'They was playing soccer in the park.',
    'The dog\'s where barking loudley at the cat'
  ];

  const correctAnswers = [
    'He doesn\'t like to eat vegetables',
    'She goes to the store every weekend.',
    'They were playing soccer in the park.',
    'The dogs were barking loudly at the cat'
  ];

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);

  const displaySentence = () => {
    const currentSentence = sentences[currentSentenceIndex];
    setFeedback('');
    setUserInput('');
    console.log(`Displaying sentence: ${currentSentence}`);
  };

  const checkAnswer = () => {
    const userAnswer = userInput.trim().toLowerCase();
    const correctAnswer = correctAnswers[currentSentenceIndex].toLowerCase();

    if (userAnswer === correctAnswer) {
      setFeedback('Correct!');
      setShowModal(true);
    } else {
      setLives(lives - 1);
      setFeedback(`Incorrect. Try again! Lives remaining: ${lives - 1}`);

      if (lives === 1) {
        setFeedback('Game over. You ran out of lives.');
      }
    }
  };

  const resetGame = () => {
    setCurrentSentenceIndex(0);
    setLives(3);
    setUserInput('');
    setFeedback('');
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentSentenceIndex(currentSentenceIndex + 1);
  };

  useEffect(() => {
    displaySentence();
  }, [currentSentenceIndex]);

  useEffect(() => {
    if (feedback === 'Correct!') {
      // Delay closing the modal to give the user time to see the "Correct!" message
      setTimeout(() => {
        setShowModal(false);
        setCurrentSentenceIndex(currentSentenceIndex + 1);
      }, 1000);
    }
  }, [feedback]);

  return (
    <div className="page-container">
      <h1>Grammar Police</h1>
      <Sidebar />
      <div className="game-container">
        <p>{feedback}</p>
        <p>Lives: {lives}</p>
        <p>Sentence: {sentences[currentSentenceIndex]}</p>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your correction here"
        />
        <button onClick={checkAnswer}>Submit</button>
        <button onClick={resetGame}>Reset</button>
      </div>
    </div>
  );
}
