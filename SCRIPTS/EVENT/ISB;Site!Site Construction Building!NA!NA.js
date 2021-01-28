//ISB;Site!Site Construction Building!NA!NA
if ((balanceDue >0) && !(matches(inspType, "9010 Temporary C of O"))) {
	showMessage=true;
	comment(balanceDue.toFixed(2)+" is owed and must be paid before an inspection can be scheduled.");
	cancel=true;
	}