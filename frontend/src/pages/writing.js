import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from "./sidebar";
import './writing.css'; 
import Writingvideo from '../images/writingrules.mp4';
import Grammarvideo from '../images/grammarpolice.mp4';
import Hotseatvideo from '../images/hotseat.mp4';
import Shapervideo from '../images/sentenceshaper.mp4';

export const Writing = () => {
  const navigate = useNavigate();
  const [isWritingHovered, setIsWritingHovered] = useState(false);
  const [isGrammarHovered, setIsGrammarHovered] = useState(false);
  const [isShaperHovered, setIsShaperHovered] = useState(false);
  const [isHotseatHovered, setIsHotseatHovered] = useState(false);
  const writingVideoRef = useRef(null);
  const grammarVideoRef = useRef(null);
  const shaperVideoRef = useRef(null);
  const hotseatVideoRef = useRef(null);

  const startGame = (gameNumber) => {
    if (gameNumber === 1) {
      navigate('/writingrules');
    }
    if (gameNumber === 2) {
      navigate('/grammargame');
    }
    if (gameNumber === 3) {
      navigate('/sentenceshaper');
    }
    if (gameNumber === 4) {
      navigate('/hotseat');
    }

  };

  const handleMouseEnter = (ref, setHovered) => {
    setHovered(true);
    if (ref.current && ref.current.paused) {
      ref.current.play().catch(error => console.error('Video play error:', error));
    }
  };

  const handleMouseLeave = (ref, setHovered) => {
    setHovered(false);
    if (ref.current && !ref.current.paused) {
      ref.current.pause();
    }
  };

  return (
    <div>
      <Sidebar />
      <div>
        <h1>Practice Your Writing</h1>
        <div className="optionContainer">
          <div
            className="box video-box"
            onClick={() => startGame(1)}
            onMouseEnter={() => handleMouseEnter(writingVideoRef, setIsWritingHovered)}
            onMouseLeave={() => handleMouseLeave(writingVideoRef, setIsWritingHovered)}
          >
            <video
              ref={writingVideoRef}
              src={Writingvideo}
              autoPlay={false}
              muted
              loop
              className={`video-quiz ${isWritingHovered ? 'hovered' : ''}`}
            />
            <div className="quiz-overlay"></div>
            <div className={`content ${isWritingHovered ? 'visible' : ''}`}>Writing Rules</div>
          </div>
          <div
            className="box video-box"
            onClick={() => startGame(2)}
            onMouseEnter={() => handleMouseEnter(grammarVideoRef, setIsGrammarHovered)}
            onMouseLeave={() => handleMouseLeave(grammarVideoRef, setIsGrammarHovered)}
          >
            <video
              ref={grammarVideoRef}
              src={Grammarvideo}
              autoPlay={false}
              muted
              loop
              className={`video-quiz ${isGrammarHovered ? 'hovered' : ''}`}
            />
            <div className="quiz-overlay"></div>
            <div className={`content ${isGrammarHovered ? 'visible' : ''}`}>Grammar Police</div>
          </div>
          <div
            className="box video-box"
            onClick={() => startGame(3)}
            onMouseEnter={() => handleMouseEnter(shaperVideoRef, setIsShaperHovered)}
            onMouseLeave={() => handleMouseLeave(shaperVideoRef, setIsShaperHovered)}
          >
            <video
              ref={shaperVideoRef}
              src={Shapervideo}
              autoPlay={false}
              muted
              loop
              className={`video-quiz ${isShaperHovered ? 'hovered' : ''}`}
            />
            <div className="quiz-overlay"></div>
            <div className={`content ${isShaperHovered ? 'visible' : ''}`}>Sentence Shaper</div>
          </div>
          <div
            className="box video-box"
            onClick={() => startGame(4)}
            onMouseEnter={() => handleMouseEnter(hotseatVideoRef, setIsHotseatHovered)}
            onMouseLeave={() => handleMouseLeave(hotseatVideoRef, setIsHotseatHovered)}
          >
            <video
              ref={hotseatVideoRef}
              src={Hotseatvideo}
              autoPlay={false}
              muted
              loop
              className={`video-quiz ${isHotseatHovered ? 'hovered' : ''}`}
            />
            <div className="quiz-overlay"></div>
            <div className={`content ${isHotseatHovered ? 'visible' : ''}`}>Hot Seat</div>
          </div>
        </div>
      </div>
    </div>
  );
};