var playHasStarted = false;
var totalWins = 0;
var totalLosses = 0;
var possibleWords = ["COOKIE", "CINNAMON", "JINGLE"]
var wordIndexToUse = 0;
var currentWord;
var currentLettersTried;
var numberOfBadGuesses = 0;


document.onkeyup = function(event) {
    var userInput = event.key;
    //first handle case where this is the first time key is being pressed
    if (playHasStarted === false) { playHasStarted = true; startNewWord();}
    //handle case where this is not the first key to be pressed
    else {
        //check to see if key is a letter
        if (isLetter(userInput) === false) {
            alert("You need to enter a valid letter. " + userInput + " is not a letter!");
        }
        else {
            //capitalize the letter
            userInput = userInput.toUpperCase();
            //check to see if letter has already been guessed
            if (letterHasBeenTried(userInput)) {
                alert("you alredy tried the letter " + userInput);
            }
            else {
                //add letter to list of letters tried
                currentLettersTried.push(userInput);
                //check if letter is good or bad
                if (currentWord.includes(userInput)) {
                    // alert("the word " + currentWord + "contains the letter " + userInput);
                    //update the word display in the view
                    //conclude round if word is now complete
                    var unguessedLetterExists = false;
                    for (i=0; i<currentWord.length; i++) {
                        if (!currentLettersTried.includes(currentWord[i])) {
                            //note the ! so this means there is still a letter than hasn't been guessed yet
                            unguessedLetterExists = true;
                            // alert("at this point, we know the letter " + currentWord[i] + " has not yet been guessed.");
                        }
                    }
                    if (unguessedLetterExists === false) {
                        alert("now, we know every letter has been guessted.");
                        totalWins++;
                        updateScoreBoard()
                    }
                }
                else {
                    //here, a bad letter was guessed, so time to punish
                    numberOfBadGuesses++;
                    //update image
                    changeImageSeq(numberOfBadGuesses);
                    if (numberOfBadGuesses === 7) {
                        //update loss counter notify user what correct word was, wait for user to strart new game
                        totalLosses++;
                        updateScoreBoard();
                    }

                }
            }
        }
    }
}

function changeImageSeq(seqNumber) {
    document.getElementById('gallowsImg').src='assets/images/gallows' + seqNumber + '.jpg';
}

function startNewWord() {
    //instantiate variables for this new word
    currentWord = possibleWords[wordIndexToUse];
    currentLettersTried = [];
    numberOfBadGuesses = 0;
    //set the stage to the proper image
    changeImageSeq("0");
    alert("game started. The word to guess will be: " + currentWord);

}

//this funtion takes a string and return true if it is a letter, false if it is not
function isLetter(str) {
    return (str.toLowerCase() != str.toUpperCase()); //note the !
    // return str.length === 1 && str.match(/[a-z]/i);
  }

  //this function takes a letter and checks to see if in the array currentLettersTried
  function letterHasBeenTried(c) {
      return currentLettersTried.includes(c);
  }

  //this function puts the wins and losses totals in the upper right corner of the game window
  function updateScoreBoard() {
    //   alert("now, we are going to update the scoreboard.");
      var scoreText = "Wins: " + totalWins + " Losses: " + totalLosses;
    //   alert("now, the text should read " + scoreText);
      
  }