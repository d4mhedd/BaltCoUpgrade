//WATUB;Building!~!~!~
var feesToInvoice = false;
feesDue=false;
if ((specBldgRecd || appTypeArray[1] == "Model") && matches (wfTask,"DSD Invoicing", "Invoicing") && wfStatus=="Invoice Fees") {
	var feeSum=0;
	allFees = loadFees();
	for (x in allFees) if(allFees[x]["status"] == "NEW") feesToInvoice=true;
	}

if ((specBldgRecd  || appTypeArray[1] == "Right of Way")&& matches (wfTask,"DSD Invoicing", "Invoicing") && wfStatus=="Invoice Fees" && !feesToInvoice) {
	var feeSum=0;
	allFees = loadFees();
	for (x in allFees) feeSum+= allFees[x]["amount"] - allFees[x]["amountPaid"];
	if(feeSum > 0) feesDue = true;
	}

if ((specBldgRecd  || appTypeArray[1] == "Right of Way")&& matches (wfTask,"DSD Invoicing", "Invoicing") && wfStatus=="Invoice Fees" && !feesToInvoice && !feesDue) {
	cancel= true;
	comment("There are no fees to invoice and no fees due. Please assess all appropriate fees before invoicing");
	}

if ((specBldgRecd  || appTypeArray[1] == "Right of Way")&& matches (wfTask,"DSD Invoicing", "Invoicing") && wfStatus=="Invoice Fees" && !feesToInvoice && feesDue) {
	cancel= true;
	comment("There are no fees to invoice, but there are fees due. Please verify invoiced fees before continuing");
	}

if ((specBldgRecd  || appTypeArray[1] == "Right of Way")&& matches (wfTask,"DSD Invoicing", "Invoicing") && wfStatus=="Invoice Fees" && feesToInvoice) {
	FEE_UTILS_MODULE.invoiceAllFees();
	}

if ((specBldgRecd  || appMatch("Building/Right of Way/NA/NA")) && wfTask=="Renewal" && wfStatus=="Invoice Fees") {
	FEE_UTILS_MODULE.invoiceAllFees();
	}
