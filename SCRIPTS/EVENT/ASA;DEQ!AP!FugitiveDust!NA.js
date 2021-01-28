//ASA;DEQ!AP!FugitiveDust!NA
if (!FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	UTILITYDEQMODULE.addFugDustFees(AInfo['totalMultiActivityAcres'], AInfo['blasting'], AInfo['totalLandStrip'], AInfo['totalRoadConstruction'], AInfo['totalTrenching']);
	}

if (FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	FEE_UTILS_MODULE.removeAllFeesExcept(capId, null);
	UTILITYDEQMODULE.addFugDustFees(AInfo['totalMultiActivityAcres'], AInfo['blasting'], AInfo['totalLandStrip'], AInfo['totalRoadConstruction'], AInfo['totalTrenching']);
	}

closeTask("Application Submittal","Complete", "Auto-submit", "Closed via script" );
updateAppStatus("Pay Fees","Automatic");