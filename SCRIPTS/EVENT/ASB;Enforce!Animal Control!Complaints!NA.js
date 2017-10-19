//DLH 171012 conversion begin

typeOfComp=new Array();
typeOfComp = loadASITablesBefore();
if (typeof(TYPEOFCOMPLAINT)!="object" && !loadASITablesBefore()) {
	showMessage = true;
	comment("An entry is required in the Type of Complaint table before submitting the new Record");
	cancel=true;
	}

if (appTypeArray[2] != "Violations" && (AInfo["Primary Breed"] == null || AInfo["Primary Breed"] == "" ) && (AInfo["Secondary Breed"] != "" && AInfo["Secondary Breed"] != null)) {
	showMessage=true;
	comment("Secondary Breed is not allowed if Primary Breed is Null");
	cancel=true;
	}
	
//DLH 171012 conversion end