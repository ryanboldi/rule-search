const WIDTH = 700,
     HEIGHT = 700;

var g;
var c;

function setup(){
    createCanvas(WIDTH, HEIGHT);
    g = new Grid(100, 100, true, 0.05);
    c = new Cell();
}

function draw(){
    frameRate(120);
    background(220);
    g.draw(7, 0, 0);
    g.updateGrid(conwayRules);
}