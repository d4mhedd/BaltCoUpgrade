if (wfTask==("Application Acceptance") && wfStatus==("Accepted")) {
	updateTask("License Status","Issued","Issued via Application Acceptance");
	var renewalDate = new Date();
	renewalDate = dateAddMonths(renewalDate,36),licEditExpInfo("Active", renewalDate);
	}

if (wfTask==("Application Acceptance") && wfStatus==("Accepted")) {
	emailContact("Baltimore County Rental Housing Registration","The Rental Registration office has approved your rental exemption application " + capIDString + ".<br/>Our office will keep a record of your exemption on file, but no additional documentation will be sent to you.<br/><br/>For questions, contact us at pairentalregistration@baltimorecountymd.gov or 410-887-6060.<br/><br/>This is a system generated email. Do not reply.");
	}

if (wfTask == "Application Acceptance" && wfStatus == "Incomplete") {
	emailContact("Baltimore County Rental Housing Registration","Your Registration application " + capIDString + " is missing the following:<br/>"+ wfComment +" <br/><br/>We cannot process your application until we receive these documents.<br/>You may fax the missing documents to 410-887-3970, or mail or hand deliver them to:<br/>Attn: Kathleen O’Donnell<br/>County Office Building<br/>111 West Chesapeake Avenue, Room G-14<br/>Towson, Maryland 21204<br/><br/>For questions, contact us at pairentalregistration@baltimorecountymd.gov or 410-887-6060.<br/><br/>This is a system generated email. Do not reply");
	editTaskDueDate("Application Acceptance", dateAdd("",10, "Y"));
	licEditExpInfo("Inactive");
	}

ad = aa.address.getAddressByCapId(capId).getOutput();
if (ad[0].getHouseNumberStart() != null) {
	var Address = ad[0].getHouseNumberStart();
	}

if (ad[0].getStreetSuffix() != null) {
	Address += " " + ad[0].getStreetSuffix();
	}

if (ad[0].getStreetDirection() != null) {
	Address += " " + ad[0].getStreetDirection();
	}

if (ad[0].getStreetName() != null) {
	Address += " " + ad[0].getStreetName();
	}

if (wfTask==("Application Acceptance") && wfStatus==("Accepted Renewal")) {
	updateTask("License Status","Issued","Issued via Application Acceptance");
	lic = aa.expiration.getLicensesByCapID(capId).getOutput();
	var expDate = lic.getExpDate();
	newExpDate =  expDate.getMonth() + "/" + expDate.getDayOfMonth() + "/" + (expDate.getYear()+3);
	licEditExpInfo("Active", newExpDate);
	emailContact("Baltimore County Rental Housing Registration","The Rental Registration office has approved your rental exemption application " + capIDString + ".<br/>Our office will keep a record of your exemption on file, but no additional documentation will be sent to you.<br/><br/>For questions, contact us at pairentalregistration@baltimorecountymd.gov or 410-887-6060.<br/><br/>This is a system generated email. Do not reply.");
	}

if (wfTask==("Application Acceptance") && wfStatus==("Closed")) {
	updateTask("License Status","Closed","Closed via Application Acceptance");
	var renewalDate = AInfo["Last Inspection Date"];
	renewalDate = renewalDate,licEditExpInfo("Closed", renewalDate);
	}

if (wfTask==("Application Acceptance") && wfStatus==("Violation")) {
	updateTask("Application Acceptance","Violation","via script");
	licEditExpInfo("Closed");
	}