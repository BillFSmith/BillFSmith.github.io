const buttonRand = document.querySelector('#buttonRand');
const playSound = document.querySelector("#playSound");
const quantity = document.querySelector("#quantity");

buttonRand.onclick = playFun;

// let delIncr = 6000;

function playAudio() {
  playSound.play();
}

function delButtonText(text) {
  buttonRand.innerText = text
}

function printIt(text){
	buttonRand.innerText = text
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
	
	
	
	/*for (let i=0;i<100;i++) {
		let delay = delIncr * i
		setTimeout("playAudio()", delay);
		
	}*/
}








