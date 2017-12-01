function getLatestInspector(insp2Check) {
	// Modified version of getLastInspector that replaces .sort and excludes Rescheduled and Scheduled inspections
	try {

		var inspResultObj = aa.inspection.getInspections(capId);
		if (inspResultObj.getSuccess()) {
			inspList = inspResultObj.getOutput();
			var latestInsp = inspList[0];

			for (yy in inspList) {
				if (String(insp2Check).equals(inspList[yy].getInspectionType()) && !inspList[yy].getInspectionStatus().equals("Scheduled") && !inspList[yy].getInspectionStatus().equals("Rescheduled")) {
					//logDebug("Looking at: " + inspList[yy].getScheduledDate());
					if(!inspList[yy].getInspectionDate() != null){
						if ((inspList[yy].getScheduledDate().getEpochMilliseconds()) >= (latestInsp.getScheduledDate().getEpochMilliseconds())) {
							latestInsp = inspList[yy];
						}
					} else {
						continue;
					}
				}
			}
			//logDebug("The latest Inspection is: " + latestInsp.getInspectionType() + " date of: " + latestInsp.getScheduledDate().getEpochMilliseconds() + " with inspector of: " + latestInsp.getInspector().getFirstName() + " " + latestInsp.getInspector().getMiddleName() + " " + latestInsp.getInspector().getLastName());
			inspUserObj = aa.person.getUser(latestInsp.getInspector().getFirstName(), latestInsp.getInspector().getMiddleName(), latestInsp.getInspector().getLastName()).getOutput();
			return inspUserObj.getUserID();
		} else {
			return null;
		}
	} catch (err) {
		logDebug("A JavaScript Error occured in custom function getLatestInspector: " + err.message + " In Line " + err.lineNumber);
	}
}