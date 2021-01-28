//WTUB;DEQ!AP!~!~
if (wfTask=="Pay Fees" && wfStatus=="Payment Received" && (balanceDue > 0)) {
	showMessage = true;
	cancel = true;
	comment("All fees must be paid before the permit can be issued");
	}

if ((appTypeString != "DEQ/AP/NESHAP/NA" && wfStatus == "Closed - Revision")) {
	cancel = true;
	showMessage = true;
	comment("'Closed - Revision' status only valid for NESHAP records");
	}

