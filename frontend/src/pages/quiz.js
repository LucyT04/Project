import React, { useState, useEffect } from 'react';
import './quiz.css'; 
import { Sidebar } from "./sidebar";

export const Quiz = () => {
  const questions = [
    {
      questionText: 'Which of the following is a synonym for "enormous"?',
      answerOptions: [
        { answerText: 'Tiny', isCorrect: false },
        { answerText: 'Beautiful', isCorrect: false },
        { answerText: 'Large', isCorrect: true },
        { answerText: 'Fast', isCorrect: false },
      ],
    },
    {
      questionText: 'In which sentence is the grammar incorrect?',
      answerOptions: [
        { answerText: 'She had never been to the museum.', isCorrect: false },
        { answerText: "I don't have no money", isCorrect: true },
        { answerText: 'Him and his sister likes to play chess.', isCorrect: false },
        { answerText: "They're going to the park", isCorrect: false },
      ],
    },
    {
      questionText: 'Which sentence has a punctuation error?',
      answerOptions: [
        { answerText: 'I dont know where he went', isCorrect: true },
        { answerText: 'My favorite colors are red, blue, and green.', isCorrect: false },
        { answerText: 'The cat sat on the mat', isCorrect: false },
        { answerText: 'Are you coming to the party, John?', isCorrect: false },
      ],
    },
    {
      questionText: 'Which word is pronounced differently to how it is spelt?',
      answerOptions: [
        { answerText: 'Time', isCorrect: false },
        { answerText: 'Crime', isCorrect: false },
        { answerText: 'Mime', isCorrect: false },
        { answerText: 'Climb', isCorrect: true },
      ],
    },
        {
            questionText: "In the following sentence, what does the word 'eloquent' mean? 'The speaker delivered an eloquent speech.'",
            "answerOptions": [
              { "answerText": "Boring", "isCorrect": false },
              { "answerText": "Confusing", "isCorrect": false },
              { "answerText": "Fluent and Persuasive", "isCorrect": true },
              { "answerText": "Short and Concise", "isCorrect": false }
            ]
          },
          {
            questionText: "Which sentence has a spelling error?",
            "answerOptions": [
              { "answerText": "Neccessary", "isCorrect": false },
              { "answerText": "Necessarey", "isCorrect": false },
              { "answerText": "Necessary", "isCorrect": true },
              { "answerText": "Necessary", "isCorrect": false }
            ]
          },
          {
            questionText: "Which sentence has a spelling error?",
            "answerOptions": [
              { "answerText": "Neccessary", "isCorrect": false },
              { "answerText": "Necessarey", "isCorrect": false },
              { "answerText": "Necessary", "isCorrect": true },
              { "answerText": "Necessary", "isCorrect": false }
            ]
          }
  ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
  
    const handleAnswerOptionClick = (isCorrect) => {
      if (isCorrect) {
        setScore(score + 1);
      }
      setSelectedAnswer(isCorrect);
  
      // Delay the transition to the next question by 1 second
      setTimeout(() => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
          setSelectedAnswer(null); // Reset selectedAnswer for the next question
        } else {
          setShowScore(true);
        }
      }, 1500);
    };
  
    const handleTryAgain = () => {
      setCurrentQuestion(0);
      setShowScore(false);
      setScore(0);
      setSelectedAnswer(null);
    };
  
    useEffect(() => {
      // Clear the selected answer when moving to the next question
      setSelectedAnswer(null);
    }, [currentQuestion]);
  
    return ( 
      <div className="container">
        <Sidebar />
        <div className='app'>
          {showScore ? (
            <div className='score-section'>
              <p>You scored {score} out of {questions.length}</p>
              <button className='quiz-try-again' onClick={handleTryAgain}>Try Again</button>
            </div>
          ) : (
            <>
              <div className='question-section'>
                <div className='question-count'>
                  <span>Question {currentQuestion + 1}</span>/{questions.length}
                </div>
                <div className='question-text'>{questions[currentQuestion].questionText}</div>
              </div>
              <div className='answer-section'>
                {questions[currentQuestion].answerOptions.map((answerOption) => (
                  <button
                    key={answerOption.answerText}
                    onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                    className={selectedAnswer === null ? '' : answerOption.isCorrect ? 'correct' : 'incorrect'}
                    disabled={selectedAnswer !== null}
                  >
                    {answerOption.answerText}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }