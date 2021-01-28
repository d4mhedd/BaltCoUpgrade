//PRA;Building!COT Plan Review!NA!NA
if ((balanceDue <= 0) && isTaskActive("Close Out")) {
	closeTask("Close Out", "Paid", "Updated Via Script", null);
	updateAppStatus("Paid", "Script");
	addStdCondition("General", "Record Locked", capId);
	}
