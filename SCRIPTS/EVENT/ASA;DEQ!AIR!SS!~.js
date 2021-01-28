//ASA;DEQ!AIR!SS!~
var recordType = "P";
if (appTypeString=="DEQ/AIR/SS/AI") {
	recordType ="AI";
	}

if (appTypeString=="DEQ/AIR/SS/EI") {
	recordType ="E";
	}

if (appTypeString=="DEQ/AIR/SS/Comp") {
	var compType = getAppSpecific("complianceType", capId);
	recordType = compType.substring(0,1);
	}

UTILITYDEQMODULE.setRecordId(recordType, capId);