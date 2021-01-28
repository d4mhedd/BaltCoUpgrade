//WTUA;DEQ!AIR!SS!FC
if (wfTask=="Update Record" && wfStatus=="Closed") {
	addStdCondition("General", "Record Locked");
	closeTask("Close Out","Closed","Record has been closed.","Closed via script");
	}

if (wfTask=="Technical Review" && wfStatus=="Denied") {
	email("LPM_DEQ@pima.gov",sysFromEmail,"Facility Change Denied", capId.getCustomID() + " has had a facility change denied.");
	}

if (wfStatus == "Withdrawn") {
	closeTask("Issuance","Complete-Withdrawn","withdrawn","Closed via script","FC_FACILITYCHANGE");
	}

