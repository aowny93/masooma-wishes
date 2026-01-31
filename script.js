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
    setTimeout(showNextWish, 1500);
  }
}
showNextWish();

// MAGIC CANVAS PARTICLES (stars + hearts)
const canvas = document.getElementById("magic-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.r = Math.random()*4 + 1;
    this.color = Math.random() < 0.5 ? 'pink' : 'white';
    this.speed = Math.random()*1 + 0.5;
    this.type = Math.random() < 0.5 ? 'star' : 'heart';
    this.angle = Math.random()*360;
  }
  draw(){
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.angle*Math.PI/180);
    ctx.fillStyle = this.color;
    if(this.type==='star'){
      ctx.beginPath();
      ctx.arc(0,0,this.r,0,Math.PI*2);
      ctx.fill();
    } else {
      ctx.font = this.r*4 + "px serif";
      ctx.fillText("💖", -this.r/2, this.r/2);
    }
    ctx.restore();
  }
  update(){
    this.y -= this.speed;
    if(this.y < -10){
      this.y = canvas.height+10;
      this.x = Math.random()*canvas.width;
    }
  }
}

let particles = [];
for(let i=0;i<150;i++){
  particles.push(new Particle());
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

// Handle resize
window.addEventListener("resize", ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
