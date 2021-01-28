//WTUA;Site!Sewer Improvement Plan!NA!NA
;
// Handle iterating through submissions;
var reSubmitted= wfTask == "Application Intake" && wfStatus == "Resubmit";
if (reSubmitted) {
	editAppSpecific("submittalCounter",parseInt(AInfo['submittalCounter']) + 1);
	}

if (reSubmitted&& parseInt(AInfo['submittalCounter']) == 2) {
	addFeeWithExtraData("WW0003","SEWER IMPROVEMENT AND LAYOUT ","FINAL",PAGESUBMITTALDETAILS[1]["Number of Pages"],"N",capId,"Second submittal fee: $50 * " + PAGESUBMITTALDETAILS[1]["Number of Pages"] + " revised pages.");
	}

if (reSubmitted&& parseInt(AInfo['submittalCounter']) >= 3) {
	addFeeWithExtraData("WW0004","SEWER IMPROVEMENT AND LAYOUT ","FINAL",PAGESUBMITTALDETAILS[AInfo['submittalCounter']-1]["Number of Pages"],"N",capId,"Third and subsequent submittal fee: $39 * " + PAGESUBMITTALDETAILS[AInfo['submittalCounter']-1]["Number of Pages"] + " revised pages.");
	}

if (wfTask == "Admin Review" && wfStatus == "Administratively Complete") {
	SEWER_IMPROVEMENT_FUNCTIONS.sendEmailAtApplicationAcceptance(capId);
	}

if (wfTask=="Surveyor" && wfStatus == "Approved") {
	SEWER_IMPROVEMENT_FUNCTIONS.sendEmailAtApplicationAcceptance(capId);
	}

