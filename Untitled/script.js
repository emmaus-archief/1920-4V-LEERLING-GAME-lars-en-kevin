const posXtekstEindeScherm = 460;
const posYtekstEindeScherm = 268;
const posXknoppenEindscherm = 142;
const posYknoppenEindscherm = 490;
const afstandTussenKnoppenEindscherm = 440;

var rondeTekst = 30;
var faseTekst = 30;
var timerMin = 9;
var timerSec = 45;

var eindSchermTitel = function() {
  fill(222, 6, 42);
  textFont('Georgia');
  textSize(120);
  stroke(0);
  strokeWeight(4);
  text("Game Over!", 226, 132); // tekst titel
}

var scores = function() {
  fill(255);
  textFont('Helvetica'); 
  textSize(24);
  stroke(0);
  strokeWeight(4);
  text("Behaald: ", posXtekstEindeScherm - 120, posYtekstEindeScherm)
  text("- Ronde: " + rondeTekst, posXtekstEindeScherm, posYtekstEindeScherm);
  text("- Fase: " + faseTekst, posXtekstEindeScherm, posYtekstEindeScherm + 50);
  text("- Tijd: " + timerMin + ":" + timerSec + " minuten", posXtekstEindeScherm, posYtekstEindeScherm + 100);
}    

var knopEindschermLinks = function() {
  if (mouseX > posXknoppenEindscherm + 7 && mouseX < posXknoppenEindscherm + 347 && mouseY > posYknoppenEindscherm + 6 && mouseY < posYknoppenEindscherm + 78) {
    fill(114, 212, 252);
    strokeWeight(8);
  } else {
    fill(180, 180, 200);
    strokeWeight(6);
  }
  stroke(0);
  rect(posXknoppenEindscherm + 6, posYknoppenEindscherm + 6, 344, 74); // achtergrond rechthoek
  
  fill(100);
  textFont('Helvetica'); // lettertype
  textSize(30);
  if (mouseX > posXknoppenEindscherm + 7 && mouseX < posXknoppenEindscherm + 347 && mouseY > posYknoppenEindscherm + 6 && mouseY < posYknoppenEindscherm + 78) {
    strokeWeight(4);
    fill(255);
  } else {
    noStroke();  
  }
  text("Naar beginscherm", posXknoppenEindscherm + 56, posYknoppenEindscherm + 52); // tekst "Naar Beginscherm"
}

var knopEindschermRechts = function() {
  if (mouseX > posXknoppenEindscherm + 7 + afstandTussenKnoppenEindscherm && mouseX < posXknoppenEindscherm + 347 + afstandTussenKnoppenEindscherm && mouseY > posYknoppenEindscherm + 6 && mouseY < posYknoppenEindscherm + 78) {
    fill(114, 212, 252);
    strokeWeight(8);
  } else {
    fill(180, 180, 200);
    strokeWeight(6);
  }
  stroke(0); 
  rect(posXknoppenEindscherm + 6 + afstandTussenKnoppenEindscherm, posYknoppenEindscherm + 6, 344, 74); // achtergrond rechthoek
  
  fill(100);
  textFont('Helvetica'); // lettertype
  textSize(30);
  if (mouseX > posXknoppenEindscherm + 7 + afstandTussenKnoppenEindscherm && mouseX < posXknoppenEindscherm + 347 + afstandTussenKnoppenEindscherm && mouseY > posYknoppenEindscherm + 6 && mouseY < posYknoppenEindscherm + 78) {
    strokeWeight(4);
    fill(255);
  } else {
    noStroke();  
  }
  text("Opnieuw spelen", posXknoppenEindscherm + 72 + afstandTussenKnoppenEindscherm, posYknoppenEindscherm + 52); // tekst "Opnieuw spelen"
}

function preload() {
    achter = loadImage('white3.jpg');
}

function setup() {
    createCanvas(1080, 720);
    rect(0,0,1080,720);
}


function draw() {
    image(achter, 0, 0);

    eindSchermTitel();
    scores();
    knopEindschermLinks();
    knopEindschermRechts();
}