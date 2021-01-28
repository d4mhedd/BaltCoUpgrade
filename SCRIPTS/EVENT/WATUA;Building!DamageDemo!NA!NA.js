//WATUA;Building!DamageDemo!NA!NA
if (wfTask=="Renewal" && wfStatus=="Assess Fees") {
	addFee("DS0105","DAMAGEDEMO","FINAL",1,"N");
	}

if (wfTask=="Renewal" && wfStatus=="Extend App - No Fee" && AInfo['Renewal Type'] == "Application") {
	editAppSpecific("applicationExpiration",dateAddMonths(null, 12));
	if(capStatus.indexOf("Expire") > -1) updateAppStatus(UTILITYMODULE.getMostRecentAppStatus("Application Expired"),"Updated via script");
	if(appHasCondition("General", "Applied", "30 Day Expiration Notice",null)) removeCapCondition("General","30 Day Expiration Notice");
	if(appHasCondition("General", "Applied", "Application Expired",null)) removeCapCondition("General","Application Expired");
	}
