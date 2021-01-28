//ASA;Site!S10 Certificate of Coverage!NA!NA
updateAppStatus("Application Pending","initial status");
S10_SITE.setRecordName(capId);
S10_SITE.sendApplicationPendingEmail(capId);
S10_SITE.assignTaskandNotifyGU(capId);