//DUB;Site!Site Construction Building!NA!NA
if ((appHasCondition(null,"Applied","Application Expired",null) || appHasCondition(null,"Applied","Permit Expired",null))) {
	showMessage = true;
	comment("Record is expired. Please contact Pima County for more information");
	cancel = true;
	}