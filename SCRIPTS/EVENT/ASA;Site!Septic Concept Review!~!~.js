//ASA;Site!Septic Concept Review!~!~
DEV_LYNDA_WACHT.getFeeSchedVersion();
closeTask("Application Intake","Submitted","Auto-Submit","");
if (AInfo['geotechnicalReport']=="Yes") {
	addFee("DS0086","SEPTIC CONCEPT ","FINAL", 1, "N");
	}

if (FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion'])) {
	FEE_UTILS_MODULE.ASA_SepticConceptFees();
	}

editTaskSpecific("Review","numberOfSubmittals",parseInt(AInfo['numberOfSubmittals'])+ 1);
