//CTRCA;Building!Right of Way!~!~
DEV_LYNDA_WACHT.copyRecordDescription(capId);
var addressListResult = aa.address.getAddressByCapId(capId);
var addressList = addressListResult.getOutput();
if (addressList.length > 0 && AInfo['location'] == null) {
	editAppSpecific("location", addressList[0].getDisplayAddress(), capId);
	}

closeTask("Application Intake","Submitted","Auto-Submit","","RW_RIGHTOFWAY");
editAppSpecific("permitRenewed", "No", capId);
editAppSpecific("commencementOfWorkWithoutPermit", "No", capId);
editAppSpecific("deptPlanReview", "DSD", capId);
editAppSpecific("payByTrust", "No", capId);
editAppSpecific("totalLinearFeetCharge", 0, capId);
editAppSpecific("staffHoursReviewCharge", 0, capId);
editAppSpecific("staffHoursInspectionCharge", 0, capId);
editAppSpecific("outsideAgencyReviewCharge", 0, capId);
editAppSpecific("outsideAgencyInspectionCharge", 0, capId);
editAppSpecific("constructionCostCharg", 0, capId);
editAppSpecific("utilityInspectionCharge", 0, capId);
editAppSpecific("aerialWorkCharge", 0, capId);
editAppSpecific("serviceMeterCharge", 0, capId);
editAppSpecific("cancellationOrModificationCharge", 0, capId);
editAppSpecific("permitRenewalCharge", 0, capId);
editAppSpecific("fugitiveDustPermitRequired", "No", capId);
ROWMODULE.setLinearFeetASI(capId);
ROWMODULE.checkForTrustOnlyLicProf(capId);
var asit = loadASITable("UTILITY TYPE", capId);
list = aa.address.getAddressByCapId(capId).getOutput();
var realStreetName;
if (list[0].getStreetName() != null) {
	realStreetName = list[0].getStreetName();
	editAppSpecific("streetName", realStreetName);
	}

if (list[0].getStreetName() == null && getAppSpecific("streetName", capId) != null) {
	realStreetName = getAppSpecific("streetName", capId);
	}

if (realStreetName != null && getAppSpecific("crossStreets", capId) != null) {
	editAppName(realStreetName +  " - " + getAppSpecific("crossStreets", capId));
	}

if (realStreetName != null && getAppSpecific("crossStreets", capId) == null) {
	editAppName(realStreetName);
	}

if (realStreetName == null && getAppSpecific("crossStreets", capId) != null) {
	editAppName(getAppSpecific("crossStreets", capId));
	}

DEV_LYNDA_WACHT.makeApplicantPrimaryContact(capId);
