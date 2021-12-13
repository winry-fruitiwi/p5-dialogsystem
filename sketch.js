/*

@author Winry
@date 2021-12-6

code plan:
    figure out how to work with passages.json, and with json files in general
    fill in the three lists
    display one-line passage
    letter wrap
    word wrap
    advancing text, single paragraph
    advancing text, multiple paragraphs
    sync perfectly with Adam text
    add dialogue box
    merge Adam's project into this one, creating Metroid Dread experience

    additions:
        things we can tackle right now:
            use this to generalize into other paragraphs with more json
            use this model to do the same for final fantasy paragraphs

        later goals:
            in a couple months, we can model Samus and put her in
            in a year or so, we can come up with equations to create lights
            in at least a year, we can make a one-hour Metroid game
            in at least two years, we can make a real Metroid game

        after becoming a game developer:
            release the next Metroid game
            release new games using Metroid dialog systems
*/

let font
let passages // our json file input

function preload() {
    font = loadFont('data/notjustgroovy.ttf')
    passages = loadJSON("passages.json")

}

/* populate an array of passage text */
let textList = []
/* grab other information: ms spent on each passage, highlights */
let highlightList = [] // a list of tuples specifying highlights and indexes
let msPerPassage = [] // how long to wait before advancing a passage
let dialogBox

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    textFont(font, 14)

    console.log(Object.keys(passages).length)

    for (let i = 0; i < Object.keys(passages).length; i++) {
        textList.push(passages[i].text)
        highlightList.push(passages[i].highlightIndices)
        msPerPassage.push(passages[i].ms)
    }

    console.log(textList)
    console.log(highlightList)
    console.log(msPerPassage)

    dialogBox = new DialogBox(passages, highlightList, msPerPassage)
}

function draw() {
    background(234, 34, 24)

    // text("Not just groovy!", width/2, height/2) // just seeing the font :)
    // render the dialog
    dialogBox.render()
}

// prevent the context menu from showing up :3 nya~
document.oncontextmenu = function () {
    return false;
}
