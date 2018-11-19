/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores = [0, 0];
var roundScore = 0;
var currPlayer = 0;

zeroOutGame();

document.querySelector(".btn-roll").addEventListener('click', function(){
    // Get random number
    var dice = Math.floor(Math.random() * 6) + 1;
    // Display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
    // Change the Round score if the rolled number's not 1
    if(dice !== 1){
        //Add Score
        addToRoundScore(dice);
        document.querySelector("#current-" + currPlayer).textContent = roundScore;
    }
    else{
        //Next player's turn
        addAndSwitchPlayer(currPlayer, roundScore);
        showScores();
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    //Next player's turn
    addAndSwitchPlayer(currPlayer, roundScore);

    showScores();
});

document.querySelector('.btn-new').addEventListener('click', function(){
    for(var i = 0; i < scores.length; i++){
        scores[i] = 0;
    }

    zeroOutGame();
});

function zeroOutGame() { 
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";

    document.querySelector(".dice").style.display = "none";

    //document.querySelector("#current-" + currPlayer).textContent = dice;
    
    for(i = 0; i < scores.length; i++){
        document.getElementById("score-" + i).textContent = 0;
        document.getElementById("current-" + i).textContent = 0;
    }
    
    document.querySelector(".btn-roll").removeAttribute("disabled");
    document.querySelector('.btn-hold').removeAttribute("disabled");
 }

 function addAndSwitchPlayer(currentPlayerNum, currentRoundScore){
    console.log(currentPlayerNum);
    if(currentPlayerNum === 1){
        addToPlayerScore(1, currentRoundScore);
        checkScores(1);
        document.getElementById("current-" + 1).textContent = 0;
    }else{
        addToPlayerScore(0, currentRoundScore);
        checkScores(0);

        document.getElementById("current-" + 0).textContent = 0;
    }
 }

function addToRoundScore(num){
    return roundScore += num;
}

function resetScore(){
    roundScore = 0;
}

function addToPlayerScore(playerNum, score){
    return scores[playerNum] += score;
}

function toggleActive(){
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
}

function showScores(){
    document.getElementById("score-0").textContent = scores[0];
    document.getElementById("score-1").textContent = scores[1];
    document.querySelector(".dice").style.display = "none";
}

function checkScores (playerNum) { 
    var playerScore = document.getElementById('score-' + playerNum).innerHTML;
    var currentScore = document.getElementById('current-' + playerNum).innerHTML;

    var totalScore = parseInt(playerScore) + parseInt(currentScore);

    console.log(totalScore);

    if(totalScore >= 100){
        document.querySelector(".btn-roll").setAttribute("disabled", "");
        document.querySelector('.btn-hold').setAttribute("disabled", "");

        document.getElementById('name-' + playerNum).textContent = "Winner!";
    }
    else{
        if(playerNum === 0){
            resetScore();
            currPlayer = 1;
            toggleActive();
        }
        else{
            resetScore();
            currPlayer = 0;
            toggleActive();
        }
    }
 }