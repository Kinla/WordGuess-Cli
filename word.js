/*

* **Word.js**: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

  * An array of `new` Letter objects representing the letters of the underlying word

  * A function that returns a string representing the word. This should call the function on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together.

  * A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in `Letter.js`)


*/

const Letter = require("./Letter")

class Word {
    constructor (input) {
        this.array = input.split("").map(el => new Letter(el))
    }
    toString(){
        this.string = this.array.map(ltr => ltr.display()).join(" ")
        return this.string
    }
    match(char){        
        this.array.forEach(ltr => {
            ltr.check(char)
        });
    }
}

module.exports = Word