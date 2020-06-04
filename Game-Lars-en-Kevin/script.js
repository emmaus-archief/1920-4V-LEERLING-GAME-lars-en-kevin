// spelfases
const BEGINSCHERM = 0;
const UITLEG = 1;
const SPELEN = 2;
const GAMEOVER = 3;
var spelStatus = BEGINSCHERM;

// constanten van het beginscherm
const posXrechthoekBeginscherm = 362; // X-positie van de rechthoek met de tekst "Game Spelen"
const posYrechthoekBeginscherm = 246; // Y-positie van de rechthoek met de tekst "Game Spelen"
const posXtekstZijkantBeginscherm = 36; // X-positie van de tekst aan de zijkant van het beginscherm
const posYtekstZijkantBeginscherm = 240; // Y-positie van de tekst aan de zijkant van het beginscherm
const posXknopUitlegBeginscherm = 780; // X-positie van de knop van de uitleg op het beginscherm
const posYknopUitlegBeginscherm = 262; // Y-positie van de knop van de uitleg op het beginscherm
const breedteKnopUitlegBeginscherm = 100; // breedte van de knop van de uitleg op het beginscherm
const hoogteKnopUitlegBeginscherm = 48; // hoogte van de knop van de uitleg op het beginscherm
const posXbedieningBeginscherm = 382; // X-positie van de bediening op het beginscherm
const posYbedieningBeginscherm = 448; // Y-positie van de bediening op het beginscherm

// constanten van de uitleg

const posXtitelUitleg = 436; // X-positie van de titel van de uitleg
const posYtitelUitleg = 88; // Y-positie van de titel van de uitleg
const posXtekstUitleg = 32; // X-positie van de tekst van de uitleg
const posYtekstUitleg = 180; // Y-positie van de tekst van de uitleg
const posXknopInUitleg = 760; // X-positie van de knop in de uitleg
const posYknopInUitleg = 580; // Y-positie van de knop in de uitleg
const breedteKnopInUitleg = 230; // breedte van de knop in de uitleg
const hoogteKnopInUitleg = 60; // hoogte van de knop in de uitleg

// array's van kogeltjes en doelwitten
var balletjesSchieter = []; // maakt een array aan voor de balletjes van de schieter
var doelwitRondje = []; // maakt een array aan voor de doelwitten

// timer
var timerSec = 0; // timer secondes begint op 0
var timerMin = 0; // timer minuten begint op 0
var totaalSec = 0; // totaal aantal secondes, wordt niet gereset na een minuut
var timerMinStr = ""; // maakt een lege string aan voor de minuten, die later in de code gevuld wordt
var timerSecStr = ""; // maakt een lege string aan voor de secondes, die later in de code gevuld wordt

// schieter
var schieterX = 518; // startpositie schieter
var schieterY = 672; // Y-positie schieter

// fases in de game
var fase = 1; // de game begint met fase = 1
var faseNummer; // maakt een globale variabele aan voor "faseNummer"
var rondeTekst = ""; // maakt een lege string aan voor de rondeTekst; deze wordt later gevuld in de code
var faseTekst = ""; // maakt een lege string aan voor de faseTekst; deze wordt later gevuld in de code

// doelwitsnelheid begin
var doelwitSnelheid = 1; // hoe snel de doelwit balletjes vallen aan het begin

// diameter van de doelwitten en de kogels
const balSchieterDiameter = 16; // diameter van het balletje van de schieter
const balDoelwitDiameter = 26; // diameter van het doelwit balletje

// layout game (tekst grootte, etc.)
const tekstGrootteTekstGame = 36; // grootte  van de tekst in de game
const hoogteTekstGame = 40; // hoogte van de tekst in de game

// constanten van het eindscherm
const posXtekstEindeScherm = 460; // X-positie van de behaalde scores op het eindscherm
const posYtekstEindeScherm = 268; // Y-positie van de behaalde scores op het eindscherm
const posXknoppenEindscherm = 142; // X-positie van de knoppen op het eindscherm
const posYknoppenEindscherm = 490; // Y-positie van de knoppen op het eindscherm 
const afstandTussenKnoppenEindscherm = 440; // de afstand tussen de knoppen op het eindscherm

// VARIABELEN MET FUNCTIES VAN HET BEGINSCHERM

var titelKnopEnNamenBeginScherm = function() { // variabele voor het tekenen van de titel, de knop en de namen

  fill(222, 6, 42);
  textFont('Georgia'); // lettertype
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
  rect(posXrechthoekBeginscherm, posYrechthoekBeginscherm, 344, 74); // rechthoek "Game Spelen "beginscherm

  textFont('Helvetica'); // lettertype
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
    stroke(255);
    strokeWeight(2);
    text("Zorg dat de balletjes de grond\nniet raken door ze uit\nde lucht te schieten!\nHet wordt steeds moeilijker\ndoor meer en snellere balletjes!", posXtekstZijkantBeginscherm, posYtekstZijkantBeginscherm);
}

var knopUitlegBeginscherm = function() {
  if (mouseX > posXknopUitlegBeginscherm && mouseX < posXknopUitlegBeginscherm + breedteKnopUitlegBeginscherm && mouseY > posYknopUitlegBeginscherm && mouseY < posYknopUitlegBeginscherm + hoogteKnopUitlegBeginscherm) {
    fill(114, 212, 252);
    strokeWeight(8);
  } else {
    fill(180, 180, 200);
    strokeWeight(6);
  }
  stroke(0);
  rect(posXknopUitlegBeginscherm, posYknopUitlegBeginscherm, breedteKnopUitlegBeginscherm, hoogteKnopUitlegBeginscherm); // rechthoek "Uitleg" beginscherm

  textFont('Helvetica'); // lettertype
  textSize(22);
  if (mouseX > posXknopUitlegBeginscherm && mouseX < posXknopUitlegBeginscherm + breedteKnopUitlegBeginscherm && mouseY > posYknopUitlegBeginscherm && mouseY < posYknopUitlegBeginscherm + hoogteKnopUitlegBeginscherm) {
    fill(255);
    stroke(0);
    strokeWeight(4);
  } else {
    noStroke();
    fill(100);
  }
  text("Uitleg", posXknopUitlegBeginscherm + 22, posYknopUitlegBeginscherm + 32); // tekst "Uitleg"
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

// VARIABELEN MET FUNCTIES VAN DE UITLEG

var tekenUitlegAchtergrond = function() { // variabele voor het tekenen van de achtergrond van de uitleg
  image(plaatjeAchtergrondBeginUitlegEind, 0, 0);
}

var tekenTitelUitleg = function() { // variabele voor het tekenen van de titel
  fill(240, 0, 0);
  textSize(80);
  stroke(0);
  strokeWeight(6);
  text("Uitleg", posXtitelUitleg, posYtitelUitleg);
}

var tekstAttributesKoppenUitleg = function() { // variabele voor de tekstattributes van de koppen
  fill(255);
  textSize(26);
  stroke(0);
  strokeWeight(5);  
}

var tekstAttributesTekstUitleg = function() { // variabele voor de tekstattributes van de kleine tekst
  fill(255);
  textSize(20);
  stroke(0);
  strokeWeight(3);  
}

var tekenUitlegTekstDoel = function() { // variabele voor het tekenen van de tekst van het doel van de game 
  tekstAttributesKoppenUitleg(); // zet de tekst attributes in de code voor de koppen van de tekst
  text("Doel van het spel:", posXtekstUitleg, posYtekstUitleg);  // tekent de tekst "Doel van het spel"

  tekstAttributesTekstUitleg(); // zet de tekst attributes in de code voor de kleine tekst
  text("Zorg dat de doelwitten (balletjes) de grond niet raken\n door de doelwitten uit de lucht te schieten.\nMet de schieter vuur je kogels af.\nAls de kogel en het doelwit elkaar raken,\n verdwijnen zowel de kogel als het doelwit.", posXtekstUitleg, posYtekstUitleg + 50);  // tekent de kleine tekst van het doel van het spel 
}

var tekenUitlegTekstFaseRonde = function() { // variabele voor het tekenen van de tekst van de rondes en de fases
  tekstAttributesKoppenUitleg(); // zet de tekst attributes in de code voor de koppen van de tekst
  text("Rondes en Fases:", posXtekstUitleg, posYtekstUitleg + 220);  // tekent de tekst "Rondes en Fases"

  tekstAttributesTekstUitleg(); // zet de tekst attributes in de code voor de kleine tekst
  text("Elke minuut dat je overleeft kom je een ronde verder.\nElke ronde gaat de snelheid waarmee de balletjes vallen omhoog,\n elke ronde vallen de balletjes dus sneller.\nElke ronde bestaat uit 3 fases van 20 seconden, die elke ronde opnieuw afspelen.\nHoe hoger de fase hoe kleiner het interval tussen de doelwitten.\nAan het begin van elke ronde is het interval groot,\n naarmate je verder in de ronde komt, wordt het interval steeds kleiner.", posXtekstUitleg, posYtekstUitleg + 270); // tekent de kleine tekst van de rondes en de fases 
}

var tekenUitlegTekstBediening = function() { // variabele voor het tekenen van de tekst van de bediening
  tekstAttributesKoppenUitleg(); // zet de tekst attributes in de code voor de koppen van de tekst
  text("Bediening:", posXtekstUitleg + 580, posYtekstUitleg); // tekent de tekst "Bediening"

  tekstAttributesTekstUitleg(); // zet de tekst attributes in de code voor de kleine tekst
  text("Druk op het pijltje naar links op het toetsenbord\n om de schieter naar links te bewegen.\nDruk op het pijltje naar rechts op het toetsenbord\n om de schieter naar rechts te bewegen.\nDruk op de spatiebalk om een kogel te schieten.", posXtekstUitleg + 580, posYtekstUitleg + 50);  // tekent de kleine tekst van de bediening
}

var tekenKnopInUitleg = function() { // variabele voor het tekenen van de knop in het uitleg scherm
  if (mouseX > posXknopInUitleg && mouseX < posXknopInUitleg + breedteKnopInUitleg && mouseY > posYknopInUitleg && mouseY < posYknopInUitleg + hoogteKnopInUitleg) { // als de muis op de knop is
    fill(114, 212, 252);
    strokeWeight(8);
  } else {
    fill(180, 180, 200);
    strokeWeight(6);
  }
  stroke(0);
  rect(posXknopInUitleg, posYknopInUitleg, breedteKnopInUitleg, hoogteKnopInUitleg); // rechthoek met tekst "Naar beginscherm"

  textFont('Helvetica'); // lettertype
  textSize(22);
  if (mouseX > posXknopInUitleg && mouseX < posXknopInUitleg + breedteKnopInUitleg && mouseY > posYknopInUitleg && mouseY < posYknopInUitleg + hoogteKnopInUitleg) { // als de muis op de knop is
    fill(255);
    stroke(0);
    strokeWeight(4);
  } else {
    noStroke();
    fill(100);
  }
  text("Naar Beginscherm", posXknopInUitleg + 24, posYknopInUitleg + 36); // tekst "Naar beginscherm"
}

// VARIABELEN MET FUNCTIES VAN DE GAME

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
  ellipse(balSchieterX, balSchieterY, balSchieterDiameter); // plaats en afmetingen van het balletje van de schieter
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
  if(spelStatus === SPELEN) { // alleen een nieuw balletje in de array als je de game aan het spelen bent
    doelwitRondje.push([random(30, width - 30), 20, doelwitSnelheid]); // stopt een nieuw doelwit in de array
  }
}

var tekenRondjeDoelwit = function(rondjeDoelwitX, rondjeDoelwitY) { // variabele van het doelwit tekenen
  fill(255, 255 - rondjeDoelwitY / (720 / 255), 0); // kleur doelwit rondje 2.8235
  strokeWeight(2);
  ellipse(rondjeDoelwitX, rondjeDoelwitY, balDoelwitDiameter); // plaats en afmetingen van het doelwit
}

var doelwittenEnKogelsVerdwijnen = function() { // variabele van het verdwijnen van doelwitten en/of kogels als dat moet
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
    balletjesSchieter.splice(teVerwijderenSchieter, 1); // verwijder het desbetreffende schieter balletje uit de array
  }
  if(teVerwijderenDoelwit !== undefined) { // als er een balletje is dat verwijderd moet worden; !== betekent is niet gelijk aan
    doelwitRondje.splice(teVerwijderenDoelwit, 1); // verwijder het desbetreffende doelwit uit de array
  }
  if(teVerwijderenSchieterBoven !== undefined) { // als er een balletje is dat verwijderd moet worden; !== betekent is niet gelijk aan
    balletjesSchieter.splice(teVerwijderenSchieterBoven, 1); // verwijder het desbetreffende schieter balletje uit de array
  }
}

var tekenRondeFaseTekst = function() { // variabele voor het tekenen van de rondeTekst en de faseTekst

  if(faseNummer === 1) { // als faseNummer 1 is
    faseTekst = "1"; // de faseTekst wordt 1
  } else if(faseNummer === 2) { // als faseNummer 2 is
    faseTekst = "2"; // de faseTekst wordt 2
  } else if(faseNummer === 0) { // als faseNummer 3 is
    faseTekst = "3"; // de faseTekst wordt 
  }

  rondeTekst = Math.floor(totaalSec / 60) + 1; // vult de lege variabele "rondeTekst"

  push(); // werkt samen met pop, zodat alle tekstattributes niet voor de hele code gelden
  fill(255);
  textSize(tekstGrootteTekstGame);
  strokeWeight(2);
  text("Ronde: " + rondeTekst + " Fase: " + faseTekst, 14, hoogteTekstGame); // tekst van de ronde en van de tekst in de game
  pop(); // werkt samen met push, zodat alle tekstattributes niet voor de hele code gelden
}

var updateTimer = function() { // variabele om de timer te updaten
  if(spelStatus === SPELEN) { // doet dit alleen als de SpelStatus "SPELEN" is
    timerSec++; // elke seconde de teller van de secondes 1 omhoog
    totaalSec++; // elke seconde gaat de totale hoeveelheid secondes met 1 omhoog

    if (timerSec === 60) { // dit gebeurt alleen als de aantal seconden in de timer op "60" staat
      timerMin++; // als 60 secondes voorbij zijn, dan 1 minuut erbij
      timerSec = 0; // als 60 secondes voorbij zijn, dan secondes naar 0
    }
  }
}

var tekenTimer = function() { // variabele om de timer te tekenen
  timerMinStr = timerMin + ""; // de string van de timer minuten is het aantal minuten in de timer + een lege string
  if(timerMinStr.length < 2) { // voert dit alleen uit als er minder dan 2 getallen in de timer staan
    timerMinStr = "0" + timerMinStr; // de string van de timer minuten bestaat nu uit een "0" en de timerMin 
  }

  timerSecStr = timerSec + ""; // de string van de timer seconden is het aantalseconden in de timer + een lege string
  if(timerSecStr.length < 2) { // voert dit alleen uit als er minder dan 2 getallen in de timer staan
    timerSecStr = "0" + timerSecStr; // de string van de timer seconden bestaat nu uit een "0" en de timerSec 
  }
    
  var timerTekst = timerMinStr + ":" + timerSecStr; // dit staat mooier dan in de string van text()

  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(tekstGrootteTekstGame);
  text(timerTekst, 976, hoogteTekstGame); // de timer tekst in de game
}

var checkGameOver = function() { // variabele om te checken of het doelwit de grond heeft geraakt
  var gameOver = false; // variabele gameOver staat op "false"
  doelwitRondje.forEach(function(doelwit) { // geld voor elk "doelwit"
    doelwitY = doelwit[1]; // doelwitY is de 2e plaats in de array, is de Y-positie van het doelwit
    if(doelwitY > 720 - balDoelwitDiameter / 2) { // check of het doelwit de onderkant raakt
      gameOver = true; // variabele gameOver wordt op "true" gezet
    }
  })
  return gameOver; // zet checkGameOver op "true" of "false"
}

var resetGame = function() {
  timerSec = 0; // timer secondes begint weer op 0
  timerMin = 0; // timer minuten begint weer op 0
  totaalSec = 0; // timer totaal begint weer op 0
  schieterX = 518; // zet de schieter terug op zijn beginplek
  balletjesSchieter = []; // maakt de array van de balletjes van de schieter weer leeg
  doelwitRondje = []; // maakt de array van de doelwitten leeg, zodat er balletjes over het hele scherm zitten als je de game opnieuw speelt
  fase = 1; // zet de fase op 1
  faseNummer = 1; // zet faseNummer op 1
  doelwitSnelheid = 1; // zet de snelheid van de doelwitten weer op 1
}

// VARIABELEN MET FUNCTIES VAN EINDSCHERM

var eindSchermTitel = function() { // variabele voor het tekenen van de titel van het eindscherm
  fill(222, 6, 42);
  textFont('Georgia');
  textSize(120);
  stroke(0);
  strokeWeight(4);
  text("Game Over!", 226, 132); // tekst titel
}

var scores = function() { // variabele voor het teken van de behaalde scores

  rondeTekst = Math.floor(totaalSec / 60) + 1; // bepaalt de ronde waarin je zit

  fill(255);
  textFont('Helvetica'); // lettertype
  textSize(24);
  stroke(0);
  strokeWeight(4);
  text("Behaald: ", posXtekstEindeScherm - 120, posYtekstEindeScherm) // tekst "Behaald:"
  text("- Ronde: " + rondeTekst, posXtekstEindeScherm, posYtekstEindeScherm); // tekst "Ronde"
  text("- Fase: " + faseTekst, posXtekstEindeScherm, posYtekstEindeScherm + 50); // tekst "Fase"
  text("- Tijd: " + timerMinStr + ":" + timerSecStr + " minuten", posXtekstEindeScherm, posYtekstEindeScherm + 100); // "Tijd"
}

var knopEindschermLinks = function() { // variabele voor het tekenen van de linker eindknop
  if (mouseX > posXknoppenEindscherm + 7 && mouseX < posXknoppenEindscherm + 347 && mouseY > posYknoppenEindscherm + 6 && mouseY < posYknoppenEindscherm + 78) { // als de muis op de linkerknop is
    fill(114, 212, 252);
    strokeWeight(8);
  } else {
    fill(180, 180, 200);
    strokeWeight(6);
  }
  stroke(0);
  rect(posXknoppenEindscherm + 6, posYknoppenEindscherm + 6, 344, 74); // achtergrond rechthoek van de linkerknop

  fill(100);
  textFont('Helvetica'); // lettertype
  textSize(30);
  if (mouseX > posXknoppenEindscherm + 7 && mouseX < posXknoppenEindscherm + 347 && mouseY > posYknoppenEindscherm + 6 && mouseY < posYknoppenEindscherm + 78) { // als de muis op de linkerknop is
    strokeWeight(4);
    fill(255);
  } else {
    noStroke();
  }
  text("Naar beginscherm", posXknoppenEindscherm + 56, posYknoppenEindscherm + 52); // tekst "Naar Beginscherm"
}

var knopEindschermRechts = function() { // variabele voor het tekenen van de rechter eindknop
  if (mouseX > posXknoppenEindscherm + 7 + afstandTussenKnoppenEindscherm && mouseX < posXknoppenEindscherm + 347 + afstandTussenKnoppenEindscherm && mouseY > posYknoppenEindscherm + 6 && mouseY < posYknoppenEindscherm + 78) { // als de muis op de rechterknop is
    fill(114, 212, 252);
    strokeWeight(8);
  } else {
    fill(180, 180, 200);
    strokeWeight(6);
  }
  stroke(0);
  rect(posXknoppenEindscherm + 6 + afstandTussenKnoppenEindscherm, posYknoppenEindscherm + 6, 344, 74); // achtergrond rechthoek van de rechterknop

  fill(100);
  textFont('Helvetica'); // lettertype
  textSize(30);
  if (mouseX > posXknoppenEindscherm + 7 + afstandTussenKnoppenEindscherm && mouseX < posXknoppenEindscherm + 347 + afstandTussenKnoppenEindscherm && mouseY > posYknoppenEindscherm + 6 && mouseY < posYknoppenEindscherm + 78) { // als de muis op de rechterknop is
    strokeWeight(4);
    fill(255);
  } else {
    noStroke();
  }
  text("Opnieuw spelen", posXknoppenEindscherm + 72 + afstandTussenKnoppenEindscherm, posYknoppenEindscherm + 52); // tekst "Opnieuw spelen"
}


// BEGIN VAN DE FUNCTIES

var pijlLinks; // maakte een variabele aan voor het plaatje van de pijl naar links
var pijlRechts; // maakte een variabele aan voor het plaatje van de pijl naar rechts
var spatiebalk; // maakte een variabele aan voor het plaatje van de spatiebalk
var plaatjeAchtergrondGame; // maakte een variabele aan voor het achtergrondplaatje van de game
var plaatjeAchtergrondBeginUitlegEind; // maakte een variabele aan voor het achtergrondplaatje van het beginscherm, de uitleg en het eindscherm
function preload() { // functie om de plaatjes te laden
  pijlLinks = loadImage('Afbeeldingen/pijlLinks.jpg'); // plaatje linker pijltje laden
  pijlRechts = loadImage('Afbeeldingen/pijlRechts.jpg'); // plaatje rechter pijltje laden
  spatiebalk = loadImage('Afbeeldingen/spatiebalk.jpg'); // plaatje spatiebalk laden
  plaatjeAchtergrondGame = loadImage('Afbeeldingen/plaatjeAchtergrondWereld.jpg'); // achtergrondplaatje laden
  plaatjeAchtergrondBeginUitlegEind = loadImage('Afbeeldingen/plaatjeAchtergrondWit.jpg'); // achtergrondplaatje laden
}

function setup() { 
  createCanvas(1080, 720); // afmetingen van de game
  setInterval(updateTimer, 1000); // elke 1000 ms gaat de teller van de secondes 1 omhoog
  doelwitBalletjeErbij(); // laat een nieuw doelwit spawnen; kan niet in de draw, want dan komen er 60 balletjes per seconde
}

function draw() {
  switch (spelStatus) { // is voor het wisselen tussen het beginscherm, de uitleg, de game en het eindscherm
    case BEGINSCHERM:
      image(plaatjeAchtergrondBeginUitlegEind, 0, 0);
      titelKnopEnNamenBeginScherm(); // tekent de titel, de knop en namen op het beginscherm
      tekstenZijkantenBeginscherm(); // tekent de teksten aan de zijkanten van het beginscherm
      knopUitlegBeginscherm(); // tekent de knop van de uitleg op het beginscherm
      bedieningBeginscherm(); // tekent de bediening op het beginscherm

      break;
    case UITLEG:
      image(plaatjeAchtergrondBeginUitlegEind, 0, 0); // tekent het achtergrond plaatje van de uitleg
      tekenTitelUitleg(); // tekent de titel van de uitleg
      tekenUitlegTekstDoel(); // tekent de tekst met het doel van de game
      tekenUitlegTekstFaseRonde(); // tekent de tekst met de informatie over de rondes en de fases
      tekenUitlegTekstBediening(); // tekent de tekst over bediening
      tekenKnopInUitleg(); // tekent de knop in het uitleg scherm

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
      tekenRondeFaseTekst(); // tekent de tekst van de Ronde en van de Fase in de game

      if(checkGameOver() === true) {
        spelStatus = GAMEOVER; // als het balletje bij de onderkant van het scherm komt is "Game Over = true"; dan is de spelstatus GAMEOVER
      }

      break;
    case GAMEOVER:
      image(plaatjeAchtergrondBeginUitlegEind, 0, 0);
      eindSchermTitel(); // tekent de titel van het eindscherm
      scores(); // tekent de behaalde scores op het eindscherm
      knopEindschermLinks(); // tekent de linkerknop op het eindscherm
      knopEindschermRechts(); // tekent de rechterknop op het eindscherm
      break;
  }
}

function keyPressed() { // spatiebalk ingedrukt -> balletje komt uit schieter
    if(keyCode === 32) { // 32 = spatiebalk
      balletjesSchieter.push([schieterX + 40, 662]); // stopt een nieuw balletje van de schieter in de array
    }
}

function mousePressed() { // als de muis ingedrukt wordt
  if(spelStatus === GAMEOVER) { // als de spelStatus "GAMEOVER" is
    if(mouseX > posXknoppenEindscherm + 7 && mouseX < posXknoppenEindscherm + 347 && mouseY > posYknoppenEindscherm + 6 && mouseY < posYknoppenEindscherm + 78) { // als er op de linkerknop gedrukt wordt
      spelStatus = BEGINSCHERM; // spelStatus = BEGINSCHERM als je op de linkerknop op het eindscherm klikt
      resetGame(); // reset de game  
    } else if(mouseX > posXknoppenEindscherm + 7 + afstandTussenKnoppenEindscherm && mouseX < posXknoppenEindscherm + 347 + afstandTussenKnoppenEindscherm && mouseY > posYknoppenEindscherm + 6 && mouseY < posYknoppenEindscherm + 78) { // als er op de rechterknop gedrukt wordt
      spelStatus = SPELEN; // spelStatus = SPELEN als je op de rechterknop op het eindschermklikt
      resetGame(); // reset de game
    }
  }

  if(spelStatus === BEGINSCHERM) { // als de spelStatus "BEGINSCHERM" is
    if(mouseX > posXrechthoekBeginscherm && mouseX < posXrechthoekBeginscherm + 344 && mouseY > posYrechthoekBeginscherm && mouseY < posYrechthoekBeginscherm + 74) { // als er op de knop van het beginscherm wordt geklikt
      spelStatus = SPELEN; // spelStatus = SPELEN als je op de knop klikt
      resetGame(); // reset de game
    } else if(mouseX > posXknopUitlegBeginscherm && mouseX < posXknopUitlegBeginscherm + breedteKnopUitlegBeginscherm && mouseY > posYknopUitlegBeginscherm && mouseY < posYknopUitlegBeginscherm + hoogteKnopUitlegBeginscherm) { // als er op de knop van de uitleg op het beginscherm geklikt wordt
      spelStatus = UITLEG; // spelStatus = UITLEG als je op de knop klikt
    }   
  }

  if(spelStatus === UITLEG) { // als de spelStatus "UITLEG"
    if(mouseX > posXknopInUitleg && mouseX < posXknopInUitleg + breedteKnopInUitleg && mouseY > posYknopInUitleg && mouseY < posYknopInUitleg + hoogteKnopInUitleg) { // als er op de knop van het beginscherm in de uitleg geklikt wordt
      spelStatus = BEGINSCHERM; // spelStatus = BEGINSCHERM als je op de knop klikt
    }  
  }
}     