import flatcat from './flatcat.png'
import autoBindReact from 'auto-bind/react'
import React from "react";
import './Cat.css'
import TimeBar from './TimeBar';

class Cat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            left: 50,  // Initial position
            top: 50,
            isVisible: true,
            message: '',
            timeProgress: 100  // Add new state for progress
        };
        this.timer = null;
        this.progressInterval = null;  // Add new timer for progress
        this.baseWaitTime = 3000; // 3 seconds base time
        autoBindReact(this);
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
    }

    getWaitTime() {
        const clickGroup = Math.floor(this.props.score / 5);
        if (clickGroup === 0) return this.baseWaitTime;
        
        // Decrease by 1.5x for each group of 5 clicks after first 5
        return this.baseWaitTime / Math.pow(1.5, clickGroup);
    }

    startDisappearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
        
        const waitTime = this.getWaitTime();
        
        this.setState({ timeProgress: 100 }, () => {
            const startTime = Date.now();

            this.progressInterval = setInterval(() => {
                const elapsedTime = Date.now() - startTime;
                const remainingPercent = Math.min(100, Math.max(0, 
                    100 * (1 - (elapsedTime / waitTime))
                ));
                
                this.setState({ timeProgress: remainingPercent });
            }, 16);
        });

        this.timer = setTimeout(() => {
            clearInterval(this.progressInterval);
            this.setState({
                isVisible: false,
                message: 'Your cat is gone!',
                timeProgress: 0
            });
            // Trigger game over
            if (this.props.onGameOver) {
                this.props.onGameOver();
            }
        }, waitTime);
    }

    handleClick() {
        const newLeft = Math.random() * 80 + 10;
        const newTop = Math.random() * 80 + 10;
        
        this.setState({
            left: newLeft,
            top: newTop,
            isVisible: true,
            message: '',
            timeProgress: 100
        }, () => {
            this.startDisappearTimer();
        });

        if (this.props.onCatClick) {
            this.props.onCatClick();
        }
    }

    render() {
        return (
            <>
                <TimeBar progress={this.state.timeProgress} />
                {this.state.isVisible ? (
                    <div 
                        id="myCat" 
                        className="tile" 
                        onClick={this.handleClick}
                        style={{
                            left: `${this.state.left}%`,
                            top: `${this.state.top}%`
                        }}
                    >
                        <img src={flatcat} alt="cat image"/>
                    </div>
                ) : (
                    <div className="cat-gone-message">
                        {this.state.message}
                    </div>
                )}
            </>
        )
    }
}

export default Cat