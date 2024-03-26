import React, { useRef, useState } from 'react';
import { Sidebar } from './sidebar';
import speechvideo from '../images/eightspeech.mp4';
import './readingrules.css'; 

export const SecondLesson = () => {
    const videoRef = useRef(null);
  const [showQuizModal, setShowQuizModal] = useState(false);

  const handleVideoEnd = () => {
    // Show the quiz modal when the video ends
    setShowQuizModal(true);
  };

  const handleQuizButtonClick = () => {
    // Redirect to the quiz page (replace this with your actual quiz page URL)
    window.location.href = '/secondquiz';
  };

  const handleReplayButtonClick = () => {
    if (videoRef.current) {
        videoRef.current.currentTime = 0; // Set video playback to the beginning
        videoRef.current.play(); // Start playing the video
      }  
    setShowQuizModal(false);
    
  };

  return (
    <div className="readingrules-container">
      <Sidebar />
      <div className="readingcontent-container">
        <div className="readingrules-text">
          <h1>Ready for your next lesson?</h1>
          <p>
            Here you will learn the 8 parts of speech and their importance in the written language!
          </p>
          <div>
            <video
              controls
              width="100%"
              onEnded={handleVideoEnd}
              ref={videoRef}
            >
              <source src={speechvideo} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuizModal && (
        <div className="readingquiz-modal">
          <p>Ready to take the quiz? Click here!</p>
          <div className="button-container">
          <button onClick={handleQuizButtonClick}>Quiz</button>
          <button onClick={handleReplayButtonClick}>Replay Video</button>
        </div>
        </div>
      )}
    </div>
  );
};
