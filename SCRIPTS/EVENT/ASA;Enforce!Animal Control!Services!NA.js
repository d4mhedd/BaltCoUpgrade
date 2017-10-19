//DLH 171012 conversion begin

if (AInfo["Adoption"]=="No" && matches(AInfo["Service Type"], "Microchipping")) {
	var feObj = addFee("SVC100","COMPSERV","FINAL",1,"Y");
	}

if (AInfo["Adoption"]=="No" && matches(AInfo["Service Type"], "Rabies- Baltimore County and Microchipping")) {
	var feObj = addFee("SVC200","COMPSERV","FINAL",1,"Y");
	var feObj = addFee("SVC100","COMPSERV","FINAL",1,"Y");
	}

if (AInfo["Adoption"]=="No" && matches(AInfo["Service Type"], "Rabies- Baltimore County")) {
	var feObj = addFee("SVC200","COMPSERV","FINAL",1,"Y");
	}

if (AInfo["Adoption"]=="No" && matches(AInfo["Service Type"], "Rabies- Clinic")) {
	var feObj = addFee("SVC300","COMPSERV","FINAL",1,"Y");
	}

if (AInfo["Adoption"]=="No" && matches(AInfo["Service Type"], "Rabies- Clinic and Microchipping")) {
	var feObj = addFee("SVC300","COMPSERV","FINAL",1,"Y");
	var feObj = addFee("SVC100","COMPSERV","FINAL",1,"Y");
	}

if (AInfo["Adoption"]=="No" && matches(AInfo["Service Type"], "Rabies- Jacksonville")) {
	var feObj = addFee("SVC400","COMPSERV","FINAL",1,"Y");
	}

if (AInfo["Adoption"]=="No" && matches(AInfo["Service Type"], "Rabies- Jacksonville and Microchipping")) {
	var feObj = addFee("SVC400","COMPSERV","FINAL",1,"Y");
	var feObj = addFee("SVC100","COMPSERV","FINAL",1,"Y");
	}

//DLH 171012 conversion end