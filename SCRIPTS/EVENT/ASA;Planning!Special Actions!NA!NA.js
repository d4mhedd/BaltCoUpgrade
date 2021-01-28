//ASA;Planning!Special Actions!NA!NA
DEV_LYNDA_WACHT.getFeeSchedVersion();
closeTask("Application Intake","Submitted","Auto-Submit","Closed via script");
if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion'])) {
	FEE_UTILS_MODULE.addSpecialActionFees();
	}

if (FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion'])) {
	FEE_UTILS_MODULE.SASpecialActionFees();
	}
