//PRA;DEQ!AP!~!~
if (PaymentCashierId.indexOf("PUBLICUSER") > -1 && balanceDue == 0) {
	UTILITYDEQMODULE.createPermitAndAdvanceWF(capId);
	}
