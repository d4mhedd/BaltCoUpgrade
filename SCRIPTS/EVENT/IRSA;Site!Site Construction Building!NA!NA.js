//IRSA;Site!Site Construction Building!NA!NA
if (inspType =="9010 Temporary C of O" && inspResult == "Pass" && UTILITYMODULE.isAdhocTaskActive("Temp C of O")) {
	vEParams = aa.util.newHashtable();
	vRParams = aa.util.newHashtable();
	vEParams.put("$$altId$$",capId.getCustomID());
	vEParams.put("$$capAlias$$",cap.getCapType().getAlias());
	vEParams.put("$$capStatus$$",capStatus);
	vRParams.put("ALTID", capId.getCustomID());
	var vAsyncScript = "RUNREPORTEMAILASYNC";
	var envParameters = aa.util.newHashMap();
	envParameters.put("vCapId",capId);
	envParameters.put("vEventName","InspectionResultSubmitAfter");
	envParameters.put("vCurrentUserID",currentUserID);
	envParameters.put("vParentCapId",parentCapId);
	envParameters.put("vEParams",vEParams);
	envParameters.put("vRParams",vRParams);
	envParameters.put("vEmailTemplate","AA_PASSED_TEMP_C_OF_O");
	envParameters.put("vContactTypes","Applicant");
	envParameters.put("vReportName","Temp C of O");
	envParameters.put("vReportModule","BUILDING");
	aa.runAsyncScript(vAsyncScript, envParameters);
	}

if (inspResult == "Fail - Re-Inspection Fee") {
	branch("EMSE:InvoiceFeeNotification");
	}

if (checkInspectionResult("9010 Temporary C of O", "Pass") && UTILITYMODULE.isAdhocTaskActive("Temp C of O")) {
	closeTask("Temp C of O", "Issued", "Issued", "");
	}

var allInspPassed=DEV_LYNDA_WACHT.allInspectionsPassed();
if (isTaskActive("Inspection") && allInspPassed && balanceDue==0) {
	closeTask("Inspection", "Final Inspection Complete", "All Inspections passed", "Closed via script");
	assignTask("Close Out", "AA_DSD_BUILDING");
	editTaskDueDate("Close Out",dateAdd(null,1,"Y"));
	}

if (allInspPassed && balanceDue>0) {
	showMessage=true;
	comment("Record will not be closed because there are fees that have not been paid.");
	}

if (inspResult == "Pass") {
	editAppSpecific("permitExpiration", (dateAddMonths(null,12)));
	}

RECORD_LOCKING_FUNCTIONS.autoLockRecord(capId);
