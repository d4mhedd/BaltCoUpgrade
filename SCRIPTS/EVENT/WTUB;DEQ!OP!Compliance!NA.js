//WTUB;DEQ!OP!Compliance!NA
if (wfTask == "Invoice" && wfStatus == "Payment Received" && (balanceDue >0)) {
	showMessage=true;
	comment("<font color='red'>All fees must be paid before the permit can be issued.</font>");
	cancel = true;
	}

if (wfTask == "Report" && wfStatus == "Batch Pending" && (UTILITYDEQMODULE.getNumberRecordsOfTypeInState(appTypeString,"Batch Pending") > 0)) {
	cancel=true;
	showMessage = true;
	comment("<font color='red'>Only one record may be in Batch Pending status. Please check your record statuses.</font>");
	}

if ((wfTask == "Report") && (wfStatus == "Batch Pending") && AInfo['Compliance Type'] == "Report" && AInfo['Compliance Subtype'] == "WSTSH Quarterly" && !UTILITYDEQMODULE.canProceed(currentUserID,appTypeString)) {
	cancel=true;
	showMessage = true;
	comment("<font color='red'>Please contact your administrator for access to this operation.</font>");
	}

if (cancel == false && wfTask == "Invoice" && wfStatus == "Payment Received" && AInfo['Compliance Subtype'] == "WSTHW Category Change") {
	UTILITYDEQMODULE.hazWasteNewPermit(capId);
	}


