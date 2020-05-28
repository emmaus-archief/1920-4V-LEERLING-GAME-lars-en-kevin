const BeginScherm = 1;
const Uitleg = 2;
const Game = 3;
const EindScherm = 4;
var SpelStatus = Spelen;

var balletjesSchieter = []; // balletjes van schiet
var doelwitRondje = []; // rondjes van doelwitten
var timerSec = 0; // timer secondes begint op 0
var timerMin = 0; // timer minuten begint op 0
var totaalSec = 0; // totaal aantal secondes, wordt niet gereset na een minuut
var schieterX = 518; // startpositie schieter
var doelwitSnelheid = 1; // hoe snel de doelwit balletjes vallen aan het begin
var plaatjeAchtergrond = 0; // achtergrondplaatje
const tekstGrootteTekstGame = 36; // grootte van de tekst in de game
const hoogteTekstGame = 40; // hoogte van de tekst in de game
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
  ellipse(balSchieterX, balSchieterY, balSchieterDiameter); // afmetingen balletje van de schieter
}

var doelwitBalletjeErbij = function() { // als deze functie wordt uitgevoerd spawnt er een nieuw doelwit balletje
  var fase = Math.floor(totaalSec / 20) + 1; // bepaalt de fase waarin je zit, begint bij 1 en elke 20 seconde kom je in de volgende ronde; Math.floor komt altijd af naar beneden
  var faseNummer = fase % 3; // de deelrest van de fase; % betekent: 14 / 3 = 4, en dan de rest is 2 en dat komt 2 uit deze var
  var interval;
  if(faseNummer === 1) {
    interval = 2000; // in de eerste fase is de interval 2000ms
  } else if(faseNummer === 2) {
    interval = 1500; // in de tweede fase is de interval 1500ms
  } else if(faseNummer === 0) {
    interval = 1000; // in de derde fase is de interval 1000ms
  }

  setTimeout(doelwitBalletjeErbij, interval); // als je het interval wilt veranderen moet je setTimeout gebruiken, setInterval werkt niet
  doelwitSnelheid = Math.floor((fase - 1) / 3) / 2 + 1; // de snelheid wordt elke 3 fases 0.5 hoger
  if(fase === 0) {
    doelwitSnelheid = 1; // de bovenstaande code werkt niet voor 0 (dan wordt de snelheid 0.5 en het moet 1 zijn)
  }
  doelwitRondje.push([random(30, width - 30), 20, doelwitSnelheid]);
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
  totaalSec++; // elke seconde gaat de totale hoeveelheid secondes met 1 omhoog

  if (timerSec === 60) {
    timerMin++; // als 60 secondes voorbij zijn, dan 1 minuut erbij
    timerSec = 0; // als 60 secondes voorbij zijn, dan secondes naar 0
  }    
}

function tekenTimer() {  
  var extraNulMin = "";
  var extraNulSec = "";
  if (timerMin < 10) {
    extraNulMin = 0; // 0 erbij al er maar 1 getal staat als minuut
  }  
  if (timerSec < 10) {
    extraNulSec = 0; // 0 erbij al er maar 1 getal staat als seconde
  }

  var timerTekst = extraNulMin + timerMin + ":" + extraNulSec + timerSec; // dit staat mooier dan in de string van text()

  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(tekstGrootteTekstGame);
  text(timerTekst, 988, hoogteTekstGame); // de timer tekst
}    

function setup() {
  createCanvas(1080, 720); // afmetingen van de game
  setInterval(updateTimer, 1000); // elke 1000 ms gaat de teller van de secondes 1 omhoog
  doelwitBalletjeErbij(); // teken het eerste balletje (daarna herhaalt deze functie zichzelf afhankelijk van de interval)
}

function draw() {
    
  image(plaatjeAchtergrond, 0, 0); // teken achtergrondplaatje
  
  balletjesSchieter.forEach(function(array) { // balletjes schieter
    tekenBalletjeSchieter(array[0],array[1]); // teken het balletje
    array[1] -= 8;
  });

  doelwitRondje.forEach(function(array) { // rondjes van doelwitten
    tekenRondjeDoelwit(array[0], array[1]); // teken doelwit rondje
    array[1] += array[2];
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

  var fase = Math.floor(totaalSec / 20) + 1; // bepaalt de fase waarin je zit, begint bij 1 en elke 20 seconde kom je in de volgende ronde; Math.floor komt altijd af naar beneden
  var faseNummer = fase % 3; // de deelrest van de fase; % betekent: 14 / 3 = 4, en dan de rest is 2 en dat komt 2 uit deze var

  rondeTekst = Math.floor(totaalSec / 60) + 1;

  if(faseNummer === 1) {
    faseTekst = 1;
  }
  if(faseNummer === 2) {
    faseTekst = 2;  
  }
  if(faseNummer === 0) {
    faseTekst = 3;
  }

  push(); // werkt samen met pop, zodat alle tekstattributes niet voor de hele code gelden
  fill(255);
  textSize(tekstGrootteTekstGame);
  strokeWeight(2);
  text("Ronde: " + rondeTekst + " Fase: " + faseTekst, 14, hoogteTekstGame);
  pop(); // werkt samen met push, zodat alle tekstattributes niet voor de hele code gelden

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
}
function keyPressed() { // spatiebalk ingedrukt -> balletje komt uit schieter 
    if(keyCode === 32) { // 32 = spatiebalk
        balletjesSchieter.push([schieterX + 40, 662]);
    }
}