//WTUA;Building!Site Work!NA!NA
if (wfTask == "Invoicing" && wfStatus == "Assess Fees") {
	DEV_ACCELA_ENG_1.assessElectricalFee();
	}

if (wfTask == "Invoicing" && wfStatus == "Assess Fees") {
	DEV_ACCELA_ENG_1.assessOtherStructuresFee();
	}

if (specBldgRecd && wfTask == "Invoicing" && wfStatus == "Assess Fees") {
	DEV_ACCELA_ENG_1.doubleFees();
	}

if (wfTask == "Routing" && wfStatus == "In Review" && AInfo['IWC Review'] == "CHECKED") {
	UTILITYMODULE.sendIWCemail(capId);
	}
