/*

@author Winry
@date 2021-12-6

code plan:
   .figure out how to work with passages.json, and with json files in general
   .fill in the three lists
   .display one-line passage (don't save coordinates)
   .letter wrap
   .word wrap
        if letter = space, check delimiters: this index and the next space.
        if the length of the word between the delimiters > margin - width:
        add to y and reset x, then continue.
   .advancing text, single paragraph
        every frame, advance this.index by 1 and constrain it to passage length.
        only go up to this index while looping through.
        Less efficient option: do everything but draw if i > this.index
    advancing text, multiple paragraphs
        just use passages input and set the current passage
    add highlight index functionality
    sync perfectly with Adam dialog
    add dialogue box
    merge Adam's project into this one, creating Metroid Dread experience

    additions:
        things we can tackle right now:
            use this to generalize into other paragraphs with more json
            use this model to do the same for final fantasy paragraphs

        later goals:
            in a couple of months, we can model Samus and put her inside
            in a year or so, we can come up with equations to create lights
            in at least a year, we can make a one-hour Metroid game
            in at least two years, we can make a real Metroid game

        after becoming a game dev:
            release the next Metroid game
            release new games using Metroid dialog systems
*/

let font, textFrame
let passages // our json file input

function preload() {
    font = loadFont('data/notjustgroovy.ttf')
    passages = loadJSON("passages.json")
    textFrame = loadImage('data/textFrame.png')
}

/* populate an array of passage text */
let textList = []
/* grab other information: ms spent on each passage, highlights */
let highlightList = [] // a list of tuples specifying highlights and indexes
let msPerPassage = [] // how long to wait before advancing a passage
let dialogBox, cam

function setup() {
    createCanvas(640, 360, WEBGL)
    colorMode(HSB, 360, 100, 100, 100)
    textFont(font, 14)
    cam = new Dw.EasyCam(this._renderer, {distance: 240});


    for (let i = 0; i < Object.keys(passages).length; i++) {
        textList.push(passages[i].text)
        highlightList.push(passages[i].highlightIndices)
        msPerPassage.push(passages[i].ms)
    }


    // console.log(textList)
    // console.log(highlightList)
    // console.log(msPerPassage)

    dialogBox = new DialogBox(textList, highlightList, textFrame)
}

const SATURATION = 100
const P_BRIGHTNESS = 100
const N_BRIGHTNESS = 40

// draws a set of axes similar to those in Blender
function drawBlenderAxes() {
    // x-axis
    stroke(0, SATURATION, P_BRIGHTNESS)
    line(0, 0, 4000, 0)

    stroke(0, SATURATION, N_BRIGHTNESS)
    line(-4000, 0, 0, 0)

    // y-axis (Webstorm has the values inverted!)
    stroke(120, SATURATION, P_BRIGHTNESS)
    line(0, 0, 0, 4000)

    stroke(120, SATURATION, N_BRIGHTNESS)
    line(0, -4000, 0, 0)

    // z-axis
    stroke(240, SATURATION, P_BRIGHTNESS)
    line(0, 0, 0, 0, 0, 4000)

    stroke(240, SATURATION, N_BRIGHTNESS)
    line(0, 0, -4000, 0, 0, 0)
}

function draw() {
    background(234, 34, 24)

    drawBlenderAxes()

    // text("Not just groovy!", width/2, height/2) // just seeing the font :)
    // render the dialog
    dialogBox.render()
}

// prevent the context menu from showing up :3 nya~
document.oncontextmenu = function () {
    return false;
}
