//ISB;Building!Septic!NA!NA
if (inspType == "3060 Septic Site Inspection" && balanceDue != 0) {
	showMessage = true;
	comment("<font color='red'>The fee balance must be $0 prior to scheduling inspection 3060.</font>");
	cancel = true;
	}
