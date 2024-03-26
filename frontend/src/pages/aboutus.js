import React, { useState, useEffect } from 'react';
import './aboutus.css'; 


export const Aboutus = () => {
    return (
      <div className="aboutus-container">
        <Sidebar />
        <div className="content-container">
          <div className="aboutus-text">
            <h1>About Literassist</h1>
            <p>
              Welcome to Literassist - your place to grow your reading and writing. We understand how hard reading and writing can be for some adults. That's why we created a simple, friendly website just for you - to help you gain confidence in your skills over time.
            </p>
            <p>
              At Literassist, everything is designed especially for busy adults like you. We keep things clear, straightforward and make sure you can learn at your own pace. We know there are lots of other things you need to do each day. So you can visit when it suits you and work step-by-step from wherever you're starting now. Over weeks and months, you will notice the difference!
            </p>
            <p>
              On our website you’ll find:
            </p>
            <ul>
              <li>Short texts we’ve written using straightforward language. You’ll enjoy reading stories and articles while picking up helpful tips.</li>
              <li>Activities to boost reading comprehension and writing skills - with handy hints along the way. We’ll build your skills up gently.</li>
              <li>Videos with friendly teachers who explain things clearly. They’ll patiently guide you through new concepts.</li>
              <li>A progress tracker so you can see how far you’ve come and what to tackle next. Celebrate your milestones!</li>
              <li>Encouragement from our whole community who knows the effort it takes. You can do this - and we’re here to support you!</li>
            </ul>
            <p>
              Literassist was created by adult learning experts who want to empower adults with limited reading and writing. Everything is focused on clear, successful communication. Together we will open doors to understanding and confidence in your skills.
            </p>
            <p>
              Start your learning journey with us today! We can’t wait to see you grow.
            </p>
          </div>
        </div>
      </div>
    );
  };