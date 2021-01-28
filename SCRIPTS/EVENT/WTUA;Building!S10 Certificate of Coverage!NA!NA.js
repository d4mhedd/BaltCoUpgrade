//WTUA;Building!S10 Certificate of Coverage!NA!NA
if ((wfTask == "Authorization") && (wfStatus == "Authorized")) {
	editAppSpecific("authorizationExpiration", dateAddMonths(null, 72));
	}

if (wfTask == "Close Out" && wfStatus == "Executed" && S10_BLDG.isGradingInspectionPassedOrPartial(parentCapId)) {
	UTILITYMODULE.addAdHocTask("ADHOC_WORKFLOW_NAME", "Ad Hoc GIS", "");
	DEV_LYNDA_WACHT.assignAdhocTask("Ad Hoc GIS", "AA_GIS");
	S10_BLDG.updateTaskS10("Ad Hoc GIS", "Send to GIS", "Executed", "");
	}
