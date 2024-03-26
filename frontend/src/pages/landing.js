import React from "react";
import './landing.css'
import { Link } from 'react-router-dom';
import BgVideo from '../images/landingpage.mp4' 

export const Landing = () => {
    return (
        <div className="landingpage">

            <video src={BgVideo} autoPlay muted loop class="video-bg" />
            <div className="bg-overlay"></div>


            <div className="home-text">
                <h1>Welcome to Literassist!</h1>
                <p>Whether you're starting your journey or continuing to grow, we're here to support you every step of the way</p>
            </div>
            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2022 Literassist. All rights reserved.</p>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms-of-service">Terms of Service</Link>
                </div>
            </footer>
            

        </div>
    )
}