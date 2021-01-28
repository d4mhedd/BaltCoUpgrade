//ASA;Building!Right of Way!NA!NA
closeTask("Application Intake","Submitted","Auto-Submit","","RW_RIGHTOFWAY");
ROWMODULE.updateUtilityTypeTableAndDerivedFields(capId);
if (AInfo['smallCell'] != "Yes" && !publicUser) {
	ROWMODULE.assessFees(capId);
	}

if (AInfo['constructionType'] != "Utility") {
	editTaskDueDate("Admin Review",dateAdd(null,3,"Y"));
	editTaskDueDate("Review Consolidation",dateAdd(null,10,"Y"));
	}

editAppSpecific("sentRiskReviewLetter","No");
var output = ROWMODULE.getNumOutsideAgencyHours(capId);
editAppSpecific("improvementOutsideAgency",output.review);
if (AInfo['makeDuration'] == null) {
	var expDays = ROWMODULE.getExpirationDays(capId);
	var fromDate = new Date();
	fromDate.setDate(fromDate.getDate());
	var toDate = new Date();
	toDate.setDate(fromDate.getDate() + expDays);
	editAppSpecific("makeDuration", UTILITYMODULE.dateDiffIncludingWorkDaysAndPimaHolidays(fromDate, toDate));
	}

if (AInfo['deptPlanReview'] == "DSD") {
	var taskArray = ["Application Intake", "Admin Review", "Routing", "Review Consolidation", "Issuance"];
	ROWMODULE.assignMultiTasks(taskArray, "AA_DSD_SITE", capId);
	}

if (AInfo['smallCell'] != "Yes") {
	CONDITIONSMODULE.addStdConditionWithTemplate("Associated Conditions", "RW0346", capId);
	}

if (AInfo['smallCell'] == "Yes" && !publicUser) {
	addFee("TR0072","RIGHT OF WAY","FINAL",1,"N");
	}

ROWMODULE.setLinearFeetASI(capId);
ROWMODULE.checkForTrustOnlyLicProf(capId);
var asit = loadASITable("UTILITY TYPE", capId);
if (typeof asit == "object" && asit.length > 0) {
	var row = asit[0];
	var linearFeet = row["Total Utility Trenching Linear Feet"];
	}

if (typeof asit == "object" && asit.length > 0 && (linearFeet >= 300)) {
	editAppSpecific("fugitiveDustPermitRequired", "Yes");
	}

if (typeof asit == "object" && asit.length > 0 && (linearFeet < 300)) {
	editAppSpecific("fugitiveDustPermitRequired", "No");
	}

list = aa.address.getAddressByCapId(capId).getOutput();
var realStreetName;
if (list.length > 0) {
	realStreetName = list[0].getStreetName();
	editAppSpecific("streetName", realStreetName);
	}

if (list.length <= 0 && AInfo['streetName'] != null) {
	realStreetName = AInfo['streetName'];
	}

if (realStreetName != null && AInfo['crossStreets'] != null) {
	editAppName(realStreetName +  " - " + AInfo['crossStreets']);
	}

if (realStreetName != null && AInfo['crossStreets'] == null) {
	editAppName(realStreetName);
	}

if (realStreetName == null && AInfo['crossStreets'] != null) {
	editAppName(AInfo['crossStreets']);
	}

ASA;Building!S10 Certificate of Coverage!NA!NA
S10_BLDG.initializeChildRecord(capId);
