/*
* **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

  * Randomly selects a word and uses the `Word` constructor to store it

  * Prompts the user for each guess and keeps track of the user's remaining guesses

*/


const Word = require("./Word")

const words = ["blueberry", "banana", "apple", "kiwi", "pomegranate"]

let selected = Math.floor(Math.random()*6)

let question = new Word(selected)

