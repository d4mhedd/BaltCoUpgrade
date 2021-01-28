//PRA;DEQ!AP!FugitiveDust!NA
if (!FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	editAppSpecific("actualStartDate", dateAdd(null,0));
	editAppSpecific("actualEndDate", dateAdd(null,364));
	}
