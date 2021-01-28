//WATUB;Site!~!~!~
var feesToInvoice = false;
feesDue=false;
var dsdInvoiceFees = false;
if (matches(appTypeArray[1],"Development Concept Permit","Site Construction","Site Construction Building", "Tentative Plat","Final Plat") && matches (wfTask,"DSD Invoicing", "Invoicing") && wfStatus=="Invoice Fees") {
	dsdInvoiceFees = true;
	}

if (wfTask=="Renewal" && wfStatus=="Invoice Fees") {
	FEE_UTILS_MODULE.invoiceAllFees();
	}

if (dsdInvoiceFees) {
	var feeSum=0;
	allFees = loadFees();
	for (x in allFees) if(allFees[x]["status"] == "NEW") feesToInvoice=true;
	}

if (dsdInvoiceFees && !feesToInvoice) {
	var feeSum=0;
	allFees = loadFees();
	for (x in allFees) feeSum+= allFees[x]["amount"] - allFees[x]["amountPaid"];
	if(feeSum > 0) feesDue = true;
	}

if (dsdInvoiceFees && !feesToInvoice && !feesDue) {
	cancel= true;
	comment("There are no fees to invoice and no fees due. Please assess all appropriate fees before invoicing");
	}

if (dsdInvoiceFees && !feesToInvoice && feesDue) {
	cancel= true;
	comment("There are no fees to invoice, but there are fees due. Please verify invoiced fees before continuing");
	}

if (dsdInvoiceFees && feesToInvoice) {
	FEE_UTILS_MODULE.invoiceAllFees();
	}
