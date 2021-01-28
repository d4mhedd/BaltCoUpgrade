//IRSA;DEQ!MS4!MS4Con!NA
var result = DEQMS4.ms4cInspResultAfter(capId, inspType, inspResult, inspId);
if (typeof result == "string") {
	showMessage = true;
	comment("<font color = 'red'>Error(s) returned: <br />" + result + "</font>");
	}
