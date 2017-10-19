//DLH 171012 conversion begin

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
copyKeyInfoWithoutASIT(parentCapId, capId);
aa.cap.updateAccessByACA(capId, "Y");
	
//DLH 171012 conversion end