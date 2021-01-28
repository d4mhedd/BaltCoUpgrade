//WTUB;Planning!Variance and Modifications!NA!NA
if (wfTask=="Routing" && wfStatus=="In Review") {
	closeTask("Notification","In Progress", "Closed via script","");
	//deactivateTask("DSD - Planning");
	deactivateTask("OSC - Cultural Resources");
	deactivateTask("OSC - Environmental Planning");
	deactivateTask("DEQ");
	deactivateTask("DOT");
	deactivateTask("RWRD");
	deactivateTask("RFCD");
	deactivateTask("NRPR");
	}
