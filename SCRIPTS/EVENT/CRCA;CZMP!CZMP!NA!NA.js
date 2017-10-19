//DLH 171012 conversion begin

var Existing = (AInfo["Existing Use"]);
var Requested = (AInfo["Requested Use"]);
var Justification = (AInfo["Justification"]);
var TotalAcreageRequested = (AInfo["Total Acreage of Request"]);
var Pastrezonehis = (AInfo["Past rezoning history?"]);
var ParcelTax = (AInfo["ParcelAttribute.Tax Account #"]);
ad = aa.address.getAddressByCapId(capId).getOutput();
if (ad[0].getHouseNumberStart() != null) {
	var Address = ad[0].getHouseNumberStart();
	}

if (ad[0].getStreetDirection() != null) {
	Address += " " + ad[0].getStreetDirection();
	}

if (ad[0].getStreetName() != null) {
	Address += " " + ad[0].getStreetName();
	}

if (ad[0].getStreetSuffix() != null) {
	Address += " " + ad[0].getStreetSuffix();
	}

editChannelReported("Online");
var Message = "The next step in the process is an in-person interview with staff at the offices of the Baltimore County Department of Planning. You will be contacted by a staff member to schedule the date and time for the interview.<br/><br/>If you have questions, please contact:<br/><br/>Baltimore County Department of Planning<br/>105 West Chesapeake Avenue, Suite 101<br/>Towson MD 21204<br/>Phone:410-887-3480<br/><br/>";
emailContact("Baltimore County CZMP","Dear Applicant:<br/><br/>You have successfully submitted an application to the Comprehensive Zoning Map Process (CZMP). The tracking number for this application is " + capIDString + ". You will be able to track the status and progress of the application using the tracking number. A summary of the zoning information in the application is provided below:<br/><br/>Primary Address: " + Address + "<br/><br/> Primary Tax Account: " + AInfo["ParcelAttribute.TAX ID"] + " <br/><br/> Existing Use: "+ Existing +" <br/><br/>Requested Use: "+ Requested +" <br/><br/>Justification for Zoning Change: "+ Justification +" <br/><br/>Estimated Total Acreage of Request: "+ TotalAcreageRequested +"<br/><br/>Past Rezoning History: "+ Pastrezonehis +"<br/><br/>"+ Message +"<br/><br/><b>This is an automated email notification. Do not reply.</b>","Applicant");
emailContact("Baltimore County CZMP","Dear Representative:<br/><br/>You have successfully submitted an application to the Comprehensive Zoning Map Process (CZMP). The tracking number for this application is " + capIDString + ". You will be able to track the status and progress of the application using the tracking number. A summary of the zoning information in the application is provided below:<br/><br/>Primary Address: " + Address + "<br/><br/> Primary Tax Account: " + AInfo["ParcelAttribute.TAX ID"] + " <br/><br/> Existing Use: "+ Existing +" <br/><br/>Requested Use: "+ Requested +" <br/><br/>Justification for Zoning Change: "+ Justification +" <br/><br/>Estimated Total Acreage of Request: "+ TotalAcreageRequested +"<br/><br/>Past Rezoning History: "+ Pastrezonehis +"<br/><br/>"+ Message +"<br/><br/><b>This is an automated email notification. Do not reply.</b>","Representative");
	
//DLH 171012 conversion end