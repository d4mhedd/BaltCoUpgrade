//ASA;Building!Registered Plant!NA!NA
closeTask("Application Intake","Submitted","Application successfully submitted","");
if (AInfo['applicationExpiration'] ==null) {
	toDay=new Date();
	editAppSpecific("applicationExpiration","12/31/"+toDay.getFullYear().toString());
	}
