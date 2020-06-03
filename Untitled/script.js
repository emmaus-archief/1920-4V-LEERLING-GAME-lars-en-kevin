
function preload() {
    plaatjeAchtergond = loadImage("space-background.jpg");
}


function setup() {
    createCanvas(1080, 720);
}

function draw() {
    image(plaatjeAchtergond, 0, 0);
}