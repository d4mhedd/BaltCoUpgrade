//WTUB;Planning!~!~!~
var feesToInvoice = false;
if (matches(wfTask,"Close Out","Staff Report", "BOS Staff Report")&& matches(wfStatus,"Complete","Withdrawn")) {
	var feeSum=0;
	allFees = loadFees();
	for (x in allFees) if(allFees[x]["status"] == "NEW") feesToInvoice=true;
	}

if (matches(wfTask,"Close Out","Staff Report","BOS Staff Report")&& matches(wfStatus,"Complete","Withdrawn")&& feesToInvoice) {
	showMessage=true;
	comment("Record has fees to be invoiced");
	cancel=true;
	}

if (matches(wfTask,"Close Out","Staff Report","BOS Staff Report")&& matches(wfStatus,"Complete","Withdrawn")&& balanceDue>0) {
	showMessage=true;
	comment("Record has fees to be paid: $" + balanceDue + " is currently due");
	cancel=true;
	}

var chkLim = new Array();
chkLim = DEV_LYNDA_WACHT.checkConditionLimiters("WTUB");
if (chkLim[0]=="Cancel") {
	showMessage=true;
	comment(chkLim[1]);
	cancel=true;
	}
