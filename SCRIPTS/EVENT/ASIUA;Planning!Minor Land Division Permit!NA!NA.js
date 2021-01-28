//ASIUA;Planning!Minor Land Division Permit!NA!NA
var mldAck = false;
var condExists = false;
if (typeof(LOTINFORMATION)=="object") {
	for (row in LOTINFORMATION) if (LOTINFORMATION[row]["MLD Acknowledgement Requested"]=="Yes")mldAck=true;
	}

if (mldAck) {
	var condArray = getConditions("General","Applied","MLD In Process",null);
	for (cond in condArray) if (condArray[cond].objType=="Parcel") condExists=true;
	}

if (mldAck && !condExists) {
	addParcelCondition(null,"General", "Applied", "MLD In Process", "Added via script", "Notice");
	}
