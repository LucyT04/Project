import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from './sidebar';
import readingvideo from '../images/SpellingRules.mp4';
import './readingrules.css'; 

export const SecondQuiz = () => {
  const questions = [
    {
      questionText: 'Which of the following is NOT a noun?"? ',
      answerOptions: [
        { answerText: 'Tree', isCorrect: false },
        { answerText: 'Ocean', isCorrect: false },
        { answerText: 'Running', isCorrect: true },
        { answerText: 'Joy', isCorrect: false },
      ],
    },
    {
        questionText: 'Choose the correct sentence:',
        answerOptions: [
          { answerText: 'The sunsets was beautiful', isCorrect: false },
          { answerText: 'The sunset were beautiful.', isCorrect: false },
          { answerText: 'The sunset was beautiful.', isCorrect: true },
          { answerText: 'The sunsets where beautiful', isCorrect: false },
      ],
    },
    {
      questionText: 'Select the plural form of the noun: "child"',
      answerOptions: [
        { answerText: 'Childs', isCorrect: false },
        { answerText: 'Children', isCorrect: true },
        { answerText: "Child's", isCorrect: false },
        { answerText: 'Childes', isCorrect: false },
      ],
    },
    {
      questionText: 'Identify the verb in the following sentence: "The cat slept quietly and peacefully."',
      answerOptions: [
        { answerText: 'Peacefully', isCorrect: false },
        { answerText: 'Quietly', isCorrect: false },
        { answerText: 'Cat', isCorrect: false },
        { answerText: 'Slept', isCorrect: true },
      ],
    },
        {
            questionText: "True or False: All verbs have a past tense form",
            "answerOptions": [
              { "answerText": "False", "isCorrect": true },
              { "answerText": "True", "isCorrect": false }
            ]
          },
          {
            questionText: "Which of the following is NOT a verb?",
            "answerOptions": [
              { "answerText": "Effect", "isCorrect": true },
              { "answerText": "Lie", "isCorrect": false },
              { "answerText": "Swim", "isCorrect": false },
              { "answerText": "Eat", "isCorrect": false }
            ]
          },
          {
            questionText: "Which of the following words follows the 'Y to I' rule?",
            "answerOptions": [
              { "answerText": "Happy", "isCorrect": true },
              { "answerText": "Cry", "isCorrect": false },
              { "answerText": "Fly", "isCorrect": false },
              { "answerText": "Carry", "isCorrect": false }
            ]
          },
          {
            questionText: "Choose the correct transformation following the 'Y to I' rule for the word 'worry' when adding the suffix '-es'",
            "answerOptions": [
              { "answerText": "Worries", "isCorrect": true },
              { "answerText": "Worrys", "isCorrect": false },
              { "answerText": "Wories", "isCorrect": false },
            ]
          },
          {
            questionText: "Finish the rule: 'Q without ...'",
            "answerOptions": [
              { "answerText": "E", "isCorrect": false },
              { "answerText": "U", "isCorrect": true },
              { "answerText": "O", "isCorrect": false },
            ]
          },
          {
            questionText: "There are many words in the English language that do not follow the Q without U rule",
            "answerOptions": [
              { "answerText": "False", "isCorrect": true },
              { "answerText": "True", "isCorrect": false },
            ]
          },
  ];

  const requiredScoreToProceed = 8;

const [currentQuestion, setCurrentQuestion] = useState(0);
const [showScore, setShowScore] = useState(false);
const [score, setScore] = useState(0);
const [selectedAnswer, setSelectedAnswer] = useState(null);
const [quizStarted, setQuizStarted] = useState(false);

const handleAnswerOptionClick = (isCorrect) => {
if (isCorrect) {
  setScore(score + 1);
}
setSelectedAnswer(isCorrect);

setTimeout(() => {
  const nextQuestion = currentQuestion + 1;
  if (nextQuestion < questions.length) {
    setCurrentQuestion(nextQuestion);
    setSelectedAnswer(null);
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
setQuizStarted(false);
};

const handleStartQuiz = () => {
setQuizStarted(true);
};

useEffect(() => {
setSelectedAnswer(null);
}, [currentQuestion]);

return (
<div className="container">
  <Sidebar />
  <div className='quiz-app'>
    {quizStarted ? (
      showScore ? (
        <div className='score-section'>
          {score >= requiredScoreToProceed ? (
            <>
              <p>Congratulations! You scored {score} out of {questions.length}.</p>
              <p>Well done! Now you have completed your lessons, try our reading activities to improve even further!</p>
              <Link to="/reading">
                <button className='next-lesson'>Reading Activities</button>
              </Link>
              <button className='next-lesson' onClick={handleTryAgain}>Try Again</button>
            </>
          ) : (
            <>
              <p>You scored {score} out of {questions.length}.</p>
              <p>Try again to score {requiredScoreToProceed} or more to proceed to the next lesson.</p>
              <button className='quiz-try-again' onClick={handleTryAgain}>Try Again</button>
            </>
          )}
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
                className={`answer-section-button ${
                  selectedAnswer === null ? '' : answerOption.isCorrect ? 'correct' : 'incorrect'
                }`}
              >
                {answerOption.answerText}
              </button>
            ))}
          </div>
        </>
      )
    ) : (
      <div className='start-page'>
        <h2>Spelling Rules Quiz!</h2>
        <p>Press the "Start" button to begin.</p>
        <p>You <strong> must</strong> answer at least {requiredScoreToProceed} questions correctly to proceed to the next lesson!</p>
        <p>You've got this, Good Luck!</p>
        <button onClick={handleStartQuiz}>Start</button>
      </div>
    )}
  </div>
</div>
);
};