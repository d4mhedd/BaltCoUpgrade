//DLH 171012 conversion begin

var parentCapId = null;
var parentCapString = "" + aa.env.getValue("ParentCapID");
if (parentCapString.length > 0) {
	parentArray = parentCapString.split("-");
	parentCapId = aa.cap.getCapID(parentArray[0],parentArray[1],parentArray[2]).getOutput();
	}

if (parentCapId) {
	isRenewProcess(parentCapId, capId);
	}

aa.cap.createRenewalCap(parentCapId, capId, true);
aa.cap.updateAccessByACA(capId, "Y");
copyKeyInfoWithoutASIT(parentCapId, capId);
var notOwner="Yes";
var Owner2="UNCHECKED";
var Owner3="UNCHECKED";
var OwnerMD ="Yes";
var notOwner = AInfo["Is the Property Owner Occupied?"];
var Owner2 = AInfo["Owner Occupied 1 or 2 Tenants"];
var Owner3 = AInfo["Owner Occupied More Than 2"];
var OwnerMD= AInfo["Does the Property Owner Live in Maryland?"];
if (feeExists("LR100","NEW")) {
	removeFee("LR100","FINAL");
	}

if (feeExists("LR200","NEW")) {
	removeFee("LR200","FINAL");
	}

if (feeExists("LR300","NEW")) {
	removeFee("LR300","FINAL");
	}

if (notOwner =="No") {
	addFee("LR300","LICRENT", "FINAL", 1, "Y");
	}

if (Owner2 == "CHECKED") {
	addFee("LR100","LICRENT", "FINAL", 1, "Y");
	}

if (Owner3 == "CHECKED") {
	addFee("LR200","LICRENT", "FINAL", 1, "Y");
	}

if (OwnerMD == "No") {
	addFee("LR300","LICRENT", "FINAL", 1, "Y");
	}
	
//DLH 171012 conversion end