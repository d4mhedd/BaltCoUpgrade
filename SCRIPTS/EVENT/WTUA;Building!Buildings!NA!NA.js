//WTUA;Building!Buildings!NA!NA
var asit = loadASITable("PROXIMITY ALERT (APO)", capId);
var starValleyActive = asit[0]["Star Valley TRA"];
if (starValleyActive == "Y" && wfTask == "Invoicing" && wfStatus == "Assess Fees" && matches(AInfo['subTypeASI'], "Commercial Building New", "Multi-Family Residence New Building", "Single Family Residence New") && AInfo['feesApplicable'] == "Yes") {
	FEE_UTILS_MODULE.assessStarValleyFees(capId);
	}

if (AInfo['subTypeASI'] == "Single Family Residence New" && AInfo['septicSewerReview'] == "Sewer review required" && ((wfTask == "Review Consolidation" && wfStatus == "Approved")) && !appHasCondition("Associated Conditions", "Applied", "DS1367", null)) {
	CONDITIONSMODULE.addStdConditionWithTemplate("Associated Conditions","DS1367");
	}

if (wfTask == "Routing" && wfStatus == "In Review" && AInfo['IWC Review'] == "CHECKED") {
	UTILITYMODULE.sendIWCemail(capId);
	}
