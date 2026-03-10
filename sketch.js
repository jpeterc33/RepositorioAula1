let speechRec;
let letters = [];
let gravityOn = false;

function setup() {
  createCanvas(800, 500);
  textSize(40);
  textAlign(CENTER, CENTER);

  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  speechRec = new SpeechRecognition();

  speechRec.lang = "pt-PT";
  speechRec.continuous = true;
  speechRec.interimResults = true;

  speechRec.onresult = function(event) {
    let resultado = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      resultado += event.results[i][0].transcript;
    }

    addLetters(resultado);
  };

  speechRec.start();
}

function draw() {
  background(20);

  for (let l of letters) {
    l.update();
    l.display();
  }

  // chão
  stroke(255);
  line(0, height - 20, width, height - 20);
}

function addLetters(text) {
  letters = [];
  
  for (let i = 0; i < text.length; i++) {
    let x = random(width);
    let y = random(height/2);
    letters.push(new Letter(text[i], x, y));
  }
}

function keyPressed() {
  if (keyCode === BACKSPACE) {
    gravityOn = true;
  }
}

class Letter {
  constructor(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-0.5, 0.5);
  }

  update() {

    if (!gravityOn) {
      // flutuar
      this.x += this.vx;
      this.y += this.vy;

      this.x += random(-0.5,0.5);
      this.y += random(-0.5,0.5);

    } else {
      // gravidade
      this.vy += 0.3;
      this.y += this.vy;
      this.x += this.vx;

      // colisão com chão
      if (this.y > height - 30) {
        this.y = height - 30;
        this.vy = 0;
      }
    }
  }

  display() {
    fill(255);
    noStroke();
    text(this.char, this.x, this.y);
  }
}