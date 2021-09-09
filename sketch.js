/*
Først laver vi nogle variable til at lave en appelsin:
 - en kugle som vi vil skyde afsted og fange i en turban
*/

// Appelsinen
let x = 0; 
let y = 200;
const rad = 20;
let xspeed = 4;
let yspeed = -6;
let newspeed;
const grav = 0.1; // acceleration i nedadgående retning, lige som tyngde
const col = [220,110,0];

// Turbanen
let turban;

// Øvrige
let tid = 150;
let score = 0;
let missed = 0;
let liv = 3;
let spilIgang = true;   //flag

/* 
 billederne preoloades så at de kan fremvises med det samme når at siden åbnes
 */

let img;
function preload() {
  img = loadImage('dum/PoTheGod.jpg');
  imk = loadImage('dum/Sunbaby.png');
  imq = loadImage('dum/Støvsuger.gif');
}

//laver canvas
function setup() {  // kører kun en gang, når programmet startes
    createCanvas(1535, 730);

    textAlign(CENTER, CENTER);

    newspeed = yspeed;
    x = rad;
    // parametrene til Kurv-konstruktøren er (x, y, bredde, dybde, speed, image)
    turban = new Kurv(700, 120, 100, 150, 10, img);
    //appelsin = new Frugt.js
//den forbedrede genstartknap dog stadig med samme værdinulstillinger som før
    genstartKnap = createButton('Play again');
    genstartKnap.position(width/2, height/2);
    genstartKnap.mousePressed(restart);
    genstartKnap.hide();

}

function draw() {
    //Baggrunden samt movement input
    background(imk);
    
    if (spilIgang) {
        move();
        checkScore();
        display();
        if (keyIsDown(UP_ARROW)) {
            turban.moveY(-5);
        }
        if (keyIsDown(DOWN_ARROW)) {
            turban.moveY(5);
        }    
        if (keyIsDown(LEFT_ARROW)) {
            turban.moveX(-5);
        }
        if (keyIsDown(RIGHT_ARROW)) {
            turban.moveX(5);
        } 
    }
    else {  // så er Game Over det der skal vises
        fill(col);
        textSize(46);
        text("Game Over",width/2 + random(-5,5), height/2 + random(3 ));
        text("Score: "+score, width/2, height/2 + 50);
      

    }
    /*Første forsøg på restart knap
    document.querySelector('#btn_pa').addEventListener('click', function(){
      // window.location.reload();
      score = 0;
      missed = 0;
      liv = 3;
      x = 20;
      y = 400;
      spilIgang = true;

        return false;
    });*/
}

//fremvisning af score og liv
function display() {
    fill(255);
    textSize(12);
    text("Score: "+score, width-80, 30);
    text("Liv: " + liv, width-160, 30);
    
    //Her skal vi sørge for at appelsinen bliver vist, hvis den skal vises
    if(tid > 0) {
        tid -= 1;
    }
    if (tid < 100) {
        fill(col);
        image(imq, x, y, rad*2, rad*2);

    }

    // Her vises turbanen - foreløbig blot en firkant
    turban.tegn();
    
    //imq.tegn();
}
    
function move() {
    //Her skal vi sørge for at appelsinen bevæger sig, hvis den er startet og at genstartknappen skal vises når at den slutter
    if (tid <= 0) {
        x += xspeed;
        y += yspeed;
        yspeed += grav;
    }
    if (x > width || y > height) {
        missed += 1;
        liv -= 1;
        if (liv < 1) {
            spilIgang = false;
            genstartKnap.show();
        }
        shootNew();
    }
}

function checkScore() {
    // Her checkes om turbanen har fanget appelsinen. Hvis ja, skydes en ny appelsin afsted
    if (yspeed > 0) {
        if (turban.grebet(x, y, rad)) {
            score += 1;
            shootNew(); 
        }
    }
}
    
function shootNew() {
    //Her skal vi sørge for at en ny appelsin skydes afsted (er sadt op så at den ikke kan skyde over 0 på x aksen(altså toppen af skærmen))
    x = rad;
    y = random(100, 550);
    yspeed = -10*y/550;
    xspeed = random(3, 10);
    /*
    if (y < 100) {
        yspeed = 0;
        xspeed = random(5,11);
    } else if (y < 300 && y > 101) {
        yspeed = -5;
        xspeed = random (3,8);
    } else if (y < 500 && y > 301) {
        yspeed = -7.5;
        xspeed = random (8,10);
    } else {
        yspeed = -10;
        xspeed = random(1,8);
    }*/
    tid = random(400);
}


function keyPressed() {
    // Funktionen gør ingenting lige nu
    return false;  // Forebygger evt. browser default behaviour
}

//den forbedrede restart knap
function restart() {
    score = 0;
    missed = 0;
    liv = 3;
    x = 20;
    y = 400;
    spilIgang = true;

    genstartKnap.hide();
}

/*
OPGAVER
 Opgave 1 - undersøg hvad variablerne  grav  og  tid  bruges til, og hvor.  
            Skriv det i kommentarer, prøv at se hvad der sker, når
            I laver dem om. 

 Opgave 2 - lav programmet om så det er tilfældigt hvor højt oppe 
            på venstre kan appelsinerne starter. Overvej om man kan 
            sikre, at appelsinen ikke ryger ud af skærmens top men 
            stadig har en "pæn" bane.

 Opgave 3 - ret programmet til, så det også angives hvor mange 
            appelsiner man IKKE greb med turbanen

 Opgave 4 - Undersøg hvad scriptet  kurv.js  er og gør, og forklar 
            lidt mere detaljeret end det er gjort nu hvad sammenhængen 
            mellem dette script og turbanen i  sketch.js  er. 
            Skriv det som kommentarer i toppen af  kurv.js
            Prøv jer frem med forskellige løsninger for hvor hurtigt 
            turbanen skal rykke. 

 Opgave 5 - Find et billede af en turban og sæt det ind i stedet 
            for firkanten. Find eventuelt også en lyd, der kan afspilles, 
            når appelsinen gribes. Se gerne i "p5 Reference" hvordan, 
            hvis ikke I kan huske det:   https://p5js.org/reference/
            
 Opgave 6 - Lav en Appelsin-klasse, lige som der er en Kurv-klasse. 
            Flyt koden til appelsinen ud i et selvstændigt script.
            Overvej hvad det skal hedde, og hvilke variabler og funktioner, 
            der skal lægges over i det nye script, herunder hvordan det 
            kommer til at berøre turbanen. Skriv jeres overvejelser i 
            kommentarerne

 Opgave 7 - Ret programmet til, så der kan være flere appelsiner i 
            luften på en gang, dvs. at der kan skydes en ny appelsin
            afsted før den foregående er forsvundet. Overvej hvordan 
            og hvor hurtigt de skal skydes af, for at det kan gøre spillet
            sjovere og mere udfordrende, og forklar jeres tanker
            i kommentarerne

 Opgave 8 - Ret programmet til, så det kan vindes og/eller tabes ved
            at man griber eller misser et antal appelsiner. Sørg for 
            at der vises en "Game Over"-skærm, som fortæller om man 
            vandt eller tabte, og som giver mulighed for at starte et
            nyt spil. Se evt. om I kan lave en løsning så turbanens
            bevægelseshastighed, skydetempoet med appelsinerne og andre
            ting kan justeres mens man spiller. Lav evt. programmet om, 
            så man kan flytte turbanen med musen


*/
