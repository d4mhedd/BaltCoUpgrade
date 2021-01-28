//WTUB;Building!Floodplain Use Permit!NA!NA
if (((wfTask == "Issuance" && wfStatus == "Issued") || (wfTask == "Issuance" && wfStatus == "Issued - Documents Required")) && DEV_LYNDA_WACHT.hasPriorToIssuanceCondition() != false) {
	showMessage=true;
	comment("There is a Prior to Issuance condition on this record.");
	cancel = true;
	}

if (((wfTask == "Issuance" && wfStatus == "Issued") || (wfTask == "Issuance" && wfStatus == "Issued - Documents Required")) && (balanceDue >0)) {
	showMessage=true;
	comment("<b><font color=RED> Fee balance must be $0.00 before proceeding. </font></b>");
	cancel=true;
	}
