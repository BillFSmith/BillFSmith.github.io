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

import sourceData from "../../temp(vegan3).json";
import displayNames from "../../display_names.json";
import collections from "../../collections.json";
import foodCompanions from "../../food_companions.json";


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
	"Total sugars (g)": 50,			
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

var microToColour = ["#7E1C29", "#7E1C29", "#C95328", "#C95328", "#DDCF80", "#DDCF80", "#B2CA7F", "#B2CA7F", "#93BC64", "#93BC64"]

var macroToColour = ["#93BC64",	"#93BC64","#B2CA7F","#B2CA7F","#DDCF80","#DDCF80","#C95328","#C95328","#7E1C29","#7E1C29"]
var macroUpToColour = ["#7E1C29", "#7E1C29", "#C95328", "#C95328", "#DDCF80", "#DDCF80", "#B2CA7F", "#B2CA7F", "#93BC64", "#93BC64"]










foodButton = document.getElementById("foodButton")
upButton = document.getElementById("upButton")
downButton = document.getElementById("downButton")

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

// var incMicroList = ["Vitamin A  (RAE)", "Vitamin C", "Calcium", "Iron", "Vitamin D", "Vitamin E", "Vitamin K", "Thiamin (B1)", "Riboflavin (B2)", "Niacin (B3) (NE)", "Vitamin B6", "Folate (B9) (DFE)", "Vitamin B12", "Biotin (B7)", "Pantothenic acid", "Phosphorus", "Iodine", "Magnesium", "Zinc", "Selenium", "Copper", "Manganese", "Potassium"]
var incMicroList = ["Vitamin A  (RAE)", "Vitamin C", "Iron", "Vitamin E", "Vitamin K", "Thiamin (B1)", "Riboflavin (B2)", "Niacin (B3) (NE)", "Vitamin B6", "Folate (B9) (DFE)", "Biotin (B7)", "Pantothenic acid", "Phosphorus", "Magnesium", "Zinc", "Selenium", "Copper", "Manganese", "Potassium"]
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
	
	// }
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

	for (const[key,value] of Object.entries(eatFoodsList)){	
		const newDiv = document.createElement("div");
		newDiv.innerHTML = key
		newDiv.style.gridColumn = "1/3"
		document.getElementById("foodGrid").appendChild(newDiv)

		const quantityDiv = document.createElement("div");
		// quantityDiv.innerHTML = document.getElementById("gDayValue").textContent
		quantityDiv.innerHTML = value + "g/day,        " + value * 7 + "g/week"
		quantityDiv.style.verticalAlign = "middle"
		quantityDiv.style.justifyContent = "center"
		quantityDiv.style.alignContent = "center"
		quantityDiv.style.display = "flex"
		quantityDiv.style.whiteSpace = "pre"
		document.getElementById("foodGrid").appendChild(quantityDiv)

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
	}

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






















var eatFoods = {}
var eatFoodsList = {}

window.updateNutrients = function() {
	for (const micro of incMicroList) {
		calcMicro[micro] = 0 
	}
	for (const macro of incMacroList) {
		calcMacro[macro] = 0 
	}
	for (const macro of incMacroUpList) {
		calcMacro[macro] = 0 
	}

	for (const[key,value] of Object.entries(eatFoodsList)){		// key: food name, value: g/day
		for (const micro of incMicroList) {						// loop over micro name
			calcMicro[micro] += eatFoods[key][micro] * value / 100
			var microColour = Math.min(Math.floor(calcMicro[micro] * 10), 9)
			document.getElementById(microToID[micro]).style.backgroundColor = microToColour[microColour]
		}

		for (const macro of incMacroList) {						// loop over macro name
			calcMacro[macro] += eatFoods[key][macro] * value / 100
			var macroColour = Math.min(Math.floor(calcMacro[macro] * 10/dailyLimits[macro]), 9)
			document.getElementById(macroToID[macro]).style.backgroundColor = macroToColour[macroColour]
		}

		for (const macro of incMacroUpList) {						// loop over macro name (protein)
			calcMacro[macro] += eatFoods[key][macro] * value / 100
			var macroColour = Math.min(Math.floor(calcMacro[macro] * 10/dailyLimits[macro]), 9)
			document.getElementById(macroUpToID[macro]).style.backgroundColor = macroUpToColour[macroColour]
		}
	}
	document.getElementById("caloriesGrid").innerHTML = "Calories (" + (calcMacro["Energy (kcal) (kcal)"]).toFixed(0) + ")"
	document.getElementById("costGrid").innerHTML = "Cost (£" + (calcMacro["cost_per_100g"]).toFixed(2) + ")"
	
}



window.addButtonFunc = function() {
	eatFoods[bestRow] = sourceData[bestRow]

	delete sourceData[bestRow]
	console.log(eatFoods)

	eatFoodsList[bestRow] = document.getElementById("gDayValue").textContent
	document.getElementById("eatingFood").textContent = JSON.stringify(eatFoodsList)

	generateEatingList()
	updateNutrients()

	document.getElementById("nutrientInfo2").textContent = JSON.stringify(calcMicro)
	document.getElementById("nutrientInfo3").textContent = JSON.stringify(calcMacro)

	const removedGroup = foodCompanions[bestRow]
	const toRemove = collections[removedGroup]
	// console.log(toRemove)
	console.log(toRemove.length)

	for (var i=0;i<toRemove.length;i++){
		if (toRemove[i] !== bestRow){
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

window.addEventListener("keydown", function (event) {
	if (event.defaultPrevented) {
	  return; // Do nothing if the event was already processed
	}
  
	switch (event.key) {
	  case "Down": // IE/Edge specific value
	  case "ArrowDown":
		console.log('arrow down')
		downFood()
		break;
	  case "Up": // IE/Edge specific value
	  case "ArrowUp":
		console.log('arrow up')
		upFood()
		break;

	case "ArrowLeft":
		console.log('arrow left')
		removeFunc()
		// upFood()
		break;

	case "ArrowRight":
		console.log('arrow right')
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


  // make eatingFoodsList and removedFoods to be the same forma
  // i.e. key value pair of food name and quantity
  // this means that the removed foods list can display previous values and can be added to
  // hide eat less and add food buttons until eat more is clicked (on removed list)


  // add buttons to hide eating list and removed list

  // add export data button
  // add graph button
  // add import food button

  // sort out food names

  // sort out low sugar count (check if it affects suggestions)
  
  // have Show added foods toggle to Hide added foods