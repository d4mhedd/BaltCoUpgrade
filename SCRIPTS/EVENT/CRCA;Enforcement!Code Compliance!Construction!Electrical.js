//DLH 171012 conversion begin

//aa.runScript("ADDRESSDUPLICATEFORACA");
capIdsGetByMatchingAddr();   //replacing malfunctioning code - jchalk - 10.25.17
editChannelReported("Online");
ad = aa.address.getAddressByCapId(capId).getOutput();
if (ad[0].getHouseNumberStart() != null) {
	var Address = ad[0].getHouseNumberStart();
	}

if (ad[0].getStreetName() != null) {
	Address += " " + ad[0].getStreetName();
	}

if (ad[0].getStreetSuffix() != null) {
	Address += " " + ad[0].getStreetSuffix();
	}

if (ad[0].getCity() != null) {
	Address += " " + ad[0].getCity();
	}

if (ad[0].getState() != null) {
	Address += " " + ad[0].getState();
	}

if (ad[0].getZip() != null) {
	Address += " " + ad[0].getZip();
	}

emailContact("Baltimore County Code Enforcement","Thank you for submitting your complaint. Your tracking number is " + capIDString + ". Your concerns will be investigated as soon as possible. If a violation exists, corrective action will be taken. You will receive an email whenever the status of your complaint changes.<br/><br/>You may obtain additional information at www.baltimorecountymd.gov/agencies/permits/codeenforcement or by searching existing complaints.<br/><br/>This is an automated email notification. Do not reply.","Complainant");
	
//DLH 171012 conversion end