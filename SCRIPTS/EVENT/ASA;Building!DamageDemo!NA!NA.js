//ASA;Building!DamageDemo!NA!NA
DEV_LYNDA_WACHT.getFeeSchedVersion();
closeTask("Application Intake","Submitted","Application successfully submitted","Complete via script");
createPendingInspection("BP_Damage","9050 Investigative Inspection");
editAppSpecific("applicationExpiration", dateAddMonths(null,12));
if (AInfo['subType'] == "Demolitions") {
	var toEmail = UTILITYMODULE.getPimaCountyDEQgeneralEmail();
	var params = new Object();
	params.recordId = capId.getCustomID();
	UTILITYMODULE.sendTemplateBasedEmailAndSaveAsDocument(toEmail, sysFromEmail, null , "AA_DEMOLITION_NOTIFICATION" , params, null);
	}

if (proximityToAttribute("PIMA","Sewer Network",200,"feet","STATUS","EXISTING_PIPE")) {
	addStdCondition("Right of Way", "Sewer Line Proximity", capId);
	//showMessage = true;
	comment("<B><Font Color=RED>NOTICE: This Parcel is within 200 feet of Public Sewer</B></Font>");
	}

var asit = loadASITable("PROXIMITY ALERT (APO)", capId);
var row = asit[0];
var hdz = row["HDZ"];
editAppSpecific("hdz", hdz);