/*
* **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

  * Randomly selects a word and uses the `Word` constructor to store it

  * Prompts the user for each guess and keeps track of the user's remaining guesses

*/


const Word = require("./Word");
const chalk = require("chalk")
const inquirer = require("inquirer");
const words = ["blueberry", "banana", "pink lady apple", "golden kiwi", "pomegranate", "dragon fruit", "durian", "mango", "mangosteen"];

let numOfGuesses;
let question;

let game = {
    newGame: () => {
        console.log(`\n${chalk.yellow("++++++++++++++++ NEW GAME ++++++++++++++++")}\n`)
        numOfGuesses = 10;
        let selector = Math.floor(Math.random()*(words.length));
        let word = words[selector];
        question = new Word(word);
        game.playGame();
    },
    playGame: () => {
    inquirer
        .prompt(
        {
          type: "input",
          message: "Please guess a letter",
          name: "userGuess",
        })
        .then(function(res){
            numOfGuesses--;
            const before = question.toString();
            question.match(res.userGuess);
            const after = question.toString();
            console.log(`\n${after}\n`);
            if (before === after) {
                console.log(`${chalk.red("INCORRECT!")}\n`)
            } else {
                console.log(`${chalk.green("CORRECT!")}\n`)
            }
            game.checkSolution();
        })
    },
    checkSolution: () => {
        let solve = question.array.map(el => el.guessed);
        if (solve.includes(false)){
            game.checkGuessesLeft();
        } else {
            console.log(`${chalk.green("You win!!!")}\n------------------------------------------\n`)
            game.newGame();
        }
    },
    checkGuessesLeft: () => {
        if (numOfGuesses === 0){
            console.log(`${chalk.red("You lose!!!")}\n------------------------------------------\n`)
            game.newGame();
        } else {
            console.log(`You have ${numOfGuesses} guesse(s) left.\n------------------------------------------\n`)
            game.playGame();
        }
    }
}

game.newGame();