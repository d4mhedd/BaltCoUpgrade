//WTUB;Site!Final Plat!NA!NA
tentPlat = false;
if (typeof tentPlat != 'undefined' && tentPlat != false && tentPlat != null) {
	tentStatus = aa.cap.getCap(tentPlat[0]).getOutput().getCapStatus();
	logDebug("tentStatus = " + tentStatus);
	} else {
	tentPlat = false;
	}

if (wfTask=="Admin Review" && wfStatus=="Deficient") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice of Admin Review Deficiency", reportParams, "","", "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}

if (wfTask == "Admin Review" && wfStatus == "Administratively Complete") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("PermitNumber", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice of Administrative Completeness Review", reportParams, "","", "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}

