import React, { useState, useEffect } from 'react';
import './MobileMessage.css';

const MobileViewMessage = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 900); // Change this width so the meesage aooears whenever width is reached or lower, just put 900 cuz tablet was closest to size anything smaller is phone, Can be changed
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobileView ? (
    <div className="mobile-view-message">
      For Best Browsing Experience, please open this on a desktop browser.
    </div>
  ) : null;
};

export default MobileViewMessage;
