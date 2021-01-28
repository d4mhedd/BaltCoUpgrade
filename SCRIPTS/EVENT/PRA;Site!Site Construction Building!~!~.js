//PRA;Site!Site Construction Building!~!~
if (balanceDue <= 0 && isTaskActive("Issuance") && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition() &&  !UTILITYMODULE.hasBuildingRevisionChild(capId)) {
	editAppSpecific("permitExpiration",(dateAddMonths(null,36)));
	}
