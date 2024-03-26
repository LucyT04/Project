import React, { useState, useEffect } from 'react';
import './readwise.css'; 
import { Sidebar } from "./sidebar";

export const ReadWise = () => {
    const [passageIndex, setPassageIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [feedback, setFeedback] = useState(null);
  
    const passages = [
      {
        text: "In my backyard, there is a beautiful garden. Colourful flowers bloom in spring, and butterflies dance around them. Tall trees provide shade, and the sweet scent of roses fills the air. I often sit in the garden and enjoy the peaceful atmosphere.",
        questions: [
          "Name a verb used in the passage.",
          "What word in the passage follows the 'silent C' rule?",
        ],
        correctAnswers: ["Bloom" , "Scent"],
      },
      {
        text: "I go to school every day. In the morning, I attend different classes. Math is my favorite subject because it is challenging, I also attend math quizzes on Wednesdays. After classes, I join the school clubs every weekday excluding the one day I am busy with maths.",
        questions: [
          "Give an example of an Adjective used",
          "What day during the week can the author NOT attend the school club?",
        ],
        correctAnswers: ["Challenging", "Wednesday"],
      },
      {
        text: "I go to school every day. In the morning, I attend different classes. Math is my favorite subject because it is challenging, I also attend math quizzes on Wednesdays. After classes, I join the school clubs every weekday excluding the one day I am busy with maths.",
        questions: [
          "How many Spelling mistakes can you spot in the passage?",
          "What day during the week can the author NOT attend the school club?",
        ],
        correctAnswers: [["5", "five"], "Wednesday"],
      },
      
    ];
  
    const currentPassage = passages[passageIndex];
  
    const handleAnswerChange = (questionIndex, answer) => {
      setUserAnswers({
        ...userAnswers,
        [questionIndex]: answer,
      });
    };
  
    const handleCheckAnswers = () => {
      // Check correctness for the current passage
      const correctAnswers = currentPassage.correctAnswers.map(answer => {
        if (typeof answer === 'string') {
          return answer.toLowerCase();
        } else if (Array.isArray(answer)) {
          return answer.map(subAnswer => subAnswer.toLowerCase());
        }
        return answer;
      });
    
      const userProvidedAnswers = Object.values(userAnswers).map(answer => {
        if (typeof answer === 'string') {
          return answer.toLowerCase();
        }
        return answer;
      });
    
      const isPassageCorrect = correctAnswers.every((answer, index) => {
        if (Array.isArray(answer)) {
          return answer.includes(userProvidedAnswers[index]);
        }
        return answer === userProvidedAnswers[index];
      });
    
      // Display feedback immediately after the user checks answers
      setFeedback(isPassageCorrect);
    };
    const handleNextPassage = () => {
      // Move to the next passage
      setPassageIndex(passageIndex + 1);
      setUserAnswers({});
      setFeedback(null); // Reset feedback when moving to the next passage
    };
  
    return (
      <div className="container">
      <Sidebar />
      <div className="read-content">
        <h1>Read Wise</h1>
        {currentPassage ? (
          <>
            <div>
              {/* <h2>Passage:</h2> */}
              <p>{currentPassage.text}</p>
            </div>
            <div>
              <h2>Questions:</h2>
              <ul>
                {currentPassage.questions.map((question, index) => (
                  <li key={index}>
                    <p>{question}</p>
                    <input
                      type="text"
                      value={userAnswers[index] || ''}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={handleCheckAnswers}>Check Answers</button>
            {feedback !== null && (
              <p style={{ color: feedback ? 'green' : 'red' }}>
                {feedback ? 'All correct! Move on to the next passage.' : 'Incorrect. Please review your answers.'}
              </p>
            )}
            <button onClick={handleNextPassage}>Next Passage</button>
          </>
        ) : (
          <p>No more passages available.</p>
        )}
      </div>
    </div>
    );
  };