

const buttonRand = document.querySelector('#buttonRand');
const buttonDelete = document.querySelector('#buttonDelete');
const textList = document.querySelector("#textbox");
const animToggle = document.querySelector("#animations-toggle");


const playSound = document.querySelector("#playSound");



buttonRand.onclick = playFun;
buttonDelete.onclick = playFun;
animToggle.onclick = playFun;

function playAudio() {
  playSound.play();
}

let delIncr = 6000;

function printIt(text){
	textList.value = text
}

function printToBox(text, delay) {
	setTimeout(printIt,delay,text);
}

function playFun() {
	let outputList = "playing";
	let sound = playSound;
	printToBox(outputList, delIncr);
	setTimeout("playAudio()", 6000);
}





