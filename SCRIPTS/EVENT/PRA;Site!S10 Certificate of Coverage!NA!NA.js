//PRA;Site!S10 Certificate of Coverage!NA!NA
if (capStatus == "Pending Application Payment") {
	closeTask("Admin Review", "Application Paid", "scripted", "");
	}

if (capStatus == "Approved Pending Payment") {
	closeTask("Review", "Paid", "scripted", "");
	closeTask("Authorization", "Authorized", "scripted", "");
	UTILITYMODULE.addAdHocTask("ADHOC_WORKFLOW_NAME", "Ad Hoc GIS", "");
	DEV_LYNDA_WACHT.assignAdhocTask("Ad Hoc GIS", "AA_GIS");
	S10_SITE.updateTaskS10("Ad Hoc GIS", "Send to GIS", "Authorized", "");
	editAppSpecific("authorizationExpiration", dateAddMonths(null, 72));
	S10_SITE.sendAuthorizedEmail(capId);
	}



