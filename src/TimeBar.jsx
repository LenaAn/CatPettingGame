import { useEffect, useState } from 'react';
import './TimeBar.css';

function TimeBar({ progress }) {
    const [isInitial, setIsInitial] = useState(true);
    
    useEffect(() => {
        if (progress === 100) {
            setIsInitial(true);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsInitial(false);
                });
            });
        }
    }, [progress]);

    const getBarColor = () => {
        if (progress > 70) return '#2D952E';  // green
        if (progress > 30) return '#FFD700';  // yellow
        return 'red';
    };

    const width = Math.round(progress);
    
    return (
        <div className="time-bar-container">
            <div 
                className={`time-bar-fill ${isInitial ? 'initial' : ''}`}
                style={{ 
                    width: `${width}%`,
                    backgroundColor: getBarColor()
                }}
            />
        </div>
    );
}

export default TimeBar; 