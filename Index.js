const firstCardEl = document.getElementById('first-card');
const secondCardEl = document.getElementById('second-card');
const thirdCardEl = document.querySelector('#third-card');
const fourthCardEl = document.querySelector('#fourth-card');
const fifthCardEl = document.getElementById('fifth-card');
const sumEl = document.getElementById('sum-container');

const enemyFirstCardEl = document.getElementById('enemy-first-card');
const enemySecondCardEl = document.getElementById('enemy-second-card');
const enemyThirdCardEl = document.getElementById('enemy-third-card');
const enemyFourthCardEl = document.getElementById('enemy-fourth-card');
const enemyFifthCardEl = document.getElementById('enemy-fifth-card');
const enemyScoreEl = document.getElementById('enemy-score');

const messageContainer = document.getElementById('message-p');
const drawBtnEl = document.querySelector('#draw-btn');
const passBtnEl = document.querySelector('#pass-btn');


let cardsDeck = [1,2,3,4,5,6,7,8,9,10,11,12];

let myHand = [0,0,0,0,0];
let enemyHand = [0,0,0,0,0];

var sum = 0;
var enemySum = 0;

var playerPass = false;
var enemyPass = false;
var gameIsOver = false;

var message = 'Want to play a round?';
messageContainer.textContent = message;
//Change it so game resets on Start Game button
function startGame(){
    if(gameIsOver === false)
    {
        console.log('The game has started!');
    
        myHand[0] = getRndInteger(1,13);
        firstCardEl.textContent = myHand[0];
        myHand[1] = getRndInteger(1,13);
        secondCardEl.textContent = myHand[1];
        sum = parseInt(myHand[0]) + parseInt(myHand[1]);
    
        enemyHand[0] = getRndInteger(1,13);
        enemyFirstCardEl.textContent = '?';
        enemyHand[1] = getRndInteger(1,13);
        enemySecondCardEl.textContent = '?';
        enemySum= enemyHand[0] + enemyHand[1];
    
        drawBtnEl.textContent = 'Hit';
        passBtnEl.textContent = 'Stand';
        sumEl.textContent = sum;
        messageContainer.textContent = gameMessage(sum);
    }
    else{
        reset();
        startGame();
    }
}

function getRndInteger(min, max) {
    let number;
    while(true){
        number = Math.floor(Math.random() * (max - min) ) + min;
        if(myHand.includes(number) || enemyHand.includes(number)){
            // console.warn('Oho, duplicate!');
            continue;
        }
        else{
            break;
        }
    }
    return number;
}


function drawCard(){
    if(gameIsOver === false)
    {
        console.log('You try to draw a card');
        if(myHand[2] === 0)
        {
            myHand[2] = getRndInteger(1, 13);
            thirdCardEl.textContent = myHand[2];
            sum += myHand[2];
            sumEl.textContent = sum;
        }
        else if(myHand[3] === 0){
            myHand[3] = getRndInteger(1, 13);
            fourthCardEl.textContent = myHand[3];
            sum += myHand[3];
            sumEl.textContent = sum;
        }
        else if(myHand[4] === 0)
        {
            myHand[4] = getRndInteger(1, 13);
            fifthCardEl.textContent = myHand[4];
            sum += myHand[4];
            sumEl.textContent = sum;
            playerPass = true;
        }
        else{
            console.log("You can't draw again!");
            playerPass = true;
        } 
        messageContainer.textContent = gameMessage(sum);
        enemyRound();
    }
}

function gameMessage(sum){
    if(sum < 21){
        return `Your total is: ${sum}, do you want to draw another card?`;
    }
    else if(sum === 21){
        drawBtnEl.textContent = '---';
        return `You got a blackjack! There is no need to draw more cards!`;
    }
    else{
        return `You went over 21, no need to draw anymore, but no one is stopping you!`;
    }
}

function pass(){
    playerPass = true;
    if(gameIsOver === false){
        enemyRound();
    }
}

function enemyRound(){
if(enemySum <= 14){
    //draw a card
    console.log('Enemy drew a card');
    if(enemyHand[2] === 0){
        enemyHand[2] = getRndInteger(1,13);
        enemySum+=enemyHand[2];
        enemyThirdCardEl.textContent = '?';
        console.log(`New enemy sum after first draw: ${enemySum}`);
    }
    else if(enemyHand[3] === 0){
        enemyHand[3] = getRndInteger(1,13);
        enemySum+=enemyHand[3];
        enemyFourthCardEl.textContent = '?';
        console.log(`New enemy sum after 2 draw: ${enemySum}`);
    }
    else if(enemyHand[4] === 0){
        enemyHand[4] = getRndInteger(1,13);
        enemySum+=enemyHand[4];
        enemyFifthCardEl.textContent = '?';
        enemyPass = true;
        console.log(`New enemy sum after 3 draw: ${enemySum}`);
    }
}
else
{
    //pass
    enemyPass = true;
    console.log('Enemy passed');
}

roundConcludes();
}

function roundConcludes(){
    if(enemyPass === true && playerPass === true && gameIsOver === false)
    {
        revealEnemyCards();

        console.log(`Player score: ${sum}`, `Enemy Score: ${enemySum}`)
        if(sum > 21 && enemySum > 21){
            message = `Both player busted! No one wins!`
            
        }
        else if(sum > 21 && enemySum < 21){
            message = `Enemy player won with score of ${enemySum}!`;
        }
        else if(sum < 21 && enemySum > 21){
            message = `Enemy went over the score, you won with a score of ${sum}!`;
        }
        else{
            sum = 21 - sum;
            enemySum = 21 - enemySum;

            if(sum > enemySum){
                message = `Enemy player won being closer to 21 than you by ${Math.abs(enemySum - sum)}!`;
            }
            else if (sum < enemySum){
                message = `You won by being closer to 21 than enemy by ${Math.abs(sum - enemySum)}!`;
            }
            else{
                message = "It's a draw!";
            }
        }

        messageContainer.innerText = message;
        gameIsOver = true;
    }
    else{
        enemyPass = false;
        playerPass = false;
    }
}

function revealEnemyCards(){
    for(let i = 0; i < enemyHand.length - 1; i++){
        switch(i){
            case 0:
                enemyFirstCardEl.textContent = enemyHand[0];
                enemySecondCardEl.textContent = enemyHand[1];
                break;
            case 1:
                if(enemyHand[2] === 0){
                    enemyThirdCardEl.textContent = '';
                    break;
                }
                enemyThirdCardEl.textContent = enemyHand[2];
                break;
            case 2:
                if(enemyHand[3] === 0){
                    enemyFourthCardEl.textContent = '';
                    break;
                }
                enemyFourthCardEl.textContent = enemyHand[3];
                break;
            case 3:
                if(enemyHand[4] === 0){
                    enemyFifthCardEl.textContent = '';
                    break;
                }
                enemyFifthCardEl.textContent = enemyHand[4];
                break;
        }
    }

    if(gameIsOver === false)
    {
        enemyScoreEl.textContent =  enemySum;
    }
}

function reset(){
    myHand = [0,0,0,0,0];
    enemyHand = [0,0,0,0,0];
    sum = 0;
    enemySum = 0;
    playerPass = false;
    enemyPass = false;
    gameIsOver = false;

    thirdCardEl.textContent = '';
    fourthCardEl.textContent = '';
    fifthCardEl.textContent = '';
    sumEl.textContent = '';

    enemyFirstCardEl.textContent = '';
    enemySecondCardEl.textContent = '';
    enemyThirdCardEl.textContent = '';
    enemyFourthCardEl.textContent = '';
    enemyFifthCardEl.textContent = '';
    enemyScoreEl.textContent = '';
}

function createSpan(idName, innerText){
    console.log('Creating span');
    let span = document.createElement('span');
    span.id = idName;
    span.appendChild(document.createTextNode(innerText));
    return span;
}
