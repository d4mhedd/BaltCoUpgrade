//ASA;Building!Model!~!~
if (!publicUser) {
	closeTask("Application Intake","Submitted","Application successfully submitted","Closed via script");
	editAppSpecific("applicationExpiration", (dateAddMonths(null,12)));
	}
