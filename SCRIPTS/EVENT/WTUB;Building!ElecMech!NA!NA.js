//WTUB;Building!ElecMech!NA!NA
if ((wfTask == "Review Consolidation" && wfStatus == "Approved") && (AInfo['siteOffModelPermit'] == null ||   AInfo['subTypeASI'] == null || AInfo['inspectionRequired'] == null || AInfo['typeIGrading'] == null)) {
	showMessage=true;
	comment("<font color='red'>All required ASI field must be populated.</font>");
	cancel=true;
	}
