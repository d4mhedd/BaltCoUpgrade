//WATAA;Site!Site Construction Building!~!~
if (matches(wfTask, "RFCD Ad Hoc Review", "RWRD Ad Hoc Review", "Other Ad Hoc Review") && isTaskActive("Admin Review")) {
	assignTask("Admin Review","BackgroundGU");
	}
