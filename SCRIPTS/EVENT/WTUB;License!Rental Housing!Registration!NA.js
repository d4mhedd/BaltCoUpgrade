if ((wfTask==("Application Acceptance") && wfStatus==("Accepted") && (AInfo["Last Inspection Date"] == null || AInfo["Last Inspection Date"] == "") )) {
	cancel=true;
	showMessage=true;
	comment("You must enter Last Inspection Date before Accepting an Application");
	}