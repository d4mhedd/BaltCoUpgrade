//WATUB;Building!Model!NA!NA
if (matches(wfTask, "DSD Invoicing", "Invoicing" ) && wfStatus=="Invoice Fees") {
	branch("EMSE:noFeesToInvoiceMessage");
	}

if (wfTask=="Renewal" && wfStatus=="Invoice Fees") {
	branch("EMSE:noFeesToInvoiceMessage");
	}
