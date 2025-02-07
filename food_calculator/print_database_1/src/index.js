const testButton1 = document.getElementById('testButton1')
testButton1.onclick = function() {
	console.log('testButton1')

	// clamp at 100% rda
	const clamp = (min, max) => value => Math.max(Math.min(value, max), min)

	// const rawData = math.matrix([[7, 1, 5], [-2, 23, 1], [7, 4, 4]])

	const rawData = math.matrix(math.random([1000,20], 0, 3))
	console.log(rawData)


	const data = rawData.map(clamp(0, 1))
	// const data = math.matrix(rawData)
	console.log(data)

	const matrixSize = math.size(data)
	const rowsCount = matrixSize._data[0]
	const colsCount = matrixSize._data[1]

	var bestRow = 0
	var bestScore = -100000

	for (var i=0; i<rowsCount; i++){
		if (math.sum(math.row(data,i)) > bestScore) {
			bestRow = i
			bestScore = math.sum(math.row(data,i))
		}
	}

	console.log(bestRow)
}

// import sourceData from "../../temp(vegan3).json";
import sourceData from "../../temp(vegan4).json";
// import displayNames from "../../display_names.json";
import displayNames from "../../vegan_display_names.json";
// import collections from "../../collections.json";
import collections from "../../vegan_collections.json";
// import foodCompanions from "../../food_companions.json";
import foodCompanions from "../../vegan_food_companions.json";
import matchings_top_all from "../../matchings_top_all.json";
import matchings_top_tesco from "../../matchings_top_tesco.json";
import matchings_top_sains from "../../matchings_top_sains.json";

// console.log(matchings_top_all)


testButton2.onclick = function() {
	console.log('testButton2')
	console.log(sourceData)
	console.log(sourceData[24])
	console.log(sourceData[24]["Fat (g)"])
	console.log(sourceData[24]["Fat (g)"])
	console.log(math.matrix(sourceData))
}

// var microList = ["Vitamin A  (RAE)", "Vitamin C", "Calcium", "Iron", "Vitamin D", "Vitamin E", "Vitamin K", "Thiamin (B1)", "Riboflavin (B2)"]
// var microList = ["Vitamin C"]
// var microList = ["Iron"]
var microList = ["Vitamin A  (RAE)", "Vitamin C", "Calcium", "Iron", "Vitamin D", "Vitamin E", "Vitamin K", "Thiamin (B1)", "Riboflavin (B2)", "Niacin (B3) (NE)", "Vitamin B6", "Folate (B9) (DFE)", "Vitamin B12", "Biotin (B7)", "Pantothenic acid", "Phosphorus", "Iodine", "Magnesium", "Zinc", "Selenium", "Copper", "Manganese", "Potassium"]
// var microList = ["Vitamin A  (RAE)", "Vitamin C", "Iron", "Vitamin E", "Vitamin K", "Thiamin (B1)", "Riboflavin (B2)", "Niacin (B3) (NE)", "Vitamin B6", "Folate (B9) (DFE)", "Biotin (B7)", "Pantothenic acid", "Phosphorus", "Magnesium", "Zinc", "Selenium", "Copper", "Manganese", "Potassium"]

var scores = {}
var bestRow = 0

testButton3.onclick = function() {
	console.log('testButton3')
	// console.log(sourceData[0])
	// console.log(sourceData[0]["Vitamin A  (RAE)"])
	// console.log(sourceData.length)
	// console.log(sourceData[0][microList[1]])


	var bestScore = -100000
	// for (var k=0; k<100; k++){
	// for (var i=0; i<sourceData.length; i++) {
	for (const [key,value] of Object.entries(sourceData)) {
		console.log(key)
		var tempSum = 0
		for (var j=0; j<microList.length; j++){
			// console.log(i, j)
			// tempSum += math.min(sourceData[i][microList[j]] + sourceData[0][microList[j]] * 0, 1)
			tempSum += math.min(value[microList[j]] + value[microList[j]] * 0, 1)
		}

		// tempSum /= sourceData[i]["Energy (kcal) (kcal)"]
		// tempSum /= sourceData[i]["cost_per_100g"]

		// tempSum = tempSum + (tempSum / (sourceData[i]["cost_per_100g"] + 10)) + (tempSum / (sourceData[i]["Energy (kcal) (kcal)"] + 100))
		// tempSum = 0.5 * tempSum + (tempSum / (sourceData[i]["cost_per_100g"] / 4 + sourceData[i]["Energy (kcal) (kcal)"] / 2000  + sourceData[i]["Total sugars (g)"] / 90  + sourceData[i]["Sodium (mg)"] / 3000))
		tempSum = 0.5 * tempSum + (tempSum / (value["cost_per_100g"] / 4 + value["Energy (kcal) (kcal)"] / (dailyLimits["Energy (kcal) (kcal)"] - calcMacro["Energy (kcal) (kcal)"])  + value["Total sugars (g)"] / 90  + value["Sodium (mg)"] / 3000))
		// tempSum = tempSum*0.3 + (tempSum / (sourceData[i]["Energy (kcal) (kcal)"]))

		if (tempSum > bestScore) {
			// bestRow = i
			bestRow = key
			bestScore = tempSum
		}
		// console.log(tempSum)
		// scores[sourceData[i]["Food name"]] = tempSum
		scores[key] = tempSum
	}

	console.log(bestRow)
	console.log(sourceData[bestRow])
	console.log(scores)
	var sortedScores = Object.entries(scores).sort((a,b) => b[1] - a[1])
	console.log(sortedScores)
	// }
}

testButton4.onclick = function() {
	console.log("testButton4")
	// // delete sourceData[bestRow]
	// console.log(displayNames)
	// console.log(collections)
	// console.log(foodCompanions)
	// document.getElementById("caloriesGrid").style.backgroundColor = "#F5742A"


	// const newDiv = document.createElement("div");
	// newDiv.innerHTML = "test"

	// document.getElementById("foodGrid").appendChild(newDiv)

	// const myNode = document.getElementById("foodGrid");
	// while (myNode.firstChild) {
	//   myNode.removeChild(myNode.lastChild);
	// }
	console.log("eatFoods", eatFoods)
	console.log("eatFoodsList", eatFoodsList)
	console.log("removedFoods", removedFoods)
	console.log("removedFoodsList", removedFoodsList)
}



































const dailyCalories = 2000
const dailyCost = 10
const dailySugar = 70
const dailySodium = 4000
const dailyProtein = 60

var dailyLimits = {
	"Energy (kcal) (kcal)": 2000,
	"cost_per_100g": 4,
	// "Total sugars (g)": 10,			// why is this so low?
	"Total sugars (g)": 70,			
	"Sodium (mg)": 2000,
	"Protein (g)": 60,
}


var macroToID = {
	"Energy (kcal) (kcal)": "caloriesGrid",
	"cost_per_100g": "costGrid",
	"Total sugars (g)": "sugarGrid",
	"Sodium (mg)": "sodiumGrid",
}

var macroUpToID = {
	"Protein (g)": "proteinGrid",
}

var microToID = {
	"Vitamin A  (RAE)": "Vitamin A  (RAE)",
	"Vitamin C": "Vitamin C",
	"Calcium": "Calcium",
	"Iron": "Iron",
	"Vitamin D": "Vitamin D",
	"Vitamin E": "Vitamin E",
	"Vitamin K": "Vitamin K",
	"Thiamin (B1)": "Thiamin (B1)",
	"Riboflavin (B2)": "Riboflavin (B2)",
	"Niacin (B3) (NE)": "Niacin (B3) (NE)",
	"Vitamin B6": "Vitamin B6",
	"Folate (B9) (DFE)": "Folate (B9) (DFE)",
	"Vitamin B12": "Vitamin B12",
	"Biotin (B7)": "Biotin (B7)",
	"Pantothenic acid": "Pantothenic acid",
	"Phosphorus": "Phosphorus",
	"Iodine": "Iodine",
	"Magnesium": "Magnesium",
	"Zinc": "Zinc",
	"Selenium": "Selenium",
	"Copper": "Copper",
	"Manganese": "Manganese",
	"Potassium": "Potassium",
}

var microToColour = ["#EC6B5F", "#EC6B5F", "#E4B16D", "#E4B16D", "#DDCF80", "#DDCF80", "#B2CA7F", "#B2CA7F", "#93BC64", "#93BC64"]

var macroToColour = ["#93BC64",	"#93BC64","#B2CA7F","#B2CA7F","#DDCF80","#DDCF80","#E4B16D","#E4B16D","#EC6B5F","#EC6B5F"]
var macroUpToColour = ["#EC6B5F", "#EC6B5F", "#E4B16D", "#E4B16D", "#DDCF80", "#DDCF80", "#B2CA7F", "#B2CA7F", "#93BC64", "#93BC64"]

const nutrientDisplayNames = {
	"Energy (kcal) (kcal)": "Energy, calories",
	"cost_per_100g": "Cost, £",
	"Total sugars (g)": "Sugar, g",
	"Sodium (mg)": "Sodium, mg",
	"Protein (g)": "Protein,  g"
}


// consider colour blind options







// below code doesn't work in chrome
// foodButton = document.getElementById("foodButton")
// upButton = document.getElementById("upButton")
// downButton = document.getElementById("downButton")

window.upFood = function() {
	document.getElementById("gDayValue").textContent = Number(document.getElementById("gDayValue").textContent) + 5
	document.getElementById("gWeekValue").textContent = Number(document.getElementById("gDayValue").textContent) * 7
}

upButton.onclick = function(){
	upFood()
}

window.downFood = function() {
	document.getElementById("gDayValue").textContent = Math.max(Number(document.getElementById("gDayValue").textContent) - 5, 5)
	document.getElementById("gWeekValue").textContent = Number(document.getElementById("gDayValue").textContent) * 7
}

downButton.onclick = function(){
	downFood()
}

var incMicroList = ["Vitamin A  (RAE)", "Vitamin C", "Calcium", "Iron", "Vitamin D", "Vitamin E", "Vitamin K", "Thiamin (B1)", "Riboflavin (B2)", "Niacin (B3) (NE)", "Vitamin B6", "Folate (B9) (DFE)", "Vitamin B12", "Biotin (B7)", "Pantothenic acid", "Phosphorus", "Iodine", "Magnesium", "Zinc", "Selenium", "Copper", "Manganese", "Potassium"]
// var incMicroList = ["Vitamin A  (RAE)", "Vitamin C", "Iron", "Vitamin E", "Vitamin K", "Thiamin (B1)", "Riboflavin (B2)", "Niacin (B3) (NE)", "Vitamin B6", "Folate (B9) (DFE)", "Biotin (B7)", "Pantothenic acid", "Phosphorus", "Magnesium", "Zinc", "Selenium", "Copper", "Manganese", "Potassium"]
var calcMicro = {}
for (const micro of incMicroList) {
	calcMicro[micro] = 0 
}

var incMacroList = ["Energy (kcal) (kcal)", "cost_per_100g", "Total sugars (g)", "Sodium (mg)"]
var calcMacro = {}
for (const macro of incMacroList) {
	calcMacro[macro] = 0 
}

var incMacroUpList = ["Protein (g)"]
var calcMacroUp= {}
for (const macro of incMacroUpList) {
	calcMacro[macro] = 0 
}



var selectedOptions = {}

window.findBestFood = function() {
	console.log("findBestFood")
	var bestScore = -100000
	// for (var k=0; k<100; k++){
	for (const [key,value] of Object.entries(sourceData)) {
		// console.log(key)
		var tempSum = 0
		for (var j=0; j<incMicroList.length; j++){
			// tempSum += math.min(value[incMicroList[j]] + calcMicro[incMicroList[j]] * 0.2, 1) //replace 0.2 somehow, it's the 20g increment
			tempSum += math.min(value[incMicroList[j]] + calcMicro[incMicroList[j]] * 0.2, 0.8) // set to 0.6 or so until minimum is greater
		}

		var currentBudgetEnergy = math.max(dailyLimits["Energy (kcal) (kcal)"] - calcMacro["Energy (kcal) (kcal)"], 0)
		var currentBudgetCost = math.max(dailyLimits["cost_per_100g"] - calcMacro["cost_per_100g"], 0)
		var currentBudgetSugar = math.max(dailyLimits["Total sugars (g)"] - calcMacro["Total sugars (g)"], 0)
		var currentBudgetSalt = math.max(dailyLimits["Sodium (mg)"] - calcMacro["Sodium (mg)"], 0)

		var fractionEnergy = value["Energy (kcal) (kcal)"] / currentBudgetEnergy
		var fractionCost = value["cost_per_100g"] / currentBudgetCost
		var fractionSugar = value["Total sugars (g)"] / currentBudgetSugar
		var fractionSalt = value["Sodium (mg)"] / currentBudgetSalt

		//  dailyLimits["Energy (kcal) (kcal)"] = 2000
		//  calcMacro["Energy (kcal) (kcal)"] = 500
		//  value["Energy (kcal) (kcal)"] = 200
		//  fractionEnergy = 200 / (2000 - 500) = 0.13

		//  dailyLimits["Energy (kcal) (kcal)"] = 2000
		//  calcMacro["Energy (kcal) (kcal)"] = 500
		//  value["Energy (kcal) (kcal)"] = 800
		//  fractionEnergy = 800 / (2000 - 500) = 0.53

		//  dailyLimits["Energy (kcal) (kcal)"] = 2000
		//  calcMacro["Energy (kcal) (kcal)"] = 500
		//  value["Energy (kcal) (kcal)"] = 3000
		//  fractionEnergy = 3000 / (2000 - 500) = 2

		//  dailyLimits["Energy (kcal) (kcal)"] = 2000
		//  calcMacro["Energy (kcal) (kcal)"] = 1500
		//  value["Energy (kcal) (kcal)"] = 800
		//  fractionEnergy = 800 / (2000 - 1500) = 1.6

		//  dailyLimits["Energy (kcal) (kcal)"] = 2000
		//  calcMacro["Energy (kcal) (kcal)"] = 2500
		//  value["Energy (kcal) (kcal)"] = 800
		//  fractionEnergy = 800 / (2000 - 2500) = -1.6

		//  dailyLimits["Energy (kcal) (kcal)"] = 2000
		//  calcMacro["Energy (kcal) (kcal)"] = 1999
		//  value["Energy (kcal) (kcal)"] = 800
		//  fractionEnergy = 800 / (2000 - 1999) = 800


		// tempSum = 0.5 * tempSum + 
		// (tempSum / 
		// 	(value["cost_per_100g"] / (dailyLimits["cost_per_100g"] - calcMacro["cost_per_100g"]) + 
		// 	value["Energy (kcal) (kcal)"] / (dailyLimits["Energy (kcal) (kcal)"] - calcMacro["Energy (kcal) (kcal)"]) + 
		// 	value["Total sugars (g)"] / 90  + value["Sodium (mg)"] / 3000))

		// var itemValue = 0.5 * tempSum + tempSum / (fractionEnergy + fractionCost + fractionSugar + fractionSalt)


		var itemValue = 0.5 * tempSum + 
		(tempSum / 
			((value["cost_per_100g"] / dailyLimits["cost_per_100g"]) + 
			(value["Energy (kcal) (kcal)"] / dailyLimits["Energy (kcal) (kcal)"]) + 
			(value["Total sugars (g)"] / dailyLimits["Total sugars (g)"])  + 
			(value["Sodium (mg)"] / dailyLimits["Sodium (mg)"])))

		// if (tempSum > bestScore) {
		// 	bestRow = key
		// 	bestScore = tempSum
		// }
		// scores[key] = tempSum

		if (itemValue > bestScore) {
			bestRow = key
			bestScore = itemValue
		}
		scores[key] = itemValue
	}

	// console.log(bestRow)
	// console.log(sourceData[bestRow])
	// console.log(scores)
	// var sortedScores = Object.entries(scores).sort((a,b) => b[1] - a[1])

	// foodButton.innerHTML = bestRow
	foodButton.innerHTML = displayNames[bestRow]

	// console.log("foodCompanions", collections[foodCompanions[bestRow]])

	selectedOptions = {}

	const myNode = document.getElementById("options-list");
	while (myNode.firstChild) {
	  myNode.removeChild(myNode.lastChild);
	}

	const foodDiv = document.createElement("button");
	foodDiv.innerHTML = bestRow
	foodDiv.name = bestRow
	foodDiv.style.fontSize = "20px"
	foodDiv.style.margin = "0.2vh"
	foodDiv.style.backgroundColor = "darkseagreen"
	foodDiv.addEventListener("click", foodOptionFunction);
	document.getElementById("options-list").appendChild(foodDiv)
	selectedOptions[bestRow] = true

	for (const companion of collections[foodCompanions[bestRow]]){
		if (companion !== bestRow){
			const foodDiv = document.createElement("button");
			foodDiv.innerHTML = companion
			foodDiv.name = companion
			foodDiv.style.fontSize = "20px"
			foodDiv.style.margin = "0.2vh"
			foodDiv.addEventListener("click", foodOptionFunction);
			document.getElementById("options-list").appendChild(foodDiv)
			selectedOptions[companion] = false
		}
	}
	
	// }
}

window.foodOptionFunction = function(el){
	var foodName = el.target.name
	// if (foodName in Object.entries(selectedOptions) && selectedOptions[foodName] === true){
	if (selectedOptions[foodName] === true){
		el.target.style.backgroundColor = ""
		selectedOptions[foodName] = false
	} else {
		el.target.style.backgroundColor = "darkseagreen"
		selectedOptions[foodName] = true
	}
	console.log("foodName", foodName)
	console.log("selectedOptions", selectedOptions)

}

findBestFood()









var removedFoods = {}
// var removedFoodsList = []
var removedFoodsList = {}




window.generateRemovedList = function () {
	console.log("removing")
	const myNode = document.getElementById("removedGrid");
	while (myNode.firstChild) {
	  myNode.removeChild(myNode.lastChild);
	}

	for (const[key,value] of Object.entries(removedFoodsList)){	
		const newDiv = document.createElement("div");
		newDiv.innerHTML = key
		newDiv.style.gridColumn = "1/3"
		document.getElementById("removedGrid").appendChild(newDiv)

		const quantityDiv = document.createElement("div");
		// quantityDiv.innerHTML = document.getElementById("gDayValue").textContent
		quantityDiv.innerHTML = value + "g/day,        " + value * 7 + "g/week"
		// quantityDiv.innerHTML = 0 + "g/day,        " + 0 * 7 + "g/week"
		quantityDiv.style.verticalAlign = "middle"
		quantityDiv.style.justifyContent = "center"
		quantityDiv.style.alignContent = "center"
		quantityDiv.style.display = "flex"
		quantityDiv.style.whiteSpace = "pre"
		document.getElementById("removedGrid").appendChild(quantityDiv)

		const minusDiv = document.createElement("button");
		minusDiv.innerHTML = "eat less"
		minusDiv.name = key
		minusDiv.addEventListener("click", minusFunction);
		document.getElementById("removedGrid").appendChild(minusDiv)

		const plusDiv = document.createElement("button");
		plusDiv.innerHTML = "eat more"
		plusDiv.name = key
		plusDiv.addEventListener("click", plusFunction);
		document.getElementById("removedGrid").appendChild(plusDiv)

		const binDiv = document.createElement("button");
		binDiv.innerHTML = "add food"
		binDiv.name = key
		binDiv.addEventListener("click", unBinFunction);
		document.getElementById("removedGrid").appendChild(binDiv)
	}

}

window.removeFunc = function() {
	// removedFoods[bestRow] = sourceData[bestRow]
	// delete sourceData[bestRow]
	// findBestFood()
	// removedFoodsList.push(bestRow)
	// document.getElementById("notEatingFood").textContent = removedFoodsList


	// removedFoods[bestRow] = sourceData[bestRow]
	// delete sourceData[bestRow]
	// removedFoodsList.push(bestRow)


	const removedGroup = foodCompanions[bestRow]
	const toRemove = collections[removedGroup]
	// console.log(toRemove)
	console.log(toRemove.length)

	for (var i=0;i<toRemove.length;i++){
		console.log(toRemove[i])
		removedFoods[toRemove[i]] = sourceData[toRemove[i]]
		delete sourceData[toRemove[i]]
		// removedFoodsList.push(toRemove[i])
		removedFoodsList[toRemove[i]] = 0
	}
	generateRemovedList()
	
	// document.getElementById("notEatingFood").textContent = removedFoodsList
	document.getElementById("notEatingFood").textContent = JSON.stringify(removedFoodsList)


	findBestFood()

}

removeButton.onclick = function() {
	removeFunc()
}





window.generateEatingList = function () {
	console.log("generating")
	const myNode = document.getElementById("foodGrid");
	while (myNode.firstChild) {
	  myNode.removeChild(myNode.lastChild);
	}

	const myNodeT = document.getElementById("shoppingListTesco");
	while (myNodeT.firstChild) {
		myNodeT.removeChild(myNodeT.lastChild);
	}

	const myNodeS = document.getElementById("shoppingListSains");
	while (myNodeS.firstChild) {
		myNodeS.removeChild(myNodeS.lastChild);
	}

	const myNodeE = document.getElementById("exportGrid");
	while (myNodeE.firstChild) {
		myNodeE.removeChild(myNodeE.lastChild);
	}


	console.log(Object.entries(eatFoodsList))
	for (const[key,value] of Object.entries(eatFoodsList)){	
		const newDiv = document.createElement("div");
		newDiv.innerHTML = key
		newDiv.style.gridColumn = "1/3"
		document.getElementById("foodGrid").appendChild(newDiv)		

		const quantityDiv = document.createElement("div");
		quantityDiv.innerHTML = Number(value).toFixed() + "g/day,        " + (Number(value) * 7).toFixed() + "g/week"
		quantityDiv.style.verticalAlign = "middle"
		quantityDiv.style.justifyContent = "center"
		quantityDiv.style.alignContent = "center"
		quantityDiv.style.display = "flex"
		quantityDiv.style.whiteSpace = "pre"
		document.getElementById("foodGrid").appendChild(quantityDiv)

		const inputDiv = document.createElement("input");
		inputDiv.name = key
		inputDiv.placeholder = "enter g/week"
		inputDiv.addEventListener("change", inputFunction);
		document.getElementById("foodGrid").appendChild(inputDiv)

		const minusDiv = document.createElement("button");
		minusDiv.innerHTML = "eat less"
		minusDiv.name = key
		minusDiv.addEventListener("click", minusFunction);
		document.getElementById("foodGrid").appendChild(minusDiv)

		const plusDiv = document.createElement("button");
		plusDiv.innerHTML = "eat more"
		plusDiv.name = key
		plusDiv.addEventListener("click", plusFunction);
		document.getElementById("foodGrid").appendChild(plusDiv)

		const binDiv = document.createElement("button");
		binDiv.innerHTML = "remove"
		binDiv.name = key
		binDiv.addEventListener("click", binFunction);
		document.getElementById("foodGrid").appendChild(binDiv)

		// shopping lists
		// tesco
		const newDivT = document.createElement("div");
		newDivT.innerHTML = key
		newDivT.style.gridColumn = "1/4"
		document.getElementById("shoppingListTesco").appendChild(newDivT)

		const quantityDivT = document.createElement("div");
		quantityDivT.innerHTML = Number(value).toFixed() + "g/day,        " + (Number(value) * 7).toFixed() + "g/week"
		quantityDivT.style.verticalAlign = "middle"
		quantityDivT.style.justifyContent = "center"
		quantityDivT.style.alignContent = "center"
		quantityDivT.style.display = "flex"
		quantityDivT.style.whiteSpace = "pre"
		document.getElementById("shoppingListTesco").appendChild(quantityDivT)

		const supermarketDivT = document.createElement("div");
		supermarketDivT.innerHTML = matchings_top_tesco[key]
		supermarketDivT.style.gridColumn = "5/8"
		document.getElementById("shoppingListTesco").appendChild(supermarketDivT)


		// sainsburys
		const newDivS = document.createElement("div");
		newDivS.innerHTML = key
		newDivS.style.gridColumn = "1/4"
		document.getElementById("shoppingListSains").appendChild(newDivS)

		const quantityDivS = document.createElement("div");
		quantityDivS.innerHTML = Number(value).toFixed() + "g/day,        " + (Number(value) * 7).toFixed() + "g/week"
		quantityDivS.style.verticalAlign = "middle"
		quantityDivS.style.justifyContent = "center"
		quantityDivS.style.alignContent = "center"
		quantityDivS.style.display = "flex"
		quantityDivS.style.whiteSpace = "pre"
		document.getElementById("shoppingListSains").appendChild(quantityDivS)

		const supermarketDivS = document.createElement("div");
		supermarketDivS.innerHTML = matchings_top_sains[key]
		supermarketDivS.style.gridColumn = "5/8"
		document.getElementById("shoppingListSains").appendChild(supermarketDivS)

		// export data
		const newDivE = document.createElement("div");
		newDivE.innerHTML = "Food Name: " + key
		newDivE.style.gridColumn = "1/4"
		document.getElementById("exportGrid").appendChild(newDivE)

		const quantityDivE = document.createElement("div");
		quantityDivE.innerHTML = "Quantity: " + Number(value).toFixed()
		quantityDivE.style.verticalAlign = "middle"
		quantityDivE.style.justifyContent = "center"
		quantityDivE.style.alignContent = "center"
		quantityDivE.style.display = "flex"
		quantityDivE.style.whiteSpace = "pre"
		document.getElementById("exportGrid").appendChild(quantityDivE)
	
	}
	console.log("finished generating")

}

window.minusFunction = function(el){
	const foodName = el.target.name
	if (foodName in eatFoodsList) {
		eatFoodsList[foodName] = Math.max(Number(eatFoodsList[foodName]) - 5, 0)
		generateEatingList()
	} else {
		removedFoodsList[foodName] = Math.max(Number(removedFoodsList[foodName]) - 5, 0)
		generateRemovedList()
	}
	
	updateNutrients()
	document.getElementById("eatingFood").textContent = JSON.stringify(eatFoodsList)
	document.getElementById("nutrientInfo2").textContent = JSON.stringify(calcMicro)
	document.getElementById("nutrientInfo3").textContent = JSON.stringify(calcMacro)
}

window.plusFunction = function(el){
	const foodName = el.target.name
	if (foodName in eatFoodsList) {
		eatFoodsList[foodName] = Math.min(Number(eatFoodsList[foodName]) + 5, 1000)
		generateEatingList()
	} else {
		removedFoodsList[foodName] = Math.min(Number(removedFoodsList[foodName]) + 5, 1000)
		generateRemovedList()
	}

	updateNutrients()
	document.getElementById("eatingFood").textContent = JSON.stringify(eatFoodsList)
	document.getElementById("nutrientInfo2").textContent = JSON.stringify(calcMicro)
	document.getElementById("nutrientInfo3").textContent = JSON.stringify(calcMacro)
}

window.inputFunction = function(el){
	const foodName = el.target.name
	console.log(foodName)
	console.log(el.target.value)

	if (foodName in eatFoodsList) {
		eatFoodsList[foodName] = Math.min(Number(el.target.value) / 7, 1000)
		generateEatingList()
	} else {
		removedFoodsList[foodName] = Math.min(Number(el.target.value) / 7, 1000)
		generateRemovedList()
	}

	updateNutrients()
	document.getElementById("eatingFood").textContent = JSON.stringify(eatFoodsList)
	document.getElementById("nutrientInfo2").textContent = JSON.stringify(calcMicro)
	document.getElementById("nutrientInfo3").textContent = JSON.stringify(calcMacro)
}


window.binFunction = function(el){
	console.log("bin")
	const foodName = el.target.name
	console.log(foodName)
	removedFoods[foodName] = eatFoods[foodName]
	removedFoodsList[foodName] = eatFoodsList[foodName]
	delete eatFoods[foodName]
	delete eatFoodsList[foodName]
	generateEatingList()
	generateRemovedList()
	updateNutrients()
	document.getElementById("eatingFood").textContent = JSON.stringify(eatFoodsList)
	document.getElementById("nutrientInfo2").textContent = JSON.stringify(calcMicro)
	document.getElementById("nutrientInfo3").textContent = JSON.stringify(calcMacro)
	document.getElementById("notEatingFood").textContent = JSON.stringify(removedFoodsList)
}

window.unBinFunction = function(el){
	console.log("unBin")
	const foodName = el.target.name
	console.log(foodName)
	eatFoods[foodName] = removedFoods[foodName]
	eatFoodsList[foodName] = removedFoodsList[foodName]
	delete removedFoods[foodName]
	delete removedFoodsList[foodName]
	generateEatingList()
	generateRemovedList()
	updateNutrients()
	document.getElementById("eatingFood").textContent = JSON.stringify(eatFoodsList)
	document.getElementById("nutrientInfo2").textContent = JSON.stringify(calcMicro)
	document.getElementById("nutrientInfo3").textContent = JSON.stringify(calcMacro)
	document.getElementById("notEatingFood").textContent = JSON.stringify(removedFoodsList)
}








// section to check if items are included in a collection but aren't in the sourceData
// i.e. butter beans in beans section
// find why butter beans aren't in ... oh it's because butter is in the name
// remove items in collections that arent in sourceData

// console.log(collections)

// console.log(sourceData["Beans butter dried boiled in unsalted water"])

for (const [key,value] of Object.entries(collections)) {
	// console.log(value)
	for (const item of value) {
		// console.log("food data")
		// console.log(item)
		// console.log(sourceData[item])
		if (!(item in sourceData)) {
			console.log("no")
		}

	}
}






var eatFoods = {}
var eatFoodsList = {}

window.updateNutrients = function() {
	console.log("resetting nutrients")
	for (const micro of incMicroList) {
		calcMicro[micro] = 0 
	}
	for (const macro of incMacroList) {
		calcMacro[macro] = 0 
	}
	for (const macro of incMacroUpList) {
		calcMacro[macro] = 0 
	}
	console.log("building nutrients")
	console.log(eatFoodsList)



	for (const[key,value] of Object.entries(eatFoodsList)){		// key: food name, value: g/day
		console.log(key,value)
		for (const micro of incMicroList) {						// loop over micro name
			console.log("micro")
			console.log(micro)
			console.log(eatFoods[key])
			console.log(eatFoods[key][micro])
			calcMicro[micro] += eatFoods[key][micro] * value / 100
			var microColour = Math.min(Math.floor(calcMicro[micro] * 10), 9)
			document.getElementById(microToID[micro]).style.backgroundColor = microToColour[microColour]
		}
		
		for (const macro of incMacroList) {						// loop over macro name
			console.log("macro")
			console.log(macro)
			calcMacro[macro] += eatFoods[key][macro] * value / 100
			var macroColour = Math.min(Math.floor(calcMacro[macro] * 10/dailyLimits[macro]), 9)
			document.getElementById(macroToID[macro]).style.backgroundColor = macroToColour[macroColour]
		}

		for (const macro of incMacroUpList) {						// loop over macro name (protein)
			console.log("macro up")
			console.log(macro)
			calcMacro[macro] += eatFoods[key][macro] * value / 100
			var macroColour = Math.min(Math.floor(calcMacro[macro] * 10/dailyLimits[macro]), 9)
			document.getElementById(macroUpToID[macro]).style.backgroundColor = macroUpToColour[macroColour]
		}
	}

	const myNode = document.getElementById("detailedNutrientGrid");
	while (myNode.firstChild) {
	  myNode.removeChild(myNode.lastChild);
	}
	for (const macro of incMacroList) {						// loop over macro name
		const newDivT = document.createElement("div");
		newDivT.innerHTML = nutrientDisplayNames[macro]
		newDivT.style.gridColumn = "1/2"
		document.getElementById("detailedNutrientGrid").appendChild(newDivT)
		
		const newDivQ = document.createElement("div");
		newDivQ.innerHTML = calcMacro[macro].toFixed(2)
		newDivQ.style.gridColumn = "2/3"
		document.getElementById("detailedNutrientGrid").appendChild(newDivQ)
	}
	for (const macro of incMacroUpList) {						// loop over macro name (protein)
		const newDivT = document.createElement("div");
		newDivT.innerHTML = nutrientDisplayNames[macro]
		newDivT.style.gridColumn = "1/2"
		document.getElementById("detailedNutrientGrid").appendChild(newDivT)

		const newDivQ = document.createElement("div");
		newDivQ.innerHTML = calcMacro[macro].toFixed(2)
		newDivQ.style.gridColumn = "2/3"
		document.getElementById("detailedNutrientGrid").appendChild(newDivQ)
	}
	for (const micro of incMicroList) {						// loop over micro name
		const newDivT = document.createElement("div");
		newDivT.innerHTML = micro
		newDivT.style.gridColumn = "1/2"
		document.getElementById("detailedNutrientGrid").appendChild(newDivT)

		const newDivQ = document.createElement("div");
		newDivQ.innerHTML = (calcMicro[micro]*100).toFixed() + "%"
		newDivQ.style.gridColumn = "2/3"
		document.getElementById("detailedNutrientGrid").appendChild(newDivQ)
	}


	console.log("building macros")
	document.getElementById("caloriesGrid").innerHTML = "Calories (" + (calcMacro["Energy (kcal) (kcal)"]).toFixed(0) + ")"
	document.getElementById("costGrid").innerHTML = "Cost (£" + (calcMacro["cost_per_100g"]).toFixed(2) + ")"
	document.getElementById("sugarGrid").innerHTML = "Sugar (" + (calcMacro["Total sugars (g)"]).toFixed(2) + "g)"
	document.getElementById("sodiumGrid").innerHTML = "Salt (" + (2.5 * calcMacro["Sodium (mg)"] / 1000).toFixed(2) + "g)"
	document.getElementById("proteinGrid").innerHTML = "Protein (" + (calcMacro["Protein (g)"]).toFixed(2) + "g)"
}



window.addButtonFunc = function() {
	// eatFoods[bestRow] = sourceData[bestRow]

	// delete sourceData[bestRow]
	// console.log(eatFoods)

	// eatFoodsList[bestRow] = document.getElementById("gDayValue").textContent
	// document.getElementById("eatingFood").textContent = JSON.stringify(eatFoodsList)

	console.log("selectedOptions", selectedOptions)
	console.log(Object.entries(selectedOptions))
	for (const [key,value] of Object.entries(selectedOptions)){
		if (selectedOptions[key] === true) {
			console.log("key", key)
			eatFoods[key] = sourceData[key]

			delete sourceData[key]
			console.log(eatFoods)
		
			eatFoodsList[key] = document.getElementById("gDayValue").textContent
			document.getElementById("eatingFood").textContent = JSON.stringify(eatFoodsList)
		}
	}



	generateEatingList()

	console.log("updatingnutrients")
	updateNutrients()

	console.log("stringify")
	document.getElementById("nutrientInfo2").textContent = JSON.stringify(calcMicro)
	document.getElementById("nutrientInfo3").textContent = JSON.stringify(calcMacro)

	console.log("removedGroup")
	const removedGroup = foodCompanions[bestRow]
	const toRemove = collections[removedGroup]
	// console.log(toRemove)
	console.log(toRemove.length)

	for (var i=0;i<toRemove.length;i++){
		// if (toRemove[i] !== bestRow){
		if (selectedOptions[toRemove[i]] === false){
			console.log(toRemove[i])
			removedFoods[toRemove[i]] = sourceData[toRemove[i]]
			delete sourceData[toRemove[i]]
			// removedFoodsList.push(toRemove[i])
			removedFoodsList[toRemove[i]] = 0
		}
	}

	generateRemovedList()
	// document.getElementById("notEatingFood").textContent = removedFoodsList
	document.getElementById("notEatingFood").textContent = JSON.stringify(removedFoodsList)

	selectedOptions = {}


	findBestFood()
}

eatButton.onclick = function() {
	addButtonFunc()
}

var input = document.getElementById("foodSearchText");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("foodSearchButton").click();
  }
}); 



// const foodSearchButton = document.getElementById("foodSearchButton")
foodSearchButton.onclick = function() {
	console.log("search button pressed")
	const foodSearchText = document.getElementById("foodSearchText").value
	const searchWords = foodSearchText.toLowerCase().split(" ")   // make lowercase
	console.log(searchWords)

	var tempScore = 0
	var matches = {}
	console.log(Object.entries(sourceData))
	for (const [key,value] of Object.entries(sourceData)) {
		console.log(key)
		tempScore = 0
		// console.log(tempScore)
		for (var i=0; i<searchWords.length; i++) {

			console.log(i)
			if (key.toLowerCase().includes(searchWords[i])){
				tempScore += 1
				if (i === 0) {
					tempScore += 1
				}
				if (i === 0 && key.toLowerCase().split(" ")[0] === searchWords[0]) {
					tempScore += 2
				}
			}
		}
		tempScore -= key.split(" ").length/20
		if (tempScore > 0){
			matches[key] = tempScore
		}
	}
	console.log(matches)

	let sortedMatches = Object.entries(matches).sort((a, b) => a[1] - b[1]).reverse()
	console.log(sortedMatches)

	// searchDrop

	const myNode = document.getElementById("dropContent");
	while (myNode.firstChild) {
	  myNode.removeChild(myNode.lastChild);
	}

	for (const searchOption of sortedMatches){	
		const searchAdd = document.createElement("button");
		searchAdd.innerHTML = searchOption[0]
		searchAdd.name = searchOption[0]
		searchAdd.style.width = "100%"
		searchAdd.style.fontSize = "20px"
		searchAdd.addEventListener("click", searchAddButtonFunc);
		document.getElementById("dropContent").appendChild(searchAdd)
	}
	document.getElementById("searchDrop").innerHTML = "Search results (" + sortedMatches.length + ")"
}

window.searchAddButtonFunc = function(el) {
	const foodName = el.target.name
	console.log("element", el)

	// to do: delete button when clicked on - currently it ignores it
	if (sourceData.hasOwnProperty(foodName)) {
		eatFoods[foodName] = sourceData[foodName]

		delete sourceData[foodName]
		console.log(eatFoods)

		eatFoodsList[foodName] = document.getElementById("gDayValue").textContent
		document.getElementById("eatingFood").textContent = JSON.stringify(eatFoodsList)

		generateEatingList()
		updateNutrients()

		document.getElementById("nutrientInfo2").textContent = JSON.stringify(calcMicro)
		document.getElementById("nutrientInfo3").textContent = JSON.stringify(calcMacro)

		findBestFood()
	}
}

document.getElementById('loadImportData').addEventListener("click", function() {
	const importedData = loadTextArea.value
	const foods = importedData.split("Food Name: ")

	for (var i=1; i<foods.length; i++){
		var foodName = foods[i].split("Quantity: ")[0].trim()
		var quantity = foods[i].split("Quantity: ")[1].trim()

		// console.log("foodname")
		console.log(foodName, "x")
		console.log("quantity", quantity)

		if (sourceData.hasOwnProperty(foodName)) {
			console.log("processing", foodName)

			eatFoods[foodName] = sourceData[foodName]
	
			delete sourceData[foodName]
			console.log(eatFoods)
	
			eatFoodsList[foodName] = quantity
	

	
		}
	}
	generateEatingList()
	updateNutrients()
	findBestFood()
	
}); 


document.getElementById('showOptions').addEventListener("click", function() {
	const paragraph = document.getElementById('options-list');
	if (paragraph.style.display === 'none') {
		paragraph.style.display = "grid";
		document.getElementById('showOptions').innerHTML = "Hide Food Options"
	}
	else {
		paragraph.style.display = "none"
		document.getElementById('showOptions').innerHTML = "Show Food Options"
	}
}); 

document.getElementById('showAddedFoods').addEventListener("click", function() {
	const paragraph = document.getElementById('foodGrid');
	if (paragraph.style.display === 'none') {
		paragraph.style.display = "grid";
		document.getElementById('showAddedFoods').innerHTML = "Hide Added Foods"
	}
	else {
		paragraph.style.display = "none"
		document.getElementById('showAddedFoods').innerHTML = "Show Added Foods"
	}
}); 

document.getElementById('showRemovedFoods').addEventListener("click", function() {
	const paragraph = document.getElementById('removedGrid');
	if (paragraph.style.display === 'none') {
		paragraph.style.display = "grid";
		document.getElementById('showRemovedFoods').innerHTML = "Hide Removed Foods"
	}
	else {
		paragraph.style.display = "none"
		document.getElementById('showRemovedFoods').innerHTML = "Show Removed Foods"
	}
}); 



document.getElementById('showShoppingTesco').addEventListener("click", function() {
	const paragraph = document.getElementById('shoppingListTesco');
	if (paragraph.style.display === 'none') {
		paragraph.style.display = "grid";
		document.getElementById('showShoppingTesco').innerHTML = "Hide Tesco Shopping List"
	}
	else {
		paragraph.style.display = "none"
		document.getElementById('showShoppingTesco').innerHTML = "Show Tesco Shopping List"
	}
}); 

document.getElementById('showShoppingSains').addEventListener("click", function() {
	const paragraph = document.getElementById('shoppingListSains');
	if (paragraph.style.display === 'none') {
		paragraph.style.display = "grid";
		document.getElementById('showShoppingSains').innerHTML = "Hide Sainsbury's Shopping List"
	}
	else {
		paragraph.style.display = "none"
		document.getElementById('showShoppingSains').innerHTML = "Show Sainsbury's Shopping List"
	}
}); 

document.getElementById('showExportData').addEventListener("click", function() {
	const paragraph = document.getElementById('exportGrid');
	if (paragraph.style.display === 'none') {
		paragraph.style.display = "grid";
		document.getElementById('showExportData').innerHTML = "Hide Save Data"
	}
	else {
		paragraph.style.display = "none"
		document.getElementById('showExportData').innerHTML = "Show Save Data"
	}
}); 

document.getElementById('showImportData').addEventListener("click", function() {
	const paragraph = document.getElementById('loadHide');
	if (paragraph.style.display === 'none') {
		paragraph.style.display = "";
		document.getElementById('showImportData').innerHTML = "Hide Load Data Controls"
	}
	else {
		paragraph.style.display = "none"
		document.getElementById('showImportData').innerHTML = "Show Load Data Controls"
	}
}); 

document.getElementById('showNutrientData').addEventListener("click", function() {
	const paragraph = document.getElementById('detailedNutrientGrid');
	if (paragraph.style.display === 'none') {
		paragraph.style.display = "";
		document.getElementById('showNutrientData').innerHTML = "Hide Detailed Nutritional Data"
	}
	else {
		paragraph.style.display = "none"
		document.getElementById('showNutrientData').innerHTML = "Show Detailed Nutritional Data"
	}
}); 



window.addEventListener("keydown", function (event) {
	if (event.defaultPrevented) {
	  return; // Do nothing if the event was already processed
	}
  
	switch (event.key) {
	  case "Down": // IE/Edge specific value
	  case "ArrowDown":
		console.log('arrow down')
		downButton.style.backgroundColor = "white"
		setTimeout(() => {downButton.style.backgroundColor = ""}, 100)
		downFood()
		break;
	  case "Up": // IE/Edge specific value
	  case "ArrowUp":
		console.log('arrow up')
		upButton.style.backgroundColor = "white"
		setTimeout(() => {upButton.style.backgroundColor = ""}, 100)
		upFood()
		break;

	case "ArrowLeft":
		console.log('arrow left')
		removeButton.style.backgroundColor = "white"
		setTimeout(() => {removeButton.style.backgroundColor = ""}, 100)
		removeFunc()
		// upFood()
		break;

	case "ArrowRight":
		console.log('arrow right')
		eatButton.style.backgroundColor = "white"
		setTimeout(() => {eatButton.style.backgroundColor = ""}, 100)
		addButtonFunc()
		// upFood()
		break;
  
	  default:
		return; // Quit when this doesn't handle the key event.
	}
  
	// Cancel the default action to avoid it being handled twice
	event.preventDefault();
  }, true);


  // to do
  // consider weighting nutrients by availability
  // look up minimum needs, consider Adequate Intake etc

  // check if micronutrients can be too much

  // add export data button
  // add graph button
  // add import food button

  // sort out food names

  // search through not eaten foods too, and return in a slightly different colour
  // delete option in search after clicking on it

  // get it working for meat eaters and vegetarians

  // get new favicon
  // make new name (maybe grub)

  // clicking on food brings up modal with food info

  // rank foods within a group


  // replace eat less and eat more with + and -
  // replace remove with bin symbol 
  // colour alternate lines for visibility

  // YY
  // Instructions saying that you can select multiple using your mouse (or you should unselect the first row)
  // Once rice wild had only one option and the other time it shows bunch of options
  // Sweet potato has two options when it's recommended but when using find a food function there are 20
  // Click function for the nutritient (e.g., calcium)
  // A function to know which line you are going to remove
  // Weekly cost

  // include actual quantities of nutrients, not just % on detailed nutritional data