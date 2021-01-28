//WTUB;Site!RFCD!FIP!NA
FIP_FUNCTIONS.fipWorkflowCheckBefore(capId, wfTask, wfStatus);
if (wfStatus == "Invoice Fees") {
	feeResult = aa.fee.getFeeItems(capId).getOutput();
	var inspectionFee = false;
	}

if (wfStatus == "Invoice Fees") {
	for(x in feeResult) if(feeResult[x].getFeeCod() == "FCFIP_INSP") inspectionFee = true;
	}

if (wfStatus == "Invoice Fees" && !inspectionFee && (AInfo['tier'] == "3" || AInfo['tier'] == "4")) {
	showMessage=true;
	comment("<b><font color=RED>Not all fees have been added to the record. Please add all the fees and then invoice</font></b>");
	cancel = true;
	}

if (wfStatus == "Invoice Fees" && typeof feeResult[0] != "object" && (AInfo['tier'] == "1" || AInfo['tier'] == "2")) {
	showMessage=true;
	comment("<b><font color=RED>There are no fees to invoice on this record.</font></b>");
	cancel = true;
	}

