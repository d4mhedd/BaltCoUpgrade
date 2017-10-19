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
copyKeyInfo( parentCapId,capId);
aa.cap.updateAccessByACA(capId, "N");
if (feeExists("PIRP002","NEW","INVOICED") && AInfo["Residential Parking Renewal"] == "CHECKED" && AInfo["Age 65 or older?"] == "Yes") {
	removeFee("PIRP002","FINAL");
	}

if (!feeExists("PIRP006","NEW","INVOICED") && AInfo["Temporary Visitor Parking Renewal"] == "CHECKED" && (AInfo["Age 65 or older?"] == "No" || AInfo["Age 65 or older?"] == "N")) {
	addFee("PIRP006","RESIDENTALPARKING","FINAL",1,"Y");
	}

if (feeExists("PIRP006","NEW","INVOICED") && (AInfo["Temporary Visitor Parking Renewal"] != "CHECKED" && AInfo["Age 65 or older?"] == "No") || (AInfo["Temporary Visitor Parking Renewal"] == "CHECKED" && AInfo["Age 65 or older?"] == "Yes")) {
	removeFee("PIRP006","FINAL");
	}

if (!feeExists("PIRP002","NEW","INVOICED") && AInfo["Residential Parking Renewal"] == "CHECKED" && (AInfo["Age 65 or older?"] == "No" || AInfo["Age 65 or older?"] == "N")) {
	addFee("PIRP004","RESIDENTALPARKING","FINAL",1,"Y") && addFee("PIRP002","RESIDENTALPARKING","FINAL",1,"Y");
	}
	
//DLH 171012 conversion end