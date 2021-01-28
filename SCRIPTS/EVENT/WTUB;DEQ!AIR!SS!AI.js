//WTUB;DEQ!AIR!SS!AI
if (wfTask == "Invoicing" && matches(wfStatus, "Paid", "Non-operating", "Unpermitted") && (balanceDue >0)) {
	showMessage=true;
	comment("<font color='red'>All fees must be paid before the permit can be issued.</font>");
	cancel = true;
	}

