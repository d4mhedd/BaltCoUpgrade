//ASA;Planning!Specific Plan!NA!NA
DEV_LYNDA_WACHT.getFeeSchedVersion();
updateTask("Application Intake","Submitted","Auto-Submit","Updated via Script");
FEE_UTILS_MODULE.ASA_SpecificPlanFees();
if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion'])) {
	addFee("DS0001", "SPECIFIC PLAN", "FINAL", 2, "N");
	}
