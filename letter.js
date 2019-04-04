class Letter {
    constructor(string) {
        this.string = string
        this.guessed = false
    }
    display(){
        switch (this.string) {
            case " ":
                this.guessed = true;
                return " "
       
            default:
            if (this.guessed){
                return this.string
            } else {
                return "_"
            }
        }
    }
    check(char){
        let character = char.toLowerCase();
        if (character === this.string){
            this.guessed = true
            return this.guessed
        } else {
            return this.guessed
        }
    }
}

module.exports = Letter;