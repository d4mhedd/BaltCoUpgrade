//WTUA;DEQ!OP!WST!NA
if (wfTask == "Invoice Fees" && wfStatus == "Fees Invoiced") {
	FEE_UTILS_MODULE.invoiceAllFees();
	updateAppStatus("Invoice Pending", "Automatic");
	}

