import './App.css'
import Score from "./Score.jsx";
import Cat from "./Cat.jsx";
import { useState } from 'react';

function App() {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleCatClick = () => {
    setScore(prevScore => prevScore + 1);
  };

  const handleGameOver = () => {
    setIsGameOver(true);
  };

  const handleRestart = () => {
    setScore(0);
    setIsGameOver(false);
  };

  return (
      <div className="game-container">
          <Score score={score}/>
          <div className="game-area">
              {!isGameOver ? (
                  <Cat 
                      onCatClick={handleCatClick} 
                      score={score}
                      onGameOver={handleGameOver}
                  />
              ) : (
                  <div className="game-over">
                      <h2>Game Over!</h2>
                      <p>Final Score: {score}</p>
                      <button 
                          className="restart-button"
                          onClick={handleRestart}
                      >
                          Play Again
                      </button>
                  </div>
              )}
          </div>
      </div>
  )
}

export default App
