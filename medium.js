/* my idea

        //random number
 const random = Math.floor(Math.random()*150)

console.log(random)

function guess(){
  if (random >100){
    console.log(`Error: ${random} is over 100`)   
  } else {
    console.log(`${random}`)
  }
}

guess()
* / 


/* from broCode
const minNum = 1;
const maxNum = 100;
const answer = Math.floor(Math.random()*(maxNum - minNum +1))+minNum

let attempts = 0;
let guess;
let running = true;

while (running){
    guess = window.prompt(`Guess a number between ${minNum} and ${maxNum}`)
    guess = Number(guess);
    if (isNaN(guess)){
        window.alert('Please enter a valid number');
    }else if (guess < minNum || guess > maxNum){
       window.alert(`Please enter a number between ${minNum} and ${maxNum}`); 
    } else{
        attempts ++;
        if (guess < answer){
            window.alert('Too low! Try again');
        } else if (guess > answer) {
            window.alert('Too high! Try again');
        } else {
            window.alert(`Correct! The answer was ${answer}. It took you ${attemps} to guess correctly`)
        }
    }

    console.log(typeof guess, guess);
    running = false;
}
*/

/* from mdn web docs a first splash into javascript*/

let randomNumber = Math.floor(Math.random()*200) + 1;

let guesses = document.querySelector('.guesses');
let lastResult = document.querySelector('.lastResult');
let lowOrHigh = document.querySelector('.lowOrHigh');

let guessSubmit = document.querySelector('.guessSubmit');
let guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;

guessField.focus()

function checkGuess() {
    const userGuess = Number(guessField.value);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 200){
        lowOrHigh.textContent = 'Please enter a number between and 1 and 200'
        return
    }
    if(guessCount === 1) {  
        guesses.textContent = 'Previous Guesses: ';
    }
    guesses.textContent = (`${guesses.textContent} ${userGuess}`);
    /*guesses.textContent += userGuess + '';*/


    if(userGuess === randomNumber) {
        lastResult.textContent = 'Congratulations!';
        lastResult.style.backgroundColor = 'green';
        lowOrHigh.textContent = ''; /* clears the input*/ 
        setGameOver()
    } else if (guessCount === 5){
        lastResult.textContent = '!!!Game Over!!!'
        lowOrHigh.textContent = '';
        setGameOver();
    } else {
        lastResult.textContent = 'Wrong!'
        lastResult.style.backgroundColor = 'red';
         if (userGuess < randomNumber) {
            lowOrHigh.textContent =`This was guess no. ${guessCount}. Guess was too low`;
        } else if(userGuess > randomNumber) {
            lowOrHigh.textContent =`This was guess no. ${guessCount}. Last guess was too high`;
        } 
      
       
    }
    guessCount ++;
    guessField.value ='';
    guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess); // w3school: onclick Event. myScript synonym for function. here checkGuess
guessField.addEventListener('keypress', function(event){ //w3School:  onkeypressEvent.
    if (event.key === 'Enter'){
        checkGuess();
    }
})


function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Play Again!';
    document.body.append(resetButton);
    resetButton.addEventListener('click', resetGame);

}

function resetGame() {
    guessCount = 1;

    const resetParas = document.querySelectorAll('.resultParas p');
    for (const resetPara of resetParas) {
        resetPara.textContent = '';
    }
    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = "white";

    randomNumber = Math.floor(Math.random() * 200) + 1;
}
