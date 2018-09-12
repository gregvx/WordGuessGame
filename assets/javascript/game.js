var playHasStarted = false;
var totalWins = 0;
var totalLosses = 0;
var possibleWords = ["COOKIE", "CINNAMON", "JINGLE", "TINSEL", "STOCKING", "REINDEER", "PUMPKIN", "COSTUME", "CIDER", "POINSETTIA"]
var wordIndexToUse = 0;
var currentWord;
var currentLettersTried;
var numberOfBadGuesses = 0;


document.onkeyup = function(event) {
    var userInput = event.key;
    //first handle case where this is the first time key is being pressed
    if (playHasStarted === false) { playHasStarted = true; startGame(); startNewWord();}
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
                    document.getElementById("wordDisplay").innerHTML = getShowableLetters();
                    //determine if word is now complete
                    // alert("at this point, the letter should be displayed. but alert sometimes fires before rendering of letter complete.");
                    var unguessedLetterExists = false;
                    for (i=0; i<currentWord.length; i++) {
                        if (!currentLettersTried.includes(currentWord[i])) {
                            //note the ! so this means there is still a letter than hasn't been guessed yet
                            unguessedLetterExists = true;
                            // alert("at this point, we know the letter " + currentWord[i] + " has not yet been guessed.");
                        }
                    }
                    if (unguessedLetterExists === false) {
                        // alert("now, we know every letter has been guessed.");
                        totalWins++;
                        updateScoreBoard()
                        if ((totalWins+totalLosses)>=10) {
                            alert("You win. The word was " + currentWord + ". Thanks for playing.");
                            finishAll();
                        }
                        alert("You win. The word was " + currentWord + ". Try another word.");
                        finishGame();
                    }
                }
                else {
                    //here, a bad letter was guessed, so time to punish
                    numberOfBadGuesses++;
                    //update image
                    document.getElementById("badLetters").innerHTML = getBadLettersGuessed();
                    changeImageSeq(numberOfBadGuesses);
                    if (numberOfBadGuesses === 7) {
                        //update loss counter notify user what correct word was, wait for user to strart new game
                        totalLosses++;
                        updateScoreBoard();
                        if ((totalWins+totalLosses)>=10) {
                            alert("You lose. The word was " + currentWord + ". Thanks for playing.");
                            finishAll();
                        }
                        alert("You lose. The word was: " + currentWord + ". Try another word.");
                        finishGame();
                    }

                }
            }
        }
    }
}

function startGame(){
    document.getElementById('openingSplash').style.display = "none";
    document.getElementById('topSection').style.display = "inline-block";
}

function changeImageSeq(seqNumber) {
    document.getElementById('gallowsImg').src='assets/images/gallows' + seqNumber + '.jpg';
}

function startNewWord() {
    //instantiate variables for this new word
    //pick the word, but we are out of words to pick, start over.
    if (wordIndexToUse >= possibleWords.length) {
        wordIndexToUse = 0;
    }
    currentWord = possibleWords[wordIndexToUse];
    currentLettersTried = [];
    numberOfBadGuesses = 0;
    //set the stage to the proper image
    changeImageSeq("0");
    //update the word display in the view
    document.getElementById("wordDisplay").innerHTML = getShowableLetters();
    document.getElementById("badLetters").innerHTML = getBadLettersGuessed();
    // alert("game started. The word to guess will be: " + currentWord);

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
    document.getElementById('scoreBoard').innerHTML = scoreText;  
  }

  //this function resets the board for a new word
  function finishGame() {
    wordIndexToUse++;
    startNewWord();
  }

  //this function finishes everything out
  function finishAll() {
      alert("All done! Thanks for playing.");
  }

  //this function returns a string of the correctly guessed letters and dashes for missing letters
  function getShowableLetters() {
    var returnString = "";
    for (var i=0; i<currentWord.length; i++) {
        if (currentLettersTried.includes(currentWord[i])) {
            returnString = returnString + currentWord[i];
        }
        else {
            returnString = returnString + "-";
        }
    }
    return returnString;
  }

  //this functions returns a string of all the incorectly guessed letters with spaces inbetween
  function getBadLettersGuessed() {
      var returnString = "";
      for (var i=0; i<currentLettersTried.length; i++) {
          if (!currentWord.includes(currentLettersTried[i])) {
            //note the !
            returnString = returnString + currentLettersTried[i] + " ";
          }
      }
      return returnString;
  }