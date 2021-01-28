//WTUB;Building!S10 Certificate of Coverage!NA!NA
if (wfTask == "Close Out" && wfStatus == "Executed" && !S10_BLDG.isGradingInspectionPassedOrPartial(parentCapId)) {
	showMessage = true;
	comment("<font color='red'>The parent building record must have a passed or partial grading inspection prior to Executing the Section 10 coverage.</font>");
	cancel = true;
	}

