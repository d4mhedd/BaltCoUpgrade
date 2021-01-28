//FAA;Site!Addressing!NA!NA
allFees = loadFees();
var sequenceNum = allFees[0]["sequence"];
for (x in allFees) if (parseInt(allFees[x]["sequence"]) > parseInt(sequenceNum)) sequenceNum = allFees[x]["sequence"];
var feeString = "" + FeeItemsList;
feeString = feeString.replace("[","");
feeString = feeString.replace("]","");
var feeItem;
var quantity;
var index = -1;
var feeArray = feeString .split('|');
var proceed = true;
if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion'])) {
	for (feeItem in feeArray) if (feeArray[feeItem] == "DS0143") index = feeItem;
	}

if (index == -1) {
	proceed = false;
	}

if (proceed) {
	var quantityString = "" + FeeItemsQuantityList;
	quantityString = quantityString.replace("[","");
	quantityString = quantityString.replace("]","");
	}

if (proceed) {
	var quantityArray = quantityString.split("|");
	}

if (proceed) {
	quantity = quantityArray[index];
	var userTypedQuantity = quantity;
	}

if (proceed) {
	if (quantity > 0 && quantity < .5) quantity = .5;
	}

if (proceed) {
	;
	quantity = Math.round(quantity*2) / 2;
	if (userTypedQuantity > quantity) quantity += .5;
	}

if (proceed && !FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion'])) {
	updateFee("DS0143", "ADDRESSING" ,"FINAL", quantity, "N", "N" , sequenceNum);
	}