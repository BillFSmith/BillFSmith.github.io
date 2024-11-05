const buttonRand = document.querySelector('#buttonRand');
const playSound = document.querySelector("#playSound");
const quantity = document.querySelector("#quantity");

buttonRand.onclick = playFun;



function playAudio() {
  playSound.play();
}

function muteAudio() {
  playSound.muted = true;
}

function muteAudioOff() {
  playSound.muted = false;
}

function quietAudio() {
  playSound.volume = 0.01;
}

function loudAudio() {
  playSound.volume = 1;
}

function delButtonText(text) {
  buttonRand.innerText = text;
}

function printIt(text){
	buttonRand.innerText = text;
}

function printToBox(text, delay) {
	setTimeout(printIt, delay,text);
}




function playFun() {	

	delayInMs = Number(quantity.value) * 1000 * 60;
	buttonRand.innerText = "playing (click to restart)";
	printToBox("finished", delayInMs)
	setTimeout("playAudio()", 0);
	setTimeout("playAudio()", delayInMs);
	
	
	//setTimeout("delButtonText()", 6000, "test");
	
	
//	setTimeout("playAudio()", 6000);
	
	//setTimeout("muteAudio()", 1000);
	//setTimeout("muteAudioOff()", delayInMs);
	
	setTimeout("quietAudio()", 1000);
	setTimeout("loudAudio()", delayInMs);
	
	let delIncr = 6000;
	let loops = Number(quantity.value) * 10;
	
	for (let i=0;i<loops;i++) {
		let delay = delIncr * i
		setTimeout("playAudio()", delay);
	}
	
	
	
}








