//WTUA;DEQ!AIR!SS!Transfer
if (wfTask == "Issuance" && wfStatus=="Notify Compliance (AIRS)") {
	var email = UTILITYDEQMODULE.getPimaCountyEmail("DEQ-TRANSFER");
	var templateParms = new Object();
	templateParms.recordId = capId.getCustomID();
	UTILITYMODULE.sendSimpleTemplateBasedEmail(capId, email, null, null, "AA_DEQ_TRANSFER_NOTIFY_COMPLIANCE", templateParms);
	}
