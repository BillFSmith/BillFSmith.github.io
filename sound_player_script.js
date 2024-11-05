

const buttonRand = document.querySelector('#buttonRand');
const buttonDelete = document.querySelector('#buttonDelete');
const textList = document.querySelector("#textbox");
const animToggle = document.querySelector("#animations-toggle");


const playSound = document.querySelector("#playSound");



buttonRand.onclick = playFun;
buttonDelete.onclick = playFun;
animToggle.onclick = playFun;

let delIncr = 6000;

function playAudio() {
  playSound.play();
}

function printIt(text){
	textList.value = text
}

function playFun() {	
	delIncr = 2000;
	setTimeout("playAudio()", delIncr);
	setTimeout(printIt,delIncr,"2000");
	
	delIncr = 8000;
	setTimeout("playAudio()", delIncr);
	setTimeout(printIt,delIncr,"8000");
	
	delIncr = 15000;
	setTimeout("playAudio()", delIncr);
	setTimeout(printIt,delIncr,"15000");
	
		delIncr = 30000;
	setTimeout("playAudio()", delIncr);
	setTimeout(printIt,delIncr,"30000");
	
		delIncr = 60000;
	setTimeout("playAudio()", delIncr);
	setTimeout(printIt,delIncr,"60000");
	
		delIncr = 120000;
	setTimeout("playAudio()", delIncr);
	setTimeout(printIt,delIncr,"120000");
	
		delIncr = 180000;
	setTimeout("playAudio()", delIncr);
	setTimeout(printIt,delIncr,"180000");
}








