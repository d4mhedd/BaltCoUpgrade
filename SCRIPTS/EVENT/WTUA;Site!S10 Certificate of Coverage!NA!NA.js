//WTUA;Site!S10 Certificate of Coverage!NA!NA
if (wfTask == "Application Intake" && wfStatus == "Submitted") {
	editAppSpecific("applicationExpiration", dateAdd(null,90));
	}

if (wfTask == "Review" && wfStatus == "Legal Doc Recorded" && AInfo['monitoringFee'] == "Yes") {
	S10_SITE.handleLegalDocumentRecorded(capId);
	}

if (wfTask == "Admin Review" && wfStatus == "Eligible") {
	S10_SITE.invoiceApplicationFee(capId);
	}

if (wfTask == "Authorization" && wfStatus ==  "Authorized") {
	UTILITYMODULE.addAdHocTask("ADHOC_WORKFLOW_NAME", "Ad Hoc GIS", "");
	DEV_LYNDA_WACHT.assignAdhocTask("Ad Hoc GIS", "AA_GIS");
	editAppSpecific("authorizationExpiration", dateAddMonths(null, 72));
	S10_SITE.updateTaskS10("Ad Hoc GIS", "Send to GIS", "Authorized", "");
	S10_SITE.sendAuthorizedEmail(capId);
	}

if (wfTask == "Admin Review" && wfStatus == "Ineligible") {
	S10_SITE.sendIneligibleEmail(capId);
	}

if (wfTask == "Admin Review" && wfStatus == "Deficient") {
	S10_SITE.sendDeficientEmail(capId);
	}

if (wfTask == "Review" && wfStatus == "Request for Corrections") {
	S10_SITE.sendRequestForCorrectionsEmail(capId);
	}

if (wfTask == "Admin Review" && wfStatus == "Existing Coverage") {
	S10_SITE.sendPreviouslyExecutedEmail(capId);
	closeTask("Close Out", "Existing Coverage", "Closed via script", "");
	}

if (wfStatus == "Withdrawn"  && wfTask != "Close Out") {
	S10_SITE.sendWithdrawnEmail(capId);
	}

if (wfTask == "Close Out" && wfStatus == "Executed" && S10_SITE.isGradingInspectionPassedOrPartial(parentCapId)) {
	UTILITYMODULE.addAdHocTask("ADHOC_WORKFLOW_NAME", "Ad Hoc GIS", "");
	DEV_LYNDA_WACHT.assignAdhocTask("Ad Hoc GIS", "AA_GIS");
	S10_SITE.updateTaskS10("Ad Hoc GIS", "Send to GIS", "Executed", "");
	}

if (wfTask != "Close Out") {
	WFMODULE.autoCloseTask(capId, wfStatus);
	}

