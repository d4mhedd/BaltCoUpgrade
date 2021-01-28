//ASIUA;Building!S10 Certificate of Coverage!NA!NA
if (AInfo['dateGradingInspectionComplete'] != null && capStatus != "Executed" && S10_BLDG.isGradingInspectionPassedOrPartial(getParent())) {
	S10_BLDG.gradingInspectionPassedOrPartial(getParent());
	}
