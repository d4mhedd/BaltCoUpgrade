//WATUA;Building!~!~!~
if ((specBldgRecd || matches(appTypeArray[1], "Revision", "DamageDemo", "Septic")) && wfTask=="RFCD Ad Hoc Review" && wfStatus == "Permit Required") {
	openChild = 0;
	createChildRec = false;
	arrChild = getChildren("Building/Floodplain Use Permit/NA/NA");
	for(x in arrChild) if(!WFMODULE.allTasksCompleteCapId("FC_FLOODPLAIN_PROCESS",arrChild[x])) openChild +=1;
	if(openChild == 0) createChildRec = true;
	}

if ((specBldgRecd||matches(appTypeArray[1],"Revision","DamageDemo","Septic"))&&wfTask=="RFCD Ad Hoc Review"&&wfStatus=="Permit Required"&&createChildRec) {
	parentCap=capId;
	updateTaskDepartment(wfTask,"PIMA/RFCD/NA/NA/NA/NA/NA");
	var capResult=aa.cap.getCap(capId).getOutput();
	var appName=capResult.getSpecialText();
	childCap=createChild("Building","Floodplain Use Permit","NA","NA",appName);
	capId=childCap;
	APO_FUNCTIONS.loadExtraParcelData(childCap);
	closeTask("Application Intake","Submitted","Application successfully submitted","Closed via script");
	assignTask("Review","AA_RFCD_FLOODPLAIN");
	capId=parentCap;
	APO_FUNCTIONS.loadFirmPanelData(childCap);
	FPUP_FUNCTIONS.populateASITDrivenFields(childCap);
	editAppSpecific("totalRiparian",APO_FUNCTIONS.calculateSumOfNumericASITColumn(childCap,"RIPARIAN (APO)","Total Acres"),childCap);
	editAppSpecific("riparianType",APO_FUNCTIONS.createCommaDelimitedListOfRiparianTypes(childCap),childCap);
	FPUP_FUNCTIONS.recalculateProtectedFields(childCap);
	copyOwner(capId, childCap);
	FPUP_FUNCTIONS.copyRecordDescription(parentCap,childCap);
	}

if ((specBldgRecd || matches(appTypeArray[1], "Revision", "DamageDemo", "Septic")) && wfTask=="RFCD Ad Hoc Review" && wfStatus == "Permit Required" && !createChildRec) {
	showMessage = true;
	comment("A child Floodplain Use Permit is already active on this record");
	}

if (specBldgRecd && wfTask=="Temp C of O" && wfStatus=="Approved") {
	addFee("DS0137","BUILDING","FINAL",1,"Y");
	createPendingInspection("Building", "9010 Temporary C of O");
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (specBldgRecd && wfTask=="Temp C of O" && wfStatus=="Approved" && appEmail ==null) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant")) comment ("Applicant " + contArray[x]["firstName"] + " "  + contArray[x]["lastName"] + " does not have an email address. The address is: "  + contArray[x]["addressLine1"] + " "  + contArray[x]["addressLine2"] + ", "  + contArray[x]["city"] + ", "  + contArray[x]["state"] + "  "  + contArray[x]["zip"] + ".  The phone number is: "  + contArray[x]["phone1"] + ".  The notification they need is 'AA_TEMP_C_OF_O_INSPECTION_NOTIFICATION'.");
	}

if (specBldgRecd && wfTask=="Temp C of O" && wfStatus=="Approved"  && appEmail!=null) {
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	retArr = DEV_LYNDA_WACHT.getPimaContactInfo(capId);
	templateParameters.deptPhone = retArr["contPhone"];
	templateParameters.deptWebsite = retArr["contWebsite"];
	templateParameters.department = retArr["department"];
	templateParameters.recordAlias = retArr["recordAlias"];
	templateParameters.applicant = retArr["applicant"];
	templateParameters.appStatus = capStatus;
	templateParameters.address = UTILITYMODULE.getCapAddress(capId);
	UTILITYMODULE.sendTemplateBasedEmailAndSaveAsDocument(appEmail,sysFromEmail,null,"AA_TEMP_C_OF_O_INSPECTION_NOTIFICATION",templateParameters,null);
	}

if ((specBldgRecd || appMatch("Building/Right of Way/NA/NA")) && wfTask=="Renewal" && wfStatus=="Extend App - No Fee") {
	sv_permitExpiration = getAppSpecific("permitExpiration");
	DEV_ACCELA_ENG_1.completeRenewalNoFee();
	editAppSpecific("permitExpiration", sv_permitExpiration);
	ROWMODULE.performRenewalProcessing(capId);
	}

if ((specBldgRecd) && wfTask=="Renewal" && wfStatus=="Assess Fees") {
	DEV_LYNDA_WACHT.specBldgRecdRenewalFees();
	var feeType = ADHOC_FUNCTIONS.getActiveTaskSpecific("Renewal", "Renewal Fee Type");
	var fullFee = false;
	if (feeType == "Full Fee") fullFee = true;
	}

if ((specBldgRecd) && wfTask=="Renewal" && wfStatus=="Assess Fees" && fullFee) {
	showMessage = true;
	comment("<font color='red'><b>Please add fee DS0165.</b></font>");
	}

if ((specBldgRecd) && wfTask=="Renewal" && wfStatus=="Assess Fees" && !fullFee) {
	addFee("DS0105","BUILDING","FINAL",1,"N");
	}

if (appMatch("Building/Right of Way/NA/NA") && wfTask=="Renewal" && wfStatus=="Assess Fees") {
	ROWMODULE.assessRenewalFees(capId);
	}

if ((specBldgRecd || appTypeArray[1] == "Model") && wfTask=="Revisions" && wfStatus=="In Revision") {
	countChild = 0;
	arrChild = getChildren("Building/Revision/*/*");
	openChild = 0;
	for(x in arrChild) if(!WFMODULE.allTasksCompleteCapId("BP_BUILDINGREVISION",arrChild[x])) openChild +=1;
	if(openChild > 0) comment("A Revisions record is already active on this record.");
	}

if ((specBldgRecd || appTypeArray[1] == "Model") && wfTask=="Revisions" && wfStatus=="In Revision" && openChild == 0) {
	parentCapId = capId;
	var childCap = createChild("Building","Revision","NA","NA",capName+" - Revision");
	DEV_LYNDA_WACHT.revisionsCustomID(childCap);
	capId=childCap;
	closeTask("Application Intake","Submitted","Application successfully submitted","Closed via script");
	UTILITYMODULE.addAdHocTask("ADHOC_WORKFLOW_NAME","Ad Hoc Task Launcher","");
	assignTask("Ad Hoc Task Launcher","BackgroundGU");
	capId = parentCapId;
	}

if (wfTask=="Connect Records and Conditions" && wfStatus=="Relate Record and Pull Conditions") {
	addParent(""+AInfo['Parent Record Number']);
	DEV_LYNDA_WACHT.processConditions(AInfo['Parent Record Number'], capId);
	}

if (wfTask=="Ad Hoc Task Launcher" && wfStatus=="Launch Task") {
	branch("EMSE:AdHocTaskLauncher");
	}

if ((specBldgRecd || appTypeArray[1] == "Model") && matches(wfTask, "DSD Invoicing", "Invoicing") && wfStatus=="Invoice Fees") {
	branch("EMSE:InvoiceFeeNotification");
	}

if (allTasksComplete("ADHOC_WORKFLOW_NAME", "Ad Hoc Task Launcher")&& wfStatus != "Withdrawn" && isTaskActive("Admin Review")) {
	assignTask("Admin Review","AA_DSD_ADMIN");
	}

if ((specBldgRecd || appTypeArray[1] == "Model" || appTypeArray[1] == "Right of Way") && wfTask=="Renewal" && wfStatus=="Invoice Fees") {
	branch("EMSE:InvoiceFeeNotification");
	}

if (wfTask=="Ad Hoc GIS" && wfStatus=="Send to Record Dept") {
	assignTask("Ad Hoc GIS","AA_DSD_Building");
	updateTaskDepartment("Ad Hoc GIS", lookup("REPORT_CONFIG", cap.getCapType().getAlias() + "|DepartmentContact"));
	}

if (wfTask=="Ad Hoc GIS" && wfStatus=="Send to GIS") {
	assignTask("Ad Hoc GIS","AA_GIS");
	}

