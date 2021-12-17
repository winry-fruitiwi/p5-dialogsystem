class DialogBox {
    constructor(passages, highlightIndices, msPerPassage) {
        // this is the old hard-coded passage
        this.passage = "So, you've accessed a network station. Well done," +
            " Samus. I have reviewed your vital signs and video log from the" +
            " data you uploaded. My readings indicate" +
            " dramatic physical changes in you. Whatever caused these" +
            " changes seems to have stripped you of most abilities. That" +
            " brings me to your " + "assailant. I am checking the Federation" +
            " database against your" +
            " video log. It appears to have been a Chozo. The attacker's" +
            " identity is not yet clear." +
            " Return to your ship on the surface. "
        // "It appears to have been a Chozo" had "be" instead of "have"!
        // old: "It appears to be been a Chozo"

        // my collection of passages
        this.passages = passages
        // passageIndex keeps track of what passage I'm on
        this.passageIndex = 0
        // this.index is the key ingredient to advancing letters.
        this.index = 0
        this.correctList = []
    }

    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    render() {
        // the margin for all sides
        let margin = 30
        // our current position. since text coordinates start at bottom
        // left, we have to modify the height so that even the largest font
        // won't be clipped at the top.
        let cursor = new p5.Vector(margin, margin + textAscent())

        // our current passage
        let passage = this.passages[this.passageIndex]

        // loop through every letter in our passage
        for (let i = 0; i < this.index; i++) {
            let letter = passage[i]

            // draw the letter
            fill(0, 0, 100)
            text(letter, cursor.x, cursor.y)

            // // if the width of our letter and our x position are greater
            // // than width-margin, we start a new line by modifying the
            // // current cursor we have.
            // if (cursor.x + textWidth(letter) > width - margin) {
            //     cursor.x = margin
            //     cursor.y += textAscent() + textDescent() + 2
            //     continue
            // } old letter wrap

            // more advanced word wrap
            if (letter === " ") {
                let currentDelimiter = i
                let nextDelimiter = passage.indexOf(" ", i+1)
                let nextWord = passage.substring(
                    currentDelimiter,
                    nextDelimiter + 1 // add one to include the space
                )

                if (textWidth(nextWord) + cursor.x >= width-margin) {
                    cursor.x = margin
                    cursor.y += textAscent() + textDescent() + 2
                    continue
                }
            }

            // advance the text
            cursor.x += textWidth(letter)
        }

        if (frameCount % 3 === 0) {
            this.index += 1
            if (this.index > passage.length - 1) {
                this.sleep(1000)
                this.index = 0
                this.passageIndex += 1
                if (this.passageIndex >= this.passages.length) {
                    noLoop()
                }
            }
        }
    }
}