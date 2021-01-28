//ACAA;Site!~!~!~
if (conditionObj.getConditionType()=="Associated Conditions") {
	tempMdl = conditionObj.getTemplateModel();
	arrValue = new Array();
	arrValue.push(appTypeString);
	var colNames1 = new Array();
	colNames1[0] = "Record Type";
	if(tempMdl!=null) DEV_LYNDA_WACHT.InsertTemplateTableRow(tempMdl, "BUILDING CONDITION RECORD TYPE", arrValue, colNames1);
	conditionObj.setTemplateModel(tempMdl );
	var result = aa.capCondition.editCapCondition(conditionObj);
	comment(result.getSuccess());
	}

if (conditionObj.getConditionDescription()=="Ad Hoc Condition") {
	var condSeqNbr = lookup("Building_Conditions_SeqNbr","Ad Hoc Condition");
	var isSucc = DEV_LYNDA_WACHT.editStdConditionASI(conditionId, "condSeqNbr",condSeqNbr);
	condSeqNbr++;
	editLookup("Building_Conditions_SeqNbr","Ad Hoc Condition",condSeqNbr);
	}

var retStatus = DEV_LYNDA_WACHT.addNewConditionToExistingChildren(conditionId);
if(typeof(retStatus)=="string") logDebug(retStatus);