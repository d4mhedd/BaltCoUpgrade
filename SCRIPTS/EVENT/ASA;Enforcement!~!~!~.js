//ASA;Enforcement!~!~!~
if (!publicUser && parcelExistsOnCap()) {
	APO_FUNCTIONS.loadExtraParcelData(capId);
	}

if (parcelExistsOnCap() && AInfo['supervisorDistrict'] == "Auto - From Parcel") {
	APO_FUNCTIONS.getSupervisorDistrictofPrimaryParcel(capId);
	}

if (appMatch("Enforcement/Complaints/NA/NA")) {
	branch ("Enforcment_Complaint_Assign_WF");
	}

if (appMatch("Enforcement/Violations/NA/NA")) {
	branch ("Enforcment_Violations_Assign_WF");
	}