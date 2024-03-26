import React, { useState } from 'react';
import { Sidebar } from "./sidebar";
import './help.css'; 

export const Help = () => {
  const [accordion1, setAccordion1] = useState(false);
  const [accordion2, setAccordion2] = useState(false);
  const [accordion3, setAccordion3] = useState(false);
  const [accordion4, setAccordion4] = useState(false);

  const toggleAccordion1 = () => {
    setAccordion1(!accordion1);
  };

  const toggleAccordion2 = () => {
    setAccordion2(!accordion2);
  };

  const toggleAccordion3 = () => {
    setAccordion3(!accordion3);
  };

  const toggleAccordion4 = () => {
    setAccordion4(!accordion4);
  };

  return (
    <div>
      <Sidebar />
      <div className="helpContainer">
        <div className="faqImageContainer">
          <img src="FAQ.png" alt="FAQ" className="FAQ" />
        </div>
        <div className="accordionContainer">
          <h1>Frequently Asked Questions</h1>
          <div className="accordionItem">
            <div className="accordionHeader" onClick={toggleAccordion1}>
              <i className="fa-solid fa-question"></i>
              <h2>How can I earn more XP?</h2>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            {accordion1 && (
              <div className="accordionContent">
                <p>Content for Accordion Item 1</p>
              </div>
            )}
          </div>

          <div className="accordionItem">
            <div className="accordionHeader" onClick={toggleAccordion2}>
              <i className="fa-solid fa-question"></i>
              <h2>Accordion Item 2</h2>
              <span className={accordion2 ? 'icon-minus' : 'icon-plus'}></span>
            </div>
            {accordion2 && (
              <div className="accordionContent">
                <p>Content for Accordion Item 2</p>
              </div>
            )}
          </div>
          <div className="accordionItem">
            <div className="accordionHeader" onClick={toggleAccordion3}>
              <i className="fa-solid fa-question"></i>
              <h2>How can I earn more XP?</h2>
              <span className={accordion3 ? 'icon-minus' : 'icon-plus'}></span>
            </div>
            {accordion3 && (
              <div className="accordionContent">
                <p>Content for Accordion Item 3</p>
              </div>
            )}
          </div>
          <div className="accordionItem">
            <div className="accordionHeader" onClick={toggleAccordion4}>
              <i className="fa-solid fa-question"></i>
              <h2>How can I earn more XP?</h2>
              <span className={accordion4 ? 'icon-minus' : 'icon-plus'}></span>
            </div>
            {accordion4 && (
              <div className="accordionContent">
                <p>Content for Accordion Item 1</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
