//PRA;Site!Sewer Construction Permit!NA!NA
if (AInfo['permitType'] == "Sewer Construction Permit" && feeBalance("WW0024") == 0 && feeExists("WW0024", "INVOICED")) {
	editAppSpecific("permitExpiration", dateAddMonths(getAppSpecific("permitExpiration"), 6));
	}
