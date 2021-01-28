//PRA;Site!Septic Transfer!NA!NA
if (isTaskActive("Close Out") && (capStatus == "Approved")) {
	closeTask("Close Out", "Issued", "Closed via script", "");
	var vEParams = aa.util.newHashtable();
	var vRParams = aa.util.newHashtable();
	vRParams.put("PermitNumber", capId.getCustomID());
	var vAsyncScript = "RUNREPORTEMAILASYNC";
	var envParameters = aa.util.newHashMap();
	envParameters.put("vCapId", capId);
	envParameters.put("vEventName", "WorkflowTaskUpdateAfter");
	envParameters.put("vCurrentUserID", currentUserID);
	envParameters.put("vParentCapId", "");
	envParameters.put("vEParams", vEParams);
	envParameters.put("vRParams", vRParams);
	envParameters.put("vEmailTemplate", "SEWAGE_DISPOSAL_SYSTEM_TRANSFER_CERT");
	envParameters.put("vContactTypes", "Applicant");
	envParameters.put("vReportName", "Individual Sewage Disposal System Transfer Cert");
	envParameters.put("vReportModule", "SITE");
	aa.runAsyncScript(vAsyncScript, envParameters);
	}

if (isTaskActive("Close Out") && (capStatus == "Denied")) {
	closeTask("Close Out", "Denied", "Closed via script", "");
	}


