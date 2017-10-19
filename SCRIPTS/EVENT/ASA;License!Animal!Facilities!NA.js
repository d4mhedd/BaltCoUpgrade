//DLH 171012 conversion begin

if (AInfo["Type of Facility"] == "Commercial Kennel/Cattery") {
	var feObj = addFee("LF100","LICFACILITY","FINAL",1,"Y");
	}

if (AInfo["Type of Facility"] == "Fancier Kennel/Cattery") {
	var feObj = addFee("LF200","LICFACILITY","FINAL",1,"Y");
	}

if (AInfo["Type of Facility"] == "Grooming Parlor") {
	var feObj = addFee("LF300","LICFACILITY","FINAL",1,"Y");
	}

if (AInfo["Type of Facility"] == "Non-Profit Holding Facility") {
	var feObj = addFee("LF400","LICFACILITY","FINAL",1,"Y");
	}

if (AInfo["Type of Facility"] == "Pet Shop") {
	var feObj = addFee("LF500","LICFACILITY","FINAL",1,"Y");
	}

if (AInfo["Type of Facility"] == "Riding/Boarding Stable") {
	var feObj = addFee("LF600","LICFACILITY","FINAL",1,"Y");
	}

if (AInfo["Type of Facility"] == "Wild Animal Permit") {
	var feObj = addFee("LF700","LICFACILITY","FINAL",1,"Y");
	}

if (currentUserGroup != "LicensePublicUser") {
	closeTask("Application Acceptance","Accepted","Closed via Script");
	closeTask("Zoning Review","Approved","Closed via Script");
	closeTask("Inspection","Satisfactory","Closed via script but need users to do this");
	updateTask("License Issuance", "Issued", "Updated via script");
	}

//DLH 171012 conversion end