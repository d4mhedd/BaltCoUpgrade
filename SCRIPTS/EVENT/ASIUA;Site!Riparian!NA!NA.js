//ASIUA;Site!Riparian!NA!NA
if (AInfo['inLieuFeeAdded'] == "No" && AInfo['inLieuFeeAmount'] != "") {
	editAppSpecific("inLieuFeeAdded","Yes");
	RIPARIAN_FUNCTIONS.addFeeToRiparianParent(capId, Number(AInfo['inLieuFeeAmount']));
	}

if (AInfo['riparianType'] != "") {
	RIPARIAN_FUNCTIONS.updateMonitoringReportInformation(capId,AInfo['riparianType'],AInfo['mitigationCompletionDate']);
	}

if (AInfo['riparianType'] == "") {
	showComment=true;
	comment("<font color='red'>Must enter Riparian Type first for Monitoring Report Dates to populate.</font>");
	cancel=true;
	}
