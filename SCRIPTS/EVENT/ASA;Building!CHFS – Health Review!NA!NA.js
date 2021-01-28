//ASA;Building!CHFS – Health Review!NA!NA
closeTask("Application Intake","Submitted","Auto-Submit","","HD_HEALTHREVIEWWORKFLOW");
editTaskDueDate("Admin Review",dateAdd(null,10,"Y"));
if (AInfo['establishmentType'] == "Fixed Food Establishment") {
	addFee("HD0001","HEALTH REVIEW","FINAL",1,"Y");
	}

if (AInfo['establishmentType'] == "Ice and Bottling Plant") {
	addFee("HD0002","HEALTH REVIEW","FINAL",1,"Y");
	}

if (AInfo['establishmentType'] == "Mobile Home Park") {
	addFee("HD0004","HEALTH REVIEW","FINAL",1,"Y");
	}

if (AInfo['establishmentType'] == "Motels/Hotels") {
	addFee("HD0005","HEALTH REVIEW","FINAL",1,"Y");
	}

if (AInfo['establishmentType'] == "Other – Modified Review") {
	addFee("HD0006","HEALTH REVIEW","FINAL",1,"Y");
	}

if (AInfo['establishmentType'] == "Pool – Public" || AInfo['establishmentType'] == "Pool – Semi Public") {
	addFee("HD0007","HEALTH REVIEW","FINAL",AInfo['numBodiesOfWater'],"Y");
	}

if (AInfo['establishmentType'] == "School Physical Facility") {
	addFee("HD0006","HEALTH REVIEW","FINAL",1,"Y");
	}

editAppSpecific("applicationExpiration",dateAddMonths(null,12));
if (AInfo['establishmentType'] == "Fixed Food Establishment and School Physical Facility") {
	addFee("HD0006","HEALTH REVIEW","FINAL",1,"Y");
	addFee("HD0001","HEALTH REVIEW","FINAL",1,"Y");
	}

if (AInfo['establishmentType'] == "Micro Market") {
	addFee("HD0009","HEALTH REVIEW","FINAL",1,"Y");
	}

if (AInfo['establishmentType'] == "Fixed Food Establishment" && AInfo['expeditedPlanReview'] == "Yes") {
	addFee("HD0011","HEALTH REVIEW","FINAL",1,"Y");
	}

if (AInfo['establishmentType'] == "Ice and Bottling Plant" && AInfo['expeditedPlanReview'] == "Yes") {
	addFee("HD0015","HEALTH REVIEW","FINAL",1,"Y");
	}

if (AInfo['establishmentType'] == "Mobile Home Park" && AInfo['expeditedPlanReview'] == "Yes") {
	addFee("HD0016","HEALTH REVIEW","FINAL",1,"Y");
	}

if (AInfo['establishmentType'] == "Motels/Hotels" && AInfo['expeditedPlanReview'] == "Yes") {
	addFee("HD0017","HEALTH REVIEW","FINAL",1,"Y");
	}

if (AInfo['establishmentType'] == "Other – Modified Review" && AInfo['expeditedPlanReview'] == "Yes") {
	addFee("HD0018","HEALTH REVIEW","FINAL",1,"Y");
	}

if ((AInfo['establishmentType'] == "Pool – Public" || AInfo['establishmentType'] == "Pool – Semi Public") && AInfo['expeditedPlanReview'] == "Yes") {
	addFee("HD0014","HEALTH REVIEW","FINAL",AInfo['numBodiesOfWater'],"Y");
	}

if (AInfo['establishmentType'] == "School Physical Facility" && AInfo['expeditedPlanReview'] == "Yes") {
	addFee("HD0018","HEALTH REVIEW","FINAL",1,"Y");
	}

if (AInfo['establishmentType'] == "Fixed Food Establishment and School Physical Facility" && AInfo['expeditedPlanReview'] == "Yes") {
	addFee("HD0018","HEALTH REVIEW","FINAL",1,"Y");
	addFee("HD0011","HEALTH REVIEW","FINAL",1,"Y");
	}

if (AInfo['establishmentType'] == "Micro Market" && AInfo['expeditedPlanReview'] == "Yes") {
	addFee("HD0013","HEALTH REVIEW","FINAL",1,"Y");
	}
