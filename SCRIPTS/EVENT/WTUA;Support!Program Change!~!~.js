//WTUA;Support!Program Change!~!~
var allowSubmit = false;
if (wfTask == "Close Out") {
	setTask("Close Out","N","Y");
	addStdCondition("General", "Record Locked", capId);
	}

if ((wfTask == "Manager Approval" && wfStatus == "Not Approved")) {
	setTask("Manager Approval","N","Y");
	setTask("Close Out","Y","Y");
	addStdCondition("General", "Record Locked", capId);
	updateAppStatus("Not Approved","");
	}

if ((wfTask == "Director Approval" && wfStatus == "Not Approved")) {
	setTask("Director Approval","N","Y");
	setTask("Close Out","Y","Y");
	addStdCondition("General", "Record Locked", capId);
	updateAppStatus("Not Approved","");
	}

if ((wfTask == "CIO Approval" && wfStatus == "Not Approved")) {
	setTask("CIO Approval","N","Y");
	setTask("Close Out","Y","Y");
	addStdCondition("General", "Record Locked", capId);
	updateAppStatus("Not Approved","");
	}

if ((wfTask == "Manager Approval" && wfStatus == "More Info Needed - AA")) {
	setTask("Manager Approval","N","Y");
	setTask("AA Admin Final Review","Y","N");
	}

if ((wfTask == "Director Approval" && wfStatus == "More Info Needed - AA")) {
	setTask("Director Approval","N","Y");
	setTask("AA Admin Final Review","Y","N");
	}

if ((wfTask == "CIO Approval" && wfStatus == "More Info Needed - AA")) {
	setTask("CIO Approval","N","Y");
	setTask("AA Admin Final Review","Y","N");
	}

if ((wfTask == "Manager Approval" && wfStatus == "Approved")) {
	setTask("Manager Approval","N","Y");
	setTask("Approved Tasks","Y","N");
	}

if ((wfTask == "Director Approval" && wfStatus == "Approved")) {
	setTask("Director Approval","N","Y");
	setTask("Approved Tasks","Y","N");
	}

if ((wfTask == "Departmental Request" && wfStatus == "Not Needed")) {
	setTask("Departmental Request","N","Y");
	setTask("Close Out","Y","Y");
	addStdCondition("General", "Record Locked", capId);
	}

if ((wfTask == "Approved Tasks" && (wfStatus == "Cancelled") || wfStatus == "Completed")) {
	setTask("Approved Tasks","N","Y");
	setTask("Close Out","Y","Y");
	addStdCondition("General", "Record Locked", capId);
	}

if ((wfTask == "CIO Approval" && wfStatus == "More Info Needed - Manager")) {
	setTask("CIO Approval","N","Y");
	setTask("Manager Approval","Y","N");
	}

if ((wfTask == "AA Admin Initial Review" && wfStatus == "Skip Section Estimates")) {
	setTask("AA Admin Initial Review","N","Y");
	setTask("AA Admin Final Review","Y","N");
	}

if (wfStatus == "Approved") {
	var templateParameters = new Object();
	templateParameters.AltID = capId.getCustomID();
	UTILITYMODULE.sendEmail(capId, null, null, "SU_PROGCHANGEAPPROVAL",templateParameters, "Internal Requestor",  cap.getCapType().getAlias(), "WTUA", null);
	}


