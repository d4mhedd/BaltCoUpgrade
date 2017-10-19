//DLH 171012 conversion begin

if ((AInfo["Before 1950"] == "Yes" && AInfo["Registered"] != "Yes")) {
	cancel=true;
	showMessage=true;
	comment("Is this property Lead registered with Maryland Department of Environment (MDE)?");
	}

if (((AInfo["Before 1950"] == "Yes" && AInfo["Registered"] == "Yes") && (AInfo["MDE No"] == null || AInfo["MDE No"] == "") )) {
	cancel=true;
	showMessage=true;
	comment("Maryland Department of Environment (MDE) Tracking #");
	}

if ((AInfo["Before 1950"] == "Yes" && AInfo["Registered"] == "Yes" && !(AInfo["MDE No"] == null || AInfo["MDE No"] == "") && AInfo["Reg Current"] == "Yes" && (AInfo["Lead Cert No"] == null || AInfo["Lead Cert No"] == "") )) {
	cancel=true;
	showMessage=true;
	comment("What is your Lead Certificate # for current tenancy?");
	}

if ((AInfo["Sewage System"] == "Private")) {
	cancel=true;
	showMessage=true;
	comment("If the property has a Private Sewage System you will need to apply for a Rental Exemption not a Rental License.");
	}

if ((AInfo["Smoke Connected"] == "No")) {
	cancel=true;
	showMessage=true;
	comment("Smoke Detectors are required to complete application.");
	}
	
//DLH 171012 conversion end