//ASA;Planning!Conditional Use!NA!NA
DEV_LYNDA_WACHT.getFeeSchedVersion();
updateTask("Application Intake","Submitted","Auto-Submit","Updated via Script");
if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (AInfo['type'] == "Type 1")) {
	addFee("DS0002", "CONDITIONAL USE", "FINAL", 1, "N");
	}

if (FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion'])) {
	FEE_UTILS_MODULE.ASA_ConditionalUseFees();
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (AInfo['type'] == "Type 2")) {
	addFee("DS0001", "CONDITIONAL USE", "FINAL", 1, "N");
	addFee("DS0002", "CONDITIONAL USE", "FINAL", 1, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (AInfo['type'] == "Type 3")) {
	addFee("DS0001", "CONDITIONAL USE", "FINAL", 2, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (AInfo['proposedUseOfProperty'] == "Medical Marijuana")) {
	addFee("DS0024", "CONDITIONAL USE", "FINAL", 1, "N");
	}
