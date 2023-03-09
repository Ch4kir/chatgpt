import React, { useState, useEffect } from 'react';

const TypeText = ({ text, typingSpeed }) => {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    let index = 0;
    const type = () => {
      setDisplay(text.slice(0, index));
      index++;
      if (index <= text.length) {
        setTimeout(type, typingSpeed);
      }
    };
    type();
  }, [text, typingSpeed]);

  return <div>{display}</div>;
};

export default TypeText;
