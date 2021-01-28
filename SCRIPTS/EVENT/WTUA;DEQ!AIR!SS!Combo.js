//WTUA;DEQ!AIR!SS!Combo
if (wfTask == "EPA" && matches(wfStatus, "Denied", "Withdrawn") && isTaskActive("Public Comment")) {
	setTask("Public Comment","N","Y");
	}

if (wfTask == "Public Comment" && matches(wfStatus, "No Revision Reqd", "Complete") && isTaskActive("EPA")) {
	setTask("Invoice Fees","N","N");
	}

if (wfTask == "EPA" && matches(wfStatus, "Not Required", "Requirements Met") && isTaskActive("Public Comment")) {
	setTask("Invoice Fees","N","N");
	}

if (wfTask == "Public Comment" && wfStatus == "No Revision Reqd" && isTaskActive("EPA")) {
	updateAppStatus("EPA Review/Proposed Final");
	}

if (wfTask == "Invoice Fees" && wfStatus == "Fees Invoiced") {
	FEE_UTILS_MODULE.invoiceAllFees();
	}

if (wfTask == "Admin Review" && wfStatus == "Deficient") {
	editAppSpecific("deficientDate", dateAdd(null, 0));
	}

if (wfTask == "Admin Review" && wfStatus == "Deficiencies Resolved") {
	UTILITYDEQMODULE.extendAdminReviewDueDate();
	}

if (wfTask == "Invoice Fees" && matches(wfStatus, "Not Required", "Payment Received")) {
	editTaskDueDate("Send Final Permit",dateAddMonths (null,18));
	}

if (wfTask == "EPA" && matches(wfStatus, "Not Required", "Requirements Met", "Revise Permit") && isTaskActive("Public Comment")) {
	updateAppStatus("Public Comment");
	}

if (matches(wfTask, "Admin Review", "Technical Review", "Draft Permit")) {
	var workflowResult = aa.workflow.getTasks(capId).getOutput();
	for (i in wfObj) if (wfObj[i].getTaskDescription()==wfTask ) comment(wfObj[i].getHoursSpent());
	}

if (wfTask == "Public Comment" && wfStatus == "Not Required" && isTaskActive("EPA")) {
	updateAppStatus("EPA");
	setTask("Public Comment","N","Y");
	}

if (wfTask == "Public Comment" && wfStatus == "Not Required" && !isTaskActive("EPA")) {
	updateAppStatus("Invoice Fees");
	setTask("Public Comment","N","Y");
	setTask("Invoice Fees","Y","N");
	}

if (wfTask == "EPA" && wfStatus == "Revise Permit") {
	setTask("Public Comment","N","Y");
	setTask("EPA","N","Y");
	setTask("Draft Permit","Y","N");
	updateAppStatus("Draft Permit");
	}

if (wfTask == "EPA" && wfStatus == "Not Required" && !isTaskActive("Public Comment")) {
	updateAppStatus("Invoice Fees");
	}

if (wfTask == "Public Comment" && wfStatus == "Complete" && !isTaskActive("EPA")) {
	updateAppStatus("Invoice Fees");
	}

if (wfTask == "Issuance" && wfStatus == "Batch Pending") {
	aa.sendEmail(sysFromEmail,lookup("DEQ_PERIODIC_BATCH_EMAIL_CONTACTS",appTypeString),null,"Execute batch job","Please execute the DEQ AIR-SS-Combo Creation batch job.",null);
	editAppName("Batch Source",capId);
	}





