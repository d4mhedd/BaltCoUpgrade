//ASA;Building!Model Template!~!~
editAppSpecific("modelPlanExpiration",(dateAddMonths(null,36)));
updateAppStatus("Approved for Use","Updated via script");
if (getParent()) {
	var parentId = getParent();
	aa.cap.updateCapAltID(capId, parentId.getCustomID() + "T");
	DEV_LYNDA_WACHT.addAllConditionsToExistingChildren(parentId);
	inspCancelAll();
	DEV_LYNDA_WACHT.copySchedInspAsPending(parentId, capId);
	}