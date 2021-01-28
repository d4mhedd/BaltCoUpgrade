//ASA;Site!Sewer CA and DA!NA!NA
closeTask("Application Intake","Submitted","Auto-Submit","");
if (aa.parcel.getParcelByCapId(capId,null).getOutput().size() > 0) {
	if (proximityToAttribute("PIMA", "Sewer Network", 200, "feet", "STATUS", "EXISTING_PIPE") ) addStdCondition("Proximity Alert", "Proximity to sewer line", capId);
	}

if (AInfo['exemptionRequested'] != "CHECKED") {
	SEWER_CADA_FUNCTIONS.assessFees(capId);
	}

if (AInfo['exemptionRequested'] != "CHECKED") {
	SEWER_CADA_FUNCTIONS.invoiceFees(capId);
	}

if (AInfo['exemptionRequested'] == "CHECKED") {
	addFee('DE_WTR_06','PUBLIC WATER','FINAL',1,'Y');
	}
