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