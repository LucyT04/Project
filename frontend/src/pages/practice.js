import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from "./sidebar";
import './practice.css'; 
import Quizvideo from '../images/quiz.mp4';
import Wordvideo from '../images/wordscramble.mp4';
import Lettervideo from '../images/letterlink.mp4';
import Searchvideo from '../images/wordsearch.mp4';

export const Practice = () => {
  const navigate = useNavigate();
  const [isQuizHovered, setIsQuizHovered] = useState(false);
  const [isWordHovered, setIsWordHovered] = useState(false);
  const [isLetterHovered, setIsLetterHovered] = useState(false);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const quizVideoRef = useRef(null);
  const wordVideoRef = useRef(null);
  const letterVideoRef = useRef(null);
  const searchVideoRef = useRef(null);

  const startGame = (gameNumber) => {
    if (gameNumber === 1) {
      navigate('/quiz');
    }
    if (gameNumber === 2) {
      navigate('/word-scramble');
    }
    if (gameNumber === 3) {
      navigate('/letterlink');
    }
    if (gameNumber === 4) {
      navigate('/WordSearchGame');
    }
  };

  const handleQuizMouseEnter = () => {
    setIsQuizHovered(true);
    if (quizVideoRef.current) {
      quizVideoRef.current.play().catch(error => console.error('Video play error:', error));
    }
  };

  const handleQuizMouseLeave = () => {
    setIsQuizHovered(false);
    if (quizVideoRef.current && !quizVideoRef.current.paused) {
      quizVideoRef.current.pause();
    }
  };

  const handleWordMouseEnter = () => {
    setIsWordHovered(true);
    if (wordVideoRef.current) {
      wordVideoRef.current.play().catch(error => console.error('Video play error:', error));
    }
  };

  const handleWordMouseLeave = () => {
    setIsWordHovered(false);
    if (wordVideoRef.current && !wordVideoRef.current.paused) {
      wordVideoRef.current.pause();
    }
  };

  const handleLetterMouseEnter = () => {
    setIsWordHovered(true);
    if (letterVideoRef.current) {
      letterVideoRef.current.play().catch(error => console.error('Video play error:', error));
    }
  };

  const handleLetterMouseLeave = () => {
    setIsWordHovered(false);
    if (letterVideoRef.current && !letterVideoRef.current.paused) {
      letterVideoRef.current.pause();
    }
  };

  const handleSearchMouseEnter = () => {
    setIsSearchHovered(true);
    if (searchVideoRef.current) {
      searchVideoRef.current.play().catch(error => console.error('Video play error:', error));
    }
  };

  const handleSearchMouseLeave = () => {
    setIsSearchHovered(false);
    if (searchVideoRef.current && !searchVideoRef.current.paused) {
      searchVideoRef.current.pause();
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="quiz-container">
        <h1>Practice</h1>
      </div>
      <div className="optionContainer">
        <div
          className="box video-box"
          onClick={() => startGame(1)}
          onMouseEnter={handleQuizMouseEnter}
          onMouseLeave={handleQuizMouseLeave}
        >
          <video
            ref={quizVideoRef}
            src={Quizvideo}
            autoPlay={false}
            muted
            loop
            className={`video-quiz ${isQuizHovered ? 'hovered' : ''}`}
          />
          <div className="quiz-overlay"></div>
          <div className={`content ${isQuizHovered ? 'visible' : ''}`}>Sounds Write to Me</div>
        </div>
        <div
          className="box video-box"
          onClick={() => startGame(2)}
          onMouseEnter={handleWordMouseEnter}
          onMouseLeave={handleWordMouseLeave}
        >
          <video
            ref={wordVideoRef}
            src={Wordvideo}
            autoPlay={false}
            muted
            loop
            className={`video-quiz ${isWordHovered ? 'hovered' : ''}`}
          />
          <div className="quiz-overlay"></div>
          <div className={`content ${isWordHovered ? 'visible' : ''}`}>Word Scramble</div>
        </div>
        <div
          className="box video-box"
          onClick={() => startGame(3)}
          onMouseEnter={handleLetterMouseEnter}
          onMouseLeave={handleLetterMouseLeave}
        >
          <video
            ref={letterVideoRef}
            src={Lettervideo}
            autoPlay={false}
            muted
            loop
            className={`video-quiz ${isLetterHovered ? 'hovered' : ''}`}
          />
          <div className="quiz-overlay"></div>
          <div className={`content ${isLetterHovered ? 'visible' : ''}`}>Letter Link</div>
        </div>
        <div
          className="box video-box"
          onClick={() => startGame(4)}
          onMouseEnter={handleSearchMouseEnter}
          onMouseLeave={handleSearchMouseLeave}
        >
          <video
            ref={searchVideoRef}
            src={Searchvideo}
            autoPlay={false}
            muted
            loop
            className={`video-quiz ${isSearchHovered ? 'hovered' : ''}`}
          />
          <div className="quiz-overlay"></div>
          <div className={`content ${isSearchHovered ? 'visible' : ''}`}>Word Search</div>
        </div>
      </div>
    </div>
  );
};