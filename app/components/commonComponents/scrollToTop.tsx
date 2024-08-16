import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'


const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const element = <FontAwesomeIcon icon={faChevronUp} />
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setIsVisible(currentScrollPos > 100); //
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      className={`fixed bottom-4 right-4 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } rounded-full p-3 text-white shadow-lg transition-opacity duration-300`}
      style={{ backgroundColor: '#4442E3' }}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      {element}
    </button>
  );
};

export default ScrollToTopButton;