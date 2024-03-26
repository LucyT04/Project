import React, { useState } from 'react';
import './storybuilder.css';
import { Sidebar } from './sidebar';

export const StoryBuilder = () => {
  const roundsData = [
    {
      round: 1,
      correctOrder: [
        'Mary wakes up in the morning.',
        'She gets out of bed.',
        'Mary goes to the bathroom.',
        'She brushes her teeth.',
        'Then, she washes her face.',
        'Mary goes back to her room.',
        'She gets dressed for the day.',
        'Mary goes to the kitchen.',
        'She has breakfast.',
        'Mary is ready for the day.'
      ]
    },
    {
      round: 2,
      correctOrder: [
        'I woke up early',
        'and had a hearty breakfast',
        'before heading to work',
        'to start my day.'
      ]
    },
  ];

  const initialSentences = [
    { id: 1, text: 'She gets out of bed.' },
    { id: 2, text: 'Mary wakes up in the morning.' },
    { id: 3, text: 'She brushes her teeth.' },
    { id: 4, text: 'Mary goes to the bathroom.' },
    { id: 5, text: 'Mary goes back to her room.' },
    { id: 6, text: 'Then, she washes her face.' },
    { id: 7, text: 'She gets dressed for the day.' },
    { id: 8, text: 'She has breakfast.' },
    { id: 9, text: 'Mary goes to the kitchen.' },
    { id: 10, text: 'Mary is ready for the day.' },
  ];

  const sentencePool = [
    { id: 1, text: 'I woke up early' },
    { id: 2, text: 'and had a hearty breakfast' },
    { id: 3, text: 'before heading to work' },
    { id: 4, text: 'to start my day.' },
  ];

  const [currentRound, setCurrentRound] = useState(1);
  const [sentences, setSentences] = useState(initialSentences);
  const [showResult, setShowResult] = useState(false);
  const [isCorrectOrder, setIsCorrectOrder] = useState(false);
  const [showNextRoundButton, setShowNextRoundButton] = useState(false);

  // ... (rest of the code remains the same)

  return (
    <div className="story-builder">
      <Sidebar />
      <h1>Story Builder</h1>
      <div className="sentences-container">
        <div className="sentence-numbers">
          {sentences.map((_, index) => (
            <div key={index} className="sentence-number">
              {index + 1}
            </div>
          ))}
        </div>
        <div className="sentences">
          {sentences.map((sentence, index) => (
            <div
              key={sentence.id}
              className="sentence"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              {sentence.text}
            </div>
          ))}
        </div>
      </div>
      <div className="buttons">
        <button onClick={checkOrder}>Check Order</button>
        {showNextRoundButton && <button onClick={nextRound}>Next Round</button>}
      </div>
      {showResult && (
        <div className="result">
          <h2>{isCorrectOrder ? 'Correct Order!' : 'Incorrect Order!'}</h2>
        </div>
      )}
    </div>
  );
};