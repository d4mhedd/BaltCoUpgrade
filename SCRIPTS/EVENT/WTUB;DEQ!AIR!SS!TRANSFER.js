//WTUB;DEQ!AIR!SS!TRANSFER
if (wfTask=="Invoice Fees" && wfStatus=="Payment Received" && (balanceDue >0)) {
	showMessage=true;
	comment("<font color='red'>All fees must be paid before the permit can be issued</font>");
	cancel = true;
	}


