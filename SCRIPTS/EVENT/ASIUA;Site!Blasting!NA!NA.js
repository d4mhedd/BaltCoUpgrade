//ASIUA;Site!Blasting!NA!NA
if (getAppSpecific("previousPermitRenewal") != getAppSpecific("permitRenewal")   &&  (getAppSpecific("permitRenewal") != null)) {
	editAppSpecific("previousPermitRenewal", null);
	editAppSpecific("previousPermitRenewal", getAppSpecific("permitRenewal"));
	var newExpiration = dateAdd(getAppSpecific("permitExpiration"), 30);
	editAppSpecific("permitExpiration", null);
	editAppSpecific("permitExpiration", newExpiration);
	}
