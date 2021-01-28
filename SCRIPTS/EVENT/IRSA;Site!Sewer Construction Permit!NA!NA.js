//IRSA;Site!Sewer Construction Permit!NA!NA
if (inspTotalTime != null) {
	var totalHours = Number(getAppSpecific("totalInspectionHours", capId)) + Number(inspTotalTime);
	comment("totalHours = " + totalHours);
	editAppSpecific("totalInspectionHours", Number(totalHours), capId);
	}
