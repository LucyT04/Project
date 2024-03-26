import React, { useEffect, useState } from 'react'; 
import { Sidebar } from './sidebar';
import './hotseat.css';
import flameBackground from '../images/flamebackground.png';

  
  export const HotSeat = () => {
    const questions = [
        { sentence: 'The girl is _____ warm.', options: ['too', 'two', 'to'], correctAnswer: 'too' },
        { sentence: '_____ going to the concert tonight.', options: ['They\'re', 'There', 'Their'], correctAnswer: 'They\'re' },
        { sentence: '___ going to the store after work.', options: ['Wear', 'Where', 'We\'re'], correctAnswer: 'We\'re' },
        { sentence: 'The ____ of the story was very surprising.', options: ['tail', 'tale'], correctAnswer: 'tale' },
        { sentence: 'I saw a ____ in the garden.', options: ['flower', 'flour'], correctAnswer: 'flower' },
        { sentence: 'I ____ my lunch on the kitchen counter.', options: ['ate', 'eight'], correctAnswer: 'ate' },
        { sentence: 'That is ____ house on the hill', options: ['there', 'their', 'they\'re'], correctAnswer: 'their' },
        { sentence: 'She decided to ____ the book rather than watch TV.', options: ['read', 'reed', 'red'], correctAnswer: 'read' },
        { sentence: 'The cat is ____ under the table.', options: ['its', 'it\'s', 'its\''], correctAnswer: 'its' },
        { sentence: 'He ____ his car to the mechanic.', options: ['took', 'to', 'too'], correctAnswer: 'took' },
        { sentence: 'She has ____ a lot of progress.', options: ['made', 'maid', 'mend'], correctAnswer: 'made' },
        { sentence: 'He ____ the vase gently on the shelf.', options: ['set', 'sat', 'sit'], correctAnswer: 'set' },
        { sentence: 'She ____ a beautiful song.', options: ['sang', 'sung', 'sing'], correctAnswer: 'sang' },
        { sentence: 'He ____ his bike to school.', options: ['ridden', 'rode', 'ride'], correctAnswer: 'rode' },
      ];
    
      const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
      const [timer, setTimer] = useState(10);
      const [score, setScore] = useState(0);
      const [isGameOver, setIsGameOver] = useState(false);
      const [isGameStarted, setIsGameStarted] = useState(false);
    
      useEffect(() => {
        if (isGameStarted) {
          const countdown = setInterval(() => {
            if (timer > 0) {
              setTimer(timer - 1);
            } else {
              clearInterval(countdown);
              // Show the game over message when the timer runs out
              setIsGameOver(true);
            }
          }, 1000);
    
          // Cleanup the interval on component unmount
          return () => clearInterval(countdown);
        }
      }, [timer, isGameStarted]);
    
      const handleAnswer = (selectedAnswer) => {
        // Check if the selected answer is correct
        if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
          setScore(score + 1);
          // Add 3 seconds for correct answers without resetting the timer
          setTimer((prevTimer) => prevTimer + 3);
          // Move to the next question
          setTimeout(() => nextQuestion(), 500); // Delay the next question by 1 second
        } else {
          // Deduct 2 seconds for incorrect answers without going below 0
          setTimer((prevTimer) => Math.max(0, prevTimer - 2));
        }
      };
    
      const nextQuestion = () => {
        // Move to the next question
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        
        } else {
          // Show the game over message when all questions are completed
          setIsGameOver(true);
        }
      };
    
      const startGame = () => {
        setIsGameStarted(true);
      };
    
      const closeModal = () => {
        // Reset game state and close the game over message
        setIsGameOver(false);
        setCurrentQuestionIndex(0);
        setTimer(10);
        setScore(0);
      };
    
      return (
        <div>
          <Sidebar />
          <div className="game-container" style={{ backgroundImage: `url(${flameBackground})`, backgroundSize: 'cover' }}>
            {!isGameStarted && (
              <div className="hotstartmodal">
                <div className="hotseat-content">
                  <h2>Welcome to the Hot Seat Game!</h2>
                  <p className="hotseat-question">Rules: Answer each question correctly before the timer runs out to score points.</p>
                  <p className="hotseat-question">The timer will start ticking as soon as you begin!</p>
                  <button onClick={startGame}>Start</button>
                </div>
              </div>
            )}
      
            {isGameStarted && (
              <div className="hotseatgame-content">
                <h1>Hot Seat</h1>
                <p className="hotseat-question">Score: {score}</p>
                <div className={`timer-container ${timer <= 3 && !isGameOver ? 'shake' : ''}`}>
                  <p className="hotseat-time">Time: {timer}s</p>
                </div>
                <p className="hotseat-question">{questions[currentQuestionIndex].sentence}</p>
                <div>
                  {questions[currentQuestionIndex].options.map((option, index) => (
                    <button key={index} className="answer-button" onClick={() => handleAnswer(option)}>
                      {option}
                    </button>
                  ))}
                </div>
      
                {/* Game Over Modal */}
                {isGameOver && (
                  <div className="modal">
                    <div className="modal-content">
                      <h2>Game Over!</h2>
                      <p>Your Score: {score}</p>
                      <button onClick={closeModal}>Play Again</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
                }