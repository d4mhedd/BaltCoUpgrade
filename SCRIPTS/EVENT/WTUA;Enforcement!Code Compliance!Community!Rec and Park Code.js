//DLH 171012 conversion begin

if (wfTask == "Court Status" && (wfStatus == "ALJ Dismissed")) {
	closeTask("Closure","Closed","Closed by Script","");
	}

if (wfTask == "Inspection Status" && (wfStatus == "Ticket - Paid" || wfStatus == "Ban Letter - Issued")) {
	closeTask("Hearing Status","Completed","Closed by Script","");
	closeTask("Court Status","Completed","Closed by Script","");
	closeTask("Closure","Closed","Closed by Script","");
	}

if (wfTask=="Closure") {
	closeTask("Closure", "Closed", "Closed by Script", "");
	}

if (wfStatus == "Hearing Held") {
	closeTask("Hearing Status","Hearing Held","Closed by Script","");
	}

if ((wfTask == "Hearing Status" && wfStatus == "Dismissed" || wfTask == "Court Status" && wfStatus == "Dismissed")) {
	closeTask("Inspection Status", "Dismissed", "Closed by Script", "");
	closeTask("Hearing Status", "Dismissed", "Closed by Script", "");
	closeTask("Court Status", "Dismissed", "Closed by Script", "");
	closeTask("Closure", "Closed - Dismissed", "Closed by Script", "");
	}
	
//DLH 171012 conversion end