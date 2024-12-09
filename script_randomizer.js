const buttonRand = document.querySelector('#buttonRand');
const buttonDelete = document.querySelector('#buttonDelete');
const textList = document.querySelector("#textbox");
const animToggle = document.querySelector("#animations-toggle");

buttonRand.onclick = randFun;
buttonDelete.onclick = delFun;
animToggle.onclick = animToggleFun;

let delIncr = 100;
let randIncr = 400;

function animToggleFun() {
  if (animToggle.innerText === "turn off animation") {
    buttonRand.value = "toggle a";
    delIncr = 0;
    randIncr = 0;  
    animToggle.innerText = "turn on animation"  
    document.getElementById("animations-toggle").style.color = "#ff8427";
  } else {
    buttonRand.value = "toggle b";
    delIncr = 50;
    randIncr = 100;
    animToggle.innerText = "turn off animation"  
    document.getElementById("animations-toggle").style.color = "#4d8b31";
  }
}

function randFun() {
  let listByLineAll = textList.value.split(/\r?\n/);
  let listByLine = []
  
  for (let i=0; i<listByLineAll.length; i++){
  	if (listByLineAll[i] != "") {
  	listByLine.push(listByLineAll[i])
  	}	
  }
     
  const lines = listByLine.length;
  let chosenIndex = 0
  let randomList = []
  
  let randDelay = 0;
  
  for (let i=lines; i>0; i--){
    chosenIndex = Math.floor(Math.random() * i)
    randomList.push(listByLine[chosenIndex])
    listByLine = listByLine.slice(0,chosenIndex).concat(listByLine.slice(chosenIndex+1, chosenIndex.length))
//    setTimeout(textList.value = randomList, 1000);

    //let outputList = randomList.join("\r\n");
    //myDisplay(outputList);    
    let outputArray = []
    for (let j=0; j<lines; j++){
    	if (j<lines-randomList.length) {
    		outputArray.push("")
    	} else {
    		outputArray.push(randomList[lines-j-1])
    	}
    }
    let outputList = outputArray.join("\r\n");
    
    printToBox(outputList, randDelay);
    randDelay += randIncr;  	
  }

//  let outputList = randomList.join("\r\n");
  //textList.value = outputList;
  
  
}


async function myDisplay(outputList) {
  let myPromise = new Promise(function(resolve) {
    setTimeout(function() {resolve(outputList);}, 1000);
  });
  textList.value = await myPromise;
}

function delFun() {
  let listByLineAll = textList.value.split(/\r?\n/);
  let listByLine = []
  
  for (let i=0; i<listByLineAll.length; i++){
  	if (listByLineAll[i] != "") {
  	listByLine.push(listByLineAll[i])
  	}	
  }
  
  const lines = listByLine.length;
  let chosenIndex = Math.floor(Math.random() * lines)

  //myDisplay(outputList);

  let delDelay = 0;
  
  for (let i=listByLine[chosenIndex].length; i>0; i--){
  	listByLine[chosenIndex] = listByLine[chosenIndex].slice(0,i);
  	let outputList = listByLine.join("\r\n");
  	
  	printToBox(outputList, delDelay);
  	//printToBox(i, delDelay);
  	delDelay += delIncr;  	
  }
  listByLine = listByLine.slice(0,chosenIndex).concat(listByLine.slice(chosenIndex+1, chosenIndex.length))
  let outputList = listByLine.join("\r\n");
  printToBox(outputList, delDelay);
  
}

function printIt(text){
	textList.value = text
}

function printToBox(text, delay) {
	setTimeout(printIt, delay,text);
}



