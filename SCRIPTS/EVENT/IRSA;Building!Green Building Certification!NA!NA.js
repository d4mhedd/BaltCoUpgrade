//IRSA;Building!Green Building Certification!NA!NA
if ((inspType == "Final Inspection" && inspResult == "Pass") && INSPECTIONMODULE.checkAllInspectionsPassed(capId)) {
	closeTask("Inspections","Final Inspection Approved","via script","via script");
	}
