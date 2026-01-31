console.log("Birthday wishes page loaded successfully!");

// Play/pause music on click
const music = document.getElementById("bg-music");
document.body.addEventListener("click", () => {
  if(music.paused){
    music.play();
  } else {
    music.pause();
  }
});
