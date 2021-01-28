//ASB;Building!Floodplain Use Permit!NA!NA
loadASITablesBefore();
if (typeof(PAGESUBMITTALDETAILS) == "object" && PAGESUBMITTALDETAILS.length != 1) {
	showMessage=true;
	comment("<b><font color=RED>Please ensure the CODE Table contains only one row for this submittal.</font></b>");
	cancel=true;
	}

ASB;Building!Oversize Overweight Vehicle!NA!NA
loadASITablesBefore();
if (typeof(COUNTYROUTE) != "object") {
	showMessage=true;
	comment("<b><font color=RED>Please ensure the County Route Table contains at least one row.</font></b>");
	cancel=true;
	}

if (typeof(VEHICLEINFORMATION) != "object") {
	showMessage=true;
	comment("<b><font color=RED>Please ensure the Vehicle Information Table contains at least one row.</font></b>");
	cancel=true;
	}