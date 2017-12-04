function getLatestInspector(insp2Check) {
		// Modified version of getLastInspector that replaces .sort and excludes Rescheduled and Scheduled inspections
		try {

			var inspResultObj = aa.inspection.getInspections(capId);
			if (inspResultObj.getSuccess()) {
				inspList = inspResultObj.getOutput();
				if (inspList.length > 0) {
					var latestInsp = null;
					var latestInspDateObj = new Date("01/01/1900"); //this date must pre-date inspection data in system
					var latestInspDate = convertDate(latestInspDateObj);

					for (yy in inspList) {
						if (String(insp2Check).equals(inspList[yy].getInspectionType()) && !inspList[yy].getInspectionStatus().equals("Scheduled") && !inspList[yy].getInspectionStatus().equals("Rescheduled")) {
							if (!inspList[yy].getInspectionDate() != null) {
								if ((convertDate(inspList[yy].getScheduledDate()).getTime()) >= latestInspDate.getTime()) {
									latestInsp = inspList[yy];
									latestInspDate = convertDate(inspList[yy].getScheduledDate());
								}
							} else {
								continue;
							}
						}
					}
					//logDebug("The latest Inspection is: " + latestInsp.getInspectionType() + " date of: " + latestInsp.getScheduledDate().getEpochMilliseconds() + " with inspector of: " + latestInsp.getInspector().getFirstName() + " " + latestInsp.getInspector().getMiddleName() + " " + latestInsp.getInspector().getLastName());
					if (latestInsp != null) {
						inspUserObj = aa.person.getUser(latestInsp.getInspector().getFirstName(), latestInsp.getInspector().getMiddleName(), latestInsp.getInspector().getLastName()).getOutput();
						return inspUserObj.getUserID();
					} else {
						logDebug("No prior inspector for inspection type: " + insp2Check);
						return null;
					}
				} else {
					logDebug("No inspections on the record");
					return null;
				}

			} else {
				return null;
			}
		} catch (err) {
			logDebug("A JavaScript Error occured in custom function getLatestInspector: " + err.message + " In Line " + err.lineNumber);
		}
	}