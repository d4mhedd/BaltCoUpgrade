//Branch
//dlh 170714 conversion begin

if (matches(appTypeArray[2], "Impoundment", "Pet", "Services", "Complaints")) {
	parentId = getParent();
	if (parentId) BaltCoCopyASIFields(parentId, ""+appTypeArray[2]);
	}

//dlh 170714 conversion end