//DUB;Building!~!~!~
if ((specBldgRecd || appMatch("Building/Model/NA/NA"))&& (appHasCondition(null,"Applied","Application Expired",null) || appHasCondition(null,"Applied","Permit Expired",null) )) {
	showMessage = true;
	comment("Record is expired. Please contact Pima County for more information.");
	cancel = true;
	}