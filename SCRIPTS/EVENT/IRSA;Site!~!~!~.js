//IRSA;Site!~!~!~
if (matches(appTypeArray[1],"Site Construction","Site Construction Building") && inspType == "0210 Grading" && matches(inspResult, "Pass", "Partial")) {
	S10_SITE.gradingInspectionPassedOrPartial(capId);
	}

var recordID = capId.getCustomID();
if (AInfo['section10OptIN'] == "Yes" && (inspType == "0210 Grading") && matches(inspResult, "Pass", "Partial", "Partial - Re-Inspection Fee")) {
	UTILITYMODULE.attachReportToChildRecord("OSC_CertOfCoverExecuted", capId, "Site", "*/S10 Certificate of Coverage/NA/NA", "ALTID", recordID);
	}
