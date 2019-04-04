const Word = require("./Word");
const chalk = require("chalk")
const inquirer = require("inquirer");
const words = ["blueberry", "banana", "pink lady apple", "golden kiwi", "pomegranate", "dragon fruit", "durian", "mango", "mangosteen"];

let numOfGuesses;
let question;
let guessed;
let win = 0;
let lose = 0;

const game = {
    newGame: () => {
        game.checkGameEnd();
        console.log(`\n${chalk.yellow("++++++++++++++++ NEW GAME ++++++++++++++++")}\n`);
        numOfGuesses = 10;
        let selector = Math.floor(Math.random()*(words.length));
        let word = words[selector];
        words.splice(selector, 1);
        guessed = "";
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
            game.checkAlphabet(res.userGuess.toLowerCase());
        });
    },
    checkAlphabet: (guess) =>{
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        const alphabetArray = alphabet.split("");
        if (alphabetArray.includes(guess)){
            game.checkGuessed(guess);
        } else {
            console.log(`${chalk.gray("Please enter a letter in the alphabet.")}\n`);
            game.playGame();
        };
    },
    checkGuessed: (guess) => {
        if (guessed.includes(guess)){
            console.log(`${chalk.gray("You have already guessed this letter before.")}\n`);
            game.playGame();
        } else {
            guessed+=guess;
            game.checkMatch(guess);
            game.checkSolution();
        };
    },
    checkMatch: (guess) =>{
        const before = question.toString();
        question.match(guess);
        const after = question.toString();
        console.log(`\n${after}\n`);
        if (before === after) {
            numOfGuesses--;
            console.log(`${chalk.red("INCORRECT!")}\n`);
        } else {
            console.log(`${chalk.green("CORRECT!")}\n`);
        };
    },
    checkSolution: () => {
        let solve = question.array.map(el => el.guessed);
        if (solve.includes(false)){
            game.checkGuessesLeft();
        } else {
            win++;
            console.log(`${chalk.green("You win!!!")}\n\nWin(s): ${win}    Loss(es): ${lose}\n------------------------------------------\n`);
            game.newGame();
        };
    },
    checkGuessesLeft: () => {
        if (numOfGuesses === 0){
            lose++;
            console.log(`${chalk.red("You lose!!!")}\n\nWin(s): ${win}    Loss(es): ${lose}\n------------------------------------------\n`);
            game.newGame();
        } else {
            console.log(`You have ${numOfGuesses} guesse(s) left.\n------------------------------------------\n`);
            game.playGame();
        };
    },
    checkGameEnd: () => {
        if(words.length === 0){
            console.log(`${chalk.yellow("You have finished the game")}\n`);
            process.exit();
        };
    }
};

game.newGame();