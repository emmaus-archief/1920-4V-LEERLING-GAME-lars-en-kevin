const posXrechthoek = 362;
const posYrechthoek = 246;
const posXbediening = 382;
const posYbediening = 448;
const posXtekstZijkant = 60;
const posYtekstZijkant = 300;

var beginScherm = function() {
  
  fill(222, 6, 42);
  textFont('Georgia');
  textSize(120);
  stroke(0);
  strokeWeight(4);
  text("Shooter!", 314, 132); // tekst titel


  if (mouseX > posXrechthoek && mouseX < posXrechthoek + 344 && mouseY > posYrechthoek && mouseY < posYrechthoek + 74) {
    fill(114, 212, 252);
    strokeWeight(8);
  } else {
    fill(180, 180, 200);
    strokeWeight(6);
  }

  stroke(0); 
  rect(posXrechthoek, posYrechthoek, 344, 74); // rechthoek beginscherm

  textFont('Helvetica');  
  textSize(30);
  if (mouseX > posXrechthoek && mouseX < posXrechthoek + 344 && mouseY > posYrechthoek && mouseY < posYrechthoek + 74) {
    fill(255);
    stroke(0);
    strokeWeight(4);  
  } else {
    noStroke();  
    fill(100); 
  }
  text("Game Spelen", posXrechthoek + 78, posYrechthoek + 46); // tekst "Game Spelen"


  fill(200);
  textFont('Helvetica'); // lettertype
  textSize(20);
  noStroke();
  text("Door Kevin en Lars", 444, 660); // tekst makers
}

/* var muisRechthoekEnSwitchGame = function() {
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
} */

/*var tekstenZijkanten = function() {
    fill(6, 120, 194);
    stroke()
    textSize(20);
    text("Zorg dat de balletjes de grond niet raken door ze uit de lucht te schieten!", posXtekstZijkant, posYtekstZijkant);
    text("Een ronde duurt 1 minuut en bestaat uit 3 fases van 20 seconden. Elke ronde vallen de balletjes sneller! Hoe hoger de fase, hoe meer balletjes er vallen!", posXtekstZijkant + 600, posYtekstZijkant);
}*/

var bediening = function() {  
  image(pijlLinks, posXbediening - 32, posYbediening - 22); // plaatje linker pijltje
  image(pijlRechts, posXbediening - 33, posYbediening + 28); // plaatje rechter pijltje
  image(spatiebalk, posXbediening - 34, posYbediening + 78); // plaatje spatiebalk

  fill(255);
  textFont('Helvetica'); // lettertype
  strokeWeight(4);
  stroke(0);
  textSize(24);
  text("verplaatst de schieter naar links", posXbediening, posYbediening); // tekst linker pijltje
  text("verplaatst de schieter naar rechts", posXbediening, posYbediening + 50); // tekst rechter pijltje
  text("schiet een kogel", posXbediening + 16, posYbediening + 100); // tekst spatiebalk
}

function preload() {
  achter = loadImage('white3.jpg');
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
  image(achter, 0, 0);  
  beginScherm();
  tekstenZijkanten();
  bediening();
  //muisRechthoekEnSwitchGame();
}