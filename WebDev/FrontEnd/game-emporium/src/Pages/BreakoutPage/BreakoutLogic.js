
const SetUpCanvas = (canvasID) => {
    let canvas = document.getElementById(canvasID);
    return canvas.getContext('2d');
}

const CreateBlock = (
        xLoc,
        yLoc,
        w,
        h,
        blockColor,
        context
    ) => {
    context.beginPath();
    context.rect(xLoc, yLoc, w, h);
    context.fillStyle = blockColor;
    context.fill();
    context.closePath();
}

const CrreateBall = (
        xLoc,
        yLoc,
        ballRadius,
        sAngle,
        eAngle,
        isCCW = false,
        ballColor,
        context
    ) => {
    context.beginPath();
    context.arc(xLoc, yLoc, ballRadius, sAngle, eAngle, isCCW);
    context.fillStyle = ballColor;
    context.fill();
    context.closePath();
}

export {
    SetUpCanvas,
    CreateBlock,
    CrreateBall,
}