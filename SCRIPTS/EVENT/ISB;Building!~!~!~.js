//ISB;Building!~!~!~
if ((balanceDue >0) && specBldgRecd && !(matches(inspType, "9010 Temporary C of O"))) {
	showMessage=true;
	comment("$"+balanceDue.toFixed(2)+" is owed and must be paid before an inspection can be scheduled.");
	cancel=true;
	}

if (specBldgRecd && (appHasCondition("Record Status","Applied","Application Expired","Notice") || appHasCondition("Record Status","Applied","Permit Expired","Notice" ))) {
	showMessage = true;
	comment("Record is expired. Please contact Pima County for more information");
	cancel = true;
	}

var chkLim = new Array();
chkLim = DEV_LYNDA_WACHT.checkConditionLimiters("ISB");
if (chkLim[0]=="Cancel") {
	showMessage=true;
	comment(chkLim[1]);
	cancel=true;
	}