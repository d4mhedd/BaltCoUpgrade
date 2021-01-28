//WTUA;Planning!Variance and Modifications!NA!NA
if (wfTask == "Review Consolidation" && wfStatus == "Request for Corrections") {
	setTask("Review Consolidation","N","Y");
	setTask("Routing","Y","N");
	}

;
// Handle iterating through the routing task;
var inReview = (wfTask == "Routing" && wfStatus == "In Review");
if (inReview) {
	editAppSpecific("submittalCounter",parseInt(AInfo['submittalCounter']) + 1);
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (inReview && parseInt(AInfo['submittalCounter']) >= 3)) {
	addFee("DS0025", "VARIANCE AND MODIFICATIONS", "FINAL", 1, "N");
	}

;
// Handle notification fees;
;
// Handle continuance fee;
if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Hearing" && wfStatus == "Continued by Applicant")) {
	addFee("DS0047", "VARIANCE AND MODIFICATIONS", "FINAL", 1, "N");
	}

if (wfTask == "Close Out" && wfStatus == "Planning Documents Updated") {
	CONDITIONSMODULE.copyConditionsToParcel(capId);
	}

if (wfTask == "Hearing" && ( (wfStatus=="Continued by Applicant") || (wfStatus=="Continued by Board") )) {
	setTask("Hearing","N","Y");
	setTask("Staff Report","Y","N");
	}

if (wfTask=="Routing" && wfStatus=="In Review") {
	setTask("Notification", "Y","N");
	}

if ((AInfo['typeRequested'] != "RWRD Standards Variance") && (wfTask == "Hearing" && matches(wfStatus, "Approved", "Denied"))) {
	UTILITYMODULE.sendSurveyEmail(capId);
	}

