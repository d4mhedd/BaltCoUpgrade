//DLH 171012 conversion begin

var Comply = (AInfo["Compliance Date"]);
var Hearing = (AInfo["Hearing Date"]);
if (((Comply == null) || (Comply == "")) && ((inspResult == "Correction Notice Issued") || (inspResult == "Research"))) {
	cancel=true;
	showMessage=true;
	comment("COMPLIANCE DATE NEEDED");
	}

if (((Hearing == null) || (Hearing == "")) && ((inspResult == "Citation Issued") || (inspResult == "Citation To Be Issued"))) {
	cancel=true;
	showMessage=true;
	comment("HEARING DATE NEEDED");
	}
	
//DLH 171012 conversion end