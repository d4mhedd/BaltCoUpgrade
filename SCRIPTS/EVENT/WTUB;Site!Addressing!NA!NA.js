//WTUB;Site!Addressing!NA!NA
if (wfTask == "Addressing" && wfStatus =="Complete"  && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	showMessage=true;
	comment("<font color='red'>Fee balance must be $0.00 before proceeding.</font>");
	cancel = true;
	}

var numParcels = aa.parcel.getParcelandAttribute(capId,null).getOutput().toArray().length;
var parcelRequiredRequestType = AInfo['requestType'] == "New Address" || AInfo['requestType'] == "Change of Address" || AInfo['requestType'] == "Street Naming and New Address" ? true : false;
if (wfTask == "Addressing" && wfStatus == "Complete" && numParcels == 0 && parcelRequiredRequestType == true) {
	showMessage=true;
	comment("<font color='red'>At least one parcel is required to proceed.</font>");
	cancel=true;
	}

if (wfTask == "Addressing" && wfStatus == "Complete" && PARCELSTREETNAMECHANGES.length == 0 && (AInfo['requestType'] == "Street Naming" || AInfo['requestType'] == "Street Naming and New Address")) {
	showMessage=true;
	comment("<font color='red'>Table PARCEL STREET NAME CHANGES must contain at least one row.</font>");
	cancel=true;
	}

if (cancel == false && wfTask == "Addressing" && wfStatus == "Complete" && PARCELSTREETNAMECHANGES.length > 0 && (AInfo['requestType'].indexOf("Street Naming") != -1 )) {
	var params = aa.util.newHashMap();
	WFMODULE.displayReportFromWorkflow("Approved Street Name", params);
	}

if (cancel == false && wfTask == "Review" && wfStatus == "Street Name Notices Sent" && PARCELSTREETNAMECHANGES.length > 0 && (AInfo['requestType'].indexOf("Street Naming") != -1 )) {
	var params = aa.util.newHashMap();
	WFMODULE.displayReportFromWorkflow("Notice of Street Naming", params);
	}

if (wfTask == "Review" && wfStatus == "Street Name Notices Sent" && typeof(PARCELSTREETNAMECHANGES) == "object" && PARCELSTREETNAMECHANGES.length == 0) {
	showMessage=true;
	comment("<font color='red'>Table PARCEL STREET NAME CHANGES must contain at least one row.</font>");
	cancel=true;
	}


