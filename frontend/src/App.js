import './App.css';
import Navbar from './pages/navbar.js';
import {BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Login from "./pages/login.js";
import Register from "./pages/register";
import Profile from "./pages/profile.js";
import { Help } from "./pages/help.js";
import { Reading } from "./pages/reading.js";
import { Writing } from "./pages/writing.js";
import { Practice } from "./pages/practice.js";
import { Aboutus } from "./pages/aboutus";
import { Landing } from "./pages/landing";
import { Quiz } from "./pages/quiz";
import { WordScramble } from "./pages/word-scramble";
import { GrammarGame } from "./pages/grammargame";
import { LetterLink } from "./pages/letterlink";
import { MatchMaster } from "./pages/matchmaster";
import { ReadWise } from "./pages/readwise";
import { ReadingRules } from "./pages/readingrules";
import { ReadingRulesQuiz } from "./pages/readingrulesquiz";
import { SecondLesson } from "./pages/secondlesson";
import { SecondQuiz } from "./pages/secondquiz";
import { WordSearchGrid }from './pages/WordSearchGrid';
import { WordSearchGame }from './pages/WordSearchGame';
import { WritingRules }from './pages/writingrules';
import { SentenceShaper }from './pages/sentenceshaper';
import { HotSeat }from './pages/hotseat';
import { WritingRulesQuiz } from './pages/writingrulesquiz';
import { StoryBuilder } from './pages/storybuilder';

// import { Wordguess } from "./pages/wordguess";



function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <div className ="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path ="/" element={<Login/>} />
          <Route path ="/register" element={<Register/>} />
          <Route path ="/profile" element={<Profile/>} /> 
          <Route path ="/help" element={<Help/>} /> 
          <Route path ="/reading" element={<Reading/>} /> 
          <Route path ="/writing" element={<Writing/>} /> 
          <Route path ="/practice" element={<Practice/>} /> 
          <Route path ="/aboutus" element={<Aboutus/>} /> 
          <Route path ="/landing" element={<Landing/>} /> 
          <Route path ="/quiz" element={<Quiz/>} /> 
          <Route path ="/word-scramble" element={<WordScramble/>} /> 
          <Route path ="/grammargame" element={<GrammarGame/>} /> 
          <Route path ="/letterlink" element={<LetterLink/>} /> 
          <Route path ="/matchmaster" element={<MatchMaster/>} /> 
          <Route path ="/readwise" element={<ReadWise/>} /> 
          <Route path ="/readingrules" element={<ReadingRules/>} /> 
          <Route path ="/readingrulesquiz" element={<ReadingRulesQuiz/>} /> 
          <Route path ="/secondlesson" element={<SecondLesson/>} /> 
          <Route path ="/secondquiz" element={<SecondQuiz/>} /> 
          <Route path ="/WordSearchGame" element={<WordSearchGame/>} /> 
          <Route path ="/WordSearchGrid" element={<WordSearchGrid/>} /> 
          <Route path ="/writingrules" element={<WritingRules/>} /> 
          <Route path ="/sentenceshaper" element={<SentenceShaper/>} /> 
          <Route path ="/hotseat" element={<HotSeat/>} /> 
          <Route path ="/writingrulesquiz" element={<WritingRulesQuiz/>} /> 
          <Route path ="/storybuilder" element={<StoryBuilder/>} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;