//DLH 171012 conversion begin

if (wfTask == "Hearing Status" && wfStatus == "Dismissed by Inspector") {
	editTaskDueDate("Hearing Status", dateAdd(AInfo["Hearing Date"],1,"Y"));
	}

if (wfTask == "Court Status" && (wfStatus == "ALJ Dismissed" || wfStatus == "Fine Imposed")) {
	closeTask("Closure","Closed","Closed by Script","");
	}

if (wfTask == "Inspection Status" && wfStatus == "Citation Mailed") {
	var cdScriptObjResult = aa.cap.getCapDetail(capId).getOutput();
	cd = cdScriptObjResult.getCapDetailModel();
	var Inspector = cd.getCreateBy();
	scheduleInspectDate("Pre Hearing Inspection",dateAdd(AInfo["Hearing Date"], -2),Inspector, null, "Scheduled via Work flow");
	}

if (wfTask == "Hearing Status" && wfStatus == "Postpone or Rescheduled") {
	scheduleInspectDate("Pre Hearing Inspection",dateAdd(AInfo["Hearing Date"], -2),getLastInspector("Pre Hearing Inspection"), null, "Scheduled via Inspection Result");
	}

if ((wfTask == "Inspection Status" && wfStatus == "Ticket - Paid")) {
	closeTask("Closure","Closed","Closed by Script","");
	}

if (wfTask=="Closure") {
	closeTask("Closure", "Closed", "Closed by Script", "");
	}

if ((wfStatus == "Dismissed by Inspector")) {
	closeTask("Closure","Close - Dismissed","Closed by Script","");
	}

if ((wfTask == "" && (wfStatus == "Closed-Paid" || wfStatus == "Closed-Lien"))) {
	closeTask("Closure","Closed","Closed by Script","");
	}

if ((wfStatus == "Out to Contractor")) {
	updateTask("Inspection Status", "Out to Contractor", "Updated by Script", "");
	scheduleInspectDate("Re-Inspection",nextWorkDay(dateAdd(null,30)),getLastInspector("Initial Inspection"));
	}
	
//DLH 171012 conversion end