//ASA;Planning!Rezoning!NA!NA
DEV_LYNDA_WACHT.getFeeSchedVersion();
updateTask("Application Intake","Submitted","Auto-Submit","Updated via Script");
if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (AInfo['numAdvertisedPubilcHearings'] != 0)) {
	addFee("DS0001", "REZONING", "FINAL", AInfo['numAdvertisedPubilcHearings'], "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (AInfo['numUnadvertisedPubilcHearings'] != 0)) {
	addFee("DS0002", "REZONING", "FINAL", AInfo['numUnadvertisedPubilcHearings'],"N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (AInfo['siteAnalysis'] == "Yes")) {
	addFee("DS0024", "REZONING", "Final", 1, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion'])) {
	DEV_LYNDA_WACHT.addRezoningFees();
	}

if (FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion'])) {
	FEE_UTILS_MODULE.ASA_RezoningFees();
	}
