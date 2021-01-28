//IRSB;Building!~!~!~
if (specBldgRecd && matches(inspResult, "Fail - Re-Inspection Fee", "Partial - Re-Inspection Fee", "Not Ready - Re-Inspection Fee") && typeof(AInfo['feeScheduleVersion'])!="undefined") {
	FEE_UTILS_MODULE.addFeeWithVersion("DS0097", "BUILDING", AInfo['feeScheduleVersion'], "FINAL",1);
	invoiceFee("DS0097", "FINAL");
	}

if (specBldgRecd && inspResult == "Fail - Re-Inspection Fee" && typeof(AInfo['feeScheduleVersion'])=="undefined") {
	addFee("DS0097", "BUILDING", "FINAL", 1, "Y");
	}
