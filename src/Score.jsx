import { useState } from 'react';

function Score() {
    const [score, setScore] = useState(0)

    return (
        <div id="score" className="scoreBox">
            {score}
        </div>
    )
}

export default Score