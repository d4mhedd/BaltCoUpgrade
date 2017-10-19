if (((AInfo["Hearing Date"]) == "" || (AInfo["Hearing Date"]) == null) && wfStatus == "Citation Issued") {
	cancel=true;
	showMessage=true;
	comment("HEARING DATE NEEDED");
	}

if ((wfTask == "Inspection Status" && (wfStatus == "Correction Notice Issued" || wfStatus=="Correction Notice Mailed") && (AInfo["Compliance Date"] == null) || (AInfo["Compliance Date"] == ""))) {
	cancel=true;
	showMessage=true;
	comment("COMPLIANCE DATE NEEDED");
	}