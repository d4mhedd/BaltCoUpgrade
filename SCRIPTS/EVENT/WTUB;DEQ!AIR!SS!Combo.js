//WTUB;DEQ!AIR!SS!Combo
if (wfTask=="Invoice Fees" && wfStatus=="Payment Received" && (balanceDue >0)) {
	showMessage=true;
	comment("All fees must be paid before the permit can be issued");
	cancel = true;
	}

if (wfTask == "Issuance" && wfStatus == "Batch Pending" && (UTILITYDEQMODULE.getNumberRecordsOfTypeInState(appTypeString,"Batch Pending") > 0)) {
	cancel=true;
	showMessage = true;
	comment("<font color='red'>Only one record may be in Batch Pending status. Please check your record statuses.</font>");
	}

if (wfTask == "Admin Review" && wfStatus == "Deficiencies Resolved") {
	var blockDeficienciesResolved = false;
	var deficientDate = getAppSpecific("deficientDate");
	comment("deficient date is " + deficientDate);
	if (deficientDate == null || deficientDate == "") blockDeficienciesResolved = true;
	}

if ((wfTask == "Admin Review") && (wfStatus == "Deficiencies Resolved") && (blockDeficienciesResolved == true)) {
	showMessage=true;
	comment("<font color='red'>Deficiencies can't be resolved without first setting a status of Deficient.</font>");
	cancel = true;
	}

if ((wfTask == "Issuance") && (wfStatus == "Batch Pending") && !UTILITYDEQMODULE.canProceed(currentUserID,appTypeString)) {
	cancel=true;
	showMessage = true;
	comment("<font color='red'>Please contact your administrator for access to this operation.</font>");
	}

if (wfTask == "Issuance" && wfStatus == "Batch Pending") {
	var contact = DEV_LYNDA_WACHT.getContactObj(capId,"DE_AIRSS");
	var atoReference = contact.getASI("DE_AIRSS CONTACT INFORMATION","ATOReference");
	var permitTypeOK = true;
	}

if (wfTask == "Issuance" && wfStatus == "Batch Pending" && (atoReference == "Other" || atoReference == "None")) {
	cancel=true;
	showMessage = true;
	comment("<font color='red'>Batch processing can not be run on ATO types 'Other' or 'None'.</font>");
	}

if (wfTask == "Issuance" && wfStatus == "Batch Pending" && AInfo['permitType'] != "General" && cancel == false) {
	cancel=true;
	showMessage = true;
	comment("<font color='red'>Batch processing is triggered from General Permits.</font>");
	}

if (wfTask == "Issuance" && wfStatus == "Batch Pending" && !matches(AInfo['permitApplicationBasis'], "Minor Revision", "Significant Revision")  && cancel == false) {
	cancel=true;
	showMessage = true;
	comment("<font color='red'>Batch processing is only for revisions of General permits.</font>");
	}

if (wfTask == "Issuance" && wfStatus == "Batch Pending" && cancel == false) {
	var contactArray = getContactArray(capId);
	var contactId = contactArray[0]["refSeqNumber"];
	var permitType = UTILITYDEQMODULE.getReferenceContactASIValue(contactId, "permitType");
	var permitTypeOK = true;
	if (permitType != "General") permitTypeOK = false;
	}

if (wfTask == "Issuance" && wfStatus == "Batch Pending" && !permitTypeOK && cancel == false) {
	cancel=true;
	showMessage = true;
	comment("<font color='red'>Batch processing is triggered from General contacts.</font>");
	}





