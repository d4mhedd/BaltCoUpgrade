//ASB;Site!Sewer Improvement Plan!NA!NA
loadASITablesBefore();
if (typeof(PAGESUBMITTALDETAILS) != "object") {
	showMessage=true;
	comment("<b><font color=RED>Please ensure the Page Submittal Details Table contains information for this submittal.</font></b>");
	cancel=true;
	}

if (typeof(PAGESUBMITTALDETAILS) == "object" && PAGESUBMITTALDETAILS.length != 1) {
	showMessage=true;
	comment("<b><font color=RED>Please ensure the Page Submittal Details Table contains only one row for this submittal.</font></b>");
	cancel=true;
	}
