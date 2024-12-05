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

// const colRef = collection(db, 'books')
// const colRef = collection(db, 'formData')

// new form
const newFormValue = document.getElementById("newFormValue")
const newFormButton = document.getElementById("newFormButton")
const newIDValue = document.getElementById("newIDValue")
const formIDButton = document.getElementById("formIDButton")
// newFormButton.onclick = async function newForm() {
// 	// const docRef = await addDoc(collection(db, "formData"), {
// 	// 	name: "Tokyo",
// 	// 	country: "Japan"
// 	//   });

// 	const docRef = await addDoc(collection(db, "formData"), {
// 		// name: "Tokyo",
// 		// country: "Japan"
// 	});
// 	//   console.log("Document written with ID: ", docRef.id);
// 	  newFormValue.value = docRef.id

// 	const testCollection = collection(db, "formData", docRef.id, "userData");
// 	addDoc(testCollection, { title: "hello world"})

// }


newFormButton.onclick = async function newForm() {
	const docRef = await addDoc(collection(db, "formData"), {
		rows: 0,
		columns: 0,
	});
	newFormValue.value = docRef.id
	newIDValue.value = docRef.id
	const testCollection = collection(db, "formData", docRef.id, "userData");
	addDoc(testCollection, { title: "hello"})
}

let formIDnumber = ""
formIDButton.onclick = async function() {
	formIDnumber = newIDValue.value
	// var elements = document.getElementById('buttonRow').children
	// console.log(elements)
	// console.log(typeof elements)
}


// const colRef = collection(db, 'formData')

// //one time data collection
// /*
// getDocs(colRef)
//   .then((snapshot) => {
// 	let books = []
// 	snapshot.docs.forEach((doc) => {
//   	books.push({...doc.data(), id: doc.id})
// 	})
// 	console.log(books)
//   })
// .catch(err => {
//   console.log(err.message)
// })
// */

// const authorOne = document.querySelector('.book1')
// const authorTwo = document.querySelector('.book2')

// //realtime collection data
// onSnapshot(colRef, (snapshot)=>{
//   let books = []
//   snapshot.docs.forEach((doc) => {
// 	books.push({...doc.data(), id: doc.id})
//   })
// 	console.log(books)
// 	authorOne.elements.id1.value = books[0].id
// 	authorOne.elements.author1.value = books[0].author
// 	authorTwo.elements.author2.value = books[0].author
// 	authorOne.elements.title1.value = books[0].title	
// 	authorTwo.elements.title2.value = books[0].title	
// })



// const updateForm = document.querySelector('.book1')
// updateForm.addEventListener('submit', (e) =>{
//   e.preventDefault()

//   const docRef1 = doc(db, 'books', updateForm.id1.value)
//   //const docRef1 = "NUWgDf0iWS3JbWrPejwT"

//   setDoc(docRef1, {
// 	author: authorOne.elements.author1.value
//   });

// })



// const addBookForm = document.querySelector('.add')
// addBookForm.addEventListener('submit', (e) => {
//   e.preventDefault()
//   addDoc(colRef, {
// 	title: addBookForm.title.value,
// 	author: addBookForm.author.value,

//   })
//   .then(()=>{
// 	addBookForm.reset()
//   })
// })

// const deleteBookForm = document.querySelector('.delete')
// deleteBookForm.addEventListener('submit', (e) =>{
//   e.preventDefault()

//   const docRef = doc(db, 'books', deleteBookForm.id.value)

//   deleteDoc(docRef)
// 	.then(()=> {
//   	deleteBookForm.reset()
// 	})

// })





// function testFun() {
//     /*Getting the number of text fields*/
//     var no = document.getElementById("idname").value;
//     /*Generating text fields dynamically in the same form itself*/
//     for(var i=0;i<no;i++) {
//         var textfield = document.createElement("input");
//         textfield.type = "text";
//         textfield.value = "";
//         document.getElementById('form').appendChild(textfield);
//     }
// }
// window.testFun = testFun;

let columnsCount = 1
let rowsCount = 5

// let dict = new Map();
// dict.set([0, 0].toString(), 0)
// dict.set([1, 0].toString(), 1)
// dict.set([2, 0].toString(), 2)
// dict.set([3, 0].toString(), 3)
// consider weakMap instead of .toString

// let cellCount = 1


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

// const totalsButton = document.getElementById("totalsButton")
window.totalUp = function() {
// totalsButton.onclick = function totalUp() {
	var elements = document.getElementById('buttonRow').children
	// console.log(elements)
	// console.log(elements.length)
	// console.log(elements[[5, 1].toString()])
	// let bestTotal = -100000
	// let bestColumn = 1
	let colTotals = new Array(columnsCount-1)
	for(var j=1; j<columnsCount;j++){		
		let colTotal = 0
		for (var i=5; i<rowsCount;i++){
		// console.log([i, j].toString())	
			// console.log([i, j].toString())	

			colTotal += voteLabels[elements[[i, j].toString()].innerHTML] - 2
		}
		// console.log(colTotal)
		// elements[[0, j].toString()] = colTotal
		document.getElementById('buttonRow').children[[0, j].toString()].innerHTML = colTotal
		document.getElementById('buttonRow').children[[0, j].toString()].style.backgroundColor = "rgba(255, 255, 255, 0.8)"
		// if (bestTotal < colTotal) {
		// 	bestTotal = colTotal
		// 	bestColumn = j
		// }
		colTotals[j-1] = colTotal
	}

	let bestTotal = Math.max(...colTotals)
	for(var j=1; j<columnsCount;j++){
		if (colTotals[j-1] == bestTotal) {
			document.getElementById('buttonRow').children[[0, j].toString()].style.backgroundColor = "#84FD96"
		}
	}
}

//html id to firestore id
let web2Firestore = {}

// vote button press
window.voteButtonPress = async function(el) {
	// console.log("vote button pressed")
	// el.innerHTML = "pressed"
	let voteLabelNum = voteLabels[el.innerHTML]
	voteLabelNum += 1
	voteLabelNum = voteLabelNum % 5
	el.innerHTML = voteLabels[voteLabelNum]
	el.style.backgroundColor = voteColours[voteLabelNum]
	totalUp()

	// console.log("testing")
	const buttonID = el.id
	const columnNum = el.id.split(",")[1]
	const rowNum = el.id.split(",")[0]

	const formRef = doc(db, "formData", formIDnumber)
	await updateDoc(formRef, {
		[el.id]: voteLabelNum,
	})
	// console.log(buttonID)

	let userID = buttonID.split(",")
	// userID[1] = 0
	// console.log(userID)

	userID = [userID[0], 0].toString()
	// console.log(userID)
	
	if (web2Firestore.hasOwnProperty(userID)){
		const firestoreID = web2Firestore[userID]
		// console.log(firestoreID)
		const testCollection = doc(db, "formData", formIDnumber, "userData", firestoreID);

		// var obj = {}
		// obj[buttonID] = voteLabelNum
		await updateDoc(testCollection, {
			// [buttonID]: voteLabelNum,
			[columnNum]: voteLabelNum,
		})
	} else {
		const testCollection = collection(db, "formData", formIDnumber, "userData");
		const testUser = await addDoc(testCollection, { 
			[columnNum]: voteLabelNum,
			username: "",
			row: rowNum,
			// webID: IDString,
		})
		web2Firestore[userID] = testUser.id
	}

}

// if (web2Firestore.hasOwnProperty(el.srcElement.id)){
// 	const firestoreID = web2Firestore[el.srcElement.id]
// 	// console.log(firestoreID)
// 	const testCollection = doc(db, "formData", formIDnumber, "userData", firestoreID);

// 	await updateDoc(testCollection, {
// 		username: el.srcElement.value,
// 	})
// } else {
// 	const IDString = el.srcElement.id
// 	const testCollection = collection(db, "formData", formIDnumber, "userData");
// 	const testUser = await addDoc(testCollection, { 
// 		username: el.srcElement.value,
// 		row: IDString.split(",")[0],
// 		// webID: IDString,
// 	})
// 	web2Firestore[IDString] = testUser.id
// 	// console.log(IDString)
// 	// console.log(testCollection.id)
// 	// console.log(testUser.id)
// 	// console.log(web2Firestore)
// }





const labelDict = {
	1: "date",
	2: "time",
	3: "place",
	4: "activity",
}


window.activityModify = async function(el) {
	console.log("activity changed")
	// console.log(el)
	// console.log(el.srcElement)

	const columnNum = el.srcElement.id.split(",")[1]
	const label = labelDict[el.srcElement.id.split(",")[0]]
	const columnTop = [1, columnNum].toString( )

	const formRef = doc(db, "formData", formIDnumber)
	await updateDoc(formRef, {
		[el.srcElement.id]: el.srcElement.value,
	})

	// if (web2Firestore.hasOwnProperty(el.srcElement.id)){
	if (web2Firestore.hasOwnProperty(columnTop)){
		const firestoreID = web2Firestore[columnTop]
		// console.log(firestoreID)
		const testCollection = doc(db, "formData", formIDnumber, "activityData", firestoreID);

		await updateDoc(testCollection, {
			[label]: el.srcElement.value,
		})
	} else {
		const IDString = columnTop
		const testCollection = collection(db, "formData", formIDnumber, "activityData");
		const testUser = await addDoc(testCollection, { 
			[label]: el.srcElement.value,
			column: columnNum,
			webID: IDString,
		})
		web2Firestore[IDString] = testUser.id
		// console.log(IDString)
		// console.log(testCollection.id)
		// console.log(testUser.id)
		// console.log(web2Firestore)
	}
}


window.nameModify = async function(el) {
	console.log("name changed")
	// console.log(el)
	// console.log(el.srcElement)

	const formRef = doc(db, "formData", formIDnumber)
	await updateDoc(formRef, {
		[el.srcElement.id]: el.srcElement.value,
	})

	if (web2Firestore.hasOwnProperty(el.srcElement.id)){
		const firestoreID = web2Firestore[el.srcElement.id]
		// console.log(firestoreID)
		const testCollection = doc(db, "formData", formIDnumber, "userData", firestoreID);

		await updateDoc(testCollection, {
			username: el.srcElement.value,
		})
	} else {
		const IDString = el.srcElement.id
		const testCollection = collection(db, "formData", formIDnumber, "userData");
		const testUser = await addDoc(testCollection, { 
			username: el.srcElement.value,
			row: IDString.split(",")[0],
			// webID: IDString,
		})
		web2Firestore[IDString] = testUser.id
		// console.log(IDString)
		// console.log(testCollection.id)
		// console.log(testUser.id)
		// console.log(web2Firestore)
	}
}


//var d = document.getElementsByClassName(".grid-container");
const container = document.getElementById('buttonRow')

// new row
const newRowButton = document.getElementById("newRowButton")
newRowButton.onclick = async function newRow() {
	if (rowsCount < 50) {
		console.log("new row button pressed")
		var rowNum = rowsCount + 1
		var colNum = 1
		var textfield = document.createElement("input");
		textfield.className = "grid-item"
		// textfield.setAttribute("onclick","nameModify(this);");
		textfield.addEventListener("change", nameModify);
		textfield.type = "text";
		textfield.value = "";
		textfield.placeholder = "name"
		textfield.style.gridRow = rowNum
		textfield.style.gridColumn = colNum
		// dict.set([rowNum-1, colNum-1].toString(), cellCount);
		textfield.id = [rowNum-1, colNum-1].toString()

		document.getElementById('buttonRow').appendChild(textfield)
		// cellCount += 1

		// const IDString = [rowNum-1, colNum-1].toString()
		// const testCollection = collection(db, "formData", formIDnumber, "userData");
		// const testUser = await addDoc(testCollection, { 
		// 	username: "",
		// 	webID: IDString,
		// 	// webID: [rowNum-1, colNum-1].toString(),
		// })
		// web2Firestore[IDString] = testUser.id
		// console.log(IDString)
		// console.log(testCollection.id)
		// console.log(testUser.id)
		// console.log(web2Firestore)
		
		for(var i=0;i<columnsCount-1;i++) {
			var rowNum = rowsCount + 1
			var colNum = i+2
			var textfield = document.createElement("button");
			textfield.className = "grid-button"
			// textfield.onclick = console.log("pref button")
			textfield.setAttribute("onclick","voteButtonPress(this);");
			//textfield.type = "text";
			textfield.innerHTML = "Neutral";
			textfield.style.gridRow = rowNum
			textfield.style.gridColumn = colNum
			// dict.set([rowNum-1, colNum-1].toString(), cellCount);
			textfield.id = [rowNum-1, colNum-1].toString()

			document.getElementById('buttonRow').appendChild(textfield)
			// cellCount += 1
		}	

		rowsCount += 1
		// totalUp()
		
		const formRef = doc(db, "formData", formIDnumber)
		await updateDoc(formRef, {
			rows: rowsCount,
		})

	}
}

// let btn = document.getElementById("buttonOne")




// new column
let activityBoxes = ["date", "time", "place", "activity"]
const newColButton = document.getElementById("newColButton")
newColButton.onclick = async function newCol() {
	if (columnsCount < 50) {
		console.log("new column button pressed")

		// col total cell
		var rowNum = 1
		var colNum = columnsCount+1
		// dict.set([rowNum-1, colNum-1].toString(), cellCount);
		const newDiv = document.createElement("div");
		newDiv.innerHTML = 0
		newDiv.style.gridRow = rowNum
		newDiv.style.gridColumn = colNum
		newDiv.className = "grid-item"
		newDiv.id = [rowNum-1, colNum-1].toString()
		document.getElementById('buttonRow').appendChild(newDiv)
		// cellCount += 1

		// date cell
		var rowNum = 2
		var colNum = columnsCount+1
		var textfield = document.createElement("input");
		textfield.addEventListener("change", activityModify);
		textfield.type = "date";
		textfield.className = "grid-item"
		// textfield.value = "";
		// textfield.placeholder = activityBoxes[i-1];
		// textfield.value = cellCount;
		textfield.style.gridRow = rowNum
		textfield.style.gridColumn = colNum
		// dict.set([rowNum-1, colNum-1].toString(), cellCount);
		textfield.id = [rowNum-1, colNum-1].toString()
		
		document.getElementById('buttonRow').appendChild(textfield)
		// cellCount += 1

		// time cell
		var rowNum = 3
		var colNum = columnsCount+1
		var textfield = document.createElement("input");
		textfield.addEventListener("change", activityModify);
		textfield.type = "time";
		textfield.className = "grid-item"
		// textfield.value = "";
		// textfield.placeholder = activityBoxes[i-1];
		// textfield.value = cellCount;
		textfield.style.gridRow = rowNum
		textfield.style.gridColumn = colNum
		// dict.set([rowNum-1, colNum-1].toString(), cellCount);
		textfield.id = [rowNum-1, colNum-1].toString()
		
		document.getElementById('buttonRow').appendChild(textfield)
		// cellCount += 1

		for(var i=3;i<5;i++) {
			var rowNum = i+1
			var colNum = columnsCount+1
			var textfield = document.createElement("input");
			textfield.addEventListener("change", activityModify);
			textfield.type = "text";
			textfield.className = "grid-item"
			// textfield.value = "";
			textfield.placeholder = activityBoxes[i-1];
			// textfield.value = cellCount;
			textfield.style.gridRow = rowNum
			textfield.style.gridColumn = colNum
			// dict.set([rowNum-1, colNum-1].toString(), cellCount);
			textfield.id = [rowNum-1, colNum-1].toString()
			
			document.getElementById('buttonRow').appendChild(textfield)
			// cellCount += 1

			// var rowNum = i+1
			// var colNum = columnsCount+1
			// var textfield = document.createElement("div");
			// var newContent = document.createElement("input");
			// newContent.type = "text";
			// textfield.className = "grid-item"
			// // textfield.value = "";
			// newContent.value = cellCount;
			// textfield.style.gridRow = rowNum
			// textfield.style.gridColumn = colNum
			// dict.set([rowNum-1, colNum-1].toString(), cellCount);
			// textfield.id = [rowNum-1, colNum-1].toString()
			
			// textfield.appendChild(newContent)
			// document.getElementById('buttonRow').appendChild(textfield)
			// cellCount += 1
		}

		//container.style.gridTemplateColumns = "auto auto auto auto auto auto auto auto auto auto auto"
		// container.style.gridTemplateColumns = `repeat(${columnsCount+1}, auto)`
		container.style.gridTemplateColumns = `repeat(${columnsCount+1}, 1fr)`

		for(var i=0;i<rowsCount-5;i++) {
			var rowNum = 6 + i
			var colNum = columnsCount+1
			var textfield = document.createElement("button");
			textfield.className = "grid-button"
			textfield.setAttribute("onclick","voteButtonPress(this);");
			textfield.innerHTML = "Neutral";
			textfield.style.gridRow = rowNum
			textfield.style.gridColumn = colNum

			// dict.set([rowNum-1, colNum-1].toString(), cellCount);
			textfield.id = [rowNum-1, colNum-1].toString()

			document.getElementById('buttonRow').appendChild(textfield)
			// cellCount += 1
		}	

		columnsCount += 1
		// totalUp()

		const formRef = doc(db, "formData", formIDnumber)
		await updateDoc(formRef, {
			columns: columnsCount,
		})
	}
}

const testButton = document.getElementById("testButton")
testButton.onclick = function cellMod() {
	var elements = document.getElementById('buttonRow').children
	let n = 1
	elements.item(n).innerHTML = "asdfoij2wefij"
	// console.log(dict)
	// console.log(dict.keys())
}

const rowCol = document.getElementById("rowCol")
rowCol.onclick = function cellAddress() {
	var rowNum = document.getElementById('rowAdd').value
	var colNum = document.getElementById('colAdd').value
	// var cellNum = dict.get([rowNum, colNum].toString())
	var elements = document.getElementById('buttonRow').children
	elements.item(cellNum).innerHTML = "rowcolmod"
	elements.item(cellNum).value = "rowcolmod"
	// console.log(dict)
	// console.log(rowNum)
	// console.log(colNum)
	// console.log(cellNum)
}


const delRowButton = document.getElementById("delRowButton")
delRowButton.onclick = async function rowDelete() {
	var elements = document.getElementById('buttonRow').children
	console.log("delRowButton pressed")
	console.log(elements)
	if (rowsCount > 5) {
		console.log(rowsCount)
		const parent = document.getElementById("buttonRow");
		for (var i = 0; i<columnsCount; i++) {
			
			const child = document.getElementById([rowsCount-1, i].toString());
			const throwawayNode = parent.removeChild(child);
			// const keyString = [rowsCount-1, i].toString()
			// const throwawayNode = document.getElementById('buttonRow').removeChild[keyString]
		}

		// document.getElementById('buttonRow').children[keyString].value = value


		// const gridID = [rowsCount-1, 0].toString()
		// const dbID = web2Firestore[gridID]
		// console.log("grid id")
		// console.log(formIDnumber)
		// console.log(dbID)
		// await deleteDoc(doc(db, "formData", formIDnumber, "userData", dbID))

		// for (var i = 1; i<columnsCount; i++) {
		// 	const gridID = [rowsCount-1, i].toString()
		// 	const dbID = web2Firestore[gridID]
		// 	console.log("grid id")
		// 	console.log(gridID)
		// 	console.log(dbID)
		// 	await deleteDoc(doc(db, "formData", dbID, "userData", gridID))
		// }
		rowsCount -= 1 

		totalUp()

		const formRef = doc(db, "formData", formIDnumber)
		await updateDoc(formRef, {
			rows: rowsCount,
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
	// var elements = document.getElementById('buttonRow').children
	// console.log(elements)
	if (columnsCount > 1) {
		const parent = document.getElementById("buttonRow");
		for (var i = 0; i<rowsCount; i++) {
			const child = document.getElementById([i, columnsCount-1].toString());
			const throwawayNode = parent.removeChild(child);

			// const gridID = [i, columnsCount-1].toString()
			// const dbID = web2Firestore[gridID]
			// console.log(gridID)
			// console.log(dbID)
			// await deleteDoc(doc(db, "formData", dbID, "userData", gridID))
		}

		// const gridID = [1, columnsCount-1].toString()
		// if (web2Firestore.hasOwnProperty(gridID)){ 
		// 	const dbID = web2Firestore[gridID]
		// 	console.log("grid id")
		// 	console.log(web2Firestore)
		// 	console.log(gridID)
		// 	console.log(formIDnumber)
		// 	console.log(dbID)
		// 	await deleteDoc(doc(db, "formData", formIDnumber, "activityData", dbID))
		// }


		// for (var i=5; i<rowsCount; i++){
		// 	if (web2Firestore.hasOwnProperty([i, 0].toString())){  
		// 		const rowStartID = web2Firestore[[i, 0].toString()]
		// 		// await updateDoc(doc(db, "formData", formIDnumber, "userData", rowStartID), {
		// 		// 	foo:bar,
		// 		// })
		// 		console.log("row del")
		// 		console.log(web2Firestore)
		// 		console.log(rowStartID)
		// 		console.log(formIDnumber)
		// 		const formRef = doc(db, "formData", formIDnumber, "userData", rowStartID)
		// 		await updateDoc(formRef, {
		// 			[columnsCount-1]: deleteField(),
		// 		})
		// 	}
		// }

		columnsCount -= 1
		container.style.gridTemplateColumns = `repeat(${columnsCount}, 1fr)`

		// totalUp()

		const formRef = doc(db, "formData", formIDnumber)
		await updateDoc(formRef, {
			columns: columnsCount,
		})

		for (var i=0; i<rowsCount; i++){
			// const formRef = doc(db, "formData", formIDnumber)
			await updateDoc(formRef, {
				[[i, columnsCount]]: deleteField(),
			})
		}


	}

}

// LOAD
document.getElementById("loadIDValue").value = "nMGEpn0JFY1LOYavcj36"
const loadIDButton = document.getElementById("loadIDButton")
loadIDButton.onclick = async function loadID() {
	const loadIDValue = document.getElementById("loadIDValue").value
	formIDnumber = loadIDValue

	console.log("load")
	// const formRef = await getDoc(db, "formData", formIDnumber)
	// console.log(formRef)
	// console.log(loadIDValue)
	// const querySnapshot = await getDocs(collection(db, "formData", "4NlSTcO9YwHSPbRI1VFp", "userData"));
	// const querySnapshot = await getDoc(db, "formData", "4NlSTcO9YwHSPbRI1VFp")
	// const querySnapshot = await getDocs(doc(db, "formData/4NlSTcO9YwHSPbRI1VFp"))
	// console.log(querySnapshot)

	// querySnapshot.forEach((doc) => {
  	// // doc.data() is never undefined for query doc snapshots
  	// console.log(doc.id, " => ", doc.data());
// });

	const docRef = doc(db, "formData", loadIDValue);
	// const docRef = doc(db, "formData", "0uOCdBiFHNUlHcSfq6F0");
	// const docRef = doc(db, "formData", "mjBhpCalnlCD08nYkzVS");
	const docSnap = await getDoc(docRef);
	const docSnapData = docSnap.data()
	columnsCount = docSnapData.columns
	const columns = docSnapData.columns
	rowsCount = docSnapData.rows
	const rows = docSnapData.rows
	console.log("Document data:", docSnap)
	console.log("Document data:", docSnap.data())
	console.log("columns:", columns)
	console.log("rows:", rows)

	// for (var i=0; i<rows; i++){
		
	// }
	console.log("load2")

	for (var j=2; j<columns+1; j++){
		var rowNum = 1
		var colNum = j
		// dict.set([rowNum-1, colNum-1].toString(), cellCount);
		const newDiv = document.createElement("div");
		newDiv.innerHTML = 0
		newDiv.style.gridRow = rowNum
		newDiv.style.gridColumn = colNum
		newDiv.className = "grid-item"
		newDiv.id = [rowNum-1, colNum-1].toString()
		document.getElementById('buttonRow').appendChild(newDiv)
		// cellCount += 1

		// date cell
		var rowNum = 2
		// var colNum = columnsCount+1
		var textfield = document.createElement("input");
		textfield.addEventListener("change", activityModify);
		textfield.type = "date";
		textfield.className = "grid-item"
		// textfield.value = "";
		// textfield.placeholder = activityBoxes[i-1];
		// textfield.value = cellCount;
		textfield.style.gridRow = rowNum
		textfield.style.gridColumn = colNum
		// dict.set([rowNum-1, colNum-1].toString(), cellCount);
		textfield.id = [rowNum-1, colNum-1].toString()
		
		document.getElementById('buttonRow').appendChild(textfield)
		// cellCount += 1

		// time cell
		var rowNum = 3
		// var colNum = columnsCount+1
		var textfield = document.createElement("input");
		textfield.addEventListener("change", activityModify);
		textfield.type = "time";
		textfield.className = "grid-item"
		// textfield.value = "";
		// textfield.placeholder = activityBoxes[i-1];
		// textfield.value = cellCount;
		textfield.style.gridRow = rowNum
		textfield.style.gridColumn = colNum
		// dict.set([rowNum-1, colNum-1].toString(), cellCount);
		textfield.id = [rowNum-1, colNum-1].toString()
		
		document.getElementById('buttonRow').appendChild(textfield)
		// cellCount += 1

		for(var i=3;i<5;i++) {
			var rowNum = i+1
			// var colNum = columnsCount+1
			var textfield = document.createElement("input");
			textfield.addEventListener("change", activityModify);
			textfield.type = "text";
			textfield.className = "grid-item"
			// textfield.value = "";
			textfield.placeholder = activityBoxes[i-1];
			// textfield.value = cellCount;
			textfield.style.gridRow = rowNum
			textfield.style.gridColumn = colNum
			// dict.set([rowNum-1, colNum-1].toString(), cellCount);
			textfield.id = [rowNum-1, colNum-1].toString()
			
			document.getElementById('buttonRow').appendChild(textfield)
			// cellCount += 1
		}
	}
	console.log("load3")
	
	for (var j=6; j<rows+1; j++){
	
		var rowNum = j
		var colNum = 1
		var textfield = document.createElement("input");
		textfield.className = "grid-item"
		// textfield.setAttribute("onclick","nameModify(this);");
		textfield.addEventListener("change", nameModify);
		textfield.type = "text";
		textfield.value = "";
		textfield.placeholder = "name"
		textfield.style.gridRow = rowNum
		textfield.style.gridColumn = colNum
		// dict.set([rowNum-1, colNum-1].toString(), cellCount);
		textfield.id = [rowNum-1, colNum-1].toString()

		document.getElementById('buttonRow').appendChild(textfield)
		// cellCount += 1

		// const IDString = [rowNum-1, colNum-1].toString()
		// const testCollection = collection(db, "formData", formIDnumber, "userData");
		// const testUser = await addDoc(testCollection, { 
		// 	username: "",
		// 	webID: IDString,
		// 	// webID: [rowNum-1, colNum-1].toString(),
		// })
		// web2Firestore[IDString] = testUser.id
		// console.log(IDString)
		// console.log(testCollection.id)
		// console.log(testUser.id)
		// console.log(web2Firestore)
		
		for(var i=0;i<columnsCount-1;i++) {
			// var rowNum = rowsCount + 1
			var colNum = i+2
			var textfield = document.createElement("button");
			textfield.className = "grid-button"
			// textfield.onclick = console.log("pref button")
			textfield.setAttribute("onclick","voteButtonPress(this);");
			//textfield.type = "text";
			textfield.innerHTML = "Neutral";
			textfield.style.gridRow = rowNum
			textfield.style.gridColumn = colNum
			// dict.set([rowNum-1, colNum-1].toString(), cellCount);
			textfield.id = [rowNum-1, colNum-1].toString()

			document.getElementById('buttonRow').appendChild(textfield)
			// cellCount += 1
		}	
	}
	console.log("load4")

	// for (var j=2; j<columns+1; j++){
	// 	for (var k=6; k<rows+1; k++){
	// 		// var rowNum = rowsCount + 1
	// 		var colNum = j
	// 		var rowNum = k
	// 		var textfield = document.createElement("button");
	// 		textfield.className = "grid-button"
	// 		// textfield.onclick = console.log("pref button")
	// 		textfield.setAttribute("onclick","voteButtonPress(this);");
	// 		//textfield.type = "text";
	// 		textfield.innerHTML = "Neutral";
	// 		textfield.style.gridRow = rowNum
	// 		textfield.style.gridColumn = colNum
	// 		// dict.set([rowNum-1, colNum-1].toString(), cellCount);
	// 		textfield.id = [rowNum, colNum].toString()

	// 		document.getElementById('buttonRow').appendChild(textfield)
	// 		// cellCount += 1
			
	// 	}
	// }
	console.log("load5")

	for (const [key, value] of Object.entries(docSnapData)){
		// console.log(key[0])
		if (key != "rows" && key != "columns") {
			// console.log(key)
			// const rowVal = key.split(",")[0]
			// const colVal = key.split(",")[1]
			// console.log(rowVal)
			// console.log(colVal)
			// console.log(dict.get([rowVal, colVal].toString()))
			// console.log(document.getElementById('buttonRow').children[dict.get([rowVal, colVal].toString())])
			// document.getElementById('buttonRow').children[dict.get([rowVal, colVal].toString())].value = value
			// document.getElementById('buttonRow').children[dict.get([rowVal, colVal].toString())].innerHTML = value
			// // docSnapData[key]

			console.log(key)
			let keyString = key.toString()
			console.log(keyString)
			// console.log(document.getElementById('buttonRow').children)
			console.log(document.getElementById('buttonRow'))
			console.log(document.getElementById('buttonRow').children[keyString])
			console.log(document.getElementById(keyString))

			// document.getElementById('buttonRow').children[keyString].value = value
			// document.getElementById('buttonRow').children[keyString].innerHTML = value

			// if (key[0] >= 5 && key[1] >= 1){
			if (document.getElementById('buttonRow').children[keyString].localName == "button"){
				console.log("button mod")
				document.getElementById('buttonRow').children[keyString].innerHTML = voteLabels[value]
				// document.getElementById[keyString].innerHTML = voteLabels[value]
				document.getElementById('buttonRow').children[keyString].style.backgroundColor = voteColours[value]
				// document.getElementById[keyString].style.backgroundColor = voteColours[value]
			} else {
				document.getElementById('buttonRow').children[keyString].value = value
			}


			// const rowVal = key.split(",")[0]
			// const colVal = key.split(",")[1]
			// console.log(rowVal)
			// console.log(colVal)
			// console.log(dict.get([rowVal, colVal].toString()))
			// console.log(document.getElementById('buttonRow').children[dict.get([rowVal, colVal].toString())])
			// document.getElementById('buttonRow').children[dict.get([rowVal, colVal].toString())].value = value
			// document.getElementById('buttonRow').children[dict.get([rowVal, colVal].toString())].innerHTML = value

		}
	}
}




// const colRef = collection(db, 'formData', "4NlSTcO9YwHSPbRI1VFp", "userData")

// // //one time data collection

// getDocs(colRef)
//   .then((snapshot) => {
// 	let books = []
// 	snapshot.docs.forEach((doc) => {
//   	books.push({...doc.data(), id: doc.id})
// 	})
// 	console.log(books)
//   })
// .catch(err => {
//   console.log(err.message)
// })


// const authorOne = document.querySelector('.book1')
// const authorTwo = document.querySelector('.book2')

// //realtime collection data
// onSnapshot(colRef, (snapshot)=>{
//   let books = []
//   snapshot.docs.forEach((doc) => {
// 	books.push({...doc.data(), id: doc.id})
//   })
// 	console.log(books)
// 	authorOne.elements.id1.value = books[0].id
// 	authorOne.elements.author1.value = books[0].author
// 	authorTwo.elements.author2.value = books[0].author
// 	authorOne.elements.title1.value = books[0].title	
// 	authorTwo.elements.title2.value = books[0].title	
// })



// const updateForm = document.querySelector('.book1')
// updateForm.addEventListener('submit', (e) =>{
//   e.preventDefault()

//   const docRef1 = doc(db, 'books', updateForm.id1.value)
//   //const docRef1 = "NUWgDf0iWS3JbWrPejwT"

//   setDoc(docRef1, {
// 	author: authorOne.elements.author1.value
//   });

// })

