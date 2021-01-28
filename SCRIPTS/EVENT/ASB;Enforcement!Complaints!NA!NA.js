//ASB;Enforcement!Complaints!NA!NA
if (AInfo['locationDescription'] == "" && ParcelValidatedNumber == "" && AddressValidatedNumber == "") {
	showMessage=true;
	comment("<font color='red'>Attach a parcel, an address, or complete the location description.</font>");
	cancel=true;
	}
