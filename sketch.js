/*

@author Winry
@date 2021-12-6

code plan:
    figure out how to work with passages.json, and with json files in general

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

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    textFont(font, 14)

    console.log(Object.keys(passages).length)

    for (let p in passages) {
        console.log(passages[p].ms)
    }

    for (let i = 0; i < Object.keys(passages).length; i++) {
        console.log(passages[i].highlightIndices)
    }
}

function draw() {
    background(234, 34, 24)


}
// prevent the context menu from showing up :3 nya~
document.oncontextmenu = function () {
    return false;
}