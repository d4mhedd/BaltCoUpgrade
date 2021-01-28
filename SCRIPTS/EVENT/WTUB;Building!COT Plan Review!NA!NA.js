//WTUB;Building!COT Plan Review!NA!NA
if ((wfTask == "Invoicing") && (wfStatus == "Invoice Fees")) {
	comment("Invoicing Fees");
	FEE_UTILS_MODULE.invoiceAllFees(capId);
	}
