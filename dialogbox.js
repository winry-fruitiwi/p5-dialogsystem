class DialogBox {
    constructor(passages, highlightIndices, msPerPassage) {
        this.passage = "You are violating the notjustgroovy rule. #adamVoice"
        this.index = 0
        this.correctList = []
    }

    render() {
        // the margin for all sides
        let margin = 30
        // our current position. since text coordinates start at bottom
        // left, we have to modify the height so that even the largest font
        // won't be clipped.
        let cursor = new p5.Vector(margin, margin + textAscent())

        // loop through every letter in our passage
        for (let i = 0; i < this.passage.length; i++) {
            let letter = this.passage[i]

            // draw the letter
            fill(0, 0, 100)
            text(letter, cursor.x, cursor.y)


            // advance the text
            cursor.x += textWidth(letter)
        }
    }
}