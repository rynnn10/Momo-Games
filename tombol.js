// tombol pause/refresh
var pauseButton = document.getElementById("pause");
var pauseMenu = document.getElementById("pauseMenu");
var refreshButton = document.getElementById("refresh");
var playpopup = document.getElementById("playpopup");
var menuBtn = document.getElementById("menubtn");
var isPaused = false;

function togglePause() {
  if (isPaused) {
    isPaused = false;
    audio.play();
    pauseButton.innerHTML =
      '<img src="assets/play.png" alt="Sound" width="30px" height="30px">';
    soundButton.innerHTML =
      '<img src="assets/suaraon.png" alt="Sound" width="49px" height="49px">';
  } else {
    isPaused = true;
    audio.pause();
    pauseButton.innerHTML =
      '<img src="assets/pause.png" alt="Sound" width="30px" height="30px">';
    soundButton.innerHTML =
      '<img src="assets/suaraoff.png" alt="Sound" width="49px" height="49px">';
  }
}
function toggleMenu() {
  if (isPaused) {
    menuBtn.innerHTML =
      '<img src="assets/closeMenuPopUp.png" alt="menu" style="display: none;">';
    menuBtn.innerHTML =
      '<img src="assets/menu.png" alt="menu" style="display: block;">';
    pauseMenu.style.display = "none";
    isPaused = false;
    playpopup.style.display = "none";
  } else {
    menuBtn.innerHTML =
      '<img src="assets/menu.png" alt="menu" style="display: block;">';
    menuBtn.innerHTML =
      '<img src="assets/closeMenuPopUp.png" alt="menu" style="display: block;">';
    pauseMenu.style.display = "block";
    isPaused = true;
    playpopup.style.display = "block";
  }
}

function refreshGame() {
  window.location.reload();
}

pauseButton.addEventListener("click", togglePause);
playpopup.addEventListener("click", toggleMenu);
menuBtn.addEventListener("click", toggleMenu);
refreshButton.addEventListener("click", refreshGame);

// Menambahkan backsound
var audio = new Audio("sfx/backsound.mp3");
var soundButton = document.getElementById("musicBg");
audio.autoplay = false;
audio.loop = true;

soundButton.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    soundButton.innerHTML =
      '<img src="assets/suaraon.png" alt="Sound" width="49px" height="49px">';
  } else {
    audio.pause();
    soundButton.innerHTML =
      '<img src="assets/suaraoff.png" alt="Sound" width="49px" height="49px">';
  }
});

// Menambahkan tombol sound ke dalam game area
var gameArea = document.getElementById("game");
gameArea.appendChild(soundButton);

//  tombol info
var infoButton = document.getElementById("infoButton");
infoButton.addEventListener("click", toggleInfo);

function toggleInfo() {
  // Membuat SweetAlert kustom
  const MySwal = Swal.mixin({
    title: "Kustom!",
    text: "Ini adalah SweetAlert kustom.",
    icon: "success",
    showCancelButton: false,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "OK",
    cancelButtonText: "Batal",
    customClass: {
      popup: "my-swal-popup",
      title: "my-swal-title",
      content: "my-swal-content",
      confirmButton: "my-swal-confirm-button",
      cancelButton: "my-swal-cancel-button",
    },
  });

  // Menggunakan SweetAlert kustom
  MySwal.fire({
    title: "Informasi Permainan",
    html: ' <iframe src="info.html" width="100%" height="100%" frameborder="0"></iframe>',
    icon: "info",
    confirmButtonText: "Mengerti",
    customClass: {
      popup: "my-swal-popup",
      title: "my-swal-title",
      htmlContainer: "my-swal-html-container",
      confirmButton: "my-swal-confirm-button",
      cancelButton: "my-swal-cancel-button",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("Tombol OK ditekan");
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      console.log("Tombol Batal ditekan atau menutup SweetAlert");
    }
  });
}
