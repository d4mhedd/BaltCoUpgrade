//ASB;Building!Right of Way!NA!NA
if (!ROWMODULE.haveValidNumberOfServiceMeters(capId)) {
	showMessage=true;
	comment("<font color='red'>Maximum of six service meters allowed in UTILITY TYPE ASIT.</font>");
	cancel=true;
	}
