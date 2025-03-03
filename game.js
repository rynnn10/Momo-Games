setGame("1200x600");
game.folder = "assets";
//file gambar yang dipakai dalam game
var gambar = {
	logo:"logo.png",
	startBtn:"tombolStart.png",
	cover:"cover.png",
	playBtn:"btn-play.png",
	maxBtn:"maxBtn.png",
	minBtn:"minBtn.png",
	upBtn:"upBtn.png",
	idle:"Idle.png",
	run:"Run.png",
	jump:"Jump.png",
	fall:"Fall.png",
	hit:"Hit.png",
	tileset:"Terrain.png",
	bg:"Bg.png",
	item1:"Strawberry.png",
	item2:"Kiwi.png",
	musuh1Idle:"enemy1Idle.png",
	musuh1Run:"enemy1Run.png",
	musuh1Hit:"enemy1Hit.png",
	bendera:"Flag.png"
}
// file tombol penggerak versi mobile
var movementBtns = document.getElementById("movementBtns");
//file suara yang dipakai dalam game
var suara = {
}

//load gambar dan suara lalu jalankan startScreen
loading(gambar, suara, startScreen);

function startScreen() {
	pauseButton.style.display = "block";
	refreshButton.style.display = "block";
	soundButton.style.display = "block";
	infoButton.style.display = "block";
	menuBtn.style.display = "block";
	if (window.matchMedia("(max-width: 1024px) and (orientation: landscape)").matches) {
		movementBtns.style.display = "block";
	   } else {
		 movementBtns.style.display = "none";
	   }
	hapusLayar("#67d2d6");
	tampilkanGambar(dataGambar.logo, 600, 250);
	var startBtn = tombol(dataGambar.startBtn, 600, 350);
	if (tekan(startBtn)) {
	  jalankan(halamanCover);
	}

  }
  
  function halamanCover() {
	pauseButton.style.display = "block";
	refreshButton.style.display = "block";
	soundButton.style.display = "block";
	infoButton.style.display = "block";
	menuBtn.style.display = "block";
	// if (window.matchMedia("(max-width: 1024px) and (orientation: landscape)").matches) {
	// 	movementBtns.style.display = "block";
	//    } else {
	// 	 movementBtns.style.display = "none";
	//    }

	hapusLayar("#67d2d6");
	gambarFull(dataGambar.cover);
	var playBtn = tombol(dataGambar.playBtn, 1100, 500);
	if (tekan(playBtn)) {
	  setAwal();
	  jalankan(gameLoop);
	}
	// resizeBtn(1150, 50);
  

  }
  
  

function setAwal(){
  if (!isPaused) {
	game.hero = setSprite(dataGambar.idle, 32, 32);
	game.skalaSprite = 2;
	game.hero.animDiam = dataGambar.idle;
	game.hero.animLompat = dataGambar.jump;
	game.hero.animJalan = dataGambar.run;
	game.hero.animJatuh = dataGambar.fall;
	game.hero.animMati = dataGambar.hit;
	setPlatform(this["map_"+game.level], dataGambar.tileset, 32, game.hero);
	game.gameOver = ulangiPermainan;
	// set item
	setPlatformItem(1, dataGambar.item1);
	setPlatformItem(2, dataGambar.item2);
	// set musuh
	var musuh1 = {};
	musuh1.animDiam = dataGambar.musuh1Idle;
	musuh1.animJalan = dataGambar.musuh1Run;
	musuh1.animMati = dataGambar.musuh1Hit;
	setPlatformEnemy(1,musuh1);
	// trigger
	setPlatformTrigger(1, dataGambar.bendera) ;
  }
	
}

function ulangiPermainan(){
	game.aktif = true;
	setAwal();
	jalankan(gameLoop);
}

function gameLoop(){
	// pause,refresh,sound gameLoop
	pauseButton.style.display = "block";
	refreshButton.style.display = "block";
	soundButton.style.display = "block";
	infoButton.style.display = "block";
	menuBtn.style.display = "block";
	// movementBtns.style.display = "block";

  if (!isPaused) {
	hapusLayar();
	if (game.kanan || game.rightBtnPressed) {
		gerakLevel(game.hero, 3, 0);
	  } else if (game.kiri || game.leftBtnPressed) {
		gerakLevel(game.hero, -3, 0);
	  }
	  if (game.atas || game.upBtnPressed) {
		gerakLevel(game.hero, 0, -10);
	  }
 
	 if (window.matchMedia("(max-width: 1024px) and (orientation: landscape)").matches) {
		movementBtns.style.display = "block";
	   } else {
		 movementBtns.style.display = "none";
	   }
	
	
	// Menangani aksi ketika tombol-tombol ditekan dan dilepas
	var leftBtn = document.getElementById("leftBtn");
	var rightBtn = document.getElementById("rightBtn");
	var upBtn = document.getElementById("upBtn");

	leftBtn.addEventListener("touchstart", function(event) {
	event.preventDefault();
	game.leftBtnPressed = true;
	});

	leftBtn.addEventListener("touchend", function(event) {
	event.preventDefault();
	game.leftBtnPressed = false;
	});

	rightBtn.addEventListener("touchstart", function(event) {
	event.preventDefault();
	game.rightBtnPressed = true;
	});

	rightBtn.addEventListener("touchend", function(event) {
	event.preventDefault();
	game.rightBtnPressed = false;
	});

	upBtn.addEventListener("touchstart", function(event) {
	event.preventDefault();
	game.upBtnPressed = true;
	});

	upBtn.addEventListener("touchend", function(event) {
	event.preventDefault();
	game.upBtnPressed = false;
	});

	latar(dataGambar.bg, 0, 0.5);
	buatLevel();
	teks(game.score, 600, 50);
	cekItem();
  }
 	resizeBtn(1150, 50);
}

function cekItem() {
	if (game.itemID == 1) {
	  tambahScore(1);
	  game.itemID = 0;
	} else if (game.itemID == 2) {
		tambahScore(5);
		game.itemID = 0;
	}
	if (game.musuhID != 0){
		tambahScore(10);
		game.musuhID = 0;
	}
	if (game.triggerID == 1){
		game.triggerID = 0;
		game.aktif = false;
		game.level++;
		setTimeout(ulangiPermainan, 1000);
	}
  }

  
 