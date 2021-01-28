//WTUB;Site!Riparian!NA!NA
if (wfTask == "Review" && (wfStatus == "Complete" || wfStatus == "Complete with Conditions") && HEARING_FUNCTIONS.isHearingScheduled(capId,"Board of Supervisors") == false) {
	cancel=true;
	showComment=true;
	comment("<font color='red'>A Board of Supervisors hearing must be scheduled in order to proceed.</font>");
	}
