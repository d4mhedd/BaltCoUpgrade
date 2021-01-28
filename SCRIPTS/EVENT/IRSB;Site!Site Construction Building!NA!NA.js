//IRSB;Site!Site Construction Building!NA!NA
if (inspResult == "Fail - Re-Inspection Fee") {
	FEE_UTILS_MODULE.addFeeWithVersion("DS0097", "BUILDING",AInfo['feeScheduleVersion'], "FINAL", 1);
	invoiceFee("DS0097", "FINAL");
	}