//ASA;Site!Sewer Improvement Plan!NA!NA
editAppSpecific("submittalCounter",1);
// intialize the submittal counter. Setting the defauls in ASI config seems to have no effect;
addFee("WW0001","SEWER IMPROVEMENT AND LAYOUT","FINAL",1,"N");
addFee("WW0002","SEWER IMPROVEMENT AND LAYOUT","FINAL",PAGESUBMITTALDETAILS[0]["Number of Pages"],"N");
var jurisdictionFromGIS = LEGACYDEMOGISMODULE.getGISInfo2("PIMA", "Parcels", "JURIS_OL", -5, "feet");
if (typeof(jurisdictionFromGIS ) == "object") {
	editAppSpecific("jurisdiction",jurisdictionFromGIS );
	}

closeTask("Application Intake","Submitted","Auto-Submit","","WI_SEWER_IMPROVEMENT");
updateAppStatus("Submitted","Auto-set");
editAppSpecific("permitExpiration",nextWorkDay(dateAddMonths(null,24)));
CONDITIONSMODULE.addStdConditionWithTemplate("Associated Conditions","SW0040", capId);
CONDITIONSMODULE.addStdConditionWithTemplate("Associated Conditions","SW0050", capId);
