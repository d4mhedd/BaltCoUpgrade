//ASA;DEQ!DE!WST!OP
var srcNbr=false;
var contactType = "";
var oContact;
contArray = getContactArray();
for(x in contArray) if(oContact == null) oContact = contArray[x];
if(oContact) contactType = oContact["contactType"];
if(oContact) srcNbr = oContact["contactSeqNumber"];
if (srcNbr) {
	recIdPrefix = contactType.replace("_","-");
	capIdPt1 = capId.getCustomID().substring(3);
	newAltId = recIdPrefix + "-" + srcNbr + "-" + capIdPt1;
	aa.cap.updateCapAltID(capId, newAltId);
	capId = aa.cap.getCapID(newAltId).getOutput();
	}