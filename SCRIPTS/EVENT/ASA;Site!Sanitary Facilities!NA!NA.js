//ASA;Site!Sanitary Facilities!NA!NA
;
// Assess fees;
var denominator = 150;
// base # of lots for calcs;
var baseNumLots = Math.floor(AInfo['numberOfLots'] / denominator);
var remainder = AInfo['numberOfLots'] % denominator;
if (remainder > 0) {
	remainder = 1;
	} else {
	remainder = 0;
	}

var numLotsMultiplier = baseNumLots + remainder;
editAppSpecific("numberOfLotsHidden",numLotsMultiplier);
if (AInfo['typeOfSewageDisposal']  == "Sewer") {
	addFee("DE-WTRSF-01","SANITARY FACILITY FOR SUBDIVISIONS","FINAL",1,"Y");
	}

if (AInfo['typeOfSewageDisposal'] == "Septic" && AInfo['numberOfLots'] <= 40) {
	addFee("DE-WTRSF-02","SANITARY FACILITY FOR SUBDIVISIONS","FINAL",1,"Y");
	}

if (AInfo['typeOfSewageDisposal'] == "Septic" && AInfo['numberOfLots'] > 40) {
	addFee("DE-WTRSF-03","SANITARY FACILITY FOR SUBDIVISIONS","FINAL",1,"Y");
	}

updateAppStatus("In Review","auto-submit");
closeTask("Application Intake","Submitted","Auto-Submit","");