//DLH 171012 conversion begin

if (appTypeArray[2] != "Violations") {
	//branch("BRANCH:ASIUB:VALIDATE_SECONDARY_BREED");
	if ((AInfo["Primary Breed"] == null || AInfo["Primary Breed"] == "" ) && (AInfo["Secondary Breed"] != "" && AInfo["Secondary Breed"] != null)) {
		comment("Secondary Breed is not allowed if Primary Breed is Null"); 
		cancel=true;
	}
}
	
//DLH 171012 conversion end