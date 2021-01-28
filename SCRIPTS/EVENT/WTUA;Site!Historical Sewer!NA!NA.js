//WTUA;Site!Historical Sewer!NA!NA
if (wfTask == "Connection Determination" && wfStatus == "Exists") {
	editAppSpecific("historicType", "Permit Validated");
	editAppSpecific("cONNFEEActive", "Y");
	}

if (wfTask == "Connection Determination" && wfStatus == "Does Not Exist") {
	editAppSpecific("historicType", "Permit Not Validated");
	editAppSpecific("cONNFEEActive", "N");
	}

