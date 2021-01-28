//WTUA;Building!Floodplain Use Permit!NA!NA
if ((wfTask == "Review" && (wfStatus == "Approved" || wfStatus == "Request for Corrections")) || (wfTask == "Inspection" && wfStatus == "Revisions")) {
	editAppSpecific("applicationExpiration", null);
	editAppSpecific("applicationExpiration", dateAdd(null, 90));
	}

if ((wfTask == "Issuance" && wfStatus == "Issued") || (wfTask == "Issuance" && wfStatus == "Issued - Documents Required")) {
	editAppSpecific("permitExpiration", null);
	editAppSpecific("permitExpiration", dateAdd(null, 365));
	}

if (wfTask == "Inspection" && wfStatus == "Revisions") {
	editAppSpecific("permitExpiration", null);
	}

if (wfTask=="Inspection" && wfStatus=="Request for Document Corrections") {
	assignTask("Inspection","RFCD WAIT");
	}