//WTUB;DEQ!AIR!SS!EI
if ((wfTask == "Emissions Inventory Submittal" && wfStatus == "Batch Created")) {
	cancel = true;
	showMessage = true;
	comment("This status can only be set by the batch process after processing.");
	}

if (wfTask == "Emissions Inventory Submittal" && wfStatus == "Batch Pending" && (UTILITYDEQMODULE.getNumberRecordsOfTypeInState(appTypeString,"Batch Pending") > 0)) {
	cancel=true;
	showMessage = true;
	comment("<font color='red'>Only one record may be in Batch Pending status. Please check your record statuses.</font>");
	}

if (wfTask == "Emissions Inventory Submittal" && wfStatus == "Batch Pending" && !UTILITYDEQMODULE.canProceed(currentUserID,appTypeString)) {
	cancel=true;
	showMessage = true;
	comment("<font color='red'>Please contact your administrator for access to this operation.</font>");
	}
