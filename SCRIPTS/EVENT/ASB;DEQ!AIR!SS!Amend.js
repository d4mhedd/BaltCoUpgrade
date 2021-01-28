//ASB;DEQ!AIR!SS!Amend
if ((AInfo['responsibleOfficialChange'] != "CHECKED")  && (AInfo['mailAddressChange'] != "CHECKED") && (AInfo['additionalResponsibleOfficial'] != "CHECKED") && (AInfo['invoicingContactChange'] != "CHECKED") && (AInfo['other'] != "CHECKED")) {
	showMessage=true;
	comment("<font color=RED>At least one change type must be selected.</font>");
	cancel=true;
	}
