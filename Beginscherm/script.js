const posXbediening = 416;
const posYbediening = 440;

var beginScherm = function() {
  
  fill(222, 6, 42);
  textFont('Georgia');
  textSize(104);
  text("Shooter!", 342, 132); // tekst titel
  
  fill("black");
  noStroke();
  rect(356, 240, 356, 6); // bovenkant rechthoek
  rect(356, 320, 356, 6); // onderkant rechthoek
  rect(356, 240, 6, 86); // linkerkant rechthoek
  rect(706, 240, 6, 86); // rechterkant rechthoek
  fill(180, 180, 200); 
  rect(362, 246, 344, 74); // achtergrond rechthoek
  
  fill(100);
  textFont('Helvetica'); // lettertype
  textSize(30);
  text("Game Spelen", 444, 292); // tekst "Game Spelen"
  
  fill(200);
  textFont('Helvetica'); // lettertype
  textSize(20);
  text("Door Kevin en Lars", 444, 660); // tekst makers
}

var muisRechthoekEnSwitchGame = function() {
  if (mouseX > 360 && mouseX < 706 && mouseY > 246 && mouseY < 320) {
    fill(114, 212, 252);
    rect(362, 246, 344, 74); // achtergrond rechthoek
    fill(255);
    textFont('Helvetica'); // lettertype
    textSize(30);
    text("Game Spelen", 444, 292); // tekst Game Spelen
    
    if (mouseIsPressed) {
      fill(255);
      rect(0, 0, 1080, 720);
    }  
  }
}

var bediening = function() {  
  image(pijlLinks, posXbediening - 32, posYbediening - 22); // plaatje linker pijltje
  image(pijlRechts, posXbediening - 33, posYbediening + 28); // plaatje rechter pijltje
  image(spatiebalk, posXbediening - 34, posYbediening + 78); // plaatje spatiebalk

  fill(255);
  textFont('Helvetica'); // lettertype
  strokeWeight(4);
  stroke(0);
  textSize(24);
  text("is de schieter naar links", posXbediening, posYbediening); // tekst linker pijltje
  text("is de schieter naar rechts", posXbediening, posYbediening + 50); // tekst rechter pijltje
  text("is een balletje schieten", posXbediening + 16, posYbediening + 100); // tekst spatiebalk
}

function preload() {
  pijlLinks = loadImage('pijlLinks.jpg'); // plaatje linker pijltje laden
  pijlRechts = loadImage('pijlRechts.jpg'); // plaatje rechter pijltje laden
  spatiebalk = loadImage('spatiebalk.jpg'); // plaatje spatiebalk laden
}

function setup() {
  createCanvas(1080, 720);
  background("white");
  rect(0, 0, 1080, 720);
}


function draw() {
  beginScherm();
  bediening();
  muisRechthoekEnSwitchGame();
}