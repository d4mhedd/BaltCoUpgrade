//ASA;Site!Tentative Plat!NA!NA
DEV_LYNDA_WACHT.getFeeSchedVersion();
closeTask("Application Intake","Submitted","Auto-Submit","");
editAppSpecific("applicationExpiration",dateAddMonths(null,12));
FEE_UTILS_MODULE.ASA_DSTentativePlatFees();
if (aa.parcel.getParcelByCapId(capId,null).getOutput().size() > 0) {
	if (proximityToAttribute("PIMA", "Sewer Network", 200, "feet", "STATUS", "EXISTING_PIPE") ) addStdCondition("Proximity Alert", "Proximity to sewer line", capId);
	}
