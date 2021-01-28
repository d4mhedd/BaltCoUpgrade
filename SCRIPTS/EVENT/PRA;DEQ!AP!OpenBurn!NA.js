//PRA;DEQ!AP!OpenBurn!NA
if (!FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	UTILITYDEQMODULE.setOpenBurnASI();
	}