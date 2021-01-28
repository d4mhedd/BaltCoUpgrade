//ISB;Planning!~!~!~
var chkLim = new Array();
chkLim = DEV_LYNDA_WACHT.checkConditionLimiters("ISB");
if (chkLim[0]=="Cancel") {
	showMessage=true;
	comment(chkLim[1]);
	cancel=true;
	}
