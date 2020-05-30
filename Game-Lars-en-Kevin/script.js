// spelfases
const BEGINSCHERM = 0;
const UITLEG = 1;
const SPELEN = 2;
const GAMEOVER = 3;
var spelStatus = BEGINSCHERM;

// constanten van het beginscherm
const posXrechthoekBeginscherm = 362;
const posYrechthoekBeginscherm = 246;
const posXbedieningBeginscherm = 382;
const posYbedieningBeginscherm = 448;
const posXtekstZijkantBeginscherm = 60;
const posYtekstZijkantBeginscherm = 300;

// array's van kogeltjes en doelwitten
var balletjesSchieter = []; // balletjes van schiet
var doelwitRondje = []; // rondjes van doelwitten

// timer
var timerSec = 0; // timer secondes begint op 0
var timerMin = 0; // timer minuten begint op 0
var totaalSec = 0; // totaal aantal secondes, wordt niet gereset na een minuut
var timerMinStr = "";
var timerSecStr = "";

// schieter
var schieterX = 518; // startpositie schieter
var schieterY = 672; // Y-positie schieter

// fases in de game
var fase = 1;
var faseNummer = 0;
var faseTekst = "";
var rondeTekst = Math.floor(totaalSec / 60) + 1;

// doelwitsnelheid begin
var doelwitSnelheid = 1; // hoe snel de doelwit balletjes vallen aan het begin

// diameter van de doelwitten en de kogels
const balSchieterDiameter = 16; // diameter van het balletje van de schieter
const balDoelwitDiameter = 26; // diameter van het doelwit balletje

// layout game (tekst grootte, etc.)
const tekstGrootteTekstGame = 36; // grootte van de tekst in de game
const hoogteTekstGame = 40; // hoogte van de tekst in de game

// constanten van het eindscherm
const posXtekstEindeScherm = 460;
const posYtekstEindeScherm = 268;
const posXknoppenEindscherm = 142;
const posYknoppenEindscherm = 490;
const afstandTussenKnoppenEindscherm = 440;

// VARIABELES MET FUNCTIES VAN HET BEGINSCHERM

var titelKnopEnNamenBeginScherm = function() {

  fill(222, 6, 42);
  textFont('Georgia');
  textSize(120);
  stroke(0);
  strokeWeight(4);
  text("Shooter!", 314, 132); // tekst titel


  if (mouseX > posXrechthoekBeginscherm && mouseX < posXrechthoekBeginscherm + 344 && mouseY > posYrechthoekBeginscherm && mouseY < posYrechthoekBeginscherm + 74) {
    fill(114, 212, 252);
    strokeWeight(8);
  } else {
    fill(180, 180, 200);
    strokeWeight(6);
  }

  stroke(0);
  rect(posXrechthoekBeginscherm, posYrechthoekBeginscherm, 344, 74); // rechthoek beginscherm

  textFont('Helvetica');
  textSize(30);
  if (mouseX > posXrechthoekBeginscherm && mouseX < posXrechthoekBeginscherm + 344 && mouseY > posYrechthoekBeginscherm && mouseY < posYrechthoekBeginscherm + 74) {
    fill(255);
    stroke(0);
    strokeWeight(4);
  } else {
    noStroke();
    fill(100);
  }
  text("Game Spelen", posXrechthoekBeginscherm + 78, posYrechthoekBeginscherm + 46); // tekst "Game Spelen"


  fill(200);
  textFont('Helvetica'); // lettertype
  textSize(20);
  noStroke();
  text("Door Kevin en Lars", 444, 660); // tekst makers
}

var tekstenZijkantenBeginscherm = function() {
    fill(6, 120, 194);
    noStroke();
    textSize(20);
    text("Zorg dat de balletjes de grond niet\nraken door ze uit de lucht te schieten!\nHet wordt steeds moeilijker, door meer en snellere balletjes!", posXtekstZijkantBeginscherm, posYtekstZijkantBeginscherm);
}

var bedieningBeginscherm = function() {
  image(pijlLinks, posXbedieningBeginscherm - 32, posYbedieningBeginscherm - 22); // plaatje linker pijltje
  image(pijlRechts, posXbedieningBeginscherm - 33, posYbedieningBeginscherm + 28); // plaatje rechter pijltje
  image(spatiebalk, posXbedieningBeginscherm - 34, posYbedieningBeginscherm + 78); // plaatje spatiebalk

  fill(255);
  textFont('Helvetica'); // lettertype
  strokeWeight(4);
  stroke(0);
  textSize(24);
  text("verplaatst de schieter naar links", posXbedieningBeginscherm, posYbedieningBeginscherm); // tekst linker pijltje
  text("verplaatst de schieter naar rechts", posXbedieningBeginscherm, posYbedieningBeginscherm + 50); // tekst rechter pijltje
  text("schiet een kogel", posXbedieningBeginscherm + 16, posYbedieningBeginscherm + 100); // tekst spatiebalk
}

// VARIABELES MET FUNCTIES VAN DE UITLEG

var tekenUitleg = function() {
    image(plaatjeAchtergrondBeginEindUitleg, 0, 0);
}

// VARIABELES MET FUNCTIES VAN DE GAME

var tekenSchieter = function() { // variabele voor het tekenen van de schieter
  fill(0, 153, 255);
  strokeWeight(4);
  rect(schieterX, schieterY + 22, 83, 24); // blokje onderop
  rect(schieterX + 28, schieterY, 27, 20); // blokje bovenop
  rect(schieterX + 28, schieterY, 27, 46); // fix omlijning
}

var tekenBalletjeSchieter = function(balSchieterX, balSchieterY) { // variabele voor het tekenen van het balletje van de schieter
  strokeWeight(2);
  fill(100);
  ellipse(balSchieterX, balSchieterY, balSchieterDiameter); // afmetingen balletje van de schieter
}

var doelwitBalletjeErbij = function() { // variabele, zodat er een nieuw doelwit verschijnt
  fase = Math.floor(totaalSec / 20) + 1; // bepaalt de fase waarin je zit, begint bij 1 en elke 20 seconde kom je in de volgende ronde; Math.floor komt altijd af naar beneden
  faseNummer = fase % 3; // de deelrest van de fase; % betekent: 14 / 3 = 4, en dan de rest is 2 en dat komt 2 uit deze var
  var interval; // variabele voor de interval, anders is de interval 'not defined'
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
  if(spelStatus === SPELEN) {
    doelwitRondje.push([random(30, width - 30), 20, doelwitSnelheid]); // stopt een nieuw doelwit in de array
  }
}

var tekenRondjeDoelwit = function(rondjeDoelwitX, rondjeDoelwitY) { // variabele van het doelwit tekenen
  fill(255, 255 - rondjeDoelwitY / 2.8235, 0); // kleur doelwit rondje
  strokeWeight(2);
  ellipse(rondjeDoelwitX, rondjeDoelwitY, balDoelwitDiameter); // doelwit rondje
}

var doelwittenEnKogelsVerdwijnen = function() { // variabale van het verdwijnen van doelwitten en/of kogels als dat moet
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
}

var tekenFaseTekst = function() {

  if(faseNummer === 1) {
    faseTekst = "1";
  } else if(faseNummer === 2) {
    faseTekst = "2";
  } else if(faseNummer === 0) {
    faseTekst = "3";
  }

  push(); // werkt samen met pop, zodat alle tekstattributes niet voor de hele code gelden
  fill(255);
  textSize(tekstGrootteTekstGame);
  strokeWeight(2);
  text("Ronde: " + rondeTekst + " Fase: " + faseTekst, 14, hoogteTekstGame);
  pop(); // werkt samen met push, zodat alle tekstattributes niet voor de hele code gelden
}

var updateTimer = function() {
  if(spelStatus === SPELEN) {
    timerSec++; // elke seconde de teller van de secondes 1 omhoog
    totaalSec++; // elke seconde gaat de totale hoeveelheid secondes met 1 omhoog

    if (timerSec === 60) {
      timerMin++; // als 60 secondes voorbij zijn, dan 1 minuut erbij
      timerSec = 0; // als 60 secondes voorbij zijn, dan secondes naar 0
    }
  }
}

var tekenTimer = function() {
  timerMinStr = timerMin + "";
  if(timerMinStr.length < 2) timerMinStr = "0" + timerMinStr;
  timerSecStr = timerSec + "";
  if(timerSecStr.length < 2) timerSecStr = "0" + timerSecStr;

  var timerTekst = timerMinStr + ":" + timerSecStr; // dit staat mooier dan in de string van text()

  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(tekstGrootteTekstGame);
  text(timerTekst, 976, hoogteTekstGame); // de timer tekst
}

var checkGameOver = function() {
  var gameOver = false;
  doelwitRondje.forEach(function(doelwit) {
    doelwitY = doelwit[1];
    if(doelwitY > 720 - balDoelwitDiameter / 2) { // check of het doelwit de onderkant raakt
      gameOver = true;
    }
  })
  return gameOver;
}

var resetGame = function() {
  timerSec = 0; // timer secondes begint weer op 0
  timerMin = 0; // timer minuten begint weer op 0
  totaalSec = 0; // timer totaal begint weer op 0
  balletjesSchieter = [];
  doelwitRondje = [];
  fase = 1;
  faseNummer = 1;
  doelwitSnelheid = 1;
}

// VARIABELES MET FUNCTIES VAN EINDSCHERM

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
  text("- Tijd: " + timerMinStr + ":" + timerSecStr + " minuten", posXtekstEindeScherm, posYtekstEindeScherm + 100);
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

// BEGIN VAN DE FUNCTIES


var plaatjeAchtergrondGame;
var plaatjeAchtergrondBeginEindUitleg;
function preload() {
  pijlLinks = loadImage('Afbeeldingen/pijlLinks.jpg'); // plaatje linker pijltje laden
  pijlRechts = loadImage('Afbeeldingen/pijlRechts.jpg'); // plaatje rechter pijltje laden
  spatiebalk = loadImage('Afbeeldingen/spatiebalk.jpg'); // plaatje spatiebalk laden
  plaatjeAchtergrondGame = loadImage('Afbeeldingen/plaatjeAchtergrondWereld.jpg'); // achtergrondplaatje laden
  plaatjeAchtergrondBeginEindUitleg = loadImage('Afbeeldingen/plaatjeAchtergrondWit.jpg'); // achtergrondplaatje laden
}

function setup() {
  createCanvas(1080, 720); // afmetingen van de game
  setInterval(updateTimer, 1000); // elke 1000 ms gaat de teller van de secondes 1 omhoog
  doelwitBalletjeErbij();
}

function draw() {
  switch (spelStatus) {
    case BEGINSCHERM:
      image(plaatjeAchtergrondBeginEindUitleg, 0, 0);
      titelKnopEnNamenBeginScherm();
      tekstenZijkantenBeginscherm();
      bedieningBeginscherm();

      break;
    case UITLEG:

      break;
    case SPELEN:
      image(plaatjeAchtergrondGame, 0, 0); // teken achtergrondplaatje

      balletjesSchieter.forEach(function(array) { // balletjes schieter
        tekenBalletjeSchieter(array[0],array[1]); // teken het balletje
        array[1] -= 8; // zorgt ervoor dat het balletje van de schieter omhoog beweegt
      });

      doelwitRondje.forEach(function(array) { // rondjes van doelwitten
        tekenRondjeDoelwit(array[0], array[1]); // teken doelwit rondje
        array[1] += array[2]; // array[1] = Y-positie doelwit; array[2] = balsnelheid
      });

      tekenSchieter(); // tekent de schieter

      if (keyIsDown(RIGHT_ARROW) && schieterX < 992) { // rechterpijltje -> schieter naar rechts
        schieterX = schieterX + 6;
      }
      if (keyIsDown(LEFT_ARROW) && schieterX > 4) { // linkerpijltje -> schieter naar links
        schieterX = schieterX - 6;
      }

      doelwittenEnKogelsVerdwijnen(); // laat doelwit(ten) en/of de kogel(s) verdwijnen als dat moet

      tekenTimer(); // tekent de timer

      tekenFaseTekst();

      if(checkGameOver() === true) {
        spelStatus = GAMEOVER; // als het balletje bij de onderkant van het scherm komt is "Game Over = true"; dan is de spelstatus GAMEOVER
      }

      break;

    case GAMEOVER:
      image(plaatjeAchtergrondBeginEindUitleg, 0, 0);
      eindSchermTitel();
      scores();
      knopEindschermLinks();
      knopEindschermRechts();
      break;
  }

}
function keyPressed() { // spatiebalk ingedrukt -> balletje komt uit schieter
    if(keyCode === 32) { // 32 = spatiebalk
        balletjesSchieter.push([schieterX + 40, 662]);
    }
}

function mousePressed() {
  if(spelStatus === GAMEOVER) {
    if(mouseX > posXknoppenEindscherm + 7 && mouseX < posXknoppenEindscherm + 347 && mouseY > posYknoppenEindscherm + 6 && mouseY < posYknoppenEindscherm + 78) { //
      spelStatus = BEGINSCHERM; // spelStatus = BEGINSCHERM als je op de linkerknop klikt
      resetGame();
    } else if(mouseX > posXknoppenEindscherm + 7 + afstandTussenKnoppenEindscherm && mouseX < posXknoppenEindscherm + 347 + afstandTussenKnoppenEindscherm && mouseY > posYknoppenEindscherm + 6 && mouseY < posYknoppenEindscherm + 78) { //
      spelStatus = SPELEN; // spelStatus = SPELEN als je op de rechterknop klikt
      resetGame();
    }
  } else if(spelStatus === BEGINSCHERM) {
    if(mouseX > posXrechthoekBeginscherm && mouseX < posXrechthoekBeginscherm + 344 && mouseY > posYrechthoekBeginscherm && mouseY < posYrechthoekBeginscherm + 74) { // check of de knop "Game Spelen" wordt geklikt
      spelStatus = SPELEN; // spelStatus = SPELEN als je op de knop klikt
    }
  }
}