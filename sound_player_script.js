

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
	for (let i=0;i<100;i++) {
		let delay = delIncr * i
		setTimeout("playAudio()", delay);
		setTimeout(printIt,delay,delay.toString());
	}
}








