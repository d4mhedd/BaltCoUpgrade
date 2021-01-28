//WTUA;Building!ElecMech!NA!NA
if (wfTask == "Invoicing" && wfStatus == "Assess Fees") {
	DEV_ACCELA_ENG_1.assessElectricalFee();
	DEV_ACCELA_ENG_1.assessMechanicalPlumbingFee();
	DEV_ACCELA_ENG_1.doubleFees();
	}

if (wfTask == "Routing" && wfStatus == "In Review" && AInfo['IWC Review'] == "CHECKED") {
	UTILITYMODULE.sendIWCemail(capId);
	}

var asit = loadASITable("PROXIMITY ALERT (APO)", capId);
if (wfTask == "Admin Review" && wfStatus == "Administratively Complete") {
	var row = asit[0];
	var hdz = row["HDZ"];
	editAppSpecific("hdz", hdz);
	}
