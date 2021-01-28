//WTUA;Planning!Comp Plan Rezoning Combo!NA!NA
if (wfTask=="BOS Hearing" && wfStatus=="Refer to P & Z") {
	closeTask("BOS Hearing","Refer to P & Z","Closed via Script","");
	activateTask("Staff Report");
	deactivateTask("BOS Staff Report");
	deactivateTask("Ordinance");
	deactivateTask("GIS Update");
	}

if (wfTask =="BOS Hearing" && wfStatus=="Withdrawn") {
	closeTask("BOS Hearing","Withdrawn","Closed via Script","");
	activateTask("Close Out");
	deactivateTask("Ordinance");
	}

if (wfTask =="BOS Hearing" && wfStatus=="Denied") {
	closeTask("BOS Hearing","Denied","Closed via Script","");
	activateTask("Close Out");
	deactivateTask("Ordinance");
	}

if (wfTask=="Certificate of Compliance" && wfStatus =="Partial Issued") {
	closeTask("Certificate of Compliance","Partial Issued","Closed via script");
	activateTask("GIS Update");
	deactivateTask("Close Out");
	}

if (wfTask=="Review Consolidation" && wfStatus =="C of C Partially Approved") {
	closeTask("Review Consolidation","C of C Partially Approved","Closed via Script");
	deactivateTask("Staff Report");
	activateTask("GIS Update");
	}

if (wfTask=="Certificate of Compliance" && wfStatus =="Staff Review Requested") {
	DEV_KEVIN_FORD.conditionReview(capId,"ALL","ALL");
	}

