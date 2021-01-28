//IRSB;Enforcement!Complaints!NA!NA
if (inspResult == "Maintenance Complete" && (typeof(CORRECTIVEACTIONS) == "undefined" || (typeof(CORRECTIVEACTIONS) != "undefined" && CORRECTIVEACTIONS.length==0) )) {
	showComment=true;
	comment("<font color='red'>Corrective action information must be entered in CORRECTIVE ACTIONS ASIT before proceeding.</font>");
	cancel=true;
	}
