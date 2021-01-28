//WTUA;Enforcement!Complaints!NA!NA
if (wfTask == "Close Out" && wfStatus == "Closed - Enforcement") {
	var childCapId = createChild("Enforcement","Violations","NA","NA",capName);
	copyASIFields(capId,childCapId);
	WFMODULE.setTaskByCapId("Intake","N","Y",childCapId,"CV_ENFORCEMENTPROCESS");
	WFMODULE.setTaskByCapId("Notifications","Y","N",childCapId,"CV_ENFORCEMENTPROCESS");
	UTILITYMODULE.assignTaskByCapId("Notifications", currentUserID,  childCapId, "CV_ENFORCEMENTPROCESS" );
	updateAppStatus("In Progress","auto-submit",childCapId);
	INSPECTIONMODULE.copyInspectionsAndAppendTextToType(capId,childCapId, null);
	copyOwner(capId, childCapId);
	}

if (wfTask == "Close Out" && wfStatus == "Closed - Enforcement") {
	var parentDesc = aa.cap.getCapWorkDesByPK(capId).getOutput().getDescription();
	var childDesc = aa.cap.getCapWorkDesByPK(childCapId).getOutput();
	childDesc.setDescription(parentDesc);
	aa.cap.editCapWorkDes(childDesc.getCapWorkDesModel());
	}

if (wfTask == "Close Out" && wfStatus == "Closed - Enforcement") {
	PERSON_FUNCTIONS.changeContactType(childCapId,"Responsible Person/Party","Violator");
	}

if (wfTask == "Close Out" && wfStatus == "Closed - Enforcement") {
	copyASITables(capId,childCapId);
	}

if (wfTask == "Close Out" && wfStatus == "Closed - Enforcement" && AInfo['department'] == "DEQ") {
	ENFORCEMENT_FUNCTIONS.setCapAssignedUser(capId, childCapId, AInfo['department']);
	}

