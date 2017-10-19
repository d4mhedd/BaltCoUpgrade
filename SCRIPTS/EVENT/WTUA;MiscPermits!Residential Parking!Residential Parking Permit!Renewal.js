if (wfTask.equals("Issuance") && wfStatus.equals("Issued")) {
	closeTask("Issuance","Completed","Permit record was renewed","Updated via script");
	closeTask("Closure","Completed","Permit record was renewed","Updated via script.");
	updateAppStatus("Active","Renewal Issued",parentCapId);
	}