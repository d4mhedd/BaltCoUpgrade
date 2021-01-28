//WTUB;Enforcement!~!~!~
if (appMatch("Enforcement/Violations/NA/NA") && AInfo['department'] == "DSD" && wfTask == "Notifications" && wfStatus == "Notice Issued" && HEARINGS.length == 0) {
	showMessage=true;
	comment("<b><font color=RED> Hearing date must be populated in the HEARINGS ASIT.</font></b>");
	cancel=true;
	}

