//ASA;Site!Sewer Connection Permit!NA!NA
updateTask("Application Intake","Submitted","Auto-Submit","Updated via Script");
setTask("Application Intake","N","Y");
setTask("Admin Review","Y","N");
updateAppStatus("Submitted","auto-submit");
if (aa.parcel.getParcelByCapId(capId,null).getOutput().size() > 0) {
	if (proximityToAttribute("PIMA", "Sewer Network", 200, "feet", "STATUS", "EXISTING_PIPE") ) addStdCondition("Proximity Alert", "Proximity to sewer line", capId);
	}

var lat = getGISInfo("PIMA", "Parcels", "LAT");
var lon= getGISInfo("PIMA", "Parcels", "LON");
editAppSpecific("connfeeLattitude",lat),editAppSpecific("connfeeLongitude",lon);
SEWER_CONNECTION_FUNCTIONS.assessFees(capId, "METERS");
editAppName("SWR_" + APO_FUNCTIONS.getParcelLegalDescription(capId));
if (capName != null || capName == null) {
	editAppName("SWR_" + APO_FUNCTIONS.getParcelLegalDescription(capId));
	}
