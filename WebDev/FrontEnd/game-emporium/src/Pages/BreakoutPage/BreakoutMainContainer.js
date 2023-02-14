import { useEffect } from 'react';

import { SetUpCanvas, CreateBlock, CrreateBall } from './BreakoutLogic';

export default function BreakoutMain() {

    const context = SetUpCanvas();
    
    useEffect(() => {
        CreateBlock(20, 40, 50, 50, "#FF0000", context);
        CrreateBall(240, 160, 20, 0, Math.PI * 2, false, "green", context);
        CreateBlock(160, 10, 100, 40, "rgba(0,0,255,0.5)", context);
    }, [])


    return(
        <div>
            <h2>Breakout Main</h2>
            <canvas id="breakoutCanvas" />
        </div>
    );
}