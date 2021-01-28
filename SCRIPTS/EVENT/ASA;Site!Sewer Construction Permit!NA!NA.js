//ASA;Site!Sewer Construction Permit!NA!NA
updateTask("Application Intake","Submitted","Auto-Submit","Updated via Script");
setTask("Application Intake","N","Y");
setTask("Admin Review","Y","N");
updateAppStatus("Submitted","auto-submit");
if (aa.parcel.getParcelByCapId(capId,null).getOutput().size() > 0) {
	if (proximityToAttribute("PIMA", "Sewer Network", 200, "feet", "STATUS", "EXISTING_PIPE") ) addStdCondition("Proximity Alert", "Proximity to sewer line", capId);
	}

SEWER_CONSTRUCTION_MODULE.updateASIbasedFees(capId);
if (AInfo['HCSTap'] != null) {
	updateFee("WW0023","SEWER CONSTRUCTION PERMIT","FINAL",AInfo['HCSTap'],"N");
	}

if (AInfo['largeLineTap'] != null) {
	updateFee("WW0021","SEWER CONSTRUCTION PERMIT","FINAL",AInfo['largeLineTap'],"N");
	}

if (AInfo['manholeTap'] != null) {
	updateFee("WW0022","SEWER CONSTRUCTION PERMIT","FINAL",AInfo['manholeTap'],"N");
	}

if ((AInfo['permitType'] == "Small Activity" && AInfo['emergency'] == null) || (AInfo['permitType'] == "Sewer Construction Permit")) {
	CONDITIONSMODULE.addStdConditionWithTemplate("Associated Conditions","SW0010", capId);
	}

SEWER_CONSTRUCTION_MODULE.finalPlatRecordedConditionCheck(capName, capId);
editAppSpecific("oneHundreth",.01);