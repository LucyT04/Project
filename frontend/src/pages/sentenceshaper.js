import React, { useEffect, useState } from 'react'; 
import { Sidebar } from './sidebar';
import './sentenceshaper.css';
import shaperBackground from '../images/shaperbackground.png';

export const SentenceShaper = () => {
  const roundsData = [
    ['plant', 'quick', 'yellow', 'far'],
    ['coat', 'shop', 'tree', 'window'],
    ['bottle', 'red', 'chips', 'laptop']
  ];

  const [currentRound, setCurrentRound] = useState(0);
  const [currentWords, setCurrentWords] = useState([]);
  const [userSentence, setUserSentence] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [missingWords, setMissingWords] = useState([]);
  const [showTryAgainMessage, setShowTryAgainMessage] = useState(false);
  const [isSentenceTooShort, setIsSentenceTooShort] = useState(false); // State to track if the sentence is too short
  const [wordCount, setWordCount] = useState(0); // State to track word count

  useEffect(() => {
    startNewRound();
  }, [currentRound]);

  const startNewRound = () => {
    const currentWords = roundsData[currentRound];
    setCurrentWords(currentWords);
    setUserSentence('');
    setIsCorrect(false);
    setMissingWords([]);
    setShowTryAgainMessage(false); // Reset the message when starting a new round
    setIsSentenceTooShort(false); // Reset the sentence length check
    setWordCount(0); // Reset the word count
  };

  const handleInputChange = (e) => {
    const sentence = e.target.value;
    setUserSentence(sentence);
    setIsCorrect(false); // Reset correctness when the user starts typing
    setMissingWords([]); // Reset missing words when the user starts typing
    setShowTryAgainMessage(false); // Reset the message when the user starts typing
    setIsSentenceTooShort(false); // Reset the sentence length check

    // Update word count
    const words = sentence.trim().split(/\s+/);
    setWordCount(words.length === 1 && words[0] === '' ? 0 : words.length); // Set word count to 0 if input is empty
  };

  const handleCheckSentence = () => {
    const userWords = userSentence.trim().split(/\s+/); // Remove leading/trailing spaces and split the sentence into words
    const missingWords = currentWords.filter(word => !userWords.includes(word.toLowerCase()));
    const additionalWordsCount = userWords.filter(word => !currentWords.includes(word)).length;

    // Check if the sentence is too short
    if (userWords.length < 15) {
      setIsSentenceTooShort(true);
      return; // Exit early
    }

    // Check if the sentence is correct
    if (missingWords.length === 0 && additionalWordsCount > 0) {
      setIsCorrect(true);

      if (currentRound < roundsData.length - 1) {
        setCurrentRound(prevRound => prevRound + 1);
      }
    } else {
      setIsCorrect(false);
      setMissingWords(missingWords);
      setShowTryAgainMessage(additionalWordsCount === 0);
    }
  };

  const handleRestartGame = () => {
    setCurrentRound(0);
  };

  return (
    <div className="sentence-shaper-container">
      <Sidebar className="sidebar" />
      <div className="game-content">
        <div className="text-container">
          <h1>Sentence Shaper</h1>
          <div>
            <p>Construct a sentence using the words:</p>
            <ul>
              {currentWords.map((word, index) => (
                <li
                  key={index}
                  className={userSentence.toLowerCase().includes(word.toLowerCase()) ? 'green' : ''}
                  style={{ marginBottom: '5px' }}
                >
                  {word}
                </li>
              ))}
            </ul>
            <div className="word-count">Word count: {wordCount}</div>
            <textarea
              rows="4"
              cols="50"
              placeholder="Type your sentence here..."
              value={userSentence}
              onChange={handleInputChange}
            ></textarea>
            <br />
            <button onClick={handleCheckSentence}>
              Check Sentence
            </button>
            {isCorrect && <p className="success">Correct! Moving to the next round.</p>}
            {missingWords.length > 0 && !isCorrect && (
              <p className="error">Try again. Missing words: {missingWords.join(', ')}</p>
            )}
            {showTryAgainMessage && (
              <p className="error">Construct a complete sentence using the provided words.</p>
            )}
            {isSentenceTooShort && (
              <p className="error">Your sentence is too short. Please enter a sentence with at least 15 words.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};