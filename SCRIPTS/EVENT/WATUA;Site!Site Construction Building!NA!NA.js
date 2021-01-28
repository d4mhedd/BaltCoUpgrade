//WATUA;Site!Site Construction Building!NA!NA
if (wfTask=="Revisions" && wfStatus=="In Revision") {
	countChild = 0;
	arrChild = getChildren("Building/Revision/*/*");
	openChild = 0;
	for(x in arrChild) if(!WFMODULE.allTasksCompleteCapId("BP_BUILDINGREVISION",arrChild[x])) openChild +=1;
	if(openChild > 0) comment("A Revisions record is already active on this record.");
	}

if (wfTask=="Revisions" && wfStatus=="In Revision" && openChild == 0) {
	parentCapId = capId;
	var childCap = createChild("Building","Revision","NA","NA",capName+" - Revision");
	DEV_LYNDA_WACHT.revisionsCustomID(childCap);
	capId=childCap;
	closeTask("Application Intake","Submitted","Application successfully submitted","Closed via script");
	UTILITYMODULE.addAdHocTask("ADHOC_WORKFLOW_NAME","Ad Hoc Task Launcher","");
	assignTask("Ad Hoc Task Launcher","BackgroundGU");
	capId = parentCapId;
	}

if (wfTask=="Renewal" && wfStatus=="Assess Fees") {
	addFee("DS0105","BUILDING","FINAL",1,"N");
	DEV_LYNDA_WACHT.specBldgRecdRenewalFees();
	}

if (wfTask=="Temp C of O" && wfStatus=="Approved") {
	addFee("DS0137","BUILDING","FINAL",1,"Y");
	createPendingInspection("Building", "9010 Temporary C of O");
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask=="Temp C of O" && wfStatus=="Approved" && appEmail ==null) {
	showMessage=true;
	contArray= getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant")) comment ("Applicant " +contArray[x]["firstName"] + " " + contArray[x]["lastName"] + " does not have an email address. The address is: " +contArray[x]["addressLine1"] + " " + contArray[x]["addressLine2"] + ", " + contArray[x]["city"] + ", " + contArray[x]["state"] +" " + contArray[x]["zip"] + ". The phone number is: " + contArray[x]["phone1"] + ". The notification they need is'AA_TEMP_C_OF_O_INSPECTION_NOTIFICATION'.");
	}

if (wfTask=="Temp C of O" && wfStatus=="Approved"  && appEmail!=null) {
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	retArr = DEV_LYNDA_WACHT.getPimaContactInfo(capId);
	templateParameters.deptPhone = retArr["contPhone"];
	templateParameters.deptWebsite = retArr["contWebsite"];
	templateParameters.department = retArr["department"];
	templateParameters.recordAlias = retArr["recordAlias"];
	templateParameters.applicant = retArr["applicant"];
	templateParameters.appStatus = capStatus;
	UTILITYMODULE.sendTemplateBasedEmailAndSaveAsDocument(appEmail,sysFromEmail,null,"AA_TEMP_C_OF_O_INSPECTION_NOTIFICATION",templateParameters,null);
	}