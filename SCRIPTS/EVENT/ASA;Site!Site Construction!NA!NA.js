//ASA;Site!Site Construction!NA!NA
closeTask("Application Intake","Submitted","Auto-Submit","Closed via script");
editTaskDueDate("Admin Review",dateAdd(null,1,"Y"));
editAppSpecific("applicationExpiration", (dateAddMonths(null,12)));
if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (AInfo['landscapePlanNumberOfPlanSheets'] > 0 && AInfo['nativePlantPreservationPlanException'] == "No")) {
	addFee("DS0074", "SITE CONSTRUCTION", "Final", 1, "N");
	addFee("DS0075", "SITE CONSTRUCTION", "Final", 1, "N");
	}

if (FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion'])) {
	FEE_UTILS_MODULE.ASA_SiteConstructionFees();
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (AInfo['trafficImpactStudyOrTrafficMemorandum'] == "Yes")) {
	addFee("DS0084", "SITE CONSTRUCTION", "Final", 1, "N");
	}

if (aa.parcel.getParcelByCapId(capId,null).getOutput().size() > 0) {
	if (proximityToAttribute("PIMA", "Sewer Network", 200, "feet", "STATUS", "EXISTING_PIPE") ) addStdCondition("Proximity Alert", "Proximity to sewer line", capId);
	}

editAppSpecific("totalRiparianOnProperty",APO_FUNCTIONS.calculateSumOfNumericASITColumn(capId,"RIPARIAN (APO)","Total Acres"));
editAppSpecific("riparianType",APO_FUNCTIONS.createCommaDelimitedListOfRiparianTypes(capId));
RIPARIAN_FUNCTIONS.recalculateProtectedFieldsSC(capId);
