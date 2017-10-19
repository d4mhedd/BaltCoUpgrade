//DLH 171012 conversion begin

if (!feeExists("PIRP001","NEW","INVOICED") && AInfo["New Residential Parking Permit"] == "CHECKED" && (AInfo["Age 65 or older?"] == "No" || AInfo["Age 65 or older?"] == "N")) {
	addFee("PIRP001","RESIDENTALPARKING","FINAL",1,"Y");
	}

if (feeExists("PIRP001","NEW","INVOICED") && AInfo["New Residential Parking Permit"] == "CHECKED" && AInfo["Age 65 or older?"] == "Yes") {
	removeFee("PIRP001","FINAL");
	}

if (!feeExists("PIRP005","NEW","INVOICED") && AInfo["New Temporary Visitor Parking Permit"] == "CHECKED" && (AInfo["Age 65 or older?"] == "No" || AInfo["Age 65 or older?"] == "N")) {
	addFee("PIRP005","RESIDENTALPARKING","FINAL",1,"Y");
	}

if (feeExists("PIRP005","NEW","INVOICED") && (AInfo["New Temporary Visitor Parking Permit"] != "CHECKED" && AInfo["Age 65 or older?"] == "No") || (AInfo["New Temporary Visitor Parking Permit"] == "CHECKED" && AInfo["Age 65 or older?"] == "Yes")) {
	removeFee("PIRP005","FINAL");
	}
	
//DLH 171012 conversion end