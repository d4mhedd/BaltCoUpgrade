//DLH 171012 conversion begin

if (wfTask == "Impoundment" && wfStatus == "Adopted" && feeExists("IMP600")) {
	var feObj = addFee("IMP700","COMPIMPOUND","FINAL",1,"Y");
	}

if (wfTask =="Adoption" && wfStatus == "Warning Letter Sent") {
	editTaskDueDate("Adoption",dateAdd("",30));
	}

if (wfTask =="Adoption" && wfStatus == "Violation Letter/Citation Sent") {
	editTaskDueDate("Adoption",dateAdd("",30));
	}

if (wfTask == "Impoundment" && wfStatus == "Redeemed") {
	updateAppStatus("Redeemed");
	}
	
//DLH 171012 conversion end