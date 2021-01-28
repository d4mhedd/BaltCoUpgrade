//WTUA;Building!Construction Noise Permit!NA!NA
if (wfTask == "Review" && wfStatus == "Approved" && (FEE_UTILS_MODULE.getAssessedButNotInvoicedFeeBalance(capId) > 0  )) {
	FEE_UTILS_MODULE.invoiceAllFees(capId);
	}

if (wfTask == "Review" && wfStatus == "Approved") {
	addFee("DS0098","NOISE","FINAL",wfHours,"Y");
	UTILITYMODULE.emailReportAsync(capId, null, "WorkflowTaskUpdateAfter", "AA_APPLICATION_STATUS", "Applicant", "Notice of Project Approval", "BUILDING");
	}

if (wfTask == "Review" && wfStatus == "Request for Corrections") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = "Request for Corrections";
	UTILITYMODULE.sendEmail(capId, "Notice Request for Corrections_AllSingleReview", reportParams, "AA_APPLICATION_STATUS",templateParameters, "Applicant", "Construction Noise Permit", "WTUA", null);
	}

if (wfTask=="Issuance" && wfStatus=="Issued") {
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask=="Issuance"  && wfStatus=="Issued" && appEmail==null) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant"))comment ("Applicant " + contArray[x]["firstName"] + " " + contArray[x]["lastName"] + " does not have an email address. The address is: " + contArray[x]["addressLine1"] + " " + contArray[x]["addressLine2"] + ", " + contArray[x]["city"] + ", " +contArray[x]["state"] + " " + contArray[x]["zip"] + ". The phone number is: " + contArray[x]["phone1"] + ". The notification they need is General Permit.");
	}

if (wfTask == "Issuance" && wfStatus == "Issued" && appEmail!=null) {
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
	envParameters.put("vEmailTemplate", "AA_GENERAL_PERMIT");
	envParameters.put("vContactTypes", "Applicant");
	envParameters.put("vReportName", "General Permit");
	envParameters.put("vReportModule", "BUILDING");
	aa.runAsyncScript(vAsyncScript, envParameters);
	}