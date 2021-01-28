//ASA;Site!Final Plat!NA!NA
DEV_LYNDA_WACHT.getFeeSchedVersion();
closeTask("Application Intake","Submitted","Auto-Submit","");
editAppSpecific("applicationExpiration",dateAddMonths(null,36));
if (parentCapId != null && parentCapId) {
	var currCap=capId;
	capId=parentCapId;
	var grdParId = getParent();
	capId=currCap;
	if(grdParId) comment("grdParId: " + grdParId.getCustomID());
	if(appMatch("Site/Final Plat/NA/NA", parentCapId)) aa.cap.removeAppHierarchy(parentCapId, capId);
	if(grdParId && appMatch("Site/Tentative Plat/NA/NA", grdParId)) addParent(grdParId);
	if((!grdParId || !appMatch("Site/Tentative Plat/NA/NA", grdParId)) && !appMatch("Site/Tentative Plat/NA/NA", parentCapId)) comment("The parent of this record (" + parentCapId.getCustomID() + ") does not have a parent Tentative Plat.");
	params = new Object();
	params.altId = capId.getCustomID();
	UTILITYMODULE.sendTemplateBasedEmailAndSaveAsDocument("LPM_RWRD_Development@pima.gov",sysFromEmail,null,"AA_FINAL_PLAT_CLONE_NOTIFICATION",params,null);
	}

if (FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion'])) {
	FEE_UTILS_MODULE.ASA_FinalPlatFees();
	}
