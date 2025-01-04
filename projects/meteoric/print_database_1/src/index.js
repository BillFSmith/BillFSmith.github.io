import { initializeApp } from 'firebase/app'
import {
	getFirestore, collection, getDocs, getDoc, onSnapshot,
	addDoc, deleteDoc, doc, ref, set, updateDoc, setDoc,
	deleteField
} from 'firebase/firestore'

const firebaseConfig = {
	apiKey: "AIzaSyB7-_7m3DxutYZGaVoxJbMqjyVvMc4riXo",  
	authDomain: "databasedisplay.firebaseapp.com",  
	projectId: "databasedisplay",  
	storageBucket: "databasedisplay.firebasestorage.app",  
	messagingSenderId: "1062120311778",  
	appId: "1:1062120311778:web:f3c4025c9407ce1f1047bb"  
  };
  

initializeApp(firebaseConfig)

const db = getFirestore()

let formIDnumber = ""
// formIDButton.onclick = async function() {
// 	formIDnumber = newIDValue.value
// }


let columnsCount = 1
// let columnsCount = 1
// let rowsCount = 1
let rowsCount = 5

const voteLabels = {
	Loathe: 0,
	Dislike: 1,
	Neutral: 2,
	Like: 3,
	Love: 4,
	0: "Loathe",
	1: "Dislike",
	2: "Neutral",
	3: "Like",
	4: "Love",
}
const voteColours = {
	0: "#F1C2D1",
	1: "#FFDBAD",
	2: "#E4E0D7",
	3: "#C1FF9F",
	4: "#84FD96",
}

window.totalUp = function() {
	var elements = document.getElementById('buttonRow').children
	let colTotals = new Array(columnsCount-1)
	for(var j=1; j<columnsCount;j++){		
		var totalVis = false
		let colTotal = 0
		for (var i=5; i<rowsCount;i++){
			colTotal += voteLabels[elements[[i, j].toString()].innerHTML] - 2
			if (voteLabels[elements[[i, j].toString()].innerHTML] - 2 !== 0){
				totalVis = true
			}
		}
		document.getElementById('buttonRow').children[[0, j].toString()].innerHTML = colTotal
		document.getElementById('buttonRow').children[[0, j].toString()].style.backgroundColor = "rgba(255, 255, 255, 0.8)"
		
		if (totalVis) {
			document.getElementById('buttonRow').children[[0, j].toString()].style.visibility = "visible"
		}
		else {
			document.getElementById('buttonRow').children[[0, j].toString()].style.visibility = "hidden"
		}
		colTotals[j-1] = colTotal
	}

	let bestTotal = Math.max(...colTotals)
	for(var j=1; j<columnsCount;j++){
		if (colTotals[j-1] == bestTotal) {
			document.getElementById('buttonRow').children[[0, j].toString()].style.backgroundColor = "#84FD96"
		}
	}
}

// vote button press
window.voteButtonPress = async function(el) {
	let voteLabelNum = voteLabels[el.innerHTML]
	voteLabelNum += 1
	voteLabelNum = voteLabelNum % 5
	el.innerHTML = voteLabels[voteLabelNum]
	el.style.backgroundColor = voteColours[voteLabelNum]
	totalUp()

	const formRef = doc(db, "formData", formIDnumber)
	await updateDoc(formRef, {
		[el.id]: voteLabelNum,
	})
	// console.log(el.id)
	// console.log(el.id[0])
	// console.log(el.id[1])
	// console.log(el.id.split(',')[0])
	// console.log(el.id.split(',')[1])
	// document.getElementById('buttonRow').children[[0, el.id.split(',')[1]].toString()].style.visibility = "visible"	
}

window.activityModify = async function(el) {
	const formRef = doc(db, "formData", formIDnumber)
	await updateDoc(formRef, {
		[el.srcElement.id]: el.srcElement.value,
	})
}

window.nameModify = async function(el) {
	console.log("name changed")
	const formRef = doc(db, "formData", formIDnumber)
	await updateDoc(formRef, {
		[el.srcElement.id]: el.srcElement.value,
	})
}


window.newTextBox = function(rowNum, colNum, placeText, textType, listenFunction, newText) {
	console.log("new text box")
	let stringID = [rowNum-1, colNum-1].toString()

	if (document.getElementById('buttonRow').children.hasOwnProperty(stringID)){
		textfield.value = newText
	} else {
		var textfield = document.createElement("input");
		textfield.className = "grid-item"
		textfield.addEventListener("change", listenFunction);
		textfield.type = textType
		textfield.value = "";
		textfield.placeholder = placeText
		textfield.style.gridRow = rowNum
		textfield.style.gridColumn = colNum
		textfield.id = [rowNum-1, colNum-1].toString()
		document.getElementById('buttonRow').appendChild(textfield)
	}
}

window.newButtonBox = function(rowNum, colNum, newInner) {

	let stringID = [rowNum-1, colNum-1].toString()
	if (document.getElementById('buttonRow').children.hasOwnProperty(stringID)){
		textfield.innerHTML = newInner

	} else {
		var textfield = document.createElement("button");
		textfield.className = "grid-button"
		textfield.setAttribute("onclick","voteButtonPress(this);");
		textfield.innerHTML = "Neutral";
		textfield.style.gridRow = rowNum
		textfield.style.gridColumn = colNum
		textfield.id = [rowNum-1, colNum-1].toString()
		document.getElementById('buttonRow').appendChild(textfield)
	}
}

window.newDivBox = function(rowNum, colNum) {
		
	let stringID = [rowNum-1, colNum-1].toString()
	if (document.getElementById('buttonRow').children.hasOwnProperty(stringID)){
		newDiv.innerHTML = 0
		// newDiv.style.visibility = "hidden"

	} else {
		const newDiv = document.createElement("div");
		newDiv.innerHTML = 0
		newDiv.style.gridRow = rowNum
		newDiv.style.gridColumn = colNum
		newDiv.className = "grid-item"
		newDiv.id = [rowNum-1, colNum-1].toString()
		// if (rowNum === 1) {
		// 	newDiv.style.visibility = "hidden"
		// }

		document.getElementById('buttonRow').appendChild(newDiv)
	}
}


// new row
const newRowButton = document.getElementById("newRowButton")
newRowButton.onclick = async function newRow() {
	if (rowsCount < 50) {
		console.log("new row button pressed")
		// newTextBox(rowsCount + 1, 1, "name", "text", nameModify)
		
		// for(var i=0;i<columnsCount-1;i++) {
		// 	newButtonBox(rowsCount+1, i+2)
		// }	

		// rowsCount += 1
		
		const formRef = doc(db, "formData", formIDnumber)
		await updateDoc(formRef, {
			rows: rowsCount+1,
		})
	}
	// document.getElementById("delRowButton").style.visibility = "visible"
}

// new column
let activityBoxes = ["date", "time", "place", "activity"]
const newColButton = document.getElementById("newColButton")
newColButton.onclick = async function newCol() {
	if (columnsCount < 50) {
		console.log("new column button pressed")

		// newDivBox(1, columnsCount+1)
		// newTextBox(2, columnsCount+1, "", "date", activityModify)
		// newTextBox(3, columnsCount+1, "", "time", activityModify)
		// newTextBox(4, columnsCount+1, "place", "text", activityModify)
		// newTextBox(5, columnsCount+1, "activity", "text", activityModify)

		// document.getElementById('buttonRow').style.gridTemplateColumns = `repeat(${columnsCount+1}, 1fr)`

		// for(var i=0;i<rowsCount-5;i++) {
		// 	newButtonBox(6 + i, columnsCount+1)
		// }	

		// columnsCount += 1

		const formRef = doc(db, "formData", formIDnumber)
		await updateDoc(formRef, {
			columns: columnsCount+1,
		})
	}
	// document.getElementById("delColButton").style.visibility = "visible"
}


const delRowButton = document.getElementById("delRowButton")
delRowButton.onclick = async function rowDelete() {
	var elements = document.getElementById('buttonRow').children
	console.log("delRowButton pressed")
	console.log(elements)
	if (rowsCount > 5) {
		// console.log(rowsCount)
		// const parent = document.getElementById("buttonRow");
		// for (var i = 0; i<columnsCount; i++) {
			
		// 	const child = document.getElementById([rowsCount-1, i].toString());
		// 	const throwawayNode = parent.removeChild(child);
		// }

		// rowsCount -= 1 

		totalUp()

		const formRef = doc(db, "formData", formIDnumber)
		await updateDoc(formRef, {
			rows: rowsCount-1,
		})		

		for (var i=0; i<columnsCount; i++){
			const formRef = doc(db, "formData", formIDnumber)
			await updateDoc(formRef, {
				[[rowsCount, i]]: deleteField(),
			})
		}
	}
}

//delete column
const delColButton = document.getElementById("delColButton")
delColButton.onclick = async function colDelete() {
	if (columnsCount > 1) {
		// const parent = document.getElementById("buttonRow");
		// for (var i = 0; i<rowsCount; i++) {
		// 	const child = document.getElementById([i, columnsCount-1].toString());
		// 	const throwawayNode = parent.removeChild(child);
		// }

		// columnsCount -= 1
		// document.getElementById('buttonRow').style.gridTemplateColumns = `repeat(${columnsCount}, 1fr)`

		const formRef = doc(db, "formData", formIDnumber)
		await updateDoc(formRef, {
			columns: columnsCount-1,
		})

		for (var i=0; i<rowsCount; i++){
			await updateDoc(formRef, {
				[[i, columnsCount]]: deleteField(),
			})
		}
	}
}

// // LOAD
// document.getElementById("loadIDValue").value = "L4NO0jHUxRyXyid4bylW"
// const loadIDButton = document.getElementById("loadIDButton")
// loadIDButton.onclick = async function loadID() {
// 	const loadIDValue = document.getElementById("loadIDValue").value
// 	formIDnumber = loadIDValue

// 	console.log("load")

// 	const docRef = doc(db, "formData", loadIDValue);
// 	// const docRef = doc(db, "formData", "0uOCdBiFHNUlHcSfq6F0");
// 	// const docRef = doc(db, "formData", "mjBhpCalnlCD08nYkzVS");
// 	const docSnap = await getDoc(docRef);
// 	const docSnapData = docSnap.data()
// 	columnsCount = docSnapData.columns
// 	const columns = docSnapData.columns
// 	rowsCount = docSnapData.rows
// 	const rows = docSnapData.rows
// 	console.log("Document:", docSnap)
// 	console.log("Document data:", docSnap.data())
// 	console.log("columns:", columns)
// 	console.log("rows:", rows)

// 	for (var j=2; j<columns+1; j++){
// 		newDivBox(1, j)
// 		newTextBox(2, j, "", "date", activityModify)
// 		newTextBox(3, j, "", "time", activityModify)
// 		newTextBox(4, j, "place", "text", activityModify)
// 		newTextBox(5, j, "activity", "text", activityModify)
// 	}
	
// 	for (var j=6; j<rows+1; j++){
// 		newTextBox(j, 1, "name", "text", nameModify)
	
// 		for(var i=0;i<columnsCount-1;i++) {
// 			newButtonBox(j, i+2)
// 		}	
// 	}

// 	for (const [key, value] of Object.entries(docSnapData)){
// 		if (key != "rows" && key != "columns") {
// 			let keyString = key.toString()

// 			if (document.getElementById('buttonRow').children[keyString].localName == "button"){
// 				document.getElementById('buttonRow').children[keyString].innerHTML = voteLabels[value]
// 				document.getElementById('buttonRow').children[keyString].style.backgroundColor = voteColours[value]
// 			} else {
// 				document.getElementById('buttonRow').children[keyString].value = value
// 			}
// 		}
// 	}
// }


// //realtime collection data
// const colRef = collection(db, 'formData')

// onSnapshot(colRef, (snapshot)=>{
//   let books = []
//   snapshot.docs.forEach((doc) => {
// 	books.push({...doc.data(), id: doc.id})
//   })
// 	console.log(books)
// 	// authorOne.elements.id1.value = books[0].id
// 	// authorOne.elements.author1.value = books[0].author
// 	// authorTwo.elements.author2.value = books[0].author
// 	// authorOne.elements.title1.value = books[0].title	
// 	// authorTwo.elements.title2.value = books[0].title	
// })

// const colRef = doc(db, 'formData',"L4NO0jHUxRyXyid4bylW")

// onSnapshot(colRef, (snapshot)=>{
//   let books = []
//   snapshot.docs.forEach((doc) => {
// 	books.push({...doc.data(), id: doc.id})
//   })
// 	console.log(books)
// 	// authorOne.elements.id1.value = books[0].id
// 	// authorOne.elements.author1.value = books[0].author
// 	// authorTwo.elements.author2.value = books[0].author
// 	// authorOne.elements.title1.value = books[0].title	
// 	// authorTwo.elements.title2.value = books[0].title	
// })

// const unsub = onSnapshot(doc(db, 'formData',"L4NO0jHUxRyXyid4bylW"), (doc) => {
//     console.log("Current doc: ", doc);
//     console.log("Current data: ", doc.data());
//     console.log("new columns: ", doc.data().columns);
// 	const newColumns = doc.data().columns
// 	if (newColumns > columnsCount) {
// 		for (var i; i<newColumns-columnsCount; i++){
			
// 		}
// 	}

// 	// const newColumns = doc.data().columns
// });



// const unsubTwo = onSnapshot(doc(db, 'formData',"L4NO0jHUxRyXyid4bylW"), (doc) => {

// 	const docSnapData = doc.data()
// 	columnsCount = docSnapData.columns
// 	const columns = docSnapData.columns
// 	rowsCount = docSnapData.rows
// 	const rows = docSnapData.rows
// 	// console.log("Document:", docSnap)
// 	// console.log("Document data:", docSnap.data())
// 	console.log("columns:", columns)
// 	console.log("rows:", rows)

// 	for (var j=2; j<columns+1; j++){
// 		newDivBox(1, j)
// 		newTextBox(2, j, "", "date", activityModify)
// 		newTextBox(3, j, "", "time", activityModify)
// 		newTextBox(4, j, "place", "text", activityModify)
// 		newTextBox(5, j, "activity", "text", activityModify)
// 	}
	
// 	for (var j=6; j<rows+1; j++){
// 		newTextBox(j, 1, "name", "text", nameModify)
	
// 		for(var i=0;i<columnsCount-1;i++) {
// 			newButtonBox(j, i+2)
// 		}	
// 	}

// 	for (const [key, value] of Object.entries(docSnapData)){
// 		if (key != "rows" && key != "columns") {
// 			let keyString = key.toString()

// 			if (document.getElementById('buttonRow').children[keyString].localName == "button"){
// 				document.getElementById('buttonRow').children[keyString].innerHTML = voteLabels[value]
// 				document.getElementById('buttonRow').children[keyString].style.backgroundColor = voteColours[value]
// 			} else {
// 				document.getElementById('buttonRow').children[keyString].value = value
// 			}
// 		}
// 	}
// })

// document.getElementById("loadIDValue").value = "Su3KKWO7k5V8qCQhZXRS"
// const loadIDButton = document.getElementById("loadIDButton")
// const loadIDValue = document.getElementById("loadIDValue").value
// formIDnumber = loadIDValue

// const unsubThree = onSnapshot(doc(db, 'formData',"Su3KKWO7k5V8qCQhZXRS"), (doc) => {

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const urlCode = urlParams.get('link')

// document.getElementById("loadIDValue").value = "urlCode"
// const loadIDButton = document.getElementById("loadIDButton")
// const loadIDValue = document.getElementById("loadIDValue").value
formIDnumber = urlCode

const unsubThree = onSnapshot(doc(db, 'formData',formIDnumber), (doc) => {


	const docSnapData = doc.data()
	// columnsCount = docSnapData.columns
	const columns = docSnapData.columns
	// rowsCount = docSnapData.rows
	const rows = docSnapData.rows
	// console.log("Document:", docSnap)
	// console.log("Document data:", docSnap.data())
	console.log("columnsCount:", columnsCount)
	console.log("columns:", columns)
	console.log("rowsCount:", rowsCount)
	console.log("rows:", rows)

	if (rows > 5) {
		document.getElementById("delRowButton").style.visibility = "visible"
	} else {
		document.getElementById("delRowButton").style.visibility = "hidden"
	}

	if (columns > 1) {
		document.getElementById("delColButton").style.visibility = "visible"
	} else {
		document.getElementById("delColButton").style.visibility = "hidden"
	}


	// for (var j=2; j<columns+1; j++){
	if (columns > columnsCount) {
		// for (var j=columnsCount; j<columns+1; j++){
		for (var j=columnsCount+1; j<columns+1; j++){
			newDivBox(1, j)
			newTextBox(2, j, "", "date", activityModify, "")
			newTextBox(3, j, "", "time", activityModify, "")
			newTextBox(4, j, "place", "text", activityModify, "")
			newTextBox(5, j, "activity", "text", activityModify, "")
			for(var i=6;i<rowsCount+1;i++) {
				newButtonBox(i, j, "Neutral")
			}	
		}
	} else if (columns < rowsCount) {
		// const parent = document.getElementById("buttonRow");
		for (var i = 0; i<rows; i++) {
			for (var j = columns; j<columnsCount; j++) {
				// for (var j = columnsCount; j>columns; j--) {
				// const child = document.getElementById([i, j].toString());
				// const throwawayNode = parent.removeChild(child);			
				// if (document.getElementById('buttonRow').children.hasOwnProperty([i, j].toString())){

					document.getElementById("buttonRow").removeChild(document.getElementById([i, j].toString()))
				// }
			}
		}
	}

	document.getElementById('buttonRow').style.gridTemplateColumns = `repeat(${columns}, 1fr)`
	
	if (rows > rowsCount) {
		// for (var j=6; j<rows+1; j++){
		for (var j=rowsCount+1; j<rows+1; j++){
			newTextBox(j, 1, "name", "text", nameModify, "")
		
			// for(var i=0;i<columnsCount-1;i++) {
			// for(var i=columnsCount;i<columns-1;i++) {
			for(var i=2;i<columns+1;i++) {
				newButtonBox(j, i, "Neutral")
			}	
		}
	} else if (rows < rowsCount) {
		// const parent = document.getElementById("buttonRow");
		for (var i = rows; i<rowsCount; i++) {
			for (var j = 0; j<columns; j++) {
				// const child = document.getElementById([i, j].toString());
				// const throwawayNode = parent.removeChild(child);
				document.getElementById("buttonRow").removeChild(document.getElementById([i, j].toString()))

			}
		}
	}

	for (const [key, value] of Object.entries(docSnapData)){
		if (key != "rows" && key != "columns") {
			let keyString = key.toString()

			if (document.getElementById('buttonRow').children.hasOwnProperty(keyString)){
				if (document.getElementById('buttonRow').children[keyString].localName == "button"){
					document.getElementById('buttonRow').children[keyString].innerHTML = voteLabels[value]
					document.getElementById('buttonRow').children[keyString].style.backgroundColor = voteColours[value]
				} else {
					document.getElementById('buttonRow').children[keyString].value = value
				}
			}
		}
	}

	columnsCount = docSnapData.columns
	// const columns = docSnapData.columns
	rowsCount = docSnapData.rows
	totalUp()

})



/// delete original grid when loading a new one
/// look up whether functions should be async/await or not
/// sanitise inputs
/// restrict length of text
/// work out why there's double the elements

/// add buttons when adding column
/// add buttons when adding row
/// update code so if textbox already there then just update the value
/// update code so if button already there then just update the value



/// 127.0.0.1:5500/public/index.html?link=Su3KKWO7k5V8qCQhZXRS