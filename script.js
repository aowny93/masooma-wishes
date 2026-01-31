console.log("Birthday wishes page loaded successfully!");

// Play/pause music
const music = document.getElementById("bg-music");
document.body.addEventListener("click", () => {
  if(music.paused) music.play();
  else music.pause();
});

// Show wishes one by one
const wishes = document.querySelectorAll(".wish-box");
let index = 0;
function showNextWish() {
  if(index < wishes.length){
    wishes[index].classList.add("show");
    index++;
    setTimeout(showNextWish, 1500); // 1.5s delay between wishes
  }
}
showNextWish();

// Confetti animation
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Confetti {
  constructor() {
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height - canvas.height;
    this.r = Math.random()*6 + 4;
    this.d = Math.random()*canvas.height;
    this.color = `hsla(${Math.random()*360}, 100%, 60%, 0.8)`;
    this.tilt = Math.floor(Math.random()*10) - 10;
  }
  draw() {
    ctx.beginPath();
    ctx.lineWidth = this.r/2;
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.x + this.tilt + this.r/4, this.y);
    ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r/4);
    ctx.stroke();
  }
}

let confettiArray = [];
for(let i=0; i<150; i++){
  confettiArray.push(new Confetti());
}

function drawConfetti(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confettiArray.forEach(c => c.draw());
  updateConfetti();
  requestAnimationFrame(drawConfetti);
}
function updateConfetti(){
  confettiArray.forEach(c=>{
    c.y += 2;
    c.tilt += 0.5;
    if(c.y > canvas.height) {
      c.y = -10;
      c.x = Math.random()*canvas.width;
    }
  });
}
drawConfetti();

// Handle resize
window.addEventListener("resize", ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
