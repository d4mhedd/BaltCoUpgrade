//WATAA;Building!~!~!~
if ((specBldgRecd || appMatch("Building/Revisions/NA/NA")) && matches(wfTask, "RFCD Ad Hoc Review", "RWRD Ad Hoc Review", "Other Ad Hoc Review") && isTaskActive("Admin Review")) {
	assignTask("Admin Review","BackgroundGU");
	}

if (wfTask=="IWC Review") {
	var params = new Object();
	params.altID = capId.getCustomID();
	params.Alias = cap.getCapType().getAlias();
	UTILITYMODULE.sendTemplateBasedEmailAndSaveAsDocument("LPM_RWRD_IWC@pima.gov",sysFromEmail,"","AA_IWC_REVIEW_EMAIL",params,null);
	}
