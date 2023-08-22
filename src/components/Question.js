import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Create a timer that runs every 1 second
    const timer = setInterval(() => {
      // Decrease timeRemaining by 1
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup function for useEffect
    return () => {
      clearInterval(timer); // Clear the timer when the component unmounts
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  useEffect(() => {
    if (timeRemaining === 0) {
      // Reset timeRemaining to 10 seconds
      setTimeRemaining(10);
      // Call the onAnswered callback with a value of false
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]);

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => onAnswered(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
