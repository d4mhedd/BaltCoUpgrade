if (wfTask.equals("Issuance") && wfStatus.equals("Issued")) {
	closeTask("Issuance","Completed","Permit record was Amended","Updated via script");
	closeTask("Closure","Completed","","Closed via script");
	deleteCopyAddresses(capId, parentCapId);
	copyParcels(capId, parentCapId);
	copyOwner(capId, parentCapId);
	copyContacts(capId, parentCapId);
	copyAppSpecific(parentCapId);
	var currentCom=workDescGet(capId);
	updateWorkDesc(currentCom,parentCapId);
	removeASITable("ADDITIONAL RESIDENTS",parentCapId);
	removeASITable("VISITOR PERMIT",parentCapId);
	addASITable("ADDITIONAL RESIDENTS",ADDITIONALRESIDENTS,parentCapId);
	addASITable("TEMP VISITOR PARKING PERMITS",TEMPVISITORPARKINGPERMITS,parentCapId);
	}