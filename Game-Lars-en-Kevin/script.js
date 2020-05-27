var balletjesSchieter = []; // balletjes van schiet
var doelwitRondje = []; // rondjes van doelwitten
var timerSec = 0; // timer secondes begint op 0
var timerMin = 0; // timer minuten begint op 0
var schieterX = 518; // startpositie schieter
var vertragingTussenDoelwitten = 2000; // tijd tussen de doelwitten aan het begin
var plaatjeAchtergrond = 0; // achtergrondplaatje
const balSchieterDiameter = 16; // diameter van het balletje van de schieter
const balDoelwitDiameter = 26; // diameter van het doelwit balletje 

var schieter = function() {
  fill(0, 153, 255);
  strokeWeight(4);
  rect(schieterX, 694, 83, 24); // blokje onderop
  rect(schieterX + 28, 672, 27, 20); // blokje bovenop
  rect(schieterX + 28, 672, 27, 46); // fix omlijning
}

var tekenBalletjeSchieter = function(balSchieterX, balSchieterY) { // bal van schieter
  strokeWeight(2);
  fill(100);
  ellipse(balSchieterX, balSchieterY, balSchieterDiameter);
}

var tekenRondjeDoelwit = function(rondjeDoelwitX, rondjeDoelwitY) { // doelwit rondje
  fill(255, 255 - rondjeDoelwitY / 2.8235, 0); // kleur doelwit rondje
  strokeWeight(2);
  ellipse(rondjeDoelwitX, rondjeDoelwitY, balDoelwitDiameter); // doelwit rondje
}

function preload() {
  plaatjeAchtergrond = loadImage('Afbeeldingen/plaatjeAchtergrond.jpg'); // achtergrondplaatje laden
}

function updateTimer() {
  timerSec++; // elke seconde de teller van de secondes 1 omhoog

  if (timerSec == 60) {
    timerMin++; // als 60 secondes voorbij zijn, dan 1 minuut erbij
    timerSec = 0; // als 60 secondes voorbij zijn, dan secondes naar 0
  }    
}

function tekenTimer() {
  var extraNulSec = "";
  if (timerSec < 10) {
    extraNulSec = "0"; // 0 erbij al er maar 1 getal staat als seconde
  }

  var timerTekst = timerMin + ":" + extraNulSec + timerSec; // mooier dan in de text()

  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(36);
  text(timerTekst, 996, 40); // de timer tekst
}    

function setup() {
  createCanvas(1080, 720); // afmetingen van de game
  setInterval(updateTimer, 1000); // elke 1000 ms gaat de teller van de secondes 1 omhoog
}

function draw() {
  image(plaatjeAchtergrond, 0, 0); // teken achtergrondplaatje
  
  balletjesSchieter.forEach(function(array) { // balletjes schieter
    tekenBalletjeSchieter(array[0],array[1]); // teken het balletje
    array[1] -= 8;
  });

  doelwitRondje.forEach(function(array) { // rondjes van doelwitten
    tekenRondjeDoelwit(array[0], array[1]); // teken doelwit rondje
    array[1] += 1;
  });  

  schieter(); // tekent de schieter
  
  if (keyIsDown(RIGHT_ARROW) && schieterX < 992) { // rechterpijltje -> schieter naar rechts
    schieterX = schieterX + 6;
  }
  if (keyIsDown(LEFT_ARROW) && schieterX > 4) { // linkerpijltje -> schieter naar links
    schieterX = schieterX - 6;
  }

  var teVerwijderenSchieter; // de plaats in de array van het balletje van de schieter dat verwijderd moet worden
  var teVerwijderenDoelwit; // de plaats in de array van het doelwit dat verwijderd moet worden
  var teVerwijderenSchieterBoven; // de plaats in de array van het balletje van de schieter dat verwijderd moet worden
  balletjesSchieter.forEach(function(balletje, i) { // i = huidige array index van het schieter balletje
    balletjeX = balletje[0];
    balletjeY = balletje[1];
    doelwitRondje.forEach(function(doelwit, i2) { // i = huidige array index van het doelwit balletje
      doelwitX = doelwit[0];
      doelwitY = doelwit[1];
      if(collideCircleCircle(balletjeX, balletjeY, balSchieterDiameter, doelwitX, doelwitY, balDoelwitDiameter)) { // check of de kogel en het balletje elkaar raken
        teVerwijderenSchieter = i; // zet de teVerwijderenSchieter op de index van de balletjes van de schieter
        teVerwijderenDoelwit = i2; // zet de teVerwijderenDoelwit op de index van het geraakte doelwit
      }
      if(balletjeY < 0 - balSchieterDiameter) {
        teVerwijderenSchieterBoven = i; // zet de teVerwijderenSchieterBoven op de index van de balletjes van de schieter
      }   
    })
  })

  if(teVerwijderenSchieter !== undefined) { // als er een balletje is dat verwijderd moet worden; !== betekent is niet gelijk aan
    balletjesSchieter.splice(teVerwijderenSchieter, 1); // verwijder het schieter balletje
  }
  if(teVerwijderenDoelwit !== undefined) { // als er een balletje is dat verwijderd moet worden; !== betekent is niet gelijk aan
    doelwitRondje.splice(teVerwijderenDoelwit, 1); // verwijder het doelwit
  }
  if(teVerwijderenSchieterBoven !== undefined) { // als er een balletje is dat verwijderd moet worden; !== betekent is niet gelijk aan
    balletjesSchieter.splice(teVerwijderenSchieterBoven, 1); // verwijder het schieter balletje
  }

  doelwitRondje.forEach(function(doelwit) {
    doelwitY = doelwit[1];
      if(doelwitY > 720 - balDoelwitDiameter / 2) { // check of het doelwit de onderkant raakt
        fill(255);
        rect(0, 0, 1080, 720);
        fill(255, 0, 0);
        textSize(40);
        text("Game Over!", 400, 300);
      }
  })   
  
  tekenTimer()

  if(timerMin === 0 && timerSec > 20 && timerSec < 40) {
    vertragingTussenDoelwitten = 200;
  }
}  

setInterval(function() { // vertraging tussen doelwitten op scherm
    doelwitRondje.push([random(30, width - 30), 20]);
}, vertragingTussenDoelwitten);

function keyPressed() { // spatiebalk ingedrukt -> balletje komt uit schieter 
    if(keyCode === 32) { // 32 = spatiebalk
        balletjesSchieter.push([schieterX + 40, 662]);
    }
}