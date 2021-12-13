class DialogBox {
    constructor(passages, highlightIndices, msPerPassage) {
        this.passage = "So, you've accessed a network station. Well done," +
            " Samus. I have reviewed your vital signs and video log from the" +
            " data you uploaded. My readings indicate" +
            " dramatic physical changes in you. Whatever caused these" +
            " changes seems to have stripped you of most abilities. That" +
            " brings me to your " + "assailant. I am checking the Federation" +
            " database against your" +
            " video log. It appears to be been a Chozo. The attacker's" +
            " identity is not yet clear." +
            " Return to your ship on the surface."
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

            // if the width of our letter and our x position are greater
            // than width-margin, we start a new line by modifying the
            // current cursor we have.
            if (cursor.x + textWidth(letter) > width - margin) {
                cursor.x = margin
                cursor.y += textAscent() + textDescent() + 2
                continue
            }

            // advance the text
            cursor.x += textWidth(letter)
        }
    }
}