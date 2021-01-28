//WTUB;HealthCS!Vital Records!NA!NA
if (wfTask == "Payment" && wfStatus == "Paid" && balanceDue > 0) {
	showMessage=true;
	comment("All fees must be paid before advancing the workflow!");
	cancel = true;
	}

if (wfTask == "Payment" && wfStatus == "Paid" && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	showMessage=true;
	comment('To process a payment: click either the "Payments" link under "My Navigation", or click the "Payment" tab located near the center of the page.<br>When you have received cash in the appropriate amount, then click the "Pay" button.<br>The amount of money the customer owes should already be populated in the textbox labeled "Amount".  If it is not, then enter into the textbox labeled "Amount" the amount the customer gave you.<br>Enter into the textbox labeled "Payor" the name of the person making the payment.<br>Click the "Save" button, and one or more receipts will pop up for you convenience.');
	cancel = true;
	}

