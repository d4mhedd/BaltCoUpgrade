//ASA;Site!Development Concept Permit!NA!NA
DEV_LYNDA_WACHT.getFeeSchedVersion();
closeTask("Application Intake","Submitted","Auto-Submit","Closed via script");
activateTask("Admin Review");
editAppSpecific("applicationExpiration",dateAddMonths(null,12));
if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (AInfo['trafficImpactStudyOrTrafficMemorandum'] == "Yes")) {
	addFee("DS0084", "DEVELOPMENT CONCEPT", "FINAL", 1, "N");
	}

if (FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion'])) {
	FEE_UTILS_MODULE.ASA_SiteDevelopementConceptFees();
	}

if (aa.parcel.getParcelByCapId(capId,null).getOutput().size() > 0) {
	if (proximityToAttribute("PIMA", "Sewer Network", 200, "feet", "STATUS", "EXISTING_PIPE") ) addStdCondition("Proximity Alert", "Proximity to sewer line", capId);
	}