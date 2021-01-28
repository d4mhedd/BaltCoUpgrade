//ACAA;Building!~!~!~
if (conditionObj.getConditionDescription()=="Ad Hoc Condition") {
	var condSeqNbr = lookup("Building_Conditions_SeqNbr","Ad Hoc Condition");
	var isSucc = DEV_LYNDA_WACHT.editStdConditionASI(conditionId, "condSeqNbr",condSeqNbr);
	condSeqNbr++;
	editLookup("Building_Conditions_SeqNbr","Ad Hoc Condition",condSeqNbr);
	}

var retStatus = DEV_LYNDA_WACHT.addNewConditionToExistingChildren(conditionId);
if(typeof(retStatus)=="string") logDebug(retStatus);
