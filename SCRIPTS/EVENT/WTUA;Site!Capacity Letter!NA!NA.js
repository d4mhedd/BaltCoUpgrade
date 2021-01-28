//WTUA;Site!Capacity Letter!NA!NA
SEWER_CAPACITY.sewerCapacityWfUpdateAfter(capId, wfTask, wfStatus);
if (wfTask == "Issuance" && wfStatus == "Issued" && (getAppSpecific("capacityLetterType", capId) == "Type III")) {
	editAppSpecific("permitExpiration",dateAdd(null,120,true));
	}

if (capStatus == "Denied") {
	editAppSpecific("typeIIILetterStatus", "Denied");
	}

