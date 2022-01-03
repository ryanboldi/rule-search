const WIDTH = 700,
     HEIGHT = 700;

var g;



function setup(){
    createCanvas(WIDTH, HEIGHT);
    g = new Grid(10, 10);
}

function draw(){
    background(220);
    g.draw(70, 0, 0);
}