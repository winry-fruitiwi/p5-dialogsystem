/*

@author Winry
@date 2021-12-6

code plan:
    figure out how to work with passages.json, and with json files in general
    fill in the three lists
    display one-line passage
    TODO make letter wrap tomorrow, as of 12/9/2021

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

    for (let p in passages) {
        console.log(passages[p].ms)
    }

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
