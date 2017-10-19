//DLH 171012 conversion begin

if (currentUserGroup == "LicensePublicUser" && (AInfo["Senior Citizen"] == "Yes"  ||  AInfo["Senior Citizen"] == "Y")) {
	branch("CalAnimalFeesSenior");
	}

if (currentUserGroup == "LicensePublicUser" && ( AInfo["Senior Citizen"] == "No"  ||  AInfo["Senior Citizen"] == "N")) {
	branch("CalAnimalFeesNonSenior");
	}

var parentCapId = null;
var parentCapString = "" + aa.env.getValue("ParentCapID");
if (parentCapString.length > 0) {
	parentArray = parentCapString.split("-");
	parentCapId = aa.cap.getCapID(parentArray[0],parentArray[1],parentArray[2]).getOutput();
	}

if (parentCapId) {
	isRenewProcess(parentCapId, capId);
	}

aa.cap.createRenewalCap(parentCapId, capId, true);
copyKeyInfo( parentCapId,capId);
aa.cap.updateAccessByACA(capId, "Y");
	
//DLH 171012 conversion end