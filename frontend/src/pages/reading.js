import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from "./sidebar";
import './reading.css'; 
import Readingvideo from '../images/readingrules.mp4';
import Wisevideo from '../images/readwise.mp4';
import Matchvideo from '../images/matchmaster.mp4';
import Storyvideo from '../images/storybuilder.mp4';

export const Reading = () => {
  const navigate = useNavigate();
  const [isReadingHovered, setIsReadingHovered] = useState(false);
  const [isWiseHovered, setIsWiseHovered] = useState(false);
  const [isMatchHovered, setIsMatchHovered] = useState(false);
  const [isStoryHovered, setIsStoryHovered] = useState(false);
  const readingVideoRef = useRef(null);
  const wiseVideoRef = useRef(null);
  const matchVideoRef = useRef(null);
  const storyVideoRef = useRef(null);

  const startGame = (gameNumber) => {
    if (gameNumber === 1) {
      navigate('/readingrules');
    }
    if (gameNumber === 2) {
      navigate('/readwise');
    }
    if (gameNumber === 3) {
      navigate('/matchmaster');
    }
    if (gameNumber === 4) {
      navigate('/storybuilder');
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
        <h1>Practice Your Reading</h1>
        <div className="optionContainer">
          <div
            className="box video-box"
            onClick={() => startGame(1)}
            onMouseEnter={() => handleMouseEnter(readingVideoRef, setIsReadingHovered)}
            onMouseLeave={() => handleMouseLeave(readingVideoRef, setIsReadingHovered)}
          >
            <video
              ref={readingVideoRef}
              src={Readingvideo}
              autoPlay={false}
              muted
              loop
              className={`video-quiz ${isReadingHovered ? 'hovered' : ''}`}
            />
            <div className="quiz-overlay"></div>
            <div className={`content ${isReadingHovered ? 'visible' : ''}`}>Reading Rules</div>
          </div>
          <div
            className="box video-box"
            onClick={() => startGame(2)}
            onMouseEnter={() => handleMouseEnter(wiseVideoRef, setIsWiseHovered)}
            onMouseLeave={() => handleMouseLeave(wiseVideoRef, setIsWiseHovered)}
          >
            <video
              ref={wiseVideoRef}
              src={Wisevideo}
              autoPlay={false}
              muted
              loop
              className={`video-quiz ${isWiseHovered ? 'hovered' : ''}`}
            />
            <div className="quiz-overlay"></div>
            <div className={`content ${isWiseHovered ? 'visible' : ''}`}>Read Wise</div>
          </div>
          <div
            className="box video-box"
            onClick={() => startGame(3)}
            onMouseEnter={() => handleMouseEnter(matchVideoRef, setIsMatchHovered)}
            onMouseLeave={() => handleMouseLeave(matchVideoRef, setIsMatchHovered)}
          >
            <video
              ref={matchVideoRef}
              src={Matchvideo}
              autoPlay={false}
              muted
              loop
              className={`video-quiz ${isMatchHovered ? 'hovered' : ''}`}
            />
            <div className="quiz-overlay"></div>
            <div className={`content ${isMatchHovered ? 'visible' : ''}`}>Match Master</div>
          </div>
          <div
            className="box video-box"
            onClick={() => startGame(4)}
            onMouseEnter={() => handleMouseEnter(storyVideoRef, setIsStoryHovered)}
            onMouseLeave={() => handleMouseLeave(storyVideoRef, setIsStoryHovered)}
          >
            <video
              ref={storyVideoRef}
              src={Storyvideo}
              autoPlay={false}
              muted
              loop
              className={`video-quiz ${isStoryHovered ? 'hovered' : ''}`}
            />
            <div className="quiz-overlay"></div>
            <div className={`content ${isStoryHovered ? 'visible' : ''}`}>Story Builder</div>
          </div>
        </div>
      </div>
    </div>
  );
};