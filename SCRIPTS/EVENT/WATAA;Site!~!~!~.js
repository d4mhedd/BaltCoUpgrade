//WATAA;Site!~!~!~
if (wfTask=="IWC Review") {
	var params = new Object();
	params.Alias = cap.getCapType().getAlias();
	params.altID = capId.getCustomID();
	UTILITYMODULE.sendTemplateBasedEmailAndSaveAsDocument("LPM_RWRD_IWC@pima.gov",sysFromEmail,"","AA_IWC_REVIEW_EMAIL",params,null);
	}