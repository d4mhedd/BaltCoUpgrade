//PRA;Building!Septic!NA!NA
if (balanceDue <= 0 && isTaskActive("Admin Review")) {
	closeTask("Admin Review", "Administratively Complete", "Automatically closed by script", "", "SS_SEPTICWORKFLOWV2");
	}
