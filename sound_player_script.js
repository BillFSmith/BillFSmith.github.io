const buttonRand = document.querySelector('#buttonRand');
const playSound = document.querySelector("#playSound");
const quantity = document.querySelector("#quantity");

buttonRand.onclick = playFun;

// let delIncr = 6000;

function playAudio() {
  playSound.play();
}

function delButtonText() {
  buttonRand.innerText = "finished"
}

function playFun() {	

	delayInMs = Number(quantity.value) * 1000 * 60;
	//buttonRand.innerText = "playing (click to restart)"
	buttonRand.innerText = delayInMs;
	setTimeout("playAudio()", 0);
	setTimeout("playAudio()", 6000);
	setTimeout("playAudio()", delayInMs);
	
	
	/*for (let i=0;i<100;i++) {
		let delay = delIncr * i
		setTimeout("playAudio()", delay);
		
	}*/
}








