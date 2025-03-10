import './App.css'
import Score from "./Score.jsx";
import Cat from "./Cat.jsx";
import { useState, useEffect } from 'react';

function App() {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    const handleKeyPress = () => {
      if (showInstructions) {
        setShowInstructions(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showInstructions]);

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

  const startGame = () => {
    setShowInstructions(false);
  };

  return (
      <div className="game-container">
          {showInstructions ? (
              <div className="instructions">
                  <h2>Pet the cat before it's too late!</h2>
                  <button 
                      className="start-button"
                      onClick={startGame}
                  >
                      OK
                  </button>
                  <p className="press-key">Press any key to start</p>
              </div>
          ) : (
              <>
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
              </>
          )}
      </div>
  )
}

export default App
