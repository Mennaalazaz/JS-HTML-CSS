// toggle video play/pause
const switchBtn = document.querySelector(".switch-btn");
const video = document.querySelector(".video-container");

switchBtn.addEventListener("click", function(){
  if (!switchBtn.classList.contains('slide')){
    switchBtn.classList.add('slide');
    video.pause();
  }
  else {
    switchBtn.classList.remove('slide');
    video.play();
  }
});

// preloader
const preloader = document.querySelector('.preloader');
// hide preloader when video is loaded
video.addEventListener('loadeddata', function() {
  preloader.classList.add('hide-preloader');
});