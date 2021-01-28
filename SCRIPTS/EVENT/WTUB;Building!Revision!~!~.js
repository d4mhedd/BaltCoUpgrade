//WTUB;Building!Revision!~!~
if (wfTask== "Review Consolidation" && wfStatus=="Request for Corrections") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice of Request for Corrections", reportParams, "","", "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}
